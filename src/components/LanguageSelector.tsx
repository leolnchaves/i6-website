
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [useTextFallback, setUseTextFallback] = useState(false);

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
    // Detecta se o navegador suporta emojis de bandeiras
    const detectEmojiSupport = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        setUseTextFallback(true);
        return;
      }
      
      canvas.width = canvas.height = 10;
      ctx.textBaseline = 'top';
      ctx.font = '8px Arial';
      
      // Testa renderização de emoji de bandeira
      ctx.fillText('🇺🇸', 0, 0);
      const imageData = ctx.getImageData(0, 0, 10, 10);
      
      // Se todos os pixels são transparentes, emoji não é suportado
      const hasColor = imageData.data.some((value, index) => index % 4 === 3 && value > 0);
      
      setUseTextFallback(!hasColor);
    };

    detectEmojiSupport();
  }, []);

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
          {useTextFallback ? (
            <span className="font-bold text-xs">
              {lang.text}
            </span>
          ) : (
            <span className="text-lg leading-none" style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, Android Emoji, sans-serif' }}>
              {lang.flag}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
