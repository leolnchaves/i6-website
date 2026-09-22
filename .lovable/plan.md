# Beacon de campanha no site infinity6 (diff CORRIGIDO — nada aplicado)

Enviar as visitas do site para o endpoint `track-campaign-landing` do i6 HUB, reaproveitando o identificador anônimo e o primeiro/último toque existentes. O beacon só dispara com a categoria "Análise" aceita no banner; os itens do beacon **não** entram na lista de essenciais. Ajuste visual do banner fica para tarefa futura.

## Correções desta rodada (itens 1–5)

1. **UUID inválido aborta o envio** — `sendLandingBeacon` retorna antes do fetch se `getAnonymousId()` não existir ou não passar no UUID_RE. Nunca envia `visitor_id` vazio.
2. **Nome real da função** — `tracker.ts` exporta `parseUtms(search: string)` (tracker.ts:100). O diff abaixo já usa o nome correto, compilável.
3. **Dedupe por pathname + search** — uma nova passagem pela mesma página com UTM diferente dispara o beacon de novo.
4. **Verificação ao vivo das chaves (feita, 16:45 UTC):**
   - `i6_first_touch` = `{"utm_source":"beaconcheck","utm_medium":"cpc","utm_campaign":"test2","landing_page":"/pt/contact?utm_source=beaconcheck&utm_campaign=test2&utm_medium=cpc","ts":"2026-09-22T16:45:14.321Z"}`
   - `i6_last_touch` = `{"utm_term":"kw1","utm_content":"ad1","ts":"2026-09-22T16:45:16.481Z"}`
   - Confirmado: as chaves são **planas** (`FirstTouch`/`LastTouch` estendem `UtmRecord` por interseção — tracker.ts:34-43), então `touch.utm_source` casa com o tipo `Utms` do beacon sem mapeamento. Bônus: `parseUtms` já trunca cada valor a 200 caracteres; o beacon re-aplica o clamp por segurança.
5. **Linha exata de renderização** incluída no diff da política EN abaixo.

## Diff corrigido completo (não aplicado)

### `src/lib/campaignBeacon.ts` — NOVO

