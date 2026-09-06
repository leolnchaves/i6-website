## Detalhes técnicos

**`src/pages/Intelligence.tsx`** (reescrita da listagem)
- Remover `SECTOR_LABELS_PT` / `SECTOR_LABELS_EN`, o estado `sector`, `setSector`, `sectors`, `showSectorTheme` e o parâmetro `sector` na URL. `kind` e `theme` seguem em `useSearchParams` com sincronização no `useEffect` atual.
- `FeedItem` ganha `featured?: boolean`, preenchido em `fromIntelligence` (`p.featured`) e `fromInsight` (`i.featured`); o item destacado mais recente recebe `md:col-span-2` na grade `grid-cols-1 md:grid-cols-2` com `grid-flow-row-dense`.
- Rótulos de tema ganham mapa ES além de PT/EN; interface (`Tipo`, `Tema`, `Todos`, `min de leitura`, contador, estado vazio, limpar filtros) via objeto `COPY` com chaves `pt`/`en`/`es` e fallback `pt`.
- `FeedCard` reescrito para superfície clara: `bg-card`, `border-border`, hover com `shadow` e `border-accent/40`, título `text-foreground`, resumo `text-muted-foreground` com `line-clamp-3` (destaque `line-clamp-4`), rodapé fino separado por `border-t border-border`. Sem `cover`, um SVG de linhas diagonais em `currentColor`/`hsl(var(--border))` posicionado no canto superior direito, `aria-hidden`. Todas as cores por tokens — nenhum `#F4845F` ou `rgba()` solto.
- Título `h1` deixa de ser `sr-only`; seção em faixa areia (`bg-secondary` / `bg-background` conforme o token usado nas demais páginas claras).
- Helmet: título e descrição passam a "i6 Deep Research"; JSON-LD `CollectionPage` com o mesmo nome.

**`src/data/translations/{pt,en,es}.ts`** — `header.research.hub` passa a `i6 Deep Research`.

**`src/components/hometeste/HeaderNovo.tsx`** — acrescentar `/i6-intelligence` ao array de rotas claras em `isLightPage`.

Fora de escopo, sem alteração: `useIntelligence.ts`, `useInsights.ts` (inclui `useIntelligenceInsights`), `IntelligenceOrInsightArticle.tsx`, `IntelligenceArticle.tsx`, `InsightArticle.tsx`, `Insights.tsx`, `Blog.tsx`, sync do i6 HUB. A leitura de item individual continua dizendo "i6 Research" — inconsistência registrada para a próxima rodada.

## Verificação

Checagem de tipos e build. Em pt/en/es: ausência de rolagem horizontal (`scrollWidth === clientWidth`) em telas estreita e larga, e filtros de Tipo e Tema respondendo tanto por clique quanto pelo parâmetro na URL, incluindo `?theme=estoque` vindo de Soluções. Sem publicação nem deploy nesta rodada.
