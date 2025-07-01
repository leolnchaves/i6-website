import { useState, useEffect, useCallback } from 'react';
import { useCMSPages } from './useCMSPages';
import { useCMSPageContent } from './useCMSPageContent';
import { useCMSSEO } from './useCMSSEO';
import { useToast } from './use-toast';
import { getAllFields } from '@/components/cms/content/ContentFieldsConfig';
import { supabase } from '@/integrations/supabase/client';

interface SEOFormData {
  meta_title: string;
  meta_description: string;
  slug: string;
  canonical_url: string;
  index_flag: boolean;
  follow_flag: boolean;
}

export const useContentManagement = () => {
  const { pages, loading: pagesLoading } = useCMSPages();
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [contentFormData, setContentFormData] = useState<{ [key: string]: string }>({});
  const [seoFormData, setSeoFormData] = useState<SEOFormData>({
    meta_title: '',
    meta_description: '',
    slug: '',
    canonical_url: '',
    index_flag: true,
    follow_flag: true,
  });
  const [saving, setSaving] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false); // Flag para evitar reidratação
  const { toast } = useToast();

  // Get current page slug for content hook
  const currentPage = pages.find(page => page.id === selectedPage);
  const pageSlug = currentPage?.slug || '';

  const { 
    content, 
    loading: contentLoading, 
    refetch: refetchContent 
  } = useCMSPageContent(pageSlug, selectedLanguage);

  const { 
    seoData, 
    loading: seoLoading, 
    fetchSEOData,
    saveSEOData,
    getSEOData
  } = useCMSSEO();

  const loading = pagesLoading || contentLoading || seoLoading;

  useEffect(() => {
    if (pages.length > 0 && !selectedPage) {
      setSelectedPage(pages[0].id);
    }
  }, [pages, selectedPage]);

  // Fetch SEO data when page or language changes
  useEffect(() => {
    if (selectedPage && selectedLanguage) {
      fetchSEOData(selectedPage, selectedLanguage);
    }
  }, [selectedPage, selectedLanguage, fetchSEOData]);

  // Update SEO form data when SEO data changes
  useEffect(() => {
    if (selectedPage && selectedLanguage) {
      const currentSEOData = getSEOData(selectedPage, selectedLanguage);
      setSeoFormData(currentSEOData);
    }
  }, [selectedPage, selectedLanguage, getSEOData, seoData]);

  const isHomePage = currentPage?.slug === 'home';
  const isSuccessStoriesPage = currentPage?.slug === 'success-stories';
  const isContactPage = currentPage?.slug === 'contact';
  const isSolutionsPage = currentPage?.slug === 'solutions';

  const allFields = getAllFields(isHomePage, isSuccessStoriesPage, isContactPage, isSolutionsPage);

  // CORRIGIDO: useEffect com flag para evitar reidratação constante
  useEffect(() => {
    console.log('useContentManagement - useEffect triggered');
    console.log('- content:', Object.keys(content).length, 'fields');
    console.log('- isInitialized:', isInitialized);
    console.log('- allFields length:', allFields.length);

    // Só reidrata se não foi inicializado ainda OU se mudou de página/idioma
    if (Object.keys(content).length > 0 && (!isInitialized || contentFormData === {})) {
      console.log('useContentManagement - Initializing from content');
      const formData: { [key: string]: string } = {};
      Object.entries(content).forEach(([key, value]) => {
        const fieldKey = key.replace('.', '_');
        // CRÍTICO: Preservar valor exato sem qualquer transformação
        const exactValue = value || '';
        formData[fieldKey] = exactValue;
        console.log(`useContentManagement - Setting field "${fieldKey}" = "${exactValue}"`);
      });
      setContentFormData(formData);
      setIsInitialized(true);
    } else if (allFields.length > 0 && Object.keys(contentFormData).length === 0 && !isInitialized) {
      console.log('useContentManagement - Initializing empty fields');
      const formData: { [key: string]: string } = {};
      allFields.forEach((field) => {
        const key = `${field.section}_${field.field}`;
        formData[key] = '';
        console.log(`useContentManagement - Setting empty field "${key}"`);
      });
      setContentFormData(formData);
      setIsInitialized(true);
    }
  }, [content, allFields, isInitialized, contentFormData]);

  // Reset initialization flag when page or language changes
  useEffect(() => {
    console.log('useContentManagement - Page or language changed, resetting initialization');
    setIsInitialized(false);
    setContentFormData({});
  }, [selectedPage, selectedLanguage]);

  const handleContentInputChange = useCallback((key: string, value: string) => {
    console.log(`🔍 handleContentInputChange INÍCIO:`);
    console.log(`  - Key: "${key}"`);
    console.log(`  - Value recebido: "${value}"`);
    console.log(`  - Value length: ${value.length}`);
    console.log(`  - Ends with space: ${value.endsWith(' ')}`);
    console.log(`  - Value antes no estado: "${contentFormData[key]}"`);
    
    setContentFormData(prevData => {
      const newData = {
        ...prevData,
        [key]: value // CRÍTICO: valor exato sem transformação
      };
      
      console.log(`  - Value depois no estado: "${newData[key]}"`);
      console.log(`  - Ends with space after: ${newData[key].endsWith(' ')}`);
      console.log(`🔍 handleContentInputChange FIM`);
      
      return newData;
    });
  }, []); // Removendo dependência de contentFormData para evitar re-renders

  const handleSEOInputChange = useCallback((key: string, value: string | boolean) => {
    console.log(`🔍 handleSEOInputChange:`);
    console.log(`  - Key: "${key}"`);
    console.log(`  - Value: "${value}"`);
    
    setSeoFormData(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const handleSaveContent = async () => {
    if (!selectedPage) return;

    setSaving(true);
    try {
      const contentArray = Object.entries(contentFormData).map(([key, value]) => {
        const [section, field] = key.split('_');
        return {
          section_name: section,
          field_name: field,
          // Apply .trim() only when saving to database, not during editing
          content: value.trim(),
          language: selectedLanguage,
        };
      });

      // Delete existing content for this page and language
      const { error: deleteError } = await supabase
        .from('cms_page_content')
        .delete()
        .eq('page_id', selectedPage)
        .eq('language', selectedLanguage);

      if (deleteError) throw deleteError;

      // Insert new content
      if (contentArray.length > 0) {
        const { error: insertError } = await supabase
          .from('cms_page_content')
          .insert(contentArray.map(item => ({
            ...item,
            page_id: selectedPage,
          })));

        if (insertError) throw insertError;
      }

      await refetchContent();
      
      toast({
        title: 'Sucesso!',
        description: 'Conteúdo salvo com sucesso.',
      });
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar o conteúdo.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSEO = async () => {
    if (!selectedPage) return;

    setSaving(true);
    try {
      const success = await saveSEOData(selectedPage, selectedLanguage, {
        ...seoFormData,
        // Apply .trim() only when saving to database, not during editing
        meta_title: seoFormData.meta_title.trim(),
        meta_description: seoFormData.meta_description.trim(),
        slug: seoFormData.slug.trim(),
        canonical_url: seoFormData.canonical_url.trim(),
      });

      if (success) {
        toast({
          title: 'Sucesso!',
          description: 'Configurações de SEO salvas com sucesso.',
        });
      }
    } catch (error) {
      console.error('Error saving SEO:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar as configurações de SEO.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const getPageTitle = () => {
    if (isHomePage) return 'Página Inicial';
    if (isSuccessStoriesPage) return 'Página de Cases de Sucesso';
    if (isContactPage) return 'Página de Contato';
    if (isSolutionsPage) return 'Página de Soluções';
    return currentPage?.name || 'Página';
  };

  return {
    pages,
    selectedPage,
    selectedLanguage,
    contentFormData,
    seoFormData,
    saving,
    loading,
    currentPage,
    isHomePage,
    isSuccessStoriesPage,
    isContactPage,
    isSolutionsPage,
    allFields,
    setSelectedPage,
    setSelectedLanguage,
    handleContentInputChange,
    handleSEOInputChange,
    handleSaveContent,
    handleSaveSEO,
    getPageTitle,
  };
};
