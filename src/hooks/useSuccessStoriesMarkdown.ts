import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export interface SuccessStoryItem {
  id: string;
  title: string;
  image: string;
  segment: string;
  client: string;
  description: string;
  challenge: string;
  solution: string;
  metric1: string;
  metric2: string;
  metric3: string;
  solutions: string[];
  quote: string;
  customerName: string;
  customerTitle: string;
}

interface UseSuccessStoriesMarkdownReturn {
  stories: SuccessStoryItem[];
  loading: boolean;
  error: string | null;
}

export const useSuccessStoriesMarkdown = (): UseSuccessStoriesMarkdownReturn => {
  const [stories, setStories] = useState<SuccessStoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchMarkdownContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const filename = language === 'pt' ? 'page-success-stories-pt.md' : 'page-success-stories-en.md';
        const response = await fetch(`/content/${filename}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.status}`);
        }
        
        const content = await response.text();
        console.log('Success stories markdown content loaded:', content.substring(0, 200) + '...');
        const parsedStories = parseMarkdownContent(content);
        console.log('Parsed success stories count:', parsedStories.length);
        setStories(parsedStories);
      } catch (err) {
        console.error('Error fetching success stories markdown content:', err);
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
    
    let title = '';
    let image = '';
    let segment = '';
    let client = '';
    let description = '';
    let challenge = '';
    let solution = '';
    let metric1 = '';
    let metric2 = '';
    let metric3 = '';
    let solutions: string[] = [];
    let quote = '';
    let customerName = '';
    let customerTitle = '';
    
    for (const line of lines) {
      if (line.startsWith('## ')) {
        title = line.substring(3).trim();
      } else if (line.startsWith('**Image:**')) {
        image = line.substring(10).trim();
      } else if (line.startsWith('**Segment:**')) {
        segment = line.substring(12).trim();
      } else if (line.startsWith('**Client:**')) {
        client = line.substring(11).trim();
      } else if (line.startsWith('**Description:**')) {
        description = line.substring(16).trim();
      } else if (line.startsWith('**Challenge:**')) {
        challenge = line.substring(14).trim();
      } else if (line.startsWith('**Solution:**')) {
        solution = line.substring(13).trim();
      } else if (line.startsWith('**Metric1:**')) {
        metric1 = line.substring(12).trim();
      } else if (line.startsWith('**Metric2:**')) {
        metric2 = line.substring(12).trim();
      } else if (line.startsWith('**Metric3:**')) {
        metric3 = line.substring(12).trim();
      } else if (line.startsWith('**Solutions:**')) {
        const solutionsText = line.substring(14).trim();
        solutions = solutionsText.split(',').map(s => s.trim());
      } else if (line.startsWith('**Quote:**')) {
        quote = line.substring(10).trim();
      } else if (line.startsWith('**CustomerName:**')) {
        customerName = line.substring(17).trim();
      } else if (line.startsWith('**CustomerTitle:**')) {
        customerTitle = line.substring(18).trim();
      }
    }
    
    if (title && image && segment && client) {
      // Generate ID from title
      const id = title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      
      stories.push({
        id,
        title,
        image,
        segment,
        client,
        description,
        challenge,
        solution,
        metric1,
        metric2,
        metric3,
        solutions,
        quote,
        customerName,
        customerTitle
      });
    }
  }
  
  return stories;
};