# i6Hub CMS — Roadmap dos demais conteúdos

> Complementa `docs/I6HUB_CMS_SETUP.md` (que cobre Insights).
> Este documento descreve, passo a passo, o que pedir ao Lovable
> (no projeto **i6Hub** e neste repo) para colocar **mais 3 conteúdos** sob CMS,
> espelhando exatamente o fluxo de Insights.

## Arquitetura (igual à de Insights)

```
i6Hub (admin)
   │  (toggle salvar)
   ▼
edge function notify-site-rebuild
   │  (repository_dispatch: <item>-updated)
   ▼
GitHub Actions (deploy-gh-pages.yml)
   │  fetch I6HUB_FEED_URL_<ITEM> com X-Sync-Token
   ▼
scripts/sync-<item>-from-i6hub.mjs regera os .md
   │
   ▼
vite build → GitHub Pages
```

## Itens cobertos

| # | Item | Pasta no repo | CMS já implementado? |
|---|---|---|---|
| 1 | **i6 Intelligence** | `src/content/intelligence/` | ❌ |
| 2 | **Landings de Transformação** | `src/content/landings/` | ❌ |
| 3 | **Success Stories (Cases)** | `src/content/stories/` | ❌ |

> Fora de escopo deste roadmap: `public/content/{testimonials,results,partners,page-solutions,solutions-seo}-*.md`
> (edição direta no repo, sem demanda imediata de CMS).

---

## 1. i6 Intelligence

### 1.1 Prompt para o Lovable do i6Hub

Cole este texto no chat do projeto i6Hub:

> Implementar o tipo de conteúdo **Intelligence** no Site Content, espelhando o que já existe para Insights.
>
> **a) Tabela `public_intelligence`**:
> id (uuid pk), slug (text), language (text 'pt'|'en'), title (text), excerpt (text),
> date (date), sector (enum: farma|industria|financeiro|varejo|ecommerce|multissetor),
> theme (enum: demanda|margem|estoque|mix|propensao|cac),
> read_time (int), featured (bool), published (bool default false),
> cover_image (text), cover_image_data (text), cover_image_mime (text),
> related_product (text), related_story_slug (text),
> body_md (text), created_at, updated_at.
> UNIQUE(slug, language).
> Mesmo padrão de RLS/GRANT de `public_insights`.
>
> **b) Aba "Intelligence"** em Marketing & CRM → Content Radar → Site Content.
> Form com todos os campos acima. Slug livre. Pair-gate PT/EN ao publicar.
>
> **c) Edge function `public-intelligence-feed`**: lista `published = true`,
> valida `X-Sync-Token` (mesmo `I6HUB_SYNC_TOKEN` já configurado).
>
> **d)** Adicionar `intelligence-updated` no event_type da edge
> `notify-site-rebuild` (com trigger Postgres por INSERT/UPDATE em
> `public_intelligence`).

### 1.2 Prompt para o Lovable deste repo

> a) Criar `scripts/sync-intelligence-from-i6hub.mjs` espelhando
> `scripts/sync-insights-from-i6hub.mjs`. Escreve em
> `src/content/intelligence/<slug>-<language>.md`. Preserva `README.md`.
> Imagens base64 → `public/lovable-uploads/intelligence/<slug>.<ext>`.
>
> b) Em `.github/workflows/deploy-gh-pages.yml`: adicionar
> `intelligence-updated` em `repository_dispatch.types` e novo step
> "Sync intelligence" antes do build usando
> `I6HUB_FEED_URL_INTELLIGENCE` + `I6HUB_SYNC_TOKEN`.

### 1.3 Secret a adicionar no GitHub

`I6HUB_FEED_URL_INTELLIGENCE` = URL da edge `public-intelligence-feed`.

### 1.4 Estrutura do MD (frontmatter completo)

Schema completo em [`src/content/intelligence/README.md`](../src/content/intelligence/README.md).

Resumo do frontmatter:

```yaml
---
id: ruptura-gondola-ia-preditiva
title: "Como reduzir ruptura de gôndola com IA preditiva no varejo farmacêutico"
slug: ruptura-gondola-ia-preditiva
language: pt            # pt | en
date: 2026-06-12
sector: farma           # farma|industria|financeiro|varejo|ecommerce|multissetor
theme: estoque          # demanda|margem|estoque|mix|propensao|cac
excerpt: "1 a 3 frases citation magnet (140–280 chars)"
read_time: 8
featured: true
cover_image: /lovable-uploads/intelligence/<slug>.png
related_product: i6previsio         # opcional — i6recsys|i6elasticprice|i6previsio
related_story_slug: marketplace-excellence-pharmacy   # opcional — slug de case
---
```

