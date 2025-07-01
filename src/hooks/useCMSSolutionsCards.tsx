
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SolutionsCard {
  id: string;
  page_id: string;
  card_order: number;
  language: string;
  title: string;
  focus: string;
  description: string;
  features: string[];
  outcome: string;
  engine: string;
  gradient: string;
  bg_color: string;
  border_color: string;
  icon: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useCMSSolutionsCards = (pageSlug: string, language: string) => {
  const [cards, setCards] = useState<SolutionsCard[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchCards = useCallback(async (pageId?: string, lang?: string) => {
    const targetPageSlug = pageId || pageSlug;
    const targetLanguage = lang || language;
    
    if (!targetPageSlug || !targetLanguage) {
      console.log('useCMSSolutionsCards - Missing pageSlug or language:', { pageSlug: targetPageSlug, language: targetLanguage });
      return;
    }

    setLoading(true);
    try {
      console.log('useCMSSolutionsCards - Fetching solutions cards for page:', targetPageSlug, 'language:', targetLanguage);
      
      // First, get the page ID if we have a slug
      let resolvedPageId = targetPageSlug;
      
      // If the pageSlug looks like a slug (not a UUID), resolve it to page ID
      if (!targetPageSlug.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        const { data: pageData, error: pageError } = await supabase
          .from('cms_pages')
          .select('id')
          .eq('slug', targetPageSlug)
          .eq('is_active', true)
          .maybeSingle();

        if (pageError) {
          console.error('useCMSSolutionsCards - Error fetching page:', pageError);
          throw pageError;
        }

        if (!pageData) {
          console.log('useCMSSolutionsCards - Page not found:', targetPageSlug);
          setCards([]);
          return;
        }

        resolvedPageId = pageData.id;
        console.log('useCMSSolutionsCards - Resolved page ID:', resolvedPageId);
      }

      const { data, error } = await supabase
        .from('cms_solutions_cards')
        .select('*')
        .eq('page_id', resolvedPageId)
        .eq('language', targetLanguage)
        .order('card_order', { ascending: true });

      if (error) {
        console.error('useCMSSolutionsCards - Error fetching solutions cards:', error);
        throw error;
      }

      console.log('useCMSSolutionsCards - Solutions cards fetched successfully:', data?.length || 0, 'cards');
      console.log('useCMSSolutionsCards - Raw data:', data);
      setCards(data || []);
    } catch (error) {
      console.error('useCMSSolutionsCards - Failed to fetch solutions cards:', error);
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

  const saveCard = useCallback(async (cardData: Partial<SolutionsCard>) => {
    try {
      console.log('Saving solutions card:', cardData);
      
      const { data, error } = await supabase
        .from('cms_solutions_cards')
        .upsert(cardData)
        .select()
        .single();

      if (error) throw error;

      console.log('Solutions card saved:', data);
      await fetchCards();
      
      toast({
        title: 'Sucesso!',
        description: 'Card salvo com sucesso.',
      });

      return data;
    } catch (error) {
      console.error('Error saving solutions card:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao salvar o card.',
        variant: 'destructive',
      });
      throw error;
    }
  }, [fetchCards, toast]);

  const deleteCard = useCallback(async (cardId: string) => {
    try {
      console.log('Deleting solutions card:', cardId);
      
      const { error } = await supabase
        .from('cms_solutions_cards')
        .delete()
        .eq('id', cardId);

      if (error) throw error;

      console.log('Solutions card deleted');
      await fetchCards();
      
      toast({
        title: 'Sucesso!',
        description: 'Card excluído com sucesso.',
      });
    } catch (error) {
      console.error('Error deleting solutions card:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao excluir o card.',
        variant: 'destructive',
      });
      throw error;
    }
  }, [fetchCards, toast]);

  useEffect(() => {
    if (pageSlug && language) {
      fetchCards();
    }
  }, [fetchCards, pageSlug, language]);

  const refetch = useCallback(() => {
    return fetchCards();
  }, [fetchCards]);

  return {
    cards,
    loading,
    saveCard,
    deleteCard,
    refetch,
  };
};
