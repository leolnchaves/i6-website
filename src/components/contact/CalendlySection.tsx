
import React, { memo, useMemo, useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const CalendlySection = memo(() => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
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
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);
  
  const content = useMemo(() => ({
    pt: {
      title: "Converse com um Especialista em Inteligência Preditiva",
      description: "Vamos discutir como nossa IA pode transformar seu negócio"
    },
    en: {
      title: "Sometimes a quick chat is all it takes.",
      description: "Let's cut to the chase: schedule a session with our experts now!"
    }
  }), []);

  const text = useMemo(() => content[language], [language]);

  return (
    <Card ref={containerRef} className="border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-4 text-white">
            {text.title}
          </h3>
          <p className="text-lg text-white/60 mb-6">
            {text.description}
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-4">
          {isVisible ? (
            <iframe
              src="https://calendly.com/leo-infinity6/get-to-know-infinity6"
              width="100%"
              height="600"
              frameBorder="0"
              title="Schedule a meeting"
              className="rounded-lg"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-600">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-sm">Loading calendar...</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

CalendlySection.displayName = 'CalendlySection';

export default CalendlySection;
