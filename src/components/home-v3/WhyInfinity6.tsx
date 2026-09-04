import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Gauge, Eye, Plug } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';

const copyByLang = {
  pt: {
    eyebrow: 'Por que infinity6',
    title: 'Todo mundo mostra o que aconteceu. Nós entregamos o que vai acontecer e o que fazer agora.',
    intro:
      'Analytics tradicional explica o passado. Nossos motores proprietários calculam a próxima melhor decisão e a colocam na mão de quem executa.',
    cta: 'Conheça nossa IA proprietária',
    items: [
      {
        icon: Brain,
        title: 'Motores proprietários, não wrappers',
        desc: 'i6 Previsio, i6 RecSys e i6 ElasticPrice foram construídos por nós, treinados em operação real da América Latina.',
      },
      {
        icon: Gauge,
        title: 'Decisão priorizada, não lista de insights',
        desc: 'Cada saída chega ranqueada por impacto: qual SKU, qual cliente, qual região, qual preço e por quê.',
      },
      {
        icon: Eye,
        title: 'XAI for Business',
        desc: 'Explicabilidade em linguagem de negócio. O time entende o driver da recomendação antes de aprovar a ação.',
      },
      {
        icon: Plug,
        title: 'Ativação no seu ecossistema',
        desc: 'A decisão não morre num painel: ela é entregue no ERP, CRM, e-commerce, força de vendas ou canal de mídia.',
      },
    ],
  },
  en: {
    eyebrow: 'Why infinity6',
    title: 'Everyone shows what happened. We deliver what will happen and what to do now.',
    intro:
      'Traditional analytics explains the past. Our proprietary engines compute the next best decision and hand it to whoever executes.',
    cta: 'Explore our proprietary AI',
    items: [
      {
        icon: Brain,
        title: 'Proprietary engines, not wrappers',
        desc: 'i6 Previsio, i6 RecSys and i6 ElasticPrice were built by us, trained on real Latin American operations.',
      },
      {
        icon: Gauge,
        title: 'Prioritized decisions, not insight lists',
        desc: 'Every output arrives ranked by impact: which SKU, which customer, which region, which price and why.',
      },
      {
        icon: Eye,
        title: 'XAI for Business',
        desc: 'Explainability in business language. Teams understand the driver behind each recommendation before acting.',
      },
      {
        icon: Plug,
        title: 'Activation inside your ecosystem',
        desc: 'The decision does not die in a dashboard: it lands in ERP, CRM, e-commerce, sales force or media channels.',
      },
    ],
  },
};

const WhyInfinity6 = () => {
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const copy = copyByLang[language === 'pt' ? 'pt' : 'en'];

  return (
    <section className="container mx-auto px-6 py-20 md:py-28">
      <div className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-4">{copy.eyebrow}</p>
        <h2 className="text-3xl md:text-[2.6rem] leading-[1.12] font-bold text-foreground">{copy.title}</h2>
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">{copy.intro}</p>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 gap-5">
        {copy.items.map((item) => (
          <article key={item.title} className="sand-card sand-card-hover p-6 md:p-7">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-[calc(var(--radius)-6px)] bg-accent text-primary mb-5">
              <item.icon size={18} />
            </span>
            <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </article>
        ))}
      </div>

      <div className="mt-10">
        <Link
          to={localized('/our-ai')}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          {copy.cta}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
};

export default WhyInfinity6;
