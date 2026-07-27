## Objetivo

Remover completamente a "Correção de esparsidade" (`sparsityFix`) da UI do modal de Forecast — tanto do gráfico de composição quanto do card de breakdown que aparece ao clicar num mês.

## Mudanças em `src/components/kiosk/demos/DemandForecastDemo.tsx`

1. **Gráfico de composição (`CompositionChart`)**
   - Remover cálculo `sparsityVals` e sua entrada no `posMax`.
   - Remover a cor `sparsityFix` do objeto `colors`.
   - Remover o bloco de renderização das barras de esparsidade (loop `points.map` que desenha os `<rect>` cor coral translúcida).
   - Remover a `<LegendDot square … label={L.result.sparsityFix} />` da legenda.

2. **Breakdown card (`BreakdownCard`)**
   - Remover a entrada `{ label: L.result.sparsityFix, value: point.sparsityFix ?? 0 }` do array `parts`.
   - Ajustar o grid de `grid-cols-3` para `grid-cols-2` (agora só Tendência e Sazonalidade).

## Fora do escopo (não mexer)

- Dados em `src/data/kiosk/demos/demandForecast.ts` (o campo `sparsityFix` permanece no tipo/mock; apenas deixa de ser exibido). Assim evitamos efeitos colaterais em `MonthPoint` ou nos cálculos de `i6Fcst`.
- Labels (`L.result.sparsityFix`) e o passo do reasoning ("Tratando esparsidade…") permanecem — o pedido foi remover do gráfico e do breakdown, não do texto de raciocínio.

## Validação visual

- Abrir Forecast → gráfico de composição sem barras coral translúcidas e legenda sem o item de esparsidade.
- Clicar num mês → breakdown mostra apenas 2 cards (Tendência, Sazonalidade) ocupando a largura toda.