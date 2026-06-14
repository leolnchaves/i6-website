---
name: Project Memory Index
description: Index of all project memories
type: reference
---

# Project Memory

## Core
- **Brand name**: Always lowercase "infinity6". Contact email: performance@infinity6.ai.
- **Legal name**: Infinity Tech S.A. Founded 2023-10-20 in Campinas/SP. 13 employees.
- **Identity**: Dark theme. Navy background (#0B1224), Coral accents (#F4845F).
- **Typography**: NEVER use trailing periods in titles, headers, or metric descriptions.
- **Design**: Use inline SVG flags for languages, NEVER use emoji flags.
- **Architecture**: 100% static site serving Markdown from `/public/content/`. No database.
- **Deployment**: GitHub Pages, custom domain infinity6.ai. Deploy gatilhado por **tag `v*`** (push em main NÃO publica). i6Hub publica automático via `repository_dispatch`.
- **Publish via chat**: quando o user pedir "publica nova versão", seguir `mem://deployment/publish-protocol` (criar release via API GitHub usando `GITHUB_RELEASE_TOKEN`).
- **i6Signal positioning**: Conversational layer over PREDICTIVE OUTPUT of i6 engines (i6Previsio/i6RecSys/i6ElasticPrice). Not a data Q&A bot — anticipatory and prescriptive.
- **Header**: Comunidade is NOT in main header; it lives inside `/our-ai` (link to huggingface.co/infinity6). Solutions dropdown: AI Solutions (→/solutions) + Proprietary AI (→/our-ai) + 4 Transformation landings (→/solutions/<slug>). All 4 landings active (MD-managed in src/content/landings/).

## Memories
- [Public Asset URL Helper](mem://assets/public-asset-url-helper) — Use getPublicAssetUrl() for all asset paths to support GitHub Pages
- [i6Signal Interaction Flow](mem://features/i6signal-demo/interaction-flow) — Multi-step interaction sequence for i6Signal demo
- [i6Signal Content Strategy](mem://features/i6signal-demo/content-strategy) — Business-centric language for demo scenarios
- [i6Signal Visualization Style](mem://features/i6signal-demo/visualization-style) — Standardized tables and specific charts for demo data
- [i6Signal Demo Identity](mem://features/i6signal-demo/identity) — Demo acts as VIVARIS PHARMA S.A.
- [i6Signal Internationalization](mem://features/i6signal-demo/internationalization) — Location naming conventions for demo scenarios
- [Cookie Banner Implementation](mem://cookies/banner-implementation) — Manual CookieConsentManager integration on specific pages
- [Global Side Waves](mem://style/global/vertical-waves) — Soft global side waves shown on all pages except /privacy-policy and /ethics-policy
- [SEO Metadata Strategy](mem://seo/dynamic-metadata-strategy) — react-helmet-async for dynamic metadata with static fallback
- [GA4 Integration](mem://analytics/ga4-integration) — Google Analytics 4 configuration and measurement ID
- [Global CTA Button Design](mem://style/global/cta-button-design) — Outline Glow design system for primary CTA buttons
- [EMS Farma Logo Asset](mem://assets/client-logos/ems-farma) — Path to EMS logo for success stories
- [Deployment Flow](mem://deployment/github-actions-flow) — Tag-triggered deploy + i6Hub repository_dispatch (push em main NÃO publica)
- [Publish Protocol](mem://deployment/publish-protocol) — Como publicar via chat: criar release no GitHub via API com GITHUB_RELEASE_TOKEN
