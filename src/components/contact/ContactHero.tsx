
import React, { memo, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactHero = memo(() => {
  const { language } = useLanguage();
  
  const content = useMemo(() => ({
    pt: {
      title: "Hora de Colocar",
      subtitle: "Dados em ",
      highlight: "Movimento",
      description: "Converse com nossos especialistas e descubra onde\ndecisões preditivas podem gerar impacto imediato."
    },
    en: {
      title: "Time to Put",
      subtitle: "Data in ",
      highlight: "Movement",
      description: "Talk to our specialists and discover where\npredictive decisions can drive immediate impact."
    }
  }), []);

  const text = useMemo(() => content[language], [content, language]);

  return (
    <section className="w-full pt-32 pb-16 relative z-[10]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="block mb-2 text-white">
              {text.title}
            </span>
            <span className="block pb-2">
              <span className="text-white">{text.subtitle}</span>
              <span 
                className="text-[#F4845F]"
                style={{ textShadow: '0 0 30px rgba(244,132,95,0.3)' }}
              >
                {text.highlight}
              </span>
            </span>
          </h1>
          <p className="text-base sm:text-lg text-white/60 mb-8 leading-relaxed whitespace-pre-line">
            {text.description}
          </p>
        </div>
      </div>
    </section>
  );
});

ContactHero.displayName = 'ContactHero';

export default ContactHero;
