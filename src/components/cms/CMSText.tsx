
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
  const { getContent } = useCMS();
  const content = getContent(contentKey) || fallback;

  return (
    <Component className={className}>
      {content}
    </Component>
  );
};

export default CMSText;
