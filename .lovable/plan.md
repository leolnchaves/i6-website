## Objetivo
Nos cards de Success Stories, substituir o texto abaixo do título (hoje = `challenge` truncado, o que expõe Markdown cru como `###`) pelo campo `description` do frontmatter — o mesmo texto curto exibido logo após o nome do cliente na página de detalhes.

## Passos
1. **`src/components/success-stories/story-components/StoryCard.tsx`**
   - Adicionar `description: string` ao tipo `StoryCardData`.
   - Trocar o parágrafo abaixo do título: usar `story.description` em vez do `story.challenge` truncado. Manter `line-clamp-2` para consistência visual.
2. **`src/components/success-stories/ModernStoriesGrid.tsx`**
   - Passar `description: story.description` no objeto `story` do `LazyStoryCard`.
3. **`src/components/landings/RelatedStoryMiniCard.tsx`** — verificar se usa o mesmo padrão; se sim, aplicar a mesma troca para consistência. (Verifico no build.)

Sem release/tag.

## Notas
- `useSuccessStoriesMarkdown` já expõe `description`.
- Fallback: se `description` estiver vazio no MD, o parágrafo simplesmente não aparece (não cai de volta em `challenge`, conforme regra prévia de não "vazar" para outros campos).
