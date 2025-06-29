import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Save, Trash2, ChevronUp, ChevronDown, GripVertical } from 'lucide-react';
import { useCMSSolutionsCards } from '@/hooks/useCMSSolutionsCards';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ColorPalette from '@/components/cms/visual/ColorPalette';
import IconPalette from '@/components/cms/visual/IconPalette';
import SolutionCardPreview from '@/components/cms/visual/SolutionCardPreview';

interface SolutionsCardsManagementProps {
  selectedPage: string;
  selectedLanguage: string;
}

interface CardFormData {
  id?: string;
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
  card_order: number;
}

const availableEngines = [
  { value: 'i6 RecSys', label: 'i6 RecSys' },
  { value: 'i6 ElasticPrice', label: 'i6 ElasticPrice' },
  { value: 'i6 Previsio', label: 'i6 Previsio' },
];

const bgColorOptions = [
  { 
    value: 'bg-gray-100/60', 
    label: 'Gray', 
    preview: 'bg-gray-100' 
  },
  { 
    value: 'bg-orange-100/60', 
    label: 'Orange', 
    preview: 'bg-orange-100' 
  },
  { 
    value: 'bg-blue-100/60', 
    label: 'Blue', 
    preview: 'bg-blue-100' 
  },
  { 
    value: 'bg-green-100/60', 
    label: 'Green', 
    preview: 'bg-green-100' 
  },
  { 
    value: 'bg-purple-100/60', 
    label: 'Purple', 
    preview: 'bg-purple-100' 
  },
  { 
    value: 'bg-pink-100/60', 
    label: 'Pink', 
    preview: 'bg-pink-100' 
  },
];

const borderColorOptions = [
  { 
    value: 'border-gray-300/60', 
    label: 'Gray', 
    preview: 'bg-gray-300' 
  },
  { 
    value: 'border-orange-300/60', 
    label: 'Orange', 
    preview: 'bg-orange-300' 
  },
  { 
    value: 'border-blue-300/60', 
    label: 'Blue', 
    preview: 'bg-blue-300' 
  },
  { 
    value: 'border-green-300/60', 
    label: 'Green', 
    preview: 'bg-green-300' 
  },
  { 
    value: 'border-purple-300/60', 
    label: 'Purple', 
    preview: 'bg-purple-300' 
  },
  { 
    value: 'border-pink-300/60', 
    label: 'Pink', 
    preview: 'bg-pink-300' 
  },
];

