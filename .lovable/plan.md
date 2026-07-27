# Preço Orientado ao Giro — nova demo /kiosk

Terceira demo de pricing na jornada do totem, diferenciada visualmente das outras duas: **mapa regional + réguas de markdown por cluster** (vs. e-commerce no Price-to-Conversion e SKU/elasticidade no Price-to-Margin).

## Arquivos

**Novo** `src/data/kiosk/demos/priceTurnover.ts` — dataset PT-only (mesmo padrão de `priceMargin.ts`):
- 4 clusters regionais: `sp-premium`, `interior-sp`, `minas-gerais`, `sul` (com `lat`/`lng` aproximados para posicionar pins no mapa SVG).
- Cada cluster: `situacao` ("Giro adequado" / "Giro abaixo" / "Estoque envelhecido" / "Demanda sazonal futura"), `currentPrice`, `recommendedPrice`, `markdownPct`, `nextAction`, `daysToAct`, `sellThroughProjected`, `agedStockPct`, `marginPreserved`, `capitalUnlocked`, `argument` (justificativa unificada no padrão comportamental — velocidade de venda vs. média da categoria, idade do estoque, sensibilidade, forecast, capital imobilizado).
- `pipeline` de 5 passos exatamente como especificado.
- `filterOptions`: categoria, produto, região/cluster, objetivo de desova (equilibrado / agressivo / preservar margem), prazo (14 / 30 / 45 / 60 dias), margem mínima (25 / 30 / 35 / 40%).

**Novo** `src/components/kiosk/demos/PriceTurnoverDemo.tsx` — 3 fases (`setup` → `running` → `result`), estilo `PriceMarginDemo`:

- **Setup (esquerda)**: header "Central Regional de Estoque e Markdown" + mapa SVG estilizado do Brasil com pins clicáveis por cluster mostrando estoque disponível, idade média, velocidade, markdown atual e margem restante em card lateral. Filtros agrupados em 3 blocos rotulados (Filtros / Restrições / Objetivo) via `FilterRow` local, usando `TouchSelect`. Botão "Otimizar preço e markdown".
- **Running (direita)**: pipeline de 5 passos animado (reaproveita estilo/keyframes do `PriceMarginDemo`).
- **Result (esquerda)**: mesmo mapa, agora com badges coloridas por cluster (verde = manter, laranja = markdown, azul = aguardar). Clique em cluster faz drill-down. Tabela compacta abaixo do mapa (Cluster / Situação / Preço / Próxima ação).
- **Result (direita)**: 4 KPI cards (Estoque envelhecido, Sell-through projetado, Margem preservada, Capital liberado) reativos ao cluster selecionado, seguidos da **régua visual de markdown** (Hoje → 7d → 14d → 21d → Liquidação final) — barra horizontal com marcadores destacando o momento recomendado para cada cluster. Um único quadro **POR QUE** no padrão dos demais (card coral com Sparkles animado), exibindo o `argument` do cluster selecionado.
- KPIs recalculados de forma determinística com `objetivo × prazo × margem mínima` (padrão do `computeOutcome` de `PriceMarginDemo`).

**Registro** em `src/components/kiosk/SolutionDemoBlock.tsx` — adicionar branch:
```tsx
if (solution.id === 'price-to-turnover') return <PriceTurnoverDemo />;
```

## Argumentos POR QUE (padrão comportamental, por cluster)

Estilo idêntico aos demais (fatos + números concretos, sem prosa genérica), unificado em um bloco por cluster:

- **São Paulo Premium — Manter preço**: velocidade de venda 34 un/sem acima da média da categoria (24 un/sem), estoque com 22 dias (média 41d) e elasticidade -0,7. Antecipar markdown reduziria margem em 4,8 pp sem impacto material em giro — a demanda absorve o preço atual nas próximas 3 semanas.
- **Interior de SP — Markdown 8%**: sell-through das últimas 4 semanas 18% abaixo do necessário para zerar antes da próxima coleção. Elasticidade -1,3 nesta faixa: corte cirúrgico de 8% projeta +22% de unidades e libera R$ 148 mil de capital, preservando 6,2 pp a mais que uma liquidação tardia de 25%.
- **Minas Gerais — Markdown 15%**: idade média do estoque 63 dias (37% acima da categoria) e perda projetada de valor de 2,1 pp/semana caso mantido. Markdown de 15% agora captura demanda de fim de ciclo antes da entrada da nova coleção em 21 dias — evita liquidação profunda de ~30% típica desta janela.
- **Sul — Aguardar 14 dias**: forecast sinaliza pico sazonal em 12–16 dias (frente fria + calendário regional), com elasticidade caindo de -1,1 para -0,4 no período. Descontar agora antecipa margem que o próprio clima devolve — janela ótima de ação em 2 semanas.

## Diferenciação visual das 3 demos de pricing

- **Price-to-Conversion**: mock de e-commerce, decisão por SKU em ms.
- **Price-to-Margin**: central corporativa, curva Preço × Margem, decisão estratégica.
- **Price-to-Turnover** (novo): mapa regional + régua temporal de markdown, decisão por cluster.

## Escopo

PT-only (padrão das demos do kiosk). Sem alterações em outras demos, config, roteamento ou i18n.
