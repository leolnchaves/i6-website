# Reconstrução do banner de cookies — diff proposto (nada aplicado)

## Localização atual (respondendo antes do diff)

- Componente visual do banner: `src/components/cookies/CookieBanner.tsx` (estado compacto + estado expandido no mesmo arquivo), montado por `src/components/cookies/CookieConsentManager.tsx`, que por sua vez é montado em `src/components/DarkLayout.tsx:22`.
- Textos: **inline no próprio componente**, num objeto `t` com três ramos (`pt` / `es` / fallback `en`) — não há chaves de cookies em `src/data/translations/*`. O mesmo padrão inline existe em `src/components/cookies/CookieDetailsModal.tsx`.
- Rodapé: `src/components/hometeste/FooterNovo.tsx` (linhas 111–118 têm os links de Política de Privacidade e Código de Ética).
- Observação importante descoberta agora: `useCookieConsent` mantém estado **local por instância** (cada componente que chama o hook tem seu próprio `showBanner`). Por isso o link do rodapé não conseguiria abrir o banner hoje. O diff adiciona um pequeno store compartilhado no módulo do hook (sem biblioteca nova, sem provider novo).

---

## 1) `src/types/cookies.ts` — default de consentimento

```diff
-// Soft opt-in: analytics (GA4) ativo por padrão.
-// O tracker próprio anônimo de primeira parte é essencial (legítimo interesse)
-// e não pode ser desativado por toggle — apenas limpando o localStorage.
+// Opt-in explícito: nada de analytics/marketing/preferências antes do clique.
+// Só `essential` nasce ativo (funcionamento, idioma, CSRF, gravação da escolha).
 export const defaultCookieConsent: CookieConsent = {
   essential: true,
-  analytics: true,
+  analytics: false,
   marketing: false,
   preferences: false,
 };
```

Também nas descrições de `cookieCategories` (mesmo arquivo): `essential` deixa de citar rastreamento de campanha; `analytics` passa a citar GA4 + medição de campanhas (i6 HUB).

**Confirmação pedida:** nenhum outro ponto do código reintroduz `analytics: true` como default. Os únicos literais `analytics: true` ficam em `acceptAll`/`acceptAdditional` (ações explícitas do visitante) dentro de `useCookieConsent.ts`. `index.html` já inicializa o Consent Mode do GA4 com `analytics_storage: 'denied'`, então com esse default o GA4 passa a não gravar `_ga` nem enviar hit antes do aceite.

## 2) `src/hooks/useCookieConsent.ts` — store compartilhado, expiração, ações

### Código completo do store (item 1 da sua pergunta)

```ts
const COOKIE_CONSENT_KEY = 'cookie_consent';
const COOKIE_CONSENT_VERSION = '2.0';
const TTL_DAYS = 365;

type Stored = {
  consent: CookieConsent;
  version: string;
  timestamp: string;
  ttl_days?: number;
  expires_at?: string;
};

type ConsentState = {
  consent: CookieConsent;
  showBanner: boolean;
  bannerExpanded: boolean;
};

// Lê o registro salvo, tratando expirado como inexistente.
// Registros antigos (sem expires_at) seguem válidos.
const readStored = (): CookieConsent | null => {
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Stored;
    if (parsed.version !== COOKIE_CONSENT_VERSION) return null;
    if (parsed.expires_at && new Date(parsed.expires_at).getTime() < Date.now()) return null;
    return parsed.consent;
  } catch {
    return null;
  }
};

// ---- Estado de módulo (fonte única, criado uma vez por carga de página) ----
const saved = readStored();
let state: ConsentState = {
  consent: saved ?? defaultCookieConsent,
  showBanner: saved === null,
  bannerExpanded: false,
};

const listeners = new Set<(s: ConsentState) => void>();

const setState = (patch: Partial<ConsentState>) => {
  state = { ...state, ...patch };
  listeners.forEach((l) => l(state));
};

const subscribe = (listener: (s: ConsentState) => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const useCookieConsent = () => {
  // Leitura inicial SÍNCRONA: nenhum render acontece com o default
  // quando já existe escolha salva e válida.
  const [local, setLocalState] = useState<ConsentState>(state);

  useEffect(() => {
    // Sincroniza com o estado de módulo que pode ter mudado entre o
    // initializer e a montagem, e inscreve esta instância.
    setLocalState(state);
    return subscribe(setLocalState); // cleanup remove o listener no unmount
  }, []);

  // ... ações (saveConsent, acceptAll, essentialOnly, openPreferences ...)
  // todas chamam setState(...), nunca setLocalState direto.
};
```

