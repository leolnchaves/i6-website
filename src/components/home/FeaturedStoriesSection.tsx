
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSSuccessStoriesCards } from '@/hooks/useCMSSuccessStoriesCards';
import { useCMSContent } from '@/hooks/useCMSContent';
import { useState, useEffect } from 'react';
import FeaturedStoriesHeader from './featured-stories/FeaturedStoriesHeader';
import HomeFeaturedStoryCard from './featured-stories/HomeFeaturedStoryCard';
import ViewAllButton from './featured-stories/ViewAllButton';

const FeaturedStoriesSection = () => {
  const { language } = useLanguage();
  const { pages, fetchPages } = useCMSContent();
  const { cards, loading, fetchCards } = useCMSSuccessStoriesCards();
  const [pageId, setPageId] = useState<string>('');

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
        setPageId(homePage.id);
        console.log('FeaturedStoriesSection - Fetching cards for page:', homePage.id, 'language:', language);
        fetchCards(homePage.id, language);
      }
    }
  }, [pages, language, fetchCards]);

  // Filter cards to show only active home cards - usando todos os cards se não houver cards específicos para home
  const homeCards = cards.filter(card => card.is_active_home);
  const fallbackCards = homeCards.length === 0 ? cards.slice(0, 3) : homeCards;

  console.log('FeaturedStoriesSection - All cards:', cards);
  console.log('FeaturedStoriesSection - Cards with is_active_home=true:', homeCards);
  console.log('FeaturedStoriesSection - Final cards to display:', fallbackCards);
  console.log('FeaturedStoriesSection - Loading state:', loading);

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {fallbackCards.map((card, index) => (
                <HomeFeaturedStoryCard key={card.id} card={card} index={index} />
              ))}
            </div>
            
            <ViewAllButton />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Nenhum case de sucesso disponível no momento</p>
            <p className="text-sm text-gray-400">Cards serão exibidos quando houver dados disponíveis no CMS</p>
            <ViewAllButton />
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedStoriesSection;
