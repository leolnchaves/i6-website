## Contexto

Varri todos os demos e telas do /kiosk atrás de combos (`<select>` / dropdowns). Resultado:

- **MixAssortmentOrderDemo** — 4 combos (Loja/PDV + Região no setup e no cabeçalho do carrinho). São os únicos combos reais do /kiosk.
- **CommercialTargetsDemo** — sem combos. Tem um switcher de dimensões (Região/Vendedor/Cliente/SKU) mas já é implementado como chips grandes touch-friendly.
- **PredictivePersonalizationDemo** — sem combos. Abas de cenário são chips.
- **DemandForecastDemo / PropensityCampaignDemo** — sem combos.
- **KioskMetrics** — dashboard interno, fora do escopo touch.

O elemento selecionado nesta mensagem (span "Investimento atual" em CommercialTargets) é um cabeçalho de tabela, não um combo — não requer alteração.

Também já criei `src/components/kiosk/ui/TouchSelect.tsx` na iteração anterior. Falta apenas plugar no Mix.

## O que muda

Substituir os helpers internos `SelectField` e `CompactSelect` de `src/components/kiosk/demos/MixAssortmentOrderDemo.tsx` pelo `TouchSelect` já existente:

### `TouchSelect` (já criado)
- Gatilho: botão com min-h ≥ 6.5vmin, label em uppercase acima, valor grande + chevron coral, borda coral quando aberto
- Popover: ancorado abaixo do gatilho, largura mínima 28vmin, opções com altura ≥ 6vmin, texto ~1.6vmin, marcador coral e check na selecionada
- Fecha por: seleção, clique/toque fora, tecla Esc

### Aplicação no Mix
- Setup (linhas 99 e 105) — trocar `SelectField` por `TouchSelect`
- Cabeçalho do carrinho no resultado (linhas 142 e 148) — trocar `CompactSelect` por `TouchSelect` (mesma variante grande, como acordado no plano anterior — o usuário pediu explicitamente mais espaço)
- Remover as definições internas `SelectField` e `CompactSelect` (código morto)

### Escopo
- Apenas frontend/presentation em `MixAssortmentOrderDemo.tsx`
- API preservada: `label`, `value`, `onChange`, `options[]` — datasets/tradução/filtro inalterados
- Nenhum outro demo do /kiosk é tocado (não há combos neles)
