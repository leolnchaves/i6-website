import { useState, useEffect } from 'react';

export interface PartnerItem {
  name: string;
  logo: string;
}

interface UsePartnersContentReturn {
  partners: PartnerItem[];
  loading: boolean;
  error: string | null;
}

export const usePartnersContent = (): UsePartnersContentReturn => {
  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartnersContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${import.meta.env.BASE_URL}content/partners-logos.md`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.status}`);
        }
        
        const content = await response.text();
        console.log('Partners markdown content loaded:', content.substring(0, 200) + '...');
        const parsedPartners = parsePartnersContent(content);
        console.log('Parsed partners count:', parsedPartners.length);
        console.log('Partners order from MD:', parsedPartners.map(p => p.name));
        console.log('Partners with logos:', parsedPartners.map(p => ({ name: p.name, logo: p.logo })));
        setPartners(parsedPartners);
      } catch (err) {
        console.error('Error fetching partners content:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchPartnersContent();
  }, []);

  return { partners, loading, error };
};

const parsePartnersContent = (content: string): PartnerItem[] => {
  const partners: PartnerItem[] = [];
  const sections = content.split('---').map(section => section.trim()).filter(Boolean);
  
  for (const section of sections) {
    const lines = section.split('\n').map(line => line.trim()).filter(Boolean);
    
    let name = '';
    let logo = '';
    
    for (const line of lines) {
      if (line.startsWith('## ')) {
        name = line.substring(3).trim();
      } else if (line.startsWith('**Logo:**')) {
        logo = line.substring(9).trim();
      }
    }
    
    if (name && logo) {
      partners.push({ name, logo });
    }
  }
  
  return partners;
};