# Insights

> ⚠️ **Estes arquivos são GERADOS automaticamente.** Não edite manualmente.
>
> A fonte da verdade vive no **i6Hub** em
> `Marketing & CRM → Content Radar → Site Content`.
>
> A cada deploy, o GitHub Actions executa `scripts/sync-insights.mjs`, que
> apaga todos os `.md` deste diretório (exceto este README) e regera a partir
> da tabela `public_insights` do i6Hub onde `published = true`.

## Como funciona

```
i6Hub (admin)  ─►  webhook (repository_dispatch)  ─►  GitHub Actions
                                                          │
                                                          ▼
                                            sync-insights.mjs (regera .md)
                                                          │
                                                          ▼
                                                  vite build → GH Pages
```

- **Despublicar artigo:** toggle `published = false` no i6Hub → próximo deploy remove o `.md`.
- **Destacar na home:** toggle `featured = true` no i6Hub.
- **Excluir definitivamente:** botão na aba Site Content (remove a linha).

## Convenção de nome de arquivo

```
{slug}-{language}.md
```

## Frontmatter (gerado pelo sync)

```yaml
---
title: "Título do artigo"
slug: "meu-artigo"
type: "article"          # article | linkedin | press | podcast | video
date: "2025-06-04"
language: "pt"           # pt | en
cluster: "forecasting"
excerpt: "Resumo curto que aparece no card."
cover_image: null
external_url: null
read_time: 6
featured: true
gated: false
asset_url: null
---
```

## Onde aparecem no site

- Listados em `/pt/insights` e `/en/insights` (hook `useInsights`)
- `featured: true` aparece também na home
- Tipos diferentes de `article` abrem o `external_url` em nova aba
- Tipo `article` renderiza a página própria em `/{lang}/insights/{slug}`

## Seed inicial (one-shot)

Para popular o `public_insights` do i6Hub com os artigos existentes:

```bash
export I6HUB_SUPABASE_URL="https://<ref>.supabase.co"
export I6HUB_SUPABASE_SERVICE_KEY="<service-role-key>"
node scripts/seed-insights-to-i6hub.mjs
```
