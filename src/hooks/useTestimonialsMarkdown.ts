import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export interface TestimonialItem {
  id: string;
  quote: string;
  author_name: string;
  author_title?: string;
  company_name?: string;
  linkedin_url?: string;
  rating: number;
}

export interface UseTestimonialsMarkdownReturn {
  testimonials: TestimonialItem[];
  loading: boolean;
  error: string | null;
}

export const useTestimonialsMarkdown = (): UseTestimonialsMarkdownReturn => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const fileName = `testimonials-${language}.md`;
        const response = await fetch(`/content/${fileName}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch testimonials: ${response.statusText}`);
        }
        
        const content = await response.text();
        const parsedTestimonials = parseMarkdownContent(content);
        setTestimonials(parsedTestimonials);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load testimonials');
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [language]);

  return { testimonials, loading, error };
};

const parseMarkdownContent = (content: string): TestimonialItem[] => {
  const sections = content.split('---').filter(section => section.trim().length > 0);
  
  return sections.map((section, index) => {
    const lines = section.trim().split('\n');
    const testimonial: Partial<TestimonialItem> = {
      id: `testimonial-${index + 1}`,
      rating: 5 // default rating
    };

    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('**Quote:**')) {
        testimonial.quote = trimmedLine.replace('**Quote:**', '').trim();
      } else if (trimmedLine.startsWith('**Author:**')) {
        testimonial.author_name = trimmedLine.replace('**Author:**', '').trim();
      } else if (trimmedLine.startsWith('**Title:**')) {
        testimonial.author_title = trimmedLine.replace('**Title:**', '').trim();
      } else if (trimmedLine.startsWith('**Company:**')) {
        testimonial.company_name = trimmedLine.replace('**Company:**', '').trim();
      } else if (trimmedLine.startsWith('**LinkedIn:**')) {
        testimonial.linkedin_url = trimmedLine.replace('**LinkedIn:**', '').trim();
      } else if (trimmedLine.startsWith('**Rating:**')) {
        const rating = parseInt(trimmedLine.replace('**Rating:**', '').trim());
        if (!isNaN(rating)) {
          testimonial.rating = rating;
        }
      }
    });

    return testimonial as TestimonialItem;
  }).filter(testimonial => testimonial.quote && testimonial.author_name);
};