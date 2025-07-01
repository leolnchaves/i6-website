
import { useState, useEffect, useCallback } from 'react';
import { markdownCache } from '@/utils/markdownCache';

interface UseMarkdownContentProps {
  filePath: string;
  fallbackData?: any;
}

export const useMarkdownContent = ({ filePath, fallbackData }: UseMarkdownContentProps) => {
  const [data, setData] = useState<any>(fallbackData || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMarkdownContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('useMarkdownContent - Fetching:', filePath);
      
      const markdownData = await markdownCache.get(filePath);
      
      if (markdownData) {
        console.log('useMarkdownContent - Data loaded from Markdown:', filePath);
        setData(markdownData);
      } else if (fallbackData) {
        console.log('useMarkdownContent - Using fallback data for:', filePath);
        setData(fallbackData);
      } else {
        console.log('useMarkdownContent - No data found for:', filePath);
        setData(null);
      }
    } catch (err) {
      console.error('useMarkdownContent - Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      
      if (fallbackData) {
        console.log('useMarkdownContent - Using fallback data due to error');
        setData(fallbackData);
      }
    } finally {
      setLoading(false);
    }
  }, [filePath, fallbackData]);

  useEffect(() => {
    fetchMarkdownContent();
  }, [fetchMarkdownContent]);

  const refetch = useCallback(() => {
    markdownCache.clear();
    fetchMarkdownContent();
  }, [fetchMarkdownContent]);

  return {
    data,
    loading,
    error,
    refetch
  };
};
