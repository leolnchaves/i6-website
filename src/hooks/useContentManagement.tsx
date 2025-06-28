
import { useState, useEffect, useCallback, useRef } from 'react';
import { useCMSContent } from './useCMSContent';
import { useCMSSEO } from './useCMSSEO';
import { getPageFields } from '@/components/cms/content/ContentFieldsConfig';

export const useContentManagement = () => {
  const { 
    pages, 
    content, 
    loading: contentLoading, 
    fetchPages, 
    fetchPageContent, 
    saveContent 
  } = useCMSContent();
  
  const { 
    seoData, 
    loading: seoLoading, 
    fetchSEOData, 
    saveSEOData, 
    getSEOData 
  } = useCMSSEO();

  const [selectedPage, setSelectedPage] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  
  // Estados separados: dados originais vs dados editáveis
  const [fetchedContentFormData, setFetchedContentFormData] = useState<{ [key: string]: string }>({});
  const [editableContentFormData, setEditableContentFormData] = useState<{ [key: string]: string }>({});
  
  const [seoFormData, setSeoFormData] = useState({
    meta_title: '',
    meta_description: '',
    slug: '',
    canonical_url: '',
    index_flag: true,
    follow_flag: true
  });
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const loading = contentLoading || seoLoading;

  // Get current page data
  const currentPage = pages.find(p => p.id === selectedPage);
  const isHomePage = currentPage?.slug === 'home';
  const isSuccessStoriesPage = currentPage?.slug === 'success-stories';
  const isContactPage = currentPage?.slug === 'contact';
  const isSolutionsPage = currentPage?.slug === 'solutions';

  // Get fields for current page
  const allFields = getPageFields(isHomePage, isSuccessStoriesPage, isContactPage, isSolutionsPage);

  // Debug logs
  console.log('fetched', fetchedContentFormData);
  console.log('editable', editableContentFormData);

  // Load pages on mount
  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  // Auto-select first page when pages are loaded
  useEffect(() => {
    if (pages.length > 0 && !selectedPage) {
      setSelectedPage(pages[0].id);
    }
  }, [pages, selectedPage]);

  // Load content and SEO when page/language changes - SEM outras dependências
  useEffect(() => {
    if (selectedPage && selectedLanguage) {
      console.log('Loading content for page:', selectedPage, 'language:', selectedLanguage);
      fetchPageContent(selectedPage, selectedLanguage);
      fetchSEOData(selectedPage, selectedLanguage);
    }
  }, [selectedPage, selectedLanguage]);

  // Update fetched data when content loads - SEM dependências desnecessárias
  useEffect(() => {
    if (content.length > 0 && !contentLoading) {
      console.log('Updating fetched data from content');
      
      const formData: { [key: string]: string } = {};
      
      allFields.forEach(field => {
        const key = `${field.section}_${field.field}`;
        const contentValue = content.find(c => 
          c.section_name === field.section && 
          c.field_name === field.field
        )?.content || '';
        
        formData[key] = contentValue;
      });
      
      setFetchedContentFormData(formData);
      console.log('Fetched data updated:', Object.keys(formData).length, 'fields');
    }
  }, [content, contentLoading]);

  // Update editable data APENAS quando fetched data mudar
  useEffect(() => {
    if (fetchedContentFormData && Object.keys(fetchedContentFormData).length > 0) {
      console.log('Updating editable data from fetched data');
      setEditableContentFormData(fetchedContentFormData);
      setIsDirty(false);
    }
  }, [fetchedContentFormData]);

  // Update SEO form data when SEO data loads
  useEffect(() => {
    if (selectedPage && selectedLanguage) {
      const currentSEOData = getSEOData(selectedPage, selectedLanguage);
      setSeoFormData(currentSEOData);
    }
  }, [selectedPage, selectedLanguage, seoData, getSEOData]);

  // Handle content input changes - usando prev corretamente
  const handleContentInputChange = useCallback((key: string, value: string) => {
    console.log('Field changed:', key, '=', value);
    setEditableContentFormData(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);
  }, []);

  // Handle SEO input changes
  const handleSEOInputChange = useCallback((field: string, value: string | boolean) => {
    setSeoFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // Save content
  const handleSaveContent = useCallback(async () => {
    if (!selectedPage || !selectedLanguage) return;

    setSaving(true);
    try {
      // Save each field individually
      const savePromises = Object.entries(editableContentFormData).map(([key, value]) => {
        const [sectionName, fieldName] = key.split('_');
        return saveContent(selectedPage, sectionName, fieldName, selectedLanguage, value);
      });
      
      await Promise.all(savePromises);
      
      // Após salvar, atualizar o estado "fetched" e limpar dirty flag
      setFetchedContentFormData(editableContentFormData);
      setIsDirty(false);
      
      console.log('Content saved successfully');
    } finally {
      setSaving(false);
    }
  }, [selectedPage, selectedLanguage, editableContentFormData, saveContent]);

  // Save SEO data
  const handleSaveSEO = useCallback(async () => {
    if (!selectedPage || !selectedLanguage) return;

    setSaving(true);
    try {
      await saveSEOData(selectedPage, selectedLanguage, seoFormData);
    } finally {
      setSaving(false);
    }
  }, [selectedPage, selectedLanguage, seoFormData, saveSEOData]);

  // Reset to original data
  const handleResetContent = useCallback(() => {
    console.log('Resetting content to original values');
    setEditableContentFormData(fetchedContentFormData);
    setIsDirty(false);
  }, [fetchedContentFormData]);

  // Check for unsaved changes usando isDirty
  const hasUnsavedChanges = useCallback(() => {
    return isDirty;
  }, [isDirty]);

  const getPageTitle = useCallback(() => {
    if (!currentPage) return 'Página';
    return currentPage.name;
  }, [currentPage]);

  return {
    // State
    pages,
    selectedPage,
    selectedLanguage,
    contentFormData: editableContentFormData,
    seoFormData,
    saving,
    loading,
    
    // Computed
    currentPage,
    isHomePage,
    isSuccessStoriesPage,
    isContactPage,
    isSolutionsPage,
    allFields,
    
    // New utilities
    hasUnsavedChanges,
    
    // Actions
    setSelectedPage,
    setSelectedLanguage,
    handleContentInputChange,
    handleSEOInputChange,
    handleSaveContent,
    handleSaveSEO,
    handleResetContent,
    getPageTitle,
  };
};
