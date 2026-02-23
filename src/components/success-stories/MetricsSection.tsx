
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
    { value: metricsContent.avgROI, label: metricsContent.avgROILabel },
    { value: metricsContent.companiesServed, label: metricsContent.companiesServedLabel },
    { value: metricsContent.costSavings, label: metricsContent.costSavingsLabel },
    { value: metricsContent.avgTicketIncrease, label: metricsContent.avgTicketIncreaseLabel },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (metrics.length > 1 && isVisible) {
      autoplayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % metrics.length);
      }, 3000);
    } else if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [metrics.length, isVisible]);

  return (
    <section
      ref={sectionRef}
      className="w-full py-10 overflow-hidden relative"
    >
      <div className="container mx-auto px-4 flex items-center justify-center">
        <div className="relative py-2 flex items-center justify-center">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {metrics.map((metric, index) => (
              <div key={index} className="w-full flex-shrink-0 text-center">
                <div
                  className={`transition-all duration-700 ${
                    index === currentSlide ? 'opacity-100 scale-100' : 'opacity-40 scale-95'
                  }`}
                >
                  <div
                    className="text-4xl md:text-5xl font-light mb-1 tracking-tight"
                    style={{ color: '#F4845F', textShadow: '0 0 30px rgba(244,132,95,0.3)' }}
                  >
                    {metric.value}
                  </div>
                  <div className="text-white/60 text-base md:text-lg font-light tracking-wide">
                    {metric.label}
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

MetricsSection.displayName = 'MetricsSection';

export default MetricsSection;
