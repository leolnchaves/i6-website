
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Fallback para Supabase
  const supabaseFallback = useCMSSuccessStoriesCards();

  const fetchMarkdownCards = useCallback(async () => {
    // Não fazer fetch se não tiver pageSlug válido
    if (!pageSlug || pageSlug.trim() === '') {
      setLoading(false);
      return;
    }

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
        
        // Se não há cards no markdown, não é erro, vamos usar fallback silenciosamente
        if (cards.length === 0) {
          console.log('useMarkdownSuccessStoriesCards - No cards in markdown, using fallback silently');
          // Trigger fallback fetch
          if (pageSlug && pageSlug.trim() !== '') {
            try {
              await supabaseFallback.fetchCards(pageSlug, language);
            } catch (fallbackError) {
              console.log('Supabase fallback falhou, isso é normal durante configuração inicial');
            }
          }
        }
      } else {
        console.log('useMarkdownSuccessStoriesCards - Markdown file not found, using fallback');
        // Não é erro se arquivo não existe, usar fallback
        if (pageSlug && pageSlug.trim() !== '') {
          try {
            await supabaseFallback.fetchCards(pageSlug, language);
          } catch (fallbackError) {
            console.log('Supabase fallback falhou, isso é normal durante configuração inicial');
          }
        }
      }
    } catch (err) {
      console.log('useMarkdownSuccessStoriesCards - Error (expected during initial setup):', err);
      // Não definir como erro, apenas usar fallback silenciosamente
      if (pageSlug && pageSlug.trim() !== '') {
        try {
          await supabaseFallback.fetchCards(pageSlug, language);
        } catch (fallbackError) {
          console.log('Supabase fallback falhou, isso é normal durante configuração inicial');
        }
      }
    } finally {
      setLoading(false);
    }
  }, [pageSlug, language, supabaseFallback]);

  useEffect(() => {
    // Só fazer fetch se tiver pageSlug válido
    if (pageSlug && pageSlug.trim() !== '') {
      fetchMarkdownCards();
    }
  }, [fetchMarkdownCards]);

  // Função para fazer fallback automático
  const getCards = useCallback(() => {
    if (markdownCards.length > 0) {
      return markdownCards;
    }
    
    // Sempre usar fallback sem mostrar erro
    if (supabaseFallback.cards.length > 0) {
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
  }, [markdownCards, supabaseFallback.cards]);

  return {
    cards: getCards(),
    loading: loading || supabaseFallback.loading,
    error: null, // Não expor erros para evitar mensagens de erro na UI
    refetch: fetchMarkdownCards,
    hasMarkdownCards: markdownCards.length > 0,
    isUsingFallback: markdownCards.length === 0 && supabaseFallback.cards.length > 0,
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
