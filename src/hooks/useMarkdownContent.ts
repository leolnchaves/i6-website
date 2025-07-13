import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, Target, DollarSign, Award } from 'lucide-react';
import React from 'react';

export interface MarkdownSection {
  icon: React.ReactNode;
  title: string;
  description: string;
  outcomes: string[];
}

export interface MarkdownContent {
  title: string;
  subtitle: string;
  description: string[];
  sections: MarkdownSection[];
}

const iconMap: Record<string, React.ReactNode> = {
  'trending-up': React.createElement(TrendingUp, { className: "text-primary text-3xl" }),
  'target': React.createElement(Target, { className: "text-primary text-3xl" }),
  'dollar-sign': React.createElement(DollarSign, { className: "text-primary text-3xl" }),
  'award': React.createElement(Award, { className: "text-primary text-3xl" })
};

export const useMarkdownContent = (contentType: 'results') => {
  const { language } = useLanguage();
  const [content, setContent] = useState<MarkdownContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const filename = `${contentType}-${language}.md`;
        const response = await fetch(`/content/${filename}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch ${filename}`);
        }
        
        const markdown = await response.text();
        const parsedContent = parseMarkdown(markdown);
        setContent(parsedContent);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load content');
        console.error('Error loading markdown content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [language, contentType]);

  return { content, loading, error };
};

const parseMarkdown = (markdown: string): MarkdownContent => {
  const lines = markdown.split('\n');
  const sections: MarkdownSection[] = [];
  
  let title = '';
  let subtitle = '';
  const description: string[] = [];
  let currentSection: Partial<MarkdownSection> | null = null;
  let parsingDescription = false;
  let parsingOutcomes = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Parse main title
    if (line.startsWith('# ') && !title) {
      title = line.substring(2);
      continue;
    }
    
    // Parse subtitle (italic text)
    if (line.startsWith('*') && line.endsWith('*') && !subtitle) {
      subtitle = line.slice(1, -1);
      continue;
    }
    
    // Parse description paragraphs (before first section)
    if (!line.startsWith('##') && !line.startsWith('---') && line && !parsingOutcomes && sections.length === 0) {
      if (!title || !subtitle) continue; // Skip until we have title and subtitle
      description.push(line);
      continue;
    }
    
    // Parse section headers
    if (line.startsWith('## ')) {
      // Save previous section if exists
      if (currentSection && currentSection.title && currentSection.description) {
        sections.push({
          icon: currentSection.icon!,
          title: currentSection.title,
          description: currentSection.description,
          outcomes: currentSection.outcomes || []
        });
      }
      
      // Start new section
      const headerParts = line.substring(3).split(' ');
      const iconName = headerParts[0];
      const sectionTitle = headerParts.slice(1).join(' ');
      
      currentSection = {
        icon: iconMap[iconName] || iconMap['trending-up'],
        title: sectionTitle,
        outcomes: []
      };
      parsingDescription = true;
      parsingOutcomes = false;
      continue;
    }
    
    // Parse section description
    if (currentSection && parsingDescription && line && !line.startsWith('**') && !line.startsWith('---')) {
      currentSection.description = line;
      parsingDescription = false;
      continue;
    }
    
    // Start parsing outcomes
    if (line.startsWith('**') && line.includes('Outcomes:')) {
      parsingOutcomes = true;
      continue;
    }
    
    // Parse outcome items
    if (parsingOutcomes && line.startsWith('- ') && currentSection) {
      const outcome = line.substring(2);
      currentSection.outcomes = currentSection.outcomes || [];
      currentSection.outcomes.push(outcome);
      continue;
    }
    
    // End of section
    if (line.startsWith('---')) {
      parsingOutcomes = false;
      continue;
    }
  }
  
  // Add the last section
  if (currentSection && currentSection.title && currentSection.description) {
    sections.push({
      icon: currentSection.icon!,
      title: currentSection.title,
      description: currentSection.description,
      outcomes: currentSection.outcomes || []
    });
  }
  
  return {
    title,
    subtitle,
    description,
    sections
  };
};