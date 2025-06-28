
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

interface CompactSolutionsCard {
  id: string;
  card_order: number;
  engine_name: string;
  title: string;
  description: string;
  icon_name: string;
  background_color: string;
  background_opacity: number;
  is_active: boolean;
}

export const useCMSCompactSolutionsCardsFrontend = (pageSlug: string = 'home') => {
  const [cards, setCards] = useState<CompactSolutionsCard[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        console.log('Fetching compact solutions cards for:', { pageSlug, language });
        
        // First get the page ID
        const { data: pageData, error: pageError } = await supabase
          .from('cms_pages')
          .select('id')
          .eq('slug', pageSlug)
          .single();

        if (pageError) {
          console.error('Error fetching page:', pageError);
          return;
        }

        // Then get the cards for that page
        const { data, error } = await supabase
          .from('cms_compact_solutions_cards')
          .select('*')
          .eq('page_id', pageData.id)
          .eq('language', language)
          .eq('is_active', true)
          .order('card_order');

        if (error) {
          console.error('Error fetching compact solutions cards:', error);
          return;
        }

        console.log('Fetched compact solutions cards:', data);
        setCards(data || []);
      } catch (error) {
        console.error('Error in fetchCards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [pageSlug, language]);

  return { cards, loading };
};
