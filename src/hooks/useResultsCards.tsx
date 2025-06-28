
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

interface ResultCard {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export const useResultsCards = () => {
  const [cards, setCards] = useState<ResultCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  const fetchCards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Get the home page ID
      const { data: pageData, error: pageError } = await supabase
        .from('cms_pages')
        .select('id')
        .eq('slug', 'home')
        .eq('is_active', true)
        .single();

      if (pageError) throw pageError;

      // Get all results_cards content for the current language
      const { data: contentData, error: contentError } = await supabase
        .from('cms_page_content')
        .select('field_name, content')
        .eq('page_id', pageData.id)
        .eq('section_name', 'results_cards')
        .eq('language', language);

      if (contentError) throw contentError;

      // Group the data by card number
      const cardGroups: { [key: string]: Partial<ResultCard> } = {};
      
      contentData?.forEach(item => {
        const [cardKey, field] = item.field_name.split('_').slice(0, 2).join('_'), item.field_name.split('_').slice(2).join('_');
        
        if (!cardGroups[cardKey]) {
          cardGroups[cardKey] = {};
        }
        
        if (field === 'title') {
          cardGroups[cardKey].title = item.content || '';
        } else if (field === 'description') {
          cardGroups[cardKey].description = item.content || '';
        } else if (field === 'icon') {
          cardGroups[cardKey].icon = item.content || '';
        } else if (field === 'color') {
          cardGroups[cardKey].color = item.content || '';
        }
      });

      // Convert to array and sort by card number
      const cardsArray = Object.keys(cardGroups)
        .sort((a, b) => {
          const numA = parseInt(a.split('_')[1]);
          const numB = parseInt(b.split('_')[1]);
          return numA - numB;
        })
        .map(key => cardGroups[key])
        .filter(card => card.title && card.description && card.icon && card.color) as ResultCard[];

      setCards(cardsArray);
    } catch (err) {
      console.error('Error fetching results cards:', err);
      setError('Error loading results cards');
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return {
    cards,
    loading,
    error,
    refetch: fetchCards,
  };
};
