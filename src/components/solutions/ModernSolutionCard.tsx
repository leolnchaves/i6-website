import { memo, useMemo, useState, useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ModernSolutionCardProps {
  title: string;
  focus: string;
  description: string;
  features: string[];
  outcome: string;
  engine: string;
  bgColor: string;
  index: number;
}

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
  title, focus, description, features, outcome, engine, bgColor, index
}: ModernSolutionCardProps) => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const t = useMemo(() => translations[language] || translations.en, [language]);
  const displayedFeatures = useMemo(() => features, [features]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated) {
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
    <div 
      ref={cardRef}
      className={`group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-[#F4845F]/50 backdrop-blur-sm transition-all duration-700 hover:scale-[1.02] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Coral accent bar at top */}
      <div className="absolute top-0 left-0 w-0 h-1 bg-[#F4845F] group-hover:w-full transition-all duration-700 ease-out rounded-t-2xl" />

      <div className="p-8 relative z-10">
        {/* Title */}
        <div className="mb-6">
          <h3 className="font-bold text-2xl text-white mb-4 leading-tight group-hover:text-[#F4845F] transition-colors duration-500">
            {title}
          </h3>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-white/60 leading-relaxed text-sm group-hover:text-white/70 transition-colors duration-300">
            {description}
          </p>
        </div>

        {/* Features */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-white/80 mb-2 flex items-center gap-2">
            <div className="w-1 h-4 bg-[#F4845F] rounded-full"></div>
            {t.keyFeatures}
          </h4>
          <div className="space-y-1">
            {displayedFeatures.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300 border border-white/5">
                <div className="w-1.5 h-1.5 bg-[#F4845F] rounded-full mt-1.5 flex-shrink-0"></div>
                <span className="text-xs text-white/70 leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Business Outcome */}
        <div className="relative">
          <h4 className="text-sm font-semibold text-white/80 mb-3 flex items-center gap-2">
            <div className="w-1 h-4 bg-[#F4845F] rounded-full"></div>
            {t.businessOutcome}
          </h4>
          <div className="relative p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:border-[#F4845F]/30 transition-all duration-500">
            <div className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-[#F4845F] mt-0.5 flex-shrink-0" />
              <p className="text-white/70 leading-relaxed text-sm flex-1">
                {outcome}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ModernSolutionCard.displayName = 'ModernSolutionCard';

export default ModernSolutionCard;
