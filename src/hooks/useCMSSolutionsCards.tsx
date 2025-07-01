
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

export const useCMSSolutionsCards = (pageSlugOrId: string, language: string) => {
  const [cards, setCards] = useState<SolutionsCard[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Helper function to get page ID from slug
  const getPageId = useCallback(async (pageSlug: string) => {
    console.log('useCMSSolutionsCards - Getting page ID for slug:', pageSlug);
    
    try {
      const { data: pageData, error: pageError } = await supabase
        .from('cms_pages')
        .select('id')
        .eq('slug', pageSlug)
        .eq('is_active', true)
        .maybeSingle();

      if (pageError) {
        console.error('useCMSSolutionsCards - Page fetch error:', pageError);
        return null;
      }

      if (!pageData) {
        console.log('useCMSSolutionsCards - Page not found for slug:', pageSlug);
        return null;
      }

      console.log('useCMSSolutionsCards - Found page ID:', pageData.id);
      return pageData.id;
    } catch (error) {
      console.error('useCMSSolutionsCards - Error getting page ID:', error);
      return null;
    }
  }, []);

  const fetchCards = useCallback(async () => {
    if (!pageSlugOrId || !language) {
      console.log('useCMSSolutionsCards - Missing pageSlugOrId or language:', { pageSlugOrId, language });
      setCards([]);
      return;
    }

    setLoading(true);
    try {
      console.log('useCMSSolutionsCards - Fetching solutions cards for:', pageSlugOrId, 'language:', language);
      
      // Convert slug to page ID if needed
      let pageId = pageSlugOrId;
      
      // Check if it's a UUID (contains hyphens) or a slug
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(pageSlugOrId);
      
      if (!isUuid) {
        console.log('useCMSSolutionsCards - Converting slug to page ID:', pageSlugOrId);
        const convertedPageId = await getPageId(pageSlugOrId);
        if (!convertedPageId) {
          console.log('useCMSSolutionsCards - Could not convert slug to page ID, setting empty cards');
          setCards([]);
          return;
        }
        pageId = convertedPageId;
      }

      console.log('useCMSSolutionsCards - Using page ID:', pageId);
      
      const { data, error } = await supabase
        .from('cms_solutions_cards')
        .select('*')
        .eq('page_id', pageId)
        .eq('language', language)
        .eq('is_active', true)
        .order('card_order', { ascending: true });

      if (error) {
        console.error('useCMSSolutionsCards - Error fetching solutions cards:', error);
        throw error;
      }

      console.log('useCMSSolutionsCards - Solutions cards fetched successfully:', data?.length || 0, 'cards');
      console.log('useCMSSolutionsCards - Cards data:', data);
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
  }, [pageSlugOrId, language, toast, getPageId]);

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
    fetchCards();
  }, [fetchCards]);

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
