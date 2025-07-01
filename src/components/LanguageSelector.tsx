
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { Flag, Type } from 'lucide-react';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [showEmojis, setShowEmojis] = useState(false); // Default to text for better compatibility

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

  return (
    <div className="flex items-center space-x-2">
      {/* Toggle button for emoji/text display */}
      <button
        onClick={() => setShowEmojis(!showEmojis)}
        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-orange-500 hover:bg-orange-50 transition-all duration-300"
        title={showEmojis ? 'Switch to text' : 'Switch to flags'}
        aria-label={showEmojis ? 'Switch to text display' : 'Switch to flag display'}
      >
        {showEmojis ? <Type size={16} /> : <Flag size={16} />}
      </button>

      {/* Language buttons */}
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
          {showEmojis ? (
            <span 
              className="text-lg leading-none select-none" 
              style={{ 
                fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Android Emoji", sans-serif',
                fontSize: '16px'
              }}
            >
              {lang.flag}
            </span>
          ) : (
            <span className="font-bold text-xs">
              {lang.text}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
