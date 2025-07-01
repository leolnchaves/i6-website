
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CMSPage {
  id: string;
  name: string;
  slug: string;
  description?: string;
  is_active: boolean;
}

export const useCMSPages = () => {
  const [pages, setPages] = useState<CMSPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        console.log('Fetching CMS pages');
        
        const { data, error } = await supabase
          .from('cms_pages')
          .select('id, name, slug, description, is_active')
          .eq('is_active', true)
          .order('name');

        if (error) {
          console.error('Error fetching pages:', error);
          return;
        }

        console.log('Found pages:', data);
        setPages(data || []);
      } catch (error) {
        console.error('Failed to fetch pages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  return { pages, loading };
};
