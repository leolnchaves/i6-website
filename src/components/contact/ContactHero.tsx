
import React, { memo, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactHero = memo(() => {
  const { language } = useLanguage();

  const content = useMemo(() => ({
    pt: {
      prefix: "Decida",
      highlight: "antes",
      suffix: "do mercado.",
      description: "Fale com nosso time sobre antecipar demanda, proteger margem, acelerar giro e aumentar conversão."
    },
    en: {
      prefix: "Decide",
      highlight: "before",
      suffix: "the market does.",
      description: "Talk to our team about anticipating demand, protecting margin, accelerating turnover and increasing conversion."
    }
  }), []);

  const text = useMemo(() => content[language], [content, language]);

  return (
    <section className="w-full pt-28 pb-6 relative z-[10]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
            {text.prefix}{' '}
            <span
              className="text-[#F4845F]"
              style={{ textShadow: '0 0 30px rgba(244,132,95,0.3)' }}
            >
              {text.highlight}
            </span>{' '}
            {text.suffix}
          </h1>
          <p className="text-base sm:text-lg text-white/60 max-w-5xl mx-auto leading-relaxed">
            {text.description}
          </p>
        </div>
      </div>
    </section>
  );
});

ContactHero.displayName = 'ContactHero';

export default ContactHero;
