
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [flagsLoaded, setFlagsLoaded] = useState(false);

  const languages = [
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
  ];

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

  const getFlagStyle = (): React.CSSProperties => ({
    fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Twemoji Mozilla", "Android Emoji", sans-serif',
    fontSize: '18px',
    lineHeight: '1',
    display: 'inline-block',
    textRendering: 'optimizeSpeed' as any,
    fontFeatureSettings: '"liga" off, "kern" off',
    fontVariant: 'none'
  });

  return (
    <div className="flex items-center space-x-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code as 'en' | 'pt')}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 hover:scale-110 border-2 ${
            language === lang.code 
              ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-lg scale-110' 
              : 'border-gray-200 hover:border-orange-300 bg-white text-gray-600 hover:bg-orange-50'
          }`}
          title={lang.label}
          aria-label={`Switch to ${lang.label}`}
        >
          <span style={getFlagStyle()}>
            {lang.flag}
          </span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
