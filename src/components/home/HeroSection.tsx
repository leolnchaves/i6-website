
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const HeroSection = () => {
  const { scrollY } = useScrollAnimation();

  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-primary overflow-hidden">
      {/* Enhanced Animated Background Stripes - Larger and More */}
      <div className="absolute inset-0">
        {/* Multiple large diagonal stripes covering full width and height */}
        <div 
          className="absolute -top-20 -left-32 w-[150vw] h-48 bg-white/12 blur-3xl animate-float transform -rotate-12"
          style={{ transform: `translateY(${scrollY * 0.1}px) rotate(-12deg)` }}
        ></div>
        <div 
          className="absolute top-20 -left-32 w-[150vw] h-40 bg-white/18 blur-2xl animate-float transform -rotate-12"
          style={{ 
            transform: `translateY(${scrollY * -0.08}px) rotate(-12deg)`,
            animationDelay: '1s'
          }}
        ></div>
        <div 
          className="absolute top-60 -left-32 w-[150vw] h-56 bg-white/10 blur-3xl animate-float transform -rotate-12"
          style={{ 
            transform: `translateY(${scrollY * 0.12}px) rotate(-12deg)`,
            animationDelay: '0.5s'
          }}
        ></div>
        <div 
          className="absolute top-96 -left-32 w-[150vw] h-44 bg-white/15 blur-2xl animate-float transform -rotate-12"
          style={{ 
            transform: `translateY(${scrollY * -0.06}px) rotate(-12deg)`,
            animationDelay: '2.5s'
          }}
        ></div>
        <div 
          className="absolute bottom-80 -left-32 w-[150vw] h-52 bg-white/14 blur-3xl animate-float transform -rotate-12"
          style={{ 
            transform: `translateY(${scrollY * -0.15}px) rotate(-12deg)`,
            animationDelay: '2s'
          }}
        ></div>
        <div 
          className="absolute bottom-40 -left-32 w-[150vw] h-48 bg-white/12 blur-2xl animate-float transform -rotate-12"
          style={{ 
            transform: `translateY(${scrollY * 0.05}px) rotate(-12deg)`,
            animationDelay: '1.5s'
          }}
        ></div>
        <div 
          className="absolute -bottom-20 -left-32 w-[150vw] h-56 bg-white/16 blur-3xl animate-float transform -rotate-12"
          style={{ 
            transform: `translateY(${scrollY * 0.08}px) rotate(-12deg)`,
            animationDelay: '3s'
          }}
        ></div>
        <div 
          className="absolute top-1/3 -left-32 w-[150vw] h-36 bg-white/8 blur-xl animate-pulse transform -rotate-12"
          style={{ transform: `translate(0, -50%) translateY(${scrollY * 0.05}px) rotate(-12deg)` }}
        ></div>
        <div 
          className="absolute top-2/3 -left-32 w-[150vw] h-40 bg-white/10 blur-xl animate-pulse transform -rotate-12"
          style={{ 
            transform: `translate(0, -50%) translateY(${scrollY * -0.07}px) rotate(-12deg)`,
            animationDelay: '1.5s'
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
                {/* Handwritten background effect */}
                <div className="absolute inset-0 -inset-x-8 -inset-y-4">
                  <svg 
                    className="w-full h-full animate-draw-stroke opacity-30" 
                    viewBox="0 0 400 120" 
                    fill="none"
                  >
                    <path 
                      d="M10 60 Q50 20, 100 60 T200 60 T300 60 T390 60" 
                      stroke="rgba(255, 107, 53, 0.8)" 
                      strokeWidth="6" 
                      strokeLinecap="round"
                      strokeDasharray="1000"
                      strokeDashoffset="1000"
                      className="animate-draw-line"
                    />
                    <path 
                      d="M15 65 Q55 25, 105 65 T205 65 T305 65 T385 65" 
                      stroke="rgba(247, 147, 30, 0.6)" 
                      strokeWidth="4" 
                      strokeLinecap="round"
                      strokeDasharray="1000"
                      strokeDashoffset="1000"
                      className="animate-draw-line"
                      style={{ animationDelay: '0.5s' }}
                    />
                  </svg>
                </div>
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
