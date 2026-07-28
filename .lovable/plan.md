## Objetivo

Alinhar o layout do modal de **Preço Orientado a Conversão** (`PriceToMarginDemo`) ao padrão das demais telas (Forecast, Giro, Personalização, Campanhas etc.): empilhado verticalmente, com quadro de conteúdo em cima, card **POR QUE** + **timeline horizontal** de reasoning embaixo. Mantém 100% do conteúdo atual (grid de produtos, zoom, precificação dinâmica revelada, KPIs Δ conversão / Δ receita / latência).

## Escopo

Somente `src/components/kiosk/demos/PriceToMarginDemo.tsx`. Nenhuma alteração em dados (`priceToMargin.ts`), no wrapper `SimulationLauncher`, no `SolutionDemoBlock` ou no roteamento. Bilíngue (PT/EN) preservado via `content` já existente.

## Nova estrutura visual

```text
┌───────────────────────────────────────────────┐
│ TOP CARD — Cenário / Produto                  │
│  • Fake browser bar (vivashop.b2b/…)          │
│  • Grid 2xN de produtos  OU  zoom do produto  │
│    selecionado + spinner "Analisando…"        │
│  • Após pipeline: preço ideal revelado + ✓    │
│  • 4 KPIs (Preço, ΔConv, ΔReceita, Latência)  │
└───────────────────────────────────────────────┘
┌───────────────────────────────────────────────┐
│ BOTTOM CARD — Explicabilidade e raciocínio    │
│  • Card "POR QUE" (Sparkles + glow coral)     │
│    → usa selected.insight quando done         │
│    → fallback curto quando ainda não escolheu │
│  • Micro-métrica da etapa ativa (running)     │
│  • Timeline HORIZONTAL: bolinhas numeradas    │
│    + label + microMetric por passo, com barra │
│    de progresso coral por baixo               │
│  • Botão "Nova simulação" só quando done      │
└───────────────────────────────────────────────┘
```

## Mudanças no componente

1. Trocar o `grid grid-cols-2` externo por `flex flex-col gap-[2.4vmin]`.
2. **Top card** = bloco esquerdo atual (browser bar + grid/zoom + preço revelado + KPIs). Nenhuma alteração de conteúdo — só continua ocupando a largura total.
3. **Bottom card** substitui a coluna direita (lista vertical de passos + insight card lateral). Reescrito para:
   - Header "Explicabilidade e raciocínio do modelo".
   - Insight `.kiosk-insight-card` com `Sparkles` + eyebrow `content.rationaleLabel` (ou "POR QUE" quando `lang==='pt'`), mostrando `selected.insight` quando `done`; antes disso, um resumo genérico curto ("O modelo cruza intenção de sessão, elasticidade e margem por SKU…" — 1 linha em cada idioma).
   - Micro-métrica da etapa em execução (`content.pipeline[progress].microMetric`).
   - Timeline horizontal: reaproveita exatamente o padrão do `PriceTurnoverDemo` (linha base cinza, trilha coral proporcional a `progress/(N-1)`, dots numerados que viram check verde/coral quando `done`, label + microMetric abaixo de cada dot).
   - Botão "Nova simulação" (PT) / "New simulation" (EN) chamando `reset()`.
4. Remover a linha SVG conectora (`line` / `useLayoutEffect` de medição / `priceRef`/`insightRef`/`containerRef`) — não faz sentido no layout empilhado; simplifica o componente.
5. Remover os `@keyframes kiosk-connector-*` do `<style>` embutido, manter apenas os de `kiosk-insight-in/glow/sparkle` e `kiosk-progress` (este último ainda usado se houver barrinha na etapa ativa; caso contrário também removido).
6. Todas as strings novas ("Nova simulação", header "Explicabilidade…", fallback do POR QUE) entram via um pequeno mapa `pt/en` local no componente — sem mexer no arquivo de dados.

## Detalhes técnicos

- `pipeline[i]` já expõe `label`, `microMetric`, `durationMs` — reutilizados como `label` e `micro` na timeline (mesmo shape usado pelo PriceTurnover).
- Estados derivados atuais (`progress`, `selected`, `done`, `latencyMs`) permanecem intactos; só o JSX consumidor muda.
- Sem alterações em `SolutionDemoBlock.tsx` — ele continua passando `lang` para o componente.
- Sem toques em i18n global, rotas, tracking ou Signal/CTA gating.

## Verificação após implementar

- Abrir `/kiosk` em PT e EN, entrar em **Preço Orientado a Conversão**, clicar em "Simular".
- Confirmar: (1) top card com grid → zoom → preço revelado + 4 KPIs, (2) bottom card com POR QUE em cima, timeline horizontal completa embaixo, (3) mesma sensação visual das outras 7 simulações, (4) botão "Nova simulação" reinicia o fluxo, (5) fechar modal ainda revela o Signal na página.
