
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
  
  console.log(`CMSText renderizando para chave: ${contentKey}`);
  
  if (loading) {
    console.log(`CMSText ainda carregando para: ${contentKey}`);
    return (
      <Component className={className}>
        {fallback || 'Carregando...'}
      </Component>
    );
  }
  
  const content = getContent(contentKey);
  console.log(`CMSText conteúdo obtido para ${contentKey}:`, content);
  
  // Sempre mostrar o fallback se o conteúdo estiver vazio
  const displayContent = content && content.trim() !== '' ? content : (fallback || contentKey);
  
  console.log(`CMSText exibindo para ${contentKey}:`, displayContent);

  return (
    <Component className={className}>
      {displayContent}
    </Component>
  );
};

export default CMSText;
