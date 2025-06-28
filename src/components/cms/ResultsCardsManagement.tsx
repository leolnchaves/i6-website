
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Save, Trash2, GripVertical, Eye, EyeOff } from 'lucide-react';
import { useCMSResultsCards } from '@/hooks/useCMSResultsCards';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
    // Reorder cards
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
    
    // Update card_order
    updatedCards.forEach((card, i) => {
      card.card_order = i + 1;
    });

    setFormCards(updatedCards);
  };

  const saveCards = async () => {
    if (!selectedPage) return;

    setSaving(true);
    try {
      // First, delete all existing cards for this page and language
      const { error: deleteError } = await supabase
        .from('cms_results_cards')
        .delete()
        .eq('page_id', selectedPage)
        .eq('language', selectedLanguage);

      if (deleteError) throw deleteError;

      // Then, insert all cards
      if (formCards.length > 0) {
        const cardsToInsert = formCards.map(card => ({
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
        }));

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
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          Gestão dos Cards da Seção Results
        </h3>
        <div className="flex gap-2">
          <Button onClick={addNewCard} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Card
          </Button>
          <Button onClick={saveCards} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Salvando...' : 'Salvar Cards'}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {formCards.map((card, index) => (
          <Card key={index} className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-gray-400" />
                  <CardTitle className="text-sm">
                    Card {index + 1}
                  </CardTitle>
                  <Badge variant={card.is_active ? "default" : "secondary"}>
                    {card.is_active ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveCard(index, 'up')}
                    disabled={index === 0}
                  >
                    ↑
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveCard(index, 'down')}
                    disabled={index === formCards.length - 1}
                  >
                    ↓
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCardChange(index, 'is_active', !card.is_active)}
                  >
                    {card.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCard(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input
                    value={card.title}
                    onChange={(e) => handleCardChange(index, 'title', e.target.value)}
                    placeholder="Digite o título do card..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Ícone</Label>
                  <Select
                    value={card.icon_name}
                    onValueChange={(value) => handleCardChange(index, 'icon_name', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availableIcons.map((icon) => (
                        <SelectItem key={icon.value} value={icon.value}>
                          {icon.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea
                  value={card.description}
                  onChange={(e) => handleCardChange(index, 'description', e.target.value)}
                  placeholder="Digite a descrição do card..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Cor do Ícone</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={card.icon_color}
                      onChange={(e) => handleCardChange(index, 'icon_color', e.target.value)}
                      className="w-12 h-10 p-1 rounded border"
                    />
                    <Input
                      value={card.icon_color}
                      onChange={(e) => handleCardChange(index, 'icon_color', e.target.value)}
                      placeholder="#000000"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {defaultColors.map((color) => (
                      <button
                        key={color}
                        className="w-6 h-6 rounded border-2 border-gray-300 hover:border-gray-500"
                        style={{ backgroundColor: color }}
                        onClick={() => handleCardChange(index, 'icon_color', color)}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Cor de Fundo (opcional)</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={card.background_color || '#ffffff'}
                      onChange={(e) => handleCardChange(index, 'background_color', e.target.value)}
                      className="w-12 h-10 p-1 rounded border"
                    />
                    <Input
                      value={card.background_color}
                      onChange={(e) => handleCardChange(index, 'background_color', e.target.value)}
                      placeholder="#ffffff (opcional)"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Opacidade do Fundo</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={card.background_opacity}
                      onChange={(e) => handleCardChange(index, 'background_opacity', parseFloat(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-600 w-12">
                      {Math.round(card.background_opacity * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={card.is_active}
                  onCheckedChange={(checked) => handleCardChange(index, 'is_active', checked)}
                />
                <Label>Card ativo (visível no site)</Label>
              </div>
            </CardContent>
          </Card>
        ))}

        {formCards.length === 0 && (
          <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="space-y-2">
              <p>Nenhum card encontrado</p>
              <Button onClick={addNewCard} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Criar Primeiro Card
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsCardsManagement;
