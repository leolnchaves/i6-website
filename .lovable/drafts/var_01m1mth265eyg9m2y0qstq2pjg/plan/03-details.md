## Detalhes técnicos

### Arquivo removido
`src/components/success-stories/optimized/LazyComponents.tsx`

Contém apenas: `StoryCardSkeleton`, `StoryModalSkeleton`, `retryDynamicImport`, o `React.lazy(StoryCard)` e o export `LazyStoryCard`. Nenhum deles é importado fora do próprio arquivo (busca em `src/` confirmou zero referências).

Se a pasta `src/components/success-stories/optimized/` ficar vazia, ela também é removida.

### Não muda
- `StoryCard.tsx`, `ModernStoriesGrid.tsx`, `SuccessStories.tsx`, `SuccessStoryArticle.tsx`
- hooks de conteúdo, sync do HUB e os Markdown de `src/content/stories/`

### Validação
- `bunx tsgo --noEmit -p tsconfig.app.json`
- `bun run build`
- Conferência rápida de `/pt/success-stories` para garantir que os cartões continuam renderizando

Sem release nem deploy.
