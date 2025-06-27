
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useCMSContent } from '@/hooks/useCMSContent';

interface CMSContentEditorProps {
  pageSlug: string;
  section: string;
  fields: {
    key: string;
    label: string;
    type: 'text' | 'textarea';
  }[];
}

const CMSContentEditor: React.FC<CMSContentEditorProps> = ({ 
  pageSlug, 
  section, 
  fields 
}) => {
  const { content, isLoading, error, refetch } = useCMSContent(pageSlug, section);
  const [formData, setFormData] = useState<{ [key: string]: { en: string; pt: string } }>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Inicializar dados do formulário
  React.useEffect(() => {
    if (content && Object.keys(content).length > 0) {
      const initialData: { [key: string]: { en: string; pt: string } } = {};
      
      fields.forEach(field => {
        if (!initialData[field.key]) {
          initialData[field.key] = { en: '', pt: '' };
        }
      });

      // Buscar conteúdo para ambos idiomas
      fetchContentForBothLanguages().then((allContent) => {
        fields.forEach(field => {
          initialData[field.key] = {
            en: allContent.en[field.key] || '',
            pt: allContent.pt[field.key] || ''
          };
        });
        setFormData(initialData);
      });
    }
  }, [content, fields]);

  const fetchContentForBothLanguages = async () => {
    try {
      // Buscar página
      const { data: page } = await supabase
        .from('cms_pages')
        .select('id')
        .eq('slug', pageSlug)
        .eq('is_active', true)
        .single();

      if (!page) return { en: {}, pt: {} };

      // Buscar conteúdo em inglês
      const { data: enContent } = await supabase
        .from('cms_page_content')
        .select('field_key, content')
        .eq('page_id', page.id)
        .eq('section', section)
        .eq('language', 'en');

      // Buscar conteúdo em português
      const { data: ptContent } = await supabase
        .from('cms_page_content')
        .select('field_key, content')
        .eq('page_id', page.id)
        .eq('section', section)
        .eq('language', 'pt');

      const enObj: { [key: string]: string } = {};
      const ptObj: { [key: string]: string } = {};

      enContent?.forEach(item => {
        if (item.field_key && item.content) {
          enObj[item.field_key] = item.content;
        }
      });

      ptContent?.forEach(item => {
        if (item.field_key && item.content) {
          ptObj[item.field_key] = item.content;
        }
      });

      return { en: enObj, pt: ptObj };
    } catch (error) {
      console.error('Erro ao buscar conteúdo para ambos idiomas:', error);
      return { en: {}, pt: {} };
    }
  };

  const handleInputChange = (fieldKey: string, language: 'en' | 'pt', value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldKey]: {
        ...prev[fieldKey],
        [language]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      // Buscar página
      const { data: page, error: pageError } = await supabase
        .from('cms_pages')
        .select('id')
        .eq('slug', pageSlug)
        .eq('is_active', true)
        .single();

      if (pageError || !page) {
        throw new Error('Página não encontrada');
      }

      // Salvar conteúdo para cada campo e idioma
      for (const field of fields) {
        for (const language of ['en', 'pt'] as const) {
          const content = formData[field.key]?.[language] || '';
          
          if (content.trim()) {
            const { error: upsertError } = await supabase
              .from('cms_page_content')
              .upsert({
                page_id: page.id,
                section,
                field_key: field.key,
                language,
                content: content.trim()
              }, {
                onConflict: 'page_id,section,field_key,language'
              });

            if (upsertError) {
              throw new Error(`Erro ao salvar ${field.key} (${language}): ${upsertError.message}`);
            }
          }
        }
      }

      setSaveSuccess(true);
      refetch(); // Atualizar conteúdo
      
      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSaveSuccess(false), 3000);

    } catch (error) {
      console.error('Erro ao salvar conteúdo:', error);
      setSaveError(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <RefreshCw className="h-6 w-6 animate-spin mr-2" />
          Carregando conteúdo...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Editor de Conteúdo - {section}</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {saveError && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{saveError}</AlertDescription>
          </Alert>
        )}

        {saveSuccess && (
          <Alert className="mb-4">
            <AlertDescription>Conteúdo salvo com sucesso!</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="en" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="en">English</TabsTrigger>
            <TabsTrigger value="pt">Português</TabsTrigger>
          </TabsList>

          {(['en', 'pt'] as const).map(language => (
            <TabsContent key={language} value={language} className="space-y-4">
              {fields.map(field => (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={`${field.key}_${language}`}>
                    {field.label} ({language.toUpperCase()})
                  </Label>
                  {field.type === 'textarea' ? (
                    <Textarea
                      id={`${field.key}_${language}`}
                      value={formData[field.key]?.[language] || ''}
                      onChange={(e) => handleInputChange(field.key, language, e.target.value)}
                      rows={4}
                    />
                  ) : (
                    <Input
                      id={`${field.key}_${language}`}
                      value={formData[field.key]?.[language] || ''}
                      onChange={(e) => handleInputChange(field.key, language, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>

        <div className="flex gap-2 mt-6">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </>
            )}
          </Button>
          <Button variant="outline" onClick={refetch} disabled={isLoading}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Recarregar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CMSContentEditor;
