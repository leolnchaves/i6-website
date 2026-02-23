

## Add Cookie Banner to New Pages (HomeTeste and Solutions)

### Problem
The cookie consent banner only appears on pages wrapped by `Layout` (success-stories, contact, privacy-policy, etc.). The two new pages -- **HomeTeste** (`/`) and **Solutions** (`/solutions`) -- bypass `Layout` and use their own `HeaderNovo`/`FooterNovo`, so the cookie banner never renders on them.

### Solution
Add the `CookieConsentManager` component directly to both `HomeTeste.tsx` and `Solutions.tsx`.

### Changes

**1. `src/pages/HomeTeste.tsx`**
- Import `CookieConsentManager`
- Add `<CookieConsentManager />` at the end of the component's JSX (before the closing wrapper div)

**2. `src/pages/Solutions.tsx`**
- Import `CookieConsentManager`
- Add `<CookieConsentManager />` at the end of the component's JSX (before the closing wrapper div)

### Technical Details

Both files get the same two-line change pattern:

```typescript
// Add import
import CookieConsentManager from '@/components/cookies/CookieConsentManager';

// Add before closing </div>
<CookieConsentManager />
```

No changes to the cookie banner itself or the Layout component. The banner already handles its own show/hide logic via `useCookieConsent` and `localStorage`.
