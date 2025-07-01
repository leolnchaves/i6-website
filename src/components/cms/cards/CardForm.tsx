
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface CardFormProps {
  title: string;
  description: string;
  iconName: string;
  iconColor: string;
  backgroundColor: string;
  backgroundOpacity: number;
  isActive: boolean;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onIconNameChange: (value: string) => void;
  onIconColorChange: (value: string) => void;
  onBackgroundColorChange: (value: string) => void;
  onBackgroundOpacityChange: (value: number) => void;
  onIsActiveChange: (value: boolean) => void;
  onDelete: () => void;
}

const CardForm: React.FC<CardFormProps> = ({
  title,
  description,
  iconName,
  iconColor,
  backgroundColor,
  backgroundOpacity,
  isActive,
  onTitleChange,
  onDescriptionChange,
  onIconNameChange,
  onIconColorChange,
  onBackgroundColorChange,
  onBackgroundOpacityChange,
  onIsActiveChange,
  onDelete,
}) => {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Card Configuration</h4>
        <div className="flex items-center gap-2">
          <Switch
            checked={isActive}
            onCheckedChange={onIsActiveChange}
          />
          <Label className="text-sm">Ativo</Label>
          <Button
            size="sm"
            variant="ghost"
            onClick={onDelete}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Digite o título do card..."
            autoComplete="off"
          />
        </div>

        <div>
          <Label htmlFor="iconName">Nome do Ícone</Label>
          <Input
            id="iconName"
            type="text"
            value={iconName}
            onChange={(e) => onIconNameChange(e.target.value)}
            placeholder="Ex: star, heart, etc..."
            autoComplete="off"
          />
        </div>

        <div>
          <Label htmlFor="iconColor">Cor do Ícone</Label>
          <Input
            id="iconColor"
            type="text"
            value={iconColor}
            onChange={(e) => onIconColorChange(e.target.value)}
            placeholder="#f97316"
            autoComplete="off"
          />
        </div>

        <div>
          <Label htmlFor="backgroundColor">Cor de Fundo</Label>
          <Input
            id="backgroundColor"
            type="text"
            value={backgroundColor}
            onChange={(e) => onBackgroundColorChange(e.target.value)}
            placeholder="#ffffff"
            autoComplete="off"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Digite a descrição do card..."
          rows={3}
          className="resize-none"
        />
      </div>
    </div>
  );
};

export default CardForm;
