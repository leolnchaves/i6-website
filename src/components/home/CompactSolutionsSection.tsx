
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSSolutionsCards } from '@/hooks/useCMSSolutionsCards';
import { useCMSPage } from '@/hooks/useCMSPage';
import { useCMSPageContent } from '@/hooks/useCMSPageContent';
import CompactSolutionsHeader from './compact-solutions/CompactSolutionsHeader';
import HorizontalSolutionCard from './compact-solutions/HorizontalSolutionCard';
import ViewAllSolutionsButton from './compact-solutions/ViewAllSolutionsButton';

const CompactSolutionsSection = () => {
  const { language } = useLanguage();
  const { pageId } = useCMSPage('home');
  const { cards, loading } = useCMSSolutionsCards(pageId || '', language);
  const { getContent } = useCMSPageContent('home', language);

  console.log('CompactSolutionsSection - Page ID:', pageId);
  console.log('CompactSolutionsSection - Cards loaded:', cards?.length || 0);
  console.log('CompactSolutionsSection - Loading:', loading);

  // Get button text from CMS with fallback
  const buttonText = getContent('compactSolutionsHero', 'buttonText', 'Ver Todas as Soluções');

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <CompactSolutionsHeader />
          
          <div className="grid grid-cols-1 gap-8 mt-16">
            {/* Loading skeleton for horizontal cards */}
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg animate-pulse overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/5">
                    <div className="w-full h-64 bg-gray-200"></div>
                  </div>
                  <div className="md:w-3/5 p-6 flex flex-col justify-center">
                    <div className="bg-gray-200 h-4 rounded w-1/3 mb-2"></div>
                    <div className="bg-gray-200 h-6 rounded w-3/4 mb-3"></div>
                    <div className="space-y-2 mb-4">
                      <div className="bg-gray-200 h-4 rounded w-full"></div>
                      <div className="bg-gray-200 h-4 rounded w-5/6"></div>
                      <div className="bg-gray-200 h-4 rounded w-4/6"></div>
                    </div>
                    <div className="bg-gray-200 h-4 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <CompactSolutionsHeader />

        {cards.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-8 mt-16">
              {cards.map((card, index) => (
                <HorizontalSolutionCard
                  key={card.id}
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  index={index}
                  category={card.focus || 'Solução AI'}
                  features={card.features}
                  outcome={card.outcome}
                />
              ))}
            </div>
            
            {/* View All Solutions Button */}
            <ViewAllSolutionsButton buttonText={buttonText} />
          </>
        ) : (
          <div className="text-center py-12 mt-16">
            <p className="text-gray-500 mb-4">Nenhuma solução disponível no momento</p>
            <p className="text-sm text-gray-400">Os cards de soluções serão exibidos quando estiverem configurados no CMS</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompactSolutionsSection;
