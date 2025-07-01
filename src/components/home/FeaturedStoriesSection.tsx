
import { useLanguage } from '@/contexts/LanguageContext';
import { useMarkdownSuccessStoriesCards } from '@/hooks/useMarkdownSuccessStoriesCards';
import { useCMSContent } from '@/hooks/useCMSContent';
import { useState, useEffect } from 'react';
import FeaturedStoriesHeader from './featured-stories/FeaturedStoriesHeader';
import HomeFeaturedStoryCard from './featured-stories/HomeFeaturedStoryCard';
import ViewAllButton from './featured-stories/ViewAllButton';

const FeaturedStoriesSection = () => {
  const { language } = useLanguage();
  const { pages, fetchPages } = useCMSContent();
  const [pageSlug, setPageSlug] = useState<string>('');

  // Usar o novo hook unificado do Markdown com fallback para Supabase
  const { cards, loading, error, isUsingFallback } = useMarkdownSuccessStoriesCards(pageSlug, language);

  useEffect(() => {
    console.log('FeaturedStoriesSection - Fetching pages...');
    fetchPages();
  }, [fetchPages]);

  useEffect(() => {
    console.log('FeaturedStoriesSection - Pages changed:', pages);
    if (pages.length > 0) {
      const homePage = pages.find(p => p.slug === 'home');
      console.log('FeaturedStoriesSection - Home page found:', homePage);
      if (homePage) {
        setPageSlug('home'); // Usar slug em vez de ID
        console.log('FeaturedStoriesSection - Using page slug: home, language:', language);
      }
    }
  }, [pages, language]);

  // Filter cards to show only active home cards - usando todos os cards se não houver cards específicos para home
  const homeCards = cards.filter(card => card.isActiveHome);
  const fallbackCards = homeCards.length === 0 ? cards.slice(0, 3) : homeCards;

  console.log('FeaturedStoriesSection - All cards:', cards.length);
  console.log('FeaturedStoriesSection - Cards with isActiveHome=true:', homeCards.length);
  console.log('FeaturedStoriesSection - Final cards to display:', fallbackCards.length);
  console.log('FeaturedStoriesSection - Loading state:', loading);
  console.log('FeaturedStoriesSection - Using fallback:', isUsingFallback);
  console.log('FeaturedStoriesSection - Error:', error);

  if (loading) {
    console.log('FeaturedStoriesSection - Showing loading state');
    return (
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FeaturedStoriesHeader />

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-7xl w-full">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl shadow-lg p-6 animate-pulse h-[500px]">
                  <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  console.log('FeaturedStoriesSection - Rendering main content, fallbackCards length:', fallbackCards.length);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FeaturedStoriesHeader />

        {fallbackCards.length > 0 ? (
          <>
            <div className="flex justify-center">
              <div className={`grid gap-8 mb-12 w-full ${
                fallbackCards.length === 1 
                  ? 'grid-cols-1 max-w-md mx-auto' 
                  : fallbackCards.length === 2 
                  ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' 
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl'
              }`}>
                {fallbackCards.map((card, index) => {
                  // Converter o formato do Markdown para o formato esperado pelo componente
                  const adaptedCard = {
                    id: card.id,
                    company_name: card.companyName,
                    industry: card.industry,
                    challenge: card.challenge,
                    solution: card.solution,
                    metric1_value: card.metrics.metric1.value,
                    metric1_label: card.metrics.metric1.label,
                    metric2_value: card.metrics.metric2.value,
                    metric2_label: card.metrics.metric2.label,
                    metric3_value: card.metrics.metric3.value,
                    metric3_label: card.metrics.metric3.label,
                    customer_quote: card.customerQuote,
                    customer_name: card.customerName,
                    customer_title: card.customerTitle,
                    image_url: card.imageUrl,
                    is_active_home: card.isActiveHome,
                    card_order: card.cardOrder,
                  };

                  return (
                    <div key={card.id} className="flex">
                      <HomeFeaturedStoryCard card={adaptedCard} index={index} />
                    </div>
                  );
                })}
              </div>
            </div>
            
            <ViewAllButton />
            
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
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Nenhum case de sucesso disponível no momento</p>
            <p className="text-sm text-gray-400">Cards serão exibidos quando houver dados disponíveis</p>
            <ViewAllButton />
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedStoriesSection;
