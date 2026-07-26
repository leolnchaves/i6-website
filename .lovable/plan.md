# Demo Kiosk — Personalização Preditiva + Descoberta Preditiva

Novo bloco interativo para a solução combo `predictive-personalization` + `smart-discovery`, seguindo o padrão visual do demo de Preço Orientado à Conversão: **e-commerce simulado à esquerda + quadro "raciocínio do modelo" à direita**, lado a lado, com linha coral animada conectando o produto ao insight.

## Fluxo de interação

```text
[Seleção de cenário]  ──►  [Listagem / Look]  ──►  [Treinamento i6RecSys]  ──►  [PDP + Recomendações]
    2 x 2 matriz                clique produto          direita, animado          esquerda + argumento
        │                                                                              │
        └──────────────────────────── clicar em recomendado ◄──────────────────────────┘
                                     (novo ciclo de treino)
```

**Etapa 1 — Seleção de cenário (tela inicial do demo)**
Matriz 2x2 de cards grandes (touch-friendly, min 12vmin):
- Usuário Logado × Varejo Produtos
- Usuário Logado × Varejo Fashion
- Usuário Anônimo × Varejo Produtos
- Usuário Anônimo × Varejo Fashion

Um botão "Explorar outro cenário" volta a essa tela a qualquer momento.

**Etapa 2 — Listagem (esquerda)**
- Varejo Produtos: grid de 6 produtos (eletrônicos/casa) com imagem placeholder, título, preço.
- Varejo Fashion: grid de 6 peças (roupas/acessórios), mesmo layout.
Header do card mostra o **objetivo** ativo: `Cross-sell` (logado) / `Descoberta` (anônimo).

**Etapa 3 — Treinamento (direita, ao clicar em produto)**
Painel "Raciocínio do modelo · i6RecSys" com steps animados (2–3s total, latência realista tipo ~28ms por feature). Features exibidas variam por cenário:

- **Logado**: Histórico de sessões · Afinidade categórica · Co-visualização · Aderência contextual · Cross-sell ranking
- **Anônimo**: **Cold start** (geo/hora/canal) · **Similaridade comportamental** (embeddings de sessão) · **Aderência contextual** (catálogo/estoque) · Descoberta ranking

Cada feature aparece com barra de progresso + valor numérico "quebrado" (ex.: 0.834, 27ms). Referência das features: [i6RecSys em /our-ai](https://infinity6.ai/pt/our-ai).

**Etapa 4 — PDP + Recomendações (esquerda substitui a listagem)**
- Produto selecionado no topo (imagem grande, título, preço).
- Abaixo:
  - **Varejo Produtos**: carrossel horizontal de 4–5 produtos recomendados ("Frequentemente comprados juntos" / "Você também pode gostar").
  - **Varejo Fashion**: **Look recomendado** — grade compondo 1 outfit (top + bottom + calçado + acessório) com etiqueta "Look completo por R$ XXX".
- **Argumento do modelo** (card coral abaixo/ao lado da recomendação): 1–2 frases objetivas explicando *por que* essas recomendações — muda por cenário. Ex.: "Usuários com afinidade em áudio premium + sessão recente em fones convertem 3.2× em cabos e cases nas próximas 48h."
- Linha coral animada (mesmo padrão do Price-to-Conversion) ligando o produto selecionado ao card de argumento.

**Etapa 5 — Recursão**
Clicar em qualquer recomendado dispara novo treinamento à direita (features do mesmo cenário) e nova PDP. Botão "Voltar à vitrine" retorna à Etapa 2.

## Nuances por cenário (resumo)

| Cenário               | Objetivo topo | Features destacadas                                | Saída            |
| --------------------- | ------------- | -------------------------------------------------- | ---------------- |
| Logado × Produtos     | Cross-sell    | Histórico + Co-visualização + Aderência            | Carrossel        |
| Logado × Fashion      | Cross-sell    | Histórico + Estilo + Aderência                     | Look recomendado |
| Anônimo × Produtos    | Descoberta    | Cold start + Similaridade comport. + Aderência     | Carrossel        |
| Anônimo × Fashion     | Descoberta    | Cold start + Similaridade comport. + Estilo        | Look recomendado |

## Detalhes técnicos

**Novos arquivos**
- `src/components/kiosk/demos/PredictivePersonalizationDemo.tsx` — componente principal, estados: `scenario | product | phase (list|training|pdp)`.
- `src/components/kiosk/demos/personalization/ScenarioPicker.tsx` — matriz 2×2.
- `src/components/kiosk/demos/personalization/ProductGrid.tsx` — listagem catálogo.
- `src/components/kiosk/demos/personalization/TrainingPanel.tsx` — painel direito animado (reaproveita padrão visual do TrainingPanel atual do Price-to-Conversion; extrair para shared se conveniente).
- `src/components/kiosk/demos/personalization/RecommendationView.tsx` — PDP + carrossel/look + argumento (com SVG connector coral).
- `src/data/kiosk/demos/predictivePersonalization.ts` — catálogo mock (2 verticais × ~10 SKUs), features por cenário, argumentos i18n PT/EN.

**Integração**
- `src/components/kiosk/SolutionDemoBlock.tsx`: adicionar branch `if (solution.id === 'predictive-personalization' || solution.id === 'smart-discovery') return <PredictivePersonalizationDemo ... />`. Como o combo já auto-seleciona a primeira via `SolutionsGrid` com `highlightAll`, o mesmo demo cobre ambos os cards.
- Layout `grid grid-cols-2 items-stretch gap-[3vmin]` (mesmo do Price-to-Conversion), garantindo boxes lado a lado com alturas iguais.
- Reaproveitar `useLayoutEffect` + `ResizeObserver` do PriceToMarginDemo para desenhar o traço coral reto entre produto ↔ argumento.
- Imagens: usar placeholders SVG inline ou emojis estilizados (produtos genéricos) para evitar dependência de assets externos. Sem quebrar chroma-key da hero.

**Sem alterações em**
- Fluxo do quiz, tracker, EbookCTA, KioskSignalIntelliboard — permanecem intactos.
- Demo de Preço Orientado à Conversão.

**i18n**
- Todos os textos (títulos, argumentos, labels de features, nomes de produto) em PT/EN via estrutura já usada em `predictivePersonalization.ts`.

## Como validar

1. `/kiosk` → Q1: Crescimento → Q2: Personalização & Descoberta.
2. Confirmar que ambos os cards vêm marcados (combo) e o novo demo aparece abaixo.
3. Testar as 4 combinações de cenário; verificar que features à direita mudam entre logado/anônimo e output entre produtos/fashion.
4. Clicar em recomendado dispara novo ciclo de treino.
5. Trocar idioma PT↔EN e revalidar todos os textos.
