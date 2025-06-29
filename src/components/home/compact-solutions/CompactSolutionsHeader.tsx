
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSPageContent } from '@/hooks/useCMSPageContent';

const CompactSolutionsHeader = () => {
  const { language } = useLanguage();
  const { getContent } = useCMSPageContent('home', language);

  console.log('CompactSolutionsHeader - Getting CMS content for home page, language:', language);

  // Tentar buscar do CMS primeiro, senão usar as traduções como fallback
  const title = getContent('compactSolutionsHero', 'title') || 'Soluções';
  const subtitle = getContent('compactSolutionsHero', 'subtitle') || 'Inteligentes';

  console.log('CompactSolutionsHeader - CMS content:', {
    title: getContent('compactSolutionsHero', 'title'),
    subtitle: getContent('compactSolutionsHero', 'subtitle')
  });

  return (
    <div className="text-center mb-16 scroll-reveal">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
        <span className="block mb-2">{title}</span>
        <span className="block bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent pb-2">
          {subtitle}
        </span>
      </h2>
    </div>
  );
};

export default CompactSolutionsHeader;
