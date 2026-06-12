# Landing Pages (Business Transformations) — content schema

Editorial source for the **4 transformation landings** under `/{lang}/solutions/<slug>`.

The pages are rendered by `src/pages/TransformationLanding.tsx` (one parametrized component) and pulled at build-time by `src/hooks/useLandings.ts` (eager Vite glob — no fetch at runtime).

## Allowed slugs (whitelist)

Only these 4 slugs render. Anything else falls back to `/solutions`.

| slug | route | hub_theme |
|---|---|---|
| `demand-supply-efficiency` | `/{lang}/solutions/demand-supply-efficiency` | `demand` |
| `data-monetization` | `/{lang}/solutions/data-monetization` | `mix` |
| `predictive-operations` | `/{lang}/solutions/predictive-operations` | `inventory` |
| `behavior-conversion` | `/{lang}/solutions/behavior-conversion` | `propensity` |

## File convention

Each landing has a **mandatory pair** PT + EN:

```
src/content/landings/
  <slug>-pt.md
  <slug>-en.md
```

## Frontmatter

```yaml
---
title: "Eficiência de Demanda e Oferta com IA Preditiva"
description: "Citation-friendly meta description (140–280 chars)."
slug: demand-supply-efficiency
language: pt                                       # pt | en
hero_kicker: "Transformação · Demanda & Oferta"   # short eyebrow
hero_headline: "Balance demand and supply…"        # large H1
hero_sub: "Sub-headline that explains the promise."
sectors: "varejo, farma, indústria, CPG"           # CSV
hub_theme: demand                                  # demand | margin | inventory | mix | propensity
related_engines: "i6previsio, i6recsys, i6signal"  # CSV — anchors to /our-ai
related_stories: "story-slug-1, story-slug-2"      # CSV — slugs of /success-stories
cover_image: null
---
```

## Body sections (H2 headings)

The component renders fixed blocks driven by `## ` headings — keep these names (PT or EN both work):

| heading | role |
|---|---|
| `## Pain` / `## Dor` | 3 real pains, citation-magnet |
| `## Problem` / `## Problema` | why generic AI fails |
| `## Solution` / `## Solução` | proprietary engines applied (also renders engine cards from `related_engines`) |
| `## Application` / `## Aplicação` | how it runs in production (also renders the data→engine→decision→signal flow) |
| `## Results` / `## Resultados` | bullets like `- **−38%** label \| source` → parsed into KPI strip + `Statistic` JSON-LD |
| `## FAQ` / `## Perguntas frequentes` | `**Q?**` + answer paragraph → parsed into `FAQPage` JSON-LD |

### Results format (must follow exactly)

```markdown
## Results
- **−38%** Ruptura em SKUs A/B (90 dias) | Varejo farma
- **+6,2 p.p.** Margem bruta da categoria OTC | Varejo farma
```

The bold token becomes the big number, the rest becomes the label, anything after `|` becomes the small source tag.

## SEO/GEO

Each landing automatically emits:

- `Service` + `BreadcrumbList` JSON-LD (page-level)
- `FAQPage` JSON-LD (if `## FAQ` present)
- Canonical + hreflang (en/pt-BR/x-default)
- Prerendered static stub in `dist/<lang>/solutions/<slug>.html` (via `scripts/prerender-seo-stubs.mjs`)
- `sitemap.xml` + `llms.txt` entries (maintained manually until i6Hub sync covers landings)

## i6Hub integration (when CMS-managed)

Same architecture as Insights/Intelligence:

```
i6Hub admin → notify-site-rebuild edge → repository_dispatch
            → GitHub Actions → sync-landings-from-i6hub.mjs (TODO)
            → regenerates src/content/landings/*.md → vite build → GH Pages
```

The sync script for landings is not yet wired (initial 8 files are hand-authored). When i6Hub gains a `landing` content type, mirror `sync-insights-from-i6hub.mjs` and add a `landings-updated` dispatch event.

Editors in i6Hub will see:

- Slug picker locked to the 4-item whitelist above.
- All frontmatter fields as form inputs.
- Body editor with section dividers per H2 convention.
