
import React, { memo, useState, useRef, useEffect, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import heroBg from '@/assets/images/hero-bg.jpg';

const ContactHero = memo(() => {
  const { language } = useLanguage();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Intersection Observer for viewport detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Preload background image
  useEffect(() => {
    if (isVisible) {
      const img = new Image();
      img.onload = () => setIsImageLoaded(true);
      img.src = heroBg;
    }
  }, [isVisible]);
  
  // Static content - memoized for stability
  const content = useMemo(() => ({
    pt: {
      title: "Vamos Iniciar uma",
      subtitle: "Conversa", 
      description: "Sua jornada de IA começa aqui!"
    },
    en: {
      title: "Let's Start a",
      subtitle: "Conversation",
      description: "Your AI journey starts here!"
    }
  }), []);

  // Automatically uses current language from context - memoized
  const text = useMemo(() => content[language], [content, language]);

  return (
    <section ref={containerRef} className="w-full min-h-[70vh] flex items-center pt-20 relative overflow-hidden">
      {/* Background image with blur - lazy loaded */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
        style={{ 
          backgroundImage: isImageLoaded ? `url(${heroBg})` : 'none',
          filter: 'blur(10px)',
          opacity: isImageLoaded ? 1 : 0
        }}
      ></div>
      
      {/* Loading placeholder */}
      {!isImageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-slate-800/40"></div>
      )}
      
      {/* Minimal grid pattern overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:40px_40px] opacity-30"></div>
      </div>
      
      {/* Darker overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-slate-800/40"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
            <span className="block mb-2">
              {text.title}
            </span>
            <span className="block bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent pb-2">
              {text.subtitle}
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 drop-shadow-lg leading-relaxed">
            {text.description}
          </p>
        </div>
      </div>
    </section>
  );
});

ContactHero.displayName = 'ContactHero';

export default ContactHero;
