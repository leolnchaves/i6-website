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

      <div className="p-5 relative z-10">
        {/* Title */}
        <h3 className="font-bold text-lg text-white mb-2 leading-tight group-hover:text-[#F4845F] transition-colors duration-500">
          {title}
        </h3>

        {/* Description */}
        <p className="text-white/60 leading-relaxed text-xs mb-4 group-hover:text-white/70 transition-colors duration-300 line-clamp-3">
          {description}
        </p>

        {/* Features */}
        <div className="mb-3">
          <h4 className="text-xs font-semibold text-white/80 mb-1.5 flex items-center gap-1.5">
            <div className="w-1 h-3 bg-[#F4845F] rounded-full"></div>
            {t.keyFeatures}
          </h4>
          <div className="space-y-0.5">
            {displayedFeatures.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-1.5 py-1 px-1.5 rounded bg-white/5 border border-white/5">
                <div className="w-1 h-1 bg-[#F4845F] rounded-full mt-1.5 flex-shrink-0"></div>
                <span className="text-[11px] text-white/70 leading-snug">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Business Outcome */}
        <div className="relative">
          <h4 className="text-xs font-semibold text-white/80 mb-1.5 flex items-center gap-1.5">
            <div className="w-1 h-3 bg-[#F4845F] rounded-full"></div>
            {t.businessOutcome}
          </h4>
          <div className="relative p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-[#F4845F]/30 transition-all duration-500">
            <div className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-[#F4845F] mt-0.5 flex-shrink-0" />
              <p className="text-white/70 leading-snug text-xs flex-1">
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
