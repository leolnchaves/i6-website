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
      question: 'Dados parados são margem que vai direto para o concorrente.',
      stats: [
        { value: 89, label: 'das empresas não monetizam seus dados' },
        { value: 69, label: 'das empresas não usam dados para decisões estratégicas' },
        { value: 89, label: 'das empresas não personalizam experiências baseadas em comportamento' },
      ],
      narrativeBold: 'Dados parados não antecipam demanda, intenção ou valor.',
      narrativeRest: 'Quando comportamento, preço, estoque, canal, crédito e jornada não se movem em tempo real, empresas reagem tarde, perdem margem e deixam crescimento na mesa.',
      bullets: [
        { title: 'Demanda que chega tarde demais', desc: 'Você só percebe a mudança quando já virou ruptura, excesso ou compra errada.' },
        { title: 'Mix desalinhado com o cliente real', desc: 'Produto sobra onde não gira e falta onde o cliente queria comprar.' },
        { title: 'Conversão baixa por falta de influência', desc: 'A oferta chega para a pessoa errada, no momento errado ou sem contexto.' },
        { title: 'Campanhas por calendário, não por propensão', desc: 'O CRM dispara pela régua, não pelo momento real de compra.' },
        { title: 'Cross-sell e up-sell no tentativa e erro', desc: 'Ofertas genéricas desperdiçam valor em clientes com alto potencial.' },
        { title: 'Margem e esforço comercial sob pressão', desc: 'Vendas, preço e canais atuam sem saber onde está o maior impacto.' },
      ],
      bridge: 'Dados, sozinhos, não criam vantagem competitiva.\nO problema não é falta de dado, é falta de movimento.',
    },
    en: {
      question: 'Idle data is margin going straight to your competitor.',
      stats: [
        { value: 89, label: "of companies don't monetize their data" },
        { value: 69, label: "of companies don't use data for strategic decisions" },
        { value: 89, label: "of companies don't personalize experiences based on behavior" },
      ],
      narrativeBold: "Idle data doesn't anticipate demand, intent or value.",
      narrativeRest: "When behavior, price, inventory, channel, credit and journey don't move in real time, companies react late, lose margin and leave growth on the table.",
      bullets: [
        { title: 'Demand that arrives too late', desc: 'You only notice the change once it has already turned into stockout, excess or the wrong purchase.' },
        { title: 'Mix misaligned with the real customer', desc: 'Products pile up where they don\'t sell and run out where customers wanted to buy.' },
        { title: 'Low conversion due to lack of relevance', desc: 'The offer reaches the wrong person, at the wrong moment or without context.' },
        { title: 'Calendar-driven campaigns, not propensity-driven', desc: 'The CRM fires by the calendar, not by the real moment to buy.' },
        { title: 'Cross-sell and up-sell by trial and error', desc: 'Generic offers waste value on high-potential customers.' },
        { title: 'Margin and commercial effort under pressure', desc: 'Sales, pricing and channels act without knowing where the biggest impact is.' },
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
          <div className="space-y-3">
            {copy.stats.map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center lg:items-start gap-1 bg-gray-50 rounded-xl p-3 border border-gray-100"
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
            <p className="text-sm md:text-base text-[#0F172A]/70 mb-4">
              <strong className="text-[#0B1224]">{copy.narrativeBold}</strong>{' '}
              {copy.narrativeRest}
            </p>
            <ul className="space-y-1">
              {copy.bullets.map((b, i) => (
                <li key={i} className="pl-3 border-l-[3px] border-[#F4845F] bg-[#F4845F]/5 rounded-r-lg py-1 pr-2">
                  <p className="text-xs md:text-sm leading-snug">
                    <span className="font-bold text-[#F4845F]">{b.title}:</span>{' '}
                    <span className="text-[#0F172A]/70">{b.desc}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bridge text - centered */}
        <p className="mt-8 text-base md:text-lg text-[#0F172A]/80 max-w-2xl mx-auto leading-relaxed text-center">
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
