## Alvo
Card do gráfico "Preço × margem" (`PriceMarginCurve`) e trio de KPIs à esquerda dentro do painel de resultado da demo "Preço Orientado à Margem" (`src/components/kiosk/demos/PriceMarginDemo.tsx`).

## Ajustes

1. **Gráfico ocupa todo o espaço do quadro**
   - Em `PriceMarginCurve` (linha ~511), remover `p-[1.2vmin]` do wrapper e manter só a borda + fundo, para que o SVG encoste nas bordas internas do card.
   - Reduzir levemente `PAD` interno do SVG (paddings do desenho) para compensar a remoção do padding do wrapper e evitar que rótulos "Ótimo/Atual/Mín/Máx/Concorr." sejam cortados: `PAD = { l: 34, r: 12, t: 18, b: 30 }`.

2. **Altura do gráfico −20%**
   - Alterar `H` do viewBox de `200` para `160` (redução exata de 20%).
   - Recalcular constantes derivadas (`ih` já é `H - PAD.t - PAD.b`, então é automático).
   - Manter `preserveAspectRatio="none"` e `w-full h-auto` — a altura visível cai proporcionalmente.

3. **KPIs à esquerda alinhados à altura do gráfico**
   - No container da coluna esquerda (linha 230), trocar `flex flex-col gap-[1vmin]` por `flex flex-col gap-[1vmin] h-full`.
   - Em `ConclusionCard`, adicionar `flex-1 justify-center` para os 3 cards distribuírem a altura total igual à do card do gráfico à direita.
   - Sem alteração no grid `grid-cols-[1fr_1.4fr]` — o grid já força stretch vertical entre as duas colunas.

## Fora de escopo
- Cores, textos, marcadores, tabela de alternativas, KPIs inferiores.
- Layout do bloco "Explicabilidade" e da timeline.