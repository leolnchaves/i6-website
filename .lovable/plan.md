# Beacon de campanha no site infinity6 (diff para aprovação — nada aplicado)

Enviar as visitas do site para o endpoint `track-campaign-landing` do i6 HUB, reaproveitando o identificador anônimo e o primeiro/último toque existentes. **Mudança desta rodada:** o beacon só dispara quando o visitante aceitou a categoria "Análise" no banner (como qualquer rastreamento não essencial); os itens do beacon **não** entram na lista de essenciais. O ajuste visual do banner fica para tarefa futura.

## Respostas aos itens 1–5 (verificados)

1. **Consentimento já existe e é checável.** `useCookieConsent` (`src/hooks/useCookieConsent.ts`) persiste `cookie_consent` (versão 2.0) no localStorage com as categorias `essential | analytics | marketing | preferences`; o estado chega ao `CookieConsentManager`, que repassa `consent.analytics` ao `useTracker`. O mecanismo de checagem é o próprio parâmetro `analyticsConsent` já recebido pelo hook — **nenhuma categoria nova é necessária**; o beacon é gateado por `consent.analytics` (o usuário aprovou "como qualquer rastreamento não essencial"; analytics é a categoria existente que cobre medição). Nada muda visualmente no banner.
2. **UUID confirmado ao vivo.** Teste no navegador: `i6_aid = acb288c8-7fab-48cc-9497-e9e96e2d2aca` (formato UUID v4 validado por regex) e o envio do formulário de contato (interceptado antes de sair do navegador, nada chegou ao destino) carregou `anonymous_id = acb288c8-...` — **mesmo valor literal**. `match: True`.
3. **Ordem dos efeitos.** No efeito de rota de `useTracker.ts`, `recordPageView` roda primeiro; a chamada do beacon entra na linha seguinte do mesmo efeito. Atenção a um detalhe: os toques (first/last) só são atualizados na inicialização da sessão, então UTMs da URL atual são lidos **direto da URL** no beacon (prioridade), caindo para `i6_last_touch` → `i6_first_touch` como fallback. Assim UTMs novos da passagem atual sempre aparecem no beacon.
4. **Variantes localizadas.** `/demo-metrics/:token` existe só sem prefixo (App.tsx:160, redirect para Home); mas `/:lang/*` (App.tsx:163) faz `/pt/demo-metrics/xyz` cair no NotFound **dentro** do layout que roda o tracker — ou seja, hoje registra pageview e dispararia o beacon. O guard usa o pathname **sem** o prefixo de idioma (`/^(demo-metrics)\//`), cobrindo as duas formas. Mesma lógica para a máscara de `/go/:token`: `/go/abc` → `/go/:token`, `/pt/go/abc` → `/pt/go/:token`.
5. **Preflight confirmado.** OPTIONS real ao endpoint retornou `200` com `access-control-allow-origin: https://infinity6.ai`, `access-control-allow-methods: POST, OPTIONS` e `access-control-allow-headers: authorization, x-client-info, apikey, content-type`. Resta confirmar (pendência do endpoint) que o POST sem token retorna 2xx — ou seja, `verify_jwt = false`. O origin do preview (`https://id-preview--e93ee020-684a-4686-8879-c9847ef30581.lovable.app`) **não** está liberado no CORS (testado: preflight com esse origin não devolve o header), então no preview o envio falhará silenciosamente — comportamento aceitável e silencioso por design; para testar no preview, adicionar o origin no endpoint.

## Diff proposto (não aplicado)

### `src/lib/campaignBeacon.ts` — NOVO

```ts
/**
 * Beacon de visita para o i6 HUB (track-campaign-landing).
 *
 * Dispara SOMENTE com consent da categoria "Análise" — mesmo gate de
 * qualquer rastreamento não essencial do site. Reaproveita i6_aid e os
 * toques de src/lib/tracker.ts; nunca cria um segundo identificador.
 */

export const CAMPAIGN_BEACON_URL =
  'https://nknsoorwqvlyxfptnfzr.supabase.co/functions/v1/track-campaign-landing';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{12}$/i;
const GO_TOKEN_RE = /^(\/(?:pt|en|es))?\/go\/[^/]+$/;

const maskPath = (pathname: string): string => {
  const m = pathname.match(GO_TOKEN_RE);
  return m ? `${m[1] ?? ''}/go/:token` : pathname;
};

/** Pathname sem o prefixo de idioma, para guards de rota sensível. */
const stripLangPrefix = (pathname: string): string =>
  pathname.replace(/^\/(pt|en|es)(?=\/|$)/, '');

type Utms = Partial<Record<'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_term' | 'utm_content', string>>;

const clamp = (v: string, max: number) => v.slice(0, max);

/**
 * Envia a visita ao i6 HUB. Corpo estrito: visitor_id, page_url,
 * utm_* (opcionais) e user_agent (opcional) — nenhum campo a mais.
 * Silencioso: nunca lança, nunca bloqueia a navegação.
 */
export const sendLandingBeacon = async (pathname: string): Promise<void> => {
  if (typeof window === 'undefined') return;
  if (stripLangPrefix(pathname).startsWith('/demo-metrics')) return;

  // UTMs: URL atual primeiro (passagem de rota em curso), depois último
  // toque e primeiro toque — todos já persistidos por tracker.ts.
  const fromUrl = parseUtmsFromUrl(window.location.search);
  const last = readJSON<Utms>('i6_last_touch') ?? {};
  const first = readJSON<Utms>('i6_first_touch') ?? {};

  const body: Record<string, string> = {
    visitor_id: getAnonymousId() ?? '',
    page_url: window.location.origin + maskPath(pathname),
  };
  if (!UUID_RE.test(body.visitor_id)) body.visitor_id = ''; // fallback raro: campo sai vazio, chamada segue

  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const) {
    const value = fromUrl[key] ?? last[key] ?? first[key];
    if (value) body[key] = clamp(value, 200);
  }
  if (navigator.userAgent) body.user_agent = clamp(navigator.userAgent, 500);

  try {
    await fetch(CAMPAIGN_BEACON_URL, {
      method: 'POST',
      keepalive: true,
      mode: 'cors',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    /* rede/CORS: silencioso por design */
  }
};
```

