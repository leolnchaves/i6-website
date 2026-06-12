# Fix: restore directory constants in sync script

## Problem
The previous edit to `scripts/sync-content-from-i6hub.mjs` removed the definitions of `MD_DIR`, `IMG_DIR` and `LOGO_DIR` (lines 96–98), but the rest of the script still uses them. The GitHub Actions sync step now crashes with `ReferenceError: MD_DIR is not defined` right after fetching the feed.

## Fix
Re-add the three constants right after the feed fetch, derived from the per-type config:

```js
const MD_DIR   = CONFIG.mdDir;
const IMG_DIR  = CONFIG.imgDir  ?? null;
const LOGO_DIR = CONFIG.logoDir ?? null;
```

## Verification
Run the script locally with a mocked feed to confirm it executes past the `mkdir` step without errors.

No other files change.