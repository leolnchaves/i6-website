## Objetivo
Corrigir o estouro horizontal em todas as tabelas exibidas nas respostas do i6 Signal (Kiosk e /solutions). Sintoma: com `table-fixed` + `text-xs uppercase tracking-wider` + `px-3`, cabeçalhos longos (ex.: "PROBABILIDADE", "META SUGERIDA", "SINAL PRINCIPAL") e células com valores compostos ultrapassam a largura da coluna e são cortados pelo `overflow-hidden` do wrapper.

## Escopo
Todas as 18 tabelas em `src/components/signalDemo/visualizations.tsx`:
- `SupplyTable`, `BehaviorClustersTable`, `TargetsPotentialTable`, `TargetsRiskTable`, `TargetsSignalsTable`, `MixBehaviorTable`, `MixGapsTable`, `MixGapsHeatmap`, `MarginOpportunitiesTable`, `MarginSignalsTable`, `TurnoverRiskTable`, `TurnoverSignalsCompareTable`, `TurnoverMarkdownTable`, `PersonalizationSignalsTable`, `RepurchaseBehaviorTable`, `RepurchaseCorrelationsTable`, `PriceConversionContextTable`, `PriceConversionSignalsTable`, `PriceConversionIncentiveTable`.

## Ajustes (aplicados uniformemente a cada tabela)
1. **Cabeçalhos (`<th>`)**
   - `text-xs` → `text-[10px]`
   - `tracking-wider` → `tracking-normal`
   - `px-3` → `px-2`
   - adicionar `whitespace-normal break-words leading-tight align-bottom`
2. **Células (`<td>`)**
   - `px-3` → `px-2`
   - adicionar `whitespace-normal break-words leading-snug`
   - manter `tabular-nums` nas colunas numéricas
3. **Wrapper**
   - trocar `overflow-hidden` por `overflow-x-auto` como salvaguarda residual (nada será cortado mesmo em edge cases extremos).
4. **Sem mudanças** em: cores, negrito, alinhamento (left/right), dados, textos, notas de rodapé, ordem de colunas, gráficos e mapas de calor (apenas o `MixGapsHeatmap` também recebe o tratamento nos `<th>`).

## Resultado esperado
- Cabeçalhos quebram em até 2 linhas de forma controlada, sem estourar a largura da coluna.
- Células com números/labels longos quebram no espaço em vez de vazar.
- Layout retrato 27" do Kiosk e páginas /solutions continuam idênticos em cor e ritmo visual — apenas o tamanho de fonte dos títulos das tabelas fica ~15% menor e as bordas laterais das células ficam levemente mais estreitas.

## Verificação
Após o build, revisar visualmente as respostas de: Metas Comerciais Preditivas (r1 e r2), Mix/Sortimento (gaps), Preço Orientado a Margem (signals) e Forecast (supply) — as citadas historicamente com títulos mais longos.

## Versão
Publicar release patch (v2.2.11) após validação.