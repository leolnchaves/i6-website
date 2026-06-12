# i6Hub CMS — Roadmap dos demais conteúdos

> Complementa `docs/I6HUB_CMS_SETUP.md` (que cobre Insights).
> Este documento descreve, passo a passo, o que pedir ao Lovable
> (no projeto **i6Hub** e neste repo) para colocar os 3 conteúdos
> adicionais sob CMS, espelhando o fluxo de Insights.

## Arquitetura (igual para os 4 tipos)

```
i6Hub (admin)
   │  (toggle publish)
   ▼
edge function notify-site-rebuild
   │  (repository_dispatch: <item>-updated)
   ▼
GitHub Actions (deploy-gh-pages.yml)
   │  fetch I6HUB_FEED_URL[_<ITEM>] com X-Sync-Token
   ▼
scripts/sync-content-from-i6hub.mjs --type=<item>
   │  (script único consolidado para insights/research/landings/stories)
   ▼
vite build → GitHub Pages
```

## Itens cobertos

| # | Item             | Pasta no repo                  | CMS implementado? |
|---|------------------|--------------------------------|-------------------|
| 1 | **i6 Research**  | `src/content/intelligence/`    | ✅                |
| 2 | **Landings**     | `src/content/landings/`        | ✅                |
| 3 | **Success Stories (Cases)** | `src/content/stories/` | ✅          |
| — | Insights (base)  | `src/content/insights/`        | ✅                |

> Fora de escopo deste roadmap: `public/content/{testimonials,results,partners,page-solutions,solutions-seo}-*.md`
> (edição direta no repo, sem demanda imediata de CMS).

> Nota de nomenclatura: a entidade pública é **i6 Research**, mas o
> diretório interno (`src/content/intelligence/`) e a rota (`/i6-intelligence`)
> permanecem com o nome antigo. No script consolidado usamos
> `--type=research` para casar com a edge `public-research-feed` do i6Hub.

---

## 1. i6 Research

### 1.1 Backend no i6Hub (implementado)

- Tabela `public_research`:
  id (uuid pk), slug (text), language ('pt'|'en'), title, excerpt,
  date, sector (enum: farma|industria|financeiro|varejo|ecommerce|multissetor),
  theme (enum: demanda|margem|estoque|mix|propensao|cac),
  read_time (int), featured (bool), published (bool default false),
  cover_image (text), cover_image_data (text), cover_image_mime (text),
  related_product (text), related_story_slug (text),
  body_md (text), created_at, updated_at. UNIQUE(slug, language).
- Edge function `public-research-feed` (X-Sync-Token).
- Evento `research-updated` em `notify-site-rebuild`.

### 1.2 Secret a adicionar neste repo

`I6HUB_FEED_URL_RESEARCH` = `https://<projeto-i6hub>.supabase.co/functions/v1/public-research-feed`

### 1.3 Estrutura do MD

Schema completo em [`src/content/intelligence/README.md`](../src/content/intelligence/README.md).

```yaml
---
id: ruptura-gondola-ia-preditiva
title: "Como reduzir ruptura de gôndola com IA preditiva no varejo farmacêutico"
slug: ruptura-gondola-ia-preditiva
language: pt
date: 2026-06-12
sector: farma           # farma|industria|financeiro|varejo|ecommerce|multissetor
theme: estoque          # demanda|margem|estoque|mix|propensao|cac
excerpt: "1 a 3 frases citation magnet (140–280 chars)"
read_time: 8
featured: true
cover_image: /lovable-uploads/intelligence/<slug>.png
related_product: i6previsio
related_story_slug: marketplace-excellence-pharmacy
---
```

Corpo (H2 recomendados): `## Resposta direta` · `## O tamanho do problema` ·
`## Por que abordagens tradicionais falham` · `## O motor proprietário da infinity6` ·
`## Resultado anonimizado` · `## Perguntas frequentes` · `## Próximo passo`.

---

## 2. Landings de Transformação

### 2.1 Backend no i6Hub (implementado)

- Tabela `public_landings`:
  id, slug (CHECK na whitelist abaixo), language ('pt'|'en'),
  title, description, hero_kicker, hero_headline, hero_sub,
  sectors (text CSV), hub_theme (enum: demand|margin|inventory|mix|propensity),
  related_engines (CSV: i6previsio|i6recsys|i6elasticprice|i6signal),
  related_stories (CSV — slugs de cases),
  cover_image, cover_image_data, cover_image_mime,
  body_md, published (bool default false), created_at, updated_at.
  UNIQUE(slug, language).

  Whitelist de slugs: `demand-supply-efficiency`, `data-monetization`,
  `predictive-operations`, `behavior-conversion`.

- Edge `public-landings-feed` (X-Sync-Token).
- Evento `landings-updated` em `notify-site-rebuild`.

### 2.2 Secret a adicionar neste repo

`I6HUB_FEED_URL_LANDINGS` = `https://<projeto-i6hub>.supabase.co/functions/v1/public-landings-feed`

### 2.3 Estrutura do MD

Schema completo em [`src/content/landings/README.md`](../src/content/landings/README.md).

