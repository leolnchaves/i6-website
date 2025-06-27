
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
        {fallback || 'Carregando...'}
      </Component>
    );
  }
  
  const content = getContent(contentKey);
  
  // Se não há conteúdo do CMS, usar o fallback
  const displayContent = content || fallback || contentKey;

  return (
    <Component className={className}>
      {displayContent}
    </Component>
  );
};

export default CMSText;
