
import { useState, useCallback } from 'react';
import { useCMSContent } from './useCMSContent';
import { usePageSelection } from './usePageSelection';
import { useContentFormState } from './useContentFormState';
import { useSEOFormState } from './useSEOFormState';

export const useContentManagement = () => {
  const { content, loading: contentLoading, saveContent } = useCMSContent();
  const [saving, setSaving] = useState(false);
  
  // Page selection logic
  const {
    pages,
    selectedPage,
    selectedLanguage,
    currentPage,
    isHomePage,
    isSuccessStoriesPage,
    isContactPage,
    isSolutionsPage,
    setSelectedPage,
    setSelectedLanguage,
    getPageTitle,
  } = usePageSelection();

  // Content form state logic
  const {
    contentFormData,
    allFields,
    handleContentInputChange,
    handleResetContent,
    hasUnsavedChanges,
    updateFetchedContent,
  } = useContentFormState({
    content,
    contentLoading,
    selectedPage,
    selectedLanguage,
    isHomePage,
    isSuccessStoriesPage,
    isContactPage,
    isSolutionsPage,
  });

  // SEO form state logic
  const {
    seoFormData,
    seoLoading,
    handleSEOInputChange,
    handleSaveSEO,
  } = useSEOFormState(selectedPage, selectedLanguage);

  const loading = contentLoading || seoLoading;

  // Save content
  const handleSaveContent = useCallback(async () => {
    if (!selectedPage || !selectedLanguage) return;

    setSaving(true);
    try {
      // Save each field individually
      const savePromises = Object.entries(contentFormData).map(([key, value]) => {
        const [sectionName, fieldName] = key.split('_');
        return saveContent(selectedPage, sectionName, fieldName, selectedLanguage, value);
      });
      
      await Promise.all(savePromises);
      
      // Após salvar, atualizar o estado "fetched" e limpar dirty flag
      updateFetchedContent(contentFormData);
      
      console.log('Content saved successfully');
    } finally {
      setSaving(false);
    }
  }, [selectedPage, selectedLanguage, contentFormData, saveContent, updateFetchedContent]);

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
