## Objetivo

Reduzir em ~30% o comprimento dos textos "POR QUE PROJETAMOS ESTA DEMANDA" na demo de Forecast, mantendo todos os dados-chave (CAGR, sazonalidade, canal, ruptura, aceleração, ganhos de acurácia).

## Onde

Arquivo único: `src/data/kiosk/demos/demandForecast.ts` — campos `argumentPt` / `argumentEn` dos 3 SKUs:
- `electronics` (linhas 105–108)
- `beverage` (linhas 140–143)
- `fashion` (linhas 175–178)

Nada mais é alterado (KPIs, gráficos, layout, labels permanecem).

## Reescritas propostas

**Electronics — PT** (~99 → ~70 palavras)
> Crescimento acelerado (+18% a.a.), com sazonalidade forte de Black Friday e Natal (±55%) e alta concentração no digital (71%). Ruptura em dois novembros seguidos leva o forecast atual a errar 62pp e subestimar o pico. Nos últimos 90 dias, aceleração de +28%, quase toda no digital. A i6 separa Black Friday do baseline, aplica o calendário 2025 (BF em 28/11) e leva ruptura de 22,3% para 2,8% e acurácia de 36,4% para 87,2%.

**Electronics — EN**
> Fast-growing category (+18% YoY) with pronounced Black Friday and Christmas seasonality (±55%) and heavy digital concentration (71%). Two consecutive November stockouts make the current forecast miss by 62pp and under-project the peak. Last 90 days: +28% acceleration, mostly digital. i6 splits Black Friday from the baseline, applies the 2025 calendar (BF on Nov 28) and cuts stockout from 22.3% to 2.8% while lifting accuracy from 36.4% to 87.2%.

**Beverage — PT**
> Crescimento estrutural de +8% a.a. com Q4 forte (pico de dezembro, +42% acima do baseline). Recuperamos maio/2024 e maio/2025 — meses com ruptura em que a demanda real foi ~2× o vendido — e isolamos a promo de nov/dez para não inflar meses regulares. Últimos 90 dias com +14% no digital. O forecast atual erra 57pp por não separar promo de tendência; a i6 estreita o intervalo de ±22% para ±7% e reduz ruptura de 14,6% para 3,1%.

**Beverage — EN**
> Structural +8% YoY growth with strong Q4 (December peak, +42% above baseline). We recovered May 2024 and May 2025 — stockout months where real demand was ~2× what was sold — and isolated the Nov/Dec promo to avoid inflating regular months. Last 90 days: +14% in digital. The current forecast misses by 57pp for not splitting promo from trend; i6 narrows the interval from ±22% to ±7% and cuts stockout from 14.6% to 3.1%.

**Fashion — PT**
> Ciclo curto de coleção com sazonalidade dupla (inverno-SP em jun/jul e liquidação em jan/fev) e viés flat no forecast atual, que ignora pico e queda pós-coleção — gerando ruptura (17,2%) e excesso (15,8%) simultâneos em SKUs distintos. Últimos 90 dias com +18% no digital. A i6 modela cada onda separadamente, reduz ruptura para 3,4%, excesso para 3,7% e eleva a acurácia de 39,7% para 90,7%.

**Fashion — EN**
> Short collection cycle with double seasonality (winter-SP in Jun/Jul and clearance in Jan/Feb) and a flat bias in the current forecast, which ignores both peak and post-collection drop — causing simultaneous stockout (17.2%) and excess (15.8%) across different SKUs. Last 90 days: +18% in digital. i6 models each wave separately, cuts stockout to 3.4%, excess to 3.7% and lifts accuracy from 39.7% to 90.7%.

## Fora do escopo

- Sem mudança em componentes React, gráficos ou labels.
- Sem bump de versão até validação visual.
