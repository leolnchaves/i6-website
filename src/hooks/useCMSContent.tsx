
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CMSContent {
  id: string;
  page_id: string;
  section_name: string;
  field_name: string;
  language: string;
  content: string | null;
}

interface CMSPage {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  is_active: boolean;
}

export const useCMSContent = () => {
  const [pages, setPages] = useState<CMSPage[]>([]);
  const [content, setContent] = useState<CMSContent[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Buscar páginas
  const fetchPages = async () => {
    try {
      const { data, error } = await supabase
        .from('cms_pages')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error('Error fetching pages:', error);
      toast({
        title: 'Erro ao carregar páginas',
        description: 'Não foi possível carregar as páginas.',
        variant: 'destructive',
      });
    }
  };

  // Buscar conteúdo de uma página específica
  const fetchPageContent = async (pageId: string, language: string = 'en') => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cms_page_content')
        .select('*')
        .eq('page_id', pageId)
        .eq('language', language)
        .order('section_name, field_name');

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
      toast({
        title: 'Erro ao carregar conteúdo',
        description: 'Não foi possível carregar o conteúdo.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Salvar/atualizar conteúdo
  const saveContent = async (
    pageId: string,
    sectionName: string,
    fieldName: string,
    language: string,
    newContent: string
  ) => {
    try {
      const { error } = await supabase
        .from('cms_page_content')
        .upsert({
          page_id: pageId,
          section_name: sectionName,
          field_name: fieldName,
          language: language,
          content: newContent,
        }, {
          onConflict: 'page_id,section_name,field_name,language'
        });

      if (error) throw error;

      // Atualizar estado local
      setContent(prev => {
        const existingIndex = prev.findIndex(
          item => 
            item.page_id === pageId &&
            item.section_name === sectionName &&
            item.field_name === fieldName &&
            item.language === language
        );

        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = { ...updated[existingIndex], content: newContent };
          return updated;
        } else {
          return [...prev, {
            id: `temp-${Date.now()}`,
            page_id: pageId,
            section_name: sectionName,
            field_name: fieldName,
            language: language,
            content: newContent,
          }];
        }
      });

      toast({
        title: 'Conteúdo salvo',
        description: 'O conteúdo foi salvo com sucesso.',
      });
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar o conteúdo.',
        variant: 'destructive',
      });
    }
  };

  // Obter conteúdo específico
  const getContent = (sectionName: string, fieldName: string, language: string = 'en') => {
    const item = content.find(
      c => c.section_name === sectionName && 
           c.field_name === fieldName && 
           c.language === language
    );
    return item?.content || '';
  };

  useEffect(() => {
    fetchPages();
  }, []);

  return {
    pages,
    content,
    loading,
    fetchPages,
    fetchPageContent,
    saveContent,
    getContent,
  };
};
