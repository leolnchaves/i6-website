import { useLanguage } from '@/contexts/LanguageContext';
import { Cog, Database, BarChart3, Boxes } from 'lucide-react';
import i6signalDemo from '@/assets/images/i6signal-demo.png';

const SinaisSection = () => {
  const { language } = useLanguage();

  const copy = {
    pt: {
      badge: 'SINAIS',
      title: 'O que nossos motores\nenxergam antes de\ntodo mundo',
      subtitle: 'Inteligência preditiva que transforma dados em vantagem competitiva real.',
      capabilities: [
        { icon: Cog, text: 'Motores de IA proprietários com fine-tuning.' },
        { icon: Database, text: 'Base fundacional multi-segmentada.' },
        { icon: BarChart3, text: 'i6Signal, interface conversacional preditiva.' },
        { icon: Boxes, text: 'APIs de ativação imediata.' },
      ],
      popups: [
        'Previsão de sell-out superior à cobertura atual de estoque',
        'Aumento de volume recomendado sem impacto negativo em giro',
        'Mudança de sazonalidade antecipada para esta região',
        'SKU crítico com alta probabilidade de ruptura',
        'PDVs similares operam com mix mais eficiente',
        'Mix atual não acompanha o padrão de compra do PDV',
        'SKU com alta demanda prevista ausente no mix atual',
        'Oportunidade de pedido adicional com alto potencial de giro',
        'Aceleração de demanda detectada',
        'Substituição de SKUs sugerida para otimizar giro e margem',
      ],
    },
    en: {
      badge: 'SIGNALS',
      title: 'What our engines see\nbefore everyone else',
      subtitle: 'Predictive intelligence that turns data into real competitive advantage.',
      capabilities: [
        { icon: Cog, text: 'Proprietary AI engines with fine-tuning.' },
        { icon: Database, text: 'Multi-segmented foundational base.' },
        { icon: BarChart3, text: 'i6Signal, predictive conversational interface.' },
        { icon: Boxes, text: 'Instant activation APIs.' },
      ],
      popups: [
        'Sell-out forecast exceeds current stock coverage',
        'Volume increase recommended without negative turnover impact',
        'Seasonality shift anticipated for this region',
        'Critical SKU with high stockout probability',
        'Similar stores operate with more efficient mix',
        "Current mix doesn't match store purchase pattern",
        'High-demand SKU missing from current mix',
        'Additional order opportunity with high turnover potential',
        'Demand acceleration detected',
        'SKU substitution suggested to optimize turnover and margin',
      ],
    },
  }[language];

  // Popup positions around the GIF area (percentage-based)
  const popupPositions = [
    { top: '-8%', right: '-10%' },
    { top: '5%', right: '-35%' },
    { top: '25%', right: '-30%' },
    { top: '45%', right: '-35%' },
    { top: '65%', right: '-25%' },
    { bottom: '-5%', right: '-10%' },
    { bottom: '-12%', left: '10%' },
    { bottom: '-8%', left: '40%' },
    { top: '15%', left: '-20%' },
    { top: '50%', left: '-15%' },
  ];

  return (
    <section className="py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Badge */}
        <div className="mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#F4845F]/10 text-[#F4845F] text-xs font-bold tracking-widest uppercase">
            {copy.badge}
          </span>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Title + Subtitle + Capabilities */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight whitespace-pre-line mb-6">
              {copy.title}
            </h2>
            <p className="text-lg text-gray-500 mb-12 max-w-md">
              {copy.subtitle}
            </p>

            {/* Capabilities list */}
            <div className="space-y-0">
              {copy.capabilities.map((cap, i) => {
                const Icon = cap.icon;
                return (
                  <div
                    key={i}
                    className={`flex items-start gap-4 py-5 ${
                      i < copy.capabilities.length - 1 ? 'border-b border-gray-200' : ''
                    }`}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#F4845F]/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#F4845F]" />
                    </div>
                    <p className="text-gray-700 text-base leading-relaxed pt-2">
                      {cap.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: GIF + Popups */}
          <div className="relative flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
            {/* GIF/Image */}
            <div className="relative z-10 w-full max-w-md">
              <img
                src={i6signalDemo}
                alt="i6Signal Platform"
                className="w-full rounded-2xl shadow-2xl border border-gray-200"
              />
            </div>

            {/* Animated Popups */}
            {copy.popups.map((text, i) => (
              <div
                key={i}
                className="popup-insight absolute z-20 max-w-[200px] px-3 py-2 rounded-xl bg-white shadow-lg border border-[#F4845F]/20 text-xs text-gray-700 leading-snug"
                style={{
                  ...popupPositions[i],
                  animationDelay: `${i * 2}s`,
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#F4845F] inline-block mr-1.5 align-middle" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SinaisSection;
