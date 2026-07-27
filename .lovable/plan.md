## Plano: Preço Orientado à Margem — 2 novas perguntas no i6 Signal

Segue o mesmo padrão de `mixBehavior`/`mixGaps` e `targetsPotential`/`targetsRisk`: novos tipos de cenário + conteúdo PT/EN + componentes de visualização + wiring no Intelliboard.

### 1. `src/data/signalDemo/content.ts`
- Adicionar `marginOpportunities` (Pergunta 1) e `marginSignals` (Pergunta 2) ao union `Scenario`.
- Blocos PT e EN com:
  - **marginOpportunities**: `question`, `title`, `executive`, `scatter` (sensibilidade × margem incremental, bolha = receita, destaque prioridade/risco), `skuTable` (SKU, Preço atual, Preço recomendado, Reação prevista do volume, Margem incremental, Confiança), `behaviorReading` (2 parágrafos SKU A / SKU D), `actions`.
  - **marginSignals**: `question`, `title`, `executive`, `signalsChart` (contribuição por sinal: demanda prevista, sensibilidade, posição competitiva, estoque, margem atual, comportamento da categoria — barras divergentes por SKU), `signalsTable` (Espaço para margem, Principal sinal positivo, Principal restrição, Direção), `reasoning` (argumentação preditiva), `actions`.

### 2. `src/data/kiosk/config.ts`
- Remapear `price-to-margin` em `solutionSignalMap` de `['pricing', 'mix']` para `['marginOpportunities', 'marginSignals']`.
- Estender a assinatura do union com os dois novos ids.

### 3. `src/components/signalDemo/visualizations.tsx`
Novos componentes:
- `MarginOpportunitiesScatter`: `ScatterChart` recharts com eixo X = sensibilidade prevista, eixo Y = margem incremental potencial, bolha proporcional a receita; cores: coral para prioridade, âmbar para ajuste controlado, cinza para risco/manter. Reaproveita paleta de `TargetsRiskScatter`.
- `MarginOpportunitiesTable`: tabela dos SKUs com badges tonais em Reação de volume (verde se ≤0, vermelho se >0 negativo material) e Margem incremental (verde/coral, "Sem oportunidade" em cinza), Confiança em coral suave.
- `MarginSignalsChart`: gráfico de barras divergentes (positivo/negativo) por SKU × 6 sinais, em Recharts `BarChart` com layout horizontal empilhado — sinais positivos à direita, restrições à esquerda; legenda de sinais no topo.
- `MarginSignalsTable`: Espaço para margem (badge Alto/Médio/Baixo/Negativo), Principal sinal positivo, Principal restrição, Direção (Aumentar/Ajuste controlado/Manter/Reduzir com cor).
- `MarginBehaviorReading` / `MarginReasoningBlock`: blocos textuais no mesmo tom coral dos quadros existentes ("Leitura comportamental" e "Argumentação preditiva").

### 4. `src/components/kiosk/KioskSignalIntelliboard.tsx`
- Importar os novos componentes.
- Branches `activeScenario === 'marginOpportunities'` e `=== 'marginSignals'` antes do `h4 "Ações recomendadas"`.
- `marginOpportunities`: `MarginOpportunitiesScatter` + `MarginOpportunitiesTable` + quadro "Leitura comportamental".
- `marginSignals`: `MarginSignalsChart` + `MarginSignalsTable` + quadro "Argumentação preditiva" (mesmo container coral já usado em Metas/Mix).

### Notas técnicas
- Sem novos pacotes — `recharts` (já em uso) para scatter e barras divergentes.
- Textos em EN preservando terminologia adotada (SKU permanece SKU; "banda competitiva" → "competitive band"; "margem incremental" → "incremental margin").
- Valores em BRL nos exemplos (R$), como no briefing.
- Sem alteração em `signals.ts`, no fluxo do quiz ou em outros cenários.

Publicação de release patch após validação visual.
