
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
      {/* Clean hero section with gradient background */}
      <section className="relative min-h-screen flex items-center justify-center gradient-primary overflow-hidden">
        {/* Simple overlay for depth */}
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Main content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen py-20">
            
            {/* Left side - Content */}
            <div className="text-left space-y-8">
              {/* Subtitle/Category */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-white/90 text-sm font-medium uppercase tracking-wider">
                  {getContentWithFallback('homeHero', 'title', 'hero.infinite')}
                </span>
              </div>

              {/* Main heading */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                  {getContentWithFallback('homeHero', 'subtitle', 'hero.possibilities')}
                </h1>
                <div className="text-xl md:text-2xl text-orange-300 font-medium">
                  {getContentWithFallback('homeHero', 'poweredByAI', 'hero.poweredByAI')}
                </div>
              </div>

              {/* Description */}
              <p className="text-lg text-white/80 leading-relaxed max-w-xl">
                {getContentWithFallback('homeHero', 'description', 'hero.description')}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-900 hover:bg-white/90 font-semibold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  onClick={() => logger.info('Start journey button clicked', undefined, 'HeroSection')}
                >
                  {getContentWithFallback('homeHero', 'startJourney', 'hero.startJourney')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg" 
                  className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-300"
                  onClick={handleOpenVideoModal}
                >
                  {getContentWithFallback('homeHero', 'watchDemo', 'hero.watchDemo')}
                  <div className="ml-2 w-5 h-5 rounded-full border-2 border-current flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[6px] border-l-current border-y-[3px] border-y-transparent ml-0.5"></div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Right side - Visual element/illustration */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-lg">
                {/* Main visual container */}
                <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  {/* Code-like interface mockup */}
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="text-white/60 text-sm">AI Assistant</div>
                    </div>
                    
                    {/* Content lines */}
                    <div className="space-y-3">
                      <div className="h-3 bg-orange-300/60 rounded w-3/4"></div>
                      <div className="h-3 bg-blue-300/60 rounded w-full"></div>
                      <div className="h-3 bg-white/40 rounded w-5/6"></div>
                      <div className="h-3 bg-orange-300/60 rounded w-2/3"></div>
                    </div>
                    
                    {/* Interactive elements */}
                    <div className="flex gap-2 pt-4">
                      <div className="flex-1 h-8 bg-white/10 rounded-lg flex items-center px-3">
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                      </div>
                      <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-400 rounded-lg opacity-80"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full opacity-60"></div>
                <div className="absolute top-1/2 -left-8 w-4 h-4 bg-white/40 rounded opacity-50"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Video modal */}
      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={handleCloseVideoModal}
        videoUrl={getDemoUrl()}
      />
    </>
  );
};

export default HeroSection;
