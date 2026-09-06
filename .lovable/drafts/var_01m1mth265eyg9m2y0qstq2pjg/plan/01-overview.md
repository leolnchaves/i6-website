## Visão geral — nova página /insights

A página `/insights` ("i6 On Media") será redesenhada no mesmo espírito editorial do `/i6-blog` recém-aprovado, mas com uma voz mais enxuta e cards compactos. O objetivo é distinguir claramente o que é conteúdo próprio do infinity6 (`i6 Blog`) do que é menção/entrevista/publicação em veículos externos (`i6 On Media` / `i6 Social`).

### Diretriz criativa

- Mesmos tokens visuais do resto do site novo: fundo areia (`theme-sand`), grafite quente `#0B1224`, terracota `#F4845F`, tipografia já em uso.
- Abertura tipográfica assimétrica, como no blog, porém mais compacta — este é um índice de clipping, não longo formato.
- Grade de cards em 1/2/3/4 colunas (responsivo), com destaque leve para itens `featured: true` (ocupa 2 colunas no desktop).
- O logo do veículo/rede social — vindo de `cover_image` via `resolveCoverImage` — ganha área própria e proeminente no card. Não há campo de "nome do veículo" no frontmatter, então nenhum texto será inventado.
- Todo card externo (`isExternal`) exibe, em texto visível, o rótulo "Ver no site original" / "View original" / "Ver en el sitio original" com seta, além do ícone. O comportamento de abrir em nova aba (`target="_blank" rel="noopener noreferrer"`) permanece inalterado.
- Badge de tipo e data no mesmo tom usado no blog.

### Escopo exato

- Alterar apenas `src/pages/Insights.tsx` (incluindo o `InsightCard` inline).
- Adicionar `/insights` à lista de rotas de tema claro em `HeaderNovo.tsx`.
- Criar/renomear chaves de tradução em `src/data/translations/{pt,en,es}.ts` para o rótulo de saída externa e subtítulos da página.
- NÃO alterar: `InsightArticle.tsx`, `useInsights.ts`, parser de frontmatter, sync do i6 HUB, interface `InsightFrontmatter`, `/i6-blog`, `/i6-intelligence`, `InsightsRow.tsx`, `InsightsSection.tsx`, lógica `isExternal` nem o mecanismo de navegação externa.
