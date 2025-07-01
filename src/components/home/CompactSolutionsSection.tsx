
import { useLanguage } from '@/contexts/LanguageContext';
import { useMarkdownSolutionsCards } from '@/hooks/useMarkdownSolutionsCards';
import { useMarkdownPageContent } from '@/hooks/useMarkdownPageContent';
import CompactSolutionsHeader from './compact-solutions/CompactSolutionsHeader';
import ModernSolutionCard from './compact-solutions/ModernSolutionCard';
import ViewAllSolutionsButton from './compact-solutions/ViewAllSolutionsButton';

const CompactSolutionsSection = () => {
  const { language } = useLanguage();
  
  // Usar os novos hooks unificados do Markdown com fallback para Supabase
  const { cards, loading, error, isUsingFallback } = useMarkdownSolutionsCards('solutions', language);
  const { getContent } = useMarkdownPageContent('home', language);

  console.log('CompactSolutionsSection - Cards loaded:', cards?.length || 0);
  console.log('CompactSolutionsSection - Loading:', loading);
  console.log('CompactSolutionsSection - Error:', error);
  console.log('CompactSolutionsSection - Using fallback:', isUsingFallback);

  // Get button text from CMS with fallback
  const buttonText = getContent('compactSolutionsHero', 'buttonText', 'Ver Todas as Soluções');

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <CompactSolutionsHeader />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {/* Loading skeleton */}
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 animate-pulse">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-2xl mb-6"></div>
                  <div className="bg-gray-200 h-6 rounded-lg mb-4 w-3/4"></div>
                  <div className="space-y-2 w-full">
                    <div className="bg-gray-200 h-4 rounded w-full"></div>
                    <div className="bg-gray-200 h-4 rounded w-5/6 mx-auto"></div>
                    <div className="bg-gray-200 h-4 rounded w-4/6 mx-auto"></div>
                  </div>
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
          
          <div className="text-center py-12 mt-16">
            <p className="text-gray-500 mb-4">Erro ao carregar as soluções</p>
            <p className="text-sm text-gray-400">{error}</p>
            {isUsingFallback && (
              <p className="text-xs text-blue-500 mt-2">Tentando carregar dados do Supabase...</p>
            )}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              {cards.map((card, index) => (
                <ModernSolutionCard
                  key={card.id}
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  index={index}
                />
              ))}
            </div>
            
            {/* View All Solutions Button */}
            <ViewAllSolutionsButton buttonText={buttonText} />
            
            {/* Indicador de fonte de dados */}
            {isUsingFallback && (
              <div className="text-center mt-4">
                <p className="text-xs text-gray-400">
                  📄 Dados carregados do Supabase (fallback)
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 mt-16">
            <p className="text-gray-500 mb-4">Nenhuma solução disponível no momento</p>
            <p className="text-sm text-gray-400">Os cards de soluções serão exibidos quando estiverem configurados</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompactSolutionsSection;
