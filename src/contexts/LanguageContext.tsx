import React, { createContext, useContext, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Language, LanguageContextType } from '@/types/language';
import { translations } from '@/data/translations';
import { getLangFromPath, stripLangPrefix } from '@/utils/localizedPath';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Language is sourced from the URL — single source of truth.
  const language: Language = getLangFromPath(location.pathname);

  // Keep <html lang> + localStorage in sync
  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
    try {
      localStorage.setItem('language', language);
    } catch {
      /* noop */
    }
  }, [language]);

  const setLanguage = useCallback(
    (lang: Language) => {
      if (lang === language) return;
      const rest = stripLangPrefix(location.pathname);
      const target = `/${lang}${rest === '/' ? '' : rest}${location.search}${location.hash}`;
      navigate(target);
    },
    [language, location.pathname, location.search, location.hash, navigate]
  );

  const t = useMemo(() => {
    return (key: string): string => {
      return translations[language][key as keyof typeof translations['en']] || key;
    };
  }, [language]);

  const contextValue = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
