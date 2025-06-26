
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'pt', label: 'Português', flag: '🇧🇷' }
  ];

  return (
    <Select value={language} onValueChange={(value: 'en' | 'pt') => setLanguage(value)}>
      <SelectTrigger className="w-[140px] border-gray-200 bg-white/90 backdrop-blur-sm">
        <SelectValue>
          <div className="flex items-center space-x-2">
            <span>{languages.find(lang => lang.code === language)?.flag}</span>
            <span className="text-sm font-medium">
              {languages.find(lang => lang.code === language)?.label}
            </span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <div className="flex items-center space-x-2">
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
