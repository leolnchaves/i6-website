
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface FAQCard {
  id: string;
  page_id: string;
  question: string;
  answer: string;
  card_order: number;
  language: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useCMSFAQCards = () => {
  const [cards, setCards] = useState<FAQCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = useCallback(async (pageId: string, language: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('cms_faq_cards')
        .select('*')
        .eq('page_id', pageId)
        .eq('language', language)
        .eq('is_active', true)
        .order('card_order', { ascending: true });

      if (fetchError) {
        console.error('Error fetching FAQ cards:', fetchError);
        setError('Erro ao carregar cards de FAQ');
        return;
      }

      setCards(data || []);
    } catch (err) {
      console.error('Error in fetchCards:', err);
      setError('Erro inesperado');
    } finally {
      setLoading(false);
    }
  }, []);

  const saveCard = useCallback(async (card: Omit<FAQCard, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      setError(null);

      const { data, error: saveError } = await supabase
        .from('cms_faq_cards')
        .insert(card)
        .select()
        .single();

      if (saveError) {
        console.error('Error saving FAQ card:', saveError);
        setError('Erro ao salvar card de FAQ');
        return null;
      }

      return data;
    } catch (err) {
      console.error('Error in saveCard:', err);
      setError('Erro inesperado');
      return null;
    }
  }, []);

  const updateCard = useCallback(async (id: string, updates: Partial<FAQCard>) => {
    try {
      setError(null);

      const { data, error: updateError } = await supabase
        .from('cms_faq_cards')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating FAQ card:', updateError);
        setError('Erro ao atualizar card de FAQ');
        return null;
      }

      return data;
    } catch (err) {
      console.error('Error in updateCard:', err);
      setError('Erro inesperado');
      return null;
    }
  }, []);

  const deleteCard = useCallback(async (id: string) => {
    try {
      setError(null);

      const { error: deleteError } = await supabase
        .from('cms_faq_cards')
        .delete()
        .eq('id', id);

      if (deleteError) {
        console.error('Error deleting FAQ card:', deleteError);
        setError('Erro ao deletar card de FAQ');
        return false;
      }

      return true;
    } catch (err) {
      console.error('Error in deleteCard:', err);
      setError('Erro inesperado');
      return false;
    }
  }, []);

  const reorderCards = useCallback(async (cardUpdates: { id: string; card_order: number }[]) => {
    try {
      setError(null);

      // Update multiple cards with their new order
      const updatePromises = cardUpdates.map(({ id, card_order }) =>
        supabase
          .from('cms_faq_cards')
          .update({ card_order })
          .eq('id', id)
      );

      const results = await Promise.all(updatePromises);
      
      // Check if any update failed
      const hasError = results.some(result => result.error);
      if (hasError) {
        console.error('Error reordering FAQ cards');
        setError('Erro ao reordenar cards de FAQ');
        return false;
      }

      return true;
    } catch (err) {
      console.error('Error in reorderCards:', err);
      setError('Erro inesperado');
      return false;
    }
  }, []);

  return {
    cards,
    loading,
    error,
    fetchCards,
    saveCard,
    updateCard,
    deleteCard,
    reorderCards,
  };
};