const SolutionsCardsManagement: React.FC<SolutionsCardsManagementProps> = ({
  selectedPage,
  selectedLanguage,
}) => {
  const { cards, loading, saveCard, deleteCard, refetch } = useCMSSolutionsCards(selectedPage, selectedLanguage);
  const [formCards, setFormCards] = useState<CardFormData[]>([]);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (cards.length > 0) {
      const cardData = cards.map(card => ({
        id: card.id,
        title: card.title,
        focus: card.focus,
        description: card.description,
        features: card.features,
        outcome: card.outcome,
        engine: card.engine,
        gradient: card.gradient,
        bg_color: card.bg_color,
        border_color: card.border_color,
        icon: card.icon || 'building-2',
        is_active: card.is_active,
        card_order: card.card_order,
      }));
      setFormCards(cardData);
    } else {
      setFormCards([]);
    }
  }, [cards]);

  const handleCardChange = (index: number, field: keyof CardFormData, value: any) => {
    const updatedCards = [...formCards];
    updatedCards[index] = { ...updatedCards[index], [field]: value };
    setFormCards(updatedCards);
  };

  const handleFeatureChange = (cardIndex: number, featureIndex: number, value: string) => {
    const updatedCards = [...formCards];
    const newFeatures = [...updatedCards[cardIndex].features];
    newFeatures[featureIndex] = value;
    updatedCards[cardIndex].features = newFeatures;
    setFormCards(updatedCards);
  };

  const addFeature = (cardIndex: number) => {
    const updatedCards = [...formCards];
    updatedCards[cardIndex].features.push('');
    setFormCards(updatedCards);
  };

  const removeFeature = (cardIndex: number, featureIndex: number) => {
    const updatedCards = [...formCards];
    updatedCards[cardIndex].features.splice(featureIndex, 1);
    setFormCards(updatedCards);
  };

  const addNewCard = () => {
    const newCard: CardFormData = {
      title: '',
      focus: '',
      description: '',
      features: [''],
      outcome: '',
      engine: 'i6 RecSys',
      gradient: 'from-gray-600/80 to-blue-700/80',
      bg_color: 'bg-gray-100/60',
      border_color: 'border-gray-300/60',
      icon: 'building-2',
      is_active: true,
      card_order: formCards.length + 1,
    };
    setFormCards([...formCards, newCard]);
  };

  const removeCard = async (index: number) => {
    const card = formCards[index];
    if (card.id) {
      await deleteCard(card.id);
    } else {
      const updatedCards = formCards.filter((_, i) => i !== index);
      const reorderedCards = updatedCards.map((card, i) => ({
        ...card,
        card_order: i + 1,
      }));
      setFormCards(reorderedCards);
    }
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

  const saveCards = async () => {
    if (!selectedPage) return;

    setSaving(true);
    try {
      console.log('Saving solutions cards:', formCards);

      // Primeiro, identifica quais cards existem na base de dados
      const { data: existingCards, error: fetchError } = await supabase
        .from('cms_solutions_cards')
        .select('id')
        .eq('page_id', selectedPage)
        .eq('language', selectedLanguage);

      if (fetchError) throw fetchError;

      const existingCardIds = existingCards?.map(card => card.id) || [];
      const formCardIds = formCards.filter(card => card.id).map(card => card.id);

      // Identifica cards que devem ser removidos (existem na base mas não no formulário)
      const cardsToDelete = existingCardIds.filter(id => !formCardIds.includes(id));

      // Remove cards que não estão mais no formulário
      if (cardsToDelete.length > 0) {
        const { error: deleteError } = await supabase
          .from('cms_solutions_cards')
          .delete()
          .in('id', cardsToDelete);

        if (deleteError) throw deleteError;
      }

      // Processa cada card no formulário
      for (const card of formCards) {
        const cardData = {
          page_id: selectedPage,
          title: card.title,
          focus: card.focus,
          description: card.description,
          features: card.features,
          outcome: card.outcome,
          engine: card.engine,
          gradient: card.gradient,
          bg_color: card.bg_color,
          border_color: card.border_color,
          icon: card.icon,
          is_active: card.is_active,
          card_order: card.card_order,
          language: selectedLanguage,
        };

        if (card.id) {
          // Atualiza card existente
          const { error: updateError } = await supabase
            .from('cms_solutions_cards')
            .update(cardData)
            .eq('id', card.id);

          if (updateError) throw updateError;
        } else {
          // Insere novo card
          const { error: insertError } = await supabase
            .from('cms_solutions_cards')
            .insert(cardData);

          if (insertError) throw insertError;
        }
      }

      await refetch();
      toast({
        title: 'Sucesso!',
        description: 'Cards de soluções salvos com sucesso.',
      });
    } catch (error) {
      console.error('Error saving solutions cards:', error);
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
        <div className="text-gray-500">Carregando cards de soluções...</div>
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-medium text-gray-900">
              Gestão dos Cards da Solutions Grid
            </CardTitle>
            <p className="text-gray-600 mt-1">
              Gerencie os cards de soluções exibidos na página Solutions
            </p>
          </div>
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
      </CardHeader>
      <CardContent className="space-y-6">
        {formCards.map((card, index) => (
          <Card key={index} className="border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <GripVertical className="h-4 w-4 text-gray-400" />
                    <Badge variant="outline" className="text-xs">
                      #{card.card_order}
                    </Badge>
                  </div>
                  <h4 className="font-medium text-gray-900">
                    {card.title || `Card ${index + 1}`}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => moveCard(index, 'up')}
                      disabled={index === 0}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => moveCard(index, 'down')}
                      disabled={index === formCards.length - 1}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={card.is_active}
                      onCheckedChange={(checked) => handleCardChange(index, 'is_active', checked)}
                    />
                    <Label className="text-sm">Ativo</Label>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeCard(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Primeira linha - Campos de conteúdo e campos técnicos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Lado esquerdo - Campos de conteúdo */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`title-${index}`}>Título</Label>
                    <Input
                      id={`title-${index}`}
                      value={card.title}
                      onChange={(e) => handleCardChange(index, 'title', e.target.value)}
                      placeholder="Digite o título do card"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`focus-${index}`}>Foco</Label>
                    <Input
                      id={`focus-${index}`}
                      value={card.focus}
                      onChange={(e) => handleCardChange(index, 'focus', e.target.value)}
                      placeholder="Digite o foco da solução"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`description-${index}`}>Descrição</Label>
                    <Textarea
                      id={`description-${index}`}
                      value={card.description}
                      onChange={(e) => handleCardChange(index, 'description', e.target.value)}
                      placeholder="Digite a descrição detalhada"
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`outcome-${index}`}>Resultados Esperados</Label>
                    <Textarea
                      id={`outcome-${index}`}
                      value={card.outcome}
                      onChange={(e) => handleCardChange(index, 'outcome', e.target.value)}
                      placeholder="Digite os resultados esperados"
                      rows={4}
                    />
                  </div>
                </div>

                {/* Lado direito - Engine e Features */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`engine-${index}`}>Engine</Label>
                    <Select value={card.engine} onValueChange={(value) => handleCardChange(index, 'engine', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o engine" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableEngines.map(engine => (
                          <SelectItem key={engine.value} value={engine.value}>
                            {engine.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Features</Label>
                    <div className="space-y-2">
                      {card.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex gap-2">
                          <Input
                            value={feature}
                            onChange={(e) => handleFeatureChange(index, featureIndex, e.target.value)}
                            placeholder="Digite a feature"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFeature(index, featureIndex)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addFeature(index)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Feature
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Terceira linha - Estilo Visual e Preview lado a lado */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Estilo Visual */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Estilo Visual</Label>
                  <div className="space-y-4">
                    <IconPalette
                      label="Ícone"
                      value={card.icon}
                      onChange={(value) => handleCardChange(index, 'icon', value)}
                    />

                    <ColorPalette
                      label="Cor de Fundo"
                      value={card.bg_color}
                      onChange={(value) => handleCardChange(index, 'bg_color', value)}
                      options={bgColorOptions}
                    />

                    <ColorPalette
                      label="Cor da Borda"
                      value={card.border_color}
                      onChange={(value) => handleCardChange(index, 'border_color', value)}
                      options={borderColorOptions}
                    />
                  </div>
                </div>

                {/* Preview do Card */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Preview</Label>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <SolutionCardPreview
                      title={card.title}
                      focus={card.focus}
                      description={card.description}
                      features={card.features}
                      outcome={card.outcome}
                      engine={card.engine}
                      gradient={card.gradient}
                      bg_color={card.bg_color}
                      border_color={card.border_color}
                      icon={card.icon}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {formCards.length === 0 && (
          <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="space-y-2">
              <p>Nenhum card de solução encontrado</p>
              <Button onClick={addNewCard} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Criar Primeiro Card
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SolutionsCardsManagement;
