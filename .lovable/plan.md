## Objetivo

Reescrever "POR QUE PROJETAMOS ESTA DEMANDA" em prosa corrida, citando naturalmente **tendência**, **sazonalidade** e **esparsidade** ao longo do texto. Objetivo, sem repetir KPIs.

## Alvo

Campos `argumentPt` / `argumentEn` dos 3 SKUs em `src/data/kiosk/demos/demandForecast.ts`.

## Reescritas propostas

**Electronics — PT**
> A tendência estrutural de +18% a.a. foi preservada, enquanto a sazonalidade de Black Friday e Natal foi isolada como pico próprio (com o calendário 2025, BF em 28/11) em vez de diluída na média. A esparsidade das rupturas de novembro foi tratada como dado censurado — não como queda de demanda — antes de o padrão ser aprendido.

**Electronics — EN**
> The structural +18% YoY trend was preserved, while Black Friday and Christmas seasonality was isolated as a peak of its own (using the 2025 calendar, BF on Nov 28) instead of being averaged out. Sparsity from November stockouts was handled as censored data — not as a demand drop — before the pattern was learned.

**Beverage — PT**
> A tendência de +8% a.a. foi mantida sobre um Q4 forte, e a sazonalidade natural de dezembro foi separada da promo de nov/dez para não contaminar meses regulares. A esparsidade de maio/24 e maio/25 foi corrigida ao tratar a ruptura como demanda censurada (real ~2× o vendido).

**Beverage — EN**
> The +8% YoY trend was kept on top of a strong Q4, and December's natural seasonality was separated from the Nov/Dec promo to avoid contaminating regular months. Sparsity in May/24 and May/25 was corrected by treating the stockouts as censored demand (real ~2× sold).

**Fashion — PT**
> O viés flat na tendência foi removido, e a sazonalidade dupla — inverno (jun/jul) e liquidação (jan/fev) — foi modelada como duas ondas independentes em vez de uma média única. A esparsidade por SKU foi tratada separadamente para ruptura e excesso, reconhecendo que faltam tamanhos-chave enquanto sobra cauda.

**Fashion — EN**
> The flat trend bias was removed, and the double seasonality — winter (Jun/Jul) and clearance (Jan/Feb) — was modeled as two independent waves instead of a single average. Sparsity at the SKU level was handled separately for stockout and excess, recognizing that key sizes run out while the tail piles up.

## Fora do escopo

Sem mudança em componentes, gráficos, KPIs ou layout. Sem bump de versão até validação visual.