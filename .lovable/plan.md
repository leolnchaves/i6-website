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

- Store no módulo: `consentState` + `Set<listener>`; o hook sincroniza via `useState` + `useEffect(subscribe)`. Assim banner, rodapé e manager veem o mesmo `showBanner`/`bannerExpanded`/`consent`.
- Leitura (inicializador síncrono, já existente) passa a checar validade:

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

## 6) Não alterado

`useGoogleAnalytics.ts`, `campaignBeacon.ts` (lógica interna), sitemap, llms.txt, JSON-LD, `/our-ai`.

## Verificação após aplicar

Aba limpa sem interagir (zero `_ga`/hit/beacon) · Aceitar todos dispara GA4 + beacon na hora com `visitor_id == i6_aid` · Apenas essenciais silencioso · ativar Análise no painel após "Apenas essenciais" redispara o beacon · `expires_at` no passado reabre o banner · registro antigo sem `expires_at` segue válido · link do rodapé abre o Estado B · PT/EN/ES · build e validate verdes, sem diff em sitemap/llms/JSON-LD.