**Sem vazamento de listener:** `subscribe` devolve a própria função de remoção, e esse retorno é o cleanup do `useEffect` — cada montagem adiciona exatamente um listener ao `Set` e o remove no unmount. Banner, rodapé (`FooterNovo`) e `CookieConsentManager` podem montar/desmontar em qualquer ordem e quantas vezes quiserem; o `Set` volta ao tamanho anterior. Como é um `Set` (não array), uma eventual dupla inscrição da mesma função também não duplicaria a entrada.

- Leitura (inicializador síncrono) passa a checar validade:

```diff
-        if (parsed.version === COOKIE_CONSENT_VERSION) return parsed.consent as CookieConsent;
+        const expired = parsed.expires_at && new Date(parsed.expires_at).getTime() < Date.now();
+        if (!expired && parsed.version === COOKIE_CONSENT_VERSION) {
+          return parsed.consent as CookieConsent;
+        }
```

  (registros antigos sem `expires_at` continuam válidos). O efeito de mount usa a mesma checagem: expirado ⇒ `showBanner = true`.
- Gravação:

```diff
     const consentData = {
       consent: newConsent,
       version: COOKIE_CONSENT_VERSION,
       timestamp: new Date().toISOString(),
+      ttl_days: 365,
+      expires_at: new Date(Date.now() + 365 * 864e5).toISOString(),
     };
```

- Ações expostas: `acceptAll`, `essentialOnly` (novo nome para o "Apenas essenciais" = `{essential:true, analytics:false, marketing:false, preferences:false}`), `saveConsent`, `openPreferences`, `setBannerExpanded`. `acceptAdditional` / `continueEssential` permanecem exportados (usados por `CookieDetailsModal.tsx`) mas deixam de aparecer no banner.

## 3) `src/components/cookies/CookieBanner.tsx` — reescrita

Estado A (compacto): título `Cookies e privacidade` / `Cookies and privacy` / `Cookies y privacidad`; mensagem aprovada; três botões na mesma linha, na ordem **Aceitar todos** (coral, outline glow do design system) · **Personalizar** (outline branco/15) · **Apenas essenciais** (outline branco/15, mesmo peso visual); link para a Política de Privacidade via `usePolicyDrawer().openPolicy('privacy')`.

Estado B (Personalizar): quatro linhas com switch — Essenciais desabilitado com badge `Sempre ativo` / `Always active` / `Siempre activas`, e badge `Opcional` / `Optional` / `Opcional` nas outras três; descrições do item 5; botões **Salvar escolhas** (primário), **Aceitar todos**, **Apenas essenciais**, e `← Voltar`.

Textos (PT / EN / ES), sem ponto final em títulos:

| | PT | EN | ES |
|---|---|---|---|
| Mensagem | Utilizamos cookies essenciais para o funcionamento do site. Com sua permissão, também coletamos dados anônimos de navegação e campanha para aprimorar nossos serviços e medir desempenho. | We use essential cookies for core site functionality. With your permission, we also collect anonymous browsing and campaign metrics to improve our services and measure performance. | Utilizamos cookies esenciales para el funcionamiento del sitio. Con tu permiso, también recopilamos métricas anónimas de navegación y campaña para mejorar nuestros servicios y medir el rendimiento. |
| Essenciais | Funcionamento básico, segurança e preferências de idioma. Sempre ativos | Core operation, security, and language preferences. Always active | Funcionamiento básico, seguridad y preferencias de idioma. Siempre activas |
| Análise e desempenho | Google Analytics e medição anônima de campanhas (i6 HUB) para entender a audiência | Google Analytics and anonymous campaign measurement (i6 HUB) to understand our audience | Google Analytics y medición anónima de campañas (i6 HUB) para comprender la audiencia |
| Marketing | Comunicação direcionada e mensuração de anúncios futuros | Targeted communication and future advertising measurement | Comunicación dirigida y medición de anuncios futuros |
| Preferências | Preferências estendidas de navegação, sem uso ativo hoje | Extended browsing preferences, not in active use today | Preferencias extendidas de navegación, sin uso activo hoy |

## 4) `src/hooks/useTracker.ts` — dedupe

```diff
     const beaconKey = location.pathname + location.search;
+    if (!analyticsConsent) {
+      lastBeaconKey.current = null;
+    }
     if (analyticsConsent && lastBeaconKey.current !== beaconKey) {
```

## 5) `src/components/hometeste/FooterNovo.tsx` — ponto permanente de revisão

Terceiro botão ao lado de Privacidade e Ética (linha ~117), usando `openPreferences()` do hook:

```diff
       <button type="button" onClick={() => openPolicy('ethics')} ...>
         {t('footer.ethics')}
       </button>
+      <button type="button" onClick={openPreferences} className="text-white/30 hover:text-[#F4845F] transition-colors">
+        {language === 'pt' ? 'Preferências de cookies' : language === 'es' ? 'Preferencias de cookies' : 'Cookie preferences'}
+      </button>
```

`openPreferences` abre o banner já no Estado B com os switches refletindo a escolha salva.

## 6) `CookieDetailsModal.tsx` e `CookieSettingsButton.tsx` — remoção (item 2)

Busca em todo o `src`: `CookieDetailsModal` só aparece dentro do próprio arquivo (declaração + interface) — **nenhum componente importa ou renderiza**. O mesmo vale para `CookieSettingsButton` (botão flutuante "Cookies" no canto inferior esquerdo), também órfão e cuja função passa a ser exercida pelo link do rodapé.

Diff: `rm src/components/cookies/CookieDetailsModal.tsx` e `rm src/components/cookies/CookieSettingsButton.tsx`. Não há import morto a limpar (já não havia nenhum). Se preferir manter o botão flutuante, diga e eu o mantenho atualizado com os novos textos em vez de removê-lo.

## 7) Contraste do link no rodapé (item 3)

Fundo real do rodapé: `bg-[#0B1224]` (`FooterNovo.tsx:85`). Razões calculadas (WCAG 2.1, texto pequeno exige 4,5:1):

| Cor | Razão | Resultado |
|---|---|---|
| `text-white/30` (atual dos links de política/ética) | **2,70:1** | reprova |
| `text-white/50` | 5,28:1 | aprova |
| `text-white/60` | 7,13:1 | aprova |

Uso `text-white/60` no novo link, mantendo `hover:text-[#F4845F]`. Como Política de Privacidade e Código de Ética estão hoje em `/30` (2,70:1, também reprovado) e ficariam visivelmente mais apagados ao lado do novo link, proponho subir os três para `/60` na mesma linha — confirme se quer isso ou se prefiro mexer só no link novo.

## 8) Não alterado

`useGoogleAnalytics.ts`, `campaignBeacon.ts` (lógica interna), sitemap, llms.txt, JSON-LD, `/our-ai`.

## Verificação após aplicar

Aba limpa sem interagir (zero `_ga`/hit/beacon) · Aceitar todos dispara GA4 + beacon na hora com `visitor_id == i6_aid` · Apenas essenciais silencioso · ativar Análise no painel após "Apenas essenciais" redispara o beacon · `expires_at` no passado reabre o banner · registro antigo sem `expires_at` segue válido · link do rodapé abre o Estado B · PT/EN/ES · build e validate verdes, sem diff em sitemap/llms/JSON-LD.
