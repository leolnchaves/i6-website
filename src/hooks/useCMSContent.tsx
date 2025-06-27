
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/types/language';

interface CMSContent {
  [key: string]: string;
}

interface CMSContentHook {
  content: CMSContent;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useCMSContent = (pageSlug: string, section: string): CMSContentHook => {
  const { language } = useLanguage();
  const [content, setContent] = useState<CMSContent>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log(`Fetching CMS content for: ${pageSlug}/${section} in ${language}`);

      // Buscar a página
      const { data: page, error: pageError } = await supabase
        .from('cms_pages')
        .select('id')
        .eq('slug', pageSlug)
        .eq('is_active', true)
        .single();

      if (pageError) {
        console.error('Erro ao buscar página:', pageError);
        throw new Error(`Página não encontrada: ${pageError.message}`);
      }

      if (!page) {
        throw new Error('Página não encontrada');
      }

      // Buscar conteúdo para o idioma atual
      const { data: contentData, error: contentError } = await supabase
        .from('cms_page_content')
        .select('field_key, content')
        .eq('page_id', page.id)
        .eq('section', section)
        .eq('language', language);

      if (contentError) {
        console.error('Erro ao buscar conteúdo:', contentError);
        throw new Error(`Erro ao carregar conteúdo: ${contentError.message}`);
      }

      // Se não houver conteúdo no idioma atual, buscar em inglês (fallback)
      let finalContent = contentData || [];
      
      if (!contentData || contentData.length === 0) {
        console.log(`Conteúdo não encontrado em ${language}, buscando fallback em inglês`);
        
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('cms_page_content')
          .select('field_key, content')
          .eq('page_id', page.id)
          .eq('section', section)
          .eq('language', 'en');

        if (fallbackError) {
          console.error('Erro ao buscar fallback:', fallbackError);
          throw new Error(`Erro ao carregar conteúdo de fallback: ${fallbackError.message}`);
        }

        finalContent = fallbackData || [];
      }

      // Converter array para objeto
      const contentObj: CMSContent = {};
      finalContent.forEach((item) => {
        if (item.field_key && item.content) {
          contentObj[item.field_key] = item.content;
        }
      });

      console.log('Conteúdo CMS carregado:', contentObj);
      setContent(contentObj);

    } catch (err) {
      console.error('Erro no useCMSContent:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setContent({});
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [pageSlug, section, language]);

  const refetch = () => {
    fetchContent();
  };

  return {
    content,
    isLoading,
    error,
    refetch
  };
};
