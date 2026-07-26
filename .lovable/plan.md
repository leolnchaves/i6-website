
# Demo: Forecast Preditivo de Demanda (/kiosk)

Novo demo interativo para `solution.id === 'demand-forecasting'`, seguindo o mesmo padrão visual dos demos existentes (Price-to-Conversion e Personalização/Descoberta): painel esquerdo com a simulação de negócio, painel direito com o "raciocínio do modelo", conectados por linha coral, latência simulada, badge "ZERO COST" preservada.

## Estrutura de dados (`src/data/kiosk/demos/demandForecast.ts`)

Um dataset determinístico com séries mensais (36 meses históricos + 12 meses de forecast) para vários cortes:

- **SKUs/categorias** — 4 opções: Bebida sazonal, Higiene recorrente, Eletro sazonal-forte, Fashion moda-rápida (comportamentos distintos de tendência/sazonalidade).
- **Canais** — Total, Físico, Digital.
- **Regiões** — Total, Sudeste, Sul, Nordeste.
- **Horizonte** — 6/12 meses.

Cada série carrega: `history[]`, `currentForecast[]` (a projeção "atual da empresa", propositalmente enviesada), `i6Forecast[]`, `confidenceLow[]`, `confidenceHigh[]`, e a **decomposição** (tendência, sazonalidade, promo, esparsidade, aceleração) por mês. KPIs iniciais: acurácia histórica, erro médio (MAPE), ruptura %, excesso %. KPIs pós-run: erro forecast atual (24,8%), erro backtest i6 (10,6%), acurácia projetada (89,4%), horizonte.

Pipeline (5 passos, ~380–520 ms cada, total sub-segundo — mesmo padrão dos outros demos):

1. Lendo histórico e variáveis comerciais (sell-in/out, preço, promoção, estoque, calendário, canal).
2. Tratando esparsidade, outliers e períodos sem venda.
3. Detectando tendência e sazonalidade.
4. Selecionando o melhor comportamento preditivo por série (por SKU/região/canal).
5. Projetando demanda e intervalo de confiança.

**Argumentos ricos ("Por que projetamos esta demanda")** — composição dinâmica por SKU + canal + horizonte, combinando:
- leitura estrutural (crescimento/declínio/plateau, com CAGR);
- padrão sazonal identificado (Q4, verão, back-to-school etc.);
- correção de meses com ruptura ("recuperados N meses sub-representados");
- efeito promocional isolado do baseline;
- aceleração/desaceleração recente (últimos 90 dias vs. baseline);
- viés detectado no forecast atual (excesso em X, ruptura em Y);
- intensidade por canal (ex.: digital +Zpp acima do físico);
- intervalo de confiança e por que se estreitou vs. baseline.

Cada componente tem 2–3 variações por SKU para o texto não ficar idêntico entre séries.

## Componente (`src/components/kiosk/demos/DemandForecastDemo.tsx`)

Layout 2 colunas `items-stretch` idêntico aos demos existentes (`grid-cols-2` no desktop, empilhado no mobile). Header com "OBJETIVO: PREVISIBILIDADE" no topo esquerdo (mesmo estilo do "Objetivo: Cross-sell" do demo de personalização).

**Fase 1 — Dashboard de planejamento (esquerda):**
- Filtros compactos em chips clicáveis: Produto/Categoria, Canal, Região, Loja/PDV, Horizonte. Só SKU, Canal, Região e Horizonte são funcionais (mudam as séries). Loja/PDV fica como chip visual "Todas" para não sobrecarregar o teste sem perder o storytelling.
- Gráfico principal (SVG puro, sem lib nova — mesmo estilo dos demos atuais): histórico + forecast atual + banda de confiança atual em coral suave.
- KPI strip (4 cards pequenos): acurácia histórica, erro médio, ruptura, excesso.
- Botão coral "Executar forecast preditivo" (mesma tipografia do "Aplicar preço" removido, mas único CTA aqui).

**Fase 2 — Pipeline rodando (direita):**
- Reaproveita o mesmo componente visual de "steps" dos outros demos (checks progressivos + latência ao final). Latência final ~28–62 ms.

**Fase 3 — Resultado (esquerda, substitui o dashboard):**
- Gráfico superior: histórico real + forecast atual + forecast i6 + intervalo de confiança i6 (banda). Legenda inline.
- 4 cards de KPI abaixo: Erro atual 24,8% / Erro backtest i6 10,6% / Acurácia projetada 89,4% / Horizonte 12m.
- Gráfico inferior: composição da demanda em áreas empilhadas (tendência, sazonalidade, promo, esparsidade corrigida, aceleração). Meses clicáveis — ao clicar em um mês, os cards de KPI dão lugar a um mini-breakdown daquele mês (valores absolutos + % por componente).
- Insight coral (direita) com o argumento composto, conectado ao gráfico principal pela linha SVG (mesmo padrão useLayoutEffect+ResizeObserver do PriceToMarginDemo).
- Botão "Explorar outra solução" (mesma label global já definida).

## Integração

- `src/components/kiosk/SolutionDemoBlock.tsx`: adicionar branch `if (solution.id === 'demand-forecasting') return <DemandForecastDemo lang={lang} />;`.
- Nenhum ajuste em `config.ts` — a solution `demand-forecasting` já existe.

## Detalhes técnicos

- **Gráficos**: SVG inline com escalas calculadas manualmente (mesmo approach dos demos atuais — sem Recharts para manter consistência visual e leveza no totem).
- **Interatividade do gráfico de composição**: hover/click em mês → estado `selectedMonth`; painel de KPI troca por breakdown.
- **Linha coral**: `useLayoutEffect` + `ResizeObserver` medindo bordas de `mainChartRef` e `insightRef`, linha reta `M x1 y1 L x2 y2` (mesmo padrão já validado).
- **i18n**: todo texto em `pt`/`en` no arquivo de dados; sem string literal no componente.
- **Latência**: `(28 + Math.random() * 34).toFixed(2)` ms, exibida no header do painel direito.
- **Determinismo**: séries são hardcoded no data file para o número no gráfico bater com o argumento em todas as execuções.

## Fora de escopo

- Não persistir eventos novos no `kiosk_events` (usa o mesmo tracking genérico de `demo_run` já instrumentado).
- Não trocar layout dos outros demos.
- Não adicionar Recharts/D3 — SVG manual.

Depois de aprovado, implementação em três arquivos: `demandForecast.ts`, `DemandForecastDemo.tsx` e a linha nova no `SolutionDemoBlock.tsx`.
