
import { useState, useEffect, useCallback } from 'react';
import { useCMSPageContent } from './useCMSPageContent';
import { useMarkdownContent } from './useMarkdownContent';

export const useHybridPageContent = (pageSlug: string, language: string = 'en') => {
  const [hybridContent, setHybridContent] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // CMS Database content (primary source)
  const { content: cmsContent, loading: cmsLoading, error: cmsError, getContent: getCMSContent } = useCMSPageContent(pageSlug, language);

  // Markdown content (fallback source)
  const markdownFilePath = `/content/pages/${pageSlug}/${language}.md`;
  const { data: markdownData, loading: markdownLoading, error: markdownError } = useMarkdownContent({
    filePath: markdownFilePath
  });

  console.log('useHybridPageContent - CMS Content:', cmsContent);
  console.log('useHybridPageContent - Markdown Data:', markdownData);

  // Merge content from both sources
  useEffect(() => {
    if (!cmsLoading && !markdownLoading) {
      const merged: { [key: string]: string } = {};

      // First, add all CMS content
      if (cmsContent && Object.keys(cmsContent).length > 0) {
        Object.assign(merged, cmsContent);
        console.log('useHybridPageContent - Using CMS content as primary source');
      }

      // Then, add Markdown content as fallback for missing keys
      if (markdownData && markdownData.frontMatter) {
        Object.keys(markdownData.frontMatter).forEach(key => {
          if (!merged[key] || merged[key].trim() === '') {
            merged[key] = markdownData.frontMatter[key];
            console.log('useHybridPageContent - Using Markdown fallback for:', key);
          }
        });
      }

      setHybridContent(merged);
      setLoading(false);

      // Set error only if both sources failed
      if (cmsError && markdownError) {
        setError('Failed to load content from both CMS and Markdown sources');
      } else {
        setError(null);
      }
    }
  }, [cmsContent, markdownData, cmsLoading, markdownLoading, cmsError, markdownError]);

  // Enhanced getContent function that checks both sources
  const getContent = useCallback((section: string, field: string, fallback: string = '') => {
    const key = `${section}.${field}`;
    
    // First try CMS content
    const cmsValue = getCMSContent(section, field);
    if (cmsValue && cmsValue.trim() !== '') {
      console.log('useHybridPageContent - getContent from CMS:', key, '=', cmsValue);
      return cmsValue;
    }

    // Then try Markdown content
    const markdownValue = hybridContent[key];
    if (markdownValue && markdownValue.toString().trim() !== '') {
      console.log('useHybridPageContent - getContent from Markdown:', key, '=', markdownValue);
      return markdownValue.toString();
    }

    // Finally use fallback
    console.log('useHybridPageContent - getContent using fallback:', key, '=', fallback);
    return fallback;
  }, [getCMSContent, hybridContent]);

  return {
    content: hybridContent,
    loading,
    error,
    getContent,
    // Expose individual source states for debugging
    cmsContent,
    markdownData,
    cmsLoading,
    markdownLoading,
    cmsError,
    markdownError
  };
};
