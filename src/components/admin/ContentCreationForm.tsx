
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, X } from 'lucide-react';

interface EditingContent {
  key: string;
  content_en: string;
  content_pt: string;
  category?: string;
  content_type?: string;
  page?: string;
}

interface ContentCreationFormProps {
  newContent: EditingContent;
  setNewContent: (content: EditingContent) => void;
  onSave: () => Promise<void>;
  onCancel: () => void;
}

const ContentCreationForm: React.FC<ContentCreationFormProps> = ({
  newContent,
  setNewContent,
  onSave,
  onCancel
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar Novo Conteúdo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Chave</label>
          <Input
            value={newContent.key}
            onChange={(e) => setNewContent({ ...newContent, key: e.target.value })}
            placeholder="exemplo: home.hero.title"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Página</label>
            <Select value={newContent.page} onValueChange={(value) => setNewContent({ ...newContent, page: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a página" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="home">Home</SelectItem>
                <SelectItem value="solutions">Solutions</SelectItem>
                <SelectItem value="contact">Contact</SelectItem>
                <SelectItem value="success-stories">Success Stories</SelectItem>
                <SelectItem value="component">Component (usado em múltiplas páginas)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Categoria</label>
            <Input
              value={newContent.category}
              onChange={(e) => setNewContent({ ...newContent, category: e.target.value })}
              placeholder="hero, stats, cta, etc."
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Conteúdo (Inglês)</label>
          <Textarea
            value={newContent.content_en}
            onChange={(e) => setNewContent({ ...newContent, content_en: e.target.value })}
            placeholder="Conteúdo em inglês..."
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Conteúdo (Português)</label>
          <Textarea
            value={newContent.content_pt}
            onChange={(e) => setNewContent({ ...newContent, content_pt: e.target.value })}
            placeholder="Conteúdo em português..."
            rows={3}
          />
        </div>
        <div className="flex space-x-2">
          <Button onClick={onSave} className="flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Criar</span>
          </Button>
          <Button variant="outline" onClick={onCancel} className="flex items-center space-x-2">
            <X className="w-4 h-4" />
            <span>Cancelar</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentCreationForm;
