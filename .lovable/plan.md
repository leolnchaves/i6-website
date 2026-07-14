## Objetivo

Reorganizar o topo da página `/i6-blog` em duas colunas horizontais:
- **Esquerda (~2/3)**: o artigo em destaque (hero), como está hoje.
- **Direita (~1/3)**: título "INSIGHTS RECENTES / RECENT INSIGHTS" no topo (alinhado com o topo do hero) e, abaixo, cards de artigos recentes empilhados verticalmente, com formato mais alongado (horizontal), ocupando exatamente a mesma altura do hero.

No mobile/tablet, mantém stack (hero em cima, recentes abaixo) — split só a partir de `lg`.

## Mudanças

### 1. `src/pages/Blog.tsx`
- Envolver `BlogHero` e `RecentStrip` num wrapper grid: `grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch`.
- Hero ocupa `lg:col-span-2`, RecentStrip ocupa `lg:col-span-1`.
- Reduzir `recent` para 3–4 itens (para caberem alongados dentro da altura do hero); manter 5 no fallback mobile.
- Remover o `mt-16` de `RecentStrip` quando estiver no split (passar prop `layout="side"`).

### 2. `src/components/blog/BlogHero.tsx`
- Trocar `aspect-[21/9]` por algo compatível com a nova largura (col-span-2). Sugestão: manter `aspect-[16/10]` OU aplicar `h-full` e deixar o grid `items-stretch` igualar a altura ao conteúdo da coluna direita.
- Ajustar tamanho do título (`text-3xl md:text-4xl` em vez de `md:text-5xl`) para caber melhor na largura reduzida.

### 3. `src/components/blog/RecentStrip.tsx`
- Nova prop `layout: 'row' | 'side'` (default `'row'`, preservando uso atual).
- Quando `layout='side'`:
  - Título "INSIGHTS RECENTES" no topo, alinhado ao topo do hero (sem `mt-16`).
  - Container `flex flex-col h-full` para casar altura do hero via `items-stretch` do grid pai.
  - Lista com `flex-1 grid grid-rows-3 gap-3` (3 cards) ou `grid-rows-4` (4 cards) — cada card ocupa uma fração igual da altura.
  - Passar `variant="horizontal"` para `BlogCard`.

### 4. `src/components/blog/BlogCard.tsx`
- Adicionar variante `variant?: 'default' | 'horizontal'`.
- No modo `horizontal`: layout `flex flex-row` — thumbnail à esquerda (largura fixa ~40%), texto à direita (título + data + tag), altura total do card = 100% do slot do grid pai. Manter o mesmo design system (bordas, hover, cores) do card atual — só reorganiza em linha.

### 5. Traduções (opcional/leve)
- Nenhuma chave nova obrigatória: reaproveitar `blog.recentTitle` (já existe: "INSIGHTS RECENTES" / "RECENT INSIGHTS").

## Layout (ASCII)

```text
┌───────────────────────────────┬───────────────────────┐
│                               │ INSIGHTS RECENTES     │
│                               ├───────────────────────┤
│                               │ [img] Título ...      │
│         HERO DESTAQUE         ├───────────────────────┤
│                               │ [img] Título ...      │
│                               ├───────────────────────┤
│                               │ [img] Título ...      │
└───────────────────────────────┴───────────────────────┘
```

## Notas técnicas
- `items-stretch` no grid + `h-full` nos filhos garante equalização de altura sem números mágicos.
- Filtros, rails por tema e demais seções permanecem inalterados abaixo do split.
- Sem alteração de dados/hooks.
