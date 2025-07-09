
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
      <section className="gradient-primary w-full min-h-screen flex items-center pt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 mix-blend-multiply"></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-light mb-2 drop-shadow-lg">
              {getContentWithFallback('homeHero', 'title', 'hero.infinite')}
            </h2>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 drop-shadow-lg">
              {getContentWithFallback('homeHero', 'subtitle', 'hero.possibilities')}
            </h1>
            <h3 className="text-2xl md:text-3xl font-light mb-8 drop-shadow-lg">
              {getContentWithFallback('homeHero', 'poweredByAI', 'hero.poweredByAI')}
            </h3>
            <p className="text-lg md:text-xl mb-10 leading-relaxed">
              {getContentWithFallback('homeHero', 'description', 'hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-primary text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2 w-full sm:w-auto whitespace-nowrap"
                onClick={() => logger.info('Start journey button clicked', undefined, 'HeroSection')}
              >
                {getContentWithFallback('homeHero', 'startJourney', 'hero.startJourney')}
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-3 rounded-lg font-medium hover:bg-white/30 transition-all w-full sm:w-auto whitespace-nowrap"
                onClick={handleOpenVideoModal}
              >
                {getContentWithFallback('homeHero', 'watchDemo', 'hero.watchDemo')}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-10 h-10 flex items-center justify-center text-white/80">
            <ArrowRight className="w-6 h-6 rotate-90" />
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
