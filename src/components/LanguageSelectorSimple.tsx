import { memo, useMemo, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';

// Lazy-loaded LanguageSelector for better initial bundle size
const LanguageSelector = memo(() => {
  const { language, setLanguage } = useLanguage();

  // Memoized languages array - prevents recreation on every render
  const languages = useMemo(() => [
    { 
      code: 'en', 
      flag: '🇺🇸',
      text: 'EN',
      label: 'English'
    },
    { 
      code: 'pt', 
      flag: '🇧🇷',
      text: 'PT',
      label: 'Português'
    }
  ] as const, []);

  // Memoized current language
  const currentLang = useMemo(() => 
    languages.find(lang => lang.code === language) || languages[0], 
    [language, languages]
  );

  // Memoized flag style - prevents recreation
  const getFlagStyle = useMemo((): React.CSSProperties => ({
    fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Twemoji Mozilla", "Android Emoji", sans-serif',
    fontSize: '16px',
    lineHeight: '1',
    display: 'inline-block',
    textRendering: 'optimizeSpeed' as any,
    fontFeatureSettings: '"liga" off, "kern" off',
    fontVariant: 'none'
  }), []);

  // Optimized language selection handler
  const handleLanguageSelect = useCallback((langCode: 'en' | 'pt') => {
    setLanguage(langCode);
  }, [setLanguage]);

  return (
    <div className="flex items-center space-x-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageSelect(lang.code as 'en' | 'pt')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200 hover:bg-white/10 ${
            language === lang.code ? 'bg-orange-500/20 text-orange-400 border border-orange-400/30' : 'text-gray-400 hover:text-white'
          }`}
          aria-label={`Switch to ${lang.label}`}
        >
          <span style={getFlagStyle}>
            {lang.flag}
          </span>
          <span className="text-sm font-medium">
            {lang.text}
          </span>
        </button>
      ))}
    </div>
  );
});

LanguageSelector.displayName = 'LanguageSelector';

export default LanguageSelector;