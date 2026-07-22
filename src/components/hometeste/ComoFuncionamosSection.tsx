import { useLanguage } from '@/contexts/LanguageContext';

type LogoItem = { name: string; slug: string };

const sources: LogoItem[] = [
  { name: 'Oracle', slug: 'oracle' },
  { name: 'SAP', slug: 'sap' },
  { name: 'Snowflake', slug: 'snowflake' },
  { name: 'Databricks', slug: 'databricks' },
  { name: 'BigQuery', slug: 'googlebigquery' },
  { name: 'PostgreSQL', slug: 'postgresql' },
  { name: 'AWS S3', slug: 'amazons3' },
  { name: 'Salesforce', slug: 'salesforce' },
  { name: 'MongoDB', slug: 'mongodb' },
  { name: 'Kafka', slug: 'apachekafka' },
];

const activations: LogoItem[] = [
  { name: 'Salesforce', slug: 'salesforce' },
  { name: 'HubSpot', slug: 'hubspot' },
  { name: 'SAP', slug: 'sap' },
  { name: 'Shopify', slug: 'shopify' },
  { name: 'WhatsApp', slug: 'whatsapp' },
  { name: 'Gmail', slug: 'gmail' },
  { name: 'Slack', slug: 'slack' },
  { name: 'Zendesk', slug: 'zendesk' },
  { name: 'RD Station', slug: 'rdstation' },
  { name: 'Meta Ads', slug: 'meta' },
];

const LOGO_COLOR = '9ca3af';

const Logo = ({ item }: { item: LogoItem }) => (
  <img
    src={`https://cdn.simpleicons.org/${item.slug}/${LOGO_COLOR}`}
    alt={item.name}
    loading="lazy"
    className="w-4 h-4 opacity-80 group-hover/chip:opacity-100 transition-opacity"
  />
);

const Chip = ({ item }: { item: LogoItem }) => (
  <span className="group/chip inline-flex items-center gap-2 text-xs md:text-sm text-white/70 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] hover:border-[#F4845F]/40 hover:text-white transition-colors">
    <Logo item={item} />
    {item.name}
  </span>
);

const ComoFuncionamosSection = () => {
  const { language } = useLanguage();
  const isPt = language === 'pt';

  const copy = isPt
    ? {
        badge: 'COMO FUNCIONA',
        titleStart: 'Como transformamos sinais em ',
        titleHighlight: 'decisões acionáveis',
        subtitle:
          'Da leitura do contexto à ativação no canal, a i6 combina predição, recomendação e execução para antecipar a próxima melhor decisão.',
        sourcesLabel: 'Capturamos de qualquer ecossistema',
        activationLabel: 'Ativamos em qualquer ecossistema',
        steps: [
          { title: 'Captura de sinais', desc: 'Demanda, preço, estoque, comportamento e contexto de mercado.' },
          { title: 'Predição', desc: 'Modelos proprietários identificam risco, intenção, elasticidade e propensão.' },
          { title: 'Recomendação priorizada', desc: 'A melhor ação por objetivo, canal, cliente, SKU ou praça.' },
          { title: 'Ativação', desc: 'A decisão chega à operação no ecossistema do cliente.' },
        ],
      }
    : {
        badge: 'HOW IT WORKS',
        titleStart: 'How we turn signals into ',
        titleHighlight: 'actionable decisions',
        subtitle:
          'From reading the context to activating the channel, i6 combines prediction, recommendation and execution to anticipate the next best decision.',
        sourcesLabel: 'We capture from any ecosystem',
        activationLabel: 'We activate in any ecosystem',
        steps: [
          { title: 'Signal capture', desc: 'Demand, price, inventory, behavior and market context.' },
          { title: 'Prediction', desc: 'Proprietary models identify risk, intent, elasticity and propensity.' },
          { title: 'Prioritized recommendation', desc: 'The best action by objective, channel, customer, SKU or region.' },
          { title: 'Activation', desc: 'The decision reaches operations across the client ecosystem.' },
        ],
      };

  return (
    <section className="py-14 md:py-20 bg-[#111a30]">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#F4845F]/20 text-[#F4845F] text-xs font-semibold tracking-widest uppercase">
            {copy.badge}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug mb-4">
          {copy.titleStart}
          <span className="text-[#F4845F] drop-shadow-[0_0_12px_rgba(244,132,95,0.5)]">
            {copy.titleHighlight}
          </span>
        </h2>
        <p className="text-white/50 text-base md:text-lg max-w-2xl mb-14">
          {copy.subtitle}
        </p>

        {/* Desktop layout: sources | 4 steps | activation */}
        <div className="hidden lg:grid grid-cols-[minmax(160px,200px)_1fr_minmax(160px,200px)] gap-6 items-stretch">
          {/* LEFT — sources connected to card 01 */}
          <div className="relative flex flex-col justify-center">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-4">
              {copy.sourcesLabel}
            </p>
            <div className="flex flex-col items-start gap-2">
              {sources.map((s) => (
                <Chip key={s.name} item={s} />
              ))}
            </div>
            {/* Connector to card 01 */}
            <div
              aria-hidden
              className="absolute top-1/2 right-0 h-px w-6 -translate-y-1/2 translate-x-full bg-gradient-to-r from-[#F4845F]/10 to-[#F4845F]/60"
            />
            <div
              aria-hidden
              className="absolute top-1/2 -right-6 w-1.5 h-1.5 rounded-full bg-[#F4845F] -translate-y-1/2 translate-x-full shadow-[0_0_8px_rgba(244,132,95,0.6)]"
            />
          </div>

          {/* CENTER — 4 steps */}
          <div className="grid grid-cols-4 gap-4">
            {copy.steps.map((step, i) => (
              <div
                key={i}
                className="group p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#F4845F]/50 transition-all duration-300 hover:shadow-[0_0_24px_rgba(244,132,95,0.12)]"
              >
                <div className="text-4xl font-bold text-[#F4845F]/80 mb-4 leading-none tracking-tight">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-white text-base font-semibold mb-2">{step.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* RIGHT — activations connected to card 04 */}
          <div className="relative flex flex-col justify-center">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-4 text-right">
              {copy.activationLabel}
            </p>
            <div className="flex flex-col items-end gap-2">
              {activations.map((a) => (
                <Chip key={a.name} item={a} />
              ))}
            </div>
            {/* Connector to card 04 */}
            <div
              aria-hidden
              className="absolute top-1/2 left-0 h-px w-6 -translate-y-1/2 -translate-x-full bg-gradient-to-l from-[#F4845F]/10 to-[#F4845F]/60"
            />
            <div
              aria-hidden
              className="absolute top-1/2 -left-6 w-1.5 h-1.5 rounded-full bg-[#F4845F] -translate-y-1/2 -translate-x-full shadow-[0_0_8px_rgba(244,132,95,0.6)]"
            />
          </div>
        </div>

        {/* Mobile/tablet fallback */}
        <div className="lg:hidden space-y-8">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-3 text-center">
              {copy.sourcesLabel}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {sources.map((s) => (
                <Chip key={s.name} item={s} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {copy.steps.map((step, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 transition-all"
              >
                <div className="text-4xl font-bold text-[#F4845F]/80 mb-3 leading-none tracking-tight">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-white text-base font-semibold mb-2">{step.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-3 text-center">
              {copy.activationLabel}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {activations.map((a) => (
                <Chip key={a.name} item={a} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComoFuncionamosSection;
