
import { enTranslations } from './en';
import { ptTranslations } from './pt';
import { esTranslations } from './es';
import type { Language } from '@/types/language';

export const translations = {
  en: enTranslations,
  pt: ptTranslations,
  es: esTranslations,
};

export const getTranslations = (language: Language) => {
  return translations[language];
};

type TranslationKey = keyof typeof enTranslations;

/** Resolve a key with fallback chain: requested language -> pt -> key */
export const translate = (language: Language, key: string): string => {
  const dict = translations[language] as Record<string, string> | undefined;
  const value = dict?.[key];
  if (value) return value;
  const fallback = (ptTranslations as Record<string, string>)[key];
  return fallback || key;
};

export type { TranslationKey };
