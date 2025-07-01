
import { useState, useEffect, useCallback } from 'react';
import { MarkdownAPI } from '@/services/markdownAPI';
import { MarkdownConverter } from '@/utils/markdownConverter';
import { useCMSPageContent } from './useCMSPageContent';

interface PageContent {
  [sectionField: string]: string;
}

export const useMarkdownPageContent = (pageSlug: string, language: string = 'en') => {
  const [markdownContent, setMarkdownContent] = useState<PageContent>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<number>(0);
  
  // Fallback para Supabase quando necessário
  const supabaseFallback = useCMSPageContent(pageSlug, language);

  const fetchMarkdownContent = useCallback(async () => {
    // Não fazer fetch se não tiver pageSlug válido
    if (!pageSlug || pageSlug.trim() === '') {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('useMarkdownPageContent - Fetching:', pageSlug, language);

      const fileName = MarkdownConverter.getMarkdownFileName(pageSlug, language);
      const result = await MarkdownAPI.getFile(fileName, 'content/pages');

      if (result.success && result.file) {
        const parsed = MarkdownConverter.markdownToContent(result.file.content);
        
        const organizedContent: PageContent = {};
        parsed.content.forEach(item => {
          const key = `${item.section_name}.${item.field_name}`;
          organizedContent[key] = item.content || '';
        });

        setMarkdownContent(organizedContent);
        setLastFetch(Date.now());
        console.log('useMarkdownPageContent - Content loaded:', Object.keys(organizedContent).length, 'fields');
      } else {
        throw new Error(`Markdown file not found: ${fileName}`);
      }
    } catch (err) {
      console.error('useMarkdownPageContent - Error:', err);
      setError(`Erro ao carregar Markdown: ${err}`);
    } finally {
      setLoading(false);
    }
  }, [pageSlug, language]);

  useEffect(() => {
    // Só fazer fetch se tiver pageSlug válido
    if (pageSlug && pageSlug.trim() !== '') {
      fetchMarkdownContent();
    }
  }, [fetchMarkdownContent]);

  // Função para obter conteúdo com fallback automático
  const getContent = useCallback((section: string, field: string, fallback: string = '') => {
    const key = `${section}.${field}`;
    const markdownValue = markdownContent[key];
    
    // Se temos conteúdo do markdown, usar ele
    if (markdownValue && markdownValue.trim() !== '') {
      return markdownValue;
    }
    
    // Se não temos erro de markdown, usar fallback fornecido
    if (!error) {
      return fallback;
    }
    
    // Se há erro de markdown, tentar Supabase como fallback
    const supabaseValue = supabaseFallback.getContent(section, field);
    if (supabaseValue && supabaseValue.trim() !== '') {
      console.log('useMarkdownPageContent - Using Supabase fallback for:', key);
      return supabaseValue;
    }
    
    return fallback;
  }, [markdownContent, error, supabaseFallback]);

  return {
    content: markdownContent,
    loading: loading || supabaseFallback.loading,
    error,
    getContent,
    refetch: fetchMarkdownContent,
    lastFetch,
    hasMarkdownContent: Object.keys(markdownContent).length > 0,
    isUsingFallback: error !== null,
  };
};
