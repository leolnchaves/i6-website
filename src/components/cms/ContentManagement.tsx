
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

  // Get current page info
  const currentPage = pages.find(p => p.id === selectedPage);
  const isHomePage = currentPage?.slug === 'home';
  const isSuccessStoriesPage = currentPage?.slug === 'success-stories';

  // Campos específicos para a seção Hero (Home)
  const heroFields = [
    { section: 'hero', field: 'infinite', label: 'Título Principal', type: 'input' as const },
    { section: 'hero', field: 'possibilities', label: 'Título Destaque', type: 'input' as const },
    { section: 'hero', field: 'poweredByAI', label: 'Subtítulo', type: 'input' as const },
    { section: 'hero', field: 'description', label: 'Descrição', type: 'textarea' as const },
    { section: 'hero', field: 'startJourney', label: 'Botão Jornada', type: 'input' as const },
    { section: 'hero', field: 'watchDemo', label: 'Botão Demo', type: 'input' as const },
    { section: 'hero', field: 'demoLink', label: 'Link do Demo (URL)', type: 'input' as const },
  ];

  // Campos específicos para a seção Results (Home)
  const resultsFields = [
    { section: 'results', field: 'mainTitle', label: 'Título', type: 'input' as const },
    { section: 'results', field: 'mainSubtitle', label: 'Subtítulo', type: 'input' as const },
    { section: 'results', field: 'description', label: 'Descrição', type: 'textarea' as const },
  ];

  // Campos específicos para a seção Compact Solutions (Home)
  const compactSolutionsFields = [
    { section: 'compactSolutions', field: 'title', label: 'Título', type: 'input' as const },
    { section: 'compactSolutions', field: 'subtitle', label: 'Subtítulo', type: 'input' as const },
  ];

  // Campos específicos para Success Stories Hero
  const successStoriesHeroFields = [
    { section: 'successStoriesHero', field: 'title', label: 'Título Principal', type: 'input' as const },
    { section: 'successStoriesHero', field: 'subtitle', label: 'Subtítulo Destacado', type: 'input' as const },
    { section: 'successStoriesHero', field: 'description', label: 'Descrição', type: 'textarea' as const },
  ];

  // Campos específicos para Success Stories Metrics
  const successStoriesMetricsFields = [
    { section: 'successStoriesMetrics', field: 'avgROI', label: 'ROI Médio (ex: 150%)', type: 'input' as const },
    { section: 'successStoriesMetrics', field: 'avgROILabel', label: 'Label ROI Médio', type: 'input' as const },
    { section: 'successStoriesMetrics', field: 'companiesServed', label: 'Empresas Atendidas (ex: 500+)', type: 'input' as const },
    { section: 'successStoriesMetrics', field: 'companiesServedLabel', label: 'Label Empresas Atendidas', type: 'input' as const },
    { section: 'successStoriesMetrics', field: 'costSavings', label: 'Economia de Custos (ex: $50M+)', type: 'input' as const },
    { section: 'successStoriesMetrics', field: 'costSavingsLabel', label: 'Label Economia de Custos', type: 'input' as const },
  ];

  // Campos específicos para Success Stories CTA
  const successStoriesCTAFields = [
    { section: 'successStoriesCTA', field: 'title', label: 'Título do CTA', type: 'input' as const },
    { section: 'successStoriesCTA', field: 'description', label: 'Descrição do CTA', type: 'textarea' as const },
    { section: 'successStoriesCTA', field: 'buttonText', label: 'Texto do Botão', type: 'input' as const },
  ];

  // Combinar campos baseado na página selecionada
  const getAllFields = () => {
    if (isHomePage) {
      return [...heroFields, ...resultsFields, ...compactSolutionsFields];
    } else if (isSuccessStoriesPage) {
      return [...successStoriesHeroFields, ...successStoriesMetricsFields, ...successStoriesCTAFields];
    }
    return [];
  };

  // Obter os campos corretos para passar para o accordion baseado na página
  const getFieldsForAccordion = () => {
    if (isHomePage) {
      return {
        heroFields,
        resultsFields,  
        compactSolutionsFields
      };
    } else if (isSuccessStoriesPage) {
      return {
        heroFields: successStoriesHeroFields,
        resultsFields: successStoriesMetricsFields,
        compactSolutionsFields: successStoriesCTAFields
      };
    }
    return {
      heroFields: [],
      resultsFields: [],
      compactSolutionsFields: []
    };
  };

  const allFields = getAllFields();
  const accordionFields = getFieldsForAccordion();

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
    const loadData = async () => {
      if (selectedPage) {
        await Promise.all([
          fetchPageContent(selectedPage, selectedLanguage),
          fetchSEOData(selectedPage, selectedLanguage)
        ]);
      }
    };
    
    loadData();
  }, [selectedPage, selectedLanguage, fetchPageContent, fetchSEOData]);

  // Atualizar formData quando conteúdo mudar
  useEffect(() => {
    if (content.length > 0 && allFields.length > 0) {
      console.log('Updating content form data with:', content);
      const newContentFormData: { [key: string]: string } = {};
      allFields.forEach(field => {
        const key = `${field.section}_${field.field}`;
        const value = getContent(field.section, field.field, selectedLanguage);
        newContentFormData[key] = value;
        console.log(`Setting ${key} = ${value}`);
      });
      setContentFormData(newContentFormData);
    }
  }, [content, allFields, selectedLanguage, getContent]);

  // Atualizar SEO form data quando dados de SEO mudarem
  useEffect(() => {
    if (selectedPage && Object.keys(seoData).length > 0) {
      const currentSEOData = getSEOData(selectedPage, selectedLanguage);
      setSeoFormData(currentSEOData);
    }
  }, [selectedPage, selectedLanguage, getSEOData, seoData]);

  const handleContentInputChange = (key: string, value: string) => {
    console.log(`Handling input change: ${key} = ${value}`);
    setContentFormData(prev => {
      const updated = { ...prev, [key]: value };
      console.log('Updated form data:', updated);
      return updated;
    });
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

  const getPageTitle = () => {
    if (isHomePage) return 'Página Principal';
    if (isSuccessStoriesPage) return 'Cases de Sucesso';
    return currentPage?.name || 'Página';
  };

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
                <CardTitle>Conteúdo da {getPageTitle()}</CardTitle>
                <CardDescription>
                  {isHomePage && 'Edite o conteúdo das seções da página inicial'}
                  {isSuccessStoriesPage && 'Edite o conteúdo das seções da página de cases de sucesso'}
                  {!isHomePage && !isSuccessStoriesPage && `Edite o conteúdo da página ${currentPage?.name}`}
                  <Badge variant="outline" className="ml-2">
                    {selectedLanguage === 'en' ? '🇺🇸 English' : '🇧🇷 Português'}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                {(isHomePage || isSuccessStoriesPage) && (
                  <ContentSectionAccordion
                    heroFields={accordionFields.heroFields}
                    resultsFields={accordionFields.resultsFields}
                    compactSolutionsFields={accordionFields.compactSolutionsFields}
                    formData={contentFormData}
                    selectedPage={selectedPage}
                    selectedLanguage={selectedLanguage}
                    onFieldChange={handleContentInputChange}
                  />
                )}

                {!isHomePage && !isSuccessStoriesPage && (
                  <div className="text-center py-8 text-gray-500">
                    <p>Configuração de conteúdo para esta página ainda não foi implementada.</p>
                    <p className="text-sm mt-2">Será adicionada conforme necessário.</p>
                  </div>
                )}

                <div className="flex justify-end pt-6 mt-6 border-t">
                  <Button onClick={handleSaveContent} disabled={saving || allFields.length === 0}>
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
