## Resposta à sua pergunta

**Sim — hoje a opção "Análise" controla TUDO.** No `tracker.ts`, `setTrackerConsent(false)` apaga `i6_aid`, sessão, UTMs, journey, eventos. Se o visitante desmarca "Análise" (ou clica "Continuar sem"), perdemos:
- `anonymous_id` e `session_id`
- `first_touch` / `last_touch` (UTMs, referrer, landing)
- `pages` (journey) e `events`
- Todas as colunas H–V do Sheet ficam vazias quando ele preenche o form

Ou seja, o rastreamento de primeira parte que construímos para o i6HUB **morre junto** com o opt-out de analytics. E é exatamente isso que você quer reclassificar como "essencial".

## Plano

### 1. Reclassificar o tracker de primeira parte como essencial

Base legal: **legítimo interesse** (dado anônimo, sem terceiros, sem fingerprinting, retenção curta no `localStorage` do próprio browser, sem envio a fornecedor externo). É a mesma postura que Vercel Analytics e Plausible adotam.

Mudanças:

- **`src/lib/tracker.ts`**: remover a dependência de `consentGranted` para gravar `i6_aid`, `i6_session`, `i6_first_touch`, `i6_last_touch`, `i6_pages`, `i6_events`. Essas chaves passam a ser sempre persistidas (mesmo sem opt-in).
- Manter a **flag `analyticsConsent` apenas para GA4 (terceira parte)**: o `gtag('event', ...)` só dispara se `analytics === true`.
- Renomear `setTrackerConsent` → `setThirdPartyAnalyticsConsent` (semântica clara) e remover o "wipe everything" quando revogado — só desliga o gtag.
- **`src/hooks/useTracker.ts`**: chamar sempre `recordPageView` (independente do consent); só gatear gtag pelo consent.
- **`src/types/cookies.ts`**: ajustar copy da categoria `analytics` para deixar explícito que é **só GA4 / terceira parte** (o tracker próprio anônimo entra em "essential").

### 2. Mesclar `/cookie-settings` dentro do próprio banner

Esticar o `CookieBanner` para cima e exibir os 4 toggles + ações granulares dentro do mesmo card. Eliminar a página separada.

- **`src/components/cookies/CookieBanner.tsx`**: adicionar estado `expanded`. View colapsada = a atual (texto + 2 botões + link "Preferências"). Clicar em "Preferências" abre a view expandida no mesmo card: lista de toggles (Essenciais bloqueado, Análise GA4, Marketing, Preferências) + "Salvar preferências" / "Aceitar tudo" / "Apenas essenciais" / "Voltar".
- Card cresce para cima (`bottom-6` fixo, altura dinâmica, `max-h-[80vh] overflow-y-auto` para mobile).
- **`src/pages/CookieSettings.tsx`**: remover.
- **`src/App.tsx`**: trocar a rota `/cookie-settings` por redirect que volta para `/` (ou rota anterior) com `?cookies=open` — o `CookieBanner` lê isso e abre direto na view expandida. Mantém compatibilidade com links já indexados.
- **`src/components/cookies/CookieSettingsButton.tsx`**: continua, mas agora simplesmente reabre o banner já em modo expandido.
- **`src/components/cookies/CookieDetailsModal.tsx`**: o link "Ajustar preferências" passa a abrir o banner expandido em vez de navegar para `/cookie-settings`.

### 3. Renomear "Continuar sem" → "Rejeitar adicionais"

- `CookieBanner.tsx`: `continueEssential: 'Rejeitar adicionais'` (PT) / `'Reject additional'` (EN).
- `CookieDetailsModal.tsx`: mesma troca.

### 4. Política de Privacidade: `movimento@` → `security@`

- `src/components/privacy/PrivacyPolicyPT.tsx`: na seção 10 (Cookies / Seus direitos), trocar `movimento@infinity6.ai` por `security@infinity6.ai`.
- Verificar a versão EN da mesma seção (seção 8) e ajustar se a mesma frase existir.
- **Atualizar também a descrição das categorias**: deixar claro que o tracker anônimo de primeira parte (`anonymous_id`, journey, UTMs) entra em **Essenciais / legítimo interesse** e que a categoria "Análise" cobre apenas **GA4 (Google, terceira parte)**. Isso é importante para coerência legal com a mudança técnica do item 1.

### 5. Atualizar `.lovable/plan.md`

- Refletir que o tracker é essencial (legítimo interesse) e que H–V do Sheet são preenchidas **sempre**, independente do consent.
- Atualizar QA: o cenário "Rejeitar adicionais" agora resulta em H–V preenchidas + GA4 OFF.
- Remover referência a `/cookie-settings` como rota; mencionar que preferências granulares vivem no próprio banner.

## Detalhes técnicos

- **Sem novas dependências.** Só reorganização de estado e copy.
- **Conformidade LGPD**: tracker anônimo de primeira parte sob legítimo interesse é prática aceita desde que (a) seja anônimo, (b) o titular possa se opor, (c) esteja descrito na política. Os 3 pontos ficam cobertos: anonymous_id é UUID local (não é PII), o usuário pode limpar via `localStorage`/botão "Resetar consentimento" futuro, e a Política de Privacidade vai descrever explicitamente.
- **Bump de versão**: `COOKIE_CONSENT_VERSION` continua `'2.0'` (a semântica do toggle "analytics" mudou para "GA4 only", mas o default `analytics: true` já cobre o caso mais comum — quem tinha `analytics: false` agora vai ver GA4 OFF, que é o que ele pediu mesmo).
- **Tokens visuais**: banner expandido reusa `#0B1224`, `#F4845F`, `border-white/10`, `bg-white/[0.03]` que já estão no `CookieSettings.tsx` atual — copiar os cards de toggle de lá para dentro do banner.

## Fora de escopo

- Mudanças no Apps Script ou no Sheet.
- Reverse-IP, session replay, endpoint dedicado.
- Internacionalização nova (segue padrão inline já usado).