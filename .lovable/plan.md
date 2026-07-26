## Problema 1 — Filtros derrubam o resultado do forecast

Em `src/components/kiosk/demos/DemandForecastDemo.tsx` (linhas 69-73), um `useEffect` chama `setPhase('planning')` sempre que `skuId/channel/region/horizon` mudam. Isso faz o Forecast Preditivo voltar ao estado inicial toda vez que o usuário troca um filtro após rodar.

### Correção
Remover o reset de fase; manter só a limpeza do mês selecionado.

```tsx
// antes
useEffect(() => {
  setPhase('planning');
  setProgress(0);
  setSelectedMonth(null);
}, [skuId, channel, region, horizon]);

// depois
useEffect(() => {
  setSelectedMonth(null);
}, [skuId, channel, region, horizon]);
```

Comportamento resultante:
- `planning`: filtros seguem alterando as séries base (via `useMemo` sobre `series`).
- `result`: filtros mantêm o modo `result`; linha i6 e KPIs "before → after" recalculam sobre o recorte filtrado.
- Reset total só acontece via "Explorar outra solução" (`reset()`).

## Problema 2 — Sazonalidade e tendência irreais no gráfico de composição

Hoje a sazonalidade é gerada como uma senóide fluida (curva contínua) e a tendência é quase reta. A referência anexa mostra o padrão correto: sazonalidade com **picos e vales concentrados em meses específicos** (não um seno suave) e tendência monotônica clara (crescente ou decrescente) sobre o horizonte.

### Correção em `src/data/kiosk/demos/demandForecast.ts`
- Substituir a sazonalidade contínua por um **perfil mensal fixo por SKU** (12 pesos indexados por `month % 12`), com 2–3 picos e 2–3 vales concentrados (ex.: bebida com picos em dez/jan/fev e vales em jun/jul; higiene mais plano com pico único; eletrônico com pico em nov/dez — Black Friday/Natal — e vale em fev/mar; moda com dois picos: mai (inverno) e nov (verão/fim de ano)).
- Amplitude por SKU calibrada em relação ao volume médio (mantém a legibilidade em SKUs de baixa sazonalidade sem virar linha reta).
- Tendência: manter linha monotônica clara ao longo do horizonte total (histórico + futuro), com micro-ruído pequeno apenas para textura — sem reverter direção.
- Retirar `Math.abs` da série `seasonComp` no gráfico (sazonalidade continua com sinal, mostrando vales negativos como no anexo).

### Correção em `CompositionChart` (dentro de `DemandForecastDemo.tsx`)
- Renderizar `seasonComp` como **linha poligonal com marcadores nos meses** (ponto visível em cada mês), reforçando a leitura de "picos em meses específicos" em vez de curva suave.
- Manter `trendComp` como linha monotônica e `sparsityFix` como barra.
- Manter eixo zero visível e hitboxes de mês já implementados.

## Validação

- Rodar forecast → trocar Canal/Região/Horizonte/SKU: gráfico permanece em `result`, linha i6 e KPIs continuam visíveis e recalculam.
- Sem rodar: filtros seguem atualizando séries históricas/forecast atual.
- "Explorar outra solução": reset total continua funcionando.
- Gráfico de composição: sazonalidade com picos/vales em meses específicos e visíveis por SKU; tendência claramente crescente ou decrescente ao longo de todo o horizonte, como na referência anexa.