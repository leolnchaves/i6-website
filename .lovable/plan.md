## Objetivo

Unificar o card do launcher em "Personalização + Descoberta" em um único bloco, sem duplicar RESOLVE/ENTREGA/IMPACTO.

## Mudanças

**`src/components/kiosk/SolutionDemoBlock.tsx`** (branch `predictive-personalization` | `smart-discovery`):
- Título fixo: `"Personalização e Descoberta Preditiva"` (PT) / `"Predictive Personalization and Discovery"` (EN).
- Subtítulo fixo: `"Antecipe a próxima melhor oferta para cada cliente, inclusive anônimos."` (PT) / equivalente EN.
- Passar apenas `resolve`, `entrega`, `impacto` já concatenados (uma descrição por linha, dividida por `\n`), combinando os textos das duas soluções (`solution` + `companion`).
- Remover as props `secondaryTitle`/`secondaryResolve`/`secondaryEntrega`/`secondaryImpacto` neste caso.

**`src/components/kiosk/SimulationLauncher.tsx`**:
- Ajustar `SummaryRow` para renderizar `value` preservando quebras de linha (`whitespace-pre-line`), permitindo mostrar as duas descrições empilhadas dentro do mesmo box coral.
- Nenhuma mudança visual nos casos que passam `value` de linha única (Campanhas).

Sem alterações em conteúdo dos textos (usa os `resolve`/`entrega`/`impacto` já existentes em `LeanSolution`) nem em lógica de modal/simulação.
