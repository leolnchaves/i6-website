
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, GripVertical, Target, Users, Cog, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

interface CardFormData {
  id?: string;
  title: string;
  description: string;
  icon_name: string;
  engine_name: string;
  background_color: string;
  background_opacity: number;
  is_active: boolean;
  card_order: number;
}

interface CompactSolutionCardFormProps {
  card: CardFormData;
  index: number;
  availableIcons: { value: string; label: string }[];
  availableEngines: string[];
  totalCards: number;
  onChange: (index: number, field: keyof CardFormData, value: any) => void;
  onMove: (index: number, direction: 'up' | 'down') => void;
  onRemove: (index: number) => void;
  onToggleActive: (index: number, isActive: boolean) => void;
}

const iconComponents = {
  'target': Target,
  'users': Users,
  'cog': Cog,
  'trending-up': TrendingUp,
  'dollar-sign': DollarSign,
  'bar-chart-3': BarChart3,
};

const CompactSolutionCardForm: React.FC<CompactSolutionCardFormProps> = ({
  card,
  index,
  availableIcons,
  availableEngines,
  totalCards,
  onChange,
  onMove,
  onRemove,
  onToggleActive,
}) => {
  const getSelectedIconDisplay = (iconName: string) => {
    const selectedOption = availableIcons.find(option => option.value === iconName);
    if (selectedOption) {
      const IconComponent = iconComponents[iconName as keyof typeof iconComponents];
      return (
        <div className="flex items-center gap-2">
          {IconComponent && <IconComponent className="h-4 w-4" />}
          {selectedOption.label}
        </div>
      );
    }
    return "Selecione um ícone";
  };

  return (
    <Card className={`transition-all duration-200 ${!card.is_active ? 'opacity-60' : ''}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
              <Badge variant="outline">
                #{card.card_order}
              </Badge>
            </div>
            <CardTitle className="text-base">
              Card {index + 1}
            </CardTitle>
            {!card.is_active && (
              <Badge variant="secondary">Inativo</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onMove(index, 'up')}
              disabled={index === 0}
            >
              ↑
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onMove(index, 'down')}
              disabled={index === totalCards - 1}
            >
              ↓
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onRemove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`title-${index}`}>Título</Label>
            <Input
              id={`title-${index}`}
              value={card.title}
              onChange={(e) => onChange(index, 'title', e.target.value)}
              placeholder="Título do card"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`engine-${index}`}>Motor</Label>
            <Select
              value={card.engine_name}
              onValueChange={(value) => onChange(index, 'engine_name', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um motor" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {availableEngines.map((engine) => (
                  <SelectItem key={engine} value={engine}>
                    {engine}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`icon-${index}`}>Ícone</Label>
            <Select
              value={card.icon_name}
              onValueChange={(value) => onChange(index, 'icon_name', value)}
            >
              <SelectTrigger>
                <SelectValue>
                  {getSelectedIconDisplay(card.icon_name)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white">
                {availableIcons.map((option) => {
                  const IconComponent = iconComponents[option.value as keyof typeof iconComponents];
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        {IconComponent && <IconComponent className="h-4 w-4" />}
                        {option.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`bg-color-${index}`}>Cor de Fundo</Label>
            <div className="flex gap-2">
              <Input
                id={`bg-color-${index}`}
                type="color"
                value={card.background_color}
                onChange={(e) => onChange(index, 'background_color', e.target.value)}
                className="w-16 h-10"
              />
              <Input
                value={card.background_color}
                onChange={(e) => onChange(index, 'background_color', e.target.value)}
                placeholder="#1E4A94"
                className="flex-1"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id={`active-${index}`}
              checked={card.is_active}
              onCheckedChange={(checked) => onToggleActive(index, checked)}
            />
            <Label htmlFor={`active-${index}`}>Card Ativo</Label>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`description-${index}`}>Descrição</Label>
          <Textarea
            id={`description-${index}`}
            value={card.description}
            onChange={(e) => onChange(index, 'description', e.target.value)}
            placeholder="Descrição do card"
            rows={3}
          />
        </div>

        {/* Preview do card */}
        <div className="pt-4">
          <Label>Preview do Card</Label>
          <div 
            className="mt-2 p-4 rounded-lg text-white"
            style={{ 
              backgroundColor: card.background_color,
              opacity: card.background_opacity
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <Badge variant="secondary" className="bg-white/20 text-white">
                {card.engine_name}
              </Badge>
            </div>
            <h4 className="font-bold text-sm mb-2">{card.title}</h4>
            <p className="text-xs text-white/90 line-clamp-2">{card.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompactSolutionCardForm;
