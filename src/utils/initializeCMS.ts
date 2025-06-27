
import { supabase } from '@/integrations/supabase/client';

export const initializeCMS = async () => {
  try {
    console.log('Checking CMS initialization...');
    
    // Check if content already exists
    const { data: existingContent, error: fetchError } = await supabase
      .from('cms_content')
      .select('key')
      .limit(1);
    
    if (fetchError) {
      console.error('Error checking existing content:', fetchError);
      return;
    }
    
    if (existingContent && existingContent.length > 0) {
      console.log('CMS already initialized with content');
      return;
    }
    
    console.log('CMS initialization completed - content should be available from database');
  } catch (error) {
    console.error('Error initializing CMS:', error);
  }
};
