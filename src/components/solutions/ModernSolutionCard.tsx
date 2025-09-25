import { memo, useMemo, useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon, Target, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ModernSolutionCardProps {
  icon: LucideIcon | string; // Can be Lucide icon or image path
  title: string;
  focus: string;
  description: string;
  features: string[];
  outcome: string;
  engine: string;
  bgColor: string;
  index: number;
}

// Memoized translations outside component to prevent recreation
const translations = {
  en: {
    overview: 'Overview',
    keyFeatures: 'Key Features',
    additionalFeatures: 'more features',
    businessOutcome: 'Expected Results'
  },
  pt: {
    overview: 'Visão Geral',
    keyFeatures: 'Características Principais',
    additionalFeatures: 'mais características',
    businessOutcome: 'Resultados Esperados'
  }
};

const ModernSolutionCard = memo(({ 
  icon, 
  title,
  focus, 
  description, 
  features, 
  outcome, 
  engine, 
  bgColor, 
  index
}: ModernSolutionCardProps) => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Memoize translations to prevent recalculation
  const t = useMemo(() => translations[language] || translations.en, [language]);
  
  // Show all features
  const displayedFeatures = useMemo(() => features, [features]);
  
  // Intersection Observer for performance-optimized animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated) {
          // Add staggered animation delay based on index
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, index * 150);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index, hasAnimated]);

  return (
    <Card 
      ref={cardRef}
      className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-700 hover:scale-[1.02] bg-white/95 backdrop-blur-sm rounded-3xl ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ 
        animationDelay: `${index * 0.15}s`,
        boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 2px 10px -2px rgba(0, 0, 0, 0.04)'
      }}
    >
      {/* Soft gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-orange-50/20 opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-6 right-6 w-3 h-3 bg-gradient-to-br from-blue-400/20 to-orange-400/20 rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
      <div className="absolute bottom-8 left-8 w-2 h-2 bg-gradient-to-br from-orange-400/20 to-blue-400/20 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500" />

      <CardContent className="p-8 relative z-10">
        {/* Header Section - Large icon on right, titles on left */}
        <div className="flex items-start justify-between mb-8">
          {/* Left side - Titles */}
          <div className="flex-1 pr-4">
            <h3 className="font-bold text-2xl text-gray-900 mb-2 leading-tight">
              {title}
            </h3>
            <p className="text-orange-500 font-medium text-sm tracking-wide">
              {focus}
            </p>
          </div>
          
          {/* Right side - Large Icon or Image */}
          <div className="relative group-hover:scale-105 transition-transform duration-500">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl flex items-center justify-center border border-gray-200/40 shadow-sm group-hover:shadow-md transition-all duration-500">
              {typeof icon === 'string' ? (
                <img 
                  src={icon} 
                  alt={`${title} icon`}
                  className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                (() => {
                  const IconComponent = icon as LucideIcon;
                  return <IconComponent className="w-10 h-10 text-gray-500 group-hover:text-gray-700 transition-colors duration-300" />;
                })()
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-600 leading-relaxed text-sm group-hover:text-gray-700 transition-colors duration-300">
            {description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-orange-500 rounded-full"></div>
            {t.keyFeatures}
          </h4>
          <div className="space-y-2">
            {displayedFeatures.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/80 hover:bg-gray-100/60 transition-colors duration-300 border border-gray-100/50">
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-gray-700 leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Business Outcome */}
        <div className="relative">
          <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-orange-500 rounded-full"></div>
            {t.businessOutcome}
          </h4>
          <div className="relative p-4 bg-gradient-to-br from-blue-50/40 to-orange-50/30 rounded-2xl border border-gray-200/30 backdrop-blur-sm group-hover:shadow-sm transition-all duration-500">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700 leading-relaxed text-sm flex-1">
                {outcome}
              </p>
              <ArrowRight className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-orange-500 group-hover:w-24 transition-all duration-700 rounded-t-full" />
      </CardContent>
    </Card>
  );
});

ModernSolutionCard.displayName = 'ModernSolutionCard';

export default ModernSolutionCard;