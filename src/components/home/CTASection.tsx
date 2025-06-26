
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const CTASection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 gradient-accent opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:scale-105 transition-all duration-300 text-lg px-8 py-4 shadow-xl hover:shadow-2xl border-0 rounded-full font-semibold">
            {t('cta.button')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
