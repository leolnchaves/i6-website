
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Save, X, Plus, Trash2 } from 'lucide-react';
import { useCMS } from '@/contexts/CMSContext';

interface ContentItem {
  id: string;
  key: string;
  content_en: string;
  content_pt: string;
  content_type: string;
  category: string | null;
}

const ContentEditor: React.FC = () => {
  const { content, loading, updateContent, createContent, deleteContent } = useCMS();
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editData, setEditData] = useState<{ en: string; pt: string }>({ en: '', pt: '' });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newItem, setNewItem] = useState({
    key: '',
    content_en: '',
    content_pt: '',
    category: '',
    content_type: 'text'
  });

  const handleEdit = (item: ContentItem) => {
    setEditingItem(item.key);
    setEditData({ en: item.content_en, pt: item.content_pt });
  };

  const handleSave = async (key: string) => {
    await updateContent(key, editData.en, editData.pt);
    setEditingItem(null);
    setEditData({ en: '', pt: '' });
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditData({ en: '', pt: '' });
  };

  const handleCreate = async () => {
    if (newItem.key && newItem.content_en && newItem.content_pt) {
      await createContent(
        newItem.key,
        newItem.content_en,
        newItem.content_pt,
        newItem.content_type,
        newItem.category || undefined
      );
      setNewItem({
        key: '',
        content_en: '',
        content_pt: '',
        category: '',
        content_type: 'text'
      });
      setShowCreateForm(false);
    }
  };

  const handleDelete = async (key: string) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      await deleteContent(key);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  // Group content by category
  const groupedContent = content.reduce((acc: any, item: ContentItem) => {
    const category = item.category || 'General';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Content Management</h2>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Content
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="key">Key</Label>
                <Input
                  id="key"
                  value={newItem.key}
                  onChange={(e) => setNewItem({ ...newItem, key: e.target.value })}
                  placeholder="e.g., header.title"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  placeholder="e.g., header"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="content_en">English Content</Label>
              <Textarea
                id="content_en"
                value={newItem.content_en}
                onChange={(e) => setNewItem({ ...newItem, content_en: e.target.value })}
                placeholder="English content"
              />
            </div>
            
            <div>
              <Label htmlFor="content_pt">Portuguese Content</Label>
              <Textarea
                id="content_pt"
                value={newItem.content_pt}
                onChange={(e) => setNewItem({ ...newItem, content_pt: e.target.value })}
                placeholder="Portuguese content"
              />
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={handleCreate}>Create</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {Object.entries(groupedContent).map(([category, items]: [string, any]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="capitalize">{category}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item: ContentItem) => (
                <div key={item.key} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm text-gray-600">{item.key}</h4>
                    <div className="flex space-x-2">
                      {editingItem === item.key ? (
                        <>
                          <Button size="sm" onClick={() => handleSave(item.key)}>
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleCancel}>
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => handleDelete(item.key)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {editingItem === item.key ? (
                    <div className="space-y-3">
                      <div>
                        <Label className="text-xs">English</Label>
                        <Textarea
                          value={editData.en}
                          onChange={(e) => setEditData({ ...editData, en: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Portuguese</Label>
                        <Textarea
                          value={editData.pt}
                          onChange={(e) => setEditData({ ...editData, pt: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-blue-600">English</Label>
                        <p className="text-sm mt-1">{item.content_en}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-green-600">Portuguese</Label>
                        <p className="text-sm mt-1">{item.content_pt}</p>
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
  );
};

export default ContentEditor;
