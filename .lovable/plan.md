## Objetivo
Nos 3 cards de "Insights Recentes" ao lado do destaque em `/i6-blog`, o título deve aparecer **100% legível** (sem truncamento com "..."), quebrando em quantas linhas forem necessárias — mas os 3 cards juntos precisam continuar cabendo dentro da altura do hero (`h-[62vh]` no desktop).

## Diagnóstico
- `RecentStrip.tsx` (layout `side`) força altura fixa por card (`h-[92px] md:h-[100px]`) e usa `gap-2.5`. Isso limita o título mesmo antes do CSS de truncamento.
- `BlogCard.tsx` (variant `horizontal`, `dense`) aplica `line-clamp-2` no `<h3>`, o que corta o título com reticências.
- A soma `3 × 100px + gaps` é bem menor que `62vh`, então há folga para deixar os cards crescerem.

## Mudanças

### 1) `src/components/blog/RecentStrip.tsx` (layout `side`)
- Container vira flex-column ocupando `h-full` do slot lateral do hero.
- Trocar as `divs` de altura fixa por itens `flex-1` (ou `basis-1/3`) com `min-h-0`, para dividir a altura disponível igualmente entre os 3 cards.
- Reservar espaço do heading "INSIGHTS RECENTES" no topo (já existe) e deixar o restante para os 3 cards.

### 2) `src/components/blog/BlogCard.tsx` (variant `horizontal` + `dense`)
- Remover `line-clamp-2` do `<h3>` no bloco horizontal — título passa a exibir integralmente, quebrando em várias linhas.
- Deixar o card com `h-full` (herda a altura do slot do `RecentStrip`), imagem em `w-1/3` com `object-cover` (mantém proporção mesmo quando o card fica mais alto).
- Reduzir levemente o padding vertical (`py-2.5 md:py-3`) e apertar o bloco de meta (data/tempo) para dar mais espaço vertical ao título.
- Título com `leading-snug` e `text-sm` para acomodar mais palavras sem visual pesado.
- Se o título for curto, o card não estica sozinho — a altura vem do `flex-1` do pai, então os 3 cards permanecem alinhados.

### 3) Fallback mobile (layout `row`)
- Sem alteração de estrutura; apenas garantir que o `BlogCard` horizontal não tenha `line-clamp` (a mesma remoção do item 2 vale aqui — o mobile já usa scroll/stack, então título completo é ganho puro).

## Fora de escopo
- Nenhuma mudança no `BlogHero`, filtros, trilhos por tema, ou na lógica de dados do `useInsights`.
- Nenhuma mudança de cor, tipografia global ou tokens.

## Verificação
- Preview em `/pt/i6-blog` e `/en/i6-blog`: com 3 recentes, os 3 cards preenchem exatamente a altura do hero; títulos aparecem completos, sem "...".
- Título curto: cards mantêm altura igual (definida pelo `flex-1`), sem "buraco".
- Título muito longo (5+ linhas): o card acomoda com `overflow-hidden` no wrapper e o layout não estoura o hero.
