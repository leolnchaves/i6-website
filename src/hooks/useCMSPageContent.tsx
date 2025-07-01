
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';

export const useCMSPageContent = (pageSlug: string, language: string = 'en') => {
  const [content, setContent] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('useCMSPageContent - TESTE: Simulando falha no banco de dados');
      
      // SIMULAÇÃO DE FALHA DO BANCO - COMENTAR ESTA LINHA PARA RESTAURAR
      throw new Error('Banco de dados desconectado para teste de fallback');
      
      // Código original comentado para o teste
      /*
      const { data, error: fetchError } = await supabase
        .from('page_content')
        .select('section, field, content')
        .eq('page_slug', pageSlug)
        .eq('language', language);

      if (fetchError) {
        throw fetchError;
      }

      const contentMap: { [key: string]: string } = {};
      if (data) {
        data.forEach((item) => {
          const key = `${item.section}.${item.field}`;
          contentMap[key] = item.content;
        });
      }

      setContent(contentMap);
      logger.info('CMS content loaded successfully', { pageSlug, language, itemCount: data?.length || 0 });
      */
      
      // Para o teste, definimos conteúdo vazio
      setContent({});
      
    } catch (err) {
      console.error('useCMSPageContent - Erro simulado:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setContent({});
      logger.error('Failed to load CMS content (TESTE)', err, { pageSlug, language });
    } finally {
      setLoading(false);
    }
  }, [pageSlug, language]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const getContent = useCallback((section: string, field: string, fallback: string = '') => {
    const key = `${section}.${field}`;
    const value = content[key];
    console.log('useCMSPageContent - TESTE getContent:', key, '=', value || 'VAZIO (irá usar fallback)');
    return value && value.trim() !== '' ? value : fallback;
  }, [content]);

  return {
    content,
    loading,
    error,
    getContent
  };
};
