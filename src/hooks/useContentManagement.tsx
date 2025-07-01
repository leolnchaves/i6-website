
import { useState, useEffect, useCallback } from 'react';
import { useCMSPage } from './useCMSPage';
import { useCMSPageContent } from './useCMSPageContent';
import { useCMSSEO } from './useCMSSEO';
import { useToast } from './use-toast';
import { getAllFields } from '@/components/cms/content/ContentFieldsConfig';

export const useContentManagement = () => {
  const { pages, loading: pagesLoading } = useCMSPage();
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [contentFormData, setContentFormData] = useState<{ [key: string]: string }>({});
  const [seoFormData, setSeoFormData] = useState<{ [key: string]: string }>({});
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const { 
    content, 
    loading: contentLoading, 
    saveContent, 
    refetch: refetchContent 
  } = useCMSPageContent(selectedPage, selectedLanguage);

  const { 
    seoData, 
    loading: seoLoading, 
    saveSEO, 
    refetch: refetchSEO 
  } = useCMSSEO(selectedPage, selectedLanguage);

  const loading = pagesLoading || contentLoading || seoLoading;

  useEffect(() => {
    if (pages.length > 0 && !selectedPage) {
      setSelectedPage(pages[0].id);
    }
  }, [pages, selectedPage]);

  const currentPage = pages.find(page => page.id === selectedPage);
  const isHomePage = currentPage?.slug === 'home';
  const isSuccessStoriesPage = currentPage?.slug === 'success-stories';
  const isContactPage = currentPage?.slug === 'contact';
  const isSolutionsPage = currentPage?.slug === 'solutions';

  const allFields = getAllFields(isHomePage, isSuccessStoriesPage, isContactPage, isSolutionsPage);

  useEffect(() => {
    if (content.length > 0) {
      const formData: { [key: string]: string } = {};
      content.forEach((item) => {
        const key = `${item.section_name}_${item.field_name}`;
        // IMPORTANT: Don't use .trim() here - preserve the exact content
        formData[key] = item.content || '';
      });
      setContentFormData(formData);
    } else if (allFields.length > 0) {
      const formData: { [key: string]: string } = {};
      allFields.forEach((field) => {
        const key = `${field.section}_${field.field}`;
        formData[key] = '';
      });
      setContentFormData(formData);
    }
  }, [content, allFields]);

  useEffect(() => {
    if (seoData.length > 0) {
      const formData: { [key: string]: string } = {};
      seoData.forEach((item) => {
        // IMPORTANT: Don't use .trim() here - preserve the exact content
        formData[item.field_name] = item.content || '';
      });
      setSeoFormData(formData);
    }
  }, [seoData]);

  const handleContentInputChange = useCallback((key: string, value: string) => {
    console.log(`handleContentInputChange - Before: "${contentFormData[key]}" -> After: "${value}"`);
    
    setContentFormData(prev => ({
      ...prev,
      // IMPORTANT: Never use .trim() here - preserve the exact value the user typed
      [key]: value
    }));
    
    console.log(`handleContentInputChange - Final value set: "${value}"`);
  }, [contentFormData]);

  const handleSEOInputChange = useCallback((key: string, value: string) => {
    console.log(`handleSEOInputChange - Before: "${seoFormData[key]}" -> After: "${value}"`);
    
    setSeoFormData(prev => ({
      ...prev,
      // IMPORTANT: Never use .trim() here - preserve the exact value the user typed
      [key]: value
    }));
    
    console.log(`handleSEOInputChange - Final value set: "${value}"`);
  }, [seoFormData]);

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

      await saveContent(contentArray);
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
      const seoArray = Object.entries(seoFormData).map(([key, value]) => ({
        field_name: key,
        // Apply .trim() only when saving to database, not during editing
        content: value.trim(),
        language: selectedLanguage,
      }));

      await saveSEO(seoArray);
      await refetchSEO();
      
      toast({
        title: 'Sucesso!',
        description: 'Configurações de SEO salvas com sucesso.',
      });
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
