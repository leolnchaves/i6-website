
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useErrorHandler } from '@/hooks/useErrorBoundary';
import { logger } from '@/utils/logger';
import VideoModal from '@/components/VideoModal';
import ScrollAnimation from '@/components/home/hero/ScrollAnimation';
import { useCMSPageContent } from '@/hooks/useCMSPageContent';

/**
 * Hero section component for the home page
 * Features dynamic background, call-to-action buttons, and video modal
 * Includes error handling and CMS content management support
 */
const HeroSection = () => {
  // Hooks for functionality
  const { scrollY } = useScrollAnimation();
  const { t, language } = useLanguage();
  const { handleError } = useErrorHandler('HeroSection');
  
  // CMS content hook
  const { getContent, loading: cmsLoading } = useCMSPageContent('home', language);
  
  // Component state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Handle video modal opening with error handling
  const handleOpenVideoModal = () => {
    try {
      logger.info('Opening video modal', undefined, 'HeroSection');
      setIsVideoModalOpen(true);
    } catch (error) {
      handleError(error as Error, { componentStack: 'handleOpenVideoModal' });
    }
  };

  // Handle video modal closing with error handling
  const handleCloseVideoModal = () => {
    try {
      logger.info('Closing video modal', undefined, 'HeroSection');
      setIsVideoModalOpen(false);
    } catch (error) {
      handleError(error as Error, { componentStack: 'handleCloseVideoModal' });
    }
  };

  // Get content with fallback to translations
  const getContentWithFallback = (section: string, field: string, translationKey: string) => {
    const cmsContent = getContent(section, field);
    return cmsContent || t(translationKey);
  };

  return (
    <>
      {/* Main hero section */}
      <section className="relative min-h-screen flex items-center justify-center gradient-primary overflow-hidden">
        {/* Background gradients for visual appeal */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-transparent to-blue-600/10"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-600/5 via-transparent to-pink-600/5"></div>

        {/* Scroll-based Animation */}
        <ScrollAnimation />

        {/* Main content container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Hero title with animations */}
            <div className="animate-bounce-in">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-8 leading-tight">
                <span className="block text-white font-light text-2xl sm:text-3xl md:text-4xl lg:text-7xl mb-4">
                  {getContentWithFallback('hero', 'infinite', 'hero.infinite')}
                </span>
                <div className="relative inline-block w-full">
                  <span className="relative block text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-9xl bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-transparent drop-shadow-2xl px-2 leading-tight">
                    {getContentWithFallback('hero', 'possibilities', 'hero.possibilities')}
                  </span>
                </div>
                <span className="block text-white text-xl sm:text-2xl md:text-3xl lg:text-5xl mt-6 font-light">
                  {getContentWithFallback('hero', 'poweredByAI', 'hero.poweredByAI')}
                </span>
              </h1>
            </div>
            
            {/* Hero description */}
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 animate-slide-in-left font-medium px-4">
              {getContentWithFallback('hero', 'description', 'hero.description')}
            </p>
            
            {/* Call-to-action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-right px-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:scale-105 transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-xl hover:shadow-2xl border-0 rounded-full font-semibold"
                onClick={() => logger.info('Start journey button clicked', undefined, 'HeroSection')}
              >
                {getContentWithFallback('hero', 'startJourney', 'hero.startJourney')}
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button 
                size="lg" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-500 transition-all duration-300 hover:scale-105 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full backdrop-blur-sm font-semibold"
                onClick={handleOpenVideoModal}
              >
                {getContentWithFallback('hero', 'watchDemo', 'hero.watchDemo')}
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Video modal component */}
      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={handleCloseVideoModal} 
      />
    </>
  );
};

export default HeroSection;
