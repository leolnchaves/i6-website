
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSSuccessStoriesCards } from '@/hooks/useCMSSuccessStoriesCards';
import { useCMSContent } from '@/hooks/useCMSContent';
import { useState, useEffect } from 'react';
import FeaturedStoriesHeader from './featured-stories/FeaturedStoriesHeader';
import ViewAllButton from './featured-stories/ViewAllButton';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Play } from 'lucide-react';

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

          <div className="max-w-6xl mx-auto mb-12">
            <div className="flex gap-4 overflow-hidden">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="min-w-[280px] md:min-w-[320px] h-[500px] bg-gray-50 rounded-2xl shadow-lg animate-pulse overflow-hidden">
                  <div className="p-6 pb-4">
                    <div className="h-6 bg-gray-200 rounded-full w-20 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="mx-6 mb-6 h-64 bg-gray-200 rounded-2xl"></div>
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
            <div className="max-w-6xl mx-auto mb-12">
              <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {fallbackCards.map((card, index) => (
                    <CarouselItem key={card.id} className="pl-2 md:pl-4 basis-[280px] md:basis-[320px]">
                      <Card className="h-[500px] bg-gradient-to-br from-blue-50 to-slate-100 border-0 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                        <CardContent className="p-0 h-full flex flex-col">
                          {/* Header com categoria */}
                          <div className="p-6 pb-4">
                            <div className="inline-block px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-600 mb-4">
                              {card.industry}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 leading-tight">
                              {card.solution}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">{card.company_name}</p>
                          </div>
                          
                          {/* Imagem principal */}
                          <div className="flex-1 relative mx-6 mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100">
                            {card.image_url ? (
                              <img 
                                src={card.image_url} 
                                alt={card.company_name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                  <Play className="w-8 h-8 text-white" />
                                </div>
                              </div>
                            )}
                            
                            {/* Play button overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors duration-300">
                              <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <Play className="w-8 h-8 text-gray-800 ml-1" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
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
