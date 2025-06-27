
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/components/ui/use-toast';

interface CMSContent {
  id: string;
  key: string;
  content_en: string;
  content_pt: string;
  content_type: string;
  category: string | null;
  created_at: string;
  updated_at: string;
}

export const useCMSContent = () => {
  const [content, setContent] = useState<CMSContent[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  const fetchContent = async () => {
    try {
      console.log('Fetching CMS content...');
      setLoading(true);
      
      const { data, error } = await supabase
        .from('cms_content')
        .select('*')
        .order('category', { ascending: true })
        .order('key', { ascending: true });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('CMS content fetched:', data?.length || 0, 'items');
      console.log('First few items:', data?.slice(0, 3));
      setContent(data || []);
    } catch (error) {
      console.error('Error fetching CMS content:', error);
      setContent([]);
    } finally {
      setLoading(false);
    }
  };

  const getContent = (key: string): string => {
    console.log(`Looking for content with key: "${key}"`);
    console.log('Available content keys:', content.map(c => c.key));
    
    const item = content.find(c => c.key === key);
    if (!item) {
      console.log(`Content not found for key: ${key}`);
      return ''; // Return empty string instead of the key
    }
    
    const result = language === 'pt' ? item.content_pt : item.content_en;
    console.log(`Content for key "${key}":`, result);
    return result;
  };

  const updateContent = async (key: string, contentEn: string, contentPt: string) => {
    try {
      const { error } = await supabase
        .from('cms_content')
        .update({
          content_en: contentEn,
          content_pt: contentPt,
          updated_at: new Date().toISOString()
        })
        .eq('key', key);

      if (error) throw error;
      
      await fetchContent();
      toast({
        title: "Success",
        description: "Content updated successfully",
      });
    } catch (error) {
      console.error('Error updating content:', error);
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive",
      });
    }
  };

  const createContent = async (key: string, contentEn: string, contentPt: string, contentType: string = 'text', category?: string) => {
    try {
      const { error } = await supabase
        .from('cms_content')
        .insert({
          key,
          content_en: contentEn,
          content_pt: contentPt,
          content_type: contentType,
          category
        });

      if (error) throw error;
      
      await fetchContent();
      toast({
        title: "Success",
        description: "Content created successfully",
      });
    } catch (error) {
      console.error('Error creating content:', error);
      toast({
        title: "Error",
        description: "Failed to create content",
        variant: "destructive",
      });
    }
  };

  const deleteContent = async (key: string) => {
    try {
      const { error } = await supabase
        .from('cms_content')
        .delete()
        .eq('key', key);

      if (error) throw error;
      
      await fetchContent();
      toast({
        title: "Success",
        description: "Content deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting content:', error);
      toast({
        title: "Error",
        description: "Failed to delete content",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return {
    content,
    loading,
    getContent,
    updateContent,
    createContent,
    deleteContent,
    refetch: fetchContent
  };
};
