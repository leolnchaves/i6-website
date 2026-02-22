import { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const AnimatedCounter = ({ target, suffix = '%' }: { target: number; suffix?: string }) => {
  const [value, setValue] = useState(0);
  const { isVisible, elementRef } = useIntersectionObserver({ threshold: 0.3 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;
    const start = performance.now();
    const duration = 1800;
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, target]);

  return (
    <span ref={elementRef} className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#F4845F]">
      {value}{suffix}
    </span>
  );
};

const TeseSection = () => {
  const { language } = useLanguage();

  const copy = {
    pt: {
      question: 'Seus dados geram vantagem competitiva\nou só alimentam dashboards?',
      stats: [
        { value: 31, label: 'das empresas não usam IA preditiva' },
        { value: 11, label: 'das campanhas atingem o público certo' },
        { value: 11, label: 'dos estoques são otimizados por dados' },
      ],
      bridge: 'Resultado aparece quando dados começam a antecipar — não apenas registrar.',
      poke: 'Não é culpa sua. Mas continuar assim é uma escolha.',
    },
    en: {
      question: 'Does your data drive competitive advantage\nor just feed dashboards?',
      stats: [
        { value: 31, label: "of companies don't use predictive AI" },
        { value: 11, label: 'of campaigns reach the right audience' },
        { value: 11, label: 'of inventories are data-optimized' },
      ],
      bridge: 'Results come when data starts anticipating — not just recording.',
      poke: "It's not your fault. But staying this way is a choice.",
    },
  }[language];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-5xl text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B1224] leading-snug whitespace-pre-line">
          {copy.question}
        </h2>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-12">
          {copy.stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <AnimatedCounter target={s.value} />
              <p className="text-sm text-[#0F172A]/60 max-w-[200px]">{s.label}</p>
            </div>
          ))}
        </div>

        <p className="mt-16 text-lg md:text-xl text-[#0F172A]/80 max-w-2xl mx-auto leading-relaxed">
          {copy.bridge}
        </p>
        <p className="mt-4 text-base text-[#F4845F] font-medium italic">
          {copy.poke}
        </p>
      </div>
    </section>
  );
};

export default TeseSection;
