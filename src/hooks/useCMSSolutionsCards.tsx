
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

export const useCMSSolutionsCards = (pageId: string, language: string) => {
  const [cards, setCards] = useState<SolutionsCard[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchCards = useCallback(async () => {
    if (!pageId || !language) {
      console.log('Missing pageId or language:', { pageId, language });
      return;
    }

    setLoading(true);
    try {
      console.log('Fetching solutions cards for page:', pageId, 'language:', language);
      
      const { data, error } = await supabase
        .from('cms_solutions_cards')
        .select('*')
        .eq('page_id', pageId)
        .eq('language', language)
        .eq('is_active', true)
        .order('card_order', { ascending: true });

      if (error) {
        console.error('Error fetching solutions cards:', error);
        throw error;
      }

      console.log('Solutions cards fetched successfully:', data?.length || 0, 'cards');
      console.log('Raw data:', data);
      setCards(data || []);
    } catch (error) {
      console.error('Failed to fetch solutions cards:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao carregar os cards de soluções.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [pageId, language, toast]);

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
