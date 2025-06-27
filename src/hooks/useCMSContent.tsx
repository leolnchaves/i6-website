
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/components/ui/use-toast';

interface CMSContent {
  id: string;
  key: string;
  content_en: string;
  content_pt: string;
  content_type: string;
  category: string | null;
  created_at: string;
  updated_at: string;
}

export const useCMSContent = () => {
  const [content, setContent] = useState<CMSContent[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  const fetchContent = async () => {
    try {
      console.log('🚀 Buscando conteúdo CMS...');
      setLoading(true);
      
      const { data, error } = await supabase
        .from('cms_content')
        .select('*')
        .order('category', { ascending: true })
        .order('key', { ascending: true });

      if (error) {
        console.error('❌ Erro do Supabase:', error);
        throw error;
      }
      
      console.log('✅ Conteúdo CMS carregado:', data?.length || 0, 'itens');
      console.log('📋 Chaves disponíveis:', data?.map(item => item.key));
      setContent(data || []);
    } catch (error) {
      console.error('❌ Erro ao buscar conteúdo CMS:', error);
      setContent([]);
    } finally {
      setLoading(false);
    }
  };

  const getContent = (key: string): string => {
    const item = content.find(c => c.key === key);
    if (!item) {
      console.log(`⚠️ Conteúdo não encontrado para chave: ${key}`);
      return '';
    }
    
    const result = language === 'pt' ? item.content_pt : item.content_en;
    console.log(`✅ Conteúdo encontrado para ${key} (${language}):`, result);
    return result;
  };

  const updateContent = async (key: string, contentEn: string, contentPt: string) => {
    try {
      const { error } = await supabase
        .from('cms_content')
        .update({
          content_en: contentEn,
          content_pt: contentPt,
          updated_at: new Date().toISOString()
        })
        .eq('key', key);

      if (error) throw error;
      
      await fetchContent();
      toast({
        title: "Sucesso",
        description: "Conteúdo atualizado com sucesso",
      });
    } catch (error) {
      console.error('Erro ao atualizar conteúdo:', error);
      toast({
        title: "Erro",
        description: "Falhou ao atualizar conteúdo",
        variant: "destructive",
      });
    }
  };

  const createContent = async (key: string, contentEn: string, contentPt: string, contentType: string = 'text', category?: string) => {
    try {
      const { error } = await supabase
        .from('cms_content')
        .insert({
          key,
          content_en: contentEn,
          content_pt: contentPt,
          content_type: contentType,
          category
        });

      if (error) throw error;
      
      await fetchContent();
      toast({
        title: "Sucesso",
        description: "Conteúdo criado com sucesso",
      });
    } catch (error) {
      console.error('Erro ao criar conteúdo:', error);
      toast({
        title: "Erro",
        description: "Falhou ao criar conteúdo",
        variant: "destructive",
      });
    }
  };

  const deleteContent = async (key: string) => {
    try {
      const { error } = await supabase
        .from('cms_content')
        .delete()
        .eq('key', key);

      if (error) throw error;
      
      await fetchContent();
      toast({
        title: "Sucesso",
        description: "Conteúdo deletado com sucesso",
      });
    } catch (error) {
      console.error('Erro ao deletar conteúdo:', error);
      toast({
        title: "Erro",
        description: "Falhou ao deletar conteúdo",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return {
    content,
    loading,
    getContent,
    updateContent,
    createContent,
    deleteContent,
    refetch: fetchContent
  };
};
