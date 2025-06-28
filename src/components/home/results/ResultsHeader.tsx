
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSPageContent } from '@/hooks/useCMSPageContent';

const ResultsHeader = () => {
  const { t, language } = useLanguage();
  const { getContent } = useCMSPageContent('home', language);

  // Get content with fallback to translations
  const getContentWithFallback = (section: string, field: string, translationKey: string) => {
    const cmsContent = getContent(section, field);
    return cmsContent || t(translationKey);
  };

  return (
    <div className="text-center mb-16 scroll-reveal">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
        <span className="block mb-2">
          {getContentWithFallback('results', 'mainTitle', 'results.mainTitle')}
        </span>
        <span className="block bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent pb-2">
          {getContentWithFallback('results', 'mainSubtitle', 'results.mainSubtitle')}
        </span>
      </h2>
      <div className="text-xl text-gray-600 max-w-4xl mx-auto mb-6">
        <p className="mb-4">
          {getContentWithFallback('results', 'subtitle1', 'results.subtitle1')}
        </p>
        <p>
          {getContentWithFallback('results', 'subtitle2', 'results.subtitle2')}
        </p>
      </div>
    </div>
  );
};

export default ResultsHeader;
