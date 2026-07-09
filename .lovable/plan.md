
# Plano: nova página /pt/solutions-v2 (preview paralelo)

Preview isolada da nova página de Soluções, sem tocar em `/solutions`, header, footer ou sitemap. Só PT nesta fase. Substituição da página atual acontece depois do seu OK.

## Rota e acesso

- Nova rota `pt/solutions-v2` registrada em `src/App.tsx` dentro do bloco `LocalizedRoutes`.
- **Fora** do header, footer, sitemap e `llms.txt`.
- `SEOHead` com `noindex, nofollow` (rascunho).
- Acesso: `https://.../pt/solutions-v2`.

## Estrutura da página

```text
┌─────────────────────────────────────────────────────┐
│ 1. HERO                                             │
│    "IA aplicada para prever demanda, recomendar     │
│     decisões e capturar crescimento com precisão."  │
│    Subtexto + CTA "Ver cases de sucesso"            │
├─────────────────────────────────────────────────────┤
│ 2. TRÊS TERRITÓRIOS (cards grandes)                 │
│    [Growth & Customer Intelligence]                 │
│    [Demand, Supply & Commercial Planning]           │
│    [Pricing & Margin Intelligence]                  │
│    Cada card: título, 1 frase, chips das soluções,  │
│    anchor scroll para a seção detalhada.            │
├─────────────────────────────────────────────────────┤
│ 3. SOLUÇÕES ENXUTAS — por território                │
│    3.1 Growth & Customer Intelligence (3 cards)     │
│        • Predictive Personalization                 │
│        • Smart Discovery                            │
│        • Predictive Campaign Targeting              │
│    3.2 Demand, Supply & Commercial Planning (4)     │
│        • Demand Forecasting                         │
│        • Metas Comerciais Preditivas                │
│        • Recomendação de Mix e Pedido Ideal         │
│        • Assortment Optimization                    │
│    3.3 Pricing & Margin Intelligence (3)            │
│        • Price-to-Margin                            │
│        • Price-to-Turnover                          │
│        • Price-to-Conversion                        │
│    Card enxuto: título orientado a resultado,       │
│    1 frase, Resolve/Entrega/Impacto, sem CTA.       │
├─────────────────────────────────────────────────────┤
│ 4. CAMADA TRANSVERSAL — infinity6 Signal            │
│    Copy + reuso do <I6SignalDemo /> existente.      │
├─────────────────────────────────────────────────────┤
│ 5. COMO IMPLEMENTAMOS (5 passos)                    │
│    Ingestão → Fine-tuning → Backtest → Ativação →   │
│    Aprendizado contínuo. Timeline vertical/steps.   │
├─────────────────────────────────────────────────────┤
│ 6. RESUMO CONCLUSIVO                                │
│    "A infinity6 ajuda empresas a..." (7 bullets)    │
├─────────────────────────────────────────────────────┤
│ 7. STRIP DE RESULTADOS                              │
│    Reuso do <RealResultsStrip /> (mesmo da home).   │
├─────────────────────────────────────────────────────┤
│ 8. CTA FINAL                                        │
│    Reuso do <SolutionsCTA /> atual (fundo laranja). │
└─────────────────────────────────────────────────────┘
```

## Fonte de conteúdo

- Novo MD: `public/content/page-solutions-v2-pt.md` com todo o copy enviado.
- Blocos: `## Hero`, `## Territorios` (3), `## Solucoes` (10 cards com `territory` + `resolve` + `entrega` + `impacto`), `## Signal`, `## ComoImplementamos`, `## Resumo`.
- Parser dedicado: `src/hooks/useSolutionsV2Content.ts` (não altera `useSolutionsMarkdown`).
- Toda ocorrência de "i6" no copy escrita como **infinity6** (i6Signal → infinity6 Signal). Nomes de motores próprios (`i6 RecSys`, `i6 Previsio`, `i6 ElasticPrice`) não aparecem no copy enviado — não serão adicionados.

## Componentes novos (isolados em `src/components/solutions-v2/`)

- `SolutionsV2Hero.tsx` — headline + subtexto + CTA cases.
- `TerritoriesBlock.tsx` — 3 cards grandes com chips e anchor.
- `TerritorySection.tsx` — wrapper por território com título e grid de cards enxutos.
- `LeanSolutionCard.tsx` — título / frase / Resolve / Entrega / Impacto.
- `SignalLayerBlock.tsx` — copy + `<I6SignalDemo />` reusado.
- `HowWeImplement.tsx` — timeline dos 5 passos.
- `SummaryBullets.tsx` — resumo conclusivo.
- Página: `src/pages/SolutionsV2.tsx` orquestrando os blocos + `RealResultsStrip` + `SolutionsCTA` no fim.

## Design

- Tokens atuais (`#0B1224`, `#F4845F`), tipografia e ondas globais. Sem novos fonts, sem novas libs.
- Densidade menor que a `/solutions` atual: mais respiro, hierarquia clara (hero → territórios → soluções → provas).
- Cards enxutos com altura consistente por linha; chips discretos para "Resolve/Entrega/Impacto".

## Fora do escopo desta preview

- EN (entra depois da aprovação da estrutura em PT).
- Substituição de `/solutions`, alterações em header/footer/sitemap.
- Alterações em `useSolutionsMarkdown`, `StaticSolutionsGrid`, `ModernSolutionCard`, MDs existentes.
- Nenhuma dependência nova.

## Entregável

Link navegável `/pt/solutions-v2` com todo o copy enviado já aplicado, pronto para você comparar lado a lado com `/pt/solutions`. Ajustes finos de copy/layout depois viram edições diretas no MD/componentes de `solutions-v2/`.
