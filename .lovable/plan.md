## Objetivo

Na seção de resultado da demo Preço Orientado a Margem (`src/components/kiosk/demos/PriceMarginDemo.tsx`), fazer três ajustes visuais:

1. Remover o card "Confiança" da coluna esquerda superior e passar a exibir a confiança dentro do próprio card do gráfico, no rodapé.
2. Reduzir o "quadro" (padding/moldura) ao redor do gráfico, mantendo o SVG do gráfico com exatamente o mesmo tamanho.
3. Alinhar a altura total dos dois cards restantes à esquerda ("Preço ótimo" e "Faixa recomendada") ao novo tamanho compactado do card do gráfico.

## Mudanças

1. `PriceMarginDemo.tsx` (~linhas 239–252)
   - Remover `<ConclusionCard label="Confiança" ... />` (linha 247).
   - Manter os dois `ConclusionCard` restantes na coluna esquerda usando `flex-1` para que se distribuam ocupando a mesma altura total do card do gráfico à direita — assim ficam automaticamente alinhados ao novo tamanho.

2. `PriceMarginCurve` (~linha 476)
   - Reduzir o padding externo do card (ex.: `p-[1.6vmin]` → algo como `p-[1vmin]`) e apertar espaçamentos verticais internos ao redor do SVG, sem alterar o `viewBox`, altura em `vmin`, `preserveAspectRatio`, nem qualquer atributo dimensional do SVG — o gráfico em si permanece com o mesmo tamanho visual.
   - Adicionar, logo abaixo do SVG, uma linha rodapé compacta com "Confiança" à esquerda e `{derived.confidencePct}%` à direita, com fonte discreta e um separador sutil (`border-t border-white/10`). Como `confidencePct` já vem em `derived`, não é preciso alterar assinatura.

3. Bloco "Bottom KPIs" (linhas 281–285) permanece inalterado — o card "Confiança do modelo" ali continua existindo. A remoção é apenas do card duplicado na coluna superior esquerda.

## Fora de escopo

Tabelas, filtros, dados em `src/data/kiosk/demos/priceMargin.ts`, textos ("POR QUE") e demais demos.
