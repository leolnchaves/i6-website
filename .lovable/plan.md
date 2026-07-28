
## Objetivo

Aplicar à demo **Preço Orientado a Margem** (`price-to-margin`) exatamente o mesmo padrão já consolidado em Mix, Metas Comerciais, Forecast, Campanhas e Personalização:

1. **Gating de navegação** — Signal e CTA de eBook ficam ocultos até o usuário concluir a simulação (clicar em "Fechar simulação"), momento em que a página rola suavemente para o Signal.
2. **Card unificado** — remover o card superior "Solution Info" (o `SolutionsGrid` do topo já é ocultado para IDs migrados); usar o `SimulationLauncher` com o combo Resolve/Entrega/Impacto integrado e sem subtítulo "Explore o exemplo…".
3. **Layout do modal (retrato 27")** — dashboard/resultados no topo em uma única tela e, na parte de baixo, **timeline horizontal** de treinamento sempre visível, com o card **"POR QUE"** logo acima da timeline (padrão Mix).
4. **Sem "X" no topo** — apenas o botão "Fechar simulação" no rodapé; ao fechar, dispara `onSimulationClosed`.
5. **Padronização de textos e KPIs**
   - Título de explicabilidade: **"Explicabilidade e raciocínio do modelo"** (sem sufixo com nome do modelo, sem subtítulo abaixo).
   - Card "POR QUE" com texto curto (~40% do original) descrevendo os **sinais aprendidos** (elasticidade, posição vs. concorrente, piso de margem, banda competitiva) e a **lógica das ações** antes de citar resultados.
   - Fonte dos títulos de KPI reduzida quando estourarem o box; cabeçalhos de tabela em 2 linhas com fonte menor.
   - Sem badges/boxes coloridos em tabelas — apenas cor de fonte para variações.

## Escopo dos arquivos

- `src/components/kiosk/SolutionDemoBlock.tsx` — trocar o render de `price-to-margin` para envolver a nova demo em `SimulationLauncher` (ícone `TrendingUp` do lucide, seguindo o padrão Metas/Forecast), passando `onSimulationClosed`.
- `src/pages/Kiosk.tsx` — adicionar `'price-to-margin'` ao array `migratedIds` (ativa gating de Signal/CTA e oculta o `SolutionsGrid` do topo).
- `src/components/kiosk/demos/PriceMarginDemo.tsx` — refatorar para o formato **empilhado (dashboard em cima + timeline horizontal embaixo)**, removendo as fases internas `setup/running/result` (o `SimulationLauncher` já controla o fluxo). Reduzir KPIs/tabelas ao padrão retrato, aplicar tipografia responsiva em `vmin`, remover subtítulo e nome do modelo, e reescrever o card "POR QUE" na versão curta.
- `src/data/kiosk/demos/priceMargin.ts` — ajustar apenas o que for necessário para o novo card "POR QUE" (função tipo `generalInsightFor`) e limitar a **3 linhas** por tabela cobrindo os três cenários canônicos: **subir preço**, **manter** e **reduzir/proteger volume**. Sem novos dados fora disso.

## O que NÃO muda

- Regras de negócio do modelo (`computeOutcome`, elasticidade, piso de margem, banda competitiva) permanecem.
- Sinais associados no `solutionSignalMap` (`marginOpportunities`, `marginSignals`) permanecem.
- Sem mudanças em outras demos, em i18n global ou em conteúdos do Signal.

## Critérios de aceite

- Entrando em `/kiosk` e escolhendo Preço Orientado a Margem: aparece só o `SimulationLauncher` unificado; Signal e CTA de eBook não aparecem.
- Ao abrir a simulação: modal em tela cheia, sem "X" no topo, dashboard no topo, timeline horizontal na base, card "POR QUE" acima da timeline.
- Ao clicar "Fechar simulação": modal fecha, Signal e CTA aparecem e a página rola até o `#kiosk-signal-intelliboard`.
- Tabelas com 3 linhas, cabeçalhos em 2 linhas com fonte reduzida, sem badges coloridos.
- Nenhum texto exibe nome de modelo nem subtítulo abaixo de "Explicabilidade e raciocínio do modelo".
