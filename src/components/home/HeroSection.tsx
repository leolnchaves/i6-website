
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import VideoModal from '@/components/VideoModal';

const HeroSection = () => {
  const { scrollY } = useScrollAnimation();
  const { t } = useLanguage();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center gradient-primary overflow-hidden">
        {/* Simplified background - just subtle gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-transparent to-blue-600/10"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-600/5 via-transparent to-pink-600/5"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="animate-bounce-in">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-8 leading-tight">
                <span className="block text-white font-light text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-4">
                  {t('hero.infinite')}
                </span>
                <div className="relative inline-block w-full">
                  <span className="relative block text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-9xl bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-transparent drop-shadow-2xl break-words">
                    {t('hero.possibilities')}
                  </span>
                </div>
                <span className="block text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-6 font-light">
                  {t('hero.poweredByAI')}
                </span>
              </h1>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 animate-slide-in-left font-medium px-4">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-right px-4">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:scale-105 transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-xl hover:shadow-2xl border-0 rounded-full font-semibold">
                {t('hero.startJourney')}
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button 
                size="lg" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-500 transition-all duration-300 hover:scale-105 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full backdrop-blur-sm font-semibold"
                onClick={() => setIsVideoModalOpen(true)}
              >
                {t('hero.watchDemo')}
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

      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
      />
    </>
  );
};

export default HeroSection;
