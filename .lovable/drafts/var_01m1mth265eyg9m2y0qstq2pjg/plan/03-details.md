## Como o conteúdo chega

Novo tipo `docs` no fluxo do i6 HUB, no mesmo padrão dos existentes:

- Arquivos em `src/content/docs/<slug>-<lang>.md`, lidos com `import.meta.glob('?raw')`.
- Frontmatter: `title`, `slug`, `language`, `section`, `section_label`, `order`, `description`, `updated_at`, opcionalmente `hidden`.
- `scripts/sync-content-from-i6hub.mjs` ganha `--type=docs`, gravando nessa pasta e reutilizando a validação de slug já existente.
- Enquanto o HUB não publicar, entram 3 a 4 páginas de exemplo por idioma, com texto genérico.

## Implementação

- `src/hooks/useDocs.ts` — mesmo parser de frontmatter de `useInsights.ts`, agrupando por `section` e ordenando por `order`; fallback de idioma para PT quando faltar tradução.
- `src/components/docs/` — `DocsShell.tsx` (grade três colunas, sidebar via `@/components/ui/sidebar` com `collapsible="icon"` e `SidebarTrigger` fora dela), `DocsSidebar.tsx` (grupos, item ativo, filtro por título com `includes` em texto normalizado), `DocsToc.tsx` (títulos extraídos do Markdown por regex, ids gerados por slugify, seção ativa por `IntersectionObserver`), `DocsPager.tsx`.
- `src/components/docs/DocsMarkdown.tsx` — um único `react-markdown` + `remark-gfm` para esta área, com `id` nos títulos (`h2`/`h3`) e estilo de blocos de código. Nenhuma das cinco renderizações existentes é tocada.
- `src/pages/Docs.tsx` — rotas `docs` e `docs/:slug` dentro do bloco `:lang` do `src/App.tsx`; `/docs` sem slug redireciona para a primeira página.
- `HeaderNovo.tsx` — acrescentar `/docs` à lista de rotas de tema claro, usando a checagem normalizada já em uso.
- SEO: `title`/`description` por página via react-helmet-async; entradas no sitemap.
- Movimento: transições respeitam `prefers-reduced-motion`.

## Fora de escopo

Sem banco de dados, sem alterar o pipeline de leads, sem tocar em `/i6-blog`, `/insights`, stories ou landings, e sem busca global no site (a busca aqui filtra só o menu da documentação).
