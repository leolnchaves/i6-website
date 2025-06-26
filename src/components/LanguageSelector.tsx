
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', flag: '🇺🇸' },
    { code: 'pt', flag: '🇧🇷' }
  ];

  return (
    <div className="flex items-center space-x-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code as 'en' | 'pt')}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 border-2 ${
            language === lang.code 
              ? 'border-orange-500 shadow-lg scale-110' 
              : 'border-gray-200 hover:border-orange-300'
          }`}
        >
          {lang.flag}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
