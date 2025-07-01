
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SolutionsCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  engine: string;
  is_active: boolean;
  card_order: number;
}

export const useSolutionsCards = (language: string = 'en', pageSlug: string = 'solutions') => {
  const [cards, setCards] = useState<SolutionsCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('useSolutionsCards - Fetching solutions cards for page:', pageSlug, 'language:', language);

      // First get the page ID from the slug
      const { data: pageData, error: pageError } = await supabase
        .from('cms_pages')
        .select('id')
        .eq('slug', pageSlug)
        .eq('is_active', true)
        .maybeSingle();

      if (pageError) {
        console.error('useSolutionsCards - Error fetching page:', pageError);
        throw pageError;
      }

      if (!pageData) {
        console.log('useSolutionsCards - Page not found:', pageSlug);
        setCards([]);
        return;
      }

      console.log('useSolutionsCards - Found page ID:', pageData.id);

      // Then fetch the solutions cards for this page
      const { data: cardsData, error: cardsError } = await supabase
        .from('cms_solutions_cards')
        .select('id, title, description, icon, engine, is_active, card_order')
        .eq('page_id', pageData.id)
        .eq('language', language)
        .eq('is_active', true)
        .order('card_order', { ascending: true });

      if (cardsError) {
        console.error('useSolutionsCards - Error fetching solutions cards:', cardsError);
        throw cardsError;
      }

      console.log('useSolutionsCards - Solutions cards fetched:', cardsData?.length || 0, 'cards');
      console.log('useSolutionsCards - Cards data:', cardsData);
      setCards(cardsData || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      console.error('useSolutionsCards - Error in fetchCards:', err);
      setError(`Erro ao carregar cards de soluções: ${errorMessage}`);
      setCards([]);
      toast({
        title: 'Erro',
        description: 'Falha ao carregar os cards de soluções.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [pageSlug, language, toast]);

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
