
import { useState, useEffect, useCallback } from 'react';
import { MarkdownAPI } from '@/services/markdownAPI';
import { useCMSSuccessStoriesCards } from './useCMSSuccessStoriesCards';

interface MarkdownSuccessStoryCard {
  id: string;
  companyName: string;
  industry: string;
  challenge: string;
  solution: string;
  metrics: {
    metric1: { value: string; label: string };
    metric2: { value: string; label: string };
    metric3: { value: string; label: string };
  };
  customerQuote: string;
  customerName: string;
  customerTitle: string;
  imageUrl: string;
  isActiveHome: boolean;
  cardOrder: number;
}

export const useMarkdownSuccessStoriesCards = (pageSlug: string, language: string = 'en') => {
  const [markdownCards, setMarkdownCards] = useState<MarkdownSuccessStoryCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fallback para Supabase
  const supabaseFallback = useCMSSuccessStoriesCards(pageSlug, language);

  const fetchMarkdownCards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('useMarkdownSuccessStoriesCards - Fetching:', pageSlug, language);

      const fileName = `success-stories-cards.${language}.md`;
      const result = await MarkdownAPI.getFile(fileName, 'content/cards');

      if (result.success && result.file) {
        // Parser simples para cards em Markdown
        const cards = parseSuccessStoriesMarkdown(result.file.content);
        setMarkdownCards(cards);
        console.log('useMarkdownSuccessStoriesCards - Cards loaded:', cards.length);
      } else {
        throw new Error(`Cards file not found: ${fileName}`);
      }
    } catch (err) {
      console.error('useMarkdownSuccessStoriesCards - Error:', err);
      setError(`Erro ao carregar cards: ${err}`);
    } finally {
      setLoading(false);
    }
  }, [pageSlug, language]);

  useEffect(() => {
    fetchMarkdownCards();
  }, [fetchMarkdownCards]);

  // Função para fazer fallback automático
  const getCards = useCallback(() => {
    if (markdownCards.length > 0) {
      return markdownCards;
    }
    
    if (error && supabaseFallback.cards.length > 0) {
      console.log('useMarkdownSuccessStoriesCards - Using Supabase fallback');
      return supabaseFallback.cards.map(card => ({
        id: card.id,
        companyName: card.company_name,
        industry: card.industry,
        challenge: card.challenge,
        solution: card.solution,
        metrics: {
          metric1: { value: card.metric1_value, label: card.metric1_label },
          metric2: { value: card.metric2_value, label: card.metric2_label },
          metric3: { value: card.metric3_value, label: card.metric3_label },
        },
        customerQuote: card.customer_quote,
        customerName: card.customer_name,
        customerTitle: card.customer_title,
        imageUrl: card.image_url,
        isActiveHome: card.is_active_home,
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

// Função helper para parser do Markdown de cards
function parseSuccessStoriesMarkdown(content: string): MarkdownSuccessStoryCard[] {
  // Parser simples - em produção seria mais robusto
  const cards: MarkdownSuccessStoryCard[] = [];
  
  // Por enquanto retornamos array vazio - será implementado quando conectarmos API real
  console.log('parseSuccessStoriesMarkdown - Content length:', content.length);
  
  return cards;
}
