
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Save } from 'lucide-react';

interface CardsHeaderProps {
  onAddCard: () => void;
  onSaveCards: () => void;
  saving: boolean;
}

const CardsHeader: React.FC<CardsHeaderProps> = ({
  onAddCard,
  onSaveCards,
  saving,
}) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-800">
        Gestão dos Cards da Seção Results
      </h3>
      <div className="flex gap-2">
        <Button onClick={onAddCard} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Card
        </Button>
        <Button onClick={onSaveCards} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Salvando...' : 'Salvar Cards'}
        </Button>
      </div>
    </div>
  );
};

export default CardsHeader;
