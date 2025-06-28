
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSPageContent } from '@/hooks/useCMSPageContent';

const CompactSolutionsHeader = () => {
  const { t, language } = useLanguage();
  const { content, loading } = useCMSPageContent('home', language);

  if (loading) {
    return (
      <div className="text-center mb-16 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="text-center mb-16">
      <p className="text-orange-600 font-semibold text-lg mb-4 uppercase tracking-wide">
        {content?.['compactSolutions.subtitle'] || t('solutions.subtitle')}
      </p>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {content?.['compactSolutions.title'] || t('solutions.title')}
        <span className="block text-orange-600 mt-2">
          {content?.['compactSolutions.titleHighlight'] || t('solutions.titleHighlight')}
        </span>
      </h2>
    </div>
  );
};

export default CompactSolutionsHeader;
