import { Link } from 'react-router-dom';
import { ArrowRight, Radar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { solutionsContent } from '@/data/solutionsV2/content';

const copyByLang = {
  pt: {
    eyebrow: 'O que você antecipa',
    title: 'Três alavancas preditivas, um mesmo resultado: decidir antes',
    intro:
      'Organizamos as soluções nas frentes onde a decisão antecipada vira dinheiro: crescimento, planejamento e preço.',
    cta: 'Ver as soluções desta alavanca',
    signalEyebrow: 'i6Signal',
    signalTitle: 'A camada conversacional sobre a saída preditiva dos motores i6',
    signalDesc:
      'O i6Signal não responde perguntas sobre dados. Ele avisa o que está mudando, o que isso custa e qual ação tomar — antes de você perguntar.',
    signals: [
      'Risco de ruptura crescendo em 3 CDs do Sudeste. Antecipar pedido protege R$ 1,8M.',
      'Elasticidade caiu na categoria premium. Há espaço para +2,4 p.p. de margem.',
      '18 mil clientes entraram na janela de recompra. Ativar agora reduz custo por conversão.',
    ],
  },
  en: {
    eyebrow: 'What you anticipate',
    title: 'Three predictive levers, one outcome: deciding first',
    intro:
      'We organize solutions around the fronts where an anticipated decision turns into money: growth, planning and price.',
    cta: 'See the solutions in this lever',
    signalEyebrow: 'i6Signal',
    signalTitle: 'The conversational layer over the predictive output of the i6 engines',
    signalDesc:
      'i6Signal does not answer questions about data. It tells you what is shifting, what it costs and which action to take — before you ask.',
    signals: [
      'Stockout risk rising across 3 southeast DCs. Anticipating the order protects BRL 1.8M.',
      'Elasticity dropped in the premium category. There is room for +2.4 p.p. of margin.',
      '18k customers entered the repurchase window. Activating now lowers cost per conversion.',
    ],
  },
};

const AnticipateGrid = () => {
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const copy = copyByLang[language === 'pt' ? 'pt' : 'en'];
  const territories = solutionsContent[language].territories;

  return (
    <section className="border-y border-border bg-secondary/40 py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-4">{copy.eyebrow}</p>
          <h2 className="text-3xl md:text-[2.6rem] leading-[1.12] font-bold text-foreground">{copy.title}</h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">{copy.intro}</p>
        </div>

        <div className="mt-12 grid lg:grid-cols-3 gap-5">
          {territories.map((t, i) => (
            <article key={t.id} className="sand-card sand-card-hover p-6 md:p-7 flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-foreground leading-snug">{t.title}</h3>
              <p className="mt-3 text-sm font-medium text-foreground/80 leading-relaxed">{t.tagline}</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t.description}</p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {t.chips.map((c) => (
                  <li
                    key={c}
                    className="px-3 py-1.5 rounded-full bg-accent text-[11px] font-medium text-accent-foreground"
                  >
                    {c}
                  </li>
                ))}
              </ul>

              <Link
                to={localized('/solutions')}
                className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                {copy.cta}
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>

        {/* i6Signal */}
        <div className="mt-16 sand-card p-6 md:p-9 grid lg:grid-cols-[0.95fr_1.05fr] gap-9 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-[11px] font-bold uppercase tracking-[0.2em] text-accent-foreground">
              <Radar size={13} className="text-primary" />
              {copy.signalEyebrow}
            </span>
            <h3 className="mt-5 text-2xl md:text-3xl font-bold text-foreground leading-snug">{copy.signalTitle}</h3>
            <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">{copy.signalDesc}</p>
          </div>

          <div className="space-y-3">
            {copy.signals.map((s, i) => (
              <div
                key={s}
                className="rounded-[calc(var(--radius)-4px)] border border-border bg-secondary/70 p-4 flex gap-3"
              >
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <p className="text-sm text-foreground leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnticipateGrid;