Corpo (H2 recomendados):
`## Resposta direta` · `## O tamanho do problema` · `## Por que abordagens
tradicionais falham` · `## O motor proprietário da infinity6` ·
`## Resultado anonimizado` · `## Perguntas frequentes` · `## Próximo passo`.

---

## 2. Landings de Transformação

### 2.1 Prompt para o Lovable do i6Hub

> Implementar o tipo de conteúdo **Landing** no Site Content.
>
> **a) Tabela `public_landings`**:
> id, slug (text com CHECK na whitelist abaixo),
> language ('pt'|'en'), title, description, hero_kicker, hero_headline, hero_sub,
> sectors (text CSV), hub_theme (enum: demand|margin|inventory|mix|propensity),
> related_engines (text CSV: i6previsio|i6recsys|i6elasticprice|i6signal),
> related_stories (text CSV — slugs de cases),
> cover_image, cover_image_data, cover_image_mime,
> body_md, published (bool default false), created_at, updated_at.
> UNIQUE(slug, language).
>
> Whitelist de slugs (CHECK):
> `demand-supply-efficiency`, `data-monetization`,
> `predictive-operations`, `behavior-conversion`.
>
> **b) Aba "Landings"** com slug = **select travado** aos 4 valores.
> Pair-gate PT/EN ao publicar.
>
> **c) Edge `public-landings-feed`** (X-Sync-Token).
> **d)** Adicionar `landings-updated` em `notify-site-rebuild`.

### 2.2 Prompt para o Lovable deste repo

> a) Criar `scripts/sync-landings-from-i6hub.mjs` mirror do de insights.
> Escreve em `src/content/landings/<slug>-<language>.md`. Preserva README.md.
>
> b) Adicionar `landings-updated` em `repository_dispatch.types` no workflow +
> step "Sync landings" antes do build usando `I6HUB_FEED_URL_LANDINGS`.

### 2.3 Secret a adicionar no GitHub

`I6HUB_FEED_URL_LANDINGS` = URL da edge `public-landings-feed`.

### 2.4 Estrutura do MD

Schema completo em [`src/content/landings/README.md`](../src/content/landings/README.md).

Frontmatter:

```yaml
---
title: "Eficiência de Demanda e Oferta com IA Preditiva"
description: "Citation-friendly meta description (140–280 chars)."
slug: demand-supply-efficiency       # whitelist (4 valores)
language: pt                          # pt | en
hero_kicker: "Transformação · Demanda & Oferta"
hero_headline: "Balance demand and supply…"
hero_sub: "Sub-headline que explica a promessa."
sectors: "varejo, farma, indústria, CPG"
hub_theme: demand                     # demand|margin|inventory|mix|propensity
related_engines: "i6previsio, i6recsys, i6signal"
related_stories: "marketplace-excellence-pharmacy, sales-forecast-precision"
cover_image: null
---
```

Seções H2 obrigatórias (o componente depende dos nomes):

| heading | papel |
|---|---|
| `## Pain` / `## Dor` | 3 dores reais |
| `## Problem` / `## Problema` | por que IA genérica falha |
| `## Solution` / `## Solução` | engines aplicados |
| `## Application` / `## Aplicação` | como roda em produção |
| `## Results` / `## Resultados` | bullets `- **−38%** label \| source` |
| `## FAQ` / `## Perguntas frequentes` | `**Q?**` + parágrafo |

---

## 3. Success Stories (Cases)

> Em junho/2026 os cases foram migrados do MD agregado
> (`public/content/page-success-stories-{pt,en}.md`, descontinuado) para
> **1 arquivo MD por (slug, idioma)** em `src/content/stories/`, com
> frontmatter YAML — exatamente o mesmo padrão de Intelligence/Landings.
> Esta migração já está em produção; o roadmap CMS abaixo só pluga o i6Hub
> em cima desse padrão.

### 3.1 Prompt para o Lovable do i6Hub

> Implementar o tipo de conteúdo **Story** (Success Stories) no Site Content.
>
> **a) Tabela `public_stories`**:
> id (uuid pk), slug (text), language ('pt'|'en'),
> sort_order (int) — ordem na grid,
> segment (text — Indústria|Varejo|Finanças|etc.),
> title (text — antigo H2 do bloco),
> client (text), client_anon (bool — quando true, oculta nome real),
> description (text), challenge (text), solution (text),
> metric1 (text), metric2 (text), metric3 (text),
> solutions (text CSV — produtos infinity6 aplicados),
> quote (text), customer_name (text), customer_title (text),
> show_home (bool — destaca na home), published (bool default false),
> cover_image (text), cover_image_data (text), cover_image_mime (text),
> logo_image (text), logo_data (text), logo_mime (text),
> created_at, updated_at.
> UNIQUE(slug, language).
> Mesmo padrão de RLS/GRANT de `public_insights`.
>
> **b) Aba "Success Stories"** em Marketing & CRM → Content Radar → Site Content.
> Form com todos os campos. Pair-gate PT/EN ao publicar.
> Toggle `client_anon`: quando true, força `customer_name` e `customer_title`
> a vazio e exibe logo neutro infinity6 no preview.
> Campo `sort_order` controla a ordem do MD gerado.
>
> **c) Edge function `public-stories-feed`** (X-Sync-Token).
> **d)** Adicionar `stories-updated` em `notify-site-rebuild`
> (trigger por INSERT/UPDATE em `public_stories`).

