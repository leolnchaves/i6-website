# Cookies: store compartilhado, opt-in estrito, rodapé e limpeza

## Ponto importante antes de tudo (verificado agora no código)

`src/components/cookies/CookieBanner.tsx` **ainda está na versão antiga**, não na reconstruída: os textos são "Aceitar adicionais" / "Rejeitar adicionais", o título é só "Cookies", e não existem os três botões aprovados (Aceitar todos · Personalizar · Apenas essenciais) nem as categorias com badge "Sempre ativo". `CookieConsentManager.tsx` está correto (só repassa `consent.analytics`).

Consequência prática: os itens do seu checklist que dependem de clicar em "Aceitar todos" e "Apenas essenciais" não têm esses botões hoje. Os 5 itens abaixo estão descritos exatamente como você pediu; incluí ao final um **item 6 opcional** com a atualização do banner para o Estado A/B aprovado. Diga se entra ou fica fora.

---

## 1) `src/hooks/useCookieConsent.ts` — store compartilhado + expiração 365 dias

Hoje cada chamada do hook tem seu próprio `useState`, então o `CookieConsentManager` (que alimenta GA4 e o beacon) não é notificado quando o banner salva. Novo mecanismo, API pública idêntica:

```ts
import { useState, useEffect, useCallback } from 'react';
import { CookieConsent, defaultCookieConsent } from '@/types/cookies';

const COOKIE_CONSENT_KEY = 'cookie_consent';
const COOKIE_CONSENT_VERSION = '2.0';
const TTL_DAYS = 365;

type StoredConsent = {
  consent: CookieConsent;
  version: string;
  timestamp: string;
  expiresAt?: string;
};

type ConsentState = {
  consent: CookieConsent;
  showBanner: boolean;
  bannerExpanded: boolean;
};

// Leitura SÍNCRONA na inicialização do módulo (não em useEffect):
// nenhum render acontece com o default quando já existe escolha válida.
// Registro antigo sem `expiresAt` continua válido indefinidamente.
const readStored = (): CookieConsent | null => {
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.version !== COOKIE_CONSENT_VERSION) return null;
    if (parsed.expiresAt && new Date(parsed.expiresAt).getTime() < Date.now()) return null;
    return parsed.consent;
  } catch {
    return null;
  }
};

const initial = readStored();

// ---- Estado de módulo: fonte única compartilhada por todas as instâncias ----
let state: ConsentState = {
  consent: initial ?? defaultCookieConsent,
  showBanner: initial === null,
  bannerExpanded: false,
};

const listeners = new Set<(s: ConsentState) => void>();

const setState = (partial: Partial<ConsentState>) => {
  state = { ...state, ...partial };
  listeners.forEach((listener) => listener(state));
};

// Deep-link de compatibilidade: ?cookies=open abre direto no Estado B.
try {
  if (new URLSearchParams(window.location.search).get('cookies') === 'open') {
    state = { ...state, showBanner: true, bannerExpanded: true };
  }
} catch {
  /* noop */
}

export const useCookieConsent = () => {
  const [local, setLocalState] = useState<ConsentState>(state);

  useEffect(() => {
    setLocalState(state);           // (a) reforça o valor atual do store no mount
    return listenersSubscribe(setLocalState); // (b) inscrição + cleanup no unmount
  }, []);

  const saveConsent = useCallback((newConsent: CookieConsent) => {
    const now = Date.now();
    const data: StoredConsent = {
      consent: newConsent,
      version: COOKIE_CONSENT_VERSION,
      timestamp: new Date(now).toISOString(),
      expiresAt: new Date(now + TTL_DAYS * 86400000).toISOString(),
    };
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving consent:', error);
    }
    setState({ consent: newConsent, showBanner: false, bannerExpanded: false });
  }, []);

  const acceptAll = useCallback(
    () => saveConsent({ essential: true, analytics: true, marketing: true, preferences: true }),
    [saveConsent]
  );
  const acceptAdditional = acceptAll-equivalente (mesma lógica de hoje);
  const continueEssential = useCallback(
    () => saveConsent({ essential: true, analytics: true, marketing: false, preferences: false }),
    [saveConsent]
  );
  const rejectAll = useCallback(
    () => saveConsent({ essential: true, analytics: false, marketing: false, preferences: false }),
    [saveConsent]
  );
  const updateConsent = useCallback((category: keyof CookieConsent, value: boolean) => {
    if (category === 'essential') return;
    setState({ consent: { ...state.consent, [category]: value } });
  }, []);
  const resetConsent = useCallback(() => {
    try { localStorage.removeItem(COOKIE_CONSENT_KEY); } catch { /* noop */ }
    setState({ consent: defaultCookieConsent, showBanner: true });
  }, []);
  const openPreferences = useCallback(
    () => setState({ showBanner: true, bannerExpanded: true }),
    []
  );

  return {
    consent: local.consent,
    showBanner: local.showBanner,
    bannerExpanded: local.bannerExpanded,
    saveConsent, acceptAll, acceptAdditional, continueEssential, rejectAll,
    updateConsent, resetConsent,
    setShowBanner: (v: boolean) => setState({ showBanner: v }),
    setBannerExpanded: (v: boolean) => setState({ bannerExpanded: v }),
    openPreferences,
  };
};
```

