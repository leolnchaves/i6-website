
import { useCMSPageContent } from '@/hooks/useCMSPageContent';
import { useLanguage } from '@/contexts/LanguageContext';
import heroBg from '@/assets/hero-bg.jpg';

const SolutionsHero = () => {
  const { language } = useLanguage();
  const { getContent, loading } = useCMSPageContent('solutions', language);

  if (loading) {
    return (
      <section className="w-full min-h-[70vh] flex items-center pt-20 relative overflow-hidden">
        {/* Background image with blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${heroBg})`,
            filter: 'blur(10px)'
          }}
        ></div>
        
        {/* Minimal grid pattern overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:40px_40px] opacity-30"></div>
        </div>
        
        {/* Darker overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 mix-blend-multiply"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto text-white">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-700 rounded mb-6"></div>
              <div className="h-8 bg-gray-700 rounded mb-8"></div>
              <div className="h-6 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full min-h-[70vh] flex items-center pt-20 relative overflow-hidden">
      {/* Background image with blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${heroBg})`,
          filter: 'blur(10px)'
        }}
      ></div>
      
      {/* Minimal grid pattern overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:40px_40px] opacity-30"></div>
      </div>
      
      {/* Darker overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 mix-blend-multiply"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
            <span className="block mb-2">
              {getContent('solutionsHero', 'mainTitle', 'Transform Your Business with')}
            </span>
            <span className="block bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent pb-2">
              {getContent('solutionsHero', 'mainSubtitle', 'AI-Powered Solutions')}
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 drop-shadow-lg leading-relaxed">
            {getContent('solutionsHero', 'description', 'Discover our comprehensive suite of artificial intelligence solutions designed to optimize your operations, enhance decision-making, and drive sustainable growth across all sectors of your business.')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SolutionsHero;
