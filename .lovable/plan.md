## 1. Manter KPIs de acurácia visíveis ao selecionar um mês

**Onde:** `src/components/kiosk/demos/DemandForecastDemo.tsx`, bloco `phase === 'result'` (linhas ~207–239).

Hoje o layout é um toggle: se há mês selecionado, o `BreakdownCard` substitui a grade `KpiCompare`. Trocar por empilhamento:

1. Renderizar **sempre** a grade de 4 `KpiCompare` (acurácia, erro médio, ruptura, excesso).
2. Renderizar o `BreakdownCard` **abaixo** dela apenas quando `clickedPoint` existir.
3. Gráfico de composição continua depois do bloco.

`onClose` do card mantém o comportamento de limpar `selectedMonth`.

## 2. Usar o mês atual real do sistema

**Onde:** `src/data/kiosk/demos/demandForecast.ts`, função `buildSeries`.

Hoje `nowYear` e `nowMonth` são constantes fixas (2025, 10). Substituir por leitura dinâmica do relógio do sistema:

```
const now = new Date();
const nowYear = now.getFullYear();
const nowMonth = now.getMonth(); // 0-11
```

Isso garante que, rodando em qualquer data:

- **Gráfico do forecast**: histórico vai até o **mês atual − 1**; a linha do forecast (i6 e cliente) começa no **mês atual** e vai até **mês atual + horizonte − 1**.
- **Gráfico da composição da demanda**: mostra apenas **mês atual + horizonte** (já herda o corte porque `trend`/`season`/`sparsityFix` só são preenchidos para os pontos de forecast, e o filtro `p.trend !== null` do `CompositionChart` continua válido).

Nenhum outro parâmetro (HISTORY_MONTHS=24, FORECAST_MAX=12, seasonProfile por SKU, KPIs) muda. Meses do calendário (`realMonth`, `realYear`) e rótulos (`labelPt`/`labelEn`) passam a refletir o mês corrente automaticamente.

## Escopo

Apenas o arquivo do componente e o data source do forecast. Sem mexer em i18n, KPIs ou outras demos do kiosk.
