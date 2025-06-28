
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSPageContent } from '@/hooks/useCMSPageContent';

const CompactSolutionsHeader = () => {
  const { language, t } = useLanguage();
  const { getContent } = useCMSPageContent('home', language);

  // Usar conteúdo do CMS se disponível, senão usar as traduções como fallback
  const mainTitle = getContent('compact_solutions', 'mainTitle') || t('solutions.smartSolutions');
  const mainSubtitle = getContent('compact_solutions', 'mainSubtitle') || t('solutions.forYourBusiness');
  const description = getContent('compact_solutions', 'description');

  return (
    <div className="text-center mb-16 scroll-reveal">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
        <span className="block mb-2">{mainTitle}</span>
        <span className="block bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent pb-2">
          {mainSubtitle}
        </span>
      </h2>
      <div className="text-xl text-gray-600 max-w-4xl mx-auto mb-6">
        {description ? (
          // Usar descrição do CMS se disponível
          <div className="whitespace-pre-line">
            {description}
          </div>
        ) : (
          // Fallback para as traduções antigas se CMS não tiver conteúdo
          <>
            <p className="mb-4">
              {t('solutions.subtitle1')}
            </p>
            <p>
              {t('solutions.subtitle2')}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CompactSolutionsHeader;
