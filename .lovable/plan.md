# useCookieConsent.ts — store compartilhado + expiração de 365 dias

Um único arquivo muda: `src/hooks/useCookieConsent.ts` (substituição integral pelo conteúdo que você enviou). Nenhum outro arquivo é tocado nesta rodada.

## O que sai (arquivo atual, 126 linhas)

- `useState` local por instância para `consent`, `showBanner`, `bannerExpanded` → cada componente que chama o hook tem seu próprio estado, então quando o banner salva, o `CookieConsentManager` (que alimenta GA4 e o beacon) não é notificado até um reload.
- `useEffect` de mount relendo o `localStorage` e decidindo `showBanner` ali.
- `saveConsent` gravando `{ consent, version, timestamp }`, sem expiração.

## O que entra

- Leitura síncrona na inicialização do **módulo** (`readStoredConsent()` + `const initial`), com `expiresAt` no passado tratado como inválido e registro antigo sem `expiresAt` continuando válido.
- Estado de módulo `state` + `Set<() => void>` de listeners; `setState(partial)` faz merge e notifica todos.
- Cada instância mantém um `useState` espelho: no mount reforça `setLocalState(state)`, registra o listener e devolve `() => listeners.delete(listener)` como cleanup — uma inscrição por montagem, removida no unmount, sem vazamento entre banner, rodapé e manager.
- `persist()` grava `expiresAt = agora + 365 dias`.
- Deep-link `?cookies=open` preservado, agora num `useEffect` próprio que chama `setState`.
- API pública idêntica: `consent, showBanner, bannerExpanded, saveConsent, acceptAll, acceptAdditional, continueEssential, rejectAll, updateConsent, resetConsent, setShowBanner, setBannerExpanded, openPreferences` — e a lógica de cada ação inalterada (`acceptAll`/`acceptAdditional` = tudo true; `continueEssential` = essential+analytics; `rejectAll` = só essential).

## Diff (resumo por bloco)

```diff
-const COOKIE_CONSENT_KEY = 'cookie_consent';
-const COOKIE_CONSENT_VERSION = '2.0';
+const COOKIE_CONSENT_KEY = 'cookie_consent';
+const COOKIE_CONSENT_VERSION = '2.0';
+const CONSENT_TTL_MS = 365 * 24 * 60 * 60 * 1000; // 365 dias
+
+interface StoredConsent { consent: CookieConsent; version: string; timestamp: string; expiresAt?: string; }
+interface ConsentState { consent: CookieConsent; showBanner: boolean; bannerExpanded: boolean; }
+
+const readStoredConsent = (): { consent: CookieConsent; valid: boolean } => { ... }
+const initial = readStoredConsent();
+let state: ConsentState = { consent: initial.consent, showBanner: !initial.valid, bannerExpanded: false };
+const listeners = new Set<() => void>();
+const setState = (partial: Partial<ConsentState>) => { state = { ...state, ...partial }; listeners.forEach((l) => l()); };
+const persist = (consent: CookieConsent) => { ...expiresAt: agora + CONSENT_TTL_MS... };

 export const useCookieConsent = () => {
-  const [consent, setConsent] = useState<CookieConsent>(() => { ...leitura síncrona... });
-  const [showBanner, setShowBanner] = useState(false);
-  const [bannerExpanded, setBannerExpanded] = useState(false);
-  useEffect(() => { ...relê localStorage, decide showBanner, trata ?cookies=open... }, []);
+  const [localState, setLocalState] = useState<ConsentState>(state);
+  useEffect(() => { setLocalState(state); const listener = () => setLocalState(state);
+    listeners.add(listener); return () => { listeners.delete(listener); }; }, []);
+  useEffect(() => { ...?cookies=open → setState({ showBanner: true, bannerExpanded: true })... }, []);
...
-  return { consent, showBanner, bannerExpanded, ... };
+  return { consent: localState.consent, showBanner: localState.showBanner,
+           bannerExpanded: localState.bannerExpanded, ... /* mesmos nomes */ };
 }
```

O conteúdo aplicado é exatamente o arquivo que você enviou, sem alterações minhas.

## Duas observações (não mudam nada agora)

- `updateConsent` continua mexendo só no estado, sem gravar — igual ao comportamento de hoje.
- O default de `analytics` em `src/types/cookies.ts` segue `true` nesta rodada; a mudança para `false` (opt-in estrito) fica para a próxima, como você pediu.

## Verificação após aplicar

Build/typecheck verdes e o banner continuando a abrir para visitante novo, fechar ao salvar e reabrir via `?cookies=open`.
