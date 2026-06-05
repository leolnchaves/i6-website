# Documentação de Eventos de Analytics

Criar `docs/ANALYTICS_EVENTS.md` com o mapeamento completo de todos os eventos enviados ao GA4 e onde cada um é disparado no código.

## Conteúdo do arquivo

````markdown
# Eventos de Analytics — infinity6

Mapeamento de todos os eventos enviados ao GA4 (`G-781CHFGQ38`) e onde são disparados no código.

> Base legal: Tracker de primeira parte (UUID anônimo, UTMs, jornada) é sempre ativo (legítimo interesse).
> O envio para GA4 (terceira parte) só ocorre quando o usuário aceita "Análise" no banner de cookies.

## 1. Eventos automáticos do GA4
- `first_visit`, `session_start`, `user_engagement` — disparados pelo gtag.js, sem ação no código.

## 2. Pageview (SPA)
- `page_view` — `src/hooks/useGoogleAnalytics.ts:32`, a cada mudança de rota do React Router (com `send_page_view: false` no config para evitar duplicidade).
- `recordPageView` (primeira parte, localStorage) — `src/hooks/useTracker.ts:25`, sempre ativo.

## 3. Eventos custom enviados para GA4

Todos passam por `trackEvent()` em `src/lib/tracker.ts`, que adiciona `anonymous_id` automaticamente.

### 3.1 Atualmente disparados no site

| Evento | Arquivo | Linha | Quando | Params | Conversion? |
|---|---|---|---|---|---|
| `insight_download_completed` | `src/components/insights/LeadGateForm.tsx` | 120 | Lead conclui o gate e baixa o insight | `slug`, `language`, `anonymous_id` | ✅ Sim |
| `contact_form_submitted` | `src/components/contact/ContactForm.tsx` | 131 | Envio do form de contato com sucesso | `subject`, `anonymous_id` | ✅ Sim |

### 3.2 Definidos em `tracker-events.ts` mas ainda não disparados

| Evento | Uso planejado | Onde implementar |
|---|---|---|
| `insight_view` | Abrir artigo de insight | `InsightArticle.tsx` (useEffect) |
| `insight_download_started` | Clicar em baixar antes do gate | Botão do `LeadGateForm` |
| `contact_form_started` | Começar a preencher o form | `onFocus` do 1º campo |
| `cta_click` | Clique em CTAs principais | `onClick` dos `Button` de CTA |
| `scroll_75` | Rolagem de 75% da página | IntersectionObserver global |

## 4. Parâmetros globais
- `anonymous_id`: UUID em `localStorage` (`i6_aid`). Registrar como Custom Dimension (Event scope) em Admin → Custom definitions.
- UTMs capturadas automaticamente pelo GA4 a partir da URL.

## 5. Conversões recomendadas
- ✅ `contact_form_submitted`
- ✅ `insight_download_completed`
- Não marcar: `insight_view`, `*_started`, `cta_click`, `scroll_75`.

## 6. Validação
1. Aceitar "Análise" no banner do site publicado.
2. GA4 → Configure → DebugView (com extensão Google Analytics Debugger).
3. Disparar a ação e verificar o evento com `anonymous_id`.
4. Após 24–48h, marcar como conversion em Admin → Events.

## 7. Referências de código
- `src/lib/tracker-events.ts` — catálogo de nomes
- `src/lib/tracker.ts` — engine (`trackEvent`, `recordPageView`)
- `src/hooks/useTracker.ts` — integração React Router
- `src/hooks/useGoogleAnalytics.ts` — integração GA4
- `src/hooks/useCookieConsent.ts` — consent
````

## Arquivo afetado
- **criar**: `docs/ANALYTICS_EVENTS.md`

Nenhum código de produção é alterado.
