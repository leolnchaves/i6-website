import React, { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect, useRef } from 'react';

const SolutionsMetricsSection = memo(() => {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const solutionsMetrics = {
    en: [
      "Specialist AI",
      "Frictionless integration",
      "Low technical lift",
      "API-first",
      "Cloud-native",
      "Explainable recommendations",
      "Results in few weeks"
    ],
    pt: [
      "IA aplicada",
      "Integração sem fricção",
      "Baixo tech lift",
      "API-first",
      "Cloud-native",
      "Recomendações explicáveis",
      "Resultados em semanas"
    ]
  };
  
  const metricsContent = solutionsMetrics[language] || solutionsMetrics.en;
  const metrics = metricsContent.map((text: string) => ({ text }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0].isIntersecting;
        
        if (isVisibleRef.current && metrics.length > 1) {
          if (autoplayRef.current) clearInterval(autoplayRef.current);
          autoplayRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % metrics.length);
          }, 3000);
        } else {
          if (autoplayRef.current) {
            clearInterval(autoplayRef.current);
            autoplayRef.current = null;
          }
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [metrics.length]);

  return (
    <section ref={containerRef} className="w-full bg-transparent py-10 md:py-14 relative flex flex-col justify-center">

      <div className="container mx-auto px-4 flex items-center justify-center relative z-10">
        <div className="relative py-2 flex items-center justify-center">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 text-center"
              >
                 <div className={`transition-all duration-700 ${
                   index === currentSlide ? 'opacity-100 scale-100' : 'opacity-40 scale-95'
                 }`}>
                   <div className="text-2xl md:text-3xl lg:text-4xl font-extralight tracking-tight text-center">
                     <span 
                       className="bg-gradient-to-r from-white via-white/80 to-white bg-clip-text text-transparent"
                       style={index === currentSlide ? { textShadow: '0 0 30px rgba(244,132,95,0.2)' } : undefined}
                     >
                       {metric.text}
                     </span>
                   </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

SolutionsMetricsSection.displayName = 'SolutionsMetricsSection';

export default SolutionsMetricsSection;
