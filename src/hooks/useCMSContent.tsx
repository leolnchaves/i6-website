
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/components/ui/use-toast';
import type { Database } from '@/integrations/supabase/types';

type CMSContent = Database['public']['Tables']['cms_content']['Row'];

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
        .order('page', { ascending: true })
        .order('category', { ascending: true })
        .order('key', { ascending: true });

      if (error) {
        console.error('❌ Erro do Supabase:', error);
        
        // Usar dados estáticos como fallback
        console.log('🔄 Usando dados estáticos como fallback...');
        setContent(getStaticContent());
        
        toast({
          title: "Aviso",
          description: "Usando conteúdo estático - dados dinâmicos não disponíveis",
          variant: "default",
        });
        return;
      }
      
      console.log('✅ Conteúdo CMS carregado:', data?.length || 0, 'itens');
      
      // Se não há dados, usar dados estáticos
      if (!data || data.length === 0) {
        console.log('📝 Nenhum dado encontrado, usando dados estáticos...');
        setContent(getStaticContent());
        return;
      }
      
      console.log('📋 Chaves disponíveis:', data?.map((item) => item.key));
      setContent(data || []);
    } catch (error) {
      console.error('❌ Erro ao buscar conteúdo CMS:', error);
      
      // Em caso de erro, usar dados estáticos como fallback
      console.log('🔄 Usando dados estáticos como fallback...');
      setContent(getStaticContent());
      
      toast({
        title: "Aviso",
        description: "Usando conteúdo estático - dados dinâmicos não disponíveis",
        variant: "default",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStaticContent = (): CMSContent[] => {
    return [
      // Hero section content
      { id: '1', key: 'hero.infinite', content_en: 'Infinite', content_pt: 'Infinitas', content_type: 'text', category: 'hero', page: 'home', created_at: '', updated_at: '' },
      { id: '2', key: 'hero.possibilities', content_en: 'Possibilities', content_pt: 'Possibilidades', content_type: 'text', category: 'hero', page: 'home', created_at: '', updated_at: '' },
      { id: '3', key: 'hero.poweredByAI', content_en: 'Powered by AI', content_pt: 'Alimentado por IA', content_type: 'text', category: 'hero', page: 'home', created_at: '', updated_at: '' },
      { id: '4', key: 'hero.description', content_en: 'Transform your business with our cutting-edge AI solutions. Unlock unprecedented efficiency and innovation.', content_pt: 'Transforme seu negócio com nossas soluções de IA de ponta. Desbloqueie eficiência e inovação sem precedentes.', content_type: 'text', category: 'hero', page: 'home', created_at: '', updated_at: '' },
      { id: '5', key: 'hero.startJourney', content_en: 'Start Your Journey', content_pt: 'Comece Sua Jornada', content_type: 'text', category: 'hero', page: 'home', created_at: '', updated_at: '' },
      { id: '6', key: 'hero.watchDemo', content_en: 'Watch Demo', content_pt: 'Assistir Demo', content_type: 'text', category: 'hero', page: 'home', created_at: '', updated_at: '' },
      
      // Stats section content
      { id: '7', key: 'stats.topEngine', content_en: 'Top 1% Search Engine', content_pt: 'Top 1% Motor de Busca', content_type: 'text', category: 'stats', page: 'home', created_at: '', updated_at: '' },
      { id: '8', key: 'stats.securityIssue', content_en: 'Security Issues', content_pt: 'Problemas de Segurança', content_type: 'text', category: 'stats', page: 'home', created_at: '', updated_at: '' },
      { id: '9', key: 'stats.leadtime', content_en: 'sec Lead Time', content_pt: 'seg Tempo de Resposta', content_type: 'text', category: 'stats', page: 'home', created_at: '', updated_at: '' },
      { id: '10', key: 'stats.explainability', content_en: 'Explainability', content_pt: 'Explicabilidade', content_type: 'text', category: 'stats', page: 'home', created_at: '', updated_at: '' },
      
      // CTA section content
      { id: '11', key: 'cta.title', content_en: 'Ready to Transform Your Business?', content_pt: 'Pronto para Transformar seu Negócio?', content_type: 'text', category: 'cta', page: 'component', created_at: '', updated_at: '' },
      { id: '12', key: 'cta.description', content_en: 'Join thousands of companies already using our AI solutions to drive growth and innovation.', content_pt: 'Junte-se a milhares de empresas que já usam nossas soluções de IA para impulsionar crescimento e inovação.', content_type: 'text', category: 'cta', page: 'component', created_at: '', updated_at: '' },
      { id: '13', key: 'cta.button', content_en: 'Get Started Today', content_pt: 'Comece Hoje', content_type: 'text', category: 'cta', page: 'component', created_at: '', updated_at: '' }
    ];
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

  const getContentByPage = (page: string): CMSContent[] => {
    return content.filter(c => c.page === page);
  };

  const getContentByPageAndCategory = (page: string, category: string): CMSContent[] => {
    return content.filter(c => c.page === page && c.category === category);
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

  const createContent = async (key: string, contentEn: string, contentPt: string, contentType: string = 'text', category?: string, page?: string) => {
    try {
      const { error } = await supabase
        .from('cms_content')
        .insert({
          key,
          content_en: contentEn,
          content_pt: contentPt,
          content_type: contentType,
          category,
          page
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
    getContentByPage,
    getContentByPageAndCategory,
    updateContent,
    createContent,
    deleteContent,
    refetch: fetchContent
  };
};
