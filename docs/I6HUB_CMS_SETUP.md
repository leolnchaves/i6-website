# i6Hub CMS — Setup do site infinity6

Arquitetura: o **i6Hub** é o painel admin dos artigos do site
`infinity6.ai`. Quando um artigo é salvo no i6Hub, um trigger Postgres
chama a edge function `notify-site-rebuild`, que dispara um
`repository_dispatch` no GitHub deste repo. O GitHub Actions então faz
`fetch` na edge function pública de **feed** do i6Hub (autenticada por
`X-Sync-Token`), regenera os `.md` em `src/content/insights/` e publica
no GitHub Pages.

```
i6Hub (admin)
   │
   ▼
edge: notify-site-rebuild  ──►  GitHub repository_dispatch (insights-updated)
                                          │
                                          ▼
                                GitHub Actions: deploy-gh-pages.yml
                                          │
                                          ▼  fetch (X-Sync-Token)
                                edge: public-insights-feed  (i6Hub)
                                          │
                                          ▼
                                sync-insights-from-i6hub.mjs regera .md
                                          │
                                          ▼
                                vite build → GitHub Pages
```

> **Segurança:** o repo do site **NÃO** tem mais o `service_role` do i6Hub.
> A leitura é feita via edge function pública, autenticada por um token
> compartilhado simples (`I6HUB_SYNC_TOKEN`). Se o token vazar, o pior
> caso é alguém ler dados que já são públicos (apenas linhas com
> `published = true`).

---

## Checklist de execução

### ✅ Parte A — Site (implementado neste repo)

- `scripts/sync-insights-from-i6hub.mjs` (fetch feed + regrava `.md`)
- `.github/workflows/deploy-gh-pages.yml` com trigger `repository_dispatch: [insights-updated]` e step de sync usando `I6HUB_FEED_URL` + `I6HUB_SYNC_TOKEN`
- `src/content/insights/README.md` atualizado

### ✅ Parte B — PAT do GitHub para o i6Hub

PAT fine-grained `i6hub-dispatch-i6-website` já criado e colado como
secret `GITHUB_DISPATCH_TOKEN` no projeto i6Hub.

Auditoria recomendada (no GitHub → Settings → Developer settings →
Personal access tokens → Fine-grained):

- Tipo: **Fine-grained** (não classic)
- Repository access: **apenas** `leolnchaves/i6-website`
- Permissions: `Contents: Read` + `Metadata: Read` + `Actions: Read and write`
- Expiração: 90 dias

Se estiver classic, gere um fine-grained novo e me peça pra rodar
`update_secret` no projeto i6Hub.

### ✅ Parte C — i6Hub (implementado lá)

- Tabela `public_insights` (isolada, sem FK pra leads/CRM)
- Aba **Site Content** em Marketing & CRM → Content Radar
- Edge function `notify-site-rebuild` + trigger Postgres
- Edge function `public-insights-feed` (retorna JSON dos `published = true`, valida `X-Sync-Token`)

### 🔲 Parte D — 2 GitHub Secrets neste repo

GitHub → repo `i6-website` → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.

| Nome | Valor |
|------|-------|
| `I6HUB_FEED_URL` | URL da edge function `public-insights-feed` (ex: `https://<ref>.functions.supabase.co/public-insights-feed`) |
| `I6HUB_SYNC_TOKEN` | Token compartilhado configurado na edge function do i6Hub |

Pegue os dois valores no projeto i6Hub (peça pra IA de lá: "me mostre
a URL pública da função `public-insights-feed` e o `I6HUB_SYNC_TOKEN`").

### ✅ Parte E — Seed inicial

Pulada — os 4 artigos foram criados manualmente na aba **Site Content** do i6Hub.

### 🔲 Parte F — Teste end-to-end

1. No i6Hub, crie um insight com `published = false` → confirme que **não** aparece em `https://infinity6.ai/pt/insights`.
2. Toggle `published = true` → webhook dispara → deploy roda em ~1–2 min → aparece.
3. Toggle `featured = true` → aparece na home.
4. Toggle `published = false` → some no próximo deploy.

Acompanhe em GitHub → repo `i6-website` → aba **Actions** → workflow
"Deploy to GitHub Pages".

---

## Referência: secrets e configs

| Onde | Nome | Origem | Quem cria |
|------|------|--------|-----------|
| GitHub repo i6-website | `I6HUB_FEED_URL` | URL da edge `public-insights-feed` do i6Hub | você (Parte D) |
| GitHub repo i6-website | `I6HUB_SYNC_TOKEN` | Token validado pela edge feed | você (Parte D) |
| i6Hub (Lovable secrets) | `GITHUB_DISPATCH_TOKEN` | PAT fine-grained do GitHub | já configurado (Parte B) |
| i6Hub (Lovable secrets) | `I6HUB_SYNC_TOKEN` | Mesmo valor do GitHub Secret | já configurado (Parte C) |
