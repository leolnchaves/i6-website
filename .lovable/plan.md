## Objetivo
Na Home (`SinaisSection.tsx`), trocar o grid de 6 cards de sinais (anexo 1) pelos 3 cards de **alavancas** que aparecem em `/solutions` (anexo 2), mantendo os efeitos de hover atuais desses cards.

## O que muda

**Arquivo:** `src/components/hometeste/SinaisSection.tsx`

- Remover:
  - grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` com os 6 `copy.cards` + `signalIcons`.
  - as chaves `cards` (PT/EN) e o array `signalIcons`.
- Inserir no lugar o mesmo grid de 3 territórios usado em `TerritoriesBlock.tsx`, lendo de `solutionsContent[language].territories` e `territoriesBlock`:
  - `grid-cols-1 md:grid-cols-3 gap-5`
  - card: `rounded-2xl bg-white/5 border border-white/10 hover:border-[#F4845F]/50 hover:scale-[1.02] p-6`
  - faixa coral no topo (`w-0 → w-full` no hover)
  - título, tagline, `chips` como pills, e CTA "Ver as soluções desta alavanca ↓"
- Comportamento do clique: como estamos na Home (não há âncoras `#territory-*` renderizadas aqui), cada card vira um `<Link to="/solutions#territory-{id}">` (usando `useLocalizedPath` para prefixo de idioma) — abre `/solutions` já com scroll para a seção da alavanca. Sem `preventDefault` local.
- Todo o resto da seção (badge "QUEM SOMOS", título, subtítulo, i6Signal highlight, capabilities + GIF com popups) permanece intacto.

## Hover mantido
O hover pedido é o dos cards das alavancas em `/solutions` (borda coral, leve scale, faixa coral no topo, título vira coral) — é exatamente o que copiamos de `TerritoriesBlock`. Nenhum efeito novo.

## Fora de escopo
- Sem alterações em `/solutions`, `TerritoriesBlock`, dados de `solutionsV2/content.ts`, i18n textos, ou nas demais seções da Home.
- Não removemos `popups`/`capabilities` — só os 6 cards de sinais e seus ícones.
