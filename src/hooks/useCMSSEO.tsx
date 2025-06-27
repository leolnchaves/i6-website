
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/types/language';

interface CMSSEOData {
  meta_title?: string;
  meta_description?: string;
  slug?: string;
  canonical_url?: string;
  robots_index?: boolean;
  robots_follow?: boolean;
}

interface CMSSEOHook {
  seoData: CMSSEOData;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useCMSSEO = (pageSlug: string): CMSSEOHook => {
  const { language } = useLanguage();
  const [seoData, setSEOData] = useState<CMSSEOData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSEOData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log(`Fetching CMS SEO data for: ${pageSlug} in ${language}`);

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

      // Buscar metadados SEO para o idioma atual
      const { data: seoData, error: seoError } = await supabase
        .from('cms_seo_meta')
        .select('meta_title, meta_description, slug, canonical_url, robots_index, robots_follow')
        .eq('page_id', page.id)
        .eq('language', language)
        .single();

      if (seoError && seoError.code !== 'PGRST116') { // PGRST116 = no rows found
        console.error('Erro ao buscar SEO:', seoError);
        throw new Error(`Erro ao carregar metadados SEO: ${seoError.message}`);
      }

      // Se não houver dados no idioma atual, buscar em inglês (fallback)
      let finalSEOData = seoData;
      
      if (!seoData) {
        console.log(`SEO não encontrado em ${language}, buscando fallback em inglês`);
        
        const { data: fallbackSEO, error: fallbackError } = await supabase
          .from('cms_seo_meta')
          .select('meta_title, meta_description, slug, canonical_url, robots_index, robots_follow')
          .eq('page_id', page.id)
          .eq('language', 'en')
          .single();

        if (fallbackError && fallbackError.code !== 'PGRST116') {
          console.error('Erro ao buscar SEO fallback:', fallbackError);
          throw new Error(`Erro ao carregar metadados SEO de fallback: ${fallbackError.message}`);
        }

        finalSEOData = fallbackSEO;
      }

      console.log('Dados SEO CMS carregados:', finalSEOData);
      setSEOData(finalSEOData || {});

    } catch (err) {
      console.error('Erro no useCMSSEO:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setSEOData({});
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSEOData();
  }, [pageSlug, language]);

  const refetch = () => {
    fetchSEOData();
  };

  return {
    seoData,
    isLoading,
    error,
    refetch
  };
};
