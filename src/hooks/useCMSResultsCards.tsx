
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
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  console.log('🔍 useCMSResultsCards initialized:', { pageSlug, language });

  const fetchCards = useCallback(async () => {
    if (!pageSlug) {
      console.log('❌ useCMSResultsCards - No pageSlug provided');
      setCards([]);
      setLoading(false);
      return;
    }

    console.log('📡 useCMSResultsCards - Starting fetch with:', { pageSlug, language });
    
    try {
      setLoading(true);

      // First, get the page ID using slug
      const { data: pageData, error: pageError } = await supabase
        .from('cms_pages')
        .select('id')
        .eq('slug', pageSlug)
        .eq('is_active', true)
        .maybeSingle();

      console.log('📄 useCMSResultsCards - Page query result:', { pageData, pageError, pageSlug });

      if (pageError) {
        console.error('💥 useCMSResultsCards - Page fetch error:', pageError);
        throw pageError;
      }

      if (!pageData) {
        console.log('❌ useCMSResultsCards - Page not found for slug:', pageSlug);
        setCards([]);
        return;
      }

      console.log('✅ useCMSResultsCards - Found page ID:', pageData.id);

      // Then, fetch cards for this page using the UUID
      const { data: cardsData, error: cardsError } = await supabase
        .from('cms_results_cards')
        .select('*')
        .eq('page_id', pageData.id)
        .eq('language', language)
        .eq('is_active', true)
        .order('card_order');

      console.log('📊 useCMSResultsCards - Cards query result:', { 
        cardsData, 
        cardsError,
        cardsCount: cardsData?.length || 0
      });

      if (cardsError) {
        console.error('💥 useCMSResultsCards - Cards fetch error:', cardsError);
        throw cardsError;
      }

      console.log('✅ useCMSResultsCards - Cards fetched successfully:', cardsData?.length || 0, 'cards');
      setCards(cardsData || []);
    } catch (error) {
      console.error('💥 useCMSResultsCards - General error:', error);
      setCards([]);
      
      toast({
        title: 'Erro ao carregar cards',
        description: 'Não foi possível carregar os cards da seção Results.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      console.log('🏁 useCMSResultsCards - Fetch completed');
    }
  }, [pageSlug, language, toast]);

  useEffect(() => {
    console.log('🔄 useCMSResultsCards - Effect triggered:', { pageSlug, language });
    fetchCards();
  }, [fetchCards]);

  console.log('📊 useCMSResultsCards - Final return:', {
    cardsLength: cards.length,
    loading
  });

  return {
    cards,
    loading,
    refetch: fetchCards,
  };
};
