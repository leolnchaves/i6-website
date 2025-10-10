
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState, memo, useMemo, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const LanguageSelector = memo(() => {
  const { language, setLanguage } = useLanguage();
  const isMobile = useIsMobile();
  const [flagsLoaded, setFlagsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
      flag: <svg width="20" height="14" viewBox="0 0 720 504"><rect width="720" height="504" fill="#009b3a"/><rect width="720" height="168" y="168" fill="#fedf00"/><path d="M360,252 L120,378 L120,126 Z" fill="#002776"/><circle cx="360" cy="252" r="70.2" fill="#002776"/><ellipse cx="360" cy="252" rx="84" ry="88.2" fill="none" stroke="#fff" strokeWidth="5.4"/><path d="M230,220 Q250,280 360,260 Q470,280 490,220" fill="none" stroke="#fff" strokeWidth="5.4"/></svg>,
      text: 'PT',
      label: 'Português'
    }
  ] as const, []);

  // Memoized current language
  const currentLang = useMemo(() => 
    languages.find(lang => lang.code === language) || languages[0], 
    [language, languages]
  );


  // Memoized click outside handler
  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-selector')) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);


  // Memoized language selection handler
  const handleLanguageSelect = useCallback((langCode: 'en' | 'pt') => {
    setLanguage(langCode);
    setIsOpen(false);
  }, [setLanguage]);

  return (
    <div className="relative language-selector">
      {/* Botão principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white/60 backdrop-blur-md border border-white/20 rounded-md hover:border-white/30 hover:bg-white/70 transition-all duration-200 min-w-[70px]"
        aria-label={`Current language: ${currentLang.label}`}
      >
        <span className="flex items-center">
          {currentLang.flag}
        </span>
        <span className="text-sm font-medium text-gray-700">
          {currentLang.text}
        </span>
        <ChevronDown 
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className={`absolute ${isMobile ? 'bottom-full mb-1' : 'top-full mt-1'} left-0 w-full bg-white/90 backdrop-blur-md border border-white/20 rounded-md shadow-lg z-50 min-w-max`}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code as 'en' | 'pt')}
              className={`w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 transition-colors duration-150 ${
                language === lang.code ? 'bg-orange-50 text-orange-600' : 'text-gray-700'
              }`}
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
      )}
    </div>
  );
});

LanguageSelector.displayName = 'LanguageSelector';

export default LanguageSelector;
