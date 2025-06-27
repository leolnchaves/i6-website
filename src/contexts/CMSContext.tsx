
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
        console.log('Initializing CMS...');
        await initializeCMS();
        setInitialized(true);
        // Refetch content after initialization
        await cmsData.refetch();
        console.log('CMS initialization completed');
      }
    };
    
    initialize();
  }, [initialized, cmsData.refetch]);

  return (
    <CMSContext.Provider value={cmsData}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
