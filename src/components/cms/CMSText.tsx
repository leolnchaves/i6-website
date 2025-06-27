
import React from 'react';
import { useCMS } from '@/contexts/CMSContext';

interface CMSTextProps {
  contentKey: string;
  fallback?: string;
  className?: string;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
}

const CMSText: React.FC<CMSTextProps> = ({ 
  contentKey, 
  fallback = '', 
  className = '', 
  as: Component = 'span' 
}) => {
  const { getContent, loading } = useCMS();
  
  if (loading) {
    return (
      <Component className={className}>
        {fallback || 'Loading...'}
      </Component>
    );
  }
  
  const content = getContent(contentKey);
  
  // If no content found, use fallback instead of the contentKey
  const displayContent = content && content !== contentKey ? content : fallback;

  return (
    <Component className={className}>
      {displayContent || contentKey}
    </Component>
  );
};

export default CMSText;
