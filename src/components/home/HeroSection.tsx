
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const HeroSection = () => {
  const { scrollY } = useScrollAnimation();

  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-primary overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        ></div>
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"
          style={{ 
            transform: `translateY(${scrollY * -0.15}px)`,
            animationDelay: '2s'
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse"
          style={{ transform: `translate(-50%, -50%) translateY(${scrollY * 0.05}px)` }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-bounce-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="block text-white font-light">
                Infinite
              </span>
              <span className="block text-white font-bold text-6xl md:text-8xl bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                Possibilities
              </span>
              <span className="block text-white text-3xl md:text-4xl mt-2 font-light">
                Powered by AI
              </span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-slide-in-left">
            Transform your business with cutting-edge artificial intelligence solutions 
            that unlock unlimited potential and drive extraordinary results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-right">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:scale-105 transition-all duration-300 text-lg px-8 py-4 shadow-xl hover:shadow-2xl border-0 rounded-full">
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-500 transition-all duration-300 hover:scale-105 text-lg px-8 py-4 rounded-full backdrop-blur-sm">
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
