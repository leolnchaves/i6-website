# Eventos de Analytics — infinity6

Mapeamento de todos os eventos enviados ao GA4 (`G-781CHFGQ38`) e onde são disparados no código.

> **Base legal**: Tracker de primeira parte (UUID anônimo, UTMs, jornada) é sempre ativo (legítimo interesse).
> O envio para GA4 (terceira parte) só ocorre quando o usuário aceita "Análise" no banner de cookies.

---

## 1. Eventos automáticos do GA4

Disparados pelo próprio gtag.js — não precisam de marcação manual.

| Evento            | Quando dispara                          |
| ----------------- | --------------------------------------- |
| `first_visit`     | Primeira sessão de um visitante         |
| `session_start`   | Início de cada sessão                   |
| `user_engagement` | Engajamento ativo (>10s, foco, scroll)  |

---

## 2. Pageview (SPA)

| Evento      | Arquivo                           | Linha | Detalhe                                                                                  |
| ----------- | --------------------------------- | ----- | ---------------------------------------------------------------------------------------- |
| `page_view` | `src/hooks/useGoogleAnalytics.ts` | 32    | Disparado a cada mudança de rota do React Router. `send_page_view: false` no `config` evita duplicidade. |

Em paralelo, o tracker de primeira parte registra a página em `localStorage`:

| Função           | Arquivo                   | Linha | Detalhe                                            |
| ---------------- | ------------------------- | ----- | -------------------------------------------------- |
| `recordPageView` | `src/hooks/useTracker.ts` | 25    | Sempre ativo, independente do consent de Análise. |

---

## 3. Eventos custom enviados para GA4

Todos os eventos passam por `trackEvent()` em `src/lib/tracker.ts`, que adiciona automaticamente o parâmetro `anonymous_id` (UUID de primeira parte) e encaminha para o GA4 via `gtag('event', ...)` quando há consent.

### 3.1 Atualmente disparados no site

| Evento                       | Arquivo                                    | Linha | Quando dispara                                       | Parâmetros enviados                | Conversion? |
| ---------------------------- | ------------------------------------------ | ----- | ---------------------------------------------------- | ---------------------------------- | ----------- |
| `insight_download_completed` | `src/components/insights/LeadGateForm.tsx` | 120   | Lead preenche o formulário gated e baixa o insight   | `slug`, `language`, `anonymous_id` | ✅ **Sim**  |
| `contact_form_submitted`     | `src/components/contact/ContactForm.tsx`   | 131   | Lead envia o formulário de contato com sucesso       | `subject`, `anonymous_id`          | ✅ **Sim**  |

### 3.2 Definidos no catálogo mas ainda não disparados

Definidos em `src/lib/tracker-events.ts` para uso futuro. Não chegam ao GA4 hoje porque nenhum componente chama `trackEvent()` com eles.

| Evento                     | Uso planejado                                       | Onde implementar                                |
| -------------------------- | --------------------------------------------------- | ----------------------------------------------- |
| `insight_view`             | Visitante abre um artigo de insight                 | `InsightArticle.tsx` (useEffect on mount)       |
| `insight_download_started` | Clica em baixar antes de preencher o gate           | Botão de download do `LeadGateForm`             |
| `contact_form_started`     | Começa a preencher o formulário (1º focus)          | `onFocus` do primeiro campo do `ContactForm`    |
| `cta_click`                | Clique em CTAs principais (Home, Solutions, etc.)   | `onClick` dos `Button` de CTA                   |
| `scroll_75`                | Visitante rolou 75% da página                       | IntersectionObserver global                     |

---

## 4. Parâmetros globais

Enviados em **todos** os eventos custom via `trackEvent()`:

| Parâmetro      | Origem                                   | Tipo no GA4                                                                                |
| -------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------ |
| `anonymous_id` | UUID gerado no `localStorage` (`i6_aid`) | Custom Dimension (Event scope) — **registrar manualmente** em Admin → Custom definitions  |

UTMs (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`) são capturadas automaticamente pelo GA4 quando presentes na URL — não precisam ser enviadas manualmente.

---

## 5. Conversões recomendadas

Marcar em **Admin → Events → toggle "Mark as conversion"**:

- ✅ `contact_form_submitted` — lead qualificado (fim de funil)
- ✅ `insight_download_completed` — lead capturado via gated content

**Não marcar** (são micro-conversões úteis para análise de funil, mas inflam o número de conversões):
`insight_view`, `*_started`, `cta_click`, `scroll_75`.

---

## 6. Validação

1. Aceitar "Análise" no banner de cookies do site publicado.
2. GA4 → **Configure → DebugView** (ativar Debug Mode via extensão Google Analytics Debugger no Chrome).
3. Disparar uma ação (ex.: enviar form de contato).
4. Conferir que o evento aparece no DebugView com `anonymous_id` preenchido.
5. Após 24–48h, o evento fica disponível em **Admin → Events** para marcar como conversion.

---

## 7. Referências de código

- `src/lib/tracker-events.ts` — catálogo de nomes canônicos
- `src/lib/tracker.ts` — engine (`trackEvent`, `recordPageView`)
- `src/hooks/useTracker.ts` — integração com React Router
- `src/hooks/useGoogleAnalytics.ts` — integração com GA4 e Consent Mode v2
- `src/hooks/useCookieConsent.ts` — gestão de consent
