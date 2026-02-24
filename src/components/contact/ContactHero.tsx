
import React, { memo, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactHero = memo(() => {
  const { language } = useLanguage();
  
  const content = useMemo(() => ({
    pt: {
      title: "Vamos Colocar Dados em",
      subtitle: "Movimento",
      description: "Descubra onde decisões preditivas podem gerar impacto real no seu negócio."
    },
    en: {
      title: "Let's Put Data in",
      subtitle: "Movement",
      description: "Discover where predictive decisions can drive real impact in your business."
    }
  }), []);

  const text = useMemo(() => content[language], [content, language]);

  return (
    <section className="w-full pt-32 pb-16 relative z-[10]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block mb-2 text-white">
              {text.title}
            </span>
            <span 
              className="block text-[#F4845F] pb-2"
              style={{ textShadow: '0 0 30px rgba(244,132,95,0.3)' }}
            >
              {text.subtitle}
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/60 mb-8 leading-relaxed">
            {text.description}
          </p>
        </div>
      </div>
    </section>
  );
});

ContactHero.displayName = 'ContactHero';

export default ContactHero;
