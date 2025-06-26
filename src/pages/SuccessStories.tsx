
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import SuccessStoriesHero from '@/components/success-stories/SuccessStoriesHero';
import MetricsSection from '@/components/success-stories/MetricsSection';
import StoriesGrid from '@/components/success-stories/StoriesGrid';
import TestimonialsSection from '@/components/success-stories/TestimonialsSection';

const SuccessStories = () => {
  console.log('SuccessStories page is rendering');
  
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <SuccessStoriesHero />
      <MetricsSection />
      <StoriesGrid />
      <TestimonialsSection />
      
      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('cta.title') || 'Transform Your Business Today'}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('cta.description') || 'Ready to revolutionize your business with AI? Let\'s discuss how we can help you achieve your goals.'}
          </p>
          <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
            {t('cta.button') || 'Get Started Now'}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;
