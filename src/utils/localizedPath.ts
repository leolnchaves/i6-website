import { useLocation } from 'react-router-dom';
import type { Language } from '@/types/language';

export const SUPPORTED_LANGS: Language[] = ['en', 'pt'];
const PORTUGUESE_LOCALES = ['pt', 'pt-br', 'pt-pt', 'pt-ao', 'pt-mz'];

export const isLang = (value: string | undefined): value is Language =>
  value === 'en' || value === 'pt';

/** Extract the language segment from a pathname like "/en/solutions" */
export const getLangFromPath = (pathname: string): Language => {
  const seg = pathname.split('/')[1];
  return isLang(seg) ? seg : 'en';
};

/** Strip the leading /en or /pt prefix from a pathname */
export const stripLangPrefix = (pathname: string): string => {
  const stripped = pathname.replace(/^\/(en|pt)(?=\/|$)/, '');
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
      if (PORTUGUESE_LOCALES.some((p) => l.toLowerCase().startsWith(p))) {
        return 'pt';
      }
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
