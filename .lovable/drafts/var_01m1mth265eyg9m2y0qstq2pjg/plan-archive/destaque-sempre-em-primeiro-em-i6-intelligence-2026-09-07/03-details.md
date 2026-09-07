## Detalhes técnicos

Arquivo único: `src/pages/Intelligence.tsx`.

- `filtered` continua sendo o feed filtrado por `kind`/`theme`, ordenado por data com desempate por slug.
- `heroSlug` permanece como está (`filtered.find((p) => p.featured)?.slug ?? null`) — o destaque mais recente.
- Nova lista de renderização derivada de `filtered` em `useMemo`: quando `heroSlug` existe, a peça correspondente é movida para o índice 0 e o restante mantém a ordem original; quando não existe, a lista é `filtered` inalterada. Sem `sort` in-place no array memoizado.
- A grade continua `grid-flow-row-dense` com `span` no `heroSlug`; com o destaque no índice 0 ele passa a abrir a primeira linha, sem coluna órfã.
- Ordem de Tab acompanha a ordem do DOM, que agora coincide com a ordem visual.

Fora de escopo: `useIntelligence.ts`, `useInsights.ts`, sync, frontmatter dos conteúdos, `/insights` e `/i6-blog`.

Nota: os dois cartões "Temp research…" e "Temp eBook…" do print eram arquivos de teste, já removidos; o preview mostrava uma versão antiga da tela.

Validação: `tsgo --noEmit` e build; checagem visual em pt/en/es, desktop e mobile, com zero, um e vários destaques, e com filtros de tipo/tema aplicados. Sem publicação.
