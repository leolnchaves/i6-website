## Reduzir altura dos gráficos no modal do Forecast

Ambos os gráficos do dashboard de forecast (`src/components/kiosk/demos/DemandForecastDemo.tsx`) usam `maxHeight` fixo no SVG. Vou reduzir em ~20% para liberar espaço vertical ao card "POR QUE":

- Linha 475 (gráfico de linhas — histórico × forecast): `maxHeight: 320` → `maxHeight: 256`
- Linha 619 (gráfico de barras — composição/erro): `maxHeight: 300` → `maxHeight: 240`

Nenhuma outra alteração de layout — o restante da coluna (KPIs, filtros, promo card) permanece igual, e o espaço liberado é absorvido pela coluna direita onde vive o card "POR QUE".