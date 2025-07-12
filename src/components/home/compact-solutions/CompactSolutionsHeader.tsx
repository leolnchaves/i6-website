
import { useLanguage } from '@/contexts/LanguageContext';

const CompactSolutionsHeader = () => {
  const { t } = useLanguage();

  return (
    <div className="text-center mb-16 scroll-reveal">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        <span className="block mb-2">{t('compactSolutions.title')}</span>
        <span className="block bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent pb-2">
          {t('compactSolutions.subtitle')}
        </span>
      </h2>
      
      <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
        {t('compactSolutions.description')}
      </p>
    </div>
  );
};

export default CompactSolutionsHeader;
