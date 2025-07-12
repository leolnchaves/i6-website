
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSPageContent } from '@/hooks/useCMSPageContent';

const CompactSolutionsHeader = () => {
  const { language } = useLanguage();
  const { getContent } = useCMSPageContent('home', language);

  console.log('CompactSolutionsHeader - Getting CMS content for home page, language:', language);

  // Tentar buscar do CMS primeiro, senão usar as traduções como fallback
  const title = getContent('compactSolutionsHero', 'title') || 'AI Solutions That';
  const subtitle = getContent('compactSolutionsHero', 'subtitle') || 'Drive Concrete Results';
  const description = getContent('compactSolutionsHero', 'description') || 'Go beyond the hype. Turn intelligence into competitive edge that drives real business growth.';

  console.log('CompactSolutionsHeader - CMS content:', {
    title: getContent('compactSolutionsHero', 'title'),
    subtitle: getContent('compactSolutionsHero', 'subtitle')
  });

  return (
    <div className="text-center mb-16 scroll-reveal">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        <span className="block mb-2">{title}</span>
        <span className="block bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent pb-2">
          {subtitle}
        </span>
      </h2>
      
      <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default CompactSolutionsHeader;