`listenersSubscribe` é a função auxiliar de nível de módulo que adiciona o listener ao `Set` e devolve `() => listeners.delete(listener)` — esse retorno é o cleanup do `useEffect`, então cada montagem inscreve exatamente um listener e o remove no unmount: **sem vazamento** entre montagens de banner, rodapé e manager. Lógica de negócio de cada ação idêntica à de hoje; muda só o mecanismo de estado.

## 2) `src/types/cookies.ts` — opt-in estrito

```diff
-// Soft opt-in: analytics (GA4) ativo por padrão.
-// O tracker próprio anônimo de primeira parte é essencial (legítimo interesse)
-// e não pode ser desativado por toggle — apenas limpando o localStorage.
+// Opt-in estrito: analytics (GA4) começa DESLIGADO e só liga após escolha
+// explícita do visitante no banner. O tracker anônimo de primeira parte
+// permanece essencial (legítimo interesse).
 export const defaultCookieConsent: CookieConsent = {
   essential: true,
-  analytics: true,
+  analytics: false,
   marketing: false,
   preferences: false,
 };
```

E na descrição da categoria `analytics`:

```diff
-      'Envio anônimo para Google Analytics 4 (terceira parte): tipo de dispositivo, navegador, país aproximado. Você pode desativar a qualquer momento.',
+      'Envio anônimo para Google Analytics 4 (terceira parte): tipo de dispositivo, navegador, país aproximado. Começa desligado e só é ativado com a sua autorização; você pode desativar a qualquer momento.',
```

## 3) `src/hooks/useTracker.ts` — reset da chave de dedupe

```diff
   useEffect(() => {
     setThirdPartyAnalyticsConsent(analyticsConsent);
+    // Sem consentimento, esquece a última chave: um novo aceite na MESMA
+    // página volta a disparar o beacon, sem exigir troca de rota.
+    if (!analyticsConsent) {
+      lastBeaconKey.current = null;
+    }
   }, [analyticsConsent]);
```

## 4) `src/components/hometeste/FooterNovo.tsx`

```diff
+import { useCookieConsent } from '@/hooks/useCookieConsent';
...
   const { openPolicy } = usePolicyDrawer();
+  const { openPreferences } = useCookieConsent();
...
     <div className="flex gap-4 text-xs">
-      <button type="button" onClick={() => openPolicy('privacy')} className="text-white/30 hover:text-[#F4845F] transition-colors">
+      <button type="button" onClick={() => openPolicy('privacy')} className="text-white/60 hover:text-[#F4845F] transition-colors">
         {t('footer.privacy')}
       </button>
-      <button type="button" onClick={() => openPolicy('ethics')} className="text-white/30 hover:text-[#F4845F] transition-colors">
+      <button type="button" onClick={() => openPolicy('ethics')} className="text-white/60 hover:text-[#F4845F] transition-colors">
         {t('footer.ethics')}
       </button>
+      <button type="button" onClick={openPreferences} className="text-white/60 hover:text-[#F4845F] transition-colors">
+        {language === 'pt' ? 'Preferências de cookies' : language === 'es' ? 'Preferencias de cookies' : 'Cookie preferences'}
+      </button>
     </div>
 
     <p className="text-white/30 text-xs mt-3">{copyright}</p>
```

Contraste sobre o fundo real `bg-[#0B1224]` (linha 85): `white/30` = 2,70:1 (reprova) → `white/60` = 7,13:1 (aprova). Copyright segue em `/30`, como pedido.

## 5) Remoção de código morto

`rm src/components/cookies/CookieDetailsModal.tsx` e `rm src/components/cookies/CookieSettingsButton.tsx` — busca em todo o `src` confirma zero imports (só as próprias declarações). Nenhum import morto a limpar.

## 6) Opcional — atualizar `CookieBanner.tsx` para o Estado A/B aprovado

Só se você confirmar: título "Cookies e privacidade / Cookies and privacy / Cookies y privacidad", mensagem aprovada, três botões de mesmo nível hierárquico (Aceitar todos coral · Personalizar · Apenas essenciais), e o painel Personalizar com switch por categoria, badge "Sempre ativo" nos essenciais e os botões Salvar escolhas / Aceitar todos / Apenas essenciais / Voltar — nos três idiomas.

## Verificação após aplicar

Aba limpa sem interagir (zero `_ga`, zero hit GA, zero beacon) · Aceitar todos dispara GA4 e beacon na hora, sem reload, `visitor_id == i6_aid` · Apenas essenciais silencioso · ativar Análise no painel após "Apenas essenciais" na mesma página redispara o beacon · `expiresAt` no passado reabre o banner · registro antigo sem `expiresAt` segue válido · link do rodapé abre o Estado B com a escolha salva · PT/EN/ES · build e validate verdes, sem mudança em sitemap, llms.txt ou JSON-LD.
