## Problema

A página `/insights` está exibindo cards de "i6 Success Story". Isso acontece porque o feed do i6Hub que alimenta `src/content/insights/` (sync em deploy) inclui itens com `type` fora do conjunto válido (`article | linkedin | press | podcast | video`) — provavelmente `success_story`. O hook `useInsights` aceita qualquer valor de `type`, então esses itens aparecem na listagem com o badge mostrando o `type` cru ("I6 SUCCESS STORY").

Success stories devem viver exclusivamente em `/success-stories` e em suas páginas individuais.

## Mudança

Único arquivo: `src/hooks/useInsights.ts`.

No bloco `ALL` (mapeamento dos `.md`), adicionar uma whitelist de tipos válidos e descartar qualquer item cujo `type` não esteja nela:

```ts
const VALID_TYPES: InsightType[] = ['article', 'linkedin', 'press', 'podcast', 'video'];
// dentro do .map:
if (!VALID_TYPES.includes(fm.type as InsightType)) return null;
```

Isso garante que:
- `/insights` (listagem) não mostra mais success stories nem nenhum outro tipo desconhecido.
- `/insights/:slug` (via `useInsight`) também não resolve slugs de success stories.
- `useFeaturedInsights` (home/seções derivadas) fica idem protegido.
- `/success-stories` e as páginas individuais (`SuccessStoryArticle`) seguem intocadas — usam `useSuccessStoriesMarkdown` lendo `src/content/stories/`.

Nenhuma mudança em conteúdo, script de sync, ou outras páginas. Sem impacto em SEO de insights legítimos.

## Verificação

- Build automático.
- Preview `/pt/insights` e `/en/insights`: nenhum card "I6 SUCCESS STORY".
- `/pt/success-stories` continua listando os cases normalmente.