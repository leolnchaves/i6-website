import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, Eye, DollarSign, Target, UserX, Zap, Cog, Database, BarChart3, Boxes } from 'lucide-react';
import { getPublicAssetUrl } from '@/utils/assetUtils';

const signalIcons = [TrendingUp, Eye, DollarSign, Target, UserX, Zap];

const capabilityIcons = [Cog, Database, BarChart3, Boxes];

const SinaisSection = () => {
  const { language } = useLanguage();

  const copy = {
    pt: {
      badge: 'SINAIS',
      title: 'Somos especialistas em aplicar IA para transformar dados em decisões que geram resultado.',
      subtitle: 'Detectamos sinais que orientam decisões comerciais, de supply e de pricing.',
      capabilities: [
        'Motores de IA proprietários com fine-tuning.',
        'Base fundacional multi-segmentada.',
        'i6Signal, interface conversacional preditiva.',
        'APIs de ativação imediata.',
      ],
      cards: [
        'Antecipe ruptura de estoque antes que ela custe receita',
        'Detecte intenção de compra antes do clique',
        'Ajuste preço ao movimento real do mercado',
        'Priorize esforço comercial onde o retorno é maior',
        'Preveja churn antes da perda',
        'Antecipe janelas ideais de ativação',
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
      title: 'We specialize in applying AI to transform data into decisions that drive results.',
      subtitle: 'We detect signals that guide commercial, supply, and pricing decisions.',
      capabilities: [
        'Proprietary AI engines with fine-tuning.',
        'Multi-segmented foundational base.',
        'i6Signal, predictive conversational interface.',
        'Instant activation APIs.',
      ],
      cards: [
        'Anticipate stockouts before they cost revenue',
        'Detect purchase intent before the click',
        'Adjust pricing to real market movement',
        'Focus sales effort where ROI is highest',
        'Predict churn before the loss',
        'Anticipate ideal activation windows',
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

  // Popup positions around the GIF area (right side and below)
  const popupPositions = [
    { top: '-8%', right: '-35%', maxWidth: '200px' },
    { top: '12%', right: '-40%', maxWidth: '210px' },
    { top: '35%', right: '-38%', maxWidth: '190px' },
    { top: '58%', right: '-35%', maxWidth: '205px' },
    { top: '80%', right: '-30%', maxWidth: '195px' },
    { bottom: '-18%', left: '5%', maxWidth: '200px' },
    { bottom: '-18%', left: '30%', maxWidth: '210px' },
    { bottom: '-18%', right: '20%', maxWidth: '190px' },
    { top: '5%', left: '-30%', maxWidth: '195px' },
    { top: '50%', left: '-32%', maxWidth: '200px' },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#0F172A]">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Badge */}
        <div className="mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#F4845F]/20 text-[#F4845F] text-xs font-semibold tracking-widest uppercase">
            {copy.badge}
          </span>
        </div>

        {/* Title + Subtitle */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug max-w-3xl mb-4">
          {copy.title}
        </h2>
        <p className="text-white/50 text-base md:text-lg max-w-2xl mb-12">
          {copy.subtitle}
        </p>

        {/* 6 signal cards - right after title */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {copy.cards.map((text, i) => {
            const Icon = signalIcons[i];
            return (
              <div
                key={i}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#F4845F]/50 transition-all duration-300 hover:shadow-[0_0_24px_rgba(244,132,95,0.12)]"
              >
                <Icon className="w-7 h-7 text-[#F4845F] mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-white/80 text-sm leading-relaxed">{text}</p>
              </div>
            );
          })}
        </div>

        {/* Two-column: Capabilities + GIF with popups */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Capabilities */}
          <div className="space-y-0">
            {copy.capabilities.map((text, i) => {
              const Icon = capabilityIcons[i];
              return (
                <div
                  key={i}
                  className={`flex items-start gap-4 py-5 ${i < copy.capabilities.length - 1 ? 'border-b border-white/10' : ''}`}
                >
                  <Icon className="w-6 h-6 text-[#F4845F] mt-0.5 flex-shrink-0" />
                  <p className="text-white/80 text-sm md:text-base leading-relaxed">{text}</p>
                </div>
              );
            })}
          </div>

          {/* Right: GIF + Popups */}
          <div className="relative flex justify-center overflow-hidden lg:overflow-visible">
            {/* Glow behind GIF */}
            <div className="absolute inset-0 bg-[#F4845F]/5 rounded-2xl blur-3xl scale-110" />

            {/* GIF */}
            <img
              src={getPublicAssetUrl('images/i6signal-demo.gif')}
              alt="i6Signal demo"
              className="relative z-10 w-full max-w-xl rounded-xl shadow-2xl border border-white/10"
            />

            {/* Animated popups - hidden on mobile */}
            <div className="hidden lg:block">
              {copy.popups.slice(0, 7).map((text, i) => {
                const rotations = ['-2deg', '1.5deg', '-1deg', '2deg', '-1.5deg', '0.5deg', '-0.5deg'];
                const positions = [
                  { top: '2%', right: '2%' },
                  { top: '18%', left: '5%' },
                  { top: '35%', right: '0%' },
                  { top: '52%', left: '2%' },
                  { top: '68%', right: '5%' },
                  { bottom: '8%', left: '8%' },
                  { bottom: '2%', right: '10%' },
                ];
                return (
                  <div
                    key={i}
                    className="absolute z-20 px-4 py-2.5 rounded-lg bg-[#0F172A]/90 border border-[#F4845F]/40 shadow-lg backdrop-blur-sm max-w-[260px]"
                    style={{
                      ...positions[i],
                      transform: `rotate(${rotations[i]})`,
                      animation: `popup-cycle 20s ${i * 2.5}s infinite ease-in-out`,
                      opacity: 0,
                    }}
                  >
                    <p className="text-white/90 text-xs leading-snug">
                      {text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SinaisSection;
