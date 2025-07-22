import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export interface SolutionItem {
  id: string;
  title: string;
  engine: string;
  icon: string;
  target: string;
  overview: string;
  keyFeatures: string[];
  businessResults: string;
}

interface UseSolutionsMarkdownReturn {
  solutions: SolutionItem[];
  loading: boolean;
  error: string | null;
}

export const useSolutionsMarkdown = (): UseSolutionsMarkdownReturn => {
  const [solutions, setSolutions] = useState<SolutionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchMarkdownContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const filename = language === 'pt' ? 'page-solutions-pt.md' : 'page-solutions-en.md';
        const response = await fetch(`${import.meta.env.BASE_URL}content/${filename}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.status}`);
        }
        
        const content = await response.text();
        console.log('Solutions markdown content loaded:', content.substring(0, 200) + '...');
        const parsedSolutions = parseMarkdownContent(content);
        console.log('Parsed solutions count:', parsedSolutions.length);
        console.log('Parsed solutions data:', parsedSolutions);
        setSolutions(parsedSolutions);
      } catch (err) {
        console.error('Error fetching solutions markdown content:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdownContent();
  }, [language]);

  return { solutions, loading, error };
};

const parseMarkdownContent = (content: string): SolutionItem[] => {
  const solutions: SolutionItem[] = [];
  const sections = content.split('---').map(section => section.trim()).filter(Boolean);
  
  // Process all sections, including the first one which contains the first solution
  for (const section of sections) {
    const lines = section.split('\n').map(line => line.trim()).filter(Boolean);
    
    let title = '';
    let engine = '';
    let icon = '';
    let target = '';
    let overview = '';
    let keyFeatures: string[] = [];
    let businessResults = '';
    let isReadingFeatures = false;
    
    for (const line of lines) {
      if (line.startsWith('## ')) {
        title = line.substring(3).trim();
      } else if (line.startsWith('**Engine:**')) {
        engine = line.substring(11).trim();
      } else if (line.startsWith('**Icon:**')) {
        icon = line.substring(9).trim();
      } else if (line.startsWith('**Target:**')) {
        target = line.substring(11).trim();
      } else if (line.startsWith('**Title:**')) {
        // Skip as we already have title from header
        continue;
      } else if (line.startsWith('**Overview:**')) {
        overview = line.substring(13).trim();
        isReadingFeatures = false;
      } else if (line.startsWith('**Key Features:**')) {
        isReadingFeatures = true;
        keyFeatures = [];
      } else if (line.startsWith('**Business Results:**')) {
        businessResults = line.substring(21).trim();
        isReadingFeatures = false;
      } else if (isReadingFeatures && line.startsWith('- ')) {
        // Remove any prefix like "A " from the beginning
        let feature = line.substring(2).trim();
        if (feature.startsWith('A ')) {
          feature = feature.substring(2);
        }
        keyFeatures.push(feature);
      } else if (!isReadingFeatures && overview && !line.startsWith('**') && line) {
        // Continue reading overview if it spans multiple lines
        overview += ' ' + line;
      }
    }
    
    if (title && engine && icon) {
      // Generate ID from title
      const id = title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      
      solutions.push({
        id,
        title,
        engine,
        icon,
        target,
        overview,
        keyFeatures,
        businessResults
      });
    }
  }
  
  return solutions;
};