## i6 Blog — nova página

Cria `/pt/i6-blog` e `/en/i6-blog` reunindo todos os conteúdos `type: i6 Article` (que hoje aparecem em `/i6-intelligence`). Leitura migra para `/i6-blog/:slug` (redirect do path antigo). eBooks continuam em i6-intelligence junto com Research.

### 1. Estrutura da página

```text
┌────────────────────────────────────────────────┐
│ HERO destacado (artigo default)                │
│  - cover_image em fundo com blur/fade nas bordas│
│  - badge "i6 Article" + título + subtítulo      │
│  - CTA "Ler artigo"                             │
├────────────────────────────────────────────────┤
│ INSIGHTS RECENTES  (5 mais recentes por data)   │
│  cards com hover glow suave (ref: anexo 2/3)    │
├────────────────────────────────────────────────┤
│ FILTROS  (tema + tags)  — chips                 │
├────────────────────────────────────────────────┤
│ TEMA A  ──────────── ‹ carrossel lateral ›      │
│   cards com tamanhos alternados (ref: anexo 4)  │
│ TEMA B  ──────────── ‹ carrossel lateral ›      │
│ TEMA C  ...                                     │
└────────────────────────────────────────────────┘
```

### 2. Contrato de frontmatter (i6Hub → MD)

Campos novos que o i6Hub precisa passar em artigos `type: i6 Article`:

| campo | tipo | uso |
|---|---|---|
| `is_default` | boolean | marca o artigo do hero (se >1, usa o mais recente) |
| `theme` | string | agrupa por trilho e alimenta filtro (ex: `forecasting`, `pricing`) |
| `tags` | lista YAML | filtros secundários (opcional) |

`cover_image`, `title`, `excerpt`, `date`, `read_time` continuam iguais.

O parser YAML de `useInsights.ts` ganha suporte a listas inline (`tags: [a, b]`) e às chaves acima.

### 3. Componentes

- `src/pages/Blog.tsx` — orquestra hero + recentes + filtros + trilhos.
- `src/components/blog/BlogHero.tsx` — imagem full-bleed com máscara radial/blur nas bordas (mesma técnica dos cards de `/success-stories`), badge, título, subtítulo.
- `src/components/blog/RecentStrip.tsx` — 5 cards horizontais com gradient glow no hover (ref anexos 2/3).
- `src/components/blog/BlogFilters.tsx` — chips de tema + tags, estado local.
- `src/components/blog/ThemeRail.tsx` — trilho com carrossel horizontal e cards em tamanhos alternados (ref anexo 4). Setas ‹ › nas laterais.
- `src/components/blog/BlogCard.tsx` — card base com variantes `sm` / `md` / `lg`.

### 4. Roteamento

- `App.tsx`: adiciona rotas `/pt/i6-blog`, `/en/i6-blog`, `/pt/i6-blog/:slug`, `/en/i6-blog/:slug` → `BlogArticle` (reaproveita `InsightArticle` como componente de leitura, sem mudar layout de leitura).
- Redirect: `/i6-intelligence/:slug` que resolve para um Insight `i6 Article` passa a redirecionar para `/i6-blog/:slug` (preserva SEO/links antigos). eBook continua em i6-intelligence.
- Header (`HeaderNovo.tsx`): item "i6 Blog" no dropdown Inteligência Aplicada deixa de ser `comingSoon` e vira link para `/i6-blog`.

### 5. Remoção de i6 Article de /i6-intelligence

- `useInsights.ts`: `INTELLIGENCE_INSIGHT_TYPES` passa a conter apenas `i6 eBook`. Cria `useBlogInsights()` que retorna `i6 Article`.
- `IntelligenceOrInsightArticle.tsx`: para `i6 Article`, redireciona para `/i6-blog/:slug`.

### 6. Sitemap / llms.txt

Adiciona entradas do blog no `public/sitemap.xml` (placeholder de bloco `<!-- i6hub:blog-sitemap-start -->`) e `public/llms.txt`. Script de sync pode preencher em deploy futuro — nesta entrega apenas cria os marcadores.

### 7. Detalhes técnicos

- Ordenação: `is_default` primeiro (mais recente se empate) → hero. Restante ordenado por `date desc`; os 5 primeiros vão para "Insights recentes"; o restante é agrupado por `theme`.
- Filtros: seleção múltipla por tema; combinada com tags via AND entre grupos, OR dentro do grupo. Reset "Todos".
- Fallback de `cover_image` ausente: gradient coral/navy neutro para não quebrar layout.
- i18n: strings ("Insights recentes", "Filtrar por tema", "Ler artigo", "Em breve") em `pt.ts` / `en.ts` sob namespace `blog.*`.
- Estilo do hover glow: `radial-gradient` suave laranja/coral com `opacity` transitando em 300ms, sem mover o card.
- Carrossel: scroll-snap horizontal + botões ‹ › que fazem `scrollBy` do container; sem lib externa.

### 8. Fora do escopo

- Layout da tela de leitura permanece igual ao atual `InsightArticle`.
- Nenhum ajuste no i6Hub — apenas documenta os campos novos que o time de conteúdo passa a incluir.
