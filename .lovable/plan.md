## Objetivo
Impedir que os textos da primeira coluna ("Comportamento previsto") da tabela da resposta 2 do i6 Signal em Price to Conversion quebrem em duas linhas, reduzindo a fonte.

## Alteração
Arquivo: `src/components/signalDemo/visualizations.tsx` (componente `PriceConversionSessionSegmentsTable`, linhas ~1622–1623).

- Célula `ci === 0` (primeira coluna do corpo): trocar tamanho da fonte de `text-sm` (herdado) para `text-xs`, mantendo `font-medium text-gray-900`.
- Opcionalmente também adicionar `leading-tight` para reduzir a altura da linha e evitar quebras estéticas.

Somente essa tabela específica é afetada (Resposta 2 — segmentação de sessões). As demais tabelas de outras respostas não são tocadas.

## Fora de escopo
- Sem alterações nos textos/dados em `src/data/signalDemo/content.ts`.
- Sem mudanças na versão EN dos dados (só CSS do componente).
