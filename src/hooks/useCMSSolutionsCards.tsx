
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SolutionsCard {
  id: string;
  page_id: string;
  card_order: number;
  language: string;
  title: string;
  focus: string;
  description: string;
  features: string[];
  outcome: string;
  engine: string;
  gradient: string;
  bg_color: string;
  border_color: string;
  icon: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useCMSSolutionsCards = (pageSlugOrId: string, language: string) => {
  const [cards, setCards] = useState<SolutionsCard[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Helper function to get or create page
  const getOrCreatePage = useCallback(async (pageSlug: string) => {
    console.log('useCMSSolutionsCards - Getting or creating page for slug:', pageSlug);
    
    try {
      // First try to get existing page
      let { data: pageData, error: pageError } = await supabase
        .from('cms_pages')
        .select('id')
        .eq('slug', pageSlug)
        .eq('is_active', true)
        .maybeSingle();

      if (pageError) {
        console.error('useCMSSolutionsCards - Page fetch error:', pageError);
        return null;
      }

      // If page doesn't exist, create it
      if (!pageData) {
        console.log('useCMSSolutionsCards - Page not found, creating:', pageSlug);
        
        const { data: newPageData, error: createError } = await supabase
          .from('cms_pages')
          .insert({
            slug: pageSlug,
            name: pageSlug.charAt(0).toUpperCase() + pageSlug.slice(1),
            description: `${pageSlug} page`,
            is_active: true
          })
          .select('id')
          .single();

        if (createError) {
          console.error('useCMSSolutionsCards - Page creation error:', createError);
          return null;
        }

        pageData = newPageData;
        console.log('useCMSSolutionsCards - Created page with ID:', pageData.id);
      }

      console.log('useCMSSolutionsCards - Using page ID:', pageData.id);
      return pageData.id;
    } catch (error) {
      console.error('useCMSSolutionsCards - Error in getOrCreatePage:', error);
      return null;
    }
  }, []);

  const fetchCards = useCallback(async () => {
    if (!pageSlugOrId || !language) {
      console.log('useCMSSolutionsCards - Missing pageSlugOrId or language:', { pageSlugOrId, language });
      setCards([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      console.log('useCMSSolutionsCards - Fetching solutions cards for:', pageSlugOrId, 'language:', language);
      
      // Convert slug to page ID if needed
      let pageId = pageSlugOrId;
      
      // Check if it's a UUID (contains hyphens) or a slug
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(pageSlugOrId);
      
      if (!isUuid) {
        console.log('useCMSSolutionsCards - Converting slug to page ID:', pageSlugOrId);
        const convertedPageId = await getOrCreatePage(pageSlugOrId);
        if (!convertedPageId) {
          console.log('useCMSSolutionsCards - Could not get or create page, setting empty cards');
          setCards([]);
          return;
        }
        pageId = convertedPageId;
      }

      console.log('useCMSSolutionsCards - Using page ID:', pageId);
      
      const { data, error } = await supabase
        .from('cms_solutions_cards')
        .select('*')
        .eq('page_id', pageId)
        .eq('language', language)
        .eq('is_active', true)
        .order('card_order', { ascending: true });

      if (error) {
        console.error('useCMSSolutionsCards - Error fetching solutions cards:', error);
        throw error;
      }

      // If no cards exist and it's the solutions page, create sample cards
      if ((!data || data.length === 0) && pageSlugOrId === 'solutions') {
        console.log('🏗️ useCMSSolutionsCards - No cards found, creating sample cards');
        await createSampleCards(pageId, language);
        
        // Fetch again after creating sample cards
        const { data: newData, error: newError } = await supabase
          .from('cms_solutions_cards')
          .select('*')
          .eq('page_id', pageId)
          .eq('language', language)
          .eq('is_active', true)
          .order('card_order', { ascending: true });

        if (newError) {
          console.error('useCMSSolutionsCards - Error fetching new cards:', newError);
          throw newError;
        }

        console.log('✅ useCMSSolutionsCards - Sample cards created and fetched:', newData?.length || 0);
        setCards(newData || []);
      } else {
        console.log('useCMSSolutionsCards - Solutions cards fetched successfully:', data?.length || 0, 'cards');
        setCards(data || []);
      }
    } catch (error) {
      console.error('useCMSSolutionsCards - Failed to fetch solutions cards:', error);
      setCards([]);
      toast({
        title: 'Erro',
        description: 'Falha ao carregar os cards de soluções.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [pageSlugOrId, language, toast, getOrCreatePage]);

  const createSampleCards = async (pageId: string, language: string) => {
    const sampleCards = language === 'en' ? [
      {
        page_id: pageId,
        card_order: 1,
        language,
        title: 'Recommendation Engine',
        focus: 'Personalized product recommendations',
        description: 'AI-powered engine that analyzes user behavior to suggest relevant products',
        features: ['Real-time processing', 'Machine learning', 'A/B testing'],
        outcome: 'Increased conversion rates and customer satisfaction',
        engine: 'i6 RecSys'
      },
      {
        page_id: pageId,
        card_order: 2,
        language,
        title: 'Dynamic Pricing',
        focus: 'Intelligent price optimization',
        description: 'Advanced algorithms optimize pricing strategies in real-time',
        features: ['Market analysis', 'Competitor tracking', 'Demand forecasting'],
        outcome: 'Maximized revenue and market competitiveness',
        engine: 'i6 RecSys'
      },
      {
        page_id: pageId,
        card_order: 3,
        language,
        title: 'Customer Analytics',
        focus: 'Deep customer insights',
        description: 'Comprehensive analytics platform for understanding customer behavior',
        features: ['Behavioral tracking', 'Predictive modeling', 'Segmentation'],
        outcome: 'Better customer understanding and targeting',
        engine: 'i6 RecSys'
      }
    ] : [
      {
        page_id: pageId,
        card_order: 1,
        language,
        title: 'Motor de Recomendação',
        focus: 'Recomendações personalizadas de produtos',
        description: 'Motor alimentado por IA que analisa comportamento do usuário para sugerir produtos relevantes',
        features: ['Processamento em tempo real', 'Aprendizado de máquina', 'Testes A/B'],
        outcome: 'Aumento das taxas de conversão e satisfação do cliente',
        engine: 'i6 RecSys'
      },
      {
        page_id: pageId,
        card_order: 2,
        language,
        title: 'Precificação Dinâmica',
        focus: 'Otimização inteligente de preços',
        description: 'Algoritmos avançados otimizam estratégias de preços em tempo real',
        features: ['Análise de mercado', 'Rastreamento de concorrentes', 'Previsão de demanda'],
        outcome: 'Receita maximizada e competitividade no mercado',
        engine: 'i6 RecSys'
      },
      {
        page_id: pageId,
        card_order: 3,
        language,
        title: 'Analytics de Cliente',
        focus: 'Insights profundos do cliente',
        description: 'Plataforma de analytics abrangente para entender comportamento do cliente',
        features: ['Rastreamento comportamental', 'Modelagem preditiva', 'Segmentação'],
        outcome: 'Melhor compreensão e direcionamento do cliente',
        engine: 'i6 RecSys'
      }
    ];

    const { error } = await supabase
      .from('cms_solutions_cards')
      .insert(sampleCards);

    if (error) {
      console.error('💥 useCMSSolutionsCards - Error creating sample cards:', error);
      throw error;
    }

    console.log('✅ useCMSSolutionsCards - Sample cards created successfully');
  };

  const saveCard = useCallback(async (cardData: Partial<SolutionsCard>) => {
    try {
      console.log('Saving solutions card:', cardData);
      
      const { data, error } = await supabase
        .from('cms_solutions_cards')
        .upsert(cardData)
        .select()
        .single();

      if (error) throw error;

      console.log('Solutions card saved:', data);
      await fetchCards();
      
      toast({
        title: 'Sucesso!',
        description: 'Card salvo com sucesso.',
      });

      return data;
    } catch (error) {
      console.error('Error saving solutions card:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao salvar o card.',
        variant: 'destructive',
      });
      throw error;
    }
  }, [fetchCards, toast]);

  const deleteCard = useCallback(async (cardId: string) => {
    try {
      console.log('Deleting solutions card:', cardId);
      
      const { error } = await supabase
        .from('cms_solutions_cards')
        .delete()
        .eq('id', cardId);

      if (error) throw error;

      console.log('Solutions card deleted');
      await fetchCards();
      
      toast({
        title: 'Sucesso!',
        description: 'Card excluído com sucesso.',
      });
    } catch (error) {
      console.error('Error deleting solutions card:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao excluir o card.',
        variant: 'destructive',
      });
      throw error;
    }
  }, [fetchCards, toast]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const refetch = useCallback(() => {
    return fetchCards();
  }, [fetchCards]);

  return {
    cards,
    loading,
    saveCard,
    deleteCard,
    refetch,
  };
};
