import React, { useState, useRef, useEffect, memo } from 'react';

interface InViewSectionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  onInView?: () => void;
}

const InViewSection: React.FC<InViewSectionProps> = memo(({ 
  children, 
  className = '', 
  threshold = 0.1, 
  rootMargin = '50px',
  onInView 
}) => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
          onInView?.();
          // Não desconectamos para permitir re-entrada se necessário
        }
      },
      { 
        threshold,
        rootMargin
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, isInView, onInView]);

  return (
    <section ref={sectionRef} className={className}>
      {isInView ? children : (
        // Skeleton placeholder mantendo o mesmo layout
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg shadow-sm h-96 animate-pulse">
                <div className="p-6">
                  <div className="w-full h-32 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-20"></div>
                  <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="h-16 bg-gray-200 rounded-lg"></div>
                    <div className="h-16 bg-gray-200 rounded-lg"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-32 ml-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
});

InViewSection.displayName = 'InViewSection';

export default InViewSection;