import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export interface ResultItem {
  title: string;
  icon: string;
  description: string;
  outcomes: string[];
}

interface UseMarkdownContentReturn {
  results: ResultItem[];
  loading: boolean;
  error: string | null;
}

export const useMarkdownContent = (): UseMarkdownContentReturn => {
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchMarkdownContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const filename = language === 'pt' ? 'results-pt.md' : 'results-en.md';
        const response = await fetch(`/content/${filename}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.status}`);
        }
        
        const content = await response.text();
        console.log('Markdown content loaded:', content.substring(0, 200) + '...');
        const parsedResults = parseMarkdownContent(content);
        console.log('Parsed results count:', parsedResults.length);
        setResults(parsedResults);
      } catch (err) {
        console.error('Error fetching markdown content:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdownContent();
  }, [language]);

  return { results, loading, error };
};

const parseMarkdownContent = (content: string): ResultItem[] => {
  const results: ResultItem[] = [];
  const sections = content.split('---').map(section => section.trim()).filter(Boolean);
  
  // Skip the first section (title)
  const dataSections = sections.slice(1);
  
  for (const section of dataSections) {
    const lines = section.split('\n').map(line => line.trim()).filter(Boolean);
    
    let title = '';
    let icon = '';
    let description = '';
    const outcomes: string[] = [];
    
    let currentSection = '';
    
    for (const line of lines) {
      if (line.startsWith('## ')) {
        title = line.substring(3).trim();
      } else if (line.startsWith('**Icon:**')) {
        icon = line.substring(9).trim();
      } else if (line.startsWith('**Description:**')) {
        description = line.substring(16).trim();
      } else if (line.startsWith('**Outcomes:**')) {
        currentSection = 'outcomes';
      } else if (line.startsWith('- ') && currentSection === 'outcomes') {
        outcomes.push(line.substring(2).trim());
      }
    }
    
    if (title && icon && description) {
      results.push({ title, icon, description, outcomes });
    }
  }
  
  return results;
};