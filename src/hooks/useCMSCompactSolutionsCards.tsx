
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CompactSolutionCard {
  id: string;
  title: string;
  description: string;
  engine: string;
  icon_name: string;
  background_color: string;
  card_order: number;
}

export const useCMSCompactSolutionsCards = (language: string = 'en') => {
  const [cards, setCards] = useState<CompactSolutionCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Primeiro, buscar a página pelo slug
      const { data: pageData, error: pageError } = await supabase
        .from('cms_pages')
        .select('id')
        .eq('slug', 'home')
        .eq('is_active', true)
        .maybeSingle();

      if (pageError) {
        console.error('Error fetching page:', pageError);
        setError('Erro ao buscar página');
        return;
      }

      if (!pageData) {
        console.log('Page not found: home');
        setError('Página não encontrada');
        return;
      }

      // Depois, buscar os cards da página
      const { data: cardsData, error: cardsError } = await supabase
        .from('cms_compact_solutions_cards')
        .select('*')
        .eq('page_id', pageData.id)
        .eq('language', language)
        .eq('is_active', true)
        .order('card_order');

      if (cardsError) {
        console.error('Error fetching cards:', cardsError);
        setError('Erro ao carregar cards');
        return;
      }

      setCards(cardsData || []);
    } catch (err) {
      console.error('Error in fetchCards:', err);
      setError('Erro inesperado');
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return {
    cards,
    loading,
    error,
    refetch: fetchCards,
  };
};
