Aumentar visualmente os cards de KPI (UPLIFT NO TICKET, PROPENSÃO CROSS-SELL, CONFIANÇA e o botão "Voltar à vitrine") na demo de **Personalização + Descoberta Preditiva**, encolhendo levemente os tiles de produto para preservar a altura da coluna esquerda.

## Alterações em `src/components/kiosk/demos/PredictivePersonalizationDemo.tsx`

1. `MetricPill` (linhas 26–50):
   - `px-[1.2vmin] py-[0.9vmin]` → `px-[1.8vmin] py-[1.5vmin]`
   - label: `text-[1vmin]` → `text-[1.25vmin]`, `mb-[0.2vmin]` → `mb-[0.6vmin]`
   - valor: `text-[1.7vmin]` → `text-[2.4vmin]`, ícone `w-[1.5vmin] h-[1.5vmin]` → `w-[2vmin] h-[2vmin]`
2. Botão "Voltar à vitrine" (linha 365): `py-[1.2vmin]` → `py-[1.8vmin]`, `text-[1.5vmin]` → `text-[1.7vmin]` para acompanhar a nova altura.
3. `SkuTile` variante `small` (linhas 72–89):
   - padding `p-[1.3vmin]` → `p-[1.1vmin]`
   - categoria `text-[1.15vmin]` → `text-[1.05vmin]`
   - nome `text-[1.5vmin]` → `text-[1.35vmin]`, `min-h-[3.4vmin]` → `min-h-[3vmin]`
   - preço `text-[1.5vmin]` → `text-[1.4vmin]`

Sem outras mudanças estruturais.
