---
name: Deployment Flow (GitHub Actions + GH Pages)
description: How the site deploys to infinity6.ai — tag-triggered for code, repository_dispatch for i6Hub
type: feature
---

# Deployment Flow

Static site (Vite) hosted on **GitHub Pages**, custom domain **infinity6.ai**. Build/deploy via `.github/workflows/deploy-gh-pages.yml`.

## Triggers

- `push: tags: ['v*']` → deploy a new version. Tag is created by Lovable on user's chat command (see `publish-protocol`).
- `workflow_dispatch` → manual "Run workflow" button on GitHub Actions (backup).
- `repository_dispatch` (types: `content-updated`, `insights-updated`, `research-updated`, `landings-updated`, `stories-updated`) → fired by **i6Hub CMS** when content changes. **Fully automatic, do not change.**

**NOT a trigger anymore**: push to `main`. Lovable commits to `main` no longer auto-publish. Reason: user wants explicit, versioned releases.

## Build steps (do not alter without reason)
1. Checkout, Node 20, `npm install`.
2. Sync content from i6Hub for insights / research / landings / stories (uses `I6HUB_FEED_URL*` + `I6HUB_SYNC_TOKEN` secrets).
3. `npm run build` (Vite, NODE_ENV=production).
4. SPA 404 redirect, `.nojekyll`, copy CNAME, copy sitemap.
5. Prerender SEO stubs (`scripts/prerender-seo-stubs.mjs`).
6. Upload + deploy GH Pages artifact.

## Secrets required
- `I6HUB_FEED_URL`, `I6HUB_FEED_URL_RESEARCH`, `I6HUB_FEED_URL_LANDINGS`, `I6HUB_FEED_URL_STORIES`, `I6HUB_SYNC_TOKEN` — i6Hub sync.
- `GITHUB_RELEASE_TOKEN` (Lovable-side, NOT a GH Actions secret) — used by Lovable to create releases via API.
