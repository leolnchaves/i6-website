# Insights

Cada insight é um arquivo `.md` por idioma. Convenção de nome:

```
{slug}-pt.md
{slug}-en.md
```

## Frontmatter obrigatório

```yaml
---
title: "Título do artigo"
slug: "meu-artigo"
type: "article"          # article | linkedin | press | podcast | video
date: "2025-06-04"       # YYYY-MM-DD
language: "pt"           # pt | en
excerpt: "Resumo curto que aparece no card."
cluster: "forecasting"   # opcional, agrupamento temático
cover_image: "/lovable-uploads/xxxx.png"  # opcional
external_url: null       # obrigatório para tipos != article
read_time: 6             # minutos, opcional
featured: true           # destaque na home
gated: false             # exige formulário?
asset_url: null          # link de download (gated)
---

Conteúdo em Markdown aqui.
```

## Como aparece no site

- Listados em `/pt/insights` e `/en/insights` (hook `useInsights`)
- `featured: true` aparece também na home
- Tipos diferentes de `article` abrem o `external_url` em nova aba
- Tipo `article` renderiza a página própria em `/{lang}/insights/{slug}`

Após adicionar/editar, lembre de atualizar `public/sitemap.xml` e o array `insightArticles` em `scripts/prerender-seo-stubs.mjs` se quiser indexação SEO completa.
