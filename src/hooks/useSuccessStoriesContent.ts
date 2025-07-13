import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export interface SuccessStoryItem {
  segment: string;
  description: string;
  client: string;
  image: string;
}

interface UseSuccessStoriesContentReturn {
  stories: SuccessStoryItem[];
  loading: boolean;
  error: string | null;
}

export const useSuccessStoriesContent = (): UseSuccessStoriesContentReturn => {
  const [stories, setStories] = useState<SuccessStoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchMarkdownContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const filename = language === 'pt' ? 'success-stories-pt.md' : 'success-stories-en.md';
        const response = await fetch(`/content/${filename}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.status}`);
        }
        
        const content = await response.text();
        console.log('Success Stories content loaded:', content.substring(0, 200) + '...');
        const parsedStories = parseMarkdownContent(content);
        console.log('Parsed stories count:', parsedStories.length);
        setStories(parsedStories);
      } catch (err) {
        console.error('Error fetching success stories content:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdownContent();
  }, [language]);

  return { stories, loading, error };
};

const parseMarkdownContent = (content: string): SuccessStoryItem[] => {
  const stories: SuccessStoryItem[] = [];
  const sections = content.split('---').map(section => section.trim()).filter(Boolean);
  
  // Process all sections, including the first one which contains the first card
  for (const section of sections) {
    const lines = section.split('\n').map(line => line.trim()).filter(Boolean);
    
    let segment = '';
    let description = '';
    let client = '';
    let image = '';
    
    for (const line of lines) {
      if (line.startsWith('## ')) {
        segment = line.substring(3).trim();
      } else if (line.startsWith('**Description:**')) {
        description = line.substring(16).trim();
      } else if (line.startsWith('**Client:**')) {
        client = line.substring(11).trim();
      } else if (line.startsWith('**Image:**')) {
        image = line.substring(10).trim();
      }
    }
    
    if (segment && description && client && image) {
      stories.push({ segment, description, client, image });
    }
  }
  
  return stories;
};