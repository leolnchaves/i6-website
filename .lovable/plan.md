# Latência do modelo no painel conclusivo

Ajustar o painel conclusivo (após pipeline concluir) do demo Price-to-Margin em `/kiosk`:

## Mudanças

1. **Combinar Margem + Δ Margem em uma célula única**
   - MetricPill "Margem" passa a exibir: `57.7% · +6.8 pp` (valor recomendado + delta em ponto percentual).
   - Remove o MetricPill separado de "Δ Margem".

2. **Novo MetricPill "Latência do modelo"** no lugar liberado
   - Label PT: "Latência do modelo" · EN: "Model latency"
   - Valor: número quebrado entre 50–100ms, gerado por produto com `Math.random()` fixado por SKU (ex.: 63.42 ms, 78.91 ms, 91.07 ms, 57.28 ms) para parecer real.
   - Gerado uma vez por seleção (useMemo por `selectedId`) para não ficar mudando durante a exibição.
   - Sub-label discreta: PT "média mercado 50–100 ms" · EN "market avg 50–100 ms" — texto pequeno abaixo do valor dentro da mesma pill.

## Arquivos

- `src/data/kiosk/demos/priceToMargin.ts`
  - Adicionar `productLabels.latency` e `productLabels.latencyHint` em PT/EN.
- `src/components/kiosk/demos/PriceToMarginDemo.tsx`
  - Grid segue `grid-cols-2`: [Preço recomendado] [Margem c/ Δpp] · [Δ Receita] [Latência].
  - Estender `MetricPill` para aceitar `hint` opcional (linha pequena abaixo do valor).
  - `useMemo` para latência aleatória por SKU (ex.: `50 + Math.random() * 50`, com 2 casas).

## Fora de escopo

- Sem alterações no pipeline, nos produtos ou no fluxo de zoom.
