
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

  // Simplificar o controle de estado
  const initialLoadRef = useRef(false);

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

  // Load content and SEO when page/language changes OR on initial load
  useEffect(() => {
    if (selectedPage && selectedLanguage) {
      console.log('Loading content for page:', selectedPage, 'language:', selectedLanguage);
      fetchPageContent(selectedPage, selectedLanguage);
      fetchSEOData(selectedPage, selectedLanguage);
    }
  }, [selectedPage, selectedLanguage, fetchPageContent, fetchSEOData]);

  // Update form data when content loads - sempre atualizar quando o conteúdo muda
  useEffect(() => {
    if (content.length > 0 && selectedPage && selectedLanguage && !contentLoading) {
      console.log('Updating form data with content:', content.length, 'fields for page:', selectedPage, 'language:', selectedLanguage);
      
      const formData: { [key: string]: string } = {};
      
      allFields.forEach(field => {
        const key = `${field.section}_${field.field}`;
        const contentValue = content.find(c => 
          c.section_name === field.section && 
          c.field_name === field.field
        )?.content || '';
        
        console.log(`Field ${key}:`, contentValue);
        formData[key] = contentValue;
      });
      
      setContentFormData(formData);
      initialLoadRef.current = true;
    }
  }, [content, allFields, selectedPage, selectedLanguage, contentLoading]);

  // Update SEO form data when SEO data loads
  useEffect(() => {
    if (selectedPage && selectedLanguage) {
      const currentSEOData = getSEOData(selectedPage, selectedLanguage);
      setSeoFormData(currentSEOData);
    }
  }, [selectedPage, selectedLanguage, seoData, getSEOData]);

  // Handle content input changes
  const handleContentInputChange = useCallback((key: string, value: string) => {
    console.log('Field changed:', key, '=', value);
    setContentFormData(prev => ({ ...prev, [key]: value }));
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
      // Save each field individually as the saveContent method expects individual field saves
      const savePromises = Object.entries(contentFormData).map(([key, value]) => {
        const [sectionName, fieldName] = key.split('_');
        return saveContent(selectedPage, sectionName, fieldName, selectedLanguage, value);
      });
      
      await Promise.all(savePromises);
    } finally {
      setSaving(false);
    }
  }, [selectedPage, selectedLanguage, contentFormData, saveContent]);

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

  const getPageTitle = useCallback(() => {
    if (!currentPage) return 'Página';
    return currentPage.name;
  }, [currentPage]);

  return {
    // State
    pages,
    selectedPage,
    selectedLanguage,
    contentFormData,
    seoFormData,
    saving,
    loading,
    
    // Computed
    currentPage,
    isHomePage,
    isSuccessStoriesPage,
    isContactPage,
    allFields,
    
    // Actions
    setSelectedPage,
    setSelectedLanguage,
    handleContentInputChange,
    handleSEOInputChange,
    handleSaveContent,
    handleSaveSEO,
    getPageTitle,
  };
};
