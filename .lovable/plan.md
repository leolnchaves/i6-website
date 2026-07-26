# Ajustes na demo de Forecast Preditivo (/kiosk)

Escopo isolado em `src/components/kiosk/demos/DemandForecastDemo.tsx` e `src/data/kiosk/demos/demandForecast.ts`. Sem tocar em outras demos.

## 1. Gráfico principal — unificar em uma única série contínua
- Remover a linha vertical tracejada que separa histórico × forecast (o `historyEndIdx` divider).
- Manter os eixos, grade e labels. Visual passa a ser um gráfico contínuo do mês -23 até mês +12.

## 2. Acurácia inicial muito menor + picos pontuais
- Rebaixar `historicalAccuracyPct` dos 4 SKUs para a faixa **35–45%** (ex.: bebida 42.8 / higiene 44.1 / eletrônicos 36.4 / moda 39.7).
- Aumentar `currentErrorPct` de forma coerente (55–65%) e `meanErrorPct` na mesma linha.
- Criar em cada SKU um array `accuratePastMonths` (1–2 índices de meses do histórico) onde o forecast do cliente ficou próximo do real. O restante do histórico terá desvio muito maior entre `history` e `currentFcst` (hoje só existe `currentFcst` em meses futuros — vamos calcular `currentFcst` também no histórico para poder desenhá-lo em todo o gráfico).

## 3. Linha i6 desenhada ao longo de TODO o gráfico
- Estender `i6Fcst` para os 24 meses de histórico (hoje só existe no futuro). O i6 ficará **acima da linha do forecast atual** ao longo de todo o gráfico (traduzindo "acurácia superior de forma consistente"). No histórico o i6 fica entre `currentFcst` e `history`, colado ao real.
- Nos 1–2 meses listados em `accuratePastMonths`, forçar o ponto do i6 a ficar **um pouquinho abaixo** do ponto do current forecast (bem colado, mas abaixo) — dá realismo.
- Mostrar a linha do i6 já na fase `planning` também? Não: manter comportamento atual (i6 aparece só após rodar o modelo, `phase === 'result'`), mas agora cobrindo histórico + futuro.

## 4. KPIs com comparação antes × depois no clique do "Executar forecast"
- Na fase `planning`: mostrar os 4 KPIs atuais (acurácia histórica, erro médio, ruptura, excesso) com os valores altos/ruins.
- Na fase `result`: renderizar cada um dos 4 KPIs com **valor antigo riscado + valor i6 + delta em %** (verde para melhoria). Ex.: `Ruptura 14,8% → 3,2% (−78%)`.
- Adicionar novos campos por SKU: `i6AccuracyPct`, `i6MeanErrorPct`, `i6StockoutPct`, `i6ExcessPct` (valores bons, coerentes com a nova narrativa).

## 5. Filtros de canal e região passando a impactar o gráfico
- Diagnóstico a validar no build: `buildSeries` já aplica `channelMult` e `regionMult`, mas o efeito visual está pequeno porque a escala do eixo Y (`minY`/`maxY`) é recalculada por série e "achata" a diferença.
- Ações:
  - Amplificar contraste dos multiplicadores de região (ex.: sudeste 0.58, sul 0.19, nordeste 0.14) e canal (usar `channelMix` diretamente já é ok, manter).
  - Exibir na legenda um chip de resumo do filtro ativo ("Digital · Sudeste · 12m") para reforçar que a série mudou.
  - Adicionar um sub-KPI "Volume médio/mês" no strip que muda visivelmente conforme os filtros.

## 6. Chart de composição — combo barra + linha, sem aceleração
- Reescrever `CompositionChart`:
  - **Barras**: apenas `sparsityFix` (correção de esparsidade), por mês.
  - **Linhas**: `trend` (tendência) e `season` (sazonalidade), sobrepostas.
  - **Promo**: deixar de ser série; nos meses com promo desenhar um marcador (ponto/estrela laranja) acima da barra e mostrar o texto explicativo no `BreakdownCard` ao clicar no mês.
  - Remover `accel` do gráfico, da legenda e do `BreakdownCard`.
- Layout: mudar o grid do container principal de `grid-cols-2` para algo tipo `grid-cols-[1.15fr_1fr]` para dar mais largura à coluna esquerda e o composition chart ficar maior e mais legível. Ajustar `viewBox` (W maior, H maior) e tamanhos de fonte dos labels.

## Detalhes técnicos

Arquivos afetados:
- `src/data/kiosk/demos/demandForecast.ts` — novos campos em `SkuDef` (`accuratePastMonths`, `i6AccuracyPct`, `i6MeanErrorPct`, `i6StockoutPct`, `i6ExcessPct`, `promoNotePt/En`), novos números por SKU, alteração em `buildSeries` para (a) preencher `currentFcst` no histórico, (b) preencher `i6Fcst` no histórico posicionando-o entre history e current, (c) forçar dip nos meses de `accuratePastMonths`, (d) remover `accel` do payload de composição.
- `src/components/kiosk/demos/DemandForecastDemo.tsx`:
  - Remover o `<line>` divisor no `MainChart`.
  - Renderizar `i6Path` sobre todo o range quando `phase === 'result'`.
  - Novo componente `KpiCompare` para o strip pós-forecast.
  - Reescrever `CompositionChart` para o combo bar+line com marcadores de promo.
  - Ajuste do grid do container principal.
  - Ajuste do `BreakdownCard` (remover accel, incluir nota de promo quando existir).

Fora de escopo: mensagens de i18n adicionais além dos rótulos "antes/depois" e "Nota promocional" (adicionadas em `demoLabels` PT/EN). Nenhuma mudança em rotas, dados globais ou outras demos.
