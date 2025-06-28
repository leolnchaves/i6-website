
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Save, Trash2, GripVertical, Eye, EyeOff } from 'lucide-react';
import { useCMSCompactSolutionsCards } from '@/hooks/useCMSCompactSolutionsCards';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import CompactSolutionsCardForm from './cards/CompactSolutionsCardForm';

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

interface CompactSolutionsCardsManagementProps {
  selectedPage: string;
  selectedLanguage: string;
}

const CompactSolutionsCardsManagement: React.FC<CompactSolutionsCardsManagementProps> = ({
  selectedPage,
  selectedLanguage,
}) => {
  const { cards, loading, fetchCards, saveCards, toggleCardActive } = useCMSCompactSolutionsCards();
  const [localCards, setLocalCards] = useState<CompactSolutionsCard[]>([]);
  const [saving, setSaving] = useState(false);

  // Available icons for the cards
  const availableIcons = [
    { value: 'Target', label: 'Target (Alvo)' },
    { value: 'Users', label: 'Users (Usuários)' },
    { value: 'Cog', label: 'Cog (Engrenagem)' },
    { value: 'TrendingUp', label: 'TrendingUp (Crescimento)' },
    { value: 'DollarSign', label: 'DollarSign (Dólar)' },
    { value: 'BarChart3', label: 'BarChart3 (Gráfico)' },
    { value: 'Zap', label: 'Zap (Raio)' },
    { value: 'Star', label: 'Star (Estrela)' },
    { value: 'Heart', label: 'Heart (Coração)' },
    { value: 'Shield', label: 'Shield (Escudo)' },
  ];

  // Default engine options
  const availableEngines = [
    'i6 RecSys',
    'i6 ElasticPrice',
    'i6 Previsio',
    'i6 Analytics',
    'i6 Optimizer',
  ];

  useEffect(() => {
    if (selectedPage) {
      fetchCards(selectedPage, selectedLanguage);
    }
  }, [selectedPage, selectedLanguage]);

  useEffect(() => {
    setLocalCards(cards);
  }, [cards]);

  const handleAddCard = () => {
    const newCard: CompactSolutionsCard = {
      page_id: selectedPage,
      card_order: localCards.length + 1,
      language: selectedLanguage,
      engine_name: 'i6 RecSys',
      title: '',
      description: '',
      icon_name: 'Target',
      background_color: '#1E4A94',
      background_opacity: 1.0,
      is_active: true,
    };
    setLocalCards([...localCards, newCard]);
  };

  const handleCardChange = (index: number, field: keyof CompactSolutionsCard, value: any) => {
    const updatedCards = [...localCards];
    updatedCards[index] = { ...updatedCards[index], [field]: value };
    setLocalCards(updatedCards);
  };

  const handleRemoveCard = (index: number) => {
    const updatedCards = localCards.filter((_, i) => i !== index);
    // Reorder cards
    updatedCards.forEach((card, i) => {
      card.card_order = i + 1;
    });
    setLocalCards(updatedCards);
  };

  const handleMoveCard = (index: number, direction: 'up' | 'down') => {
    const updatedCards = [...localCards];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < updatedCards.length) {
      [updatedCards[index], updatedCards[targetIndex]] = [updatedCards[targetIndex], updatedCards[index]];
      
      // Update card orders
      updatedCards.forEach((card, i) => {
        card.card_order = i + 1;
      });
      
      setLocalCards(updatedCards);
    }
  };

  const handleToggleActive = (index: number, isActive: boolean) => {
    const updatedCards = [...localCards];
    updatedCards[index] = { ...updatedCards[index], is_active: isActive };
    setLocalCards(updatedCards);
  };

  const handleSaveCards = async () => {
    setSaving(true);
    try {
      await saveCards(localCards);
    } finally {
      setSaving(false);
    }
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
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Gestão dos Cards - Soluções Compactas
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Gerencie os cards da seção de soluções compactas
            <Badge variant="outline" className="ml-2">
              {selectedLanguage === 'en' ? '🇺🇸 English' : '🇧🇷 Português'}
            </Badge>
          </p>
        </div>
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

      {localCards.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500 mb-4">Nenhum card encontrado.</p>
            <Button onClick={handleAddCard}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Primeiro Card
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {localCards.map((card, index) => (
            <CompactSolutionsCardForm
              key={index}
              card={card}
              index={index}
              availableIcons={availableIcons}
              availableEngines={availableEngines}
              totalCards={localCards.length}
              onChange={handleCardChange}
              onMove={handleMoveCard}
              onRemove={handleRemoveCard}
              onToggleActive={handleToggleActive}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CompactSolutionsCardsManagement;
