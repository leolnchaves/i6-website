import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, Eye, DollarSign, Target, UserX, Zap } from 'lucide-react';

const icons = [TrendingUp, Eye, DollarSign, Target, UserX, Zap];

const SinaisSection = () => {
  const { language } = useLanguage();

  const copy = {
    pt: {
      title: 'O que nossos motores enxergam\nantes de todo mundo',
      cards: [
        'Antecipe ruptura de estoque antes que ela custe receita',
        'Detecte intenção de compra antes do clique',
        'Ajuste preço ao movimento real do mercado',
        'Priorize esforço comercial onde o retorno é maior',
        'Preveja churn antes da perda',
        'Antecipe janelas ideais de ativação',
      ],
      infra: 'Motores de IA proprietários · Fine-tuning contextual · APIs de ativação imediata · i6Signal',
    },
    en: {
      title: 'What our engines see\nbefore everyone else',
      cards: [
        'Anticipate stockouts before they cost revenue',
        'Detect purchase intent before the click',
        'Adjust pricing to real market movement',
        'Focus sales effort where ROI is highest',
        'Predict churn before the loss',
        'Anticipate ideal activation windows',
      ],
      infra: 'Proprietary AI engines · Contextual fine-tuning · Instant activation APIs · i6Signal',
    },
  }[language];

  return (
    <section className="py-24 md:py-32 bg-[#0F172A]">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center leading-snug whitespace-pre-line mb-16">
          {copy.title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {copy.cards.map((text, i) => {
            const Icon = icons[i];
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

        <p className="mt-14 text-center text-xs sm:text-sm text-white/30 tracking-widest uppercase">
          {copy.infra}
        </p>
      </div>
    </section>
  );
};

export default SinaisSection;
