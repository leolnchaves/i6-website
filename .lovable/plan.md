
# Piloto: Demo interativo Price-to-Margin no /kiosk

Substitui o bloco textual atual (`SolutionDemoBlock`) por uma experiência split-screen real quando a solução ativa é `price-to-margin`. Nas outras 8 soluções, mantém o bloco textual atual como fallback (serão convertidas em levas futuras).

Ajuste extra pedido: os cards de solução (grid superior) devem ficar **em uma única linha, sem quebrar**, mesmo com 3 opções.

## Fluxo do demo (o que o visitante vê)

Layout split 50/50 dentro do card do demo, altura fixa (~62vmin):

**Lado esquerdo — cenário real (mock e-comm B2B fiel)**
- Header falso: "VivaShop B2B · Catálogo".
- Grade de 4 produtos (card com imagem gerada, nome, custo, preço atual, margem %, giro).
- O visitante toca em um produto → card fica destacado (borda coral) e vira o "produto selecionado".
- Ao selecionar, aparece no rodapé esquerdo o card do produto ampliado com "Preço atual R$ X · Margem Y%". Esse valor é animado durante o passo-a-passo do modelo: sobe/desce, e no fim mostra "Preço recomendado R$ Z · Margem W% · Δ Receita/Margem".

**Lado direito — raciocínio do modelo (script determinístico animado)**
Pipeline de 5 passos que roda ao selecionar o produto:
1. Lendo histórico de vendas e elasticidade do SKU
2. Detectando concorrência e sazonalidade
3. Simulando 10.000 cenários de preço
4. Otimizando para **margem** (objetivo do quiz)
5. Recomendando novo preço

Cada passo tem: ícone, label, barra de progresso animada (via `requestAnimationFrame`/setInterval com cleanup), micro-métrica que aparece (ex: "elasticidade estimada: -1.4", "SKUs comparáveis: 312"). Enquanto passos avançam, o preço/margem do produto selecionado no lado esquerdo é interpolado do valor inicial até o recomendado. No passo 5 aparece o CTA visual "Aplicar preço" (não clicável — é demo).

Cada produto tem seu próprio preço recomendado e delta pré-calculado (dados estáticos), garantindo previsibilidade no totem.

## Arquivos

**Novo — `src/data/kiosk/demos/priceToMargin.ts`**
Exporta `priceToMarginDemo` (PT/EN):
- `scenarioTitle`, `scenarioSubtitle`
- `products`: array de 4 SKUs `{ id, name, image, cost, currentPrice, currentMargin, turnover, recommendedPrice, recommendedMargin, deltaRevenue, deltaMargin, insight }`
- `pipeline`: 5 passos `{ label, microMetric, durationMs }`
- `ctaLabel`, `objectiveLabel` ("Objetivo: margem")

**Novo — `src/components/kiosk/demos/PriceToMarginDemo.tsx`**
Componente que recebe `lang` e renderiza o split-screen. Estado local:
- `selectedProductId`
- `stepIndex` (0..5, 5 = concluído)
- `interpolatedPrice`, `interpolatedMargin` (derivados do progresso)

Ao selecionar produto → dispara timeline com `setTimeout` encadeados respeitando `durationMs` de cada passo, com `useEffect` cleanup ao trocar de produto/desmontar. Reset limpo ao trocar produto.

Imagens: 4 PNGs gerados via `imagegen` (frascos/embalagens genéricas de produtos farma/consumo, fundo neutro) em `src/assets/kiosk/`.

**Editar — `src/components/kiosk/SolutionDemoBlock.tsx`**
Adicionar switch: se `solution.id === 'price-to-margin'` renderiza `<PriceToMarginDemo />`, senão mantém o layout atual de cards textuais. Prop signature ganha `lang`.

**Editar — `src/pages/Kiosk.tsx`**
Passar `lang` para `<SolutionDemoBlock>`. Ao trocar de solução, o `SolutionDemoBlock` remonta (via `key={selectedSolution.id}`) para resetar o estado do demo.

**Editar — `src/components/kiosk/SolutionsGrid.tsx`**
Trocar `grid-cols-1 md:grid-cols-2` por `flex flex-nowrap gap-[2.5vmin]` com cada card em `flex-1 min-w-0`. Reduzir padding interno/tipografia proporcionalmente para caber 2–3 cards em uma linha sem quebrar (usando `vmin` já garante escala).

## Detalhes técnicos

- Animação: puro React state + `setTimeout`/`requestAnimationFrame` com cleanup em `useEffect return`. Sem libs externas.
- Interpolação preço/margem: linear entre snapshots de cada passo (steps 3 e 4 fazem o maior movimento).
- Sem chamadas de rede, sem LLM — 100% determinístico, offline-friendly para totem.
- Tracking: emite `KIOSK_SOLUTION_SELECTED` já existente; adiciona `kiosk_demo_product_selected` opcional (não bloqueador do piloto).
- Acessibilidade toque: alvos ≥ 72px mantidos, `touch-action: manipulation` já aplicado no shell.

## Fora do escopo deste piloto

- Demos de Turnover, Conversion, Growth (5 soluções), Planning (2 soluções) — permanecem no bloco textual atual até aprovarmos o padrão.
- Chamada real a modelo/LLM.
- Persistência de leads adicionais no i6Hub (fluxo do eBook já existente cobre).
