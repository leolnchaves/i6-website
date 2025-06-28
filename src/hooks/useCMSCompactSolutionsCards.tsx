
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CompactSolutionCard {
  id: string;
  title: string;
  description: string;
  engine: string;
  icon_name: string;
  background_color: string;
  is_active: boolean;
  card_order: number;
}

export const useCMSCompactSolutionsCards = (language: string = 'en') => {
  const [cards, setCards] = useState<CompactSolutionCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = useCallback(async () => {
    try {
      console.log('=== useCMSCompactSolutionsCards Debug ===');
      console.log('Starting fetchCards with language:', language);
      setLoading(true);
      setError(null);

      // Primeiro, buscar a página pelo slug
      console.log('Fetching page by slug: home');
      const { data: pageData, error: pageError } = await supabase
        .from('cms_pages')
        .select('id')
        .eq('slug', 'home')
        .eq('is_active', true)
        .maybeSingle();

      console.log('Page query result:', { pageData, pageError });

      if (pageError) {
        console.error('Error fetching page:', pageError);
        setError('Erro ao buscar página');
        setLoading(false);
        return;
      }

      if (!pageData) {
        console.log('Page not found: home - using fallback');
        setCards([]);
        setLoading(false);
        return;
      }

      console.log('Found page with ID:', pageData.id);

      // Depois, buscar os cards da página
      console.log('Fetching cards for page:', pageData.id, 'language:', language);
      const { data: cardsData, error: cardsError } = await supabase
        .from('cms_compact_solutions_cards')
        .select('*')
        .eq('page_id', pageData.id)
        .eq('language', language)
        .eq('is_active', true)
        .order('card_order');

      console.log('Cards query result:', { cardsData, cardsError });

      if (cardsError) {
        console.error('Error fetching cards:', cardsError);
        setError('Erro ao carregar cards');
        setCards([]);
        setLoading(false);
        return;
      }

      console.log('Fetched cards count:', cardsData?.length || 0);
      console.log('Fetched cards:', cardsData);
      
      // Sempre definir cards (mesmo que seja array vazio) e parar loading
      setCards(cardsData || []);
      setLoading(false);
    } catch (err) {
      console.error('Error in fetchCards:', err);
      setError('Erro inesperado');
      setCards([]);
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    console.log('useEffect triggered, calling fetchCards');
    fetchCards();
  }, [fetchCards]);

  console.log('Hook returning:', { 
    cards: cards?.length || 0, 
    loading, 
    error,
    cardsPreview: cards?.slice(0, 2).map(c => ({ id: c.id, title: c.title }))
  });

  return {
    cards,
    loading,
    error,
    refetch: fetchCards,
  };
};