```yaml
---
title: "Eficiência de Demanda e Oferta com IA Preditiva"
description: "Citation-friendly meta description (140–280 chars)."
slug: demand-supply-efficiency
language: pt
hero_kicker: "Transformação · Demanda & Oferta"
hero_headline: "Balance demand and supply…"
hero_sub: "Sub-headline que explica a promessa."
sectors: "varejo, farma, indústria, CPG"
hub_theme: demand
related_engines: "i6previsio, i6recsys, i6signal"
related_stories: "marketplace-excellence-pharmacy, sales-forecast-precision"
cover_image: null
---
```

Seções H2 obrigatórias: `## Pain`/`## Dor`, `## Problem`/`## Problema`,
`## Solution`/`## Solução`, `## Application`/`## Aplicação`,
`## Results`/`## Resultados`, `## FAQ`/`## Perguntas frequentes`.

---

## 3. Success Stories (Cases)

> Os cases foram migrados (jun/2026) do MD agregado para 1 arquivo por
> (slug, idioma) em `src/content/stories/`, mesmo padrão de Research/Landings.

### 3.1 Backend no i6Hub (implementado)

- Tabela `public_stories`:
  id (uuid pk), slug (text), language ('pt'|'en'),
  sort_order (int), segment (text), title (text),
  client (text), client_anon (bool),
  description, challenge, solution,
  metric1, metric2, metric3 (text — valor + label combinados),
  solutions (CSV de produtos infinity6),
  quote, customer_name, customer_title,
  show_home (bool), published (bool default false),
  cover_image, cover_image_data, cover_image_mime,
  logo_image, logo_data, logo_mime,
  created_at, updated_at. UNIQUE(slug, language).

- Edge `public-stories-feed` (X-Sync-Token).
- Evento `stories-updated` em `notify-site-rebuild`.

### 3.2 Secret a adicionar neste repo

`I6HUB_FEED_URL_STORIES` = `https://<projeto-i6hub>.supabase.co/functions/v1/public-stories-feed`

### 3.3 Estrutura do MD

Schema completo em [`src/content/stories/README.md`](../src/content/stories/README.md).

```yaml
---
slug: marketplace-excellence-pharmacy
language: pt
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
cover_image: "/content/success-stories/marketplace-excellence-pharmacy.jpg"
logo: "/content/logos/marketplace-excellence-pharmacy-logo.png"
show_home: true
published: true
sort_order: 1
---
```

### 3.4 Cross-link com Research

O `slug` do case é usado em `related_story_slug` dos artigos de Research.
Quando o admin do i6Hub trocar um slug de case, é boa prática listar quais
artigos de Research referenciam aquele slug e oferecer atualização em lote.

---

## 4. Sync consolidado

Existe **um único script** que roda os 4 tipos:

```bash
node scripts/sync-content-from-i6hub.mjs --type=insights
node scripts/sync-content-from-i6hub.mjs --type=research
node scripts/sync-content-from-i6hub.mjs --type=landings
node scripts/sync-content-from-i6hub.mjs --type=stories
```

Cada execução:
- Faz `fetch` no feed correspondente com `X-Sync-Token`.
- Apaga `.md` antigos do diretório de destino (preserva `README.md`).
- Materializa capas em 3 estratégias (base64 → URL → preserva no disco).
- Para `stories`, materializa também `logo_*` em `public/content/logos/`.
- Cleanup final remove imagens órfãs.
- Falha o job se o feed referenciou capa mas nada foi materializado.

O workflow `.github/workflows/deploy-gh-pages.yml` chama os 4 em sequência
antes do `vite build`.

---

## 5. Checklist de teste end-to-end (igual para os 4)

1. No i6Hub, criar item com `published = false` → confirmar **invisível** em produção.
2. Toggle `published = true` → webhook dispara → GitHub Actions roda em 1–2 min → aparece.
3. Toggle `featured` (Research) / `show_home` (Stories) → aparece no destaque/home.
4. Toggle `published = false` → some no próximo deploy.

Acompanhar em GitHub → repo `i6-website` → Actions → "Deploy to GitHub Pages".

---

## 6. Tabela consolidada de secrets

| Onde | Nome | Para que serve |
|------|------|----------------|
| GitHub repo i6-website | `I6HUB_FEED_URL` | Feed de Insights |
| GitHub repo i6-website | `I6HUB_FEED_URL_RESEARCH` | Feed de Research |
| GitHub repo i6-website | `I6HUB_FEED_URL_LANDINGS` | Feed de Landings |
| GitHub repo i6-website | `I6HUB_FEED_URL_STORIES`  | Feed de Stories  |
| GitHub repo i6-website | `I6HUB_SYNC_TOKEN` | Compartilhado entre todos os feeds |
| i6Hub (Lovable secrets) | `GITHUB_DISPATCH_TOKEN` | PAT fine-grained |
| i6Hub (Lovable secrets) | `I6HUB_SYNC_TOKEN` | Mesmo valor do GitHub Secret |

**Como obter as URLs dos 3 novos feeds**: pegue o mesmo subdomínio
`https://<projeto-i6hub>.supabase.co/functions/v1/` que está hoje no
`I6HUB_FEED_URL` e troque apenas o nome final para `public-research-feed`,
`public-landings-feed` ou `public-stories-feed`. Se quiser confirmar, peça
no chat do projeto i6Hub: "qual é a URL pública da edge function
`public-<x>-feed`".
