
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CompactSolutionsCard {
  id?: string;
  page_id: string;
  card_order: number;
  language: string;
  engine_name: string;
  title: string;
  description: string;
  icon_name: string;
  background_color: string;
  background_opacity: number;
  is_active: boolean;
}

export const useCMSCompactSolutionsCards = () => {
  const [cards, setCards] = useState<CompactSolutionsCard[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchCards = async (pageId: string, language: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cms_compact_solutions_cards')
        .select('*')
        .eq('page_id', pageId)
        .eq('language', language)
        .order('card_order');

      if (error) throw error;
      setCards(data || []);
    } catch (error) {
      console.error('Error fetching compact solutions cards:', error);
      toast({
        title: 'Erro ao carregar cards',
        description: 'Não foi possível carregar os cards das soluções compactas.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const saveCards = async (cardsData: CompactSolutionsCard[]) => {
    setLoading(true);
    try {
      // First, delete existing cards for this page and language
      const firstCard = cardsData[0];
      if (firstCard) {
        const { error: deleteError } = await supabase
          .from('cms_compact_solutions_cards')
          .delete()
          .eq('page_id', firstCard.page_id)
          .eq('language', firstCard.language);

        if (deleteError) throw deleteError;
      }

      // Then insert new cards
      const { error: insertError } = await supabase
        .from('cms_compact_solutions_cards')
        .insert(cardsData.map(card => ({
          page_id: card.page_id,
          card_order: card.card_order,
          language: card.language,
          engine_name: card.engine_name,
          title: card.title,
          description: card.description,
          icon_name: card.icon_name,
          background_color: card.background_color,
          background_opacity: card.background_opacity,
          is_active: card.is_active,
        })));

      if (insertError) throw insertError;

      toast({
        title: 'Cards salvos',
        description: 'Os cards das soluções compactas foram salvos com sucesso.',
      });

      // Refresh the cards
      if (firstCard) {
        await fetchCards(firstCard.page_id, firstCard.language);
      }
    } catch (error) {
      console.error('Error saving compact solutions cards:', error);
      toast({
        title: 'Erro ao salvar cards',
        description: 'Não foi possível salvar os cards das soluções compactas.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleCardActive = async (cardId: string, isActive: boolean) => {
    try {
      // Update the card in all languages
      const { error } = await supabase
        .from('cms_compact_solutions_cards')
        .update({ is_active: isActive })
        .eq('id', cardId);

      if (error) throw error;

      // Update local state
      setCards(prev => prev.map(card => 
        card.id === cardId ? { ...card, is_active: isActive } : card
      ));

      toast({
        title: isActive ? 'Card ativado' : 'Card desativado',
        description: `O card foi ${isActive ? 'ativado' : 'desativado'} com sucesso.`,
      });
    } catch (error) {
      console.error('Error toggling card active state:', error);
      toast({
        title: 'Erro ao alterar status',
        description: 'Não foi possível alterar o status do card.',
        variant: 'destructive',
      });
    }
  };

  return {
    cards,
    loading,
    fetchCards,
    saveCards,
    toggleCardActive,
  };
};
