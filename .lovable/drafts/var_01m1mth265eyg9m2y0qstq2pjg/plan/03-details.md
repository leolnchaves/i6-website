## Estrutura de arquivos (só dentro do escopo)

Reescritos em `src/components/blog/`:

- `BlogHero.tsx` → destaque editorial assimétrico com cartão flutuante de metadados reais (`theme_label`, `date`, `read_time`), imagem `cover_image` via `resolveCoverImage`, sem scrim escuro.
- `RecentStrip.tsx` → régua numerada na faixa grafite; a prop `layout` deixa de ser necessária (uma variação responsiva única).
- `BlogFilters.tsx` → abas de tema com sublinhado terracota + chips de tag, contagem de resultados, mesma API de props de hoje (`themes`, `tags`, `activeTheme`, `activeTag`, callbacks).
- `ThemeRail.tsx` → cabeçalho de tema tipográfico + grade assimétrica (1 destaque + compactos).
- `BlogCard.tsx` → duas variantes (`feature` / `compact`) no mesmo componente.

Novos, ainda em `src/components/blog/`:

- `BlogIntro.tsx` — abertura tipográfica.
- `BlogDivider.tsx` — quebra diagonal reutilizável entre faixas.

`src/pages/Blog.tsx`: mesma lógica de dados (memos de `heroArticle`, `recent`, `themes`, `tags`, `filtered`, `byTheme` inalterados), envolvida por `theme-sand` e pela nova sequência de faixas. Helmet mantido.

## Notas técnicas

- Paleta e fontes só por tokens do tema areia (`background`, `secondary`, `accent`, `card`, `muted-foreground`) — nada de hex fixo como os `#0B1224` / `#F4845F` atuais.
- `/i6-blog` entra na checagem de rota clara do cabeçalho, junto de `/contact`, `/docs`, `/community` e `/i6-builders`.
- Cartão flutuante do destaque: posicionado absoluto sobre a imagem em telas médias e grandes, e empilhado abaixo dela no celular, para não cobrir a capa.
- Quebra diagonal com `clip-path` e `aria-hidden`, sem overflow horizontal.
- Sem alterações em `InsightArticle.tsx`, `useInsights.ts`, parser de frontmatter, sync do i6 HUB, `/insights`, `/i6-intelligence`, `InsightsRow.tsx` e `InsightsSection.tsx`.
- Ao final: checagem de tipos, build e verificação visual nos três idiomas. Sem release ou publicação.
