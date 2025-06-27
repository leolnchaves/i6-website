import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pencil, Plus, Trash2, Save, X } from 'lucide-react';
import { useCMS } from '@/contexts/CMSContext';

interface EditingContent {
  key: string;
  content_en: string;
  content_pt: string;
  category?: string;
  content_type?: string;
  page?: string;
}

const ContentEditor: React.FC = () => {
  const { content, loading, updateContent, createContent, deleteContent } = useCMS();
  const [editingItem, setEditingItem] = useState<EditingContent | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newContent, setNewContent] = useState<EditingContent>({
    key: '',
    content_en: '',
    content_pt: '',
    category: '',
    content_type: 'text',
    page: ''
  });

  const handleEdit = (item: any) => {
    setEditingItem({
      key: item.key,
      content_en: item.content_en,
      content_pt: item.content_pt,
      category: item.category,
      content_type: item.content_type,
      page: item.page
    });
  };

  const handleSave = async () => {
    if (!editingItem) return;
    
    await updateContent(editingItem.key, editingItem.content_en, editingItem.content_pt);
    setEditingItem(null);
  };

  const handleCreate = async () => {
    if (!newContent.key || !newContent.content_en || !newContent.content_pt) {
      return;
    }
    
    await createContent(
      newContent.key, 
      newContent.content_en, 
      newContent.content_pt, 
      newContent.content_type || 'text',
      newContent.category,
      newContent.page
    );
    
    setNewContent({
      key: '',
      content_en: '',
      content_pt: '',
      category: '',
      content_type: 'text',
      page: ''
    });
    setIsCreating(false);
  };

  const handleDelete = async (key: string) => {
    if (confirm('Tem certeza que deseja deletar este conteúdo?')) {
      await deleteContent(key);
    }
  };

  // Organizar conteúdo por página e depois por categoria
  const organizedContent = content.reduce((acc: any, item: any) => {
    const page = item.page || 'uncategorized';
    const category = item.category || 'uncategorized';
    
    if (!acc[page]) {
      acc[page] = {};
    }
    if (!acc[page][category]) {
      acc[page][category] = [];
    }
    acc[page][category].push(item);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Carregando conteúdo...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Editor de Conteúdo</h2>
        <Button onClick={() => setIsCreating(true)} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Novo Conteúdo</span>
        </Button>
      </div>

      {isCreating && (
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
              <Button onClick={handleCreate} className="flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Criar</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsCreating(false);
                  setNewContent({
                    key: '',
                    content_en: '',
                    content_pt: '',
                    category: '',
                    content_type: 'text',
                    page: ''
                  });
                }}
                className="flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancelar</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {Object.entries(organizedContent).map(([page, categories]: [string, any]) => (
        <div key={page} className="space-y-4">
          <h3 className="text-xl font-semibold capitalize flex items-center space-x-2">
            <span>{page === 'component' ? 'Componentes Reutilizáveis' : `Página: ${page}`}</span>
            <Badge variant="secondary">
              {Object.values(categories).reduce((total: number, items: any[]) => total + items.length, 0 as number)} itens
            </Badge>
          </h3>
          
          {Object.entries(categories).map(([category, items]: [string, any]) => (
            <Card key={`${page}-${category}`}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <span className="capitalize">{category}</span>
                  <Badge variant="outline">{items.length} itens</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item: any) => (
                    <div key={item.key} className="border rounded-lg p-4">
                      {editingItem?.key === item.key ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Chave: {item.key}</label>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Conteúdo (Inglês)</label>
                            <Textarea
                              value={editingItem.content_en}
                              onChange={(e) => setEditingItem({ ...editingItem, content_en: e.target.value })}
                              rows={3}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Conteúdo (Português)</label>
                            <Textarea
                              value={editingItem.content_pt}
                              onChange={(e) => setEditingItem({ ...editingItem, content_pt: e.target.value })}
                              rows={3}
                            />
                          </div>
                          <div className="flex space-x-2">
                            <Button onClick={handleSave} className="flex items-center space-x-2">
                              <Save className="w-4 h-4" />
                              <span>Salvar</span>
                            </Button>
                            <Button variant="outline" onClick={() => setEditingItem(null)} className="flex items-center space-x-2">
                              <X className="w-4 h-4" />
                              <span>Cancelar</span>
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium text-sm text-gray-600">{item.key}</h4>
                              <div className="flex space-x-2 mt-1">
                                <Badge variant="outline" className="text-xs">{item.page}</Badge>
                                <Badge variant="outline" className="text-xs">{item.category}</Badge>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                                <Pencil className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleDelete(item.key)}>
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <span className="text-sm font-medium">EN:</span>
                              <p className="text-sm text-gray-700">{item.content_en}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium">PT:</span>
                              <p className="text-sm text-gray-700">{item.content_pt}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ))}

      {Object.keys(organizedContent).length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">Nenhum conteúdo encontrado. Clique em "Novo Conteúdo" para começar.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContentEditor;
