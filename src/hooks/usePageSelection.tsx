
import { useState, useEffect, useCallback } from 'react';
import { useCMSContent } from './useCMSContent';

export const usePageSelection = () => {
  const { pages, fetchPages, fetchPageContent } = useCMSContent();
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

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

  // Load content when page/language changes
  useEffect(() => {
    if (selectedPage && selectedLanguage) {
      console.log('Loading content for page:', selectedPage, 'language:', selectedLanguage);
      fetchPageContent(selectedPage, selectedLanguage);
    }
  }, [selectedPage, selectedLanguage, fetchPageContent]);

  // Get current page data
  const currentPage = pages.find(p => p.id === selectedPage);
  const isHomePage = currentPage?.slug === 'home';
  const isSuccessStoriesPage = currentPage?.slug === 'success-stories';
  const isContactPage = currentPage?.slug === 'contact';
  const isSolutionsPage = currentPage?.slug === 'solutions';

  const getPageTitle = useCallback(() => {
    if (!currentPage) return 'Página';
    return currentPage.name;
  }, [currentPage]);

  return {
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
  };
};
