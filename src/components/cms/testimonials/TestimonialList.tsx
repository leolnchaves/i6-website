
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, GripVertical } from 'lucide-react';

interface Testimonial {
  id: string;
  page_id: string;
  card_order: number;
  language: string;
  quote: string;
  author_name: string;
  author_title?: string;
  company_name?: string;
  rating: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface TestimonialListProps {
  testimonials: Testimonial[];
  onEdit: (testimonialId: string) => void;
  onDelete: (testimonialId: string) => void;
  onReorder: (testimonialIds: string[]) => void;
}

const TestimonialList: React.FC<TestimonialListProps> = ({
  testimonials,
  onEdit,
  onDelete,
  onReorder,
}) => {
  const handleDragStart = (e: React.DragEvent, testimonialId: string) => {
    e.dataTransfer.setData('text/plain', testimonialId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetTestimonialId: string) => {
    e.preventDefault();
    const draggedTestimonialId = e.dataTransfer.getData('text/plain');
    
    if (draggedTestimonialId !== targetTestimonialId) {
      const reorderedTestimonials = [...testimonials];
      const draggedIndex = reorderedTestimonials.findIndex(testimonial => testimonial.id === draggedTestimonialId);
      const targetIndex = reorderedTestimonials.findIndex(testimonial => testimonial.id === targetTestimonialId);
      
      const draggedTestimonial = reorderedTestimonials.splice(draggedIndex, 1)[0];
      reorderedTestimonials.splice(targetIndex, 0, draggedTestimonial);
      
      const testimonialIds = reorderedTestimonials.map(testimonial => testimonial.id);
      onReorder(testimonialIds);
    }
  };

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating);
  };

  return (
    <div className="space-y-4">
      {testimonials.map((testimonial, index) => (
        <Card
          key={testimonial.id}
          className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow"
          draggable
          onDragStart={(e) => handleDragStart(e, testimonial.id)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, testimonial.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              {/* Drag Handle */}
              <div className="flex items-center mt-1">
                <GripVertical className="h-5 w-5 text-gray-400 cursor-grab" />
              </div>

              {/* Testimonial Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-lg">
                      {renderStars(testimonial.rating)}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Ordem: {testimonial.card_order}
                    </Badge>
                  </div>
                </div>

                {/* Quote */}
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-gray-800 italic text-sm leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Author Information */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.author_name}
                    </h4>
                    <div className="text-sm text-gray-600">
                      {testimonial.author_title && (
                        <span>{testimonial.author_title}</span>
                      )}
                      {testimonial.author_title && testimonial.company_name && (
                        <span className="mx-1">•</span>
                      )}
                      {testimonial.company_name && (
                        <span>{testimonial.company_name}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(testimonial.id)}
                  className="flex items-center gap-1"
                >
                  <Edit className="h-4 w-4" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(testimonial.id)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                  Remover
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TestimonialList;
