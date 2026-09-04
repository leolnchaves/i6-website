import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, AlertTriangle, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { SUITE_URL } from '@/components/home-v3/product/suiteContent';

const copyByLang = {
  pt: {
    eyebrow: 'AI DECISION INTELLIGENCE',
    titleA: 'A plataforma de ',
    titleB: 'decisão preditiva',
    titleC: 'mais avançada',
    titleD: 'da América Latina',
    sub: 'Não é dashboard. Não é relatório. É a decisão pronta, antes do concorrente perceber o movimento.',
    ctaPrimary: 'Conheça o i6 Decision Suite',
    ctaSecondary: 'Falar com especialista',
    proof: ['Motores proprietários', 'Explicabilidade nativa (XAI)', 'Deploy no seu ecossistema'],
    panelTitle: 'Próxima melhor decisão',
    panelNow: 'agora',
    decisions: [
      { icon: AlertTriangle, tag: 'Ruptura', text: 'Antecipe reposição em 42 SKUs de alto giro', impact: 'risco evitado R$ 1,8M' },
      { icon: TrendingUp, tag: 'Margem', text: 'Reajuste de preço em 3 regiões com elasticidade baixa', impact: '+2,4 p.p. de margem' },
      { icon: Target, tag: 'Propensão', text: 'Ative 18 mil clientes com maior chance de recompra', impact: '-31% custo por conversão' },
    ],
  },
  en: {
    eyebrow: 'AI DECISION INTELLIGENCE',
    titleA: 'The most advanced ',
    titleB: 'predictive decision',
    titleC: 'platform',
    titleD: 'in Latin America',
    sub: 'Not a dashboard. Not a report. The decision, ready before your competitor notices the move.',
    ctaPrimary: 'Explore the i6 Decision Suite',
    ctaSecondary: 'Talk to an expert',
    proof: ['Proprietary engines', 'Native explainability (XAI)', 'Deployed in your ecosystem'],
    panelTitle: 'Next best decision',
    panelNow: 'now',
    decisions: [
      { icon: AlertTriangle, tag: 'Stockout', text: 'Anticipate replenishment across 42 high-turn SKUs', impact: 'BRL 1.8M risk avoided' },
      { icon: TrendingUp, tag: 'Margin', text: 'Reprice 3 regions with low elasticity', impact: '+2.4 p.p. margin' },
      { icon: Target, tag: 'Propensity', text: 'Activate 18k customers most likely to repurchase', impact: '-31% cost per conversion' },
    ],
  },
};

const HeroSuite = () => {
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const copy = copyByLang[language === 'pt' ? 'pt' : 'en'];

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 sand-glow" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(70% 60% at 50% 30%, #000 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(70% 60% at 50% 30%, #000 0%, transparent 100%)',
        }}
      />

      <div className="relative container mx-auto px-6 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          <div>
            <span className="animate-sand-rise inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <Sparkles size={13} className="text-primary" />
              {copy.eyebrow}
            </span>

            <h1
              className="animate-sand-rise mt-6 text-[2.1rem] leading-[1.08] sm:text-5xl lg:text-[3.6rem] font-bold text-foreground"
              style={{ animationDelay: '.08s' }}
            >
              {copy.titleA}
              <span className="text-primary">{copy.titleB}</span>
              <br />
              {copy.titleC}
              <br />
              {copy.titleD}
            </h1>

            <p
              className="animate-sand-rise mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed"
              style={{ animationDelay: '.16s' }}
            >
              {copy.sub}
            </p>

            <div className="animate-sand-rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: '.24s' }}>
              <a
                href={SUITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-[var(--radius)] bg-primary text-primary-foreground text-sm font-semibold shadow-[var(--sand-shadow-lift)] hover:brightness-[1.06] transition-all"
              >
                {copy.ctaPrimary}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                to={localized('/contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[var(--radius)] border border-border bg-card text-sm font-semibold text-foreground hover:border-primary/40 hover:shadow-[var(--sand-shadow-soft)] transition-all"
              >
                {copy.ctaSecondary}
              </Link>
            </div>

            <ul className="animate-sand-rise mt-8 flex flex-wrap gap-x-6 gap-y-2" style={{ animationDelay: '.32s' }}>
              {copy.proof.map((p) => (
                <li key={p} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Decision panel */}
          <div className="animate-sand-rise relative" style={{ animationDelay: '.2s' }}>
            <div className="sand-card p-5 md:p-6 relative overflow-hidden">
              <div
                aria-hidden
                className="absolute top-0 left-0 h-px w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent animate-sand-scan"
              />
              <div className="flex items-center justify-between mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {copy.panelTitle}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {copy.panelNow}
                </span>
              </div>

              <div className="space-y-3">
                {copy.decisions.map((d, i) => (
                  <div
                    key={d.tag}
                    className="rounded-[calc(var(--radius)-4px)] border border-border bg-secondary/60 p-4 animate-sand-rise"
                    style={{ animationDelay: `${0.4 + i * 0.14}s` }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <d.icon size={14} className="text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                        {d.tag}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground leading-snug">{d.text}</p>
                    <p className="mt-2 text-xs font-semibold text-primary">{d.impact}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSuite;
