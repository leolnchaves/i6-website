
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SEOData {
  meta_title: string;
  meta_description: string;
  slug: string;
  canonical_url: string;
  index_flag: boolean;
  follow_flag: boolean;
}

export const useCMSSEO = () => {
  const [seoData, setSeoData] = useState<{ [key: string]: SEOData }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSEOData = useCallback(async (pageId: string, language: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('cms_seo')
        .select('*')
        .eq('page_id', pageId)
        .eq('language', language)
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching SEO data:', fetchError);
        setError('Erro ao carregar dados de SEO');
        return;
      }

      const key = `${pageId}_${language}`;
      setSeoData(prev => ({
        ...prev,
        [key]: data || {
          meta_title: '',
          meta_description: '',
          slug: '',
          canonical_url: '',
          index_flag: true,
          follow_flag: true
        }
      }));
    } catch (err) {
      console.error('Error in fetchSEOData:', err);
      setError('Erro inesperado');
    } finally {
      setLoading(false);
    }
  }, []);

  const saveSEOData = useCallback(async (
    pageId: string,
    language: string,
    data: SEOData
  ) => {
    try {
      setError(null);

      const { error: saveError } = await supabase
        .from('cms_seo')
        .upsert({
          page_id: pageId,
          language,
          ...data
        });

      if (saveError) {
        console.error('Error saving SEO data:', saveError);
        setError('Erro ao salvar dados de SEO');
        return false;
      }

      // Update local state
      const key = `${pageId}_${language}`;
      setSeoData(prev => ({ ...prev, [key]: data }));
      return true;
    } catch (err) {
      console.error('Error in saveSEOData:', err);
      setError('Erro inesperado');
      return false;
    }
  }, []);

  const getSEOData = useCallback((pageId: string, language: string): SEOData => {
    const key = `${pageId}_${language}`;
    return seoData[key] || {
      meta_title: '',
      meta_description: '',
      slug: '',
      canonical_url: '',
      index_flag: true,
      follow_flag: true
    };
  }, [seoData]);

  return {
    seoData,
    loading,
    error,
    fetchSEOData,
    saveSEOData,
    getSEOData
  };
};
