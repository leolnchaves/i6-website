
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import { useCMSTestimonials } from '@/hooks/useCMSTestimonials';
import TestimonialForm from './testimonials/TestimonialForm';
import TestimonialList from './testimonials/TestimonialList';

interface TestimonialsManagementProps {
  selectedPage: string;
  selectedLanguage: string;
}

const TestimonialsManagement: React.FC<TestimonialsManagementProps> = ({
  selectedPage,
  selectedLanguage,
}) => {
  const { testimonials, loading, fetchTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, reorderTestimonials } = useCMSTestimonials();
  const [editingTestimonial, setEditingTestimonial] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (selectedPage) {
      fetchTestimonials(selectedPage, selectedLanguage);
    }
  }, [selectedPage, selectedLanguage, fetchTestimonials]);

  const handleCreateTestimonial = () => {
    setEditingTestimonial(null);
    setShowForm(true);
  };

  const handleEditTestimonial = (testimonialId: string) => {
    setEditingTestimonial(testimonialId);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTestimonial(null);
  };

  const handleFormSubmit = async (formData: any) => {
    try {
      if (editingTestimonial) {
        await updateTestimonial(editingTestimonial, formData);
      } else {
        // Get next testimonial order
        const nextOrder = testimonials.length > 0 ? Math.max(...testimonials.map(t => t.card_order)) + 1 : 1;
        await createTestimonial(selectedPage, selectedLanguage, {
          ...formData,
          card_order: nextOrder,
        });
      }
      handleFormClose();
    } catch (error) {
      console.error('Error saving testimonial:', error);
    }
  };

  const handleDeleteTestimonial = async (testimonialId: string) => {
    if (window.confirm('Tem certeza que deseja remover este depoimento?')) {
      await deleteTestimonial(testimonialId);
    }
  };

  const handleReorder = async (testimonialIds: string[]) => {
    await reorderTestimonials(selectedPage, selectedLanguage, testimonialIds);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gestão de Depoimentos</CardTitle>
          <CardDescription>Carregando depoimentos...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showForm) {
    return (
      <TestimonialForm
        testimonial={editingTestimonial ? testimonials.find(t => t.id === editingTestimonial) : null}
        onSubmit={handleFormSubmit}
        onCancel={handleFormClose}
        isEditing={!!editingTestimonial}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Gestão de Depoimentos</CardTitle>
            <CardDescription>
              Gerencie os depoimentos que aparecem na seção Testimonials
              <Badge variant="outline" className="ml-2">
                {selectedLanguage === 'en' ? '🇺🇸 English' : '🇧🇷 Português'}
              </Badge>
            </CardDescription>
          </div>
          <Button onClick={handleCreateTestimonial} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Novo Depoimento
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {testimonials.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">Nenhum depoimento encontrado</p>
            <p className="text-sm mb-4">Clique em "Novo Depoimento" para criar o primeiro depoimento.</p>
            <Button onClick={handleCreateTestimonial} variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Criar Primeiro Depoimento
            </Button>
          </div>
        ) : (
          <TestimonialList
            testimonials={testimonials}
            onEdit={handleEditTestimonial}
            onDelete={handleDeleteTestimonial}
            onReorder={handleReorder}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default TestimonialsManagement;
