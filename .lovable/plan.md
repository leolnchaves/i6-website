## Plano: Preço Orientado ao Giro — 2 novas perguntas no i6 Signal

Mesmo padrão de `marginOpportunities`/`marginSignals`: novos cenários no union, conteúdo PT/EN, componentes de visualização e wiring no Intelliboard.

### 1. `src/data/signalDemo/content.ts`
Adicionar dois novos cenários ao union `Scenario`:

- **`turnoverRisk`** (Pergunta 1 — Risco preditivo de envelhecimento por região e cluster)
  - `question`, `title`, `executive` (2 parágrafos: SKU A em 38 lojas, Interior de Minas / Sul Metropolitano vs São Paulo Premium)
  - `regionTable`: Região/cluster, Estoque atual, Cobertura projetada, Sell-through previsto, Risco (badge Baixo/Médio/Alto)
  - `signalsTable`: 5 sinais preditivos comparados entre Interior de Minas × São Paulo Premium (velocidade, sensibilidade, sazonalidade, idade estoque, pressão competitiva)
  - `reasoning` (argumentação preditiva, 2 parágrafos)
  - `actions` (3 ações)

- **`turnoverMarkdown`** (Pergunta 2 — Markdown preditivo por SKU, região e ciclo de vida)
  - `question`, `title`, `executive` (2 parágrafos: 7 SKUs em markdown, SKU A Interior de Minas 12%, SKU D São Paulo Premium manter 21 dias)
  - `markdownRuler`: régua temporal 4 clusters × 4 janelas (Hoje / 7 dias / 14 dias / 21 dias) com valores tipo `-12%`, `Manter`, `Reavaliar`
  - `skuTable`: SKU, Cluster prioritário, Preço atual, Preço recomendado, Sell-through projetado, Margem preservada
  - `reasoning` (2 parágrafos)
  - `actions` (3 ações)

Blocos EN espelham PT com terminologia já adotada ("cluster", "sell-through", "markdown", "SKU").

### 2. `src/data/kiosk/config.ts`
- Remapear `price-to-turnover` em `solutionSignalMap` de `['pricing', 'supply']` para `['turnoverRisk', 'turnoverMarkdown']`.
- Estender assinatura do union com `turnoverRisk` e `turnoverMarkdown`.

### 3. `src/components/signalDemo/visualizations.tsx`
Novos componentes (reaproveitando paleta e estilos existentes):

- `TurnoverRiskTable`: tabela regional com badge tonal em Risco (verde Baixo, âmbar Médio, coral Alto) e coluna de sell-through com barra tonal.
- `TurnoverSignalsCompareTable`: tabela comparativa 2 colunas (Interior de Minas × São Paulo Premium), com badges tonais Alta/Média/Baixa e deltas coloridos (+8% verde, -24% coral).
- `TurnoverMarkdownRuler`: grid 4×5 (cluster × 4 janelas + label) com células coloridas conforme o valor (coral para descontos, cinza para Manter, âmbar para Reavaliar). Renderiza como tabela responsiva no mesmo estilo dos outros quadros escuros.
- `TurnoverMarkdownTable`: tabela de SKUs com badge em Preço recomendado (coral se desconto, cinza "Manter") e formatação BRL.
- Reaproveitar `MarginReasoningBlock` (renomear para bloco genérico `ReasoningBlock` já usado, ou duplicar com título "Argumentação preditiva") — verificar bloco existente antes de duplicar.

### 4. `src/components/kiosk/KioskSignalIntelliboard.tsx`
- Importar novos componentes.
- Branches `activeScenario === 'turnoverRisk'` e `=== 'turnoverMarkdown'` antes do `h4 "Ações recomendadas"`.
- `turnoverRisk`: `TurnoverRiskTable` + `TurnoverSignalsCompareTable` + quadro "Argumentação preditiva".
- `turnoverMarkdown`: `TurnoverMarkdownRuler` + `TurnoverMarkdownTable` + quadro "Argumentação preditiva".

### Notas técnicas
- Sem novos pacotes — tudo em tabelas Tailwind + eventual heatmap simples via `div grid` (sem recharts nesses dois cenários, pois régua e tabela regional são tabulares).
- Valores em BRL (R$). SKU permanece SKU em EN.
- Sem alteração em `signals.ts`, no fluxo do quiz, ou em demos do Kiosk.

Publicação de release patch após validação visual.