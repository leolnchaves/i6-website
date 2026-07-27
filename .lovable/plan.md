## Plano: Mix, Sortimento e Pedido Ideal — 2 novas perguntas no i6 Signal

Segue o mesmo padrão usado em Metas Comerciais Preditivas (targetsPotential/targetsRisk): novos tipos de cenário + conteúdo PT/EN + componentes de visualização + wiring no Intelliboard.

### 1. `src/data/signalDemo/content.ts`
- Adicionar novos tipos: `mixBehavior` (Pergunta 1) e `mixGaps` (Pergunta 2) ao union `Scenario`.
- Criar blocos PT e EN com:
  - **mixBehavior**: `question`, `title`, `executive`, tabela de PDVs (`pdvTable`), dados do scatter (`scatter`: aderência × produtividade, tamanho = ticket, quadrantes outlier+/outlier-/padrão/emergente), `behaviorReading` (leitura comportamental, 2 parágrafos sobre PDV 184 e PDV 327), `actions`.
  - **mixGaps**: `question`, `title`, `executive`, tabela de gaps (`gapsTable`), matriz de heatmap (`heatmap`: regiões × SKUs com intensidade), `behaviorDetail` (bullets de detalhamento comportamental), `reasoning` (argumentação preditiva), `actions`.

### 2. `src/data/kiosk/config.ts`
- Remapear `mix-assortment-order` no `solutionSignalMap` de `['mix', 'forecast']` para `['mixBehavior', 'mixGaps']`.
- Estender a assinatura do `Record` com os dois novos ids.

### 3. `src/components/signalDemo/visualizations.tsx`
Novos componentes:
- `MixBehaviorScatter`: `ScatterChart` (aderência ao mix × giro/SKU, bubble = ticket) com destaque colorido para outliers +/− e legenda; reaproveita paleta usada em `TargetsRiskScatter`.
- `MixBehaviorTable`: tabela dos PDVs (Perfil, Aderência, Desvio, Potencial) com badges tonais em Aderência (verde/âmbar/vermelho) e Potencial (verde/vermelho).
- `MixGapsHeatmap`: grid Região × SKU pintado por intensidade da oportunidade (opacidade coral escalada por p.p. de gap), com tooltip nativo em cada célula.
- `MixGapsTable`: tabela complementar (Presença atual, Presença ideal, Gap p.p., Potencial de ticket) com Gap destacado em coral e Potencial em verde.
- `MixBehaviorReading` / `MixGapsDetailList`: blocos textuais estruturados (título coral + parágrafos ou lista de bullets) no mesmo tom dos quadros existentes.

### 4. `src/components/kiosk/KioskSignalIntelliboard.tsx`
- Importar os novos componentes.
- Adicionar branches `activeScenario === 'mixBehavior'` e `=== 'mixGaps'` no bloco de renderização — antes do `h4 "Ações recomendadas"`.
- No cenário `mixBehavior`: renderizar `MixBehaviorScatter` + `MixBehaviorTable` + quadro "Leitura comportamental".
- No cenário `mixGaps`: renderizar `MixGapsHeatmap` + `MixGapsTable` + bloco "Detalhamento comportamental" + quadro "Argumentação preditiva" (reutilizando o mesmo container coral já usado em Metas).

### Notas técnicas
- Nenhum novo pacote — apenas `recharts` (já em uso) para o scatter; o heatmap é feito em CSS grid + Tailwind para performance e simplicidade.
- Textos em EN traduzidos preservando terminologia já adotada (PDV → PoS/Store, mix → assortment, ticket → basket).
- Sem alteração em `signals.ts`, no fluxo do quiz ou nos dados de outros cenários.

Publicação de release patch após a validação visual.
