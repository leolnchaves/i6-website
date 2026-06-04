# Insights

> ⚠️ **Estes arquivos são GERADOS automaticamente.** Não edite manualmente.
>
> A fonte da verdade vive no **i6Hub** em
> `Marketing & CRM → Content Radar → Site Content`.
>
> A cada deploy, o GitHub Actions executa `scripts/sync-insights-from-i6hub.mjs`,
> que apaga todos os `.md` deste diretório (exceto este README) e regera a
> partir do feed público do i6Hub (edge function) — apenas registros com
> `published = true`.

## Como funciona

```
i6Hub (admin)
   │  (toggle salvar)
   ▼
edge function notify-site-rebuild
   │  (repository_dispatch: insights-updated)
   ▼
GitHub Actions (deploy-gh-pages.yml)
   │  fetch I6HUB_FEED_URL com X-Sync-Token
   ▼
sync-insights-from-i6hub.mjs regera .md
   │
   ▼
vite build → GitHub Pages
```

- **Despublicar artigo:** toggle `published = false` no i6Hub → próximo deploy remove o `.md`.
- **Destacar na home:** toggle `featured = true` no i6Hub.
- **Excluir definitivamente:** botão na aba Site Content (remove a linha).

## Convenção de nome de arquivo

```
{language}-{slug}.md
```

O loader (`useInsights.ts`) usa `import.meta.glob` em todos os `.md` desta
pasta, então o nome em si não importa — só serve para evitar colisões.

## Frontmatter (gerado pelo sync)

```yaml
---
title: "Título do artigo"
slug: meu-artigo
language: pt              # pt | en
type: article             # article | linkedin | press | podcast | video
cluster: "forecasting"
featured: true
gated: false
date: 2025-06-04
read_time: 6
cover_image: "/path.jpg"
external_url: "https://..."
asset_url: null
excerpt: "Resumo curto que aparece no card."
---
```

## Secrets envolvidos

| Onde | Nome | Para que serve |
|------|------|----------------|
| GitHub repo i6-website | `I6HUB_FEED_URL` | URL da edge function pública do i6Hub que devolve os insights publicados |
| GitHub repo i6-website | `I6HUB_SYNC_TOKEN` | Token compartilhado enviado em `X-Sync-Token` e validado pela edge function |
| i6Hub (Lovable secrets) | `GITHUB_DISPATCH_TOKEN` | PAT fine-grained usado pela edge function `notify-site-rebuild` para disparar o `repository_dispatch` |

O site **nunca** recebe service_role nem fala direto com o banco do i6Hub —
toda leitura é mediada pela edge function.
