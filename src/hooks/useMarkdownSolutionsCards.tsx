
import { useState, useEffect, useCallback } from 'react';
import { MarkdownAPI } from '@/services/markdownAPI';
import { useCMSSolutionsCards } from './useCMSSolutionsCards';

interface MarkdownSolutionCard {
  id: string;
  title: string;
  description: string;
  focus: string;
  outcome: string;
  features: string[];
  engine: string;
  icon: string;
  gradient: string;
  bgColor: string;
  borderColor: string;
  cardOrder: number;
}

export const useMarkdownSolutionsCards = (pageSlug: string, language: string = 'en') => {
  const [markdownCards, setMarkdownCards] = useState<MarkdownSolutionCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fallback para Supabase
  const supabaseFallback = useCMSSolutionsCards(pageSlug, language);

  const fetchMarkdownCards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('useMarkdownSolutionsCards - Fetching:', pageSlug, language);

      const fileName = `solutions-cards.${language}.md`;
      const result = await MarkdownAPI.getFile(fileName, 'content/cards');

      if (result.success && result.file) {
        const cards = parseSolutionsCardsMarkdown(result.file.content);
        setMarkdownCards(cards);
        console.log('useMarkdownSolutionsCards - Cards loaded:', cards.length);
      } else {
        throw new Error(`Solutions cards file not found: ${fileName}`);
      }
    } catch (err) {
      console.error('useMarkdownSolutionsCards - Error:', err);
      setError(`Erro ao carregar cards de soluções: ${err}`);
    } finally {
      setLoading(false);
    }
  }, [pageSlug, language]);

  useEffect(() => {
    fetchMarkdownCards();
  }, [fetchMarkdownCards]);

  const getCards = useCallback(() => {
    if (markdownCards.length > 0) {
      return markdownCards;
    }
    
    if (error && supabaseFallback.cards.length > 0) {
      console.log('useMarkdownSolutionsCards - Using Supabase fallback');
      return supabaseFallback.cards.map(card => ({
        id: card.id,
        title: card.title,
        description: card.description,
        focus: card.focus,
        outcome: card.outcome,
        features: card.features,
        engine: card.engine,
        icon: card.icon,
        gradient: card.gradient,
        bgColor: card.bg_color,
        borderColor: card.border_color,
        cardOrder: card.card_order,
      }));
    }
    
    return [];
  }, [markdownCards, error, supabaseFallback.cards]);

  return {
    cards: getCards(),
    loading: loading || supabaseFallback.loading,
    error,
    refetch: fetchMarkdownCards,
    hasMarkdownCards: markdownCards.length > 0,
    isUsingFallback: error !== null && supabaseFallback.cards.length > 0,
  };
};

function parseSolutionsCardsMarkdown(content: string): MarkdownSolutionCard[] {
  const cards: MarkdownSolutionCard[] = [];
  
  console.log('parseSolutionsCardsMarkdown - Content length:', content.length);
  
  return cards;
}
