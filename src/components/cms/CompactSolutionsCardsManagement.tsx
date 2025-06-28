
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCMSCompactSolutionsCards } from '@/hooks/useCMSCompactSolutionsCards';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/common/LoadingSpinner';

interface CompactSolutionsCardsManagementProps {
  selectedPage: string;
  selectedLanguage: string;
}

interface CardForm {
  id?: string;
  title: string;
  description: string;
  engine: string;
  icon_name: string;
  background_color: string;
  card_order: number;
}

const CompactSolutionsCardsManagement: React.FC<CompactSolutionsCardsManagementProps> = ({
  selectedPage,
  selectedLanguage,
}) => {
  const { cards, loading, refetch } = useCMSCompactSolutionsCards(selectedLanguage);
  const { toast } = useToast();
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<CardForm>({
    title: '',
    description: '',
    engine: 'i6 RecSys',
    icon_name: 'Target',
    background_color: '#1E4A94',
    card_order: 1,
  });

  const iconOptions = [
    { value: 'Target', label: 'Target (Alvo)' },
    { value: 'Users', label: 'Users (Usuários)' },
    { value: 'Cog', label: 'Cog (Engrenagem)' },
    { value: 'TrendingUp', label: 'TrendingUp (Crescimento)' },
    { value: 'DollarSign', label: 'DollarSign (Dólar)' },
    { value: 'BarChart3', label: 'BarChart3 (Gráfico)' },
  ];

  const engineOptions = [
    { value: 'i6 RecSys', label: 'i6 RecSys' },
    { value: 'i6 ElasticPrice', label: 'i6 ElasticPrice' },
    { value: 'i6 Previsio', label: 'i6 Previsio' },
  ];

  useEffect(() => {
    if (cards.length > 0) {
      setFormData(prev => ({ ...prev, card_order: cards.length + 1 }));
    }
  }, [cards]);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      engine: 'i6 RecSys',
      icon_name: 'Target',
      background_color: '#1E4A94',
      card_order: cards.length + 1,
    });
    setEditingCard(null);
    setShowAddForm(false);
  };

  const handleEdit = (card: any) => {
    setFormData({
      id: card.id,
      title: card.title,
      description: card.description,
      engine: card.engine,
      icon_name: card.icon_name,
      background_color: card.background_color || '#1E4A94',
      card_order: card.card_order,
    });
    setEditingCard(card.id);
    setShowAddForm(false);
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      toast({
        title: 'Erro de validação',
        description: 'Título e descrição são obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      if (editingCard) {
        // Atualizar card existente
        const { error } = await supabase
          .from('cms_compact_solutions_cards')
          .update({
            title: formData.title,
            description: formData.description,
            engine: formData.engine,
            icon_name: formData.icon_name,
            background_color: formData.background_color,
            card_order: formData.card_order,
          })
          .eq('id', editingCard);

        if (error) throw error;

        toast({
          title: 'Card atualizado',
          description: 'O card foi atualizado com sucesso.',
        });
      } else {
        // Criar novo card
        const { error } = await supabase
          .from('cms_compact_solutions_cards')
          .insert({
            page_id: selectedPage,
            language: selectedLanguage,
            title: formData.title,
            description: formData.description,
            engine: formData.engine,
            icon_name: formData.icon_name,
            background_color: formData.background_color,
            card_order: formData.card_order,
          });

        if (error) throw error;

        toast({
          title: 'Card criado',
          description: 'O novo card foi criado com sucesso.',
        });
      }

      resetForm();
      refetch();
    } catch (error) {
      console.error('Error saving card:', error);
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar o card.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (cardId: string) => {
    if (!confirm('Tem certeza que deseja excluir este card?')) {
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from('cms_compact_solutions_cards')
        .delete()
        .eq('id', cardId);

      if (error) throw error;

      toast({
        title: 'Card excluído',
        description: 'O card foi excluído com sucesso.',
      });

      refetch();
    } catch (error) {
      console.error('Error deleting card:', error);
      toast({
        title: 'Erro ao excluir',
        description: 'Não foi possível excluir o card.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestão dos Cards - Compact Solutions</CardTitle>
          <CardDescription>
            Gerencie os cards da seção de soluções compactas
            <Badge variant="outline" className="ml-2">
              {selectedLanguage === 'en' ? '🇺🇸 English' : '🇧🇷 Português'}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Cards ({cards.length})</h3>
            <Button 
              onClick={() => setShowAddForm(true)} 
              disabled={showAddForm || editingCard !== null}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Card
            </Button>
          </div>

          {/* Form para adicionar/editar */}
          {(showAddForm || editingCard) && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{editingCard ? 'Editar Card' : 'Novo Card'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Digite o título do card..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="engine">Engine</Label>
                    <Select
                      value={formData.engine}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, engine: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {engineOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="icon">Ícone</Label>
                    <Select
                      value={formData.icon_name}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, icon_name: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="background_color">Cor de Fundo</Label>
                    <Input
                      id="background_color"
                      type="color"
                      value={formData.background_color}
                      onChange={(e) => setFormData(prev => ({ ...prev, background_color: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="card_order">Ordem</Label>
                    <Input
                      id="card_order"
                      type="number"
                      min="1"
                      value={formData.card_order}
                      onChange={(e) => setFormData(prev => ({ ...prev, card_order: parseInt(e.target.value) || 1 }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Digite a descrição do card..."
                    rows={4}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSave} disabled={saving}>
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? 'Salvando...' : 'Salvar'}
                  </Button>
                  <Button variant="outline" onClick={resetForm}>
                    <X className="h-4 w-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lista de cards */}
          <div className="space-y-4">
            {cards.map((card) => (
              <Card key={card.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{card.title}</h4>
                        <Badge variant="secondary">{card.engine}</Badge>
                        <Badge variant="outline">#{card.card_order}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{card.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Ícone: {card.icon_name}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <span>Cor:</span>
                          <div 
                            className="w-4 h-4 rounded border"
                            style={{ backgroundColor: card.background_color }}
                          />
                          <span>{card.background_color}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(card)}
                        disabled={editingCard !== null || showAddForm}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(card.id)}
                        disabled={saving}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {cards.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>Nenhum card encontrado.</p>
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
