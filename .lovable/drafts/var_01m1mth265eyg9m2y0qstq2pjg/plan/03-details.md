## Etapas

**1. Rotas**
- Em `src/App.tsx`: remover as rotas `solutions` e `solutions/:slug` e adicionar
  redirecionamento de ambas para a Home do idioma (`/:lang`), preservando o
  idioma da URL.
- Remover `src/pages/Solutions.tsx` e `src/pages/TransformationLanding.tsx` do
  registro de páginas.

**2. Mapa de produtos do Decision Suite**
- Criar `src/data/decisionSuiteProducts.ts` com os seis produtos
  (`relevance`, `targeting`, `assortment`, `forecasting`, `sales-planning`,
  `pricing`), cada um com rótulo trilíngue e `url` (string ou `null`).
- Mapear os slugs de alavanca hoje aceitos (`growth`, `planning`, `pricing`)
  para os produtos correspondentes.
- Quando a `url` for `null`, o item é exibido como texto, sem link, e a dica de
  clique não aparece.

**3. Âncoras internas**
- `src/pages/SuccessStoryArticle.tsx`: alavancas deixam de usar
  `/solutions#territory-<slug>` e passam a usar a URL externa do produto
  (`target="_blank"`, `rel="noopener noreferrer"`).
- `src/pages/IntelligenceArticle.tsx`: `related_product` passa a resolver pelo
  mapa de produtos em vez de `#âncora` da página removida.

**4. Arquivos a excluir**
- Páginas: `Solutions.tsx`, `TransformationLanding.tsx`.
- `src/components/solutions-v2/`: `SolutionsV2Hero.tsx`, `TerritoriesBlock.tsx`,
  `TerritorySection.tsx`, `SignalLayerBlock.tsx`, `LeanSolutionCard.tsx`.
  `HowWeImplement.tsx` **permanece** (usado por `/go`).
- `src/components/solutions/`: pasta inteira (`I6SignalDemo.tsx`,
  `ModernSolutionCard.tsx`, `SolutionCard.tsx`, `SolutionsCTA.tsx`,
  `SolutionsMetricsSection.tsx`).
- Código morto correlato: `src/components/Footer.tsx`.
- Conteúdo: `src/content/landings/` (8 MDs + README) e
  `public/content/solutions-seo-{pt,en}.md`, `page-solutions-{pt,en}.md`.

**5. Preservar**
- `src/data/solutionsV2/content.ts` e `src/data/signalDemo/content.ts`: ainda
  usados por Kiosk, seção Sinais da Home e cartão de case.
- `RealResultsStrip`, `CTAFinal`, `SEOHead`, `HowWeImplement`.

**6. SEO / GEO**
- `scripts/prerender-seo-stubs.mjs`: remover `solutions` de `staticRoutes`, o
  bloco de âncoras de produto dessa rota e todo o bloco das landings
  (`LANDINGS_DIR`).
- `public/sitemap.xml`: remover as 2 entradas de `/solutions` e as 8 das
  landings.
- `public/llms.txt`: remover as 2 linhas de Solutions e as 8 das landings.
- `src/data/staticData/seoData.ts`: remover o bloco `solutions`.

**7. Limpeza de textos**
- Remover as chaves órfãs `header.solutions*` em pt/en/es (nenhum menu as usa).

## Verificação
- Typecheck e build.
- Conferir que `/pt/solutions`, `/en/solutions` e um `/pt/solutions/<slug>`
  redirecionam para a Home do idioma correto.
- Conferir um case com alavancas e um artigo de pesquisa com produto
  relacionado, nos três idiomas.
- Conferir que Home, Kiosk e `/go` seguem intactos.
- Sem publicação.

## Ponto aberto
Preciso das URLs reais das páginas de produto do i6 Decision Suite (ou dos
padrões de endereço). Sem elas, cadastro os seis produtos com URL vazia — os
itens aparecem como texto e passam a virar link assim que você informar os
endereços.
