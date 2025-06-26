
import HeroSection from '@/components/home/HeroSection';
import ResultsSection from '@/components/home/ResultsSection';
import StatsSection from '@/components/home/StatsSection';
import FeaturedStoriesSection from '@/components/home/FeaturedStoriesSection';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Home = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ResultsSection />
      <StatsSection />
      <FeaturedStoriesSection />
      
      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {t('cta.title') || 'Transform Your Business Today'}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
            {t('cta.description') || 'Ready to revolutionize your business with AI? Let\'s discuss how we can help you achieve your goals.'}
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
            {t('cta.button') || 'Get Started Now'}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
