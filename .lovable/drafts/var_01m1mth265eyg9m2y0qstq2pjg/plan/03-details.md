## Como o conteúdo chega

Novo tipo `docs` no fluxo do i6 HUB, no mesmo padrão dos existentes:

- Arquivos em `src/content/docs/<slug>-<lang>.md`, lidos com `import.meta.glob('?raw')`.
- Frontmatter: `title`, `slug`, `language`, `section`, `section_label`, `order`, `description`, `updated_at`, `sample` (opcional) e `hidden` (opcional).
- `scripts/sync-content-from-i6hub.mjs` ganha `--type=docs`, gravando nessa pasta e reutilizando a validação de slug já existente. O writer do HUB não emite `sample`, então o arquivo publicado substitui o exemplo e o aviso cai automaticamente.
- Enquanto o HUB não publicar, entram 3 a 4 páginas de exemplo por idioma com `sample: true` e texto genérico.

## Slugify único (ponto 1)

`src/utils/headingSlug.ts` exporta `slugifyHeading(text)` e `extractHeadings(markdown)`. A mesma função é importada por `DocsToc.tsx` e por `DocsMarkdown.tsx` — não há segunda regex de slug.

```ts
export const slugifyHeading = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
   .toLowerCase().replace(/[^a-z0-9]+/g, '-')
   .replace(/^-+|-+$/g, '');
```

Saídas verificadas (idênticas nos dois caminhos): `configuracao-inicial`, `autenticacao-e-autorizacao`, `codigos-de-erro-400-401`, `instalacao-via-npm`, `como-empezar`. Títulos repetidos na mesma página recebem sufixo `-2`, `-3`, aplicado pela mesma função de-duplicadora usada pelo índice e pelo renderizador, na ordem de ocorrência.

## Implementação

- `src/hooks/useDocs.ts` — mesmo parser de frontmatter de `useInsights.ts`, agrupando por `section` e ordenando por `order`; fallback de idioma para PT quando faltar tradução.
- `src/components/docs/` — `DocsShell.tsx` (grade três colunas, sidebar via `@/components/ui/sidebar` com `collapsible="icon"` e `SidebarTrigger` fora dela), `DocsSidebar.tsx` (grupos, item ativo, filtro por título com `includes` em texto normalizado), `DocsToc.tsx` (`hidden xl:block`, títulos via `extractHeadings`, seção ativa por `IntersectionObserver`), `DocsPager.tsx`, `DocsSampleNotice.tsx` (renderizado só quando `sample === true`, texto nos 3 idiomas).
- `src/components/docs/DocsMarkdown.tsx` — um único `react-markdown` + `remark-gfm` para esta área, com renderizadores de `h2`/`h3` que aplicam `slugifyHeading` e o estilo dos blocos de código. Nenhuma das cinco renderizações existentes é tocada.
- `src/pages/Docs.tsx` — rotas `docs` e `docs/:slug` dentro do bloco `:lang` do `src/App.tsx`; `/docs` sem slug redireciona para a primeira página.
- `HeaderNovo.tsx` — acrescentar `/docs` à lista de rotas de tema claro, usando a checagem normalizada já em uso.
- SEO: `title`/`description` por página via react-helmet-async; entradas no sitemap.
- Movimento: transições respeitam `prefers-reduced-motion`.
- Ao final: `bun run build` e checagem de tipos, com relato.

## Fora de escopo

Sem banco de dados, sem alterar o pipeline de leads, sem tocar em `/i6-blog`, `/insights`, stories ou landings, e sem busca global no site (a busca aqui filtra só o menu da documentação).

