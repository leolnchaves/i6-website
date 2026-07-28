## Problema

Em `PriceTurnoverDemo`, após o cálculo, mudar o filtro **Produto** não altera a tabela de SKUs porque `derived.skus` vem fixo de `clusters[i].skus` — todos hoje são variantes de "Jaqueta acolchoada". O filtro `product` existe no estado mas não é consumido em lugar nenhum da derivação.

## Correção

1. Em `src/data/kiosk/demos/priceTurnover.ts`:
   - Adicionar `skuTemplatesByProduct: Record<'sku-1' | 'sku-2' | 'sku-3', SkuRow[]>` com 3 SKUs por produto (Jaqueta acolchoada, Bota térmica premium, Blusa tricô oversized), cada um com `currentPrice`, `recommendedPrice`, `markdownPct`, `sellThroughProjectedPct` coerentes com a família.
   - Manter os clusters como estão (dados macro por região); os SKUs deixam de ser lidos do cluster para o render.

2. Em `src/components/kiosk/demos/PriceTurnoverDemo.tsx`:
   - `computeOutcome` passa a receber também o `productId` e devolve `skus` derivados de `skuTemplatesByProduct[productId]`, aplicando o mesmo ajuste de markdown/preço em função de `objective`, `minMargin` e da `action` do cluster (mantendo a lógica atual de `factor`, `shift`, `mdPct`, `recommendedPrice`).
   - `derivedByCluster` passa a depender de `product` também (recomputa quando o filtro muda).
   - No cabeçalho da tabela de SKUs, trocar `SKU · {selected.name}` (nome do cluster) por `SKU · {rótulo do produto selecionado}` lido de `filterOptions.product`, para deixar claro que a lista responde ao filtro.

Escopo restrito à demo Preço Orientado ao Giro; nenhum outro componente é alterado.
