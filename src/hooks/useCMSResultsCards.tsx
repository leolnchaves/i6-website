
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CMSResultsCard {
  id: string;
  card_order: number;
  title: string;
  description: string;
  icon_name: string;
  icon_color: string;
  background_color: string | null;
  background_opacity: number | null;
  is_active: boolean;
}

export const useCMSResultsCards = (pageSlug: string = 'home', language: string = 'en') => {
  const [cards, setCards] = useState<CMSResultsCard[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  console.log('🔍 useCMSResultsCards initialized:', { pageSlug, language });

  const fetchCards = useCallback(async () => {
    if (!pageSlug) {
      console.log('❌ useCMSResultsCards - No pageSlug provided');
      setCards([]);
      setLoading(false);
      return;
    }

    console.log('📡 useCMSResultsCards - Starting fetch with:', { pageSlug, language });
    
    try {
      setLoading(true);

      // First, get or create the page if it doesn't exist
      let { data: pageData, error: pageError } = await supabase
        .from('cms_pages')
        .select('id')
        .eq('slug', pageSlug)
        .eq('is_active', true)
        .maybeSingle();

      if (pageError) {
        console.error('💥 useCMSResultsCards - Page fetch error:', pageError);
        throw pageError;
      }

      // If page doesn't exist, create it
      if (!pageData) {
        console.log('📄 useCMSResultsCards - Page not found, creating:', pageSlug);
        
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
          console.error('💥 useCMSResultsCards - Page creation error:', createError);
          throw createError;
        }

        pageData = newPageData;
        console.log('✅ useCMSResultsCards - Created page with ID:', pageData.id);
      }

      console.log('✅ useCMSResultsCards - Using page ID:', pageData.id);

      // Then, fetch cards for this page using the UUID
      const { data: cardsData, error: cardsError } = await supabase
        .from('cms_results_cards')
        .select('*')
        .eq('page_id', pageData.id)
        .eq('language', language)
        .eq('is_active', true)
        .order('card_order');

      console.log('📊 useCMSResultsCards - Cards query result:', { 
        cardsData, 
        cardsError,
        cardsCount: cardsData?.length || 0
      });

      if (cardsError) {
        console.error('💥 useCMSResultsCards - Cards fetch error:', cardsError);
        throw cardsError;
      }

      // If no cards exist, create sample cards for the home page
      if ((!cardsData || cardsData.length === 0) && pageSlug === 'home') {
        console.log('🏗️ useCMSResultsCards - No cards found, creating sample cards');
        await createSampleCards(pageData.id, language);
        
        // Fetch again after creating sample cards
        const { data: newCardsData, error: newCardsError } = await supabase
          .from('cms_results_cards')
          .select('*')
          .eq('page_id', pageData.id)
          .eq('language', language)
          .eq('is_active', true)
          .order('card_order');

        if (newCardsError) {
          console.error('💥 useCMSResultsCards - Error fetching new cards:', newCardsError);
          throw newCardsError;
        }

        console.log('✅ useCMSResultsCards - Sample cards created and fetched:', newCardsData?.length || 0);
        setCards(newCardsData || []);
      } else {
        console.log('✅ useCMSResultsCards - Cards fetched successfully:', cardsData?.length || 0, 'cards');
        setCards(cardsData || []);
      }
    } catch (error) {
      console.error('💥 useCMSResultsCards - General error:', error);
      setCards([]);
      
      toast({
        title: 'Erro ao carregar cards',
        description: 'Não foi possível carregar os cards da seção Results.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      console.log('🏁 useCMSResultsCards - Fetch completed');
    }
  }, [pageSlug, language, toast]);

  const createSampleCards = async (pageId: string, language: string) => {
    const sampleCards = language === 'en' ? [
      {
        page_id: pageId,
        card_order: 1,
        language,
        title: '85% Conversion Rate',
        description: 'AI-powered recommendations increase conversion rates significantly',
        icon_name: 'trending-up',
        icon_color: '#f97316'
      },
      {
        page_id: pageId,
        card_order: 2,
        language,
        title: '40% Cost Reduction',
        description: 'Automated processes reduce operational costs',
        icon_name: 'dollar-sign',
        icon_color: '#10b981'
      },
      {
        page_id: pageId,
        card_order: 3,
        language,
        title: '92% Customer Satisfaction',
        description: 'Enhanced user experience drives satisfaction',
        icon_name: 'award',
        icon_color: '#8b5cf6'
      },
      {
        page_id: pageId,
        card_order: 4,
        language,
        title: '60% Faster Processing',
        description: 'AI optimization speeds up critical processes',
        icon_name: 'clock',
        icon_color: '#3b82f6'
      },
      {
        page_id: pageId,
        card_order: 5,
        language,
        title: '150% Revenue Growth',
        description: 'Smart analytics drive business growth',
        icon_name: 'target',
        icon_color: '#ef4444'
      }
    ] : [
      {
        page_id: pageId,
        card_order: 1,
        language,
        title: '85% Taxa de Conversão',
        description: 'Recomendações com IA aumentam significativamente as taxas de conversão',
        icon_name: 'trending-up',
        icon_color: '#f97316'
      },
      {
        page_id: pageId,
        card_order: 2,
        language,
        title: '40% Redução de Custos',
        description: 'Processos automatizados reduzem custos operacionais',
        icon_name: 'dollar-sign',
        icon_color: '#10b981'
      },
      {
        page_id: pageId,
        card_order: 3,
        language,
        title: '92% Satisfação do Cliente',
        description: 'Experiência aprimorada do usuário aumenta a satisfação',
        icon_name: 'award',
        icon_color: '#8b5cf6'
      },
      {
        page_id: pageId,
        card_order: 4,
        language,
        title: '60% Processamento Mais Rápido',
        description: 'Otimização com IA acelera processos críticos',
        icon_name: 'clock',
        icon_color: '#3b82f6'
      },
      {
        page_id: pageId,
        card_order: 5,
        language,
        title: '150% Crescimento de Receita',
        description: 'Analytics inteligentes impulsionam o crescimento do negócio',
        icon_name: 'target',
        icon_color: '#ef4444'
      }
    ];

    const { error } = await supabase
      .from('cms_results_cards')
      .insert(sampleCards);

    if (error) {
      console.error('💥 useCMSResultsCards - Error creating sample cards:', error);
      throw error;
    }

    console.log('✅ useCMSResultsCards - Sample cards created successfully');
  };

  useEffect(() => {
    console.log('🔄 useCMSResultsCards - Effect triggered:', { pageSlug, language });
    fetchCards();
  }, [fetchCards]);

  console.log('📊 useCMSResultsCards - Final return:', {
    cardsLength: cards.length,
    loading
  });

  return {
    cards,
    loading,
    refetch: fetchCards,
  };
};
