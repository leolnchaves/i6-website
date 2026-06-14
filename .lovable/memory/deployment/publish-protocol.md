---
name: Publish Protocol (Release via Chat)
description: How to publish a new site version when the user asks in chat — creates a GitHub release that triggers GH Pages deploy
type: feature
---

# Publish Protocol

When the user asks to publish a new version (PT: "publica nova versão", "publica versão minor", "publica como vX.Y.Z" / EN: "publish a new release", etc.), follow this protocol.

## Prerequisites
- Secret `GITHUB_RELEASE_TOKEN` (fine-grained PAT, `contents: write` on the site repo).
- Workflow `.github/workflows/deploy-gh-pages.yml` triggered on `push: tags: ['v*']`.

## Steps

1. **Resolve repo owner/name** via `git remote get-url origin` (read-only).
2. **Get latest tag** via GitHub API:
   ```bash
   curl -sH "Authorization: Bearer $GITHUB_RELEASE_TOKEN" \
        "https://api.github.com/repos/<owner>/<repo>/releases/latest"
   ```
   If 404, start at `v1.0.0`.
3. **Determine new version (semver)**:
   - User said "minor" / "nova feature" → bump MINOR, reset PATCH.
   - User said "major" / "redesign" or asked explicitly → bump MAJOR, reset MINOR/PATCH.
   - Default → bump PATCH.
   - If user gave explicit `vX.Y.Z` → use it verbatim.
4. **Generate release notes** from commits since last tag:
   ```bash
   git log <last_tag>..HEAD --pretty=format:'- %s' --no-merges
   ```
   Use the bullet list as the release body (in PT). If user provided a custom note, prepend it.
5. **Create the release** via API:
   ```bash
   curl -sX POST \
        -H "Authorization: Bearer $GITHUB_RELEASE_TOKEN" \
        -H "Accept: application/vnd.github+json" \
        "https://api.github.com/repos/<owner>/<repo>/releases" \
        -d '{"tag_name":"vX.Y.Z","name":"vX.Y.Z","body":"...","target_commitish":"main"}'
   ```
6. **Report back**: tell the user the version published, the release URL from the response, and that deploy will be live at infinity6.ai in ~2 min.

## Rules
- NEVER store the PAT in code or logs. Only reference `$GITHUB_RELEASE_TOKEN`.
- NEVER bump MAJOR unless the user explicitly asked.
- If the API returns 401 → token expired; ask the user to regenerate the PAT and update the secret.
- If 403 with SSO message → user must authorize the token for the org (Configure SSO button on the token page).
- Do NOT touch `repository_dispatch` triggers — i6Hub automation must stay intact.
