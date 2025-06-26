
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const SuccessStoriesCTA = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl font-bold mb-6">
          {t('successStories.cta.title')}
        </h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          {t('successStories.cta.description')}
        </p>
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300">
          {t('successStories.cta.button')}
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};

export default SuccessStoriesCTA;
