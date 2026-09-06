## Detalhes técnicos

- Blog: 16 arquivos em `src/content/intelligence/` com `type: i6 Article`, campos `theme`, `theme_label`, `tags: [...]`, `read_time`, `excerpt`, `date` escalonada, um único `is_default: true` por idioma.
- On Media: 16 arquivos em `src/content/insights/` com `type: i6 on Media` ou `i6 Social`, `external_url` apontando para páginas públicas reais e estáveis (institucionais/infinity6) para validar a abertura em nova aba, `cover_image` usando assets já existentes em `src/assets/images/` via caminho público, `featured: true` em 2 itens.
- Nomeação: `demo-<slug>-pt.md` / `demo-<slug>-en.md`; `slug` explícito no frontmatter começando com `demo-`, evitando colisão com conteúdo real do HUB.
- `language` só aceita `pt` e `en` (ES cai em `pt` via `toContentLang`), então não haverá arquivo `-es`.
- Nenhuma alteração em `useInsights.ts`, no parser, nos componentes de blog/insights, no sync `sync-content-from-i6hub.mjs` ou em rotas — apenas arquivos de conteúdo.
- Ao final: checagem de tipos, build e verificação visual das duas rotas em PT e EN (contagem de cards, grade sem espaço órfão, links externos com nova aba). Sem release/deploy.
- Remoção posterior: `rm src/content/insights/demo-*.md src/content/intelligence/demo-*.md`.
