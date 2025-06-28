
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Save, RotateCcw } from 'lucide-react';
import { useCMSCompactSolutionsCards } from '@/hooks/useCMSCompactSolutionsCards';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import CompactSolutionsCardForm from './cards/CompactSolutionsCardForm';

interface CompactSolutionsCardsManagementProps {
  selectedPage: string;
  selectedLanguage: string;
}

interface CardFormData {
  id?: string;
  title: string;
  description: string;
  engine: string;
  icon_name: string;
  background_color: string;
  is_active: boolean;
  card_order: number;
}

const CompactSolutionsCardsManagement: React.FC<CompactSolutionsCardsManagementProps> = ({
  selectedPage,
  selectedLanguage,
}) => {
  const { cards, loading, refetch } = useCMSCompactSolutionsCards(selectedLanguage);
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [cardsFormData, setCardsFormData] = useState<CardFormData[]>([]);

  const availableIcons = [
    { value: 'Target', label: 'Target (Alvo)' },
    { value: 'Users', label: 'Users (Usuários)' },
    { value: 'Cog', label: 'Cog (Engrenagem)' },
    { value: 'TrendingUp', label: 'TrendingUp (Crescimento)' },
    { value: 'DollarSign', label: 'DollarSign (Dólar)' },
    { value: 'BarChart3', label: 'BarChart3 (Gráfico)' },
  ];

  const availableEngines = [
    { value: 'i6 RecSys', label: 'i6 RecSys' },
    { value: 'i6 ElasticPrice', label: 'i6 ElasticPrice' },
    { value: 'i6 Previsio', label: 'i6 Previsio' },
  ];

  const defaultColors = [
    '#1E4A94', '#2563eb', '#7c3aed', '#dc2626',
    '#ea580c', '#059669', '#0891b2', '#6b7280'
  ];

  // Sincronizar dados dos cards com o form
  useEffect(() => {
    if (cards && cards.length > 0) {
      const formData = cards.map(card => ({
        id: card.id,
        title: card.title,
        description: card.description,
        engine: card.engine,
        icon_name: card.icon_name,
        background_color: card.background_color || '#1E4A94',
        is_active: card.is_active,
        card_order: card.card_order,
      }));
      setCardsFormData(formData);
    } else {
      setCardsFormData([]);
    }
  }, [cards]);

  const handleCardFieldChange = (index: number, field: keyof CardFormData, value: any) => {
    setCardsFormData(prev => {
      const newData = [...prev];
      newData[index] = { ...newData[index], [field]: value };
      return newData;
    });
  };

  const handleMoveCard = (index: number, direction: 'up' | 'down') => {
    setCardsFormData(prev => {
      const newData = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      
      if (targetIndex >= 0 && targetIndex < newData.length) {
        // Trocar posições e atualizar card_order
        [newData[index], newData[targetIndex]] = [newData[targetIndex], newData[index]];
        newData[index].card_order = index + 1;
        newData[targetIndex].card_order = targetIndex + 1;
      }
      
      return newData;
    });
  };

  const handleRemoveCard = (index: number) => {
    if (!confirm('Tem certeza que deseja excluir este card?')) {
      return;
    }

    setCardsFormData(prev => {
      const newData = prev.filter((_, i) => i !== index);
      // Reajustar card_order
      return newData.map((card, i) => ({ ...card, card_order: i + 1 }));
    });
  };

  const handleToggleActive = (index: number, isActive: boolean) => {
    setCardsFormData(prev => {
      const newData = [...prev];
      newData[index] = { ...newData[index], is_active: isActive };
      return newData;
    });
  };

  const handleAddCard = () => {
    const newCard: CardFormData = {
      title: '',
      description: '',
      engine: 'i6 RecSys',
      icon_name: 'Target',
      background_color: '#1E4A94',
      is_active: true,
      card_order: cardsFormData.length + 1,
    };
    setCardsFormData(prev => [...prev, newCard]);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      // Validar cards ativos
      const activeCards = cardsFormData.filter(card => card.is_active);
      const hasEmptyFields = activeCards.some(card => !card.title.trim() || !card.description.trim());
      
      if (hasEmptyFields) {
        toast({
          title: 'Erro de validação',
          description: 'Cards ativos devem ter título e descrição preenchidos.',
          variant: 'destructive',
        });
        return;
      }

      // Deletar todos os cards existentes da página/idioma
      if (cards && cards.length > 0) {
        const { error: deleteError } = await supabase
          .from('cms_compact_solutions_cards')
          .delete()
          .eq('page_id', selectedPage)
          .eq('language', selectedLanguage);

        if (deleteError) throw deleteError;
      }

      // Inserir os novos cards
      if (cardsFormData.length > 0) {
        const cardsToInsert = cardsFormData.map((card, index) => ({
          page_id: selectedPage,
          language: selectedLanguage,
          title: card.title,
          description: card.description,
          engine: card.engine,
          icon_name: card.icon_name,
          background_color: card.background_color,
          is_active: card.is_active,
          card_order: index + 1,
        }));

        const { error: insertError } = await supabase
          .from('cms_compact_solutions_cards')
          .insert(cardsToInsert);

        if (insertError) throw insertError;
      }

      toast({
        title: 'Cards salvos',
        description: 'Todos os cards foram salvos com sucesso.',
      });

      refetch();
    } catch (error) {
      console.error('Error saving cards:', error);
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar os cards.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (!confirm('Tem certeza que deseja descartar todas as alterações?')) {
      return;
    }
    
    // Recarregar dados originais
    if (cards && cards.length > 0) {
      const formData = cards.map(card => ({
        id: card.id,
        title: card.title,
        description: card.description,
        engine: card.engine,
        icon_name: card.icon_name,
        background_color: card.background_color || '#1E4A94',
        is_active: card.is_active,
        card_order: card.card_order,
      }));
      setCardsFormData(formData);
    } else {
      setCardsFormData([]);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Gestão dos Cards - Compact Solutions</CardTitle>
              <CardDescription>
                Gerencie os cards da seção de soluções compactas
                <Badge variant="outline" className="ml-2">
                  {selectedLanguage === 'en' ? '🇺🇸 English' : '🇧🇷 Português'}
                </Badge>
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleReset} variant="outline" disabled={saving}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Resetar
              </Button>
              <Button onClick={handleSaveAll} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Salvando...' : 'Salvar Todos'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Cards ({cardsFormData.length})</h3>
            <Button onClick={handleAddCard} disabled={saving}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Card
            </Button>
          </div>

          {/* Lista de cards */}
          <div className="space-y-4">
            {cardsFormData.map((card, index) => (
              <CompactSolutionsCardForm
                key={`card-${index}`}
                card={card}
                index={index}
                availableIcons={availableIcons}
                availableEngines={availableEngines}
                defaultColors={defaultColors}
                totalCards={cardsFormData.length}
                onChange={handleCardFieldChange}
                onMove={handleMoveCard}
                onRemove={handleRemoveCard}
                onToggleActive={handleToggleActive}
              />
            ))}

            {cardsFormData.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>Nenhum card configurado.</p>
                <p className="text-sm mt-1">Clique em "Adicionar Card" para criar o primeiro card.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompactSolutionsCardsManagement;
