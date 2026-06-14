---
name: Insights vs Intelligence content split
description: /insights is media-only (i6 on Media + i6 Social); /i6-intelligence hosts Research + i6 Article + i6 eBook with universal gating
type: feature
---

## Two listings, two purposes

- `/insights` — **media + social** only. Filters `i6 on Media` and `i6 Social`. Subtitle mentions "conteúdos de mídia / media content".
- `/i6-intelligence` — combined feed of **i6 Research** (markdown under `src/content/intelligence/`) + **i6 Article** + **i6 eBook** (markdown under `src/content/insights/`, synced from i6Hub). UI shows a Type filter (Research/Article/eBook) plus Sector/Theme filters (only meaningful for Research).

## Gating flow

All three intelligence types support `gated: true` + `LeadGateForm`:

- **i6 Article / i6 eBook** (gated): form is the entire screen. After submit, success screen ("we emailed it") — content NOT shown inline. PDF delivered by i6Hub.
- **i6 Research** (gated): form replaces the article body. After submit, `onUnlock()` reveals content inline AND the PDF is still sent by i6Hub. Unlock state persisted in `localStorage[i6_unlocked_research:<slug>:<lang>]` so refresh preserves access.

`LeadGateForm` is generic with `kind: 'insight' | 'research'`. Origin/subscription strings: `insight:<slug>` vs `research:<slug>`. Tracker events: `INSIGHT_DOWNLOAD_COMPLETED` vs `RESEARCH_UNLOCKED`.

## URLs

- Canonical Article/eBook URL: `/i6-intelligence/<slug>`. `/insights/<slug>` for an Article/eBook redirects (Navigate replace) to `/i6-intelligence/<slug>`.
- Canonical Media/Social URL: `/insights/<slug>`. Reverse redirect applies.
- `/i6-intelligence/:slug` is served by `IntelligenceOrInsightArticle.tsx` which dispatches to `IntelligenceArticle` (Research) or `InsightArticle` (Article/eBook) based on which source has the slug.

## Files

- `src/hooks/useInsights.ts` — `useInsights()` filters to media types; new `useIntelligenceInsights()` returns Article/eBook for the intelligence feed.
- `src/hooks/useIntelligence.ts` — frontmatter accepts `gated` + `asset_url`.
- `src/pages/Intelligence.tsx` — combined feed UI.
- `src/pages/IntelligenceArticle.tsx` — gating + unlock state.
- `src/pages/InsightArticle.tsx` — context-aware (back link, canonical, cross-listing redirect).
- `src/pages/IntelligenceOrInsightArticle.tsx` — dispatcher.
- `src/components/insights/LeadGateForm.tsx` — generic.

i6Hub sync (`scripts/sync-content-from-i6hub.mjs`) is unchanged: Article/eBook markdown still lands in `src/content/insights/`. Separation is runtime-only.
