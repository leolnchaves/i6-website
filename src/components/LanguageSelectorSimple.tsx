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
      flag: <svg width="20" height="15" viewBox="0 0 7410 3900"><rect width="7410" height="3900" fill="#b22234"/><path d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0" stroke="#fff" strokeWidth="300"/><rect width="2964" height="2100" fill="#3c3b6e"/><g fill="#fff">{[...Array(9)].map((_, i) => [...Array(11)].map((_, j) => <circle key={`${i}-${j}`} cx={247 + j * 247} cy={247 + i * 247} r="83"/>))}</g></svg>,
      text: 'EN',
      label: 'English'
    },
    { 
      code: 'pt', 
      flag: <svg width="20" height="14" viewBox="0 0 720 504"><rect width="720" height="504" fill="#009b3a"/><path d="M360,42 L660,252 L360,462 L60,252 Z" fill="#fedf00"/><circle cx="360" cy="252" r="90" fill="#002776"/><path d="M280,252 Q315,222 360,232 Q405,222 440,252" fill="none" stroke="#fff" strokeWidth="8"/><circle cx="310" cy="200" r="3" fill="#fff"/><circle cx="340" cy="210" r="3" fill="#fff"/><circle cx="380" cy="210" r="3" fill="#fff"/><circle cx="410" cy="200" r="3" fill="#fff"/><circle cx="330" cy="260" r="3" fill="#fff"/><circle cx="390" cy="260" r="3" fill="#fff"/><circle cx="360" cy="290" r="3" fill="#fff"/></svg>,
      text: 'PT',
      label: 'Português'
    }
  ] as const, []);

  // Memoized current language
  const currentLang = useMemo(() => 
    languages.find(lang => lang.code === language) || languages[0], 
    [language, languages]
  );


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
          <span className="flex items-center">
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