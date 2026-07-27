
## Objetivo

Rodada de ajustes globais no i6 Signal + novo mapeamento para **Preço Orientado à Conversão**.

---

## 1. Remoção global do quadro "Argumentação preditiva"

Em **todos os cenários mapeados** no i6 Signal, remover o bloco "Argumentação preditiva" do `KioskSignalIntelliboard.tsx`.

Antes de remover, para cada cenário, comparar o texto do `reasoning` com a `executiveAnalysis` correspondente:
- Se o `reasoning` traz **conteúdo adicional** (não redundante), esse conteúdo é **incorporado** ao final da `executiveAnalysis` como um parágrafo extra.
- Se é apenas reforço do que já está na análise executiva, é simplesmente removido.

Cenários auditados (PT e EN):
- Forecast preditivo (2 perguntas)
- Metas comerciais (potencial + risco)
- Mix, sortimento e pedido ideal (comportamento + gaps)
- Preço orientado à margem (oportunidades + sinais)
- Preço orientado ao giro (risco + markdown)
- Personalização + Descoberta (comportamento + recompra)

O quadro deixa de ser renderizado — o campo `reasoning` no tipo `Scenario` pode ficar opcional e não usado, ou ser removido do render sem apagar do tipo (menos risco).

## 2. Uniformização visual das tabelas

Regra: **tabelas nas respostas do Signal não devem usar badges nem células coloridas**. A diferenciação semântica (alta/média/baixa, positivo/negativo) fica **apenas na cor da fonte** da célula, com o fundo neutro do tema.

Componentes a revisar em `src/components/signalDemo/visualizations.tsx`:
- `MixBehaviorTable`, gaps table
- `MarginOpportunitiesTable`, `MarginSignalsTable`
- `TurnoverRiskTable`, `TurnoverSignalsCompareTable`, `TurnoverMarkdownTable`
- `TargetsPotentialTable`, sinais de targets
- `PersonalizationSignalsTable`, `RepurchaseBehaviorTable`, `RepurchaseCorrelationsTable`
- Qualquer outra tabela em cenários existentes

Aplicar tokens semânticos existentes (ex.: `text-destructive`, `text-primary`, `text-muted-foreground`) — sem `bg-*` colorido nem `Badge` decorativo dentro das linhas.

## 3. Ajustes pontuais de gráficos

**3a. Mix, Sortimento e Pedido Ideal → Resposta 1 ("Mix por PDV")**
Substituir o scatter atual (`MixBehaviorScatter`, gráfico de bolhas) por um gráfico mais convencional — **gráfico de barras horizontais** ranqueando PDVs por aderência ao mix ideal, com barra dividida em "aderente" / "gap". Usa Recharts `BarChart` empilhado, mesmos dados de origem.

**3b. Campanhas por Propensão → Resposta 2 ("Clusters de Comportamento")**
Substituir os quadros/cards dos clusters por uma **tabela única** listando: cluster, tamanho, propensão, ação recomendada, motivo/leitura. Mesmo padrão visual das outras tabelas (sem badge).

## 4. Novo mapeamento: Preço Orientado à Conversão

Solução `price-to-conversion` (verificar slug atual em `src/data/kiosk/config.ts`) recebe dois novos cenários no Signal.

### Pergunta 1 — Fricções preditivas de preço na jornada de compra
Pergunta exibida: *"Em quais produtos, sessões e contextos o preço atual está reduzindo a probabilidade de conversão?"*

Estrutura da resposta:
- **Análise executiva** (dois parágrafos — inclui o conteúdo original + o essencial da antiga "argumentação preditiva" que agrega valor: leitura do porquê o Produto A tem fricção em mídia paga vs. recorrentes).
- **Visual principal**: heatmap Produto × Contexto exibindo intensidade de fricção de preço; ao lado, tabela com as 5 linhas (Produto A mídia paga → Produto D primeira visita) com colunas Intenção / Fricção / Conversão prevista / Direção recomendada. **Sem badges** — cor de fonte apenas.
- **Sinais comportamentais**: tabela de 2 colunas (Sinal preditivo, Leitura do modelo) com as 6 linhas fornecidas.
- **Ações recomendadas**: lista de 3 itens.

### Pergunta 2 — Necessidade preditiva de incentivo por comportamento *(Versão A)*
Pergunta exibida: *"Quais usuários precisam de um incentivo de preço para converter, e quais comprariam sem desconto?"*

Estrutura da resposta:
- **Análise executiva** (inclui o essencial da antiga "argumentação preditiva": exemplos de perfil que não deve receber desconto e perfil que responde a incentivo moderado).
- **Visual principal**: gráfico de barras horizontais (ou donut) com a distribuição 57% / 28% / 15%.
- **Tabela complementar**: 4 linhas (Compraria sem incentivo → Baixa intenção atual) com colunas Sessões, Probabilidade atual, Ação recomendada, Motivo. Sem badges.
- **Detalhamento comportamental**: lista dos 7 elementos que o Signal mostra ao selecionar um grupo.
- **Ações recomendadas**: lista de 3 itens.

Ambas as perguntas em **PT e EN** em `src/data/signalDemo/content.ts`.

## Detalhes técnicos

**Arquivos a alterar:**
- `src/data/signalDemo/content.ts` — auditar/reescrever `executiveAnalysis` dos cenários existentes (incorporando parte do `reasoning` quando agrega); adicionar `priceConversionFriction` e `priceConversionIncentiveNeed` em PT/EN.
- `src/components/kiosk/KioskSignalIntelliboard.tsx` — remover render do bloco "Argumentação preditiva"; adicionar branches para os 2 novos cenários.
- `src/components/signalDemo/visualizations.tsx` — remover cores de fundo/badges nas tabelas listadas; trocar `MixBehaviorScatter` por `MixBehaviorRanking` (BarChart empilhado); substituir cards de clusters de propensão por `PropensityClustersTable`; adicionar `PriceFrictionHeatmap` + `PriceFrictionTable` + `PriceBehaviorSignalsTable` + `IncentiveNeedDistribution` (BarChart ou donut) + `IncentiveNeedTable`.
- `src/data/kiosk/config.ts` — mapear a solução de conversão para os dois novos cenários.

**Não altera:** roteamento, i18n do header/menus, layout do quiosque, componentes de outras páginas.

**Validação:** `tsgo` para type-check + inspeção visual no preview de cada solução no `/kiosk` em PT e EN.

## Pergunta em aberto
Nenhuma — Versão A confirmada para Pergunta 2 de Conversão.
