# Plano completo — tracking de leads + cookie consent v2 + política de privacidade

Site continua 100% estático. **Cinco frentes**: planilha (manual), Apps Script (cole/cole), novo cookie consent, envio de campos nos forms, atualização da Política de Privacidade.

---

## Parte A — Google Sheets (manual)

Aba `ContactForm`. **Mantém** A–G. Adiciona H–V:

```text
A  date                       (existente)
B  subscription                (existente)
C  company                     (existente)
D  email                       (existente)
E  name                        (existente)
F  message                     (existente)
G  insight_id                  (existente)
H  anonymous_id                NOVO
I  session_id                  NOVO
J  first_touch_source          NOVO
K  first_touch_medium          NOVO
L  first_touch_campaign        NOVO
M  first_touch_referrer        NOVO
N  first_touch_landing_page    NOVO
O  last_touch_source           NOVO
P  last_touch_medium           NOVO
Q  last_touch_campaign         NOVO
R  pages_viewed_count          NOVO
S  journey                     NOVO
T  session_duration            NOVO
U  language                    NOVO
V  user_agent                  NOVO
```

---

## Parte B — Apps Script (cole)

```javascript
// ============ CONFIG GLOBAL ============
const SHARED_TOKEN = 'i6-web-2026-mvmnt';
const SPREADSHEET_ID = '142ByWNnIO_LP85m-uEVftKH4Ll2Is4uCUtspKJVqtGE';
const SHEET_NAME = 'ContactForm';

const COLUMN_MAP = {
  timestamp:                'date',
  subscription:             'subscription',
  company:                  'company',
  email:                    'email',
  name:                     'name',
  message:                  'message',
  insight_id:               'insight_id',
  anonymous_id:             'anonymous_id',
  session_id:               'session_id',
  first_touch_source:       'first_touch_source',
  first_touch_medium:       'first_touch_medium',
  first_touch_campaign:     'first_touch_campaign',
  first_touch_referrer:     'first_touch_referrer',
  first_touch_landing_page: 'first_touch_landing_page',
  last_touch_source:        'last_touch_source',
  last_touch_medium:        'last_touch_medium',
  last_touch_campaign:      'last_touch_campaign',
  pages_viewed_count:       'pages_viewed_count',
  journey:                  'journey',
  session_duration:         'session_duration',
  language:                 'language',
  user_agent:               'user_agent',
};

// ============ doPost ============
function doPost(e) {
  if (e.parameter.website_url) {
    return ContentService.createTextOutput('{"result":"ok"}')
      .setMimeType(ContentService.MimeType.JSON);
  }
  if (e.parameter.token !== SHARED_TOKEN) {
    return ContentService.createTextOutput('{"result":"forbidden"}')
      .setMimeType(ContentService.MimeType.JSON);
  }

  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  var p = e.parameter;
  var s = function (v, n) { return (v || '').toString().slice(0, n); };

  sheet.appendRow([
    new Date(),                              // A
    s(p.subscription, 100),                  // B
    s(p.company, 200),                       // C
    s(p.email, 255),                         // D
    s(p.name, 255),                          // E
    s(p.message, 2000),                      // F
    s(p.insight_id, 100),                    // G
    s(p.anonymous_id, 64),                   // H
    s(p.session_id, 64),                     // I
    s(p.first_touch_source, 100),            // J
    s(p.first_touch_medium, 100),            // K
    s(p.first_touch_campaign, 150),          // L
    s(p.first_touch_referrer, 500),          // M
    s(p.first_touch_landing_page, 500),      // N
    s(p.last_touch_source, 100),             // O
    s(p.last_touch_medium, 100),             // P
    s(p.last_touch_campaign, 150),           // Q
    s(p.pages_viewed_count, 10),             // R
    s(p.journey, 2000),                      // S
    s(p.session_duration, 20),               // T
    s(p.language, 5),                        // U
    s(p.user_agent, 500),                    // V
  ]);

  return ContentService.createTextOutput('{"result":"success"}')
    .setMimeType(ContentService.MimeType.JSON);
}

// ============ doGet existente ============
// Mantém o seu doGet atual; já usa COLUMN_MAP.
```

Depois: **Implantar → Gerenciar implantações → Nova versão**.

---

## Parte C — Cookie Consent v2

Modelo soft opt-in: essenciais + analytics ligados por padrão (legítimo interesse), banner pergunta só sobre **cookies adicionais**. Sem botão "Rejeitar".

**C.1 `src/types/cookies.ts**`

- `defaultCookieConsent.analytics: true` (era `false`).
- Atualizar descrição da categoria deixando claro como desativar em `/cookie-settings`.

**C.2 `src/hooks/useCookieConsent.ts**`

- `COOKIE_CONSENT_VERSION = '2.0'` (força reaparecer pra quem aceitou v1).
- Adicionar `acceptAdditional()` (tudo on) e `continueEssential()` (essentials + analytics on; marketing/preferences off).
- `rejectAll` permanece exportado para uso em `/cookie-settings`.

**C.3 `src/components/cookies/CookieBanner.tsx**` — reescrita

```text
┌──────────────────────────────────────────────────────────┐
│ Usamos cookies essenciais e de análise (anônimos) para  │
│ que o site funcione e medir desempenho. Aceita também   │
│ cookies adicionais de marketing e preferências?         │
│                                                          │
│ [Política de Privacidade] [Preferências]                │
│                                                          │
│            [ Continuar sem ]  [ Aceitar adicionais ]    │
└──────────────────────────────────────────────────────────┘
```

