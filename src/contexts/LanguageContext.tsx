
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { Language, LanguageContextType } from '@/types/language';
import { translations } from '@/data/translations';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Países e regiões que falam português - memoized constant
const PORTUGUESE_LOCALES = [
  'pt', 'pt-BR', 'pt-PT', 'pt-AO', 'pt-MZ', 'pt-CV', 'pt-GW', 'pt-ST', 'pt-TL'
] as const;

/**
 * Detecta o idioma preferido do usuário baseado nas configurações do navegador
 * @returns Language - 'pt' para países lusófonos, 'en' para os demais
 */
const detectBrowserLanguage = (): Language => {
  try {
    // Obtém os idiomas preferidos do navegador
    const browserLanguages = [
      navigator.language,
      ...(navigator.languages || [])
    ];

    console.log('Browser languages detected:', browserLanguages);

    // Verifica se algum dos idiomas preferidos é português
    for (const lang of browserLanguages) {
      const normalizedLang = lang.toLowerCase();
      
      // Verifica se o idioma ou região fala português
      if (PORTUGUESE_LOCALES.some(locale => 
        normalizedLang.startsWith(locale.toLowerCase())
      )) {
        console.log('Portuguese language detected:', lang);
        return 'pt';
      }
    }

    console.log('No Portuguese language detected, defaulting to English');
    return 'en';
  } catch (error) {
    console.warn('Error detecting browser language:', error);
    return 'en'; // Fallback para inglês em caso de erro
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Verifica se já existe um idioma salvo pelo usuário
    const savedLanguage = localStorage.getItem('language') as Language;
    
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pt')) {
      console.log('Using saved language preference:', savedLanguage);
      setLanguage(savedLanguage);
    } else {
      // Se não há preferência salva, detecta automaticamente
      const detectedLanguage = detectBrowserLanguage();
      console.log('Auto-detected language:', detectedLanguage);
      setLanguage(detectedLanguage);
      
      // Salva a detecção automática para futuras visitas
      localStorage.setItem('language', detectedLanguage);
    }
  }, []);

  const handleSetLanguage = useCallback((lang: Language) => {
    console.log('Language manually changed to:', lang);
    setLanguage(lang);
    localStorage.setItem('language', lang);
  }, []);

  // Memoized translation function - CRITICAL OPTIMIZATION
  const t = useMemo(() => {
    return (key: string): string => {
      return translations[language][key as keyof typeof translations['en']] || key;
    };
  }, [language]);

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    language,
    setLanguage: handleSetLanguage,
    t
  }), [language, handleSetLanguage, t]);

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
