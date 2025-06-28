
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Save } from 'lucide-react';

interface SEOFormData {
  meta_title: string;
  meta_description: string;
  slug: string;
  canonical_url: string;
  index_flag: boolean;
  follow_flag: boolean;
}

interface SEOFormProps {
  formData: SEOFormData;
  selectedLanguage: string;
  saving: boolean;
  onFieldChange: (field: string, value: string | boolean) => void;
  onSave: () => void;
}

const SEOForm: React.FC<SEOFormProps> = ({
  formData,
  selectedLanguage,
  saving,
  onFieldChange,
  onSave,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de SEO</CardTitle>
        <CardDescription>
          Configure os metadados para otimização de mecanismos de busca
          <Badge variant="outline" className="ml-2">
            {selectedLanguage === 'en' ? '🇺🇸 English' : '🇧🇷 Português'}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="meta_title">Título da Página (Meta Title)</Label>
          <Input
            id="meta_title"
            value={formData.meta_title}
            onChange={(e) => onFieldChange('meta_title', e.target.value)}
            placeholder="Digite o título da página..."
            maxLength={60}
          />
          <p className="text-sm text-gray-500">
            {formData.meta_title.length}/60 caracteres (recomendado: até 60)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="meta_description">Descrição (Meta Description)</Label>
          <Textarea
            id="meta_description"
            value={formData.meta_description}
            onChange={(e) => onFieldChange('meta_description', e.target.value)}
            placeholder="Digite a descrição da página..."
            rows={3}
            maxLength={160}
          />
          <p className="text-sm text-gray-500">
            {formData.meta_description.length}/160 caracteres (recomendado: até 160)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug da URL</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => onFieldChange('slug', e.target.value)}
            placeholder="Digite o slug da URL..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="canonical_url">URL Canônica</Label>
          <Input
            id="canonical_url"
            value={formData.canonical_url}
            onChange={(e) => onFieldChange('canonical_url', e.target.value)}
            placeholder="Digite a URL canônica..."
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="index_flag">Indexação (Index)</Label>
              <p className="text-sm text-gray-500">
                Permitir que mecanismos de busca indexem esta página
              </p>
            </div>
            <Switch
              id="index_flag"
              checked={formData.index_flag}
              onCheckedChange={(checked) => onFieldChange('index_flag', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="follow_flag">Seguir Links (Follow)</Label>
              <p className="text-sm text-gray-500">
                Permitir que mecanismos de busca sigam os links desta página
              </p>
            </div>
            <Switch
              id="follow_flag"
              checked={formData.follow_flag}
              onCheckedChange={(checked) => onFieldChange('follow_flag', checked)}
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Salvando...' : 'Salvar SEO'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SEOForm;
