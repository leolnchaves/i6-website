## Objetivo

Migrar a jornada de **Forecast Preditivo** (`demand-forecasting`) para o mesmo padrão de Personalização e Campanhas: card unificado da solução + botão de simulação abrindo o modal 90%; Signal e CTA do ebook escondidos até fechar a simulação.

## Mudanças

### 1. `src/components/kiosk/SolutionDemoBlock.tsx`
Substituir o retorno direto de `<DemandForecastDemo lang={lang} />` por um wrap em `<SimulationLauncher>`, exatamente no mesmo formato de `predictive-campaign-targeting`:

- Passar `solution.title`, `solution.tagline`, `resolve`, `entrega`, `impacto`, `labels`.
- Ícone: `LineChart` (do `lucide-react`), coerente com previsão de demanda.
- Encaminhar `onSimulationClosed`.
- Render `<DemandForecastDemo lang={lang} />` como `children`.

### 2. `src/pages/Kiosk.tsx`
Adicionar `'demand-forecasting'` ao array `migratedIds` (linha 222) para esconder o card superior de solução e o CTA de ebook enquanto a simulação não é fechada — mesmo comportamento das demais migradas.

## Fora de escopo

- Nenhuma alteração dentro de `DemandForecastDemo.tsx` (a demo permanece como está).
- Nenhuma mudança nas demais demos (Metas Comerciais, Mix/Sortimento, Preço) — serão migradas em passos seguintes, uma por vez.
- Sem alterações em i18n, textos do Signal, tracker, ou config do kiosk.

## Arquivos afetados

- `src/components/kiosk/SolutionDemoBlock.tsx`
- `src/pages/Kiosk.tsx`
