
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Save, Globe, Home } from 'lucide-react';
import { useCMSContent } from '@/hooks/useCMSContent';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const ContentManagement = () => {
  const { pages, content, loading, fetchPageContent, saveContent, getContent } = useCMSContent();
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [saving, setSaving] = useState(false);

  // Campos específicos para a seção Hero
  const heroFields = [
    { section: 'hero', field: 'infinite', label: 'Título Principal - "Infinite"', type: 'input' },
    { section: 'hero', field: 'possibilities', label: 'Título Principal - "Possibilities"', type: 'input' },
    { section: 'hero', field: 'poweredByAI', label: 'Subtítulo - "Powered by AI"', type: 'input' },
    { section: 'hero', field: 'description', label: 'Descrição', type: 'textarea' },
    { section: 'hero', field: 'startJourney', label: 'Botão - "Start Journey"', type: 'input' },
    { section: 'hero', field: 'watchDemo', label: 'Botão - "Watch Demo"', type: 'input' },
  ];

  // Carregar conteúdo quando página ou idioma mudarem
  useEffect(() => {
    if (selectedPage) {
      fetchPageContent(selectedPage, selectedLanguage);
    }
  }, [selectedPage, selectedLanguage, fetchPageContent]);

  // Atualizar formData quando conteúdo mudar
  useEffect(() => {
    const newFormData: { [key: string]: string } = {};
    heroFields.forEach(field => {
      const key = `${field.section}_${field.field}`;
      newFormData[key] = getContent(field.section, field.field, selectedLanguage);
    });
    setFormData(newFormData);
  }, [content, selectedLanguage, getContent]);

  // Selecionar página Home automaticamente se disponível
  useEffect(() => {
    if (pages.length > 0 && !selectedPage) {
      const homePage = pages.find(p => p.slug === 'home');
      if (homePage) {
        setSelectedPage(homePage.id);
      }
    }
  }, [pages, selectedPage]);

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!selectedPage) return;

    setSaving(true);
    try {
      // Salvar todos os campos modificados
      const savePromises = heroFields.map(field => {
        const key = `${field.section}_${field.field}`;
        const value = formData[key] || '';
        
        return saveContent(
          selectedPage,
          field.section,
          field.field,
          selectedLanguage,
          value
        );
      });

      await Promise.all(savePromises);
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestão de Conteúdo</h1>
        <p className="text-gray-600">
          Gerencie o conteúdo das páginas com suporte a múltiplos idiomas.
        </p>
      </div>

      <Separator />

      {/* Seletores */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Configurações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="page-select">Página</Label>
              <Select value={selectedPage} onValueChange={setSelectedPage}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma página" />
                </SelectTrigger>
                <SelectContent>
                  {pages.map(page => (
                    <SelectItem key={page.id} value={page.id}>
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        {page.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language-select">Idioma</Label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">
                    <div className="flex items-center gap-2">
                      🇺🇸 English
                    </div>
                  </SelectItem>
                  <SelectItem value="pt">
                    <div className="flex items-center gap-2">
                      🇧🇷 Português
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campos de conteúdo */}
      {selectedPage && (
        <Card>
          <CardHeader>
            <CardTitle>Seção Hero - Página Principal</CardTitle>
            <CardDescription>
              Edite o conteúdo da seção principal da página inicial
              <Badge variant="outline" className="ml-2">
                {selectedLanguage === 'en' ? '🇺🇸 English' : '🇧🇷 Português'}
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {heroFields.map(field => {
              const key = `${field.section}_${field.field}`;
              const value = formData[key] || '';

              return (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key}>{field.label}</Label>
                  {field.type === 'textarea' ? (
                    <Textarea
                      id={key}
                      value={value}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      placeholder={`Digite o ${field.label.toLowerCase()}...`}
                      rows={3}
                    />
                  ) : (
                    <Input
                      id={key}
                      value={value}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      placeholder={`Digite o ${field.label.toLowerCase()}...`}
                    />
                  )}
                </div>
              );
            })}

            <div className="flex justify-end pt-4">
              <Button onClick={handleSave} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContentManagement;
