import { useEffect, useState } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  Target,
  LineChart,
  Layers,
  Store,
  Tags,
  Radio,
  Compass,
  Repeat,
  PackageSearch,
  Flag,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';

const copyByLang = {
  pt: {
    eyebrow: 'AI DECISION INTELLIGENCE',
    titleA: 'A plataforma de ',
    titleB: 'decisão preditiva',
    titleC: 'mais avançada',
    titleD: 'da América Latina',
    sub: 'A mesma inteligência proprietária, em dois caminhos: decisões prontas para transformar o negócio agora ou uma base de inteligência para diferenciar seu produto e escalar resultados',
    proof: ['Motores proprietários de IA', 'Modelo fundacional próprio', 'Explicabilidade nativa (XAI)'],
    panelTitle: 'Próxima melhor decisão',
    panelNow: 'agora',
    decisions: [
      { icon: AlertTriangle, tag: 'Ruptura', text: 'Antecipe reposição em 42 SKUs de alto giro', impact: 'risco evitado R$ 1,8M' },
      { icon: TrendingUp, tag: 'Margem', text: 'Reajuste de preço em 3 regiões com elasticidade baixa', impact: '+2,4 p.p. de margem' },
      { icon: Target, tag: 'Propensão', text: 'Ative 18 mil clientes com maior chance de recompra', impact: '-31% custo por conversão' },
      { icon: LineChart, tag: 'Tendência', text: 'Antecipe aceleração de demanda em 7 categorias', impact: '+12% de acurácia no plano' },
      { icon: Tags, tag: 'Markdown', text: 'Aplique o desconto mínimo para escoar 12 mil unidades', impact: '-6 p.p. de perda de margem' },
      { icon: Radio, tag: 'Canal', text: 'Concentre a ativação no canal com maior resposta prevista', impact: '+2,7x resposta por contato' },
      { icon: Compass, tag: 'Discovery', text: 'Componha looks que puxam itens de fundo de catálogo', impact: '+4,1 p.p. de margem no ticket' },
      { icon: Layers, tag: 'Esparsidade', text: 'Preveja 3,4 mil itens de baixa frequência sem histórico estável', impact: '+18% de cobertura de previsão' },
      { icon: Flag, tag: 'Metas', text: 'Redistribua meta para carteiras com potencial acima do histórico', impact: '+9% de atingimento previsto' },
      { icon: Repeat, tag: 'Similares', text: 'Ofereça substitutos equivalentes quando o item sai de linha', impact: '+23% de conversão recuperada' },
      { icon: Store, tag: 'Sortimento', text: 'Realoque 260 itens entre lojas com perfis de demanda distintos', impact: '+7% de giro no sortimento' },
      { icon: PackageSearch, tag: 'Portfólio', text: 'Revise itens muito recomendados e pouco comprados', impact: '-14% de catálogo improdutivo' },
      { icon: TrendingUp, tag: 'Preço dinâmico', text: 'Ajuste preço por contexto para ganhar conversão sem perder margem', impact: '+3,2% de receita incremental' },
    ],
  },
  en: {
    eyebrow: 'AI DECISION INTELLIGENCE',
    titleA: 'The most advanced ',
    titleB: 'predictive decision',
    titleC: 'platform',
    titleD: 'in Latin America',
    sub: 'The same proprietary intelligence, two paths: ready-to-use decisions that transform the business now, or an intelligence foundation to differentiate your product and scale results',
    proof: ['Proprietary AI engines', 'In-house foundation model', 'Native explainability (XAI)'],
    panelTitle: 'Next best decision',
    panelNow: 'now',
    decisions: [
      { icon: AlertTriangle, tag: 'Stockout', text: 'Anticipate replenishment across 42 high-turn SKUs', impact: 'BRL 1.8M risk avoided' },
      { icon: TrendingUp, tag: 'Margin', text: 'Reprice 3 regions with low elasticity', impact: '+2.4 p.p. margin' },
      { icon: Target, tag: 'Propensity', text: 'Activate 18k customers most likely to repurchase', impact: '-31% cost per conversion' },
      { icon: LineChart, tag: 'Trend', text: 'Anticipate demand acceleration across 7 categories', impact: '+12% planning accuracy' },
      { icon: Tags, tag: 'Markdown', text: 'Apply the minimum discount to clear 12k units', impact: '-6 p.p. margin loss' },
      { icon: Radio, tag: 'Channel', text: 'Focus activation on the channel with the highest predicted response', impact: '+2.7x response per contact' },
      { icon: Compass, tag: 'Discovery', text: 'Build looks that pull long-tail catalog items', impact: '+4.1 p.p. margin per basket' },
      { icon: Layers, tag: 'Sparsity', text: 'Forecast 3.4k low-frequency items with unstable history', impact: '+18% forecast coverage' },
      { icon: Flag, tag: 'Targets', text: 'Reallocate targets to portfolios with above-history potential', impact: '+9% predicted attainment' },
      { icon: Repeat, tag: 'Similars', text: 'Offer equivalent substitutes when an item goes out of line', impact: '+23% recovered conversion' },
      { icon: Store, tag: 'Assortment', text: 'Reallocate 260 items across stores with distinct demand profiles', impact: '+7% assortment turnover' },
      { icon: PackageSearch, tag: 'Portfolio', text: 'Review items highly recommended and rarely purchased', impact: '-14% unproductive catalog' },
      { icon: TrendingUp, tag: 'Dynamic price', text: 'Adjust price by context to win conversion without losing margin', impact: '+3.2% incremental revenue' },
    ],
  },
  es: {
    eyebrow: 'AI DECISION INTELLIGENCE',
    titleA: 'La plataforma de ',
    titleB: 'decisión predictiva',
    titleC: 'más avanzada',
    titleD: 'de América Latina',
    sub: 'La misma inteligencia propietaria, en dos caminos: decisiones listas para transformar el negocio ahora o una base de inteligencia para diferenciar tu producto y escalar resultados',
    proof: ['Motores propietarios de IA', 'Modelo fundacional propio', 'Explicabilidad nativa (XAI)'],
    panelTitle: 'Próxima mejor decisión',
    panelNow: 'ahora',
    decisions: [
      { icon: AlertTriangle, tag: 'Quiebre', text: 'Anticipa la reposición de 42 SKUs de alta rotación', impact: 'riesgo evitado BRL 1,8M' },
      { icon: TrendingUp, tag: 'Margen', text: 'Reajusta el precio en 3 regiones con baja elasticidad', impact: '+2,4 p.p. de margen' },
      { icon: Target, tag: 'Propensión', text: 'Activa 18 mil clientes con mayor probabilidad de recompra', impact: '-31% costo por conversión' },
      { icon: LineChart, tag: 'Tendencia', text: 'Anticipa la aceleración de demanda en 7 categorías', impact: '+12% de precisión en el plan' },
      { icon: Tags, tag: 'Markdown', text: 'Aplica el descuento mínimo para liquidar 12 mil unidades', impact: '-6 p.p. de pérdida de margen' },
      { icon: Radio, tag: 'Canal', text: 'Concentra la activación en el canal con mayor respuesta prevista', impact: '+2,7x respuesta por contacto' },
      { icon: Compass, tag: 'Discovery', text: 'Compón looks que impulsan ítems de cola larga del catálogo', impact: '+4,1 p.p. de margen por ticket' },
      { icon: Layers, tag: 'Dispersión', text: 'Prevé 3,4 mil ítems de baja frecuencia sin historial estable', impact: '+18% de cobertura de pronóstico' },
      { icon: Flag, tag: 'Metas', text: 'Redistribuye metas hacia carteras con potencial sobre el histórico', impact: '+9% de cumplimiento previsto' },
      { icon: Repeat, tag: 'Similares', text: 'Ofrece sustitutos equivalentes cuando el ítem sale de línea', impact: '+23% de conversión recuperada' },
      { icon: Store, tag: 'Surtido', text: 'Reasigna 260 ítems entre tiendas con perfiles de demanda distintos', impact: '+7% de rotación del surtido' },
      { icon: PackageSearch, tag: 'Portafolio', text: 'Revisa ítems muy recomendados y poco comprados', impact: '-14% de catálogo improductivo' },
      { icon: TrendingUp, tag: 'Precio dinámico', text: 'Ajusta el precio por contexto para ganar conversión sin perder margen', impact: '+3,2% de ingreso incremental' },
    ],
  },
};


