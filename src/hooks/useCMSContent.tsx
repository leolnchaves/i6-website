
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
      console.log('Iniciando busca do conteúdo CMS...');
      setLoading(true);
      
      // Usar uma query mais simples para evitar problemas de esquema
      const { data, error } = await supabase
        .from('cms_content')
        .select('*');

      if (error) {
        console.error('Erro do Supabase:', error);
        throw error;
      }
      
      console.log('Conteúdo CMS buscado com sucesso:', data?.length || 0, 'itens');
      if (data && data.length > 0) {
        console.log('Chaves de conteúdo encontradas:', data.map(item => item.key));
      }
      setContent(data || []);
    } catch (error) {
      console.error('Erro ao buscar conteúdo CMS:', error);
      
      // Fallback: tentar buscar novamente com uma abordagem diferente
      try {
        const response = await fetch(`https://zxuzevjswqjwlmkfzefq.supabase.co/rest/v1/cms_content`, {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4dXpldmpzd3Fqd2xta2Z6ZWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNTc5NDMsImV4cCI6MjA2NjYzMzk0M30.UYFQREdcLKhfEvIYtxFb0-oPKOhh775s13PgE6k-tLA',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4dXpldmpzd3Fqd2xta2Z6ZWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNTc5NDMsImV4cCI6MjA2NjYzMzk0M30.UYFQREdcLKhfEvIYtxFb0-oPKOhh775s13PgE6k-tLA',
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const fallbackData = await response.json();
          console.log('Conteúdo obtido via fallback:', fallbackData);
          setContent(fallbackData || []);
        } else {
          console.error('Erro na requisição fallback:', response.status, response.statusText);
          setContent([]);
        }
      } catch (fallbackError) {
        console.error('Erro no fallback:', fallbackError);
        setContent([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const getContent = (key: string): string => {
    console.log(`Buscando conteúdo para chave: ${key}`);
    console.log('Conteúdo disponível:', content.map(c => c.key));
    
    const item = content.find(c => c.key === key);
    if (!item) {
      console.log(`Conteúdo não encontrado para chave: ${key}`);
      return '';
    }
    
    const result = language === 'pt' ? item.content_pt : item.content_en;
    console.log(`Conteúdo encontrado para ${key}:`, result);
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
