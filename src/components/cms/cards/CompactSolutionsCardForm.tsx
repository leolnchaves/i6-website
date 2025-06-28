
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Trash2, GripVertical, Eye, EyeOff } from 'lucide-react';

interface CompactSolutionCardFormData {
  id?: string;
  title: string;
  description: string;
  engine: string;
  icon_name: string;
  background_color: string;
  is_active: boolean;
  card_order: number;
}

interface CompactSolutionsCardFormProps {
  card: CompactSolutionCardFormData;
  index: number;
  availableIcons: Array<{ value: string; label: string }>;
  availableEngines: Array<{ value: string; label: string }>;
  defaultColors: string[];
  totalCards: number;
  onChange: (index: number, field: keyof CompactSolutionCardFormData, value: any) => void;
  onMove: (index: number, direction: 'up' | 'down') => void;
  onRemove: (index: number) => void;
  onToggleActive: (index: number, isActive: boolean) => void;
}

const CompactSolutionsCardForm: React.FC<CompactSolutionsCardFormProps> = ({
  card,
  index,
  availableIcons,
  availableEngines,
  defaultColors,
  totalCards,
  onChange,
  onMove,
  onRemove,
  onToggleActive,
}) => {
  return (
    <Card className="border-l-4 border-l-orange-500">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GripVertical className="h-4 w-4 text-gray-400" />
            <CardTitle className="text-sm">
              Card {index + 1}
            </CardTitle>
            <Badge variant={card.is_active ? "default" : "secondary"}>
              {card.is_active ? "Ativo" : "Inativo"}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMove(index, 'up')}
              disabled={index === 0}
            >
              ↑
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMove(index, 'down')}
              disabled={index === totalCards - 1}
            >
              ↓
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleActive(index, !card.is_active)}
              title={card.is_active ? 'Desativar card em todos os idiomas' : 'Ativar card em todos os idiomas'}
            >
              {card.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(index)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Título</Label>
            <Input
              value={card.title}
              onChange={(e) => onChange(index, 'title', e.target.value)}
              placeholder="Digite o título do card..."
            />
          </div>
          <div className="space-y-2">
            <Label>Engine</Label>
            <Select
              value={card.engine}
              onValueChange={(value) => onChange(index, 'engine', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableEngines.map((engine) => (
                  <SelectItem key={engine.value} value={engine.value}>
                    {engine.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Descrição</Label>
          <Textarea
            value={card.description}
            onChange={(e) => onChange(index, 'description', e.target.value)}
            placeholder="Digite a descrição do card..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Ícone</Label>
            <Select
              value={card.icon_name}
              onValueChange={(value) => onChange(index, 'icon_name', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableIcons.map((icon) => (
                  <SelectItem key={icon.value} value={icon.value}>
                    {icon.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Cor de Fundo</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={card.background_color || '#1E4A94'}
                onChange={(e) => onChange(index, 'background_color', e.target.value)}
                className="w-12 h-10 p-1 rounded border"
              />
              <Input
                value={card.background_color}
                onChange={(e) => onChange(index, 'background_color', e.target.value)}
                placeholder="#1E4A94"
              />
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {defaultColors.map((color) => (
                <button
                  key={color}
                  className="w-6 h-6 rounded border-2 border-gray-300 hover:border-gray-500"
                  style={{ backgroundColor: color }}
                  onClick={() => onChange(index, 'background_color', color)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={card.is_active}
            onCheckedChange={(checked) => onToggleActive(index, checked)}
          />
          <Label>Card ativo (sincronizado em todos os idiomas)</Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompactSolutionsCardForm;