### 3.2 Prompt para o Lovable deste repo

> a) Criar `scripts/sync-stories-from-i6hub.mjs` mirror do de insights:
>    - busca feed, ordena por `(slug, language)`
>    - escreve `src/content/stories/<slug>-<language>.md` com frontmatter
>      YAML (mesmas chaves do schema em `src/content/stories/README.md`)
>    - preserva `README.md`
>    - grava capa em `public/content/success-stories/<slug>.<ext>` via
>      base64 (mesma lógica de cover_image_data/mime de Insights)
>    - grava logo em `public/content/logos/<slug>-logo.<ext>` (apenas
>      se logo_data presente)
>    - cleanup: remove imagens órfãs no fim do run
>
> b) Adicionar `stories-updated` em `repository_dispatch.types` no
> `.github/workflows/deploy-gh-pages.yml` + step "Sync stories" antes do build
> usando `I6HUB_FEED_URL_STORIES` + `I6HUB_SYNC_TOKEN`.

### 3.3 Secret a adicionar no GitHub

`I6HUB_FEED_URL_STORIES` = URL da edge `public-stories-feed`.

### 3.4 Estrutura do MD

Schema completo em [`src/content/stories/README.md`](../src/content/stories/README.md).

Frontmatter:

```yaml
---
slug: marketplace-excellence-pharmacy
language: pt                              # pt | en
title: "Excelência em Marketplace..."
segment: "Indústria"
client: "EMS Farma"
client_anon: false
description: "Resumo curto da empresa."
challenge: "Texto do desafio (1–3 frases)."
solution: "Texto da solução aplicada."
metric1: "+23% de ticket médio por PDV"
metric2: "+36% de conversão de novos SKUs"
metric3: ""
solutions: ["Inteligência de Recomendação Industrial"]
quote: "Antecipação Comercial Aplicada..."
customer_name: "Paulo Lima"
customer_title: "New Channel Manager"
cover_image: "/content/success-stories/case-ems-farmacia.jpg"
logo: "/content/logos/EMS-COR.png"
show_home: true
published: true
sort_order: 1
---
```

### 3.5 Cross-link com Intelligence

O `slug` do case é usado em `related_story_slug` dos artigos de Intelligence.
Quando o admin do i6Hub trocar um slug de case, é boa prática listar quais
artigos de Intelligence referenciam aquele slug e oferecer atualização em lote.

---

## 4. Checklist de teste end-to-end (igual para os 3)

1. No i6Hub, criar item com `published = false` → confirmar **invisível** em produção.
2. Toggle `published = true` → webhook dispara → GitHub Actions roda em 1–2 min → aparece.
3. Toggle `featured` (Intelligence) / `show_home` (Stories) → aparece no destaque/home.
4. Toggle `published = false` → some no próximo deploy.

Acompanhar em GitHub → repo `i6-website` → Actions → workflow "Deploy to GitHub Pages".

---

## 5. Tabela consolidada de secrets

| Onde | Nome | Para que serve |
|------|------|----------------|
| GitHub repo i6-website | `I6HUB_FEED_URL` | Feed de Insights (existente) |
| GitHub repo i6-website | `I6HUB_FEED_URL_INTELLIGENCE` | Feed de Intelligence (NOVO) |
| GitHub repo i6-website | `I6HUB_FEED_URL_LANDINGS` | Feed de Landings (NOVO) |
| GitHub repo i6-website | `I6HUB_FEED_URL_STORIES` | Feed de Stories (NOVO) |
| GitHub repo i6-website | `I6HUB_SYNC_TOKEN` | Compartilhado para todos os feeds (existente) |
| i6Hub (Lovable secrets) | `GITHUB_DISPATCH_TOKEN` | PAT fine-grained (existente) |
| i6Hub (Lovable secrets) | `I6HUB_SYNC_TOKEN` | Mesmo valor do GitHub Secret (existente) |

---

## 6. Ordem sugerida de execução

1. **Stories** primeiro (mais usado, padrão MD já está vivo desde a migração de jun/2026).
2. **Intelligence** em seguida (depende de slugs de stories para `related_story_slug`).
3. **Landings** por último (depende de slugs de stories para `related_stories`).
