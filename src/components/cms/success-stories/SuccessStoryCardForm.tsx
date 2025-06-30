
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save } from 'lucide-react';

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

interface SuccessStoryCardFormProps {
  card: SuccessStoryCard | null;
  onSubmit: (data: Partial<SuccessStoryCard>) => Promise<void>;
  onCancel: () => void;
  isEditing: boolean;
}

const SuccessStoryCardForm: React.FC<SuccessStoryCardFormProps> = ({
  card,
  onSubmit,
  onCancel,
  isEditing,
}) => {
  const [formData, setFormData] = useState({
    industry: '',
    company_name: '',
    challenge: '',
    solution: '',
    metric1_value: '',
    metric1_label: '',
    metric2_value: '',
    metric2_label: '',
    metric3_value: '',
    metric3_label: '',
    customer_quote: '',
    customer_name: '',
    customer_title: '',
    image_url: '',
    is_active_home: false,
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (card) {
      setFormData({
        industry: card.industry,
        company_name: card.company_name,
        challenge: card.challenge,
        solution: card.solution,
        metric1_value: card.metric1_value,
        metric1_label: card.metric1_label,
        metric2_value: card.metric2_value,
        metric2_label: card.metric2_label,
        metric3_value: card.metric3_value,
        metric3_label: card.metric3_label,
        customer_quote: card.customer_quote,
        customer_name: card.customer_name,
        customer_title: card.customer_title,
        image_url: card.image_url,
        is_active_home: card.is_active_home,
      });
    }
  }, [card]);

  const handleInputChange = (field: string, value: string | boolean) => {
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
            {isEditing ? 'Editar Card' : 'Novo Card'} - Case de Sucesso
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Configurações do Card</h3>
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Switch
                id="is_active_home"
                checked={formData.is_active_home}
                onCheckedChange={(checked) => handleInputChange('is_active_home', checked)}
              />
              <div className="space-y-1">
                <Label htmlFor="is_active_home" className="text-sm font-medium">
                  Card ativo (sincronizado em todos os idiomas)
                </Label>
                <p className="text-xs text-gray-600">
                  Quando ativo, este card aparecerá na seção "Featured Stories" da página inicial
                </p>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Informações Básicas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry">Setor/Indústria</Label>
                <Input
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  placeholder="Ex: Manufatura, Finanças, Tecnologia..."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company_name">Nome da Empresa</Label>
                <Input
                  id="company_name"
                  value={formData.company_name}
                  onChange={(e) => handleInputChange('company_name', e.target.value)}
                  placeholder="Nome da empresa cliente"
                  required
                />
              </div>
            </div>
          </div>

          {/* Challenge & Solution */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Desafio e Solução</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="challenge">Desafio</Label>
                <Textarea
                  id="challenge"
                  value={formData.challenge}
                  onChange={(e) => handleInputChange('challenge', e.target.value)}
                  placeholder="Descrição do desafio enfrentado pela empresa..."
                  rows={3}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="solution">Solução</Label>
                <Textarea
                  id="solution"
                  value={formData.solution}
                  onChange={(e) => handleInputChange('solution', e.target.value)}
                  placeholder="Descrição da solução implementada..."
                  rows={3}
                  required
                />
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Métricas de Resultado</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Metric 1 */}
              <div className="space-y-2">
                <Label>Métrica 1</Label>
                <Input
                  value={formData.metric1_value}
                  onChange={(e) => handleInputChange('metric1_value', e.target.value)}
                  placeholder="Ex: 75%"
                  required
                />
                <Input
                  value={formData.metric1_label}
                  onChange={(e) => handleInputChange('metric1_label', e.target.value)}
                  placeholder="Ex: Redução de Custos"
                  required
                />
              </div>
              
              {/* Metric 2 */}
              <div className="space-y-2">
                <Label>Métrica 2</Label>
                <Input
                  value={formData.metric2_value}
                  onChange={(e) => handleInputChange('metric2_value', e.target.value)}
                  placeholder="Ex: $2.3M"
                  required
                />
                <Input
                  value={formData.metric2_label}
                  onChange={(e) => handleInputChange('metric2_label', e.target.value)}
                  placeholder="Ex: Economia Total"
                  required
                />
              </div>
              
              {/* Metric 3 */}
              <div className="space-y-2">
                <Label>Métrica 3</Label>
                <Input
                  value={formData.metric3_value}
                  onChange={(e) => handleInputChange('metric3_value', e.target.value)}
                  placeholder="Ex: 40%"
                  required
                />
                <Input
                  value={formData.metric3_label}
                  onChange={(e) => handleInputChange('metric3_label', e.target.value)}
                  placeholder="Ex: Aumento de Eficiência"
                  required
                />
              </div>
            </div>
          </div>

          {/* Customer Quote */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Depoimento do Cliente</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customer_quote">Citação</Label>
                <Textarea
                  id="customer_quote"
                  value={formData.customer_quote}
                  onChange={(e) => handleInputChange('customer_quote', e.target.value)}
                  placeholder="Depoimento do cliente sobre os resultados..."
                  rows={3}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer_name">Nome do Cliente</Label>
                  <Input
                    id="customer_name"
                    value={formData.customer_name}
                    onChange={(e) => handleInputChange('customer_name', e.target.value)}
                    placeholder="Nome completo"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer_title">Cargo</Label>
                  <Input
                    id="customer_title"
                    value={formData.customer_title}
                    onChange={(e) => handleInputChange('customer_title', e.target.value)}
                    placeholder="Cargo na empresa"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Imagem</h3>
            <div className="space-y-2">
              <Label htmlFor="image_url">URL da Imagem</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => handleInputChange('image_url', e.target.value)}
                placeholder="https://example.com/image.jpg"
                required
              />
              {formData.image_url && (
                <div className="mt-2">
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="w-32 h-24 object-cover rounded border"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Salvando...' : 'Salvar Card'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SuccessStoryCardForm;
