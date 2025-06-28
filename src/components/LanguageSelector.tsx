
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', flag: '🇺🇸', name: 'English' },
    { code: 'pt', flag: '🇧🇷', name: 'Português' }
  ];

  return (
    <div className="flex items-center space-x-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code as 'en' | 'pt')}
          className={`relative w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 border-2 ${
            language === lang.code 
              ? 'border-orange-500 shadow-lg scale-110' 
              : 'border-gray-200 hover:border-orange-300'
          }`}
        >
          {lang.flag}
          {language === lang.code && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-white"></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
