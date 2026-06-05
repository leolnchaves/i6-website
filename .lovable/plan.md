# Captura de Leads Anônimos — infinity6

Stack enxuta, gratuita, sem backend novo, sem comprometer a arquitetura 100% estática nem a LGPD.

## Arquitetura proposta

```text
┌─────────────────────────────────────────────────────────────┐
│  Browser (site estático)                                     │
│                                                              │
│  ┌────────────────┐   ┌──────────────────┐   ┌────────────┐ │
│  │ Consent (LGPD) │──▶│ tracker.ts       │──▶│ GA4        │ │
│  └────────────────┘   │ - anonymous_id   │   └────────────┘ │
│                       │ - UTMs (1st hit) │                  │
│                       │ - page_views[]   │                  │
│                       │ - events[]       │                  │
│                       │ (localStorage)   │                  │
│                       └────────┬─────────┘                  │
│                                │                            │
│                                ▼ no submit                  │
│                       ┌──────────────────┐                  │
│                       │ LeadGateForm /   │                  │
│                       │ ContactForm      │──┐               │
│                       └──────────────────┘  │               │
└──────────────────────────────────────────────┼──────────────┘
                                               ▼
                                  ┌──────────────────────────┐
                                  │ Apps Script (já existe)  │
                                  │ → Google Sheets          │
                                  │ → i6HUB (CRM)            │
                                  └──────────────────────────┘
```

Tudo client-side. Nenhuma nova ferramenta paga. Nenhum servidor.

## Custos

| Item | Custo |
|---|---|
| GA4 (já integrado) | Grátis |
| `tracker.ts` (código próprio, localStorage) | Grátis |
| Reverse-IP (identificar empresa) | **Adiado** — RB2B só cobre US; Leadfeeder/Clearbit pagos. Reavaliar depois |
| Session replay (PostHog/Hotjar) | Adiado — fora do orçamento e adiciona script externo |
| Apps Script + Sheets + i6HUB | Já existem, grátis |

Custo total da fase 1: **R$ 0/mês**.

## Escopo da fase 1

### 1. Módulo `src/lib/tracker.ts` (novo)
Pequena lib (~150 linhas) que centraliza:

- **`anonymous_id`**: UUID v4 gerado no primeiro acesso, salvo em `localStorage` (`i6_aid`). Persiste entre sessões.
- **`session_id`**: UUID por sessão (expira em 30 min de inatividade).
- **First-touch UTMs**: na primeira visita, captura `utm_source/medium/campaign/term/content` + `referrer` + `landing_page` e salva em `localStorage` (`i6_first_touch`). Nunca sobrescreve.
- **Last-touch UTMs**: atualiza a cada visita com UTMs novos (`i6_last_touch`).
- **Histórico de páginas**: array circular das últimas 20 páginas vistas com timestamp (`i6_pages`).
- **Eventos custom**: `track(event, props)` — guarda últimos 30 eventos relevantes (`i6_events`).
- **`getLeadContext()`**: devolve um objeto pronto para anexar ao payload do form.
- **Respeita consent**: se `CookieConsentManager` não autorizou analytics, não grava nada além do mínimo funcional.

### 2. Integração com GA4
- Enviar `anonymous_id` como `user_id` (ou `client_id` custom dimension) no GA4 já configurado.
- Disparar eventos GA4 padronizados: `insight_view`, `insight_download_started`, `insight_download_completed`, `contact_form_started`, `contact_form_submitted`, `cta_click`, `scroll_75`.
- Marcar `insight_download_completed` e `contact_form_submitted` como **conversões** no GA4.

### 3. Identity stitching nos forms
No `onSubmit` de `LeadGateForm` e `ContactForm`, chamar `getLeadContext()` e incluir no `message` (e em campos novos se o Apps Script aceitar):

```text
--- Contexto ---
anonymous_id: a1b2c3...
first_touch: utm_source=linkedin, utm_campaign=launch, referrer=...
last_touch: ...
landing_page: /pt/insights/...
pages_viewed: 4 (lista)
session_duration: 6m23s
```

Assim o **i6HUB recebe o lead já com histórico**, e dá pra reconciliar leads anônimos via `anonymous_id` se aparecer em outra captura depois.

### 4. CTAs e sinais comportamentais
Adicionar `data-track="..."` em CTAs principais (Home hero, Solutions, Insights cards, Contact) e um hook que escuta clicks → `tracker.track(...)`.

### 5. LGPD / Cookie consent
- Antes do consent: só `session_id` em memória, sem localStorage de tracking.
- Depois do consent (analytics aceito): grava `anonymous_id`, UTMs, histórico, e habilita GA4.
- Atualizar o texto do banner se necessário para mencionar o `anonymous_id`.

## Fora de escopo (fases futuras, quando fizer sentido)

- **Reverse-IP B2B** (identificar empresa) — revisitar quando tiver volume e budget. Opções: Leadfeeder (€139/mês), Clearbit Reveal, RB2B (US only).
- **Session replay** (PostHog/Hotjar) — útil para UX, mas adiciona script de terceiro e custo.
- **Server-side tagging** (GTM server-side no Cloud Run) — só se adblockers virarem problema.
- **Lead scoring automático no i6HUB** — depende do i6HUB.
- **Endpoint dedicado no i6HUB** para receber `anonymous_id` direto (hoje vai pelo Apps Script no campo `message`).

## Segurança e manutenção

- Zero PII antes do consent.
- Zero dependências externas novas (só código próprio + GA4 que já existe).
- `tracker.ts` isolado em um único módulo, fácil de manter/remover.
- Nenhum script de terceiros injetado.
- Site continua 100% estático, deploy continua via GitHub Actions.

## Entregáveis

1. `src/lib/tracker.ts` — módulo de tracking
2. `src/lib/tracker-events.ts` — constantes de eventos
3. Hook `useTracker()` para uso em componentes
4. Integração em `LeadGateForm.tsx` e `ContactForm.tsx` (anexar contexto ao `message`)
5. Integração em `App.tsx` / router (pageview automático)
6. Atualização do `CookieConsentManager` para gatear o tracker
7. Doc curta em `.lovable/plan.md` descrevendo eventos e payload

Posso seguir com a implementação dessa fase 1, ou quer ajustar o escopo antes?
