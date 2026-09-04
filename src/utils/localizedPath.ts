import { useLocation } from 'react-router-dom';
import type { Language } from '@/types/language';

export const SUPPORTED_LANGS: Language[] = ['en', 'pt', 'es'];
const PORTUGUESE_LOCALES = ['pt', 'pt-br', 'pt-pt', 'pt-ao', 'pt-mz'];
const SPANISH_LOCALES = ['es'];

export const isLang = (value: string | undefined): value is Language =>
  value === 'en' || value === 'pt' || value === 'es';

/** Extract the language segment from a pathname like "/en/solutions" */
export const getLangFromPath = (pathname: string): Language => {
  const seg = pathname.split('/')[1];
  return isLang(seg) ? seg : 'en';
};

/** Strip the leading /en, /pt or /es prefix from a pathname */
export const stripLangPrefix = (pathname: string): string => {
  const stripped = pathname.replace(/^\/(en|pt|es)(?=\/|$)/, '');
  return stripped || '/';
};

/** Build a localized path: ('/solutions', 'pt') -> '/pt/solutions' */
export const localizePath = (path: string, lang: Language): string => {
  if (!path.startsWith('/')) return path;
  // Already localized? Replace the prefix.
  const stripped = stripLangPrefix(path);
  if (stripped === '/') return `/${lang}`;
  return `/${lang}${stripped}`;
};

/** Detect preferred language from localStorage > browser > 'en' */
export const detectPreferredLang = (): Language => {
  try {
    const saved = localStorage.getItem('language');
    if (isLang(saved as string)) return saved as Language;
    const browserLangs = [navigator.language, ...(navigator.languages || [])];
    for (const l of browserLangs) {
      const low = l.toLowerCase();
      if (PORTUGUESE_LOCALES.some((p) => low.startsWith(p))) return 'pt';
      if (SPANISH_LOCALES.some((p) => low.startsWith(p))) return 'es';
    }
  } catch {
    /* noop */
  }
  return 'en';
};

/** Hook returning a function that prefixes a path with the current URL language */
export const useLocalizedPath = () => {
  const location = useLocation();
  const lang = getLangFromPath(location.pathname);
  return (path: string) => localizePath(path, lang);
};

/**
 * Pick a per-language copy block with fallback chain es -> pt.
 * Usage: pickLang(language, copyByLang)
 */
export const pickLang = <T,>(
  lang: Language,
  copy: { pt: T; en: T; es?: T }
): T => {
  if (lang === 'en') return copy.en;
  if (lang === 'es') return copy.es ?? copy.pt;
  return copy.pt;
};

/** Languages that have full editorial/static content. Spanish falls back to Portuguese. */
export type ContentLang = 'pt' | 'en';

/** Map any UI language to the closest content language (es -> pt). */
export const toContentLang = (lang: Language): ContentLang => (lang === 'en' ? 'en' : 'pt');
