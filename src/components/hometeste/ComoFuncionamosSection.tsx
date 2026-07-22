import { useLanguage } from '@/contexts/LanguageContext';
import {
  Database,
  Cloud,
  Server,
  Boxes,
  Users,
  Smartphone,
  MessageSquare,
  Mail,
  Bell,
  ShoppingBag,
  Briefcase,
  Layers,
} from 'lucide-react';

const sourceIcons: Record<string, any> = {
  Oracle: Database,
  SAP: Server,
  Snowflake: Cloud,
  Databricks: Layers,
  BigQuery: Cloud,
  PostgreSQL: Database,
  'AWS S3': Cloud,
  Salesforce: Briefcase,
  MongoDB: Database,
  Redshift: Cloud,
  Kafka: Server,
};

const activationIcons: Record<string, any> = {
  CRM: Users,
  ERP: Boxes,
  Salesforce: Briefcase,
  HubSpot: Users,
  SAP: Server,
  Shopify: ShoppingBag,
  App: Smartphone,
  WhatsApp: MessageSquare,
  'E-mail': Mail,
  Push: Bell,
  POS: ShoppingBag,
};

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
        activationLabel: 'Ativamos em qualquer ecossistema do cliente',
        steps: [
          {
            title: 'Captura de sinais',
            desc: 'Demanda, preço, estoque, comportamento e contexto de mercado.',
          },
          {
            title: 'Predição',
            desc: 'Modelos proprietários identificam risco, intenção, elasticidade e propensão.',
          },
          {
            title: 'Recomendação priorizada',
            desc: 'A melhor ação por objetivo, canal, cliente, SKU ou praça.',
          },
          {
            title: 'Ativação',
            desc: 'A decisão chega à operação no ecossistema do cliente.',
          },
        ],
      }
    : {
        badge: 'HOW IT WORKS',
        titleStart: 'How we turn signals into ',
        titleHighlight: 'actionable decisions',
        subtitle:
          'From reading the context to activating the channel, i6 combines prediction, recommendation and execution to anticipate the next best decision.',
        sourcesLabel: 'We capture from any ecosystem',
        activationLabel: 'We activate in any client ecosystem',
        steps: [
          {
            title: 'Signal capture',
            desc: 'Demand, price, inventory, behavior and market context.',
          },
          {
            title: 'Prediction',
            desc: 'Proprietary models identify risk, intent, elasticity and propensity.',
          },
          {
            title: 'Prioritized recommendation',
            desc: 'The best action by objective, channel, customer, SKU or region.',
          },
          {
            title: 'Activation',
            desc: 'The decision reaches operations across the client ecosystem.',
          },
        ],
      };

  const sources = Object.keys(sourceIcons);
  const activations = Object.keys(activationIcons);

  return (
    <section className="py-14 md:py-20 bg-[#111a30]">
      <div className="container mx-auto px-6 max-w-6xl">
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
        <p className="text-white/50 text-base md:text-lg max-w-2xl mb-12">
          {copy.subtitle}
        </p>

        {/* Sources strip */}
        <div className="mb-4">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/40 text-center mb-4">
            {copy.sourcesLabel}
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {sources.map((name) => {
              const Icon = sourceIcons[name];
              return (
                <span
                  key={name}
                  className="inline-flex items-center gap-2 text-xs md:text-sm text-white/65 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02]"
                >
                  <Icon className="w-3.5 h-3.5 text-white/50" />
                  {name}
                </span>
              );
            })}
          </div>
        </div>

        {/* Connector */}
        <div className="flex justify-center my-6">
          <span className="w-px h-10 bg-gradient-to-b from-[#F4845F]/10 via-[#F4845F]/50 to-[#F4845F]/10" />
        </div>

        {/* 4 numbered steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {copy.steps.map((step, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#F4845F]/50 transition-all duration-300 hover:shadow-[0_0_24px_rgba(244,132,95,0.12)]"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#F4845F]/80 mb-4 leading-none tracking-tight">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="text-white text-base md:text-lg font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Connector */}
        <div className="flex justify-center my-6">
          <span className="w-px h-10 bg-gradient-to-b from-[#F4845F]/10 via-[#F4845F]/50 to-[#F4845F]/10" />
        </div>

        {/* Activation strip */}
        <div>
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/40 text-center mb-4">
            {copy.activationLabel}
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {activations.map((name) => {
              const Icon = activationIcons[name];
              return (
                <span
                  key={name}
                  className="inline-flex items-center gap-2 text-xs md:text-sm text-white/65 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] hover:border-[#F4845F]/40 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-[#F4845F]/80" />
                  {name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComoFuncionamosSection;
