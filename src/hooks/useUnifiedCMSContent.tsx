
import { useState, useEffect, useCallback } from 'react';
import { useCMSPageContent } from './useCMSPageContent';
import { useCMSMode } from './useCMSMode';
import { MarkdownAPI } from '@/services/markdownAPI';
import { MarkdownConverter } from '@/utils/markdownConverter';
import { ContentSyncService } from '@/services/contentSyncService';

interface UnifiedContent {
  [sectionField: string]: string;
}

export const useUnifiedCMSContent = (pageSlug: string, language: string = 'en') => {
  const { config, isHybridMode, isMarkdownOnly } = useCMSMode();
  const supabaseHook = useCMSPageContent(pageSlug, language);
  
  const [markdownContent, setMarkdownContent] = useState<UnifiedContent>({});
  const [markdownLoading, setMarkdownLoading] = useState(false);
  const [markdownError, setMarkdownError] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');

  // Buscar conteúdo do Markdown
  const fetchMarkdownContent = useCallback(async () => {
    if (!pageSlug || (!isMarkdownOnly && !isHybridMode)) {
      return;
    }

    try {
      setMarkdownLoading(true);
      setMarkdownError(null);

      const fileName = MarkdownConverter.getMarkdownFileName(pageSlug, language);
      const result = await MarkdownAPI.getFile(fileName, 'content/pages');

      if (result.success && result.file) {
        const parsed = MarkdownConverter.markdownToContent(result.file.content);
        
        const organizedContent: UnifiedContent = {};
        parsed.content.forEach(item => {
          const key = `${item.section_name}.${item.field_name}`;
          organizedContent[key] = item.content || '';
        });

        setMarkdownContent(organizedContent);
        console.log('useUnifiedCMSContent - Markdown content loaded:', organizedContent);
      } else {
        console.log('useUnifiedCMSContent - Markdown not available, using Supabase fallback');
        setMarkdownError('Markdown não disponível');
      }
    } catch (error) {
      console.error('useUnifiedCMSContent - Error fetching markdown:', error);
      setMarkdownError(`Erro ao carregar Markdown: ${error}`);
    } finally {
      setMarkdownLoading(false);
    }
  }, [pageSlug, language, isMarkdownOnly, isHybridMode]);

  // Sincronizar conteúdo para Markdown
  const syncToMarkdown = useCallback(async () => {
    if (!isHybridMode || !pageSlug) return;

    try {
      setSyncStatus('syncing');
      const result = await ContentSyncService.syncPageToMarkdown(pageSlug, language);
      
      if (result.success) {
        setSyncStatus('synced');
        // Recarregar conteúdo do Markdown após sincronização
        await fetchMarkdownContent();
      } else {
        setSyncStatus('error');
        console.error('Sync error:', result.message);
      }
    } catch (error) {
      setSyncStatus('error');
      console.error('Sync error:', error);
    }
  }, [pageSlug, language, isHybridMode, fetchMarkdownContent]);

  useEffect(() => {
    if (isMarkdownOnly || isHybridMode) {
      fetchMarkdownContent();
    }
  }, [fetchMarkdownContent]);

  // Decidir qual conteúdo usar baseado no modo
  const getContent = useCallback((section: string, field: string, fallback: string = '') => {
    const key = `${section}.${field}`;
    
    if (isMarkdownOnly) {
      // Apenas Markdown
      const markdownValue = markdownContent[key];
      if (markdownValue && markdownValue.trim() !== '') {
        return markdownValue;
      }
      console.log('useUnifiedCMSContent - Markdown mode fallback for:', key);
      return fallback;
    }

    if (isHybridMode) {
      // Preferir Markdown, fallback para Supabase
      const markdownValue = markdownContent[key];
      if (markdownValue && markdownValue.trim() !== '') {
        console.log('useUnifiedCMSContent - Using Markdown for:', key);
        return markdownValue;
      }
      
      const supabaseValue = supabaseHook.getContent(section, field);
      if (supabaseValue && supabaseValue.trim() !== '') {
        console.log('useUnifiedCMSContent - Using Supabase fallback for:', key);
        return supabaseValue;
      }
      
      console.log('useUnifiedCMSContent - Using final fallback for:', key);
      return fallback;
    }

    // Modo Supabase apenas
    return supabaseHook.getContent(section, field, fallback);
  }, [markdownContent, supabaseHook, isMarkdownOnly, isHybridMode]);

  // Dados combinados
  const loading = isMarkdownOnly ? markdownLoading : (supabaseHook.loading || markdownLoading);
  const error = isMarkdownOnly ? markdownError : (supabaseHook.error || markdownError);

  return {
    // Conteúdo unificado
    getContent,
    loading,
    error,
    
    // Controle de modo
    mode: config.mode,
    isHybridMode,
    isMarkdownOnly,
    
    // Dados específicos por fonte
    supabaseContent: supabaseHook.content,
    markdownContent,
    
    // Sincronização
    syncToMarkdown,
    syncStatus,
    
    // Refetch
    refetch: () => {
      supabaseHook.refetch();
      fetchMarkdownContent();
    }
  };
};
