
import { useMarkdownPageContent } from './useMarkdownPageContent';
import { useMarkdownResultsCards } from './useMarkdownResultsCards';
import { useMarkdownSolutionsCards } from './useMarkdownSolutionsCards';
import { useMarkdownSuccessStoriesCards } from './useMarkdownSuccessStoriesCards';

export const useUnifiedContent = (pageSlug: string, language: string = 'en') => {
  const pageContent = useMarkdownPageContent(pageSlug, language);
  const resultsCards = useMarkdownResultsCards(pageSlug, language);
  const solutionsCards = useMarkdownSolutionsCards(pageSlug, language);
  const successStoriesCards = useMarkdownSuccessStoriesCards(pageSlug, language);

  const loading = pageContent.loading || resultsCards.loading || solutionsCards.loading || successStoriesCards.loading;
  const hasAnyError = pageContent.error || resultsCards.error || solutionsCards.error || successStoriesCards.error;
  const isUsingAnyFallback = pageContent.isUsingFallback || resultsCards.isUsingFallback || solutionsCards.isUsingFallback || successStoriesCards.isUsingFallback;

  return {
    // Conteúdo da página
    pageContent: {
      getContent: pageContent.getContent,
      content: pageContent.content,
      loading: pageContent.loading,
      error: pageContent.error,
      refetch: pageContent.refetch,
      hasMarkdownContent: pageContent.hasMarkdownContent,
      isUsingFallback: pageContent.isUsingFallback,
    },
    
    // Cards de resultados
    resultsCards: {
      cards: resultsCards.cards,
      loading: resultsCards.loading,
      error: resultsCards.error,
      refetch: resultsCards.refetch,
      hasMarkdownCards: resultsCards.hasMarkdownCards,
      isUsingFallback: resultsCards.isUsingFallback,
    },
    
    // Cards de soluções
    solutionsCards: {
      cards: solutionsCards.cards,
      loading: solutionsCards.loading,
      error: solutionsCards.error,
      refetch: solutionsCards.refetch,
      hasMarkdownCards: solutionsCards.hasMarkdownCards,
      isUsingFallback: solutionsCards.isUsingFallback,
    },
    
    // Cards de cases de sucesso
    successStoriesCards: {
      cards: successStoriesCards.cards,
      loading: successStoriesCards.loading,
      error: successStoriesCards.error,
      refetch: successStoriesCards.refetch,
      hasMarkdownCards: successStoriesCards.hasMarkdownCards,
      isUsingFallback: successStoriesCards.isUsingFallback,
    },
    
    // Estados consolidados
    loading,
    hasAnyError,
    isUsingAnyFallback,
    
    // Função para refetch de tudo
    refetchAll: () => {
      pageContent.refetch();
      resultsCards.refetch();
      solutionsCards.refetch();
      successStoriesCards.refetch();
    }
  };
};
