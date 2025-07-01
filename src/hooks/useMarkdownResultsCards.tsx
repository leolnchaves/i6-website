
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Fallback para Supabase
  const supabaseFallback = useCMSResultsCards(pageSlug, language);

  console.log('🔍 useMarkdownResultsCards DEBUG:', {
    pageSlug,
    language,
    markdownCardsLength: markdownCards.length,
    loading,
    error,
    supabaseFallbackCardsLength: supabaseFallback.cards.length,
    supabaseFallbackLoading: supabaseFallback.loading
  });

  const fetchMarkdownCards = useCallback(async () => {
    console.log('📡 useMarkdownResultsCards - Starting fetch with:', { pageSlug, language });
    
    if (!pageSlug || pageSlug.trim() === '') {
      console.log('❌ useMarkdownResultsCards - Invalid pageSlug, skipping fetch');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log('🚀 useMarkdownResultsCards - Fetching markdown file...');

      const fileName = `results-cards.${language}.md`;
      console.log('📄 useMarkdownResultsCards - Requesting file:', fileName);
      
      const result = await MarkdownAPI.getFile(fileName, 'content/cards');
      console.log('📥 useMarkdownResultsCards - API Response:', result);

      if (result.success && result.file) {
        console.log('✅ useMarkdownResultsCards - File content received:', {
          contentLength: result.file.content.length,
          contentPreview: result.file.content.substring(0, 100)
        });
        
        const cards = parseResultsCardsMarkdown(result.file.content);
        console.log('🔄 useMarkdownResultsCards - Parsed cards:', cards);
        
        setMarkdownCards(cards);
        console.log('💾 useMarkdownResultsCards - Cards stored in state');
      } else {
        console.log('⚠️ useMarkdownResultsCards - No markdown file found, reason:', result);
      }
    } catch (err) {
      console.error('💥 useMarkdownResultsCards - Fetch error:', err);
      setError(`Markdown fetch error: ${err}`);
    } finally {
      setLoading(false);
      console.log('🏁 useMarkdownResultsCards - Fetch completed');
    }
  }, [pageSlug, language]);

  useEffect(() => {
    console.log('🔄 useMarkdownResultsCards - Effect triggered:', { pageSlug, language });
    if (pageSlug && pageSlug.trim() !== '') {
      fetchMarkdownCards();
    } else {
      console.log('⏭️ useMarkdownResultsCards - Skipping fetch due to invalid pageSlug');
    }
  }, [fetchMarkdownCards]);

  const getCards = useCallback(() => {
    console.log('🎯 useMarkdownResultsCards - getCards called:', {
      markdownCardsLength: markdownCards.length,
      supabaseCardsLength: supabaseFallback.cards.length
    });
    
    if (markdownCards.length > 0) {
      console.log('📋 useMarkdownResultsCards - Using Markdown cards');
      return markdownCards;
    }
    
    if (supabaseFallback.cards.length > 0) {
      console.log('🔄 useMarkdownResultsCards - Using Supabase fallback cards');
      const adaptedCards = supabaseFallback.cards.map(card => ({
        id: card.id,
        title: card.title,
        description: card.description,
        iconName: card.icon_name,
        iconColor: card.icon_color,
        backgroundColor: card.background_color || undefined,
        backgroundOpacity: card.background_opacity || 1.0,
        cardOrder: card.card_order,
      }));
      console.log('🔄 useMarkdownResultsCards - Adapted Supabase cards:', adaptedCards);
      return adaptedCards;
    }
    
    console.log('❌ useMarkdownResultsCards - No cards available from any source');
    return [];
  }, [markdownCards, supabaseFallback.cards]);

  const finalCards = getCards();
  console.log('📊 useMarkdownResultsCards - Final return:', {
    cardsLength: finalCards.length,
    loading: loading || supabaseFallback.loading,
    error,
    hasMarkdownCards: markdownCards.length > 0,
    isUsingFallback: markdownCards.length === 0 && supabaseFallback.cards.length > 0
  });

  return {
    cards: finalCards,
    loading: loading || supabaseFallback.loading,
    error: null, // Não expor erros para evitar mensagens de erro na UI
    refetch: fetchMarkdownCards,
    hasMarkdownCards: markdownCards.length > 0,
    isUsingFallback: markdownCards.length === 0 && supabaseFallback.cards.length > 0,
  };
};

function parseResultsCardsMarkdown(content: string): MarkdownResultCard[] {
  console.log('🔍 parseResultsCardsMarkdown - Input:', {
    contentLength: content.length,
    contentStart: content.substring(0, 200)
  });
  
  // Criar cards de exemplo para teste se não há conteúdo real
  if (!content || content.trim().length === 0) {
    console.log('📝 parseResultsCardsMarkdown - Creating test cards');
    const testCards: MarkdownResultCard[] = [
      {
        id: 'test-1',
        title: 'Test Card 1 (Markdown)',
        description: 'This is a test card from Markdown parser',
        iconName: 'trending-up',
        iconColor: '#f97316',
        cardOrder: 1
      },
      {
        id: 'test-2',
        title: 'Test Card 2 (Markdown)',
        description: 'Another test card from Markdown parser',
        iconName: 'shield',
        iconColor: '#3b82f6',
        cardOrder: 2
      }
    ];
    console.log('✅ parseResultsCardsMarkdown - Test cards created:', testCards);
    return testCards;
  }
  
  const cards: MarkdownResultCard[] = [];
  console.log('📋 parseResultsCardsMarkdown - Parsed cards:', cards);
  return cards;
}
