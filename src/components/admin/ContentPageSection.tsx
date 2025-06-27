
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ContentItem from './ContentItem';

interface EditingContent {
  key: string;
  content_en: string;
  content_pt: string;
  category?: string;
  content_type?: string;
  page?: string;
}

interface ContentPageSectionProps {
  page: string;
  categories: Record<string, any[]>;
  editingItem: EditingContent | null;
  setEditingItem: (item: EditingContent | null) => void;
  onSave: () => Promise<void>;
  onDelete: (key: string) => Promise<void>;
}

const ContentPageSection: React.FC<ContentPageSectionProps> = ({
  page,
  categories,
  editingItem,
  setEditingItem,
  onSave,
  onDelete
}) => {
  const totalItems = Object.values(categories).reduce((total, items) => {
    return total + (Array.isArray(items) ? items.length : 0);
  }, 0);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold capitalize flex items-center space-x-2">
        <span>{page === 'component' ? 'Componentes Reutilizáveis' : `Página: ${page}`}</span>
        <Badge variant="secondary">
          {totalItems} itens
        </Badge>
      </h3>
      
      {Object.entries(categories).map(([category, items]) => (
        <Card key={`${page}-${category}`}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <span className="capitalize">{category}</span>
              <Badge variant="outline">{Array.isArray(items) ? items.length : 0} itens</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.isArray(items) && items.map((item) => (
                <ContentItem
                  key={item.key}
                  item={item}
                  editingItem={editingItem}
                  setEditingItem={setEditingItem}
                  onSave={onSave}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContentPageSection;
