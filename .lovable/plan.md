
## Objetivo
Aplicar em **Mix, Sortimento e Pedido Ideal** (`mix-assortment-order`) o mesmo padrão que já foi consolidado em Personalização, Campanhas, Forecast e Metas Comerciais.

## 1. Navegação (Kiosk.tsx)
- Adicionar `'mix-assortment-order'` ao array `migratedIds` em `src/pages/Kiosk.tsx`.
- Isso oculta o card RESOLVE/ENTREGA/IMPACTO do topo, unifica no launcher, esconde i6 Signal + EbookCTA até a simulação ser concluída e habilita o auto-scroll para o Signal ao fechar o modal.

## 2. Launcher (SolutionDemoBlock.tsx)
- Substituir o retorno atual de `mix-assortment-order` (que renderiza `<MixAssortmentOrderDemo />` direto) por um `SimulationLauncher` idêntico ao de Metas Comerciais/Forecast:
  - `solutionTitle`, `solutionTagline`, `resolve/entrega/impacto`, `labels`, `onSimulationClosed`.
  - Ícone: `LayoutGrid` (lucide) — mais coerente com sortimento/mix.

## 3. Layout do modal (MixAssortmentOrderDemo.tsx)
Refatorar de layout lado-a-lado (grid 1.35fr / 1fr) para o padrão **empilhado** já usado nas outras jornadas migradas:

```text
┌──────────────────────────────────────────────┐
│ Dashboard (filtros + comparação + carrinho + │
│ KPIs) — largura total                        │
├──────────────────────────────────────────────┤
│ POR QUE (card destaque coral, largura total) │
├──────────────────────────────────────────────┤
│ Timeline horizontal (pipeline em linha)      │
└──────────────────────────────────────────────┘
```

Detalhes:
- Remover o `grid grid-cols-[1.35fr_1fr]` externo; blocos passam a ocupar `w-full`.
- Extrair o card "Insight/POR QUE" (hoje na coluna direita, abaixo do pipeline) e movê-lo para **acima** da timeline, com o mesmo estilo destacado (`bg-[#F4845F]/15`, badge Sparkles) já usado em Forecast/Metas.
- Converter o pipeline vertical em **timeline horizontal**: `flex flex-row` com steps em colunas iguais e conector entre bolinhas numeradas, idêntico ao de `CommercialTargetsDemo` / `DemandForecastDemo`.
- Ajustar fontes/paddings (vmin) para caber tudo em 27" retrato sem scroll horizontal e minimizando scroll vertical.

## 4. Limpeza global de rotulagem de Explicabilidade
Aplicar em todos os arquivos de dados de demo (para cumprir a regra já registrada nas outras jornadas):
- `src/data/kiosk/demos/mixAssortmentOrder.ts`
- `src/data/kiosk/demos/demandForecast.ts`
- `src/data/kiosk/demos/predictivePersonalization.ts`
- `src/data/kiosk/demos/propensityCampaign.ts`
- `src/data/kiosk/demos/priceToMargin.ts`

Ações:
- `reasoningTitle` → `Explicabilidade e raciocínio do modelo` (sem sufixo `• i6XXX`).
- `reasoningSubtitle` → string vazia.

E nos componentes `PredictivePersonalizationDemo`, `PropensityCampaignDemo`, `DemandForecastDemo`, `PriceToMarginDemo`, `MixAssortmentOrderDemo`: manter o `subtitle` já condicional (`{L.reasoningSubtitle && <p>...</p>}`) para não renderizar linha vazia.

## 5. Verificação
- Rodar typecheck.
- Conferir visualmente no /kiosk que:
  - card RESOLVE/ENTREGA/IMPACTO só aparece no launcher unificado;
  - Signal + Ebook aparecem apenas após fechar simulação;
  - modal usa layout empilhado com POR QUE acima da timeline horizontal;
  - sem scroll horizontal e o subtítulo "Pipeline preditivo…" some em todas as demos.
