
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Save, X } from 'lucide-react';

interface EditingContent {
  key: string;
  content_en: string;
  content_pt: string;
  category?: string;
  content_type?: string;
  page?: string;
}

interface ContentItemProps {
  item: any;
  editingItem: EditingContent | null;
  setEditingItem: (item: EditingContent | null) => void;
  onSave: () => Promise<void>;
  onDelete: (key: string) => Promise<void>;
}

const ContentItem: React.FC<ContentItemProps> = ({
  item,
  editingItem,
  setEditingItem,
  onSave,
  onDelete
}) => {
  const handleEdit = () => {
    setEditingItem({
      key: item.key,
      content_en: item.content_en,
      content_pt: item.content_pt,
      category: item.category,
      content_type: item.content_type,
      page: item.page
    });
  };

  const isEditing = editingItem?.key === item.key;

  return (
    <div className="border rounded-lg p-4">
      {isEditing ? (
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
            <Button onClick={onSave} className="flex items-center space-x-2">
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
              <Button size="sm" variant="outline" onClick={handleEdit}>
                <Pencil className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => onDelete(item.key)}>
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
  );
};

export default ContentItem;
