## Nova demo: Mix, Sortimento e Pedido Ideal

Solution ID: `mix-assortment-order`. Padrão: seguir estrutura das demos existentes (PT-only, estático, layout esquerda/direita).

### Arquivos novos

**`src/data/kiosk/demos/mixAssortmentOrder.ts`** — dataset + lógica
- Portal B2B: 1 PDV plausível (varejo alimentar/farma), região, cluster, categoria, ciclo (7/15/30 dias).
- Mix atual de ~28 SKUs com métricas por SKU: giro, cobertura, sell-out, dias sem venda, presença no cluster, demanda prevista, embalagem mínima, ticket.
- Função de cálculo determinística que classifica cada SKU em uma ação: `manter | incluir | substituir | remover | aumentar` respeitando restrições (limite financeiro, capacidade, embalagem, política).
- Retorna: contagens do mix atual (ruptura, baixo giro, não positivados), contagens do mix recomendado, carrinho sugerido (~8-12 linhas), KPIs (pedido incremental R$, ticket potencial, novos positivados, risco de ruptura reduzido %).
- Drill por SKU com um dos 5 argumentos ricos (ver abaixo) e fatores/números coerentes (giro, cobertura, PDVs similares, potencial).

### Argumentos "Por que" (ampliar os do briefing)

1. **Inclusão** — ausente no mix, alta demanda no cluster, PDVs similares recorrentes, complementa itens já comprados, baixo risco de estoque parado.
2. **Substituição** — baixo giro, canibaliza SKU melhor, preserva função na categoria, reduz estoque redundante, aumenta probabilidade de venda + libera capital de giro + margem líquida superior + menor risco de ruptura no substituto por sell-out mais estável.
3. **Aumento de volume** — cobertura abaixo do ideal frente à demanda projetada, sazonalidade favorável, PDVs semelhantes vendem X% mais neste SKU, embalagem mínima permite subida sem quebra logística.
4. **Redução** — cobertura acima do ideal, giro em queda, risco de vencimento/obsolescência, capital preso deslocável para SKUs de maior retorno.
5. **Manter** — desempenho dentro da faixa saudável, sem sinal de ruptura nem excesso, contribuição estável à cesta.

### Componente

**`src/components/kiosk/demos/MixAssortmentOrderDemo.tsx`** — segue padrão das outras demos:
- Header: `OBJETIVO: MIX E PEDIDO`.
- Fase setup (esquerda): filtros (loja/PDV, região, cluster, categoria, ciclo). Cards de contexto: mix atual, estoque disponível, vendas recentes, último pedido, não positivados. CTA "Gerar mix e pedido ideal".
- Fase running: pipeline de 5 passos no painel direito (mesmos títulos do briefing).
- Fase result:
  - Esquerda: comparação Mix atual vs Mix recomendado (contagens em duas colunas), tabela do carrinho sugerido (SKU · Ação · Volume) com badges coloridos por ação e linhas clicáveis, grid de 4 KPIs.
  - Direita: pipeline concluído + bloco Insight "POR QUE ESSA RECOMENDAÇÃO" com o argumento do SKU selecionado (ou insight geral se nenhum SKU selecionado). Botão "Nova simulação" ao final.

### Integração

Adicionar em `src/components/kiosk/SolutionDemoBlock.tsx`: `if (solution.id === 'mix-assortment-order') return <MixAssortmentOrderDemo />;`

Sem i18n, sem latência (segue padrão do Campanhas/Metas onde latência não faz sentido).
