import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, Eye, DollarSign, Target, UserX, Zap, Cog, Database, BarChart3, Boxes } from 'lucide-react';
import { getPublicAssetUrl } from '@/utils/assetUtils';

const signalIcons = [TrendingUp, Eye, DollarSign, Target, UserX, Zap];

const capabilityIcons = [Cog, Database, Boxes];

const SinaisSection = () => {
  const { language } = useLanguage();

  const copy = {
    pt: {
      badge: 'SINAIS',
      titleLine1Start: 'Somos especialistas em ',
      titleLine1Highlight: 'IA aplicada',
      titleLine2: 'que transforma dados em decisões antecipadas.',
      subtitle: 'Detectamos sinais que orientam decisões comerciais, de supply e de pricing.',
      i6signal: 'i6Signal\nInterface conversacional que transforma sinais preditivos em decisões acionáveis em tempo real.',
      capabilities: [
        'Motores de IA proprietários com fine-tuning.',
        'Base fundacional multi-segmentada.',
        'APIs de ativação imediata.',
      ],
      cards: [
        'Antecipe ruptura de estoque antes que ela custe receita',
        'Detecte intenção de compra antes do clique',
        'Ajuste preço ao movimento real do mercado',
        'Priorize esforço comercial onde o retorno é maior',
        'Reoriente mix e oferta ideal em tempo real',
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
      titleLine1Start: 'We are specialists in ',
      titleLine1Highlight: 'applied AI',
      titleLine2: 'transform data into anticipated decisions.',
      subtitle: 'We detect signals that guide commercial, supply, and pricing decisions.',
      i6signal: 'i6Signal\nConversational interface that transforms predictive signals into actionable decisions in real time.',
      capabilities: [
        'Proprietary AI engines with fine-tuning.',
        'Multi-segmented foundational base.',
        'Instant activation APIs.',
      ],
      cards: [
        'Anticipate stockouts before they cost revenue',
        'Detect purchase intent before the click',
        'Adjust pricing to real market movement',
        'Focus sales effort where ROI is highest',
        'Reorient mix and ideal offer in real time',
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

  return (
    <section className="py-14 md:py-20 bg-[#0F172A]">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Badge */}
        <div className="mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#F4845F]/20 text-[#F4845F] text-xs font-semibold tracking-widest uppercase">
            {copy.badge}
          </span>
        </div>

        {/* Title + Subtitle */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug mb-4">
          {copy.titleLine1Start}<span className="text-[#F4845F] drop-shadow-[0_0_12px_rgba(244,132,95,0.5)]">{copy.titleLine1Highlight}</span><br />{copy.titleLine2}
        </h2>
        <p className="text-white/50 text-base md:text-lg max-w-2xl mb-12">
          {copy.subtitle}
        </p>

        {/* 6 signal cards */}
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

        {/* i6Signal highlight bullet - full width */}
        <div className="mb-0">
          <div className="flex items-start gap-4 p-6 bg-white/[0.03] border-b border-[#F4845F]/20">
            <BarChart3 className="w-7 h-7 text-[#F4845F] mt-0.5 flex-shrink-0" />
            <p className="text-white/90 text-base md:text-lg leading-relaxed">
              <span className="font-medium">{copy.i6signal.split('\n')[0]}</span>
              <br />
              <span className="font-normal">{copy.i6signal.split('\n')[1]}</span>
            </p>
          </div>
        </div>

        {/* Vertical connector line */}
        <div className="flex justify-end pr-[30%] lg:pr-[35%] mb-0">
          <div className="w-px h-10 bg-gradient-to-b from-[#F4845F]/40 to-[#F4845F]/10" />
        </div>

        {/* Two-column: Capabilities + GIF with popups */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-10 items-end">
          {/* Left: Capabilities */}
          <div className="space-y-0 order-2 lg:order-1">
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
          <div className="relative flex flex-col items-center overflow-hidden lg:overflow-visible order-1 lg:order-2">
            {/* Glow behind GIF */}
            <div className="absolute inset-0 bg-[#F4845F]/5 rounded-2xl blur-3xl scale-110" />

            {/* GIF */}
            <img
              src={getPublicAssetUrl('images/i6signal-demo.gif')}
              alt="i6Signal demo"
              className="relative z-10 w-full rounded-xl shadow-2xl border border-white/10"
            />

            {/* Animated popups - hidden on mobile */}
            <div className="hidden md:block">
              {copy.popups.slice(0, 7).map((text, i) => {
                const rotations = ['-2deg', '1.5deg', '-1deg', '2deg', '-1.5deg', '0.5deg', '-0.5deg'];
                const positions = [
                  { top: '5%', right: '3%' },
                  { top: '20%', left: '3%' },
                  { top: '38%', right: '5%' },
                  { top: '55%', left: '5%' },
                  { top: '72%', right: '3%' },
                  { bottom: '10%', left: '10%' },
                  { bottom: '5%', right: '8%' },
                ];
                return (
                  <div
                    key={i}
                    className="absolute z-20 px-4 py-2.5 rounded-lg bg-[#0F172A]/90 border border-[#F4845F]/40 shadow-lg backdrop-blur-sm max-w-[260px]"
                    style={{
                      ...positions[i],
                      transform: `rotate(${rotations[i]})`,
                      animation: `popup-cycle 30s ${i * 4}s infinite ease-in-out`,
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
