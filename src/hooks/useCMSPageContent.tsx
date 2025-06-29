
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PageContent {
  [sectionField: string]: string;
}

export const useCMSPageContent = (pageSlug: string, language: string = 'en') => {
  const [content, setContent] = useState<PageContent>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(async () => {
    if (!pageSlug) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('useCMSPageContent - Fetching content for page:', pageSlug, 'language:', language);

      // Primeiro, buscar a página pelo slug
      const { data: pageData, error: pageError } = await supabase
        .from('cms_pages')
        .select('id')
        .eq('slug', pageSlug)
        .eq('is_active', true)
        .maybeSingle();

      if (pageError) {
        console.error('Error fetching page:', pageError);
        setError('Erro ao buscar página');
        return;
      }

      if (!pageData) {
        console.log('Page not found:', pageSlug);
        setError('Página não encontrada');
        return;
      }

      console.log('useCMSPageContent - Found page ID:', pageData.id);

      // Depois, buscar o conteúdo da página
      const { data: contentData, error: contentError } = await supabase
        .from('cms_page_content')
        .select('section_name, field_name, content')
        .eq('page_id', pageData.id)
        .eq('language', language);

      if (contentError) {
        console.error('Error fetching content:', contentError);
        setError('Erro ao carregar conteúdo');
        return;
      }

      console.log('useCMSPageContent - Raw content data:', contentData);

      // Organizar dados em formato útil
      const organizedContent: PageContent = {};
      contentData?.forEach(item => {
        const key = `${item.section_name}.${item.field_name}`;
        organizedContent[key] = item.content || '';
        console.log('useCMSPageContent - Adding content:', key, '=', item.content);
      });

      console.log('useCMSPageContent - Organized content:', organizedContent);
      setContent(organizedContent);
    } catch (err) {
      console.error('Error in fetchContent:', err);
      setError('Erro inesperado');
    } finally {
      setLoading(false);
    }
  }, [pageSlug, language]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  // Função helper para obter conteúdo específico
  const getContent = useCallback((section: string, field: string, fallback: string = '') => {
    const key = `${section}.${field}`;
    const value = content[key] || fallback;
    console.log('useCMSPageContent - getContent:', key, '=', value);
    return value;
  }, [content]);

  return {
    content,
    loading,
    error,
    getContent,
    refetch: fetchContent,
  };
};
