
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
      <section className="relative min-h-screen flex items-center justify-center gradient-primary overflow-hidden">
        {/* Enhanced background with floating particles */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/15 via-transparent to-blue-600/15"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-600/8 via-transparent to-pink-600/8"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-orange-400/60 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Flowing wave elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -bottom-32 -left-40 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -top-32 -right-40 w-96 h-96 bg-gradient-to-l from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          {/* Dynamic flowing curves */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(251, 146, 60, 0.3)" />
                <stop offset="100%" stopColor="rgba(239, 68, 68, 0.1)" />
              </linearGradient>
              <linearGradient id="flowGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                <stop offset="100%" stopColor="rgba(147, 51, 234, 0.1)" />
              </linearGradient>
            </defs>
            <path 
              d="M-100,300 Q200,150 400,250 T800,200 L800,800 L-100,800 Z" 
              fill="url(#flowGradient1)"
              className="animate-pulse"
            />
            <path 
              d="M1200,400 Q900,250 600,350 T200,300 L200,0 L1200,0 Z" 
              fill="url(#flowGradient2)"
              className="animate-pulse"
              style={{ animationDelay: '1.5s' }}
            />
          </svg>
        </div>

        {/* Enhanced grid pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'float 6s ease-in-out infinite'
          }}></div>
        </div>

        {/* Scroll-based Animation */}
        <ScrollAnimation />

        {/* Main content container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            {/* Enhanced hero title with better typography */}
            <div className="animate-bounce-in">
              <div className="mb-6">
                <span className="inline-block text-white/80 font-light text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 tracking-wide">
                  {getContentWithFallback('homeHero', 'title', 'hero.infinite')}
                </span>
              </div>
              
              <h1 className="relative">
                <span className="block text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none mb-4">
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-transparent">
                      {getContentWithFallback('homeHero', 'subtitle', 'hero.possibilities')}
                    </span>
                    {/* Glowing effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-transparent blur-sm opacity-50">
                      {getContentWithFallback('homeHero', 'subtitle', 'hero.possibilities')}
                    </span>
                  </span>
                </span>
              </h1>
              
              <div className="mt-4 mb-8">
                <span className="inline-block text-white/90 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-wide">
                  {getContentWithFallback('homeHero', 'poweredByAI', 'hero.poweredByAI')}
                </span>
              </div>
            </div>
            
            {/* Enhanced description with better spacing */}
            <div className="max-w-4xl mx-auto mb-12 animate-slide-in-left">
              <p className="text-lg sm:text-xl md:text-2xl text-white/85 font-medium leading-relaxed">
                {getContentWithFallback('homeHero', 'description', 'hero.description')}
              </p>
            </div>
            
            {/* Enhanced call-to-action buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-in-right mb-16">
              <Button 
                size="lg" 
                className="group relative bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:scale-105 transition-all duration-500 text-lg px-8 py-4 shadow-2xl hover:shadow-orange-500/25 border-0 rounded-full font-semibold overflow-hidden"
                onClick={() => logger.info('Start journey button clicked', undefined, 'HeroSection')}
              >
                <span className="relative z-10 flex items-center">
                  {getContentWithFallback('homeHero', 'startJourney', 'hero.startJourney')}
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Button>
              <Button 
                size="lg" 
                className="group relative bg-white/10 border-2 border-white/30 text-white hover:bg-white hover:text-blue-900 transition-all duration-500 hover:scale-105 text-lg px-8 py-4 rounded-full backdrop-blur-md font-semibold overflow-hidden"
                onClick={handleOpenVideoModal}
              >
                <span className="relative z-10 flex items-center">
                  {getContentWithFallback('homeHero', 'watchDemo', 'hero.watchDemo')}
                  <div className="ml-2 w-5 h-5 rounded-full border-2 border-current flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[6px] border-l-current border-y-[3px] border-y-transparent ml-0.5"></div>
                  </div>
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="relative">
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
            </div>
            <div className="absolute inset-0 w-6 h-10 border-2 border-orange-400/30 rounded-full animate-ping"></div>
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
