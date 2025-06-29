
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSolutionsCards } from '@/hooks/useSolutionsCards';
import CompactSolutionsHeader from './compact-solutions/CompactSolutionsHeader';
import DynamicSolutionCard from './compact-solutions/DynamicSolutionCard';

const CompactSolutionsSection = () => {
  const { t, language } = useLanguage();
  const { cards, loading, error } = useSolutionsCards(language, 'solutions');

  console.log('CompactSolutionsSection - Cards loaded:', cards?.length || 0);
  console.log('CompactSolutionsSection - Loading:', loading);
  console.log('CompactSolutionsSection - Error:', error);

  const handleSolutionsClick = () => {
    // Navigate to solutions page and scroll to top
    window.location.href = '/solutions';
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <CompactSolutionsHeader />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Loading skeleton */}
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-8 animate-pulse">
                <div className="flex justify-end mb-4">
                  <div className="bg-gray-200 px-3 py-1 rounded-full w-20 h-6"></div>
                </div>
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-2xl"></div>
                </div>
                <div className="bg-gray-200 h-6 rounded mb-4 mx-auto w-3/4"></div>
                <div className="space-y-2">
                  <div className="bg-gray-200 h-4 rounded w-full"></div>
                  <div className="bg-gray-200 h-4 rounded w-5/6 mx-auto"></div>
                  <div className="bg-gray-200 h-4 rounded w-4/6 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <CompactSolutionsHeader />
          
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Erro ao carregar as soluções</p>
            <p className="text-sm text-gray-400">{error}</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {cards.map((card, index) => (
                <DynamicSolutionCard
                  key={card.id}
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  engine={card.engine}
                  index={index}
                />
              ))}
            </div>

            {/* Button to Solutions page */}
            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold hover:scale-105"
                onClick={handleSolutionsClick}
              >
                {t('solutions.viewAllSolutions')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Nenhuma solução disponível no momento</p>
            <p className="text-sm text-gray-400">Os cards de soluções serão exibidos quando estiverem configurados no CMS</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompactSolutionsSection;
