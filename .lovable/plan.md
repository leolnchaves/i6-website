
## Internationalization of English Scenario Responses

### Problem
The English versions of i6Signal scenarios contain Brazilian city names and regional references that would be confusing to international audiences. Portuguese versions should remain unchanged.

### Scenarios to Update (English only)

**File:** `src/components/solutions/I6SignalDemo.tsx`

#### 1. Commercial (lines 258-278) - MAIN ISSUE
Current Brazilian cities in chart data and actions:
- "Metro BH" / "Campinas" / "Curitiba" / "P. Alegre"

Replace with internationally recognizable cities:
- "New York" / "Chicago" / "Los Angeles" / "Miami"

Update actions accordingly:
- "Metro BH" references become "New York"
- "Campinas" becomes "Chicago"
- "Curitiba" becomes "Los Angeles"

#### 2. Mix (lines 280-301)
- "South region" / "South Region" -- replace with "West Coast" or "Western Region"
- Keep the same data, just change the region name in question, title, analysis, and actions

#### 3. Forecast (line 228)
- Question "South vs Northeast" -- replace with "East Coast vs West Coast"

#### 4. Pricing (lines 233-256)
- "Southeast Region" -- replace with "Northeast Region" (US context) or keep generic "the region"
- "metro area" is fine (generic)
- "South Region" in questions -- replace with "West Coast"

#### 5. Behavior (lines 303-327)
- "Sao Paulo region" -- already well-known, but could optionally change to "Greater New York area" for full consistency

### Summary of Changes
All edits are in the EN translation object only (approx. lines 195-328). The PT translations (lines 40-170) remain completely untouched. Changes are purely text replacements in strings -- no structural or logic changes.