- Bilíngue via `useLanguage()`.
- Dark theme: `bg-[#0B1224]/95`, accent `#F4845F`.
- Sem switches inline; granularidade fica em `/cookie-settings`.

**C.4 Integração tracker**: `CookieConsentManager` já chama `useTracker(consent.analytics)`. Com `analytics=true` por padrão, o tracker liga assim que o banner é resolvido.

---

## Parte D — Forms enviando campos planos

**D.1 `src/lib/tracker.ts**` — novo helper:

```ts
export const getLeadContextFields = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  const ctx = getLeadContext();
  const ft = ctx.first_touch ?? {};
  const lt = ctx.last_touch ?? {};
  const journey = ctx.pages.slice(-10).map((p) => p.path).join(' > ');
  const fmtDuration = (ms: number | null) => {
    if (!ms || ms < 0) return '';
    const s = Math.round(ms / 1000);
    return `${Math.floor(s / 60)}m${s % 60}s`;
  };
  return {
    anonymous_id:              ctx.anonymous_id ?? '',
    session_id:                ctx.session_id ?? '',
    first_touch_source:        ft.utm_source ?? '',
    first_touch_medium:        ft.utm_medium ?? '',
    first_touch_campaign:      ft.utm_campaign ?? '',
    first_touch_referrer:      ft.referrer ?? '',
    first_touch_landing_page:  ctx.landing_page ?? '',
    last_touch_source:         lt.utm_source ?? '',
    last_touch_medium:         lt.utm_medium ?? '',
    last_touch_campaign:       lt.utm_campaign ?? '',
    pages_viewed_count:        String(ctx.pages_viewed_count),
    journey,
    session_duration:          fmtDuration(ctx.session_duration_ms),
    language:                  document.documentElement.lang || '',
    user_agent:                navigator.userAgent.slice(0, 500),
  };
};
```

**D.2 `LeadGateForm.tsx**` — antes do `fetch`:

```ts
Object.entries(getLeadContextFields()).forEach(([k, v]) => formData.append(k, v));
```

**D.3 `ContactForm.tsx**` — no mesmo loop dos hidden inputs:

```ts
Object.entries(getLeadContextFields()).forEach(([name, value]) => {
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = value;
  form.appendChild(input);
});
```

---

## Parte E — Política de Privacidade

Nova seção dedicada a cookies e analytics, refletindo o tracker + cookie consent v2.

**E.1 `src/components/privacy/PrivacyPolicyPT.tsx**` — inserir nova seção **10. Cookies e Analytics do Site** antes da atual "10. Atualizações da Política" (renumerar Atualizações → 11 e Contato → 12).

Conteúdo:

> Quando você navega em infinity6.ai, coletamos automaticamente, sob base legal de **legítimo interesse**, informações anônimas para entender como o site é usado e melhorar sua experiência. Nenhum dado pessoal identificável é coletado nesta etapa.
>
> **O que coletamos:**
>
> - **anonymous_id**: identificador anônimo (UUID) gerado no seu navegador e guardado em `localStorage`. Não identifica você pessoalmente.
> - **session_id**: identificador temporário de sessão; expira após 30 min de inatividade.
> - **Origem da visita**: parâmetros UTM (source, medium, campaign), referrer e landing page.
> - **Histórico no site**: últimas 20 páginas visitadas e últimos 30 eventos de interação (cliques em CTAs, downloads de Insights, envios de formulário).
> - **Dados técnicos via Google Analytics 4**: tipo de dispositivo, navegador, país aproximado.
>
> **Como usamos:** medir desempenho, melhorar UX e, quando você opta por preencher um formulário, anexar esse histórico anônimo ao seu contato para enriquecer o atendimento.
>
> **Cookies adicionais (marketing/preferências)**: só são ativados após consentimento explícito no banner. Você pode revisar e alterar em "Preferências de cookies".
>
> **Seus direitos:** desativar analytics em `/cookie-settings`, limpar o storage do navegador ou solicitar exclusão via [talk@infinity6.ai](mailto:movimento@infinity6.ai).

**E.2 `src/pages/PrivacyPolicy.tsx**` (EN) — espelhar a seção em inglês ("Cookies and Site Analytics") com mesmo escopo, inserida entre "International Data Transfers" e "Changes to This Policy".

**E.3 Datas** — atualizar `lastUpdated` em ambos para "Junho 2026 / Junho 2026".

---

## Parte F — Documentação

Atualizar `.lovable/plan.md` com o cabeçalho final da planilha + snippet do Apps Script (Partes A e B) para referência da equipe.

---

## Ordem de deploy

1. **Planilha** — adicionar H..V.
2. **Apps Script** — colar novo código, publicar nova versão (URL permanece).
3. **Site** — deploy do React (Partes C, D, E, F).
4. **Teste** — site anônimo: banner v2 aparece → "Continuar sem" → enviar lead em `/insights/...` e `/contact` → conferir planilha (A–G iguais, H..V preenchidas).

## Fora do escopo

- Reverse-IP (B2B), session replay, endpoint dedicado de tracking, mudanças no i6HUB pra consumir novos campos.

Aprovado pra implementar as Partes C, D, E e F?