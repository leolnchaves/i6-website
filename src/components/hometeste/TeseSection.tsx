import { useEffect, useRef, useState } from 'react';
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
    <span ref={elementRef} className="text-2xl sm:text-3xl font-bold text-[#F4845F]">
      {value}{suffix}
    </span>
  );
};

const ArrowConnector = () => {
  const { isVisible, elementRef } = useIntersectionObserver({ threshold: 0.3 });

  return (
    <div ref={elementRef} className="flex items-center justify-center">
      {/* Desktop: horizontal arrow */}
      <svg
        className="hidden lg:block w-16 h-32"
        viewBox="0 0 64 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="arrowGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F4845F" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F4845F" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          d="M8 64 L44 64"
          stroke="url(#arrowGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={isVisible ? "0" : "40"}
          strokeDashoffset={isVisible ? "0" : "40"}
          style={{
            transition: 'stroke-dasharray 1s ease-out 0.5s, stroke-dashoffset 1s ease-out 0.5s',
          }}
        />
        <path
          d="M38 54 L50 64 L38 74"
          stroke="#F4845F"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity={isVisible ? 1 : 0}
          style={{ transition: 'opacity 0.4s ease-out 1.3s' }}
        />
      </svg>

      {/* Mobile: vertical arrow */}
      <svg
        className="block lg:hidden w-32 h-16"
        viewBox="0 0 128 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="arrowGradientV" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F4845F" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F4845F" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          d="M64 8 L64 44"
          stroke="url(#arrowGradientV)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={isVisible ? "0" : "40"}
          strokeDashoffset={isVisible ? "0" : "40"}
          style={{
            transition: 'stroke-dasharray 1s ease-out 0.5s, stroke-dashoffset 1s ease-out 0.5s',
          }}
        />
        <path
          d="M54 38 L64 50 L74 38"
          stroke="#F4845F"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity={isVisible ? 1 : 0}
          style={{ transition: 'opacity 0.4s ease-out 1.3s' }}
        />
      </svg>
    </div>
  );
};

const TeseSection = () => {
  const { language } = useLanguage();

  const copy = {
    pt: {
      question: 'Seus dados geram vantagem competitiva\nou só alimentam dashboards?',
      stats: [
        { value: 11, label: 'da receita vem de monetização de dados' },
        { value: 31, label: 'das empresas usam dados para decisões estratégicas' },
        { value: 11, label: 'das marcas personalizam experiências com dados' },
      ],
      narrative: 'Dados parados não são neutros. São caros. A incapacidade de antecipar movimentos transforma informação em custo e gera ineficiências que drenam sua margem.',
      bullets: [
        { title: 'Ruptura e Miopia de Mix', desc: 'O custo de ter o produto certo no lugar errado, ou um sortimento desalinhado com o comportamento real de consumo.' },
        { title: 'Inacurácia de Demanda', desc: 'Produção baseada no "retrovisor", gerando excessos de estoque ou perdas críticas de oportunidade por falta de visão antecipada.' },
        { title: 'Margem sob Pressão', desc: 'Precificação puramente reativa e descontos agressivos para desovar o que a falta de previsão acumulou.' },
        { title: 'Ineficiência Comercial', desc: 'Esforço de vendas disperso em PDVs de baixa propensão, enquanto janelas de oportunidade real se fecham sem ativação.' },
      ],
      bridge: 'Dados, sozinhos, não criam vantagem competitiva.\nO problema não é falta de dado, é falta de movimento.',
    },
    en: {
      question: 'Does your data drive competitive advantage\nor just feed dashboards?',
      stats: [
        { value: 11, label: 'of revenue comes from data monetization' },
        { value: 31, label: 'of companies use data for strategic decisions' },
        { value: 11, label: 'of brands personalize experiences with data' },
      ],
      narrative: "Idle data isn't neutral. It's expensive. The inability to anticipate movements turns information into cost and creates inefficiencies that drain your margin.",
      bullets: [
        { title: 'Stockouts & Mix Myopia', desc: 'The cost of having the right product in the wrong place, or an assortment misaligned with actual consumer behavior.' },
        { title: 'Demand Inaccuracy', desc: 'Production based on the rearview mirror, generating excess inventory or critical missed opportunities due to lack of forward vision.' },
        { title: 'Margin Under Pressure', desc: 'Purely reactive pricing and aggressive discounts to offload what poor forecasting accumulated.' },
        { title: 'Commercial Inefficiency', desc: 'Sales effort scattered across low-propensity stores, while real opportunity windows close without activation.' },
      ],
      bridge: "Data alone doesn't create competitive advantage.\nThe problem isn't lack of data — it's lack of movement.",
    },
  }[language];

  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Title - centered */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0B1224] leading-snug whitespace-pre-line text-center">
          {copy.question}
        </h2>

        {/* Side-by-side: indicators left | arrow | consequences right */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[280px_auto_1fr] items-center gap-8 lg:gap-6">
          {/* LEFT: Indicators */}
          <div className="space-y-6">
            {copy.stats.map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center lg:items-start gap-1 bg-gray-50 rounded-xl p-4 border border-gray-100"
              >
                <AnimatedCounter target={s.value} />
                <p className="text-sm text-[#0F172A]/60">{s.label}</p>
              </div>
            ))}
          </div>

          {/* CENTER: Arrow connector */}
          <ArrowConnector />

          {/* RIGHT: Consequences */}
          <div className="text-left">
            <p className="text-base md:text-lg text-[#0F172A]/70 mb-6">
              {copy.narrative}
            </p>
            <ul className="space-y-3">
              {copy.bullets.map((b, i) => (
                <li key={i} className="pl-4 border-l-[3px] border-[#F4845F] bg-[#F4845F]/5 rounded-r-lg py-3 pr-4">
                  <p className="text-sm md:text-base">
                    <span className="font-bold text-[#F4845F]">{b.title}:</span>{' '}
                    <span className="text-[#0F172A]/70">{b.desc}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bridge text - centered */}
        <p className="mt-16 text-lg md:text-xl text-[#0F172A]/80 max-w-2xl mx-auto leading-relaxed text-center">
          {copy.bridge.split('\n')[0]}
          <br />
          <span className="text-[#F4845F]">
            {copy.bridge.split('\n')[1]?.split(/(é falta de movimento|it's lack of movement)/i).map((part, i) =>
              /é falta de movimento|it's lack of movement/i.test(part) ? (
                <span key={i} className="font-bold relative">
                  <span className="absolute inset-0 blur-md bg-[#F4845F]/25 rounded-lg" aria-hidden="true" />
                  <span className="relative">{part}</span>
                </span>
              ) : <span key={i}>{part}</span>
            )}
          </span>
        </p>
      </div>
    </section>
  );
};

export default TeseSection;
