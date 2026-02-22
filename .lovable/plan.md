

## Fix: Title displaying in 3 lines instead of 2

### Problem
The title uses `whitespace-pre-line` with a `\n` after "transformar", but the first part ("Somos especialistas em aplicar IA para transformar") is too wide for the container at certain viewport sizes. The browser wraps it naturally before the explicit `\n`, resulting in 3 lines.

### Solution
Remove the `\n` from the title strings and remove `whitespace-pre-line` from the `h2`. Instead, use a narrower `max-w` constraint so the text wraps naturally into 2 balanced lines.

### Changes

**File: `src/components/hometeste/SinaisSection.tsx`**

1. Portuguese title (line 15): Change to `'Somos especialistas em aplicar IA para transformar dados em decisões antecipadas.'` (no `\n`)
2. English title (line 46): Change to `'We are specialists in applying AI to transform data into anticipated decisions.'` (no `\n`)
3. `h2` className (line 88): Remove `whitespace-pre-line` and change `max-w-4xl` to `max-w-3xl` so the text naturally wraps into 2 balanced lines

This way the browser handles the line break naturally, and the `max-w-3xl` constraint ensures it wraps at approximately the midpoint, giving 2 balanced lines.

