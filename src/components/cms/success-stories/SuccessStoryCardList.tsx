
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, GripVertical, Home } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

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
  is_active_home: boolean;
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
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(cards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onReorder(items.map(item => item.id));
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="cards">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            {cards.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided, snapshot) => (
                  <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`transition-shadow ${
                      snapshot.isDragging ? 'shadow-lg' : 'shadow-sm'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Drag Handle */}
                        <div
                          {...provided.dragHandleProps}
                          className="mt-2 cursor-move text-gray-400 hover:text-gray-600"
                        >
                          <GripVertical className="h-5 w-5" />
                        </div>

                        {/* Card Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={card.image_url}
                            alt={card.company_name}
                            className="w-20 h-16 object-cover rounded border"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop';
                            }}
                          />
                        </div>

                        {/* Card Content */}
                        <div className="flex-grow min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-grow">
                              <h4 className="font-semibold text-gray-900 mb-1">
                                {card.company_name}
                              </h4>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {card.industry}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  Ordem: {card.card_order}
                                </Badge>
                                {card.is_active_home && (
                                  <Badge variant="default" className="text-xs bg-green-100 text-green-800 border-green-200">
                                    <Home className="h-3 w-3 mr-1" />
                                    Ativo na Home
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex items-center gap-2 ml-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onEdit(card.id)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onDelete(card.id)}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-2">
                            {truncateText(card.solution, 120)}
                          </p>

                          {/* Metrics Preview */}
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{card.metric1_value} {card.metric1_label}</span>
                            <span>•</span>
                            <span>{card.metric2_value} {card.metric2_label}</span>
                            <span>•</span>
                            <span>{card.metric3_value} {card.metric3_label}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SuccessStoryCardList;
