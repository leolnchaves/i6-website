## Reestrutura do demo Price-to-Margin

Objetivo: transformar a experiência em uma narrativa clara — o user escolhe um produto **sem preço**, vê o modelo pensar, e só então o preço "aparece" no produto com destaque.

### Layout final (split-screen mantido)

```text
┌───────────────────────────┬───────────────────────────┐
│ ESQUERDA (Cenário)        │ DIREITA (Raciocínio + Δ)  │
│                           │                           │
│ [browser bar VivaShop]    │  Como o modelo pensa      │
│                           │  ── passo 1 ✓             │
│  Estado A (grid inicial): │  ── passo 2 ✓             │
│   4 cards de produto      │  ── passo 3 …             │
│   SEM preço, SEM margem   │  ── passo 4               │
│   Call-out: "Toque para   │  ── passo 5               │
│   descobrir o preço ideal"│                           │
│                           │  ┌─ Painel conclusivo ──┐ │
│  Estado B (após clique):  │  │ (aparece só no fim)  │ │
│   Produto em ZOOM         │  │ Preço recomendado    │ │
│   ainda sem preço         │  │ Margem               │ │
│   enquanto pipeline roda  │  │ Δ Receita  Δ Margem  │ │
│                           │  │ [Aplicar preço]      │ │
│  Estado C (pipeline done):│  └──────────────────────┘ │
│   Preço aparece no card   │                           │
│   grande com destaque     │                           │
│   (pulse coral, badge     │                           │
│   "Preço ideal")          │                           │
└───────────────────────────┴───────────────────────────┘
```

### Mudanças por arquivo

**`src/components/kiosk/demos/PriceToMarginDemo.tsx`**
- Remover `currentPrice` e `currentMargin` da renderização dos cards de produto (grid inicial). Manter apenas imagem, categoria, nome.
- Adicionar call-out acima do grid: *"Toque em um produto para descobrir o preço ideal"* (PT) / *"Tap a product to reveal the ideal price"* (EN).
- Ao selecionar um produto: substituir o grid 2×2 por uma **view de produto em zoom** (imagem grande, nome, categoria) — ainda **sem preço** enquanto `progress < pipeline.length`.
- Quando `done === true`: revelar o **preço final** dentro da view de zoom, com badge coral "Preço ideal" e animação de pulse/glow. Sem interpolação animada — o preço "surge" no momento do done.
- Botão "voltar ao catálogo" pequeno no canto para permitir escolher outro SKU.
- Mover o **painel conclusivo** (Preço recomendado, Margem, Δ Receita, Δ Margem, botão "Aplicar preço") de baixo do grid esquerdo para **logo abaixo do pipeline no lado direito**, dentro do mesmo card do raciocínio. Aparece só quando `done`.
- Remover o `MetricPill` de "recomendado/margem" que aparecia durante a animação — nada de métricas até o fim.

**`src/data/kiosk/demos/priceToMargin.ts`**
- Adicionar strings: `zoomHint` (call-out inicial), `backToCatalog`, `idealPriceBadge` em `pt` e `en`.
- Nada muda no schema de `DemoProduct` — `currentPrice`/`currentMargin` continuam nos dados (para o Δ), só não são renderizados.

### Timeline da interação

1. **Idle**: grid 2×2, produtos sem preço, hint "Toque para descobrir o preço ideal".
2. **Clique**: transição para zoom-view do produto (sem preço). Pipeline começa (passo 1 ativa).
3. **Durante ~7,4s**: passos avançam à direita, produto permanece em zoom sem preço.
4. **Done**:
   - Preço "ideal" surge no card do produto com pulse coral + badge.
   - Painel conclusivo (métricas + Δ + CTA) desliza para baixo do pipeline no lado direito.
5. **Botão discreto** "← Escolher outro produto" reseta `selectedId` e `progress`.

### Fora de escopo
- Não mexer nos outros 8 demos textuais.
- Não alterar `SolutionsGrid`, `KioskShell`, quiz ou eBook CTA.
