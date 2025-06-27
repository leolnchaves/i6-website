
import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useCMSContent } from '@/hooks/useCMSContent';
import { initializeCMS } from '@/utils/initializeCMS';

interface CMSContextType {
  getContent: (key: string) => string;
  updateContent: (key: string, contentEn: string, contentPt: string) => Promise<void>;
  createContent: (key: string, contentEn: string, contentPt: string, contentType?: string, category?: string) => Promise<void>;
  deleteContent: (key: string) => Promise<void>;
  content: any[];
  loading: boolean;
  refetch: () => Promise<void>;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const cmsData = useCMSContent();

  useEffect(() => {
    const initialize = async () => {
      if (!initialized) {
        console.log('🚀 Inicializando CMS...');
        try {
          await initializeCMS();
          console.log('✅ CMS inicializado com sucesso');
        } catch (error) {
          console.error('❌ Erro ao inicializar CMS:', error);
        }
        setInitialized(true);
      }
    };
    
    initialize();
  }, [initialized]);

  console.log('📊 CMSProvider estado:', { 
    initialized, 
    loading: cmsData.loading, 
    contentCount: cmsData.content.length 
  });

  return (
    <CMSContext.Provider value={cmsData}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS deve ser usado dentro de um CMSProvider');
  }
  return context;
};
