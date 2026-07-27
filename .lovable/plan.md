## Ajustes no Preço Orientado ao Giro

### 1. Remover o mapa de clusters
- Excluir o componente `BrazilMap` (setup e result) do `PriceTurnoverDemo.tsx`.
- Substituir por uma **lista de clusters clicável** (tabela compacta) no painel esquerdo tanto no setup quanto no resultado — cada linha destaca a ação (cor Manter/Markdown/Aguardar) e KPIs curtos (Estoque, Idade, Velocidade, Margem).
- O card de detalhes do cluster selecionado (nome, KPIs) fica ao lado ou abaixo da lista.

### 2. Simplificar filtros
- Remover o `TouchSelect` **Categoria** de `FilterRow "Filtros"`. Manter apenas Produto + Loja/Região/Cluster (2 colunas).
- Remover a restrição **Prazo** do `FilterRow "Restrições"`. Manter apenas Margem mínima.
- Ajustar `computeOutcome` para não depender mais de `horizon` (usar apenas objective + minMargin).

### 3. Objetivo em largura total
- No `FilterRow "Objetivo"`, expandir o `TouchSelect` para ocupar o espaço inteiro da linha (grid de 1 coluna full-width em vez de `grid-cols-3`).

### 4. Resultado por cluster + SKUs
- Adicionar em `priceTurnover.ts` uma lista de **SKUs por cluster** (3–4 SKUs cada), com: nome, preço atual, preço recomendado, markdown %, sell-through projetado.
- No `ResultLeft`, exibir duas tabelas empilhadas:
  - **Tabela 1: Clusters/Regiões** — resumo por cluster (situação, preço médio, próxima ação), clicável para trocar a seleção.
  - **Tabela 2: Preços por SKU** — SKUs do cluster selecionado (SKU, preço atual → recomendado, markdown, sell-through).

### 5. Régua de markdown ao lado da tabela
- Mover `MarkdownRuler` do painel direito (Insight) para o **painel esquerdo**, renderizada **abaixo das tabelas de Clusters + SKUs**.
- Manter no painel direito: pipeline, KPIs, quadro "Por que" e botão "Nova simulação".

### Detalhes técnicos
- Arquivos afetados:
  - `src/data/kiosk/demos/priceTurnover.ts` — remover `filterOptions.category` e `filterOptions.horizon`; adicionar `skus: SkuRow[]` em cada `TurnoverCluster`.
  - `src/components/kiosk/demos/PriceTurnoverDemo.tsx` — remover `BrazilMap`; refatorar `SetupView` (lista + detalhes); refatorar `ResultLeft` (lista clusters + tabela SKUs + `MarkdownRuler`); remover `MarkdownRuler` do bloco Insight à direita; ajustar `computeOutcome` (sem `horizon`); remover estados `category` e `horizon`.
- Mantidos: pipeline, KPIs, quadro "Por que", cores por ação, `computeOutcome` (deriva SKUs a partir do markdown do cluster).
