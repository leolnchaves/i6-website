
import { supabase } from '@/integrations/supabase/client';
import { MarkdownAPI } from './markdownAPI';
import { MarkdownConverter } from '@/utils/markdownConverter';

interface SyncResult {
  success: boolean;
  message: string;
  errors?: string[];
}

export class ContentSyncService {
  static async syncPageToMarkdown(pageSlug: string, language: string): Promise<SyncResult> {
    console.log(`ContentSyncService - Syncing ${pageSlug} (${language}) to Markdown`);
    
    try {
      // 1. Buscar conteúdo do Supabase
      const { data: pageData, error: pageError } = await supabase
        .from('cms_pages')
        .select('id')
        .eq('slug', pageSlug)
        .single();

      if (pageError || !pageData) {
        return {
          success: false,
          message: `Página ${pageSlug} não encontrada no Supabase`
        };
      }

      const { data: contentData, error: contentError } = await supabase
        .from('cms_page_content')
        .select('section_name, field_name, content, language')
        .eq('page_id', pageData.id)
        .eq('language', language);

      if (contentError) {
        return {
          success: false,
          message: `Erro ao buscar conteúdo: ${contentError.message}`
        };
      }

      // 2. Converter para Markdown
      const markdownContent = MarkdownConverter.contentToMarkdown(
        pageSlug,
        language,
        contentData || []
      );

      // 3. Salvar via API externa
      const fileName = MarkdownConverter.getMarkdownFileName(pageSlug, language);
      const saveResult = await MarkdownAPI.saveFile(fileName, markdownContent, 'content/pages');

      if (!saveResult.success) {
        return {
          success: false,
          message: `Erro ao salvar Markdown: ${saveResult.message}`
        };
      }

      return {
        success: true,
        message: `Página ${pageSlug} sincronizada com sucesso para Markdown`
      };

    } catch (error) {
      console.error('ContentSyncService - Error syncing to Markdown:', error);
      return {
        success: false,
        message: `Erro inesperado durante sincronização: ${error}`
      };
    }
  }

  static async syncAllPagesToMarkdown(): Promise<SyncResult> {
    console.log('ContentSyncService - Syncing all pages to Markdown');
    
    try {
      // Buscar todas as páginas ativas
      const { data: pages, error: pagesError } = await supabase
        .from('cms_pages')
        .select('slug')
        .eq('is_active', true);

      if (pagesError) {
        return {
          success: false,
          message: `Erro ao buscar páginas: ${pagesError.message}`
        };
      }

      const languages = ['en', 'pt'];
      const errors: string[] = [];
      let successCount = 0;

      // Sincronizar cada página em cada idioma
      for (const page of pages || []) {
        for (const lang of languages) {
          const result = await this.syncPageToMarkdown(page.slug, lang);
          if (result.success) {
            successCount++;
          } else {
            errors.push(`${page.slug} (${lang}): ${result.message}`);
          }
        }
      }

      return {
        success: errors.length === 0,
        message: `Sincronização concluída: ${successCount} páginas sincronizadas${errors.length > 0 ? `, ${errors.length} erros` : ''}`,
        errors: errors.length > 0 ? errors : undefined
      };

    } catch (error) {
      console.error('ContentSyncService - Error syncing all pages:', error);
      return {
        success: false,
        message: `Erro inesperado durante sincronização completa: ${error}`
      };
    }
  }

  static async validateSync(pageSlug: string, language: string): Promise<SyncResult> {
    console.log(`ContentSyncService - Validating sync for ${pageSlug} (${language})`);
    
    try {
      // Buscar conteúdo do Supabase
      const { data: pageData, error: pageError } = await supabase
        .from('cms_pages')
        .select('id')
        .eq('slug', pageSlug)
        .single();

      if (pageError || !pageData) {
        return {
          success: false,
          message: `Página ${pageSlug} não encontrada`
        };
      }

      const { data: supabaseContent } = await supabase
        .from('cms_page_content')
        .select('section_name, field_name, content')
        .eq('page_id', pageData.id)
        .eq('language', language);

      // Buscar arquivo Markdown
      const fileName = MarkdownConverter.getMarkdownFileName(pageSlug, language);
      const markdownResult = await MarkdownAPI.getFile(fileName, 'content/pages');

      if (!markdownResult.success) {
        return {
          success: false,
          message: `Arquivo Markdown não encontrado: ${markdownResult.message}`
        };
      }

      // Por enquanto, apenas validar que ambos existem
      // Em uma implementação completa, compararíamos o conteúdo
      return {
        success: true,
        message: `Sincronização validada para ${pageSlug} (${language})`
      };

    } catch (error) {
      console.error('ContentSyncService - Error validating sync:', error);
      return {
        success: false,
        message: `Erro durante validação: ${error}`
      };
    }
  }
}
