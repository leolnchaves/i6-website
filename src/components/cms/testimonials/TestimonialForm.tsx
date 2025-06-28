
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';

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

interface TestimonialFormProps {
  testimonial: Testimonial | null;
  onSubmit: (data: Partial<Testimonial>) => Promise<void>;
  onCancel: () => void;
  isEditing: boolean;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({
  testimonial,
  onSubmit,
  onCancel,
  isEditing,
}) => {
  const [formData, setFormData] = useState({
    quote: '',
    author_name: '',
    author_title: '',
    company_name: '',
    rating: 5,
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (testimonial) {
      setFormData({
        quote: testimonial.quote,
        author_name: testimonial.author_name,
        author_title: testimonial.author_title || '',
        company_name: testimonial.company_name || '',
        rating: testimonial.rating,
      });
    }
  }, [testimonial]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit(formData);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle>
            {isEditing ? 'Editar Depoimento' : 'Novo Depoimento'}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quote */}
          <div className="space-y-2">
            <Label htmlFor="quote">Depoimento *</Label>
            <Textarea
              id="quote"
              value={formData.quote}
              onChange={(e) => handleInputChange('quote', e.target.value)}
              placeholder="Digite o depoimento do cliente..."
              rows={4}
              required
            />
          </div>

          {/* Author Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Informações do Autor</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author_name">Nome do Autor *</Label>
                <Input
                  id="author_name"
                  value={formData.author_name}
                  onChange={(e) => handleInputChange('author_name', e.target.value)}
                  placeholder="Nome completo"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author_title">Cargo</Label>
                <Input
                  id="author_title"
                  value={formData.author_title}
                  onChange={(e) => handleInputChange('author_title', e.target.value)}
                  placeholder="Ex: CEO, CTO, Diretor..."
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company_name">Nome da Empresa</Label>
              <Input
                id="company_name"
                value={formData.company_name}
                onChange={(e) => handleInputChange('company_name', e.target.value)}
                placeholder="Nome da empresa"
              />
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <Label htmlFor="rating">Avaliação</Label>
            <Select
              value={formData.rating.toString()}
              onValueChange={(value) => handleInputChange('rating', parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a avaliação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">⭐⭐⭐⭐⭐ (5 estrelas)</SelectItem>
                <SelectItem value="4">⭐⭐⭐⭐ (4 estrelas)</SelectItem>
                <SelectItem value="3">⭐⭐⭐ (3 estrelas)</SelectItem>
                <SelectItem value="2">⭐⭐ (2 estrelas)</SelectItem>
                <SelectItem value="1">⭐ (1 estrela)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Salvando...' : 'Salvar Depoimento'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TestimonialForm;
