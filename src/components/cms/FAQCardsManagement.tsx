import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Edit, Trash2, Save, X, GripVertical } from 'lucide-react';
// import { useCMSFAQCards } from '@/hooks/useCMSFAQCards'; // Removed - using static data only
import LoadingSpinner from '@/components/common/LoadingSpinner';

interface FAQCardsManagementProps {
  selectedPage: string;
  selectedLanguage: string;
}

const FAQCardsManagement: React.FC<FAQCardsManagementProps> = ({
  selectedPage,
  selectedLanguage,
}) => {
  // const { cards, loading, error, fetchCards, saveCard, updateCard, deleteCard } = useCMSFAQCards();
  // Temporarily disabled - using static data only
  const cards = [];
  const loading = false;
  const error = null;
  const fetchCards = async () => {};
  const saveCard = async () => {};
  const updateCard = async () => {};
  const deleteCard = async () => {};
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [newCard, setNewCard] = useState({
    question: '',
    answer: '',
  });
  const [editedCard, setEditedCard] = useState({
    question: '',
    answer: '',
  });
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (selectedPage) {
      // fetchCards(selectedPage, selectedLanguage); // Disabled - using static data only
    }
  }, [selectedPage, selectedLanguage]);

  const handleAddCard = async () => {
    if (!newCard.question.trim() || !newCard.answer.trim()) return;

    setSaving(true);
    const maxOrder = cards.length > 0 ? Math.max(...cards.map(c => c.card_order)) : 0;
    
    const cardData = {
      page_id: selectedPage,
      question: newCard.question.trim(),
      answer: newCard.answer.trim(),
      card_order: maxOrder + 1,
      language: selectedLanguage,
      is_active: true,
    };

    // const result = await saveCard(cardData); // Disabled - using static data only
    const result = true; // Simulate success
    if (result) {
      setNewCard({ question: '', answer: '' });
      setShowNewCardForm(false);
      // fetchCards(selectedPage, selectedLanguage); // Disabled - using static data only
    }
    setSaving(false);
  };

  const handleEditCard = (card: any) => {
    setEditingCard(card.id);
    setEditedCard({
      question: card.question,
      answer: card.answer,
    });
  };

  const handleSaveEdit = async () => {
    if (!editingCard || !editedCard.question.trim() || !editedCard.answer.trim()) return;

    setSaving(true);
    // const result = await updateCard(editingCard, {
    //   question: editedCard.question.trim(),
    //   answer: editedCard.answer.trim(),
    // }); // Disabled - using static data only
    const result = true; // Simulate success

    if (result) {
      setEditingCard(null);
      setEditedCard({ question: '', answer: '' });
      // fetchCards(selectedPage, selectedLanguage); // Disabled - using static data only
    }
    setSaving(false);
  };

  const handleDeleteCard = async (cardId: string) => {
    if (!confirm('Tem certeza que deseja deletar este card de FAQ?')) return;

    setSaving(true);
    // const success = await deleteCard(cardId); // Disabled - using static data only
    const success = true; // Simulate success
    if (success) {
      // fetchCards(selectedPage, selectedLanguage); // Disabled - using static data only
    }
    setSaving(false);
  };

  const handleCancelEdit = () => {
    setEditingCard(null);
    setEditedCard({ question: '', answer: '' });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Gestão de Cards FAQ</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Gerencie as perguntas e respostas frequentes da página de contato
              </p>
            </div>
            <Badge variant="outline">
              {cards.length} {cards.length === 1 ? 'card' : 'cards'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Add New Card Form */}
          {showNewCardForm && (
            <Card className="mb-6 border-dashed">
              <CardHeader>
                <CardTitle className="text-lg">Novo Card FAQ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="new-question">Pergunta</Label>
                  <Input
                    id="new-question"
                    value={newCard.question}
                    onChange={(e) => setNewCard(prev => ({ ...prev, question: e.target.value }))}
                    placeholder="Digite a pergunta..."
                  />
                </div>
                <div>
                  <Label htmlFor="new-answer">Resposta</Label>
                  <Textarea
                    id="new-answer"
                    value={newCard.answer}
                    onChange={(e) => setNewCard(prev => ({ ...prev, answer: e.target.value }))}
                    placeholder="Digite a resposta..."
                    rows={4}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddCard} disabled={saving || !newCard.question.trim() || !newCard.answer.trim()}>
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? 'Salvando...' : 'Salvar Card'}
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setShowNewCardForm(false);
                    setNewCard({ question: '', answer: '' });
                  }}>
                    <X className="h-4 w-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Add Card Button */}
          {!showNewCardForm && (
            <Button 
              onClick={() => setShowNewCardForm(true)} 
              className="mb-6"
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Card FAQ
            </Button>
          )}

          {/* Existing Cards */}
          <div className="space-y-4">
            {cards.length === 0 && !showNewCardForm && (
              <div className="text-center py-8 text-gray-500">
                <p>Nenhum card FAQ encontrado.</p>
                <p className="text-sm">Clique em "Adicionar Card FAQ" para começar.</p>
              </div>
            )}

            {cards.map((card, index) => (
              <Card key={card.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-gray-400" />
                      <Badge variant="secondary">#{index + 1}</Badge>
                    </div>
                    <div className="flex gap-2">
                      {editingCard === card.id ? (
                        <>
                          <Button size="sm" onClick={handleSaveEdit} disabled={saving}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" variant="outline" onClick={() => handleEditCard(card)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteCard(card.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {editingCard === card.id ? (
                    <div className="space-y-4">
                      <div>
                        <Label>Pergunta</Label>
                        <Input
                          value={editedCard.question}
                          onChange={(e) => setEditedCard(prev => ({ ...prev, question: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>Resposta</Label>
                        <Textarea
                          value={editedCard.answer}
                          onChange={(e) => setEditedCard(prev => ({ ...prev, answer: e.target.value }))}
                          rows={4}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Pergunta</Label>
                        <p className="text-gray-900 font-medium">{card.question}</p>
                      </div>
                      <Separator />
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Resposta</Label>
                        <p className="text-gray-700 whitespace-pre-wrap">{card.answer}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQCardsManagement;
