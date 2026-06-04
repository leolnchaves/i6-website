## Visão geral

```text
┌──────────────┐     ┌──────────────────┐     ┌────────────────────┐     ┌──────────────┐
│   i6Hub      │     │ GitHub Webhook   │     │ GitHub Actions     │     │ GitHub Pages │
│ (admin CMS)  │────▶│repository_dispatch│───▶│ sync + build       │────▶│ infinity6.ai │
│ Supabase     │     └──────────────────┘     │ (.md gerados)      │     └──────────────┘
└──────────────┘                              └────────────────────┘
```

Site continua 100% estático. i6Hub vira o painel. Despublicar = 1 clique, deploy automático em ~1–2 min.

Success stories ficam fora do escopo agora — plano futuro, mesmo modelo.

---

## FASE 1 — i6Hub (CMS)

### 1.1 — Tabela `public_insights` isolada
Migration no i6Hub (projeto separado), tabela 100% isolada **sem nenhuma FK** para leads/CRM:
- Colunas: `id`, `slug`, `language` ('pt'|'en'), `title`, `type`, `date`, `cluster`, `excerpt`, `content` (markdown), `cover_image`, `external_url`, `read_time`, `featured bool default false`, `published bool default false`, `gated bool default false`, `asset_url`, `created_at`, `updated_at`.
- Unique `(slug, language)`.
- Trigger `updated_at`.

### 1.2 — RLS + GRANTs
- `SELECT` anon: **apenas onde `published = true`**.
- `SELECT/INSERT/UPDATE/DELETE` authenticated: liberado (admin protegido pelo auth do i6Hub).
- `service_role`: ALL (usado pelo GitHub Actions).

### 1.3 — Tela de admin no i6Hub
**Localização:** dentro do menu existente **Marketing & CRM → Content Radar → Site Content** (nova aba/sub-rota do Content Radar).

Antes de implementar vou inspecionar via `cross_project` o i6Hub para entender:
- Estrutura atual do Content Radar (rotas, layout, componentes de aba).
- Padrão de auth e proteção de rota usado lá.
- Componentes de UI já disponíveis (Tabs, DataTable, Form) para manter consistência visual.

Conteúdo da aba **Site Content**:
- Lista filtrável (idioma, status publicado/rascunho, tipo) + busca por título/slug.
- Form criar/editar com todos os campos + editor markdown (textarea + preview lado a lado).
- Toggles: **Publicado** (aparece no site) e **Destacar na home** (featured).
- Botão "Despublicar" (não exclui — só seta `published=false`).
- Botão "Excluir definitivamente" (confirmação dupla).
- Herda auth do Content Radar.

### 1.4 — Edge function `notify-site-rebuild`
- Trigger Postgres `AFTER INSERT/UPDATE/DELETE` em `public_insights` → chama a edge function.
- A function faz `POST` em `https://api.github.com/repos/<owner>/<repo>/dispatches` com `event_type: insights-updated`, usando secret `GITHUB_DISPATCH_TOKEN`.

---

## FASE 2 — Sync script neste site

### 2.1 — `scripts/sync-insights.mjs`
- Lê env `I6HUB_SUPABASE_URL` + `I6HUB_SUPABASE_SERVICE_KEY`.
- Fetch `public_insights` WHERE `published = true`.
- **Limpa** `src/content/insights/*.md` (preserva `README.md`).
- Gera 1 `.md` por insight com frontmatter completo + corpo markdown, nome `{slug}-{language}.md`.
- Loga "X publicados, Y arquivos gerados".
- **Falha o build** se a query falhar (não publica com dados parciais/vazios).

### 2.2 — Atualizar `.github/workflows/deploy-gh-pages.yml`
- Adicionar trigger `repository_dispatch: types: [insights-updated]`.
- Adicionar step "Sync insights from i6Hub" antes do build, lendo os 2 secrets.
- Mantém o prerender SEO existente.

### 2.3 — Documentação
- Atualizar `src/content/insights/README.md`: `.md` agora são **gerados** pelo sync — editar no i6Hub.
- Nota no `.lovable/plan.md`.

---

## FASE 3 — Secrets e tokens (passo a passo)

### 3.1 — GitHub Personal Access Token (PAT) — **você faz**
Eu te aviso no momento certo:
1. GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained** → Generate new
2. Repository access: só este repo (i6-website)
3. Permissions: `Contents: R/W` + `Metadata: R` + `Actions: R/W`
4. Copia o token e me avisa "tenho o token"

### 3.2 — Eu cadastro `GITHUB_DISPATCH_TOKEN` no i6Hub
Chamo `add_secret(['GITHUB_DISPATCH_TOKEN'])` no i6Hub — você cola no formulário seguro. Edge function `notify-site-rebuild` usa esse secret.

### 3.3 — Service Role Key do i6Hub → GitHub Secrets — **você faz**
Eu te mostro `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` do i6Hub. Você:
1. GitHub → repo deste site → Settings → Secrets and variables → Actions → New repository secret
2. Cria `I6HUB_SUPABASE_URL`
3. Cria `I6HUB_SUPABASE_SERVICE_KEY`
4. Confirma "feito"

### 3.4 — Webhook HMAC secret
Pulamos por ora (PAT já é suficiente). Adicionável depois.

---

## FASE 4 — Migração dos `.md` atuais
Script `scripts/seed-insights-to-i6hub.mjs` (one-shot):
- Lê os 4 `.md` em `src/content/insights/`.
- INSERT em `public_insights` com `published=true` e `featured` preservado.
- Confirmo via query.

---

## FASE 5 — Validação end-to-end
1. Crio insight de teste no i6Hub com `published=false` → confirmo que **não** aparece.
2. Toggle `published=true` → webhook dispara → deploy em ~1–2 min → aparece em `/insights`.
3. `featured=true` → aparece na home.
4. `published=false` de novo → some no próximo deploy.
5. Rodo `security--run_security_scan` no i6Hub.

---

## Ordem de execução

| # | Onde | Quem | O quê |
|---|------|------|-------|
| 1 | i6Hub | eu | Migration `public_insights` + RLS + GRANTs |
| 2 | i6Hub | eu | Inspecionar Content Radar + criar aba **Site Content** com CRUD |
| 3 | GitHub | **você** | Criar PAT (te guio) |
| 4 | i6Hub | eu+você | `add_secret(GITHUB_DISPATCH_TOKEN)` |
| 5 | i6Hub | eu | Edge function `notify-site-rebuild` + trigger Postgres |
| 6 | site | eu | `scripts/sync-insights.mjs` |
| 7 | site | eu | Atualizar `deploy-gh-pages.yml` |
| 8 | GitHub | **você** | Adicionar `I6HUB_SUPABASE_URL` + `I6HUB_SUPABASE_SERVICE_KEY` |
| 9 | i6Hub | eu | Seed dos 4 `.md` existentes |
| 10 | i6Hub+site | eu+você | Teste end-to-end |
| 11 | i6Hub | eu | Security scan |

---

## Plano futuro (fora do escopo agora)
Após validar o fluxo de insights, replicar o mesmo modelo para **success stories**: tabela `public_success_stories` isolada, aba na mesma localização (Content Radar → Site Content como segunda sub-aba), mesmo sync script estendido.

---

Aprovar este plano libera a execução. Vou começar pela **Fase 1.1 (migration no i6Hub)** assim que você clicar em "Implement plan".
