## Metas Comerciais Preditivas — duas novas perguntas no i6 Signal

Hoje `predictive-commercial-targets` reaproveita os cenários `comercial` + `forecast`. Vamos criar duas perguntas dedicadas com respostas próprias.

### 1. Novos scenario ids
Em `src/data/signalDemo/content.ts`:
- Adicionar ao `type Scenario`: `targetsPotential` e `targetsRisk`.
- Adicionar os dois blocos em `pt.scenarios` e `en.scenarios` com os textos exatos fornecidos (título, análise, tabela(s), argumentação, ações, perguntas sugeridas).

Estruturas de dados:
- `targetsPotential`: `{ label, question, title, analysis, potentialTable: { headers, rows }, reasoning, actions, questions }` — tabela hierárquica Região/Vendedor/Cliente/SKU/Meta atual/Meta sugerida/Potencial.
- `targetsRisk`: `{ label, question, title, analysis, scatter: [{ probability, delta, size, vendor, client, sku, quadrant }], riskTable, signalsTable, reasoning, actions, questions }`.

### 2. Novas visualizações
Em `src/components/signalDemo/visualizations.tsx`:
- `TargetsPotentialTable` — tabela agrupada visualmente por Região (primeira coluna com rowspan/merge visual), com destaque coral em "Meta sugerida" e verde/vermelho em "Potencial" quando positivo/negativo.
- `TargetsRiskScatter` — `ScatterChart` do Recharts (eixo X 0–100% probabilidade, eixo Y delta meta−projeção, `ZAxis` para tamanho da bolha, cor por quadrante). Legenda dos 4 quadrantes (Meta acima do potencial / Meta compatível / Meta abaixo do potencial / Alta incerteza) com linhas de referência (`ReferenceLine`) em x=60 e y=0. Bolha rotulada por vendedor/cliente/SKU no tooltip.
- `TargetsRiskTables` — duas tabelas empilhadas: (a) Vendedor/Cliente/SKU/Meta atual/Volume projetado/Probabilidade/Diagnóstico com badge colorido no diagnóstico; (b) tabela de "Sinais que sustentam a previsão" comparando Cliente A vs Cliente D.
- Bloco `reasoning` renderizado como quadro "Por que" (fundo cinza claro, ícone Brain, título "Argumentação preditiva" / "Predictive reasoning").

### 3. Wire no Intelliboard
Em `src/components/kiosk/KioskSignalIntelliboard.tsx`:
- Adicionar dois blocos condicionais após os cenários existentes:
  - `activeScenario === 'targetsPotential'` → `TargetsPotentialTable` + bloco reasoning.
  - `activeScenario === 'targetsRisk'` → `TargetsRiskScatter` + `TargetsRiskTables` + bloco reasoning.

### 4. Remapear a solução
Em `src/data/kiosk/config.ts`:
- Ampliar o tipo do `solutionSignalMap` para incluir os novos ids.
- Trocar `'predictive-commercial-targets': ['comercial', 'forecast']` por `['targetsPotential', 'targetsRisk']`.
- Cenários `comercial`/`forecast` permanecem para as outras soluções.

### 5. Versão EN
Traduzir integralmente os textos das duas perguntas mantendo estrutura e números (Meta → Target, Potencial → Potential, Vendedor → Rep, Interior de SP → São Paulo Countryside, Minas Gerais/Sul mantidos como nomes próprios). Manter unidades em unidades (não converter).

### Detalhes técnicos
- Arquivos afetados:
  - `src/data/signalDemo/content.ts` — tipo Scenario, novos blocos PT/EN.
  - `src/components/signalDemo/visualizations.tsx` — três novos componentes (Potential table, Risk scatter, Risk tables) + import de `ScatterChart, Scatter, ZAxis, ReferenceLine` do recharts.
  - `src/components/kiosk/KioskSignalIntelliboard.tsx` — dois novos ramos de render + renderização do bloco `reasoning` quando existir (aplicar apenas nas novas cenas para não afetar as demais).
  - `src/data/kiosk/config.ts` — tipo do map + entrada `predictive-commercial-targets`.
- Também vou verificar `src/components/kiosk/KioskSignalDemo.tsx` (versão simples de signals sem chart) — ele usa `kioskSignals` de `signals.ts`, não `content.ts`, então não é afetado pelo Intelliboard. Nada a mudar lá.
- Sem impacto em `I6SignalDemo` do /solutions: como o `solutionSignalMap` é global, `predictive-commercial-targets` passará a mostrar essas duas perguntas em ambos os surfaces (kiosk e /solutions). Aviso: se preferir manter comportamento antigo no /solutions, me diga que faço o remap escopado ao kiosk.
