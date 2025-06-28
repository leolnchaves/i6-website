
import { useState, useEffect, useCallback } from 'react';
import { getPageFields } from '@/components/cms/content/ContentFieldsConfig';

interface UseContentFormStateProps {
  content: any[];
  contentLoading: boolean;
  selectedPage: string;
  selectedLanguage: string;
  isHomePage: boolean;
  isSuccessStoriesPage: boolean;
  isContactPage: boolean;
  isSolutionsPage: boolean;
}

export const useContentFormState = ({
  content,
  contentLoading,
  selectedPage,
  selectedLanguage,
  isHomePage,
  isSuccessStoriesPage,
  isContactPage,
  isSolutionsPage,
}: UseContentFormStateProps) => {
  // Estados separados: dados originais vs dados editáveis
  const [fetchedContentFormData, setFetchedContentFormData] = useState<{ [key: string]: string }>({});
  const [editableContentFormData, setEditableContentFormData] = useState<{ [key: string]: string }>({});
  const [isDirty, setIsDirty] = useState(false);

  // Get fields for current page
  const allFields = getPageFields(isHomePage, isSuccessStoriesPage, isContactPage, isSolutionsPage);

  // Debug logs
  console.log('fetched', fetchedContentFormData);
  console.log('editable', editableContentFormData);

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

  // Handle content input changes - usando prev corretamente
  const handleContentInputChange = useCallback((key: string, value: string) => {
    console.log('Field changed:', key, '=', value);
    setEditableContentFormData(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);
  }, []);

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

  // Update fetched content after save
  const updateFetchedContent = useCallback((newData: { [key: string]: string }) => {
    setFetchedContentFormData(newData);
    setIsDirty(false);
  }, []);

  return {
    contentFormData: editableContentFormData,
    allFields,
    isDirty,
    handleContentInputChange,
    handleResetContent,
    hasUnsavedChanges,
    updateFetchedContent,
  };
};
