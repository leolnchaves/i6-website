
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SuccessStoryCard {
  id: string;
  page_id: string;
  card_order: number;
  language: string;
  industry: string;
  company_name: string;
  challenge: string;
  solution: string;
  metric1_value: string;
  metric1_label: string;
  metric2_value: string;
  metric2_label: string;
  metric3_value: string;
  metric3_label: string;
  customer_quote: string;
  customer_name: string;
  customer_title: string;
  image_url: string;
  is_active: boolean;
  is_active_home: boolean;
  created_at: string;
  updated_at: string;
}

export const useCMSSuccessStoriesCards = () => {
  const [cards, setCards] = useState<SuccessStoryCard[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Helper function to get page ID from slug
  const getPageId = useCallback(async (pageSlug: string) => {
    console.log('useCMSSuccessStoriesCards - Getting page ID for slug:', pageSlug);
    
    try {
      const { data: pageData, error: pageError } = await supabase
        .from('cms_pages')
        .select('id')
        .eq('slug', pageSlug)
        .eq('is_active', true)
        .maybeSingle();

      if (pageError) {
        console.error('useCMSSuccessStoriesCards - Page fetch error:', pageError);
        return null;
      }

      if (!pageData) {
        console.log('useCMSSuccessStoriesCards - Page not found for slug:', pageSlug);
        return null;
      }

      console.log('useCMSSuccessStoriesCards - Found page ID:', pageData.id);
      return pageData.id;
    } catch (error) {
      console.error('useCMSSuccessStoriesCards - Error getting page ID:', error);
      return null;
    }
  }, []);

  // Fetch cards for a specific page and language
  const fetchCards = useCallback(async (pageSlugOrId: string, language: string = 'en') => {
    try {
      console.log('useCMSSuccessStoriesCards - fetchCards called with:', { pageSlugOrId, language });
      setLoading(true);
      
      // Convert slug to page ID if needed
      let pageId = pageSlugOrId;
      
      // Check if it's a UUID (contains hyphens) or a slug
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(pageSlugOrId);
      
      if (!isUuid) {
        console.log('useCMSSuccessStoriesCards - Converting slug to page ID:', pageSlugOrId);
        const convertedPageId = await getPageId(pageSlugOrId);
        if (!convertedPageId) {
          console.log('useCMSSuccessStoriesCards - Could not convert slug to page ID');
          setCards([]);
          return;
        }
        pageId = convertedPageId;
      }

      console.log('useCMSSuccessStoriesCards - Using page ID:', pageId);

      // Fetch cards for the specific page and language
      let { data, error } = await supabase
        .from('cms_success_stories_cards')
        .select('*')
        .eq('page_id', pageId)
        .eq('language', language)
        .eq('is_active', true)
        .order('card_order');

      console.log('useCMSSuccessStoriesCards - Primary query result:', { data, error });

      // If no cards found for the specific page/language, try without page restriction
      if ((!data || data.length === 0) && !error) {
        console.log('useCMSSuccessStoriesCards - No cards found for specific page, trying language-only query');
        
        const fallbackQuery = await supabase
          .from('cms_success_stories_cards')
          .select('*')
          .eq('language', language)
          .eq('is_active', true)
          .order('card_order');
          
        data = fallbackQuery.data;
        error = fallbackQuery.error;
        
        console.log('useCMSSuccessStoriesCards - Fallback query result:', { data, error });
      }

      if (error) throw error;
      
      console.log('useCMSSuccessStoriesCards - Final cards fetched:', data?.length || 0);
      console.log('useCMSSuccessStoriesCards - Cards data:', data);
      
      // Log cards with is_active_home = true
      const homeActiveCards = data?.filter(card => card.is_active_home) || [];
      console.log('useCMSSuccessStoriesCards - Cards with is_active_home=true:', homeActiveCards.length);
      console.log('useCMSSuccessStoriesCards - Home active cards:', homeActiveCards);
      
      setCards(data || []);
    } catch (error) {
      console.error('Error fetching success stories cards:', error);
      toast({
        title: 'Erro ao carregar cards',
        description: 'Não foi possível carregar os cards de cases de sucesso.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast, getPageId]);

  // Create a new card
  const createCard = useCallback(async (pageSlugOrId: string, language: string, cardData: Omit<SuccessStoryCard, 'id' | 'page_id' | 'language' | 'created_at' | 'updated_at'>) => {
    try {
      // Convert slug to page ID if needed
      let pageId = pageSlugOrId;
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(pageSlugOrId);
      
      if (!isUuid) {
        const convertedPageId = await getPageId(pageSlugOrId);
        if (!convertedPageId) {
          throw new Error('Could not find page');
        }
        pageId = convertedPageId;
      }

      const { data, error } = await supabase
        .from('cms_success_stories_cards')
        .insert({
          page_id: pageId,
          language,
          ...cardData,
        })
        .select()
        .single();

      if (error) throw error;

      setCards(prev => [...prev, data].sort((a, b) => a.card_order - b.card_order));
      
      toast({
        title: 'Card criado',
        description: 'O card foi criado com sucesso.',
      });

      return data;
    } catch (error) {
      console.error('Error creating card:', error);
      toast({
        title: 'Erro ao criar card',
        description: 'Não foi possível criar o card.',
        variant: 'destructive',
      });
      throw error;
    }
  }, [toast, getPageId]);

  // Update an existing card
  const updateCard = useCallback(async (cardId: string, updates: Partial<SuccessStoryCard>) => {
    try {
      const { data, error } = await supabase
        .from('cms_success_stories_cards')
        .update(updates)
        .eq('id', cardId)
        .select()
        .single();

      if (error) throw error;

      setCards(prev => 
        prev.map(card => 
          card.id === cardId ? { ...card, ...data } : card
        ).sort((a, b) => a.card_order - b.card_order)
      );

      toast({
        title: 'Card atualizado',
        description: 'O card foi atualizado com sucesso.',
      });

      return data;
    } catch (error) {
      console.error('Error updating card:', error);
      toast({
        title: 'Erro ao atualizar card',
        description: 'Não foi possível atualizar o card.',
        variant: 'destructive',
      });
      throw error;
    }
  }, [toast]);

  // Update is_active_home field
  const updateIsActiveHome = useCallback(async (cardId: string, isActiveHome: boolean) => {
    try {
      const { data, error } = await supabase
        .from('cms_success_stories_cards')
        .update({ is_active_home: isActiveHome })
        .eq('id', cardId)
        .select()
        .single();

      if (error) throw error;

      setCards(prev => 
        prev.map(card => 
          card.id === cardId ? { ...card, is_active_home: isActiveHome } : card
        )
      );

      toast({
        title: isActiveHome ? 'Card ativado na home' : 'Card desativado na home',
        description: isActiveHome 
          ? 'O card agora será exibido na seção de destaque da home.'
          : 'O card não será mais exibido na seção de destaque da home.',
      });

      return data;
    } catch (error) {
      console.error('Error updating is_active_home:', error);
      toast({
        title: 'Erro ao atualizar status na home',
        description: 'Não foi possível atualizar o status do card na home.',
        variant: 'destructive',
      });
      throw error;
    }
  }, [toast]);

  // Delete a card (soft delete)
  const deleteCard = useCallback(async (cardId: string) => {
    try {
      const { error } = await supabase
        .from('cms_success_stories_cards')
        .update({ is_active: false })
        .eq('id', cardId);

      if (error) throw error;

      setCards(prev => prev.filter(card => card.id !== cardId));

      toast({
        title: 'Card removido',
        description: 'O card foi removido com sucesso.',
      });
    } catch (error) {
      console.error('Error deleting card:', error);
      toast({
        title: 'Erro ao remover card',
        description: 'Não foi possível remover o card.',
        variant: 'destructive',
      });
      throw error;
    }
  }, [toast]);

  // Reorder cards
  const reorderCards = useCallback(async (pageSlugOrId: string, language: string, cardIds: string[]) => {
    try {
      const updates = cardIds.map((cardId, index) => ({
        id: cardId,
        card_order: index + 1,
      }));

      for (const update of updates) {
        await supabase
          .from('cms_success_stories_cards')
          .update({ card_order: update.card_order })
          .eq('id', update.id);
      }

      // Refresh cards after reordering
      await fetchCards(pageSlugOrId, language);

      toast({
        title: 'Ordem atualizada',
        description: 'A ordem dos cards foi atualizada com sucesso.',
      });
    } catch (error) {
      console.error('Error reordering cards:', error);
      toast({
        title: 'Erro ao reordenar',
        description: 'Não foi possível reordenar os cards.',
        variant: 'destructive',
      });
      throw error;
    }
  }, [fetchCards, toast]);

  return {
    cards,
    loading,
    fetchCards,
    createCard,
    updateCard,
    updateIsActiveHome,
    deleteCard,
    reorderCards,
  };
};
