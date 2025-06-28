
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CMSResultsCard {
  id: string;
  card_order: number;
  title: string;
  description: string;
  icon_name: string;
  icon_color: string;
  background_color: string | null;
  background_opacity: number | null;
  is_active: boolean;
}

export const useCMSResultsCards = (pageSlug: string = 'home', language: string = 'en') => {
  const [cards, setCards] = useState<CMSResultsCard[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCards = useCallback(async () => {
    try {
      setLoading(true);

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

      // Then, fetch ALL cards for this page (including inactive ones for CMS management)
      const { data: cardsData, error: cardsError } = await supabase
        .from('cms_results_cards')
        .select('*')
        .eq('page_id', pageData.id)
        .eq('language', language)
        .order('card_order');

      if (cardsError) {
        console.error('Error fetching cards:', cardsError);
        toast({
          title: 'Erro ao carregar cards',
          description: 'Não foi possível carregar os cards da seção Results.',
          variant: 'destructive',
        });
        return;
      }

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
