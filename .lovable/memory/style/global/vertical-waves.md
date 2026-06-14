---
name: Hero Side Waves
description: Animated coral side waves rendered only inside the home hero, both sides, scaled and pulled inward from the edge
type: design
---
WaveBackground lives **only inside HeroMovimento** (the home hero) — not in DarkLayout, not on any other route.

- Rendered as `absolute` inside the hero section (`overflow-hidden`), so it disappears as soon as the user scrolls past the hero.
- Two mirrored copies: left side (`left-0`) and right side (`right-0 scaleX(-1)`), each ~180–220px wide.
- Curves are pulled away from the viewport edge (main curve around x=68–80 within the 180-wide band) since they no longer need to hug the border.
- Strokes thicker (1.4–2.2) than the previous tight-to-edge version. Coral opacities preserved (`#F4845F` family).
- Linear-gradient mask fades the inner side (`black 30% → transparent 100%`) so curves dissolve into the navy hero center.

All other pages and all other home sections show navy `#0B1224` with no waves.