const HeroSuite = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, copyByLang);

  const items = copy.decisions;
  const [cursor, setCursor] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setCursor((c) => c + 1), 4200);
    return () => clearInterval(timer);
  }, [paused, items.length]);

  const ROW = 112;
  const GAP = 12;
  const FRAME = ROW * 3 + GAP * 2;

  const slots: { key: string; item: typeof items[number]; pos: number; entering: boolean }[] = [];
  if (cursor > 0) {
    slots.push({ key: `d-${cursor - 1}`, item: items[(cursor - 1) % items.length], pos: -1, entering: false });
  }
  for (let k = 0; k < 3; k++) {
    const abs = cursor + k;
    slots.push({
      key: `d-${abs}`,
      item: items[abs % items.length],
      pos: k,
      entering: k === 2 && cursor > 0,
    });
  }




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

      <div className="relative container mx-auto px-6 pt-28 pb-4 md:pt-32 md:pb-0">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-start">
          <div>
            <span className="animate-sand-rise inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
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
              className="animate-sand-rise mt-4 max-w-xl text-sm leading-normal text-muted-foreground"
              style={{ animationDelay: '.16s' }}
            >
              {copy.sub}
            </p>

            <ul className="animate-sand-rise mt-4 flex flex-wrap gap-x-5 gap-y-1.5" style={{ animationDelay: '.2s' }}>
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

              <div
                className="relative overflow-hidden"
                style={{ height: FRAME }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                {slots.map((s, i) => (
                  <div
                    key={s.key}
                    className={`absolute left-0 right-0 top-0 ${
                      s.entering || cursor === 0 ? 'animate-decision-fade' : ''
                    }`}
                    style={{
                      height: ROW,
                      transform: `translateY(${s.pos * (ROW + GAP)}px)`,
                      opacity: s.pos < 0 ? 0 : 1,
                      transition: 'transform .6s cubic-bezier(.22,1,.36,1), opacity .6s ease',
                      ...(cursor === 0 ? { animationDelay: `${0.4 + i * 0.14}s` } : null),
                    }}
                  >
                    <div className="h-full overflow-hidden rounded-[calc(var(--radius)-4px)] border border-border bg-secondary/60 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <s.item.icon size={14} className="text-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                          {s.item.tag}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-foreground leading-snug">{s.item.text}</p>
                      <p className="mt-2 text-xs font-semibold text-primary">{s.item.impact}</p>
                    </div>
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
