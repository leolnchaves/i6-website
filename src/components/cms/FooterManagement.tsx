
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Save, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCMSPageContent } from '@/hooks/useCMSPageContent';
import { supabase } from '@/integrations/supabase/client';

const FooterManagement = () => {
  const { toast } = useToast();
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'pt'>('en');
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    company_description: '',
    contact_email: '',
    contact_phone: '',
    copyright_text: ''
  });

  const { content, loading, error, refetch } = useCMSPageContent('components', selectedLanguage);

  // Update form data when content loads
  useEffect(() => {
    if (content && Object.keys(content).length > 0) {
      setFormData({
        company_description: content['footer.company_description'] || '',
        contact_email: content['footer.contact_email'] || '',
        contact_phone: content['footer.contact_phone'] || '',
        copyright_text: content['footer.copyright_text'] || ''
      });
    }
  }, [content]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Get the components page ID
      const { data: pageData, error: pageError } = await supabase
        .from('cms_pages')
        .select('id')
        .eq('slug', 'components')
        .single();

      if (pageError) {
        throw new Error('Erro ao buscar página de componentes');
      }

      // Save each field
      const updates = Object.entries(formData).map(([field, value]) => 
        supabase
          .from('cms_page_content')
          .upsert({
            page_id: pageData.id,
            section_name: 'footer',
            field_name: field,
            language: selectedLanguage,
            content: value
          }, {
            onConflict: 'page_id,section_name,field_name,language'
          })
      );

      await Promise.all(updates);

      toast({
        title: 'Footer salvo com sucesso',
        description: `O conteúdo do footer foi atualizado para ${selectedLanguage === 'en' ? 'inglês' : 'português'}.`,
      });

      // Refetch to update the content
      refetch();
    } catch (err) {
      console.error('Error saving footer:', err);
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar o conteúdo do footer.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-600">Carregando conteúdo do footer...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-red-600 mb-4">Erro ao carregar conteúdo do footer</p>
          <Button onClick={refetch} variant="outline">
            Tentar novamente
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Gestão do Footer</CardTitle>
              <CardDescription>
                Edite o conteúdo do footer que aparece em todas as páginas do site
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={selectedLanguage === 'en' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedLanguage('en')}
              >
                🇺🇸 EN
              </Button>
              <Button
                variant={selectedLanguage === 'pt' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedLanguage('pt')}
              >
                🇧🇷 PT
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Editando em {selectedLanguage === 'en' ? 'Inglês' : 'Português'}
          </Badge>

          <div className="grid gap-6">
            <div className="space-y-2">
              <Label htmlFor="company_description">Descrição da Empresa</Label>
              <Textarea
                id="company_description"
                placeholder="Digite a descrição da empresa que aparece no footer..."
                value={formData.company_description}
                onChange={(e) => handleInputChange('company_description', e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact_email">Email de Contato</Label>
                <Input
                  id="contact_email"
                  type="email"
                  placeholder="email@empresa.com"
                  value={formData.contact_email}
                  onChange={(e) => handleInputChange('contact_email', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_phone">Telefone de Contato</Label>
                <Input
                  id="contact_phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.contact_phone}
                  onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="copyright_text">Texto de Copyright</Label>
              <Input
                id="copyright_text"
                placeholder="© 2024 Empresa. Todos os direitos reservados."
                value={formData.copyright_text}
                onChange={(e) => handleInputChange('copyright_text', e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button 
              onClick={handleSave} 
              disabled={saving}
              className="flex items-center gap-2"
            >
              {saving ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {saving ? 'Salvando...' : 'Salvar Footer'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Preview do Footer</CardTitle>
          <CardDescription>
            Visualização de como o footer aparecerá no site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 text-white p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <img 
                    src="/lovable-uploads/fa0e2de0-5d60-4759-bb8f-ae448b70417c.png" 
                    alt="Infinity6" 
                    className="h-8 w-auto"
                  />
                </div>
                <p className="text-gray-400 mb-6 max-w-md">
                  {formData.company_description || 'Descrição da empresa aparecerá aqui...'}
                </p>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Contato</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>{formData.contact_email || 'email@empresa.com'}</li>
                  <li>{formData.contact_phone || '+1 (555) 123-4567'}</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>{formData.copyright_text || '© 2024 Empresa. Todos os direitos reservados.'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FooterManagement;
