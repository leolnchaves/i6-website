
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, GripVertical } from 'lucide-react';
import { useCMSSuccessStoriesCards } from '@/hooks/useCMSSuccessStoriesCards';
import SuccessStoryCardForm from './success-stories/SuccessStoryCardForm';
import SuccessStoryCardList from './success-stories/SuccessStoryCardList';

interface SuccessStoriesCardsManagementProps {
  selectedPage: string;
  selectedLanguage: string;
}

const SuccessStoriesCardsManagement: React.FC<SuccessStoriesCardsManagementProps> = ({
  selectedPage,
  selectedLanguage,
}) => {
  const { cards, loading, fetchCards, createCard, updateCard, deleteCard, reorderCards, updateIsActiveHome } = useCMSSuccessStoriesCards();
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (selectedPage) {
      fetchCards(selectedPage, selectedLanguage);
    }
  }, [selectedPage, selectedLanguage, fetchCards]);

  const handleCreateCard = () => {
    setEditingCard(null);
    setShowForm(true);
  };

  const handleEditCard = (cardId: string) => {
    setEditingCard(cardId);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCard(null);
  };

  const handleFormSubmit = async (formData: any) => {
    try {
      if (editingCard) {
        await updateCard(editingCard, formData);
      } else {
        // Get next card order
        const nextOrder = cards.length > 0 ? Math.max(...cards.map(c => c.card_order)) + 1 : 1;
        await createCard(selectedPage, selectedLanguage, {
          ...formData,
          card_order: nextOrder,
        });
      }
      handleFormClose();
    } catch (error) {
      console.error('Error saving card:', error);
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    if (window.confirm('Tem certeza que deseja remover este card?')) {
      await deleteCard(cardId);
    }
  };

  const handleReorder = async (cardIds: string[]) => {
    await reorderCards(selectedPage, selectedLanguage, cardIds);
  };

  const handleToggleActiveHome = async (cardId: string, isActiveHome: boolean) => {
    await updateIsActiveHome(cardId, isActiveHome);
  };

  if (loading) {
    return (
      <Card style={{ backgroundColor: '#f9fafb' }}>
        <CardHeader>
          <CardTitle>Gestão de Cards - Cases de Sucesso</CardTitle>
          <CardDescription>Carregando cards...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showForm) {
    return (
      <SuccessStoryCardForm
        card={editingCard ? cards.find(c => c.id === editingCard) : null}
        onSubmit={handleFormSubmit}
        onCancel={handleFormClose}
        isEditing={!!editingCard}
      />
    );
  }

  return (
    <Card style={{ backgroundColor: '#f9fafb' }}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Gestão de Cards - Cases de Sucesso</CardTitle>
            <CardDescription>
              Gerencie os cards que aparecem na seção Stories Grid
              <Badge variant="outline" className="ml-2">
                {selectedLanguage === 'en' ? '🇺🇸 English' : '🇧🇷 Português'}
              </Badge>
            </CardDescription>
          </div>
          <Button onClick={handleCreateCard} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Novo Card
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {cards.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">Nenhum card encontrado</p>
            <p className="text-sm mb-4">Clique em "Novo Card" para criar o primeiro card.</p>
            <Button onClick={handleCreateCard} variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Criar Primeiro Card
            </Button>
          </div>
        ) : (
          <SuccessStoryCardList
            cards={cards}
            onEdit={handleEditCard}
            onDelete={handleDeleteCard}
            onReorder={handleReorder}
            onToggleActiveHome={handleToggleActiveHome}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default SuccessStoriesCardsManagement;
