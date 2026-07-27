import { Sparkles, UserRoundSearch, Megaphone } from 'lucide-react';
import type { LeanSolution, SolutionsV2Content } from '@/data/solutionsV2/content';
import type { KioskLang } from '@/data/kiosk/config';
import PriceToMarginDemo from './demos/PriceToMarginDemo';
import PriceMarginDemo from './demos/PriceMarginDemo';
import PriceTurnoverDemo from './demos/PriceTurnoverDemo';
import SimulationLauncher from './SimulationLauncher';
import PredictivePersonalizationDemo from './demos/PredictivePersonalizationDemo';
import DemandForecastDemo from './demos/DemandForecastDemo';
import PropensityCampaignDemo from './demos/PropensityCampaignDemo';
import CommercialTargetsDemo from './demos/CommercialTargetsDemo';
import MixAssortmentOrderDemo from './demos/MixAssortmentOrderDemo';

interface Props {
  solution: LeanSolution;
  labels: SolutionsV2Content['labels'];
  lang: KioskLang;
  companion?: LeanSolution | null;
  onSimulationClosed?: () => void;
}

const SolutionDemoBlock = ({ solution, labels, lang, companion, onSimulationClosed }: Props) => {
  // Interactive pilot demo for Price-to-Conversion
  if (solution.id === 'price-to-conversion') {
    return <PriceToMarginDemo lang={lang} />;
  }

  // Interactive demo for Price-to-Margin
  if (solution.id === 'price-to-margin') {
    return <PriceMarginDemo />;
  }

  if (solution.id === 'price-to-turnover') {
    return <PriceTurnoverDemo />;
  }



  // Interactive demo for Predictive Personalization + Smart Discovery combo
  if (solution.id === 'predictive-personalization' || solution.id === 'smart-discovery') {
    const isPT = lang === 'pt';
    const unifiedTitle = isPT
      ? 'Personalização e Descoberta Preditiva'
      : 'Predictive Personalization and Discovery';
    const unifiedTagline = isPT
      ? 'Antecipe a próxima melhor oferta para cada cliente, inclusive anônimos.'
      : 'Anticipate the next best offer for every customer, including anonymous ones.';

    const join = (a?: string, b?: string) => [a, b].filter(Boolean).join('\n');

    return (
      <SimulationLauncher
        lang={lang}
        solutionTitle={unifiedTitle}
        solutionTagline={unifiedTagline}
        resolve={join(solution.resolve, companion?.resolve)}
        entrega={join(solution.entrega, companion?.entrega)}
        impacto={join(solution.impacto, companion?.impacto)}
        labels={labels}
        icon={UserRoundSearch}
      >
        <PredictivePersonalizationDemo lang={lang} />
      </SimulationLauncher>
    );
  }

  // Interactive demo for Demand Forecasting
  if (solution.id === 'demand-forecasting') {
    return <DemandForecastDemo lang={lang} />;
  }

  if (solution.id === 'predictive-campaign-targeting') {
    return (
      <SimulationLauncher
        lang={lang}
        solutionTitle={solution.title}
        solutionTagline={solution.tagline}
        resolve={solution.resolve}
        entrega={solution.entrega}
        impacto={solution.impacto}
        labels={labels}
        icon={Megaphone}
      >
        <PropensityCampaignDemo />
      </SimulationLauncher>
    );
  }

  if (solution.id === 'predictive-commercial-targets') {
    return <CommercialTargetsDemo />;
  }

  if (solution.id === 'mix-assortment-order') {
    return <MixAssortmentOrderDemo />;
  }

  return (
    <div className="rounded-3xl bg-gradient-to-br from-white/8 to-[#F4845F]/8 border border-[#F4845F]/30 p-[4vmin]">
      <div className="flex items-center gap-[2vmin] mb-[2.5vmin]">
        <span className="w-[6vmin] h-[6vmin] rounded-xl bg-[#F4845F]/15 border border-[#F4845F]/40 flex items-center justify-center">
          <Sparkles className="w-[3vmin] h-[3vmin] text-[#F4845F]" />
        </span>
        <div>
          <h3 className="text-[3.4vmin] font-bold leading-tight text-white">{solution.title}</h3>
          <p className="text-[2vmin] text-white/70">{solution.tagline}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-[2vmin]">
        <Card label={labels.resolve} value={solution.resolve} />
        <Card label={labels.entrega} value={solution.entrega} />
        <Card label={labels.impacto} value={solution.impacto} highlight />
      </div>
    </div>
  );
};

const Card = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div
    className={`rounded-2xl p-[2.5vmin] border ${
      highlight ? 'bg-[#F4845F]/10 border-[#F4845F]/40' : 'bg-white/5 border-white/10'
    }`}
  >
    <span className="block text-[1.6vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F] mb-[0.6vmin]">
      {label}
    </span>
    <span className="block text-[2.4vmin] leading-snug text-white/90">{value}</span>
  </div>
);

export default SolutionDemoBlock;