```ts
/**
 * Beacon de visita para o i6 HUB (track-campaign-landing).
 *
 * Dispara SOMENTE com consent da categoria "Análise" — mesmo gate de
 * qualquer rastreamento não essencial do site. Reaproveita i6_aid e os
 * toques de src/lib/tracker.ts; nunca cria um segundo identificador.
 */

import { getAnonymousId, parseUtms, readJSON, type FirstTouch, type LastTouch } from '@/lib/tracker';

export const CAMPAIGN_BEACON_URL =
  'https://nknsoorwqvlyxfptnfzr.supabase.co/functions/v1/track-campaign-landing';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{12}$/i;
const GO_TOKEN_RE = /^(\/(?:pt|en|es))?\/go\/[^/]+$/;

type UtmKey = 'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_term' | 'utm_content';
const UTM_KEYS: UtmKey[] = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

const maskPath = (pathname: string): string => {
  const m = pathname.match(GO_TOKEN_RE);
  return m ? `${m[1] ?? ''}/go/:token` : pathname;
};

/** Pathname sem o prefixo de idioma, para guards de rota sensível. */
const stripLangPrefix = (pathname: string): string =>
  pathname.replace(/^\/(pt|en|es)(?=\/|$)/, '') || '/';

const clamp = (v: string, max: number) => v.slice(0, max);

/**
 * Envia a visita ao i6 HUB. Corpo estrito: visitor_id, page_url,
 * utm_* (opcionais) e user_agent (opcional) — nenhum campo a mais.
 * Sem visitor_id válido, aborta sem chamar a rede.
 * Silencioso: nunca lança, nunca bloqueia a navegação.
 */
export const sendLandingBeacon = async (pathname: string, search: string): Promise<void> => {
  if (typeof window === 'undefined') return;
  if (stripLangPrefix(pathname).startsWith('/demo-metrics')) return;

  const visitorId = getAnonymousId();
  if (!visitorId || !UUID_RE.test(visitorId)) return;

  // UTMs: URL atual primeiro (passagem de rota em curso), depois último
  // toque e primeiro toque — todos já persistidos por tracker.ts.
  const fromUrl = parseUtms(search);
  const last = readJSON<LastTouch>('i6_last_touch') ?? {};
  const first = readJSON<FirstTouch>('i6_first_touch') ?? {};

  const body: Record<string, string> = {
    visitor_id: visitorId,
    page_url: window.location.origin + maskPath(pathname),
  };

  for (const key of UTM_KEYS) {
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

### `src/lib/tracker.ts` — exportar dois helpers existentes (sem mudança de comportamento)

```diff
-const readJSON = <T>(key: string): T | null => {
+export const readJSON = <T>(key: string): T | null => {
```
```diff
-const parseUtms = (search: string): UtmRecord => {
+export const parseUtms = (search: string): UtmRecord => {
```

### `src/hooks/useTracker.ts` — gancho na rota, gateado por consent, dedupe por pathname+search

```diff
+import { useRef } from 'react';
 import { useLocation } from 'react-router-dom';
 import { recordPageView, ... } from '@/lib/tracker'; // imports atuais preservados
+import { sendLandingBeacon } from '@/lib/campaignBeacon';
 
 export const useTracker = (analyticsConsent: boolean) => {
   const location = useLocation();
+  const lastBeaconKey = useRef<string | null>(null);
 
   useEffect(() => {
     recordPageView(location.pathname + location.search, document.title);
+    // Beacon ao i6 HUB: só com "Análise" aceita; dispara de novo se os
+    // UTMs (search) mudarem na mesma página.
+    const beaconKey = location.pathname + location.search;
+    if (analyticsConsent && lastBeaconKey.current !== beaconKey) {
+      lastBeaconKey.current = beaconKey;
+      void sendLandingBeacon(location.pathname, location.search);
+    }
   }, [location.pathname, location.search]);
```

### `src/components/privacy/PrivacyPolicyPT.tsx` — seção 10, após o parágrafo "Cookies adicionais" (L196-198)

```diff
         <p className="text-white/70 mb-2">
           <strong className="text-white">Cookies adicionais (marketing/preferências):</strong> só são ativados após consentimento explícito no banner de cookies. Você pode revisar e alterar suas escolhas a qualquer momento em "Preferências de cookies".
         </p>
+        <p className="text-white/70 mb-2">
+          <strong className="text-white">Medição de campanhas (i6 HUB):</strong> quando você aceita a categoria "Análise" no banner de cookies, cada página visitada é registrada de forma anônima (identificador do visitante, endereço da página e parâmetros de campanha) em um serviço próprio da infinity6, o i6 HUB, para medir o desempenho das nossas campanhas. Sem esse aceite, nenhum envio é feito.
+        </p>
```

### `src/pages/PrivacyPolicy.tsx` — bloco EN

Texto (após `additional`, L110):
```diff
       additional: "Additional cookies (marketing/preferences): only activated after explicit consent in the cookie banner. You can review and change your choices at any time in \"Cookie preferences\".",
+      campaign: "Campaign measurement (i6 HUB): when you accept the \"Analytics\" category in the cookie banner, each page you visit is recorded anonymously (visitor identifier, page address and campaign parameters) in an infinity6-owned service, the i6 HUB, to measure campaign performance. Without that consent, nothing is sent.",
```

Linha exata de renderização em `renderENContent` (após L175):
```diff
         <p className="text-white/70 mb-2">{enSections.cookies.additional}</p>
+        <p className="text-white/70 mb-2">{enSections.cookies.campaign}</p>
         <p className="text-white/70">{enSections.cookies.rights}</p>
```

### O que NÃO muda

- Banner: nenhuma alteração visual nem na lista de essenciais (`i6_first_touch`, `i6_pages`, `i6_events` **não** entram como essenciais).
- Formulários: payload intacto (contato, gates, Ebook).
- `tracker.ts`: só dois `export`, nenhuma mudança de comportamento.

## Pendências do lado do endpoint

- `verify_jwt = false` no `track-campaign-landing` (POST sem token precisa responder 2xx).
- CORS confirmado para `https://infinity6.ai` (preflight real: allow-origin, allow-methods POST/OPTIONS, allow-headers com content-type). Origin do preview não está liberado — no preview o envio falha silenciosamente; para testar lá, adicionar o origin no endpoint.

## Verificação após aplicar

Build, depois Playwright: aceitar "Análise" e confirmar POST ao endpoint com corpo estrito (visitor_id == i6_aid, page_url sem query, UTMs); recusar e confirmar ausência total de chamadas; mesma página com UTM novo dispara de novo; máscara em `/pt/go/xyz`; ausência de disparo em `/pt/demo-metrics/xyz`.
