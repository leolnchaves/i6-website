import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getPublicAssetUrl } from '@/utils/assetUtils';

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
  const [stories, setStories] = useState<HomeSuccessStoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchMarkdownContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const filename = language === 'pt' ? 'page-success-stories-pt.md' : 'page-success-stories-en.md';
        const response = await fetch(`${import.meta.env.BASE_URL}content/${filename}`, { cache: 'no-store' });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.status}`);
        }
        
        const content = await response.text();
        console.log('Home Success Stories content loaded:', content.substring(0, 200) + '...');
        console.log('Full content length:', content.length);
        const parsedStories = parseMarkdownContent(content);
        console.log('Parsed home stories count:', parsedStories.length);
        const version = String(content.length);
        const normalizedStories = parsedStories.map(s => ({
          ...s,
          image: getPublicAssetUrl(s.image) + `?v=${version}`
        }));
        setStories(normalizedStories);
      } catch (err) {
        console.error('Error fetching home success stories content:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdownContent();
  }, [language]);

  return { stories, loading, error };
};

const parseMarkdownContent = (content: string): HomeSuccessStoryItem[] => {
  const stories: HomeSuccessStoryItem[] = [];
  const sections = content.split('---').map(section => section.trim()).filter(Boolean);
  
  // Process all sections
  for (const section of sections) {
    const lines = section.split('\n').map(line => line.trim()).filter(Boolean);
    
    let segment = '';
    let quote = '';
    let client = '';
    let challenge = '';
    let image = '';
    let showHome = false;
    
    for (const line of lines) {
      if (line.startsWith('**Segment:**')) {
        segment = line.substring(12).trim();
      } else if (line.startsWith('**Quote:**')) {
        quote = line.substring(10).trim();
      } else if (line.startsWith('**Client:**')) {
        client = line.substring(11).trim();
      } else if (line.startsWith('**Challenge:**')) {
        challenge = line.substring(14).trim();
      } else if (line.startsWith('**Image:**')) {
        image = line.substring(10).trim();
      } else if (line.startsWith('**ShowHome:**')) {
        showHome = line.substring(13).trim().toLowerCase() === 'true';
      }
    }
    
    // Only include stories where ShowHome is True
    if (segment && quote && client && image && showHome) {
      stories.push({ segment, quote, client, challenge, image });
    }
  }
  
  return stories;
};