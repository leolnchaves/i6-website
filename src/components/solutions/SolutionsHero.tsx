
import { useCMSPageContent } from '@/hooks/useCMSPageContent';
import { useLanguage } from '@/contexts/LanguageContext';

const SolutionsHero = () => {
  const { language } = useLanguage();
  const { getContent, loading } = useCMSPageContent('solutions', language);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
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
    <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="block mb-2">
              {getContent('solutionsHero', 'mainTitle', 'Transform Your Business with')}
            </span>
            <span className="block bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent pb-2">
              {getContent('solutionsHero', 'mainSubtitle', 'AI-Powered Solutions')}
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            {getContent('solutionsHero', 'description', 'Discover our comprehensive suite of artificial intelligence solutions designed to optimize your operations, enhance decision-making, and drive sustainable growth across all sectors of your business.')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SolutionsHero;
