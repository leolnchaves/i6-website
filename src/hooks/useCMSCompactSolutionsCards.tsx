import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CMSCompactSolutionsCard {
  id: string;
  card_order: number;
  title: string;
  description: string;
  icon_name: string;
  engine_name: string;
  background_color: string | null;
  background_opacity: number | null;
  is_active: boolean;
}

export const useCMSCompactSolutionsCards = (pageSlug: string = 'home', language: string = 'en') => {
  const [cards, setCards] = useState<CMSCompactSolutionsCard[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCards = useCallback(async () => {
    try {
      setLoading(true);
      console.log('useCMSCompactSolutionsCards - Fetching cards for page:', pageSlug, 'language:', language);

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

      console.log('useCMSCompactSolutionsCards - Found page ID:', pageData.id);

      // Then, fetch ALL cards for this page (including inactive ones for CMS management)
      const { data: cardsData, error: cardsError } = await supabase
        .from('cms_compact_solutions_cards')
        .select('*')
        .eq('page_id', pageData.id)
        .eq('language', language)
        .order('card_order');

      if (cardsError) {
        console.error('Error fetching cards:', cardsError);
        toast({
          title: 'Erro ao carregar cards',
          description: 'Não foi possível carregar os cards da seção Compact Solutions.',
          variant: 'destructive',
        });
        return;
      }

      console.log('useCMSCompactSolutionsCards - Fetched cards:', cardsData?.length || 0);
      console.log('useCMSCompactSolutionsCards - Cards data:', cardsData);
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

  const saveCards = useCallback(async (updatedCards: CMSCompactSolutionsCard[]) => {
    try {
      console.log('useCMSCompactSolutionsCards - Saving cards:', updatedCards);

      // Get page ID first
      const { data: pageData, error: pageError } = await supabase
        .from('cms_pages')
        .select('id')
        .eq('slug', pageSlug)
        .eq('is_active', true)
        .maybeSingle();

      if (pageError || !pageData) {
        console.error('Error fetching page for save:', pageError);
        toast({
          title: 'Erro ao salvar',
          description: 'Não foi possível encontrar a página.',
          variant: 'destructive',
        });
        return false;
      }

      // Update existing cards and insert new ones
      const savePromises = updatedCards.map(async (card) => {
        const cardData = {
          page_id: pageData.id,
          language,
          card_order: card.card_order,
          title: card.title,
          description: card.description,
          icon_name: card.icon_name,
          engine_name: card.engine_name,
          background_color: card.background_color,
          background_opacity: card.background_opacity,
          is_active: card.is_active,
        };

        if (card.id && card.id.startsWith('temp-')) {
          // New card - insert
          delete cardData.id;
          const { error } = await supabase
            .from('cms_compact_solutions_cards')
            .insert(cardData);
          
          if (error) {
            console.error('Error inserting new card:', error);
            throw error;
          }
        } else {
          // Existing card - update
          const { error } = await supabase
            .from('cms_compact_solutions_cards')
            .update(cardData)
            .eq('id', card.id);
          
          if (error) {
            console.error('Error updating card:', error);
            throw error;
          }
        }
      });

      await Promise.all(savePromises);

      toast({
        title: 'Cards salvos com sucesso',
        description: 'As alterações nos cards foram salvas.',
      });

      // Refresh cards after saving
      await fetchCards();
      return true;
    } catch (error) {
      console.error('Error saving cards:', error);
      toast({
        title: 'Erro ao salvar cards',
        description: 'Não foi possível salvar as alterações nos cards.',
        variant: 'destructive',
      });
      return false;
    }
  }, [pageSlug, language, toast, fetchCards]);

  const deleteCard = useCallback(async (cardId: string) => {
    try {
      console.log('useCMSCompactSolutionsCards - Deleting card:', cardId);

      if (cardId.startsWith('temp-')) {
        // New card that hasn't been saved yet - just remove from local state
        setCards(prev => prev.filter(card => card.id !== cardId));
        return true;
      }

      const { error } = await supabase
        .from('cms_compact_solutions_cards')
        .delete()
        .eq('id', cardId);

      if (error) {
        console.error('Error deleting card:', error);
        toast({
          title: 'Erro ao excluir card',
          description: 'Não foi possível excluir o card.',
          variant: 'destructive',
        });
        return false;
      }

      toast({
        title: 'Card excluído',
        description: 'O card foi excluído com sucesso.',
      });

      // Refresh cards after deletion
      await fetchCards();
      return true;
    } catch (error) {
      console.error('Error deleting card:', error);
      toast({
        title: 'Erro inesperado',
        description: 'Ocorreu um erro ao excluir o card.',
        variant: 'destructive',
      });
      return false;
    }
  }, [toast, fetchCards]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return {
    cards,
    loading,
    refetch: fetchCards,
    saveCards,
    deleteCard,
    setCards,
  };
};
