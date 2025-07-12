
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSuccessStoriesContent } from '@/hooks/useSuccessStoriesContent';
import { useState, useEffect, useRef } from 'react';

const MetricsSection = () => {
  const { language } = useLanguage();
  const { getMetricsContent, loading } = useSuccessStoriesContent(language);
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  
  const metricsContent = getMetricsContent();

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
    }
  ];

  // Autoplay functionality
  useEffect(() => {
    if (metrics.length > 1) {
      autoplayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % metrics.length);
      }, 3000);

      return () => {
        if (autoplayRef.current) {
          clearInterval(autoplayRef.current);
        }
      };
    }
  }, [metrics.length]);

  if (loading) {
    return (
      <section className="w-full bg-gradient-to-b from-blue-900/90 to-slate-900/95 backdrop-blur-sm py-8 overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="text-center py-6">
            <div className="h-16 bg-white/10 rounded mb-2 mx-auto w-32 animate-pulse" />
            <div className="h-6 bg-white/5 rounded mx-auto w-48 animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-gradient-to-b from-blue-900/90 to-slate-900/95 backdrop-blur-sm py-12 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="relative py-8 flex items-center justify-center">
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
                  <div className="text-4xl md:text-5xl font-light text-white mb-2 tracking-tight">
                    <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent animate-pulse">
                      {metric.value}
                    </span>
                  </div>
                  
                  {/* Label */}
                  <div className="text-slate-300 text-base md:text-lg font-light tracking-wide opacity-90">
                    {metric.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll arrow at bottom - positioned below text */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
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
};

export default MetricsSection;
