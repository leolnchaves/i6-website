
import React, { memo } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { successStoriesData } from '@/data/staticData/successStoriesData';
import { logger } from '@/utils/logger';

const SuccessStoriesCTA = memo(() => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  
  const ctaContent = successStoriesData[language]?.cta || successStoriesData.en.cta;

  const mobileButtonText = {
    pt: 'Pronto para transformar\ndados em lucro?',
    en: 'Ready to turn\ndata into profit?',
  };

  const buttonText = isMobile ? mobileButtonText[language] : ctaContent.buttonText;

  // Handle CTA button click with logging
  const handleCTAClick = () => {
    logger.info('Success Stories CTA button clicked', { section: 'success-stories' }, 'SuccessStoriesCTA');
  };

  return (
    <section className="py-20 bg-[#0B1224]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          {ctaContent.title}
        </h2>
        <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
          {ctaContent.description}
        </p>
        <Link 
          to="/contact#contact-form"
          onClick={handleCTAClick}
          className={`group inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border border-[#F4845F]/60 animate-glow-coral transition-all duration-500 ease-out hover:bg-[#F4845F] hover:border-[#F4845F] hover:shadow-[0_0_30px_rgba(244,132,95,0.5),0_0_60px_rgba(244,132,95,0.2)] ${isMobile ? 'whitespace-pre-line text-center' : ''}`}
        >
          {buttonText}
          <ArrowRight size={18} className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
});

SuccessStoriesCTA.displayName = 'SuccessStoriesCTA';

export default SuccessStoriesCTA;
