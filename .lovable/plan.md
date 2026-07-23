# Ajustes na página de detalhe do case

## 1. Unificar título do card com o do detalhe

Card passa a exibir `title` (mesmo texto da hero do detalhe) em vez de `quote`.

- `src/components/success-stories/ModernStoriesGrid.tsx`: trocar `customer_quote: story.quote` por `customer_quote: story.title` no mapeamento passado a `LazyStoryCard`.
- `StoryCard.tsx`, MDs e página de detalhe permanecem inalterados. `quote` continua sendo usado no bloco de citação do detalhe.

## 2. Alinhar logo do cliente à esquerda na hero do detalhe

Em `src/pages/SuccessStoryArticle.tsx`, o `<img>` da logo está dentro de um `flex flex-col` sem `items-*`, o que faz o elemento esticar. Adicionar `self-start` (ou `mr-auto`) ao `<img>` para ancorá-lo à esquerda, mantendo o `h-10 md:h-12 w-auto`.

## Fora de escopo

- Renomear a prop `customer_quote` do StoryCard (mudança apenas cosmética no código).
