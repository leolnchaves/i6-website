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

  // Fetch cards for a specific page and language
  const fetchCards = useCallback(async (pageId: string, language: string = 'en') => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cms_success_stories_cards')
        .select('*')
        .eq('page_id', pageId)
        .eq('language', language)
        .eq('is_active', true)
        .order('card_order');

      if (error) throw error;
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
  }, [toast]);

  // Create a new card
  const createCard = useCallback(async (pageId: string, language: string, cardData: Omit<SuccessStoryCard, 'id' | 'page_id' | 'language' | 'created_at' | 'updated_at'>) => {
    try {
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
  }, [toast]);

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
  const reorderCards = useCallback(async (pageId: string, language: string, cardIds: string[]) => {
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
      await fetchCards(pageId, language);

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
