## Detalhes técnicos

**Etapa 1 — `scripts/sync-content-from-i6hub.mjs`**
- Linha 108: `INSIGHT_TYPES` passa a incluir `'i6 Blog'` (hoje: `i6 on Media`, `i6 Article`, `i6 eBook`, `i6 Social`). Este é o motivo real do item 2 — `useInsights.ts` já tem `BLOG_TYPES = ['i6 Article', 'i6 Blog']`.
- `fmResearch` (385-411): já grava `type`, `sector`, `related_product`, `related_story_slug`. Adicionar `theme_label`, `meta_title`, `meta_description`, `keywords`, `direct_answer`, `writer_name`, `writer_role` — todos condicionais, no mesmo estilo `yaml()`.
- `fmInsights` (353-383): adicionar `sector`, `related_product`, `related_story_slug`, `meta_title`, `meta_description`, `keywords`, `direct_answer`, `writer_name`, `writer_role`.
- `fmStories` (468-505): contrato original completo confirmado. Adicionar os seis campos novos (`meta_*`, `keywords`, `direct_answer`, `writer_*`). `solutions` continua repassado verbatim.
- `keywords` sai como lista inline (`keywords: ["a", "b"]`), formato que os parsers do site já entendem; texto livre com `;`/`,` é normalizado para lista.
- Campos com texto multilinha (`direct_answer`, `meta_description`) precisam de `yaml()` com `\n` escapado — o parser do site é linha a linha.

**Etapa 2**
- `useInsights.ts` / `useIntelligence.ts`: novos campos opcionais nas interfaces (`theme_label` em research, `meta_title`, `meta_description`, `keywords`, `direct_answer`, `writer_name`, `writer_role`) e repasse no mapeamento. `keywords` tolera string ou array, igual a `tags` hoje.
- `Intelligence.tsx` (linhas 200 e 251, `THEME_LABELS`): passa a `item.theme_label || themeLabels[item.theme] || item.theme`; o mapa fica só como fallback legado.
- `Blog.tsx` (38-70): `tags` sai; entram `kind` (`i6 Article` / `i6 Blog`) e `theme` derivado dos `theme_label` distintos do idioma atual, com `?kind=` e `?theme=` via `setSearchParams(..., { replace: true })`, espelhando o padrão de `Intelligence.tsx` (292-320). O componente de filtros perde a prop `tags` e ganha `kinds`. Agrupamento por tema e `RecentStrip` intocados.
- Autoria: linha nova em `BlogCard.tsx` e nos cards de research/mídia; assinatura em `InsightArticle.tsx`, `IntelligenceArticle.tsx` e `SuccessStoryArticle.tsx`, junto de data/tempo de leitura.
- SEO/GEO: nos artigos, `Helmet` prefere `meta_title`/`meta_description`; `keywords` e `direct_answer` entram no JSON-LD existente (`headline`, `description`, `keywords`, e `direct_answer` como resumo). Bloco visível de resposta rápida acima do corpo, com o mesmo cartão areia usado nas páginas.
- Trilíngue: rótulos novos ("Por", "Resposta rápida") em pt/en/es.

**Etapa 3**
- Novo `src/data/decisionSuiteProducts.ts` com `DECISION_SUITE_PRODUCTS`, `isProductSlug`, `productUrl`, todas as URLs `null`.
- `useSuccessStoriesMarkdown.ts` (5-8): `LEVER_SLUGS`/`isLeverSlug` → `isProductSlug`.
- `SuccessStoryArticle.tsx` (239-256): `<Link to="/solutions#territory-...">` → `<a href target="_blank" rel="noopener noreferrer">` quando `productUrl` existir; senão o `<span>` atual. A linha `t.leversHint` (225) só renderiza se alguma alavanca tiver URL.

**Verificação em cada etapa**: typecheck, build e conferência das páginas em pt/en/es, desktop e mobile. Sem release nem deploy.
