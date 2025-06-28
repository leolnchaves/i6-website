
import React, { useState, useEffect } from 'react';
import { useCMSResultsCards } from '@/hooks/useCMSResultsCards';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import CardsHeader from './cards/CardsHeader';
import CardForm from './cards/CardForm';
import EmptyCardsState from './cards/EmptyCardsState';

interface ResultsCardsManagementProps {
  selectedPage: string;
  selectedLanguage: string;
}

interface CardFormData {
  id?: string;
  title: string;
  description: string;
  icon_name: string;
  icon_color: string;
  background_color: string;
  background_opacity: number;
  is_active: boolean;
  card_order: number;
}

const availableIcons = [
  { value: 'trending-up', label: 'Trending Up' },
  { value: 'shield', label: 'Shield' },
  { value: 'award', label: 'Award' },
  { value: 'clock', label: 'Clock' },
  { value: 'target', label: 'Target' },
  { value: 'dollar-sign', label: 'Dollar Sign' },
  { value: 'eye', label: 'Eye' },
  { value: 'shopping-cart', label: 'Shopping Cart' },
  { value: 'search', label: 'Search' },
  { value: 'users', label: 'Users' },
];

const defaultColors = [
  '#f97316', '#3b82f6', '#6366f1', '#ef4444', '#ea580c',
  '#ec4899', '#14b8a6', '#22c55e', '#a855f7', '#2563eb'
];

const ResultsCardsManagement: React.FC<ResultsCardsManagementProps> = ({
  selectedPage,
  selectedLanguage,
}) => {
  const { cards, loading, refetch } = useCMSResultsCards('home', selectedLanguage);
  const [formCards, setFormCards] = useState<CardFormData[]>([]);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (cards.length > 0) {
      const cardData = cards.map(card => ({
        id: card.id,
        title: card.title,
        description: card.description,
        icon_name: card.icon_name,
        icon_color: card.icon_color,
        background_color: card.background_color || '',
        background_opacity: card.background_opacity || 1.0,
        is_active: card.is_active,
        card_order: card.card_order,
      }));
      setFormCards(cardData);
    }
  }, [cards]);

  const handleCardChange = (index: number, field: keyof CardFormData, value: any) => {
    const updatedCards = [...formCards];
    updatedCards[index] = { ...updatedCards[index], [field]: value };
    setFormCards(updatedCards);
  };

  const addNewCard = () => {
    const newCard: CardFormData = {
      title: '',
      description: '',
      icon_name: 'trending-up',
      icon_color: '#f97316',
      background_color: '',
      background_opacity: 1.0,
      is_active: true,
      card_order: formCards.length + 1,
    };
    setFormCards([...formCards, newCard]);
  };

  const removeCard = (index: number) => {
    const updatedCards = formCards.filter((_, i) => i !== index);
    const reorderedCards = updatedCards.map((card, i) => ({
      ...card,
      card_order: i + 1,
    }));
    setFormCards(reorderedCards);
  };

  const moveCard = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === formCards.length - 1)
    ) {
      return;
    }

    const updatedCards = [...formCards];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    [updatedCards[index], updatedCards[targetIndex]] = [updatedCards[targetIndex], updatedCards[index]];
    
    updatedCards.forEach((card, i) => {
      card.card_order = i + 1;
    });

    setFormCards(updatedCards);
  };

  const syncCardStatusAcrossLanguages = async (cardOrder: number, isActive: boolean) => {
    try {
      console.log(`Syncing card at order ${cardOrder} to is_active: ${isActive} across all languages`);
      
      const { error } = await supabase
        .from('cms_results_cards')
        .update({ is_active: isActive })
        .eq('page_id', selectedPage)
        .eq('card_order', cardOrder);

      if (error) {
        console.error('Error syncing card status across languages:', error);
        throw error;
      }

      console.log(`Successfully synced card status across languages for card order ${cardOrder}`);
    } catch (error) {
      console.error('Failed to sync card status:', error);
      toast({
        title: 'Aviso',
        description: 'Não foi possível sincronizar o status do card em todos os idiomas.',
        variant: 'destructive',
      });
    }
  };

  const handleCardChangeWithSync = async (index: number, field: keyof CardFormData, value: any) => {
    const updatedCards = [...formCards];
    updatedCards[index] = { ...updatedCards[index], [field]: value };
    setFormCards(updatedCards);

    if (field === 'is_active' && selectedPage) {
      const cardOrder = updatedCards[index].card_order;
      await syncCardStatusAcrossLanguages(cardOrder, value as boolean);
      
      toast({
        title: 'Status Sincronizado',
        description: `Card ${value ? 'ativado' : 'desativado'} em todos os idiomas.`,
      });
    }
  };

  const saveCards = async () => {
    if (!selectedPage) return;

    setSaving(true);
    try {
      console.log('Saving cards with data:', formCards);

      const { error: deleteError } = await supabase
        .from('cms_results_cards')
        .delete()
        .eq('page_id', selectedPage)
        .eq('language', selectedLanguage);

      if (deleteError) throw deleteError;

      if (formCards.length > 0) {
        const cardsToInsert = formCards.map(card => {
          console.log(`Card "${card.title}" - is_active: ${card.is_active}`);
          return {
            page_id: selectedPage,
            title: card.title,
            description: card.description,
            icon_name: card.icon_name,
            icon_color: card.icon_color,
            background_color: card.background_color || null,
            background_opacity: card.background_opacity,
            is_active: card.is_active,
            card_order: card.card_order,
            language: selectedLanguage,
          };
        });

        console.log('Cards to insert:', cardsToInsert);

        const { error: insertError } = await supabase
          .from('cms_results_cards')
          .insert(cardsToInsert);

        if (insertError) throw insertError;
      }

      await refetch();
      toast({
        title: 'Sucesso!',
        description: 'Cards salvos com sucesso.',
      });
    } catch (error) {
      console.error('Error saving cards:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar os cards.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-500">Carregando cards...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CardsHeader
        onAddCard={addNewCard}
        onSaveCards={saveCards}
        saving={saving}
      />

      <div className="space-y-4">
        {formCards.map((card, index) => (
          <CardForm
            key={index}
            card={card}
            index={index}
            availableIcons={availableIcons}
            defaultColors={defaultColors}
            totalCards={formCards.length}
            onChange={handleCardChange}
            onMove={moveCard}
            onRemove={removeCard}
            onToggleActive={handleCardChangeWithSync}
          />
        ))}

        {formCards.length === 0 && (
          <EmptyCardsState onAddCard={addNewCard} />
        )}
      </div>
    </div>
  );
};

export default ResultsCardsManagement;
