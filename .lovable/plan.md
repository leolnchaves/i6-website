
## Objetivo

1. Mover a demo interativa (e-commerce simulado + "Como o modelo está pensando") da solução **Preço Orientado à Margem** para **Preço Orientado à Conversão**, com o pipeline do modelo refletindo **comportamento do cliente**.
2. No totem (`/kiosk`), forçar os dois quadros (Cenário e Raciocínio) a ficarem **lado a lado** e com **a mesma altura**, mesmo quando o painel "Por que este preço" aparece.

## Escopo das mudanças

### 1. Trocar solução alvo da demo interativa

**`src/components/kiosk/SolutionDemoBlock.tsx`**
- Alterar a condição `solution.id === 'price-to-margin'` para `solution.id === 'price-to-conversion'`, para que a demo interativa apareça apenas na solução de Conversão. A solução `price-to-margin` volta a usar o card estático padrão.

### 2. Reescrever o pipeline "Como o modelo está pensando" com foco em comportamento do cliente

**`src/data/kiosk/demos/priceToMargin.ts`** (mantém o nome do arquivo por enquanto para minimizar churn; conteúdo passa a ser orientado a conversão)
- `scenarioTitle` / `scenarioSubtitle`: ajustar para "Precificação orientada a conversão" (PT) / "Conversion-driven pricing" (EN).
- `objectiveLabel`: PT "Objetivo: conversão" · EN "Objective: conversion".
- `reasoningSubtitle`: manter `i6ElasticPrice` como engine.
- Substituir os 5 steps do `pipeline` (PT/EN) por passos ancorados em **sinais comportamentais do cliente**:
  1. Lendo sessões, cliques e carrinhos abandonados do SKU
  2. Segmentando clusters de intenção e sensibilidade a preço
  3. Simulando resposta de conversão em 10.000 cenários de preço
  4. Otimizando para maximizar conversão (com piso de margem)
  5. Recomendando preço ideal para converter
- `productLabels`: renomear/duplicar `deltaMargin` para incluir também `deltaConversion` (Δ Conversão / Δ Conversion). O painel conclusivo passará a exibir Δ Conversão em vez de Δ Margem como métrica principal (Δ Margem some, já que o objetivo agora é conversão).
- Em cada `DemoProduct`, adicionar `deltaConversionPct` (números "quebrados", ex.: 18.3, 11.7, 9.4, 22.1) e reescrever o `insight` para justificar o preço pela **elasticidade de conversão** e comportamento observado (recência, cliques em concorrentes, abandono de carrinho, ciclo de recompra), não por margem.
- `recommendedPrice` de cada SKU passa a ser **menor ou igual** ao `currentPrice` em pelo menos 2 dos 4 SKUs, coerente com "orientado à conversão" (aceita ceder ticket para ganhar volume/conversão). Os outros 2 podem manter leve headroom onde o comportamento comporta.

### 3. Layout do totem: quadros lado a lado com mesma altura

**`src/components/kiosk/demos/PriceToMarginDemo.tsx`**
- Trocar o grid externo de `grid-cols-1 lg:grid-cols-2` por `grid-cols-2` (o kiosk é sempre wide) e adicionar `items-stretch` para que ambos os quadros esticarem à altura do mais alto.
- Adicionar `h-full` nas duas colunas (`<div>` LEFT e RIGHT) para ocuparem toda a altura da linha.
- Reduzir a densidade visual do painel direito para caber junto com o painel conclusivo sem exceder a altura do painel esquerdo:
  - `pipeline` cards: reduzir `p-[1.8vmin]` → `p-[1.2vmin]`, `mb-[0.8vmin]` → `mb-[0.5vmin]`, gap entre steps `gap-[1.4vmin]` → `gap-[0.9vmin]`.
  - Fontes: label `text-[1.8vmin]` → `text-[1.6vmin]`; microMetric `text-[1.4vmin]` → `text-[1.25vmin]`.
  - Ícone/numero do step: `w-/h-[2.8vmin]` → `[2.2vmin]`.
  - Header do painel: reduzir ícone e margens (`mb-[2vmin]` → `mb-[1.2vmin]`).
- Painel conclusivo ("Por que este preço"): reduzir paddings (`p-[2vmin]` → `p-[1.5vmin]`), gap do grid de métricas (`gap-[1.5vmin]` → `gap-[1vmin]`), e o card do insight (`p-[2.2vmin]` → `p-[1.6vmin]`, `text-[1.9vmin]` → `text-[1.6vmin]`).
- Garantir que a coluna esquerda (catálogo → zoom) também estica: envolver conteúdo interno com `flex-1` já existente; verificar que o zoom-view use `flex-1` para preencher altura quando o painel direito ficar maior.

### 4. Localização

- Textos novos (pipeline, labels, insights) atualizados em PT e EN dentro do mesmo arquivo `priceToMargin.ts`.
- Não há mudanças em `config.ts` do kiosk — o roteamento Q2 já mapeia para `price-to-conversion` quando a resposta é "Conversão", então a demo interativa aparecerá naturalmente nesse fluxo.

## Fora do escopo

- Não renomear o arquivo `priceToMargin.ts` nem o componente `PriceToMarginDemo` (evita churn de imports; conteúdo passa a servir conversão).
- Não mexer no CTA de eBook, no Signal Intelliboard, nem no dashboard de métricas.
- Não alterar a solução `price-to-margin` além de remover a demo interativa dela (volta ao card estático padrão).

## Validação

- Rodar o quiz no kiosk: rota Pricing → "Conversão" deve mostrar a demo interativa; rota Pricing → "Margem" deve mostrar apenas o card estático.
- Screenshot do totem confirmando ambos os quadros lado a lado, mesma altura, antes e depois do painel conclusivo aparecer.
