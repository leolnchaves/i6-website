import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSuccessStoriesMarkdown } from './useSuccessStoriesMarkdown';

export interface HomeSuccessStoryItem {
  segment: string;
  quote: string;
  client: string;
  challenge?: string;
  image: string;
}

interface UseHomeSuccessStoriesReturn {
  stories: HomeSuccessStoryItem[];
  loading: boolean;
  error: string | null;
}

export const useHomeSuccessStories = (): UseHomeSuccessStoriesReturn => {
  const { stories: all, loading, error } = useSuccessStoriesMarkdown();
  const { language } = useLanguage();
  const [stories, setStories] = useState<HomeSuccessStoryItem[]>([]);

  useEffect(() => {
    const home = all
      .filter(s => s.showHome)
      .map(s => ({
        segment: s.segment,
        quote: s.quote,
        client: s.client,
        challenge: s.challenge,
        image: s.image,
      }));
    setStories(home);
  }, [all, language]);

  return { stories, loading, error };
};
