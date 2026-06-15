## Goal
Add the Vertical Rain animation to the real home hero (`HeroMovimento`) and remove all temporary motion-preview code so nothing leftover stays in the repo.

## Changes

1. **`src/components/hometeste/HeroMovimento.tsx`**
   - Import `MotionVerticalRain` from `@/components/hometeste/motion-options/MotionVerticalRain`.
   - Render it inside the hero `<section>`, alongside `<WaveBackground />`, before the content `<div>`. It will sit absolutely on the left side (already configured inside the component with its own mask).

2. **Move the motion file out of the temporary folder** (cleanup):
   - Move `src/components/hometeste/motion-options/MotionVerticalRain.tsx` → `src/components/hometeste/MotionVerticalRain.tsx`.
   - Update the import in `HeroMovimento.tsx` accordingly.

3. **Delete temporary preview artifacts:**
   - `src/pages/MotionPreview.tsx`
   - `src/components/hometeste/motion-options/MotionAuroraVertical.tsx`
   - `src/components/hometeste/motion-options/MotionLightRays.tsx`
   - The now-empty folder `src/components/hometeste/motion-options/`

4. **`src/App.tsx`**
   - Remove the `MotionPreview` import (line 29).
   - Remove the `/motion-preview` route (lines 112–113).

## Out of scope
No changes to `WaveBackground`, copy, layout, or any other page/component.
