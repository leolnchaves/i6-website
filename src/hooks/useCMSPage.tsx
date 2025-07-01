
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useCMSPage = (slug: string) => {
  const [pageId, setPageId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageId = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        console.log('useCMSPage - Fetching page ID for slug:', slug);
        
        const { data, error } = await supabase
          .from('cms_pages')
          .select('id')
          .eq('slug', slug)
          .eq('is_active', true)
          .maybeSingle();

        if (error) {
          console.error('useCMSPage - Error fetching page:', error);
          setPageId(null);
          return;
        }

        if (!data) {
          console.log('useCMSPage - Page not found for slug:', slug);
          setPageId(null);
          return;
        }

        console.log('useCMSPage - Found page ID:', data.id);
        setPageId(data.id);
      } catch (error) {
        console.error('useCMSPage - Failed to fetch page:', error);
        setPageId(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPageId();
  }, [slug]);

  return { pageId, loading };
};
