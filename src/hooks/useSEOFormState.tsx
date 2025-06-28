
import { useState, useEffect, useCallback } from 'react';
import { useCMSSEO } from './useCMSSEO';

export const useSEOFormState = (selectedPage: string, selectedLanguage: string) => {
  const { seoData, loading: seoLoading, fetchSEOData, saveSEOData, getSEOData } = useCMSSEO();
  
  const [seoFormData, setSeoFormData] = useState({
    meta_title: '',
    meta_description: '',
    slug: '',
    canonical_url: '',
    index_flag: true,
    follow_flag: true
  });

  // Load SEO data when page/language changes
  useEffect(() => {
    if (selectedPage && selectedLanguage) {
      fetchSEOData(selectedPage, selectedLanguage);
    }
  }, [selectedPage, selectedLanguage, fetchSEOData]);

  // Update SEO form data when SEO data loads
  useEffect(() => {
    if (selectedPage && selectedLanguage) {
      const currentSEOData = getSEOData(selectedPage, selectedLanguage);
      setSeoFormData(currentSEOData);
    }
  }, [selectedPage, selectedLanguage, seoData, getSEOData]);

  // Handle SEO input changes
  const handleSEOInputChange = useCallback((field: string, value: string | boolean) => {
    setSeoFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // Save SEO data
  const handleSaveSEO = useCallback(async () => {
    if (!selectedPage || !selectedLanguage) return false;

    try {
      return await saveSEOData(selectedPage, selectedLanguage, seoFormData);
    } catch (error) {
      console.error('Error saving SEO data:', error);
      return false;
    }
  }, [selectedPage, selectedLanguage, seoFormData, saveSEOData]);

  return {
    seoFormData,
    seoLoading,
    handleSEOInputChange,
    handleSaveSEO,
  };
};
