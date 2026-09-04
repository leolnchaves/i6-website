import { memo, useMemo, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/types/language';

/** Compact PT / EN / ES switch used by legacy layouts (no flags). */
const LanguageSelector = memo(() => {
  const { language, setLanguage } = useLanguage();

  const languages = useMemo(
    () =>
      [
        { code: 'pt', text: 'PT', label: 'Português' },
        { code: 'en', text: 'EN', label: 'English' },
        { code: 'es', text: 'ES', label: 'Español' },
      ] as const,
    []
  );

  const handleLanguageSelect = useCallback(
    (langCode: Language) => {
      setLanguage(langCode);
    },
    [setLanguage]
  );

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageSelect(lang.code as Language)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            language === lang.code
              ? 'bg-[#F4845F]/15 text-[#F4845F] border border-[#F4845F]/40'
              : 'text-white/60 border border-white/15 hover:text-white'
          }`}
          aria-label={`Switch to ${lang.label}`}
          aria-pressed={language === lang.code}
        >
          {lang.text}
        </button>
      ))}
    </div>
  );
});

LanguageSelector.displayName = 'LanguageSelector';

export default LanguageSelector;
