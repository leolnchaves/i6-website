## O que muda

Recalcular o CAC de cada dimensão como **investimento sugerido ÷ volume incremental** — o custo por unidade adicional capturada pelo modelo.

### Por região (allocation)
Em `src/data/kiosk/demos/commercialTargets.ts` (bloco `regionAgg` / `allocation`):

- Além do que já existe, agregar por região o `currentScaled` e o `suggested` do dataset `enriched` para obter `regionCurrent` e `regionSuggested`.
- `regionIncremental = max(0, regionSuggested − regionCurrent)` (em unidades).
- Cada linha de `allocation` passa a ter:
  - `incrementalVolume: regionIncremental`
  - `cac = suggestedInvestment / regionIncremental` (em milhares por unidade; se `incremental == 0`, cai para `suggestedInvestment / max(1, regionSuggested)` para evitar divisão por zero).
- Remove-se o `rand(...cac..., 10, 25)` da linha 364.

### KPI global (`projectedCac`)
Trocar a média aritmética atual por:

```
projectedCac = suggestedInvestment_total / incrementalVolume_total
```

(usa as somas globais já calculadas em `totalSuggested`/`suggestedInvestment`.)

### Extensão para as outras dimensões
Adicionar campos `currentInvestmentSum`, `suggestedInvestment` e `cac` em cada `AggregatedRow` de `dimRows.rep / client / sku`:

- `currentInvestmentSum` = soma de `currentInvestment` das linhas base agrupadas por vendedor/cliente/SKU.
- `suggestedInvestment` = rateio do orçamento total (`budgetVal`) proporcional ao mesmo score `growth/cac` — para vendedor/cliente/SKU usa-se um growth/cac derivado das linhas base (mesma fórmula da região, aplicada por chave).
- `cac = suggestedInvestment / max(1, suggested − current)` da própria linha.
- Reaproveita o helper `rand` só para o `growthPct` por chave, mantendo estabilidade entre execuções.

Assim, ao alternar o switcher (Região/Vendedor/Cliente/SKU), a tabela `Allocation` continua mostrando quanto de investimento cada item precisa para ativar o crescimento projetado, com o CAC coerente.

### Impacto na UI
Nenhuma mudança estrutural em `CommercialTargetsDemo.tsx`. As colunas `Current`, `Suggested` e `CAC` já existem e passam a exibir os valores derivados coerentes. O card **CAC Projetado** passa a exibir o CAC ponderado global.

### Fora de escopo
- Não altero copy/labels
- Não altero o formato de exibição (`fmtCAC`, `fmtBRL`)
- Não mexo em `RegionAllocation` além dos campos citados
