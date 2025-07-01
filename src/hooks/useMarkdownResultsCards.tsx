
import { useState, useEffect, useCallback } from 'react';
import { MarkdownAPI } from '@/services/markdownAPI';
import { useCMSResultsCards } from './useCMSResultsCards';

interface MarkdownResultCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
  iconColor: string;
  backgroundColor?: string;
  backgroundOpacity?: number;
  cardOrder: number;
}

export const useMarkdownResultsCards = (pageSlug: string, language: string = 'en') => {
  const [markdownCards, setMarkdownCards] = useState<MarkdownResultCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fallback para Supabase
  const supabaseFallback = useCMSResultsCards(pageSlug, language);

  const fetchMarkdownCards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('useMarkdownResultsCards - Fetching:', pageSlug, language);

      const fileName = `results-cards.${language}.md`;
      const result = await MarkdownAPI.getFile(fileName, 'content/cards');

      if (result.success && result.file) {
        // Parser para cards de resultados
        const cards = parseResultsCardsMarkdown(result.file.content);
        setMarkdownCards(cards);
        console.log('useMarkdownResultsCards - Cards loaded:', cards.length);
      } else {
        throw new Error(`Results cards file not found: ${fileName}`);
      }
    } catch (err) {
      console.error('useMarkdownResultsCards - Error:', err);
      setError(`Erro ao carregar cards de resultados: ${err}`);
    } finally {
      setLoading(false);
    }
  }, [pageSlug, language]);

  useEffect(() => {
    fetchMarkdownCards();
  }, [fetchMarkdownCards]);

  // Função com fallback automático
  const getCards = useCallback(() => {
    if (markdownCards.length > 0) {
      return markdownCards;
    }
    
    if (error && supabaseFallback.cards.length > 0) {
      console.log('useMarkdownResultsCards - Using Supabase fallback');
      return supabaseFallback.cards.map(card => ({
        id: card.id,
        title: card.title,
        description: card.description,
        iconName: card.icon_name,
        iconColor: card.icon_color,
        backgroundColor: card.background_color || undefined,
        backgroundOpacity: card.background_opacity || 1.0,
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

function parseResultsCardsMarkdown(content: string): MarkdownResultCard[] {
  // Parser simples - será expandido quando conectarmos API real
  const cards: MarkdownResultCard[] = [];
  
  console.log('parseResultsCardsMarkdown - Content length:', content.length);
  
  return cards;
}
