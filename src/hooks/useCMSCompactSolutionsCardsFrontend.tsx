
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CompactSolutionsCard {
  id: string;
  card_order: number;
  engine_name: string;
  title: string;
  description: string;
  icon_name: string;
  background_color: string;
  background_opacity: number;
  is_active: boolean;
}

export const useCMSCompactSolutionsCardsFrontend = (pageSlug: string = 'home', language: string = 'en') => {
  const [cards, setCards] = useState<CompactSolutionsCard[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCards = useCallback(async () => {
    try {
      setLoading(true);
      console.log('useCMSCompactSolutionsCardsFrontend - Fetching cards for page:', pageSlug, 'language:', language);

      // First, get the page ID
      const { data: pageData, error: pageError } = await supabase
        .from('cms_pages')
        .select('id')
        .eq('slug', pageSlug)
        .eq('is_active', true)
        .maybeSingle();

      if (pageError) {
        console.error('Error fetching page:', pageError);
        return;
      }

      if (!pageData) {
        console.log('Page not found:', pageSlug);
        return;
      }

      console.log('useCMSCompactSolutionsCardsFrontend - Found page ID:', pageData.id);

      // Then, fetch cards for this page (only active ones for frontend)
      const { data: cardsData, error: cardsError } = await supabase
        .from('cms_compact_solutions_cards')
        .select('*')
        .eq('page_id', pageData.id)
        .eq('language', language)
        .eq('is_active', true)
        .order('card_order');

      if (cardsError) {
        console.error('Error fetching compact solutions cards:', cardsError);
        toast({
          title: 'Erro ao carregar cards',
          description: 'Não foi possível carregar os cards da seção Compact Solutions.',
          variant: 'destructive',
        });
        return;
      }

      console.log('useCMSCompactSolutionsCardsFrontend - Fetched cards:', cardsData?.length || 0);
      console.log('useCMSCompactSolutionsCardsFrontend - Cards data:', cardsData);
      setCards(cardsData || []);
    } catch (error) {
      console.error('Error in fetchCards:', error);
      toast({
        title: 'Erro inesperado',
        description: 'Ocorreu um erro ao carregar os cards.',
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
    refetch: fetchCards,
  };
};
