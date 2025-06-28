
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
  
  // Separar estado "original" de estado "editável"
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

  // Flag para controlar se já foi inicializado
  const initializedRef = useRef<string>('');

  const loading = contentLoading || seoLoading;

  // Get current page data
  const currentPage = pages.find(p => p.id === selectedPage);
  const isHomePage = currentPage?.slug === 'home';
  const isSuccessStoriesPage = currentPage?.slug === 'success-stories';
  const isContactPage = currentPage?.slug === 'contact';

  // Get fields for current page
  const allFields = getPageFields(isHomePage, isSuccessStoriesPage, isContactPage);

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

  // Load content and SEO when page/language changes
  useEffect(() => {
    if (selectedPage && selectedLanguage) {
      console.log('Loading content for page:', selectedPage, 'language:', selectedLanguage);
      fetchPageContent(selectedPage, selectedLanguage);
      fetchSEOData(selectedPage, selectedLanguage);
    }
  }, [selectedPage, selectedLanguage, fetchPageContent, fetchSEOData]);

  // Update form data when content loads - criar dados "fetched" e "editable"
  useEffect(() => {
    if (content.length > 0 && selectedPage && selectedLanguage && !contentLoading) {
      const currentKey = `${selectedPage}_${selectedLanguage}`;
      
      // Só atualiza se mudou a combinação página/idioma
      if (initializedRef.current !== currentKey) {
        console.log('Initializing form data for:', currentKey);
        
        const formData: { [key: string]: string } = {};
        
        allFields.forEach(field => {
          const key = `${field.section}_${field.field}`;
          const contentValue = content.find(c => 
            c.section_name === field.section && 
            c.field_name === field.field
          )?.content || '';
          
          formData[key] = contentValue;
        });
        
        // Atualizar ambos os estados: fetched (imutável) e editable (para edição)
        setFetchedContentFormData(formData);
        setEditableContentFormData(formData);
        initializedRef.current = currentKey;
        
        console.log('Form data initialized for:', currentKey, 'fields:', Object.keys(formData).length);
      }
    }
  }, [content, allFields, selectedPage, selectedLanguage, contentLoading]);

  // Update SEO form data when SEO data loads
  useEffect(() => {
    if (selectedPage && selectedLanguage) {
      const currentSEOData = getSEOData(selectedPage, selectedLanguage);
      setSeoFormData(currentSEOData);
    }
  }, [selectedPage, selectedLanguage, seoData, getSEOData]);

  // Handle content input changes - apenas modifica o estado editável
  const handleContentInputChange = useCallback((key: string, value: string) => {
    console.log('Field changed:', key, '=', value);
    setEditableContentFormData(prev => ({ ...prev, [key]: value }));
  }, []);

  // Handle SEO input changes
  const handleSEOInputChange = useCallback((field: string, value: string | boolean) => {
    setSeoFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // Save content - usa o estado editável
  const handleSaveContent = useCallback(async () => {
    if (!selectedPage || !selectedLanguage) return;

    setSaving(true);
    try {
      // Save each field individually using the editable content
      const savePromises = Object.entries(editableContentFormData).map(([key, value]) => {
        const [sectionName, fieldName] = key.split('_');
        return saveContent(selectedPage, sectionName, fieldName, selectedLanguage, value);
      });
      
      await Promise.all(savePromises);
      
      // Após salvar com sucesso, atualizar o estado "fetched" para refletir os dados salvos
      setFetchedContentFormData(editableContentFormData);
      
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

  // Função para resetar para dados originais
  const handleResetContent = useCallback(() => {
    console.log('Resetting content to original values');
    setEditableContentFormData(fetchedContentFormData);
  }, [fetchedContentFormData]);

  // Verificar se há mudanças não salvas
  const hasUnsavedChanges = useCallback(() => {
    return JSON.stringify(fetchedContentFormData) !== JSON.stringify(editableContentFormData);
  }, [fetchedContentFormData, editableContentFormData]);

  const getPageTitle = useCallback(() => {
    if (!currentPage) return 'Página';
    return currentPage.name;
  }, [currentPage]);

  return {
    // State
    pages,
    selectedPage,
    selectedLanguage,
    contentFormData: editableContentFormData, // Expor o estado editável
    seoFormData,
    saving,
    loading,
    
    // Computed
    currentPage,
    isHomePage,
    isSuccessStoriesPage,
    isContactPage,
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
