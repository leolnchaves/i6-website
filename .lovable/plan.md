## Objetivo

Substituir o ícone genérico `Sparkles` no cabeçalho do card do `SimulationLauncher` por um ícone `lucide-react` que reflita o tema de cada solução do Kiosk.

## Mapeamento proposto (id da solução → ícone)

- `predictive-personalization` + `smart-discovery` (combo) → `UserRoundSearch` (personalização/descoberta por perfil)
- `predictive-campaign-targeting` → `Megaphone` (campanhas)
  AS VERSOES ABAIXO SERAO IMPLEMENTADAS QUANDO AJUSTARMOS AS PAGINAS DE CONCLUSAO PARA O NOVO FORMATO. 
- `price-to-margin` → `TrendingUp` (captura de margem)
- `price-to-turnover` → `RefreshCw` (giro de estoque)
- `price-to-conversion` → `MousePointerClick` (conversão)
- `demand-forecasting` → `LineChart` (previsão de demanda)
- `predictive-commercial-targets` → `Target` (metas comerciais)
- `mix-assortment-order` → `LayoutGrid` (mix e sortimento)

Confirme se algum ícone deve ser trocado antes de eu implementar.

## Alterações

1. `src/components/kiosk/SimulationLauncher.tsx`
  - Trocar o import fixo de `Sparkles` por uma prop opcional `icon?: LucideIcon` (fallback `Sparkles`).
  - Renderizar o componente recebido no mesmo quadrado coral (linha 69).
2. `src/components/kiosk/SolutionDemoBlock.tsx`
  - Definir um mapa `solutionId → LucideIcon` com o mapeamento acima.
  - Passar o ícone correspondente para cada uma das duas instâncias de `<SimulationLauncher>` (combo Personalização+Descoberta usa o do combo; demais usam o do próprio `solution.id`).

Sem mudanças de layout, tamanho ou cor — apenas o glifo dentro do quadrado coral.