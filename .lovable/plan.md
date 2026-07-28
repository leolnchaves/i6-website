# Preço Orientado à Conversão — Migração para padrão unificado

Objetivo: alinhar a jornada de `price-to-conversion` ao mesmo padrão já aplicado em **Preço Orientado a Giro** (referência mais recente) e **Preço Orientado a Margem**.

## 1. Navegação (igual às demais)

- Embrulhar `PriceToMarginDemo` (que hoje serve `price-to-conversion`) dentro do `SimulationLauncher` em `src/components/kiosk/SolutionDemoBlock.tsx`.
  - Ícone: `Target` (ou `Sparkles`) do `lucide-react`, para diferenciar de Giro/Margem.
  - Passar `solutionTitle`, `solutionTagline`, `resolve`, `entrega`, `impacto`, `labels`, `onSimulationClosed`.
- Gating: enquanto o modal de simulação não for aberto/fechado, o `SolutionDemoBlock` já esconde Signal e CTA (comportamento herdado do launcher). Nada extra a fazer aqui além do wrapper.
- Ao fechar a simulação: scroll automático para a seção do i6 Signal (comportamento já implementado no launcher via `onSimulationClosed`).
- Remover o botão "X" no topo do modal (usar apenas "Fechar Simulação" no rodapé) — já é o padrão do `SimulationLauncher`; conferir se algum override na demo readiciona.

## 2. Layout da demo dentro do modal (retrato 27")

Refatorar `src/components/kiosk/demos/PriceToMarginDemo.tsx` para o mesmo esqueleto empilhado das demais:

```text
┌───────────────────────────────────────────────┐
│  Filtros (linha única, 3 combos)              │
│  [ Produto ▾ ] [ Objetivo ▾ ] [ Restrição ▾ ] │
│                    [ Calcular faixa ótima ]   │
├───────────────────────────────────────────────┤
│  Dashboard de resultados                      │
│  ┌───────────────┐  ┌────────────────────┐    │
│  │ Faixa ótima   │  │ Gráfico preço×conv │    │
│  │ (min / ideal / │ │ (curva + banda)    │    │
│  │  max)         │  │ Confiança no rodapé│    │
│  └───────────────┘  └────────────────────┘    │
│  Tabela de SKUs (Situação / Preço atual /     │
│  Preço ideal / Δ Conversão / Δ Receita /      │
│  Ação sugerida) — só surge após cálculo       │
├───────────────────────────────────────────────┤
│  Card "POR QUE" (prosa objetiva)              │
├───────────────────────────────────────────────┤
│  Timeline horizontal (pipeline do modelo)     │
└───────────────────────────────────────────────┘
```

Detalhes de comportamento (espelham Giro/Margem):

- Antes de clicar em "Calcular": todos os valores das tabelas mostram `—`; o gráfico fica vazio; card POR QUE oculto.
- Botão "Calcular" habilita apenas quando os filtros obrigatórios estiverem preenchidos.
- Pós-cálculo: seleciona automaticamente o primeiro SKU para exibir os detalhes; a partir daí o clique em outro SKU fica liberado.
- Coluna "Ação sugerida" com cor da fonte apenas (sem badges/boxes coloridos), seguindo o padrão do Signal.
- Card "POR QUE": um parágrafo curto e específico por combinação Produto × Objetivo, descrevendo o raciocínio (elasticidade estimada, faixa de aceitação, restrição ativa etc.).
- KPIs no topo: rótulos padronizados em caixa alta ("FAIXA ÓTIMA", "PREÇO IDEAL", "Δ CONVERSÃO PROJETADA", "Δ RECEITA PROJETADA"). Sem sufixos de nome de modelo.
- Latência em segundos com 2 casas (ex.: `0.03 s`), no rodapé compacto do card do gráfico, junto com "Confiança" (padrão Preço Margem).
- Gráfico com `preserveAspectRatio="xMidYMid meet"` para não deformar.

## 3. Dados — `src/data/kiosk/demos/priceToMargin.ts`

- Introduzir `skuTemplatesByProduct` (mesmo padrão de `priceTurnover.ts`) para que a tabela de SKUs reaja à mudança do filtro "Produto" após o cálculo — hoje a tabela não muda quando o usuário troca o produto.
- Cenários fixos por Produto × Objetivo com mix variado de ações: `raise` (aumentar preço, verde-esmeralda), `hold` (manter, neutro), `discount` (reduzir para converter, coral), evitando ordem repetitiva.
- Overrides de argumento por combinação, alimentando o card "POR QUE" (curto, direto, sem jargão de modelo).
- Manter o pipeline atual mas garantir durações somando ~1.5–2.0 s.

## 4. Signal (perguntas relacionadas)

Nenhuma alteração de conteúdo do Signal solicitada agora — manter as perguntas já mapeadas em `priceConversionFriction` e `priceConversionIncentiveNeed`. Se o usuário quiser ajustar textos, faremos numa rodada seguinte.

## 5. Registros a preservar (memórias já capturadas em Giro/Margem)

Reaplicar o mesmo checklist visual/comportamental ao migrar:
- Navegação gated (Signal/CTA escondidos até o modal fechar).
- Modal sem "X" no topo; apenas "Fechar Simulação" no rodapé com scroll ao Signal.
- Card unificado no launcher (Resolve/Entrega/Impacto), subtítulo "Explore o exemplo…" oculto.
- Latência em segundos, "Confiança" no rodapé do card do gráfico.
- Sem badges/boxes coloridos; ações diferenciadas por cor de fonte.
- Valores `—` antes do cálculo; tabelas só populam pós-simulação.
- Empresa "VIVARIS COMÉRCIO E VAREJO" e email `leonardo.chaves@vivaris.com` (já consistentes).

## 6. Entrega

- Após validação visual: publicar release **v2.2.13** (patch), disparando o deploy via GitHub Actions.

## Detalhes técnicos

- Arquivos a alterar:
  - `src/components/kiosk/SolutionDemoBlock.tsx` — embrulhar `PriceToMarginDemo` no `SimulationLauncher` para `price-to-conversion`.
  - `src/components/kiosk/demos/PriceToMarginDemo.tsx` — reescrita do layout para o padrão Giro (filtros + dashboard + tabela + POR QUE + timeline horizontal); estados de "antes do cálculo" com `—`; seleção automática do 1º SKU.
  - `src/data/kiosk/demos/priceToMargin.ts` — adicionar `skuTemplatesByProduct`, cenários por Produto × Objetivo, argumentos do POR QUE, rótulos PT/EN.
- Nada de backend/RLS; site permanece 100% estático.
- Sem mudanças em rotas, i18n global, header ou SEO.
