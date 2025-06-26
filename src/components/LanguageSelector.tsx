
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', flag: '🇺🇸' },
    { code: 'pt', flag: '🇧🇷' }
  ];

  return (
    <div className="flex items-center space-x-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code as 'en' | 'pt')}
          className={`w-6 h-6 rounded-full flex items-center justify-center text-sm transition-all duration-300 hover:scale-110 border ${
            language === lang.code 
              ? 'border-orange-500 shadow-md scale-110 bg-orange-50' 
              : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
          }`}
        >
          {lang.flag}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
