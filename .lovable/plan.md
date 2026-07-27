## Ajuste no Forecast Preditivo

Reordenar o catálogo de SKUs em `src/data/kiosk/demos/demandForecast.ts` para que **"Eletro portátil — linha A"** seja o primeiro item da lista.

Como `DemandForecastDemo.tsx` já inicializa o estado com `skus[0].id`, o item passa a ficar selecionado por default automaticamente, sem necessidade de outras mudanças.

### Ordem final
1. Eletro portátil — linha A
2. Bebida sazonal — 2L
3. Higiene recorrente — 400ml
4. Moda rápida — cápsula