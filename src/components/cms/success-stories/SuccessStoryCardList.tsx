
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, GripVertical, ExternalLink } from 'lucide-react';

interface SuccessStoryCard {
  id: string;
  page_id: string;
  card_order: number;
  language: string;
  industry: string;
  company_name: string;
  challenge: string;
  solution: string;
  metric1_value: string;
  metric1_label: string;
  metric2_value: string;
  metric2_label: string;
  metric3_value: string;
  metric3_label: string;
  customer_quote: string;
  customer_name: string;
  customer_title: string;
  image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface SuccessStoryCardListProps {
  cards: SuccessStoryCard[];
  onEdit: (cardId: string) => void;
  onDelete: (cardId: string) => void;
  onReorder: (cardIds: string[]) => void;
}

const SuccessStoryCardList: React.FC<SuccessStoryCardListProps> = ({
  cards,
  onEdit,
  onDelete,
  onReorder,
}) => {
  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    e.dataTransfer.setData('text/plain', cardId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetCardId: string) => {
    e.preventDefault();
    const draggedCardId = e.dataTransfer.getData('text/plain');
    
    if (draggedCardId !== targetCardId) {
      const reorderedCards = [...cards];
      const draggedIndex = reorderedCards.findIndex(card => card.id === draggedCardId);
      const targetIndex = reorderedCards.findIndex(card => card.id === targetCardId);
      
      const draggedCard = reorderedCards.splice(draggedIndex, 1)[0];
      reorderedCards.splice(targetIndex, 0, draggedCard);
      
      const cardIds = reorderedCards.map(card => card.id);
      onReorder(cardIds);
    }
  };

  return (
    <div className="space-y-4">
      {cards.map((card, index) => (
        <Card
          key={card.id}
          className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow"
          draggable
          onDragStart={(e) => handleDragStart(e, card.id)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, card.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              {/* Drag Handle */}
              <div className="flex items-center mt-1">
                <GripVertical className="h-5 w-5 text-gray-400 cursor-grab" />
              </div>

              {/* Card Image */}
              <div className="flex-shrink-0">
                <img
                  src={card.image_url}
                  alt={card.company_name}
                  className="w-16 h-12 object-cover rounded border"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop';
                  }}
                />
              </div>

              {/* Card Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {card.company_name}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {card.industry}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      Ordem: {card.card_order}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Desafio:</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{card.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Solução:</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{card.solution}</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="bg-blue-50 p-2 rounded text-center">
                    <div className="font-semibold text-blue-600 text-sm">{card.metric1_value}</div>
                    <div className="text-xs text-gray-600">{card.metric1_label}</div>
                  </div>
                  <div className="bg-green-50 p-2 rounded text-center">
                    <div className="font-semibold text-green-600 text-sm">{card.metric2_value}</div>
                    <div className="text-xs text-gray-600">{card.metric2_label}</div>
                  </div>
                  <div className="bg-purple-50 p-2 rounded text-center">
                    <div className="font-semibold text-purple-600 text-sm">{card.metric3_value}</div>
                    <div className="text-xs text-gray-600">{card.metric3_label}</div>
                  </div>
                </div>

                {/* Customer Quote */}
                <div className="bg-gray-50 p-3 rounded mb-3">
                  <p className="text-sm text-gray-700 italic line-clamp-2">
                    "{card.customer_quote}"
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    — {card.customer_name}, {card.customer_title}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(card.id)}
                  className="flex items-center gap-1"
                >
                  <Edit className="h-4 w-4" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(card.id)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                  Remover
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(card.image_url, '_blank')}
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="h-4 w-4" />
                  Ver Img
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SuccessStoryCardList;
