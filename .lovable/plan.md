## Problema
No gráfico "Curva temporal de recompra" (resposta 2 de Personalização no i6 Signal), o rótulo "Pico" acima do ponto verde é cortado pela borda superior do chart, porque o pico fica em y=78% e o `margin.top` do LineChart é apenas 10px — sem espaço para o texto renderizar acima.

## Correção
Arquivo: `src/components/signalDemo/visualizations.tsx` (função do `RepurchaseCurveChart`, ~linha 1297–1319).

1. Aumentar `margin.top` do `LineChart` de `10` para `28` para dar folga ao label.
2. Forçar `YAxis` a ter `domain={[0, 100]}` para garantir headroom consistente acima do pico.
3. Ajustar o `ReferenceDot` label com um pequeno `offset` (ex.: `position: 'top', offset: 10`) para afastar do ponto e evitar sobreposição com a linha.

Nenhuma outra tela é afetada — o componente é usado apenas nesse cenário.
