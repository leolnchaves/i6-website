## Objetivo

Alinhar a jornada de **Forecast Preditivo** ao padrão visual/de posicionamento já aplicado em **Personalização + Descoberta Preditiva** e **Campanhas por Propensão**:

- Em cima: o quadro atual da **esquerda** (dashboard/resultado — filtros, gráfico, KPIs, composição, breakdown).
- Embaixo: **reasoning** com o card **POR QUE** no topo e a **timeline horizontal** dos passos do modelo logo abaixo.

## Arquivo afetado

- `src/components/kiosk/demos/DemandForecastDemo.tsx`

## Mudanças em `DemandForecastDemo.tsx`

1. **Trocar o grid principal por empilhamento vertical**
   - Substituir `grid grid-cols-[1.25fr_1fr] gap-[3vmin] items-stretch` por `flex flex-col gap-[2.4vmin]`.
   - Remover `h-full` dos dois cards internos (não é mais necessário igualar altura).

2. **Card superior (dashboard) — sem mudança de conteúdo**
   - Mantém header, filtros, gráfico principal, KPIs (planning e result), CTA, running state, KpiCompare, BreakdownCard e CompositionChart.

3. **Card inferior (reasoning) — refatorar para o padrão Campanhas**
   - Trocar a lista vertical de passos por uma **timeline horizontal** com bolinhas numeradas + barra de progresso, idêntica em estrutura à de `PropensityCampaignDemo.tsx` (linhas ~294-352):
     - Trilha de fundo `bg-white/10` + trilha preenchida `bg-[#F4845F]` cuja largura acompanha `progress / (pipeline.length - 1)`.
     - Grid `repeat(pipeline.length, minmax(0,1fr))` com estados `idle | active | done` (bolinha + label + micro).
   - **Mover o card POR QUE (Insight/rationale)** para **acima** da timeline, dentro deste mesmo card inferior.
     - Layout do POR QUE igual ao de Campanhas: borda coral, ícone `Sparkles`, eyebrow `L.rationaleLabel`, latência à direita, texto `sku.argumentPt/En` em `text-[2vmin]`.
     - Usar `L.latency` já existente; formatar `latencyMs` em segundos (padrão já adotado no projeto — dividir por 1000, `.toFixed(2) + ' s'`) para manter coerência com as demos migradas.
   - Manter o botão **Restaurar Forecast Original** (`L.reset`) — reposicionar como pill no rodapé do card inferior (mesmo estilo atual: `rounded-full`, borda branca suave).

4. **Remover o conector SVG diagonal**
   - Todo o bloco `line` / `<svg>` / `useLayoutEffect` que desenha a linha animada entre `mainChartRef` e `insightRef` deixa de fazer sentido no layout empilhado.
   - Remover: `mainChartRef`, `insightRef`, `containerRef` (se não usado em outro lugar), o `useLayoutEffect` de medição, o state `line`, o `<svg>` com `path`/`circles` e o `<defs>` do gradiente `kiosk-forecast-connector`.
   - Manter os keyframes `kiosk-progress` e `kiosk-insight-*` que continuam sendo usados (progress bar do running e brilho do card POR QUE).
   - Remover keyframes/classes `kiosk-connector-*` que ficam órfãos.

5. **Ajustes finos de responsividade**
   - Como a timeline horizontal precisa de largura, o card inferior herda a largura total do modal — nenhum override extra necessário.
   - Confirmar que `pipeline` do forecast (6 passos) cabe na largura em retrato 27" — mesmo número/ordem de grandeza que Campanhas.

## Fora de escopo

- Nenhuma alteração nos dados de `src/data/kiosk/demos/demandForecast.ts` (labels, KPIs, pipeline, séries).
- Sem mudanças em outras demos (Metas, Mix, Preço) — serão migradas nos próximos passos, uma por vez, reutilizando este mesmo padrão.
- Sem mudanças em `SolutionDemoBlock.tsx`, `Kiosk.tsx` ou no i18n (`config.ts`).

## Resultado esperado

```text
┌───────────────────────────────────────────────┐
│  DASHBOARD (filtros · gráfico · KPIs · comp.) │  ← quadro atual da esquerda
├───────────────────────────────────────────────┤
│  [ POR QUE ... latência ]                     │  ← card coral com Insight
│                                               │
│  ●───●───●───●───●───●                        │  ← timeline horizontal
│  passo passo passo passo ...                  │
│                    [Restaurar Forecast]       │
└───────────────────────────────────────────────┘
```
