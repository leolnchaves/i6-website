# Ajustes no Forecast de Demanda — sazonalidade, split história/forecast e escopo do gráfico de composição

## 1. Sazonalidade realista (picos e vales angulares)

**Onde:** `src/data/kiosk/demos/demandForecast.ts` — vetor `seasonProfile[12]` de cada SKU.

Hoje os perfis são semi-suaves (a curva sobe/desce ao longo de vários meses). O anexo 2 mostra o comportamento real: sazonalidade oscila mês a mês com picos e vales angulares alternados, com um ou dois picos maiores em meses específicos.

Reescrever os 4 perfis para zig-zag angular preservando a identidade de cada SKU:

- **Bebida** (`beverage`) — picos altos em Dez/Jan (verão), vale forte em Jun/Jul (inverno), oscilação mês-a-mês em torno da tendência para os demais meses (ex.: Fev alto, Mar médio-baixo, Abr sobe pouco, Mai cai, etc.).
- **Higiene** (`hygiene`) — perfil quase plano com micro-oscilação (±0,10) e apenas um pico modesto em Nov (dia dos pais / fim de ano) e um vale leve em Fev.
- **Eletrônicos** (`electronics`) — pico dominante em Nov (Black Friday), pico secundário em Dez (Natal), vale profundo em Fev/Mar, zig-zag intermediário nos demais meses.
- **Moda** (`fashion`) — pico duplo agudo (Mai inverno + Nov verão), vales agudos em Ago/Set, oscilação angular nos meses de transição.

Adicional: no `CompositionChart` remover o `wiggle` orgânico aplicado à linha de tendência (deixa a tendência estritamente monotônica) para que apenas a sazonalidade oscile — isso reproduz o comportamento do anexo 2 (tendência lisa, sazonalidade angular). esses picos e vales, tendencias e sazonalidades sÃo ótimos componentes de argumentação que podemos adicionar no POR QUE.  

## 2. Corte da história no mês atual − 1

**Onde:** `src/data/kiosk/demos/demandForecast.ts`, função `buildSeries`.

Hoje: `isHistory = i < HISTORY_MONTHS` — inclui o mês atual (Nov/25) na história e o forecast começa no mês seguinte (Dez/25).

Novo comportamento:

- História cobre até `mês atual − 1` (Out/25 e anteriores).
- Forecast começa no `mês atual` (Nov/25) e vai até `mês atual + horizonte − 1`.

Alterações concretas:

- `isHistory = i < HISTORY_MONTHS - 1`
- Para o mês do "corte" (i = HISTORY_MONTHS − 1, offset 0 = Nov/25): tratar como primeiro mês do forecast → preencher `currentFcst`, `i6Fcst`, `trend`, `season`, `sparsityFix`, `hasPromo` (não preencher `history`).
- Índice do forecast: `fIdx = i - (HISTORY_MONTHS - 1)` (0-based, mês atual = 0).
- Loop pára em `fIdx >= horizon`.

Efeito no `MainChart`: a linha branca (história) termina em Out/25 e a linha coral (i6) e a tracejada (forecast atual) começam em Nov/25 — sem sobreposição no mês atual, criando um corte visual limpo.

## 3. Gráfico de composição = apenas mês atual + horizonte

**Onde:** `CompositionChart` em `src/components/kiosk/demos/DemandForecastDemo.tsx`.

Hoje já filtra `series.filter((p) => p.trend !== null)` — mostra só forecast. Com a mudança do item 2, os pontos passam automaticamente a ser `[mês atual, mês atual+1, …, mês atual + horizonte − 1]` (12 ou 6 barras conforme o horizonte selecionado). Manter esse filtro; nenhuma alteração adicional necessária além de garantir que o primeiro rótulo do eixo X seja Nov/25.

## 4. Ajustes correlatos

- `promoMonths`, `rupturedMonths`, `accuratePastMonths` continuam válidos — não mexer.
- `avgVolume`, `fixedMaxY`, KpiCompare seguem calculados a partir de `series`; com um ponto de história a menos e um de forecast a mais o comportamento se mantém.
- `MainChart` já usa `x = i/(n−1)`; nenhum ajuste de eixo é necessário — só mudam os rótulos exibidos.

## Escopo

Apenas frontend/dados de demo. Nenhuma mudança em outras telas do kiosk, i18n de labels, KPIs numéricos ou lógica de reset/filtros.