
Aplicar em **Preço Orientado a Giro** (`price-turnover`) o mesmo padrão já consolidado nas demais demos migradas (Preço/Margem, Mix, Metas, Forecast, Campanhas, Personalização).

## 1. Kiosk.tsx — navegação e gating

- Em `src/pages/Kiosk.tsx` (linha 222), acrescentar `'price-turnover'` ao array `migratedIds`.
- Isso ativa automaticamente: ocultação de `SolutionsGrid` e do CTA de conteúdo antes da simulação, exibição do Signal e CTA apenas após `onSimulationClosed`, e scroll suave para o Signal ao fechar.

## 2. SolutionDemoBlock.tsx — usar SimulationLauncher

- Substituir o retorno atual `<PriceTurnoverDemo />` (linhas 47-49) por um bloco `<SimulationLauncher>` seguindo o mesmo shape usado por Preço/Margem:
  - `icon`: `Gauge` (lucide-react) — coerente com "giro".
  - Passar `solutionTitle`, `solutionTagline`, `resolve`, `entrega`, `impacto`, `labels`, `lang`, `onSimulationClosed`.
  - Filho: `<PriceTurnoverDemo />`.

## 3. PriceTurnoverDemo.tsx — layout modal 90% retrato

Refatorar visualmente para o padrão empilhado dos demais (dashboard no topo, timeline horizontal com card "POR QUE" na base), mesmas convenções tipográficas:

- Fontes de cabeçalho de tabela: `text-[0.8vmin]`, `tracking-[0.1em]`, `whitespace-normal break-words leading-tight`, `px-2`.
- KPIs à esquerda do gráfico com `flex-1` acompanhando a altura do card do gráfico.
- Card "Confiança" (se existir) removido do topo e movido para rodapé compacto dentro do card do gráfico (`border-t border-white/10`), mesmo tratamento de Preço/Margem.
- Remoção do subtítulo "Pipeline preditivo…" e de qualquer sufixo com nome de modelo em "Explicabilidade e raciocínio do modelo".
- Timeline horizontal do pipeline visível durante `running`, mantida como resumo estático em `result`.
- Fluxo de interação alinhado ao de Preço/Margem: botão de cálculo habilitado assim que houver clusters filtrados (sem exigir seleção); após rodar, seleciona automaticamente o primeiro cluster; linhas de cluster ficam `disabled` durante o setup e liberadas após o cálculo.
- Reduzir para 3 clusters exibidos, cobrindo os 3 comportamentos: **manter preço**, **markdown agora** e **aguardar janela sazonal** (usar `hold`, `markdown`, `wait`). Rebalancear rótulos/valores para caber sem estouros.
- Ajuste de grids de filtros similar ao de Preço/Margem para evitar quebra de rótulos em 2 linhas.

## 4. priceTurnover.ts — dados

- Reduzir `clusters` para 3 (um por tipo de ação), mantendo `SkuRow[]` internos coerentes por cluster e ao menos 1 SKU por canal se houver filtro por canal.
- Adicionar `generalInsightFor(cluster, objective, minMargin)` no mesmo padrão condensado (≤ ~40% do tamanho dos textos atuais) descrevendo o que o modelo aprendeu: velocidade de giro vs. média da categoria, idade do estoque, elasticidade, janela sazonal e restrição de margem — e por que a ação recomendada segue disso. Sem citar nome do modelo.
- Manter `filterOptions` compatíveis (Produto, Região, Objetivo, Margem Mínima). Encurtar rótulos se necessário para não estourar filtros.

## 5. KioskSignalIntelliboard

- Sem alterações: os cenários `turnover*` já existem e serão exibidos após `onSimulationClosed` via gating do Kiosk.

## Fora de escopo

Outras demos, textos do Signal, tracker, temas globais.

## Publicação

Publicar patch (v2.2.11) somente após validação visual do usuário.
