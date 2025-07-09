
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
    console.log('HeroSection - CMS content for', section, field, ':', cmsContent);
    return cmsContent || t(translationKey);
  };

  // Get demo URL from CMS with fallback and convert to embed format
  const getDemoUrl = () => {
    const cmsUrl = getContent('homeHero', 'demoLink');
    const fallbackUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=1&showinfo=0&rel=0';
    
    if (!cmsUrl) return fallbackUrl;
    
    // Convert YouTube watch URLs to embed format
    const youtubeWatchRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
    const youtubeShareRegex = /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/;
    
    let videoId = null;
    
    // Check for watch URL format
    const watchMatch = cmsUrl.match(youtubeWatchRegex);
    if (watchMatch) {
      videoId = watchMatch[1];
    } else {
      // Check for share URL format
      const shareMatch = cmsUrl.match(youtubeShareRegex);
      if (shareMatch) {
        videoId = shareMatch[1];
      }
    }
    
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&showinfo=0&rel=0`;
    }
    
    // If it's already an embed URL or unknown format, return as is
    return cmsUrl.includes('/embed/') ? cmsUrl : fallbackUrl;
  };

  console.log('HeroSection - CMS Loading:', cmsLoading);
  console.log('HeroSection - All CMS content:', {
    title: getContent('homeHero', 'title'),
    subtitle: getContent('homeHero', 'subtitle'),
    poweredByAI: getContent('homeHero', 'poweredByAI'),
    description: getContent('homeHero', 'description'),
    startJourney: getContent('homeHero', 'startJourney'),
    watchDemo: getContent('homeHero', 'watchDemo'),
    demoLink: getContent('homeHero', 'demoLink')
  });

  return (
    <>
      {/* Main hero section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {/* Flowing curved shapes */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-float-curve"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-l from-orange-400/15 to-yellow-500/15 rounded-full blur-2xl animate-slide-curve"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-red-500/10 to-orange-600/10 rounded-full blur-xl animate-drift-curve"></div>
          
          {/* Particle dots */}
          <div className="absolute top-20 left-20 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-32 w-1 h-1 bg-orange-300 rounded-full animate-ping"></div>
          <div className="absolute bottom-40 left-40 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 left-1/2 w-1 h-1 bg-orange-500 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 left-1/6 w-1 h-1 bg-red-300 rounded-full animate-ping"></div>
          <div className="absolute top-1/6 right-1/4 w-2 h-2 bg-orange-300 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/2 left-3/4 w-1 h-1 bg-orange-400 rounded-full animate-ping"></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:40px_40px] opacity-30"></div>
        </div>

        {/* Main content container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Hero title with animations */}
            <div className="animate-fade-in">
              <div className="mb-8">
                <div className="text-2xl sm:text-3xl md:text-4xl font-light text-white/90 mb-2">
                  {getContentWithFallback('homeHero', 'title', 'hero.infinite')}
                </div>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-none mb-4">
                  {getContentWithFallback('homeHero', 'subtitle', 'hero.possibilities')}
                </h1>
                <div className="text-xl sm:text-2xl md:text-3xl font-light text-white/80">
                  {getContentWithFallback('homeHero', 'poweredByAI', 'hero.poweredByAI')}
                </div>
              </div>
            </div>
            
            {/* Hero description */}
            <p className="text-lg sm:text-xl md:text-2xl text-white/75 mb-12 animate-slide-in-left max-w-3xl mx-auto leading-relaxed">
              {getContentWithFallback('homeHero', 'description', 'hero.description')}
            </p>
            
            {/* Call-to-action buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-in-right">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:scale-105 transition-all duration-300 text-lg px-8 py-4 shadow-2xl hover:shadow-orange-500/25 border-0 rounded-lg font-semibold min-w-[200px]"
                onClick={() => logger.info('Start journey button clicked', undefined, 'HeroSection')}
              >
                {getContentWithFallback('homeHero', 'startJourney', 'hero.startJourney')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                className="bg-blue-600/20 border-2 border-blue-400/30 text-white hover:bg-blue-500/30 hover:border-blue-300/50 transition-all duration-300 hover:scale-105 text-lg px-8 py-4 rounded-lg backdrop-blur-sm font-semibold min-w-[200px]"
                onClick={handleOpenVideoModal}
              >
                {getContentWithFallback('homeHero', 'watchDemo', 'hero.watchDemo')}
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Video modal component */}
      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={handleCloseVideoModal}
        videoUrl={getDemoUrl()}
      />
    </>
  );
};

export default HeroSection;
