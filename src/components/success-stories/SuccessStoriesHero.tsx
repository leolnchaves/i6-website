
import { useLanguage } from '@/contexts/LanguageContext';
import { useSuccessStoriesContent } from '@/hooks/useSuccessStoriesContent';

const SuccessStoriesHero = () => {
  const { language } = useLanguage();
  const { getHeroContent, loading } = useSuccessStoriesContent(language);
  
  const heroContent = getHeroContent();

  if (loading) {
    return (
      <section 
        className="w-full min-h-[50vh] flex items-center pt-20 relative overflow-hidden bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto text-white">
            <div className="animate-pulse">
              <div className="h-12 bg-white/20 rounded mb-6"></div>
              <div className="h-8 bg-white/20 rounded mb-8"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="w-full min-h-[50vh] flex items-center pt-20 relative overflow-hidden bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900"
    >
      {/* Subtle background effects */}
      <div className="absolute inset-0">
        {/* Subtle shapes */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-l from-blue-400/8 to-cyan-500/8 rounded-full blur-2xl"></div>
        
        {/* Minimal grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.02)_1px,transparent_0)] bg-[length:40px_40px] opacity-50"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
            <span className="block mb-2">{heroContent.title}</span>
            <span className="block bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent pb-2">
              {heroContent.subtitle}
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-8 drop-shadow-lg leading-relaxed">
            {heroContent.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesHero;
