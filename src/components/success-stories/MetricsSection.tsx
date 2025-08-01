
import React, { useState, useEffect, useRef, memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { successStoriesData } from '@/data/staticData/successStoriesData';

const MetricsSection = memo(() => {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const metricsContent = successStoriesData[language]?.metrics || successStoriesData.en.metrics;

  const metrics = [
    { 
      value: metricsContent.avgROI, 
      label: metricsContent.avgROILabel
    },
    { 
      value: metricsContent.companiesServed, 
      label: metricsContent.companiesServedLabel
    },
    { 
      value: metricsContent.costSavings, 
      label: metricsContent.costSavingsLabel
    },
    { 
      value: metricsContent.avgTicketIncrease, 
      label: metricsContent.avgTicketIncreaseLabel
    }
  ];

  // Intersection Observer para performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Autoplay functionality - apenas quando visível
  useEffect(() => {
    if (metrics.length > 1 && isVisible) {
      autoplayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % metrics.length);
      }, 3000);
    } else {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
  }, [metrics.length, isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-gradient-to-b from-slate-200/80 to-gray-300/90 backdrop-blur-sm py-4 overflow-hidden relative min-h-[25.2vh] flex flex-col justify-center"
    >
      <div className="container mx-auto px-4 flex-1 flex items-center justify-center">
        <div className="relative py-2 flex items-center justify-center">
          {/* Sliding metrics */}
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
                  {/* Value with subtle glow effect */}
                  <div className="text-4xl md:text-5xl font-light text-slate-800 mb-1 tracking-tight">
                    <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                      {metric.value}
                    </span>
                  </div>
                  
                  {/* Label */}
                  <div className="text-slate-600 text-base md:text-lg font-light tracking-wide opacity-90">
                    {metric.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modern scroll indicator - identical to Hero section */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="relative group">
          {/* Glowing circle background */}
          <div className="w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-sm opacity-50"></div>
            {/* Modern chevron down icon */}
            <svg className="w-5 h-5 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
});

MetricsSection.displayName = 'MetricsSection';

export default MetricsSection;
