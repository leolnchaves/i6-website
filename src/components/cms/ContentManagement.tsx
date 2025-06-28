import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Home, Search } from 'lucide-react';
import { useCMSContent } from '@/hooks/useCMSContent';
import { useCMSSEO } from '@/hooks/useCMSSEO';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import PageSelector from './content/PageSelector';
import ContentSectionAccordion from './content/ContentSectionAccordion';
import SEOForm from './content/SEOForm';

const ContentManagement = () => {
  const { pages, content, loading: contentLoading, fetchPageContent, saveContent, getContent } = useCMSContent();
  const { seoData, loading: seoLoading, fetchSEOData, saveSEOData, getSEOData } = useCMSSEO();
  
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [contentFormData, setContentFormData] = useState<{ [key: string]: string }>({});
  const [seoFormData, setSeoFormData] = useState({
    meta_title: '',
    meta_description: '',
    slug: '',
    canonical_url: '',
    index_flag: true,
    follow_flag: true
  });
  const [saving, setSaving] = useState(false);

  // Campos específicos para a seção Hero
  const heroFields = [
    { section: 'hero', field: 'infinite', label: 'Título Principal', type: 'input' as const },
    { section: 'hero', field: 'possibilities', label: 'Título Destaque', type: 'input' as const },
    { section: 'hero', field: 'poweredByAI', label: 'Subtítulo', type: 'input' as const },
    { section: 'hero', field: 'description', label: 'Descrição', type: 'textarea' as const },
    { section: 'hero', field: 'startJourney', label: 'Botão Jornada', type: 'input' as const },
    { section: 'hero', field: 'watchDemo', label: 'Botão Demo', type: 'input' as const },
    { section: 'hero', field: 'demoLink', label: 'Link do Demo (URL)', type: 'input' as const },
  ];

  // Campos específicos para a seção Results
  const resultsFields = [
    { section: 'results', field: 'mainTitle', label: 'Título', type: 'input' as const },
    { section: 'results', field: 'mainSubtitle', label: 'Subtítulo', type: 'input' as const },
    { section: 'results', field: 'description', label: 'Descrição', type: 'textarea' as const },
  ];

  // Combinar todos os campos
  const allFields = [...heroFields, ...resultsFields];

  // Função para carregar dados quando página ou idioma mudarem
  const loadData = useCallback(async () => {
    if (selectedPage) {
      await Promise.all([
        fetchPageContent(selectedPage, selectedLanguage),
        fetchSEOData(selectedPage, selectedLanguage)
      ]);
    }
  }, [selectedPage, selectedLanguage, fetchPageContent, fetchSEOData]);

  // Atualizar formData quando conteúdo mudar
  const updateContentFormData = useCallback(() => {
    const newContentFormData: { [key: string]: string } = {};
    allFields.forEach(field => {
      const key = `${field.section}_${field.field}`;
      newContentFormData[key] = getContent(field.section, field.field, selectedLanguage);
    });
    setContentFormData(newContentFormData);
  }, [getContent, selectedLanguage]);

  // Atualizar SEO form data quando dados de SEO mudarem
  const updateSEOFormData = useCallback(() => {
    if (selectedPage) {
      const currentSEOData = getSEOData(selectedPage, selectedLanguage);
      setSeoFormData(currentSEOData);
    }
  }, [selectedPage, selectedLanguage, getSEOData]);

  // Selecionar página Home automaticamente se disponível
  useEffect(() => {
    if (pages.length > 0 && !selectedPage) {
      const homePage = pages.find(p => p.slug === 'home');
      if (homePage) {
        setSelectedPage(homePage.id);
      }
    }
  }, [pages, selectedPage]);

  // Carregar dados quando página ou idioma mudarem
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Atualizar form data quando conteúdo mudar
  useEffect(() => {
    updateContentFormData();
  }, [updateContentFormData]);

  // Atualizar SEO form data quando dados de SEO mudarem
  useEffect(() => {
    updateSEOFormData();
  }, [updateSEOFormData]);

  const handleContentInputChange = (key: string, value: string) => {
    setContentFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSEOInputChange = (field: string, value: string | boolean) => {
    setSeoFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveContent = async () => {
    if (!selectedPage) return;

    setSaving(true);
    try {
      const contentSavePromises = allFields.map(field => {
        const key = `${field.section}_${field.field}`;
        const value = contentFormData[key] || '';
        
        return saveContent(
          selectedPage,
          field.section,
          field.field,
          selectedLanguage,
          value
        );
      });

      await Promise.all(contentSavePromises);
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSEO = async () => {
    if (!selectedPage) return;

    setSaving(true);
    try {
      await saveSEOData(selectedPage, selectedLanguage, seoFormData);
    } catch (error) {
      console.error('Error saving SEO data:', error);
    } finally {
      setSaving(false);
    }
  };

  if (contentLoading || seoLoading) {
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
          Gerencie o conteúdo das páginas e configurações de SEO com suporte a múltiplos idiomas.
        </p>
      </div>

      <Separator />

      <PageSelector
        pages={pages}
        selectedPage={selectedPage}
        selectedLanguage={selectedLanguage}
        onPageChange={setSelectedPage}
        onLanguageChange={setSelectedLanguage}
      />

      {selectedPage && (
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Conteúdo
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              SEO
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Conteúdo da Página Principal</CardTitle>
                <CardDescription>
                  Edite o conteúdo das seções da página inicial
                  <Badge variant="outline" className="ml-2">
                    {selectedLanguage === 'en' ? '🇺🇸 English' : '🇧🇷 Português'}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContentSectionAccordion
                  heroFields={heroFields}
                  resultsFields={resultsFields}
                  formData={contentFormData}
                  selectedPage={selectedPage}
                  selectedLanguage={selectedLanguage}
                  onFieldChange={handleContentInputChange}
                />

                <div className="flex justify-end pt-6 mt-6 border-t">
                  <Button onClick={handleSaveContent} disabled={saving}>
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? 'Salvando...' : 'Salvar Conteúdo'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo">
            <SEOForm
              formData={seoFormData}
              selectedLanguage={selectedLanguage}
              saving={saving}
              onFieldChange={handleSEOInputChange}
              onSave={handleSaveSEO}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ContentManagement;
