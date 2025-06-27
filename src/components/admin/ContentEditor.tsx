
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useCMS } from '@/contexts/CMSContext';
import ContentCreationForm from './ContentCreationForm';
import ContentPageSection from './ContentPageSection';

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

  const handleCancelCreation = () => {
    setIsCreating(false);
    setNewContent({
      key: '',
      content_en: '',
      content_pt: '',
      category: '',
      content_type: 'text',
      page: ''
    });
  };

  // Organizar conteúdo por página e depois por categoria
  const organizedContent = content.reduce((acc: Record<string, Record<string, any[]>>, item: any) => {
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
        <ContentCreationForm
          newContent={newContent}
          setNewContent={setNewContent}
          onSave={handleCreate}
          onCancel={handleCancelCreation}
        />
      )}

      {Object.entries(organizedContent).map(([page, categories]) => (
        <ContentPageSection
          key={page}
          page={page}
          categories={categories}
          editingItem={editingItem}
          setEditingItem={setEditingItem}
          onSave={handleSave}
          onDelete={handleDelete}
        />
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
