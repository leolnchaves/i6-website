
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useCMSPage = (slug: string) => {
  const [pageId, setPageId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageId = async () => {
      if (!slug) return;

      try {
        console.log('Fetching page ID for slug:', slug);
        
        const { data, error } = await supabase
          .from('cms_pages')
          .select('id')
          .eq('slug', slug)
          .eq('is_active', true)
          .single();

        if (error) {
          console.error('Error fetching page:', error);
          return;
        }

        console.log('Found page ID:', data?.id);
        setPageId(data?.id || null);
      } catch (error) {
        console.error('Failed to fetch page:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPageId();
  }, [slug]);

  return { pageId, loading };
};
