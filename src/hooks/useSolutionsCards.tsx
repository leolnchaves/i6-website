
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

      console.log('Fetching solutions cards for page:', pageSlug, 'language:', language);

      // Buscar a página específica
      const { data: pageData, error: pageError } = await supabase
        .from('cms_pages')
        .select('id')
        .eq('slug', pageSlug)
        .eq('is_active', true)
        .maybeSingle();

      if (pageError) {
        console.error('Error fetching page:', pageError);
        throw pageError;
      }

      if (!pageData) {
        console.log('Page not found:', pageSlug);
        setCards([]);
        return;
      }

      console.log('Found page ID:', pageData.id);

      // Buscar os cards de soluções ativos
      const { data: cardsData, error: cardsError } = await supabase
        .from('cms_solutions_cards')
        .select('id, title, description, icon, engine, is_active, card_order')
        .eq('page_id', pageData.id)
        .eq('language', language)
        .eq('is_active', true)
        .order('card_order', { ascending: true });

      if (cardsError) {
        console.error('Error fetching solutions cards:', cardsError);
        throw cardsError;
      }

      console.log('Solutions cards fetched:', cardsData?.length || 0, 'cards');
      setCards(cardsData || []);
    } catch (err) {
      console.error('Error in fetchCards:', err);
      setError('Erro ao carregar cards de soluções');
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
