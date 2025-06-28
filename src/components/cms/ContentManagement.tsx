
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Save, Globe, Home, Search } from 'lucide-react';
import { useCMSContent } from '@/hooks/useCMSContent';
import { useCMSSEO } from '@/hooks/useCMSSEO';
import { useCMSResultsCards } from '@/hooks/useCMSResultsCards';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ResultsCardsManagement from './ResultsCardsManagement';

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
    { section: 'hero', field: 'infinite', label: 'Título Principal', type: 'input' },
    { section: 'hero', field: 'possibilities', label: 'Título Destaque', type: 'input' },
    { section: 'hero', field: 'poweredByAI', label: 'Subtítulo', type: 'input' },
    { section: 'hero', field: 'description', label: 'Descrição', type: 'textarea' },
    { section: 'hero', field: 'startJourney', label: 'Botão Jornada', type: 'input' },
    { section: 'hero', field: 'watchDemo', label: 'Botão Demo', type: 'input' },
    { section: 'hero', field: 'demoLink', label: 'Link do Demo (URL)', type: 'input' },
  ];

  // Campos específicos para a seção Results
  const resultsFields = [
    { section: 'results', field: 'mainTitle', label: 'Título', type: 'input' },
    { section: 'results', field: 'mainSubtitle', label: 'Subtítulo', type: 'input' },
    { section: 'results', field: 'description', label: 'Descrição', type: 'textarea' },
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
      // Salvar todos os campos de conteúdo modificados
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

  const renderSectionFields = (fields: typeof allFields, sectionName: string) => {
    const sectionFields = fields.filter(field => field.section === sectionName);
    
    if (sectionFields.length === 0) return null;

    return (
      <div className="space-y-4">
        {sectionFields.map(field => {
          const key = `${field.section}_${field.field}`;
          const value = contentFormData[key] || '';

          return (
            <div key={key} className="space-y-2">
              <Label htmlFor={key}>{field.label}</Label>
              {field.type === 'textarea' ? (
                <Textarea
                  id={key}
                  value={value}
                  onChange={(e) => handleContentInputChange(key, e.target.value)}
                  placeholder={`Digite o ${field.label.toLowerCase()}...`}
                  rows={field.field === 'description' ? 5 : 3}
                />
              ) : (
                <Input
                  id={key}
                  value={value}
                  onChange={(e) => handleContentInputChange(key, e.target.value)}
                  placeholder={
                    field.field === 'demoLink' 
                      ? 'https://www.youtube.com/embed/...' 
                      : `Digite o ${field.label.toLowerCase()}...`
                  }
                />
              )}
            </div>
          );
        })}
      </div>
    );
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

      {/* Tabs para Conteúdo e SEO */}
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

          {/* Tab de Conteúdo */}
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
                <Accordion type="single" collapsible className="w-full">
                  
                  {/* Seção Hero */}
                  <AccordionItem value="hero">
                    <AccordionTrigger className="text-lg font-semibold">
                      Seção Hero - Página Principal
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-4">
                        {renderSectionFields(allFields, 'hero')}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Seção Results */}
                  <AccordionItem value="results">
                    <AccordionTrigger className="text-lg font-semibold">
                      Seção Results - Resultados
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-4 space-y-6">
                        {/* Campos da seção Results */}
                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-800 border-b pb-2">Conteúdo Principal</h4>
                          {renderSectionFields(allFields, 'results')}
                        </div>
                        
                        <Separator />
                        
                        {/* Gestão dos Cards - Nested Accordion */}
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="cards-management">
                            <AccordionTrigger className="text-base font-medium">
                              Gestão dos Cards da Seção Results
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="pt-4">
                                <ResultsCardsManagement 
                                  selectedPage={selectedPage}
                                  selectedLanguage={selectedLanguage}
                                />
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                </Accordion>

                <div className="flex justify-end pt-6 mt-6 border-t">
                  <Button onClick={handleSaveContent} disabled={saving}>
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? 'Salvando...' : 'Salvar Conteúdo'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de SEO */}
          <TabsContent value="seo">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de SEO</CardTitle>
                <CardDescription>
                  Configure os metadados para otimização de mecanismos de busca
                  <Badge variant="outline" className="ml-2">
                    {selectedLanguage === 'en' ? '🇺🇸 English' : '🇧🇷 Português'}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="meta_title">Título da Página (Meta Title)</Label>
                  <Input
                    id="meta_title"
                    value={seoFormData.meta_title}
                    onChange={(e) => handleSEOInputChange('meta_title', e.target.value)}
                    placeholder="Digite o título da página..."
                    maxLength={60}
                  />
                  <p className="text-sm text-gray-500">
                    {seoFormData.meta_title.length}/60 caracteres (recomendado: até 60)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta_description">Descrição (Meta Description)</Label>
                  <Textarea
                    id="meta_description"
                    value={seoFormData.meta_description}
                    onChange={(e) => handleSEOInputChange('meta_description', e.target.value)}
                    placeholder="Digite a descrição da página..."
                    rows={3}
                    maxLength={160}
                  />
                  <p className="text-sm text-gray-500">
                    {seoFormData.meta_description.length}/160 caracteres (recomendado: até 160)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug da URL</Label>
                  <Input
                    id="slug"
                    value={seoFormData.slug}
                    onChange={(e) => handleSEOInputChange('slug', e.target.value)}
                    placeholder="Digite o slug da URL..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="canonical_url">URL Canônica</Label>
                  <Input
                    id="canonical_url"
                    value={seoFormData.canonical_url}
                    onChange={(e) => handleSEOInputChange('canonical_url', e.target.value)}
                    placeholder="Digite a URL canônica..."
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="index_flag">Indexação (Index)</Label>
                      <p className="text-sm text-gray-500">
                        Permitir que mecanismos de busca indexem esta página
                      </p>
                    </div>
                    <Switch
                      id="index_flag"
                      checked={seoFormData.index_flag}
                      onCheckedChange={(checked) => handleSEOInputChange('index_flag', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="follow_flag">Seguir Links (Follow)</Label>
                      <p className="text-sm text-gray-500">
                        Permitir que mecanismos de busca sigam os links desta página
                      </p>
                    </div>
                    <Switch
                      id="follow_flag"
                      checked={seoFormData.follow_flag}
                      onCheckedChange={(checked) => handleSEOInputChange('follow_flag', checked)}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSaveSEO} disabled={saving}>
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? 'Salvando...' : 'Salvar SEO'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ContentManagement;
