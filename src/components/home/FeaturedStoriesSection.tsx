
import { useLanguage } from '@/contexts/LanguageContext';
import { useHomeSuccessStories } from '@/hooks/useHomeSuccessStories';
import { useState, useEffect, useRef, memo } from 'react';
import FeaturedStoriesHeader from './featured-stories/FeaturedStoriesHeader';
import ViewAllButton from './featured-stories/ViewAllButton';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, BarChart3, Users, Target, ChevronLeft, ChevronRight } from 'lucide-react';
import LazyImage from '@/components/common/LazyImage';

const FeaturedStoriesSection = () => {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Get stories from markdown content
  const { stories, loading, error } = useHomeSuccessStories();
  
  // Use stories directly
  const fallbackCards = stories;

  // Autoplay functionality
  useEffect(() => {
    if (fallbackCards.length > 1 && !isPaused) {
      autoplayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % fallbackCards.length);
      }, 4000);

      return () => {
        if (autoplayRef.current) {
          clearInterval(autoplayRef.current);
        }
      };
    } else if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, [fallbackCards.length, isPaused]);

  // Pause/resume handlers
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Navigation functions
  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % fallbackCards.length);
    // Reset autoplay
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % fallbackCards.length);
      }, 4000);
    }
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + fallbackCards.length) % fallbackCards.length);
    // Reset autoplay
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % fallbackCards.length);
      }, 4000);
    }
  };

  // Function to get appropriate icon for each card
  const getCardIcon = (index: number) => {
    const icons = [TrendingUp, BarChart3, Users, Target];
    return icons[index % icons.length];
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FeaturedStoriesHeader />

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Carregando casos de sucesso...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">Erro ao carregar casos de sucesso: {error}</p>
          </div>
        ) : fallbackCards.length > 0 ? (
          <>
            {/* Carrossel circular customizado */}
            <div className="relative w-full max-w-6xl mx-auto mb-12 h-[600px] flex items-center justify-center mt-4">
              {/* Container do carrossel */}
              <div className="relative w-full h-full perspective-1000">
                {fallbackCards.map((story, index) => {
                  const IconComponent = getCardIcon(index);
                  const position = (index - currentSlide + fallbackCards.length) % fallbackCards.length;
                  
                  // Only render visible cards (center + adjacent) for performance
                  const shouldRender = position <= 1 || position >= fallbackCards.length - 1;
                  
                  if (!shouldRender) return null;
                  
                  // Definir posições e transformações para cada card
                  let transform = '';
                  let zIndex = 1;
                  let opacity = 0.6;
                  let scale = 0.8;
                  
                  if (position === 0) {
                    // Card central (ativo)
                    transform = 'translateX(0) translateZ(0) rotateY(0deg)';
                    zIndex = 10;
                    opacity = 1;
                    scale = 1;
                  } else if (position === 1 || position === fallbackCards.length - 1) {
                    // Cards laterais
                    const isRight = position === 1;
                    transform = `translateX(${isRight ? '280px' : '-280px'}) translateZ(-100px) rotateY(${isRight ? '-25deg' : '25deg'})`;
                    zIndex = 5;
                    opacity = 0.7;
                    scale = 0.85;
                  }
                  
                  return (
                    <div
                      key={`story-${index}`}
                      className="absolute top-1/2 left-1/2 transition-all duration-700 ease-in-out will-change-transform"
                      style={{
                        transform: `translate(-50%, -50%) ${transform} scale(${scale})`,
                        zIndex,
                        opacity,
                      }}
                    >
                      <Card 
                        className="w-[320px] h-[480px] bg-gradient-to-br from-blue-50 to-slate-100 border-0 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <CardContent className="p-0 h-full flex flex-col">
                          {/* Header com categoria */}
                          <div className="p-6 pb-4 flex-1">
                            <div className="inline-block px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-600 mb-4">
                              {story.segment}
                            </div>
                            <h3 className="text-lg text-gray-900 leading-tight mb-3">
                              {story.quote}
                            </h3>
                            {story.challenge && (
                              <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                                {story.challenge}
                              </p>
                            )}
                            <p className="text-sm font-bold text-gray-600">{story.client}</p>
                          </div>
                          
                          {/* Imagem posicionada no bottom com altura fixa */}
                          <div className="mx-6 mb-6 h-32 rounded-lg overflow-hidden bg-gray-100">
                            {story.image ? (
                              <LazyImage 
                                src={story.image} 
                                alt={story.client}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                placeholderClassName="w-full h-full"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-blue-100 via-cyan-50 to-indigo-100 flex flex-col items-center justify-center p-4">
                                {/* Ícone principal */}
                                <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg mb-3 group-hover:scale-110 transition-transform duration-300">
                                  <IconComponent className="w-6 h-6 text-blue-600" />
                                </div>
                                
                                {/* Texto de descrição */}
                                <div className="text-center">
                                  <p className="text-xs text-gray-700 font-medium mb-1">{story.segment}</p>
                                  <p className="text-xs text-gray-600">{story.client}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
              
              {/* Botões de navegação */}
              <button
                onClick={goToPrevious}
                className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors duration-200 group"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors duration-200 group"
              >
                <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
              </button>
              
              {/* Indicadores */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {fallbackCards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      index === currentSlide ? 'bg-blue-600' : 'bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <ViewAllButton />
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

export default memo(FeaturedStoriesSection);
