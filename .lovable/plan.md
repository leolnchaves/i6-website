## Objetivo
No `/i6-blog`, os chips de **Theme** e **Tags** não devem considerar o artigo em destaque (hero), já que ele não aparece nos trilhos agrupados abaixo — filtrar por uma tag exclusiva dele resulta em lista vazia.

## Mudança
Em `src/pages/Blog.tsx`, ao construir os memos `themes` e `tags`, iterar sobre `articles.filter(a => a.slug !== heroArticle?.slug)` em vez de `articles`.

- `themes`: só entra no mapa se algum artigo não-hero tiver aquele `theme`.
- `tags`: só entra no set se algum artigo não-hero tiver aquela tag.

Assim, chips refletem exatamente o universo filtrável (o que está nos trilhos por tema abaixo).

## Fora de escopo
- Nenhuma mudança no hero, RecentStrip, BlogCard, ThemeRail ou lógica de dados.
- Nenhuma mudança visual nos chips.

## Verificação
- Com 1 artigo em destaque + N nos trilhos: chips de Theme/Tags mostram só o que existe nos N.
- Se o único artigo publicado é o hero: nenhum chip de theme/tag aparece (BlogFilters já retorna null).
