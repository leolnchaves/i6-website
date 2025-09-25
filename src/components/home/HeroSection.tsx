import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useErrorHandler } from '@/hooks/useErrorBoundary';
import { logger } from '@/utils/logger';
import VideoModal from '@/components/VideoModal';
import ScrollAnimation from '@/components/home/hero/ScrollAnimation';
import heroBg from '@/assets/images/hero-bg.jpg';
import './hero/HeroAnimations.css';

/**
 * Hero section component for the home page
 * Features dynamic background, call-to-action buttons, and video modal
 * Includes error handling and static content
 */
const HeroSection = () => {
  // Hooks for functionality
  const {
    scrollY
  } = useScrollAnimation();
  const {
    t
  } = useLanguage();
  const {
    handleError
  } = useErrorHandler('HeroSection');

  // Component state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Handle video modal opening with error handling
  const handleOpenVideoModal = () => {
    try {
      logger.info('Opening video modal', undefined, 'HeroSection');
      setIsVideoModalOpen(true);
    } catch (error) {
      handleError(error as Error, {
        componentStack: 'handleOpenVideoModal'
      });
    }
  };

  // Handle video modal closing with error handling
  const handleCloseVideoModal = () => {
    try {
      logger.info('Closing video modal', undefined, 'HeroSection');
      setIsVideoModalOpen(false);
    } catch (error) {
      handleError(error as Error, {
        componentStack: 'handleCloseVideoModal'
      });
    }
  };

  // Static demo URL
  const getDemoUrl = () => {
    return 'https://www.youtube.com/embed/knNYT11sEk0?autoplay=1&controls=1&showinfo=0&rel=0';
  };
  return <>
      {/* Main hero section */}
      <section className="w-full min-h-screen flex items-center pt-20 relative overflow-hidden bg-cover bg-center" style={{
      backgroundImage: `url(${heroBg})`
    }}>
        {/* Background effects */}
        <div className="absolute inset-0">
          {/* Static curved shapes */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-l from-orange-400/15 to-yellow-500/15 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-red-500/10 to-orange-600/10 rounded-full blur-xl"></div>
          
          {/* Strategic particle dots with subtle animations - avoiding text areas */}
          {/* Top corners and edges */}
          <div className="absolute top-16 left-16 w-2 h-2 bg-orange-400 rounded-full gentle-pulse-1"></div>
          <div className="absolute top-24 right-24 w-1 h-1 bg-orange-300 rounded-full gentle-pulse-2"></div>
          <div className="absolute top-12 right-40 w-1.5 h-1.5 bg-red-300 rounded-full gentle-pulse-5"></div>
          <div className="absolute top-40 left-12 w-1 h-1 bg-orange-500 rounded-full gentle-pulse-7"></div>
          
          {/* Left side - avoiding center text area */}
          <div className="absolute top-1/3 left-12 w-2 h-2 bg-red-400 rounded-full gentle-pulse-3"></div>
          <div className="absolute top-2/3 left-20 w-1 h-1 bg-orange-400 rounded-full gentle-pulse-6"></div>
          <div className="absolute bottom-1/3 left-16 w-1.5 h-1.5 bg-orange-300 rounded-full gentle-pulse-9"></div>
          
          {/* Right side - avoiding center text area */}
          <div className="absolute top-1/4 right-16 w-1 h-1 bg-orange-500 rounded-full gentle-pulse-4"></div>
          <div className="absolute top-1/2 right-12 w-2 h-2 bg-red-300 rounded-full gentle-pulse-8"></div>
          <div className="absolute bottom-1/4 right-20 w-1.5 h-1.5 bg-orange-400 rounded-full gentle-pulse-10"></div>
          
          {/* Bottom area - below buttons */}
          <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-orange-300 rounded-full gentle-pulse-1"></div>
          <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-red-400 rounded-full gentle-pulse-3"></div>
          <div className="absolute bottom-24 left-1/3 w-1.5 h-1.5 bg-orange-500 rounded-full gentle-pulse-7"></div>
          <div className="absolute bottom-36 right-1/4 w-1 h-1 bg-orange-400 rounded-full gentle-pulse-5"></div>
          
          {/* Additional scattered points */}
          <div className="absolute top-1/6 left-1/3 w-1 h-1 bg-red-300 rounded-full gentle-pulse-2"></div>
          <div className="absolute top-5/6 right-1/6 w-1.5 h-1.5 bg-orange-300 rounded-full gentle-pulse-8"></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:40px_40px] opacity-30"></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 mix-blend-multiply"></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-5xl mx-auto text-center text-white">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-4 drop-shadow-lg">
              {t('hero.infinite')}
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold mb-8 drop-shadow-lg leading-tight">
              {t('hero.possibilities')}
            </h1>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light mb-10 drop-shadow-lg">
              {t('hero.poweredByAI')}
            </h3>
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto mb-12">
              <p className="mb-0">Repense o que é possível. Construa com inteligência. Avance mais rápido.
            </p>
              <p>Grow beyond limits with adaptive AI.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact#contact-form">
                <Button size="lg" className="bg-primary text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2 w-full sm:w-auto whitespace-nowrap" onClick={() => logger.info('Start journey button clicked', undefined, 'HeroSection')}>
                  {t('hero.startJourney')}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-3 rounded-lg font-medium hover:bg-white/30 transition-all w-full sm:w-auto whitespace-nowrap" onClick={handleOpenVideoModal}>
                {t('hero.watchDemo')}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="relative group">
            {/* Glowing circle background */}
            <div className="w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
              {/* Inner glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-sm opacity-50"></div>
              {/* Modern chevron down icon */}
              <svg className="w-5 h-5 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Video modal component */}
      <VideoModal isOpen={isVideoModalOpen} onClose={handleCloseVideoModal} videoUrl={getDemoUrl()} />
    </>;
};
export default memo(HeroSection);