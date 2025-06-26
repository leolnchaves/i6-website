
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const HeroSection = () => {
  const { scrollY } = useScrollAnimation();

  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-primary overflow-hidden">
      {/* Wide background stripes across entire screen */}
      <div className="absolute inset-0">
        {/* Layer 1 - Wide diagonal stripes */}
        <div 
          className="absolute -top-40 -left-20 w-[120vw] h-32 bg-white/8 transform -rotate-12 animate-float"
          style={{ transform: `translateY(${scrollY * 0.1}px) rotate(-12deg)` }}
        ></div>
        <div 
          className="absolute top-0 -left-20 w-[120vw] h-24 bg-white/12 transform -rotate-12 animate-float"
          style={{ 
            transform: `translateY(${scrollY * -0.08}px) rotate(-12deg)`,
            animationDelay: '1s'
          }}
        ></div>
        <div 
          className="absolute top-32 -left-20 w-[120vw] h-40 bg-white/6 transform -rotate-12 animate-float"
          style={{ 
            transform: `translateY(${scrollY * 0.12}px) rotate(-12deg)`,
            animationDelay: '0.5s'
          }}
        ></div>
        <div 
          className="absolute top-80 -left-20 w-[120vw] h-28 bg-white/10 transform -rotate-12 animate-float"
          style={{ 
            transform: `translateY(${scrollY * -0.06}px) rotate(-12deg)`,
            animationDelay: '2.5s'
          }}
        ></div>
        
        {/* Layer 2 - Center area stripes */}
        <div 
          className="absolute top-1/3 -left-20 w-[120vw] h-36 bg-white/9 transform -rotate-12 animate-float"
          style={{ 
            transform: `translateY(${scrollY * 0.07}px) rotate(-12deg)`,
            animationDelay: '1.5s'
          }}
        ></div>
        <div 
          className="absolute top-1/2 -left-20 w-[120vw] h-44 bg-white/7 transform -rotate-12 animate-float"
          style={{ 
            transform: `translateY(${scrollY * -0.09}px) rotate(-12deg)`,
            animationDelay: '3s'
          }}
        ></div>
        
        {/* Layer 3 - Bottom stripes */}
        <div 
          className="absolute bottom-64 -left-20 w-[120vw] h-32 bg-white/8 transform -rotate-12 animate-float"
          style={{ 
            transform: `translateY(${scrollY * -0.11}px) rotate(-12deg)`,
            animationDelay: '2s'
          }}
        ></div>
        <div 
          className="absolute bottom-32 -left-20 w-[120vw] h-40 bg-white/10 transform -rotate-12 animate-float"
          style={{ 
            transform: `translateY(${scrollY * 0.05}px) rotate(-12deg)`,
            animationDelay: '1.8s'
          }}
        ></div>
        <div 
          className="absolute -bottom-20 -left-20 w-[120vw] h-36 bg-white/6 transform -rotate-12 animate-float"
          style={{ 
            transform: `translateY(${scrollY * 0.08}px) rotate(-12deg)`,
            animationDelay: '0.8s'
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <div className="animate-bounce-in">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
              <span className="block text-white font-light text-5xl md:text-7xl mb-4">
                Infinite
              </span>
              <div className="relative inline-block">
                <span className="relative block text-white font-bold text-7xl md:text-9xl bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-transparent drop-shadow-2xl">
                  Possibilities
                </span>
              </div>
              <span className="block text-white text-4xl md:text-5xl mt-6 font-light">
                Powered by AI
              </span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 mb-10 animate-slide-in-left font-medium">
            Transform your business with cutting-edge artificial intelligence solutions 
            that unlock unlimited potential and drive extraordinary results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-right">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:scale-105 transition-all duration-300 text-lg px-8 py-4 shadow-xl hover:shadow-2xl border-0 rounded-full font-semibold">
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-500 transition-all duration-300 hover:scale-105 text-lg px-8 py-4 rounded-full backdrop-blur-sm font-semibold">
              Watch Demo
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
  );
};

export default HeroSection;