(`parseUtmsFromUrl`, `readJSON` e `getAnonymousId` vêm de `tracker.ts`; os dois primeiros hoje são privados do módulo — ver próximo item.)

### `src/lib/tracker.ts` — exportar dois helpers existentes

```diff
-const readJSON = <T>(key: string): T | null => {
+export const readJSON = <T>(key: string): T | null => {
```
```diff
-const parseUtms = (search: string): UtmRecord => {
+export const parseUtms = (search: string): UtmRecord => {
```
(renomear o uso no beacon para `parseUtms`; sem nenhuma outra mudança de comportamento)

### `src/hooks/useTracker.ts` — gancho na rota, gateado por consent

```diff
+import { sendLandingBeacon } from '@/lib/campaignBeacon';
+
 export const useTracker = (analyticsConsent: boolean) => {
   const location = useLocation();
+  const lastBeaconPath = useRef<string | null>(null);
 
   useEffect(() => {
     recordPageView(location.pathname + location.search, document.title);
+    // Beacon ao i6 HUB: só com "Análise" aceita, uma vez por caminho por sessão.
+    if (analyticsConsent && lastBeaconPath.current !== location.pathname) {
+      lastBeaconPath.current = location.pathname;
+      void sendLandingBeacon(location.pathname);
+    }
   }, [location.pathname, location.search]);
```

### `src/components/privacy/PrivacyPolicyPT.tsx` — seção 10, após o parágrafo "Cookies adicionais" (L196-198)

```diff
         <p className="text-white/70 mb-2">
           <strong className="text-white">Cookies adicionais (marketing/preferências):</strong> ...
         </p>
+        <p className="text-white/70 mb-2">
+          <strong className="text-white">Medição de campanhas (i6 HUB):</strong> quando você aceita a categoria
+          "Análise" no banner de cookies, cada página visitada é registrada de forma anônima (identificador do
+          visitante, endereço da página e parâmetros de campanha) em um serviço próprio da infinity6, o i6 HUB,
+          para medir o desempenho das nossas campanhas. Sem esse aceite, nenhum envio é feito.
+        </p>
```

### `src/pages/PrivacyPolicy.tsx` — bloco EN `cookies`, após `additional` (L110)

```diff
       additional: "Additional cookies (marketing/preferences): only activated after explicit consent...",
+      campaign: "Campaign measurement (i6 HUB): when you accept the \"Analytics\" category in the cookie banner, each page you visit is recorded anonymously (visitor identifier, page address and campaign parameters) in an infinity6-owned service, the i6 HUB, to measure campaign performance. Without that consent, nothing is sent.",
```
e no `renderENContent`, um `<p>` renderizando `enSections.cookies.campaign` logo após o parágrafo de `additional`.

### O que NÃO muda

- Banner: nenhuma alteração visual nem na lista de essenciais (`i6_first_touch`, `i6_pages`, `i6_events` **não** entram como essenciais).
- Formulários: payload intacto (contato, gates, Ebook).
- `tracker.ts`: nenhuma mudança de comportamento, só dois `export`.

## Pendências do lado do endpoint

- `verify_jwt = false` no `track-campaign-landing` (POST sem token precisa responder 2xx — não testável daqui sem disparar dado real).
- CORS: liberar também o origin do preview se quiser testes fora de produção (hoje só `https://infinity6.ai` passa no preflight).

## Verificação após aplicar

Build, depois Playwright: aceitar "Análise" e confirmar no log de rede um POST ao endpoint com o corpo estrito (visitor_id == i6_aid, page_url sem query, UTMs); recusar e confirmar ausência total de chamadas; conferir máscara em `/pt/go/xyz` e ausência de disparo em `/pt/demo-metrics/xyz`.
