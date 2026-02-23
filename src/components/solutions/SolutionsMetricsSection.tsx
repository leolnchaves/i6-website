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
    <section ref={containerRef} className="w-full bg-transparent py-10 md:py-14 overflow-hidden relative flex flex-col justify-center">
      {/* Mini ondas de transição - continuidade visual com o hero */}
      <div className="absolute top-0 left-0 w-full h-[60px] pointer-events-none z-0">
        <svg
          viewBox="0 0 1400 60"
          preserveAspectRatio="none"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 L0,15 C50,25 100,5 150,15 C200,25 250,5 300,15 C350,25 400,5 450,15 C500,25 550,5 600,15 C650,25 700,5 750,15 C800,25 850,5 900,15 C950,25 1000,5 1050,15 C1100,25 1150,5 1200,15 C1250,25 1300,5 1350,15 L1400,10 L1400,0 Z"
            fill="rgba(244,132,95,0.07)"
            className="animate-[wave-horizontal-2_9s_ease-in-out_infinite]"
          />
          <path
            d="M0,0 L0,10 C40,20 80,0 120,10 C160,20 200,0 240,10 C280,20 320,0 360,10 C400,20 440,0 480,10 C520,20 560,0 600,10 C640,20 680,0 720,10 C760,20 800,0 840,10 C880,20 920,0 960,10 C1000,20 1040,0 1080,10 C1120,20 1160,0 1200,10 C1240,20 1280,0 1320,10 C1360,20 1400,5 1400,5 L1400,0 Z"
            fill="rgba(244,132,95,0.12)"
            className="animate-[wave-horizontal-3_11s_ease-in-out_infinite]"
          />
        </svg>
      </div>

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
