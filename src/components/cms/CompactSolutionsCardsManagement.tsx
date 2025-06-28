
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Save, Trash2, GripVertical } from 'lucide-react';
import { useCMSCompactSolutionsCards } from '@/hooks/useCMSCompactSolutionsCards';
import LoadingSpinner from '@/components/common/LoadingSpinner';

interface CompactSolutionsCardsManagementProps {
  selectedPage: string;
  selectedLanguage: string;
}

const iconOptions = [
  { value: 'target', label: 'Target' },
  { value: 'users', label: 'Users' },
  { value: 'cog', label: 'Cog' },
  { value: 'trending-up', label: 'Trending Up' },
  { value: 'dollar-sign', label: 'Dollar Sign' },
  { value: 'bar-chart-3', label: 'Bar Chart' },
];

const CompactSolutionsCardsManagement: React.FC<CompactSolutionsCardsManagementProps> = ({
  selectedPage,
  selectedLanguage,
}) => {
  const { cards, loading, saveCards, deleteCard, setCards } = useCMSCompactSolutionsCards('home', selectedLanguage);
  const [saving, setSaving] = useState(false);

  const handleAddCard = () => {
    const newCard = {
      id: `temp-${Date.now()}`,
      card_order: cards.length + 1,
      title: 'Novo Card',
      description: 'Descrição do novo card',
      icon_name: 'target',
      engine_name: 'i6 RecSys',
      background_color: '#1E4A94',
      background_opacity: 1.0,
      is_active: true,
    };

    setCards(prev => [...prev, newCard]);
  };

  const handleUpdateCard = (cardId: string, field: string, value: any) => {
    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, [field]: value } : card
    ));
  };

  const handleSaveCards = async () => {
    setSaving(true);
    const success = await saveCards(cards);
    setSaving(false);
  };

  const handleDeleteCard = async (cardId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este card?')) {
      await deleteCard(cardId);
    }
  };

  const moveCard = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= cards.length) return;
    
    const newCards = [...cards];
    const [movedCard] = newCards.splice(fromIndex, 1);
    newCards.splice(toIndex, 0, movedCard);
    
    // Update card_order for all cards
    const updatedCards = newCards.map((card, index) => ({
      ...card,
      card_order: index + 1
    }));
    
    setCards(updatedCards);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          Gestão dos Cards da Seção Compact Solutions
        </h3>
        <div className="flex gap-2">
          <Button onClick={handleAddCard} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Card
          </Button>
          <Button onClick={handleSaveCards} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Salvando...' : 'Salvar Cards'}
          </Button>
        </div>
      </div>

      {cards.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-gray-400 mb-4">
              <Plus className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Nenhum card encontrado
            </h3>
            <p className="text-gray-500 mb-4">
              Comece adicionando o primeiro card da seção Compact Solutions.
            </p>
            <Button onClick={handleAddCard} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Primeiro Card
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {cards.map((card, index) => (
            <Card key={card.id} className={`transition-all duration-200 ${!card.is_active ? 'opacity-60' : ''}`}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                      <Badge variant="outline">
                        #{card.card_order}
                      </Badge>
                    </div>
                    <CardTitle className="text-base">
                      {card.title}
                    </CardTitle>
                    {!card.is_active && (
                      <Badge variant="secondary">Inativo</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => moveCard(index, index - 1)}
                      disabled={index === 0}
                    >
                      ↑
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => moveCard(index, index + 1)}
                      disabled={index === cards.length - 1}
                    >
                      ↓
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteCard(card.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`title-${card.id}`}>Título</Label>
                    <Input
                      id={`title-${card.id}`}
                      value={card.title}
                      onChange={(e) => handleUpdateCard(card.id, 'title', e.target.value)}
                      placeholder="Título do card"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`engine-${card.id}`}>Nome do Motor</Label>
                    <Input
                      id={`engine-${card.id}`}
                      value={card.engine_name}
                      onChange={(e) => handleUpdateCard(card.id, 'engine_name', e.target.value)}
                      placeholder="Ex: i6 RecSys, i6 ElasticPrice"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`icon-${card.id}`}>Ícone</Label>
                    <Select
                      value={card.icon_name}
                      onValueChange={(value) => handleUpdateCard(card.id, 'icon_name', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um ícone" />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`bg-color-${card.id}`}>Cor de Fundo</Label>
                    <div className="flex gap-2">
                      <Input
                        id={`bg-color-${card.id}`}
                        type="color"
                        value={card.background_color || '#1E4A94'}
                        onChange={(e) => handleUpdateCard(card.id, 'background_color', e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={card.background_color || '#1E4A94'}
                        onChange={(e) => handleUpdateCard(card.id, 'background_color', e.target.value)}
                        placeholder="#1E4A94"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`opacity-${card.id}`}>
                      Opacidade ({Math.round((card.background_opacity || 1) * 100)}%)
                    </Label>
                    <Input
                      id={`opacity-${card.id}`}
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={card.background_opacity || 1}
                      onChange={(e) => handleUpdateCard(card.id, 'background_opacity', parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`active-${card.id}`}
                      checked={card.is_active}
                      onCheckedChange={(checked) => handleUpdateCard(card.id, 'is_active', checked)}
                    />
                    <Label htmlFor={`active-${card.id}`}>Card Ativo</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`description-${card.id}`}>Descrição</Label>
                  <Textarea
                    id={`description-${card.id}`}
                    value={card.description}
                    onChange={(e) => handleUpdateCard(card.id, 'description', e.target.value)}
                    placeholder="Descrição do card"
                    rows={3}
                  />
                </div>

                {/* Preview do card */}
                <div className="pt-4">
                  <Label>Preview do Card</Label>
                  <div 
                    className="mt-2 p-4 rounded-lg text-white"
                    style={{ 
                      backgroundColor: card.background_color || '#1E4A94',
                      opacity: card.background_opacity || 1
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        {card.engine_name}
                      </Badge>
                    </div>
                    <h4 className="font-bold text-sm mb-2">{card.title}</h4>
                    <p className="text-xs text-white/90 line-clamp-2">{card.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompactSolutionsCardsManagement;
