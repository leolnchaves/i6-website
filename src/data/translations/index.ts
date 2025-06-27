
import { enTranslations } from './en';
import { ptTranslations } from './pt';
import type { Language } from '@/types/language';

export const translations = {
  en: enTranslations,
  pt: ptTranslations
};

export const getTranslations = (language: Language) => {
  return translations[language];
};
