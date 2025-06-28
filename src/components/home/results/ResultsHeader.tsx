
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSPageContent } from '@/hooks/useCMSPageContent';

const ResultsHeader = () => {
  const { language, t } = useLanguage();
  const { getContent } = useCMSPageContent('home', language);

  // Usar conteúdo do CMS se disponível, senão usar as traduções como fallback
  const mainTitle = getContent('results', 'mainTitle') || t('results.mainTitle');
  const mainSubtitle = getContent('results', 'mainSubtitle') || t('results.mainSubtitle');

  return (
    <div className="text-center mb-16 scroll-reveal">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
        <span className="block mb-2">{mainTitle}</span>
        <span className="block bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent pb-2">
          {mainSubtitle}
        </span>
      </h2>
      <div className="text-xl text-gray-600 max-w-4xl mx-auto mb-6">
        <p className="mb-4">
          {t('results.subtitle1')}
        </p>
        <p>
          {t('results.subtitle2')}
        </p>
      </div>
    </div>
  );
};

export default ResultsHeader;
