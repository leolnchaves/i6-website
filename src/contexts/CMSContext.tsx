
import React, { createContext, useContext, ReactNode, useEffect } from 'react';
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
  const cmsData = useCMSContent();

  useEffect(() => {
    // Initialize CMS with default content on first load
    initializeCMS();
  }, []);

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
