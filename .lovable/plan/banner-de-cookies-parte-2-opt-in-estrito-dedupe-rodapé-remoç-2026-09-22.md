# Banner de cookies — Parte 2 (opt-in estrito, dedupe, rodapé, remoções)

Pré-requisito confirmado: `src/hooks/useCookieConsent.ts` (store compartilhado) já aplicado. Nada abaixo será aplicado antes da sua confirmação.

## 1) `src/types/cookies.ts`

```diff
- // Soft opt-in: analytics (GA4) ativo por padrão.
- // O tracker próprio anônimo de primeira parte é essencial (legítimo interesse)
- // e não pode ser desativado por toggle — apenas limpando o localStorage.
+ // Strict opt-in: nenhuma categoria não-essencial fica ativa até o visitante decidir.
+ // O tracker próprio anônimo de primeira parte é essencial (legítimo interesse)
+ // e não pode ser desativado por toggle — apenas limpando o localStorage.
  export const defaultCookieConsent: CookieConsent = {
    essential: true,
-   analytics: true,
+   analytics: false,
    marketing: false,
    preferences: false,
  };
```

E na categoria analytics (L40-41):

```diff
-     description:
-       'Envio anônimo para Google Analytics 4 (terceira parte): tipo de dispositivo, navegador, país aproximado. Você pode desativar a qualquer momento.',
+     description:
+       'Envio anônimo para Google Analytics 4 (terceira parte): tipo de dispositivo, navegador, país aproximado. Começa desligado e só é ativado com a sua autorização; você pode desativar a qualquer momento.',
```

Nenhum outro ponto do código define um default próprio de consentimento (busca por `analytics: true` fora deste arquivo: zero ocorrências) — o único default passa a ser `false`.

## 2) `src/hooks/useTracker.ts`

```diff
  useEffect(() => {
    setThirdPartyAnalyticsConsent(analyticsConsent);
+   if (!analyticsConsent) {
+     // Reseta a dedupe key: uma reativação futura na mesma página
+     // volta a disparar o beacon.
+     lastBeaconKey.current = null;
+   }
  }, [analyticsConsent]);
```

O restante do arquivo permanece idêntico.

## 3) `src/components/hometeste/FooterNovo.tsx`

a) Import e hook (L9 e L32):

```diff
  import { usePolicyDrawer } from '@/components/policy/PolicyDrawer';
+ import { useCookieConsent } from '@/hooks/useCookieConsent';
```

```diff
  const { openPolicy } = usePolicyDrawer();
+ const { openPreferences } = useCookieConsent();
```

b) Contraste + terceiro botão (L111-118):

```diff
  <div className="flex gap-4 text-xs">
-   <button type="button" onClick={() => openPolicy('privacy')} className="text-white/30 hover:text-[#F4845F] transition-colors">
+   <button type="button" onClick={() => openPolicy('privacy')} className="text-white/60 hover:text-[#F4845F] transition-colors">
      {t('footer.privacy')}
    </button>
-   <button type="button" onClick={() => openPolicy('ethics')} className="text-white/30 hover:text-[#F4845F] transition-colors">
+   <button type="button" onClick={() => openPolicy('ethics')} className="text-white/60 hover:text-[#F4845F] transition-colors">
      {t('footer.ethics')}
    </button>
+   <button type="button" onClick={openPreferences} className="text-white/60 hover:text-[#F4845F] transition-colors">
+     {language === 'pt' ? 'Preferências de cookies' : language === 'es' ? 'Preferencias de cookies' : 'Cookie preferences'}
+   </button>
  </div>
```

c) O copyright (L120) **permanece** `text-white/30` — sem alteração.

## 4) Remoções de código morto

- `rm src/components/cookies/CookieDetailsModal.tsx`
- `rm src/components/cookies/CookieSettingsButton.tsx`

Confirmado antes: nenhum dos dois é importado em nenhum arquivo do projeto (grep em `src/` retorna apenas a própria declaração de cada arquivo).

## Não alterados nesta rodada

`CookieBanner.tsx`, `CookieConsentManager.tsx`, `useGoogleAnalytics.ts`, `campaignBeacon.ts`, sitemap, llms.txt, JSON-LD.

## Verificação após aprovação

Build, validate-jsonld, diff de sitemap/llms.txt (esperado: zero) e Playwright com o checklist (aba limpa sem hits ao GA/beacon; "Aceitar adicionais"/equivalente dispara GA4+beacon; rodapé abre Estado B; reativação de Análise na mesma página redispara o beacon — via teste do dedupe reset).
