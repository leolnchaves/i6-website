
import { useState, useEffect, useCallback, useRef } from 'react';
import { useCMSContent } from './useCMSContent';
import { useCMSSEO } from './useCMSSEO';
import { getPageFields } from '@/components/cms/content/ContentFieldsConfig';

export const useContentManagement = () => {
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
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const currentPageLanguageRef = useRef<string>('');

  // Get current page info
  const currentPage = pages.find(p => p.id === selectedPage);
  const isHomePage = currentPage?.slug === 'home';
  const isSuccessStoriesPage = currentPage?.slug === 'success-stories';

  const allFields = getPageFields(isHomePage, isSuccessStoriesPage);

  // Select home page automatically if available
  useEffect(() => {
    if (pages.length > 0 && !selectedPage) {
      const homePage = pages.find(p => p.slug === 'home');
      if (homePage) {
        setSelectedPage(homePage.id);
      }
    }
  }, [pages, selectedPage]);

  // Load data when page or language changes
  useEffect(() => {
    const loadData = async () => {
      if (selectedPage) {
        const pageLanguageKey = `${selectedPage}_${selectedLanguage}`;
        
        setHasUnsavedChanges(false);
        setInitialDataLoaded(false);
        currentPageLanguageRef.current = pageLanguageKey;
        
        console.log('Loading data for page:', selectedPage, 'language:', selectedLanguage);
        
        try {
          await Promise.all([
            fetchPageContent(selectedPage, selectedLanguage),
            fetchSEOData(selectedPage, selectedLanguage)
          ]);
          
          if (currentPageLanguageRef.current === pageLanguageKey) {
            setInitialDataLoaded(true);
            console.log('Data loaded successfully for:', pageLanguageKey);
          }
        } catch (error) {
          console.error('Error loading data:', error);
        }
      }
    };
    
    loadData();
  }, [selectedPage, selectedLanguage, fetchPageContent, fetchSEOData]);

  // Update formData when content changes - only on initial load
  useEffect(() => {
    if (content.length > 0 && allFields.length > 0 && initialDataLoaded && !hasUnsavedChanges) {
      console.log('Setting up initial form data with content:', content);
      console.log('Fields to process:', allFields);
      
      const newContentFormData: { [key: string]: string } = {};
      allFields.forEach(field => {
        const key = `${field.section}_${field.field}`;
        const value = getContent(field.section, field.field, selectedLanguage);
        newContentFormData[key] = value;
        console.log(`Setting ${key} = "${value}"`);
      });
      
      console.log('Final form data:', newContentFormData);
      setContentFormData(newContentFormData);
    }
  }, [content, allFields, selectedLanguage, getContent, initialDataLoaded, hasUnsavedChanges]);

  // Update SEO form data when SEO data changes
  useEffect(() => {
    if (selectedPage && Object.keys(seoData).length > 0 && initialDataLoaded) {
      console.log('Setting up SEO form data');
      const currentSEOData = getSEOData(selectedPage, selectedLanguage);
      setSeoFormData(currentSEOData);
    }
  }, [selectedPage, selectedLanguage, getSEOData, seoData, initialDataLoaded]);

  const handleContentInputChange = useCallback((key: string, value: string) => {
    console.log(`Handling input change: ${key} = ${value}`);
    setContentFormData(prev => {
      const updated = { ...prev, [key]: value };
      console.log('Updated form data:', updated);
      return updated;
    });
    setHasUnsavedChanges(true);
  }, []);

  const handleSEOInputChange = useCallback((field: string, value: string | boolean) => {
    setSeoFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSaveContent = useCallback(async () => {
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
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setSaving(false);
    }
  }, [selectedPage, allFields, contentFormData, selectedLanguage, saveContent]);

  const handleSaveSEO = useCallback(async () => {
    if (!selectedPage) return;

    setSaving(true);
    try {
      await saveSEOData(selectedPage, selectedLanguage, seoFormData);
    } catch (error) {
      console.error('Error saving SEO data:', error);
    } finally {
      setSaving(false);
    }
  }, [selectedPage, selectedLanguage, seoFormData, saveSEOData]);

  const getPageTitle = useCallback(() => {
    if (isHomePage) return 'Página Principal';
    if (isSuccessStoriesPage) return 'Cases de Sucesso';
    return currentPage?.name || 'Página';
  }, [isHomePage, isSuccessStoriesPage, currentPage]);

  return {
    // State
    pages,
    selectedPage,
    selectedLanguage,
    contentFormData,
    seoFormData,
    saving,
    hasUnsavedChanges,
    loading: contentLoading || seoLoading,
    
    // Page info
    currentPage,
    isHomePage,
    isSuccessStoriesPage,
    allFields,
    
    // Handlers
    setSelectedPage,
    setSelectedLanguage,
    handleContentInputChange,
    handleSEOInputChange,
    handleSaveContent,
    handleSaveSEO,
    getPageTitle,
  };
};
