
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState, memo, useMemo, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

const LanguageSelector = memo(() => {
  const { language, setLanguage } = useLanguage();
  const [flagsLoaded, setFlagsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  useEffect(() => {
    // Força o carregamento das fontes de emoji
    const loadEmojiFont = () => {
      const testElement = document.createElement('span');
      testElement.style.fontFamily = '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Twemoji Mozilla", "Android Emoji", sans-serif';
      testElement.style.fontSize = '16px';
      testElement.innerHTML = '🇺🇸';
      testElement.style.position = 'absolute';
      testElement.style.left = '-9999px';
      testElement.style.top = '-9999px';
      
      document.body.appendChild(testElement);
      
      // Aguarda um pouco para garantir que a fonte seja carregada
      setTimeout(() => {
        setFlagsLoaded(true);
        document.body.removeChild(testElement);
      }, 100);
    };

    loadEmojiFont();
  }, []);

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
        <span style={getFlagStyle}>
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
        <div className="absolute top-full left-0 mt-1 w-full bg-white/90 backdrop-blur-md border border-white/20 rounded-md shadow-lg z-50 min-w-max">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code as 'en' | 'pt')}
              className={`w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 transition-colors duration-150 ${
                language === lang.code ? 'bg-orange-50 text-orange-600' : 'text-gray-700'
              }`}
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
      )}
    </div>
  );
});

LanguageSelector.displayName = 'LanguageSelector';

export default LanguageSelector;
