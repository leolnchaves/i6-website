
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
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('cta.title') || 'Transform Your Business Today'}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {t('cta.description') || 'Ready to revolutionize your business with AI? Let\'s discuss how we can help you achieve your goals.'}
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
            {t('cta.button') || 'Get Started Now'}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;
