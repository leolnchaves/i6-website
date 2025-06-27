
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pencil, Plus, Trash2, Save, X } from 'lucide-react';
import { useCMS } from '@/contexts/CMSContext';

interface EditingContent {
  key: string;
  content_en: string;
  content_pt: string;
  category?: string;
  content_type?: string;
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
    content_type: 'text'
  });

  const handleEdit = (item: any) => {
    setEditingItem({
      key: item.key,
      content_en: item.content_en,
      content_pt: item.content_pt,
      category: item.category,
      content_type: item.content_type
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
      newContent.category
    );
    
    setNewContent({
      key: '',
      content_en: '',
      content_pt: '',
      category: '',
      content_type: 'text'
    });
    setIsCreating(false);
  };

  const handleDelete = async (key: string) => {
    if (confirm('Tem certeza que deseja deletar este conteúdo?')) {
      await deleteContent(key);
    }
  };

  const groupedContent = content.reduce((acc: any, item: any) => {
    const category = item.category || 'uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
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
                placeholder="exemplo: hero.title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Categoria</label>
              <Input
                value={newContent.category}
                onChange={(e) => setNewContent({ ...newContent, category: e.target.value })}
                placeholder="hero, stats, cta, etc."
              />
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
                    content_type: 'text'
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

      {Object.entries(groupedContent).map(([category, items]: [string, any]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="capitalize">{category}</span>
              <Badge variant="secondary">{items.length} itens</Badge>
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

      {Object.keys(groupedContent).length === 0 && (
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
