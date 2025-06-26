
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const TransformBusinessCTA = () => {
  console.log('TransformBusinessCTA component is rendering');
  
  const { t } = useLanguage();
  
  console.log('Language context loaded:', { t });
  
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('cta.title') || 'Transform Your Business Today'}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('cta.description') || 'Ready to revolutionize your business with AI? Let\'s discuss how we can help you achieve your goals.'}
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 shadow-xl hover:shadow-2xl border-0 rounded-full font-semibold hover:scale-105 transition-all duration-300">
            {t('cta.button') || 'Get Started Now'}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TransformBusinessCTA;
