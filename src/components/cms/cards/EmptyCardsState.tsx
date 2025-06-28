
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface EmptyCardsStateProps {
  onAddCard: () => void;
}

const EmptyCardsState: React.FC<EmptyCardsStateProps> = ({ onAddCard }) => {
  return (
    <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
      <div className="space-y-2">
        <p>Nenhum card encontrado</p>
        <Button onClick={onAddCard} variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Criar Primeiro Card
        </Button>
      </div>
    </div>
  );
};

export default EmptyCardsState;
