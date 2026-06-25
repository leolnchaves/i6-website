## Objective
Update the "Tese" section copy on the homepage and adapt the layout so 6 bullet points fit without scrolling or excessive height.

## Changes

### 1. Text updates in `src/components/hometeste/TeseSection.tsx`
Update both `pt` and `en` copy objects:

- **Title (`question`)**:  
  PT → `Dados parados são margem que vai direto para o concorrente.`  
  EN → `Idle data is margin going straight to your competitor.`

- **Narrative (`narrativeBold` + `narrativeRest`)**:  
  PT → Bold: `Dados parados não antecipam demanda, intenção ou valor.` Rest: `Quando comportamento, preço, estoque, canal, crédito e jornada não se movem em tempo real, empresas reagem tarde, perdem margem e deixam crescimento na mesa.`  
  EN → equivalent adaptation.

- **Bullets (`bullets`)**: replace the 4 current items with 6 new ones (PT + EN):
  1. Demanda que chega tarde demais / Demand that arrives too late
  2. Mix desalinhado com o cliente real / Mix misaligned with the real customer
  3. Conversão baixa por falta de relevância / Low conversion due to lack of relevance
  4. Campanhas movidas por calendário, não por propensão / Calendar-driven campaigns, not propensity-driven
  5. Cross-sell e up-sell no tentativa e erro / Cross-sell and up-sell by trial and error
  6. Margem e esforço comercial sob pressão / Margin and commercial effort under pressure

- **Stats (`stats`) and bridge (`bridge`)**: keep unchanged.

### 2. Layout adjustment for 6 bullets
The current single-column list with `space-y-2` and `py-2` per item will grow too tall with 6 entries. Adjust the bullet list container:

- Use `grid grid-cols-1 md:grid-cols-2 gap-2` so bullets flow in 2 columns on desktop, keeping total height close to the original 4-item layout.
- Optionally reduce inner padding slightly if needed (`py-2` → `py-1.5`).

No other components, routes, or data sources are affected.