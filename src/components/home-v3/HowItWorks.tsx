import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';

import oracleLogo from '@/assets/logos/oracle.png.asset.json';
import sapLogo from '@/assets/logos/sap.svg.asset.json';
import snowflakeLogo from '@/assets/logos/snowflake.svg.asset.json';
import databricksLogo from '@/assets/logos/databricks.svg.asset.json';
import awsLogo from '@/assets/logos/aws.svg.asset.json';
import googleCloudLogo from '@/assets/logos/googlecloud.svg.asset.json';
import azureLogo from '@/assets/logos/azure.png.asset.json';
import ibmLogo from '@/assets/logos/ibm.png.asset.json';
import salesforceLogo from '@/assets/logos/salesforce.png.asset.json';
import hubspotLogo from '@/assets/logos/hubspot.svg.asset.json';
import shopifyLogo from '@/assets/logos/shopify.svg.asset.json';
import whatsappLogo from '@/assets/logos/whatsapp.svg.asset.json';
import zendeskLogo from '@/assets/logos/zendesk.svg.asset.json';
import rdstationLogo from '@/assets/logos/rdstation.png.asset.json';
import marketoLogo from '@/assets/logos/marketo.png.asset.json';
import metaLogo from '@/assets/logos/meta.svg.asset.json';

type LogoItem = { name: string; src: string };

const sources: LogoItem[] = [
  { name: 'Oracle', src: oracleLogo.url },
  { name: 'SAP', src: sapLogo.url },
  { name: 'Snowflake', src: snowflakeLogo.url },
  { name: 'Databricks', src: databricksLogo.url },
  { name: 'AWS', src: awsLogo.url },
  { name: 'Google Cloud', src: googleCloudLogo.url },
  { name: 'Azure', src: azureLogo.url },
  { name: 'Salesforce', src: salesforceLogo.url },
  { name: 'IBM', src: ibmLogo.url },
];

const activations: LogoItem[] = [
  { name: 'Salesforce', src: salesforceLogo.url },
  { name: 'HubSpot', src: hubspotLogo.url },
  { name: 'SAP', src: sapLogo.url },
  { name: 'Shopify', src: shopifyLogo.url },
  { name: 'WhatsApp', src: whatsappLogo.url },
  { name: 'Zendesk', src: zendeskLogo.url },
  { name: 'RD Station', src: rdstationLogo.url },
  { name: 'Marketo', src: marketoLogo.url },
  { name: 'Meta Ads', src: metaLogo.url },
];

const copyByLang = {
  pt: {
    eyebrow: 'Como funcionamos',
    title: 'Do sinal bruto à decisão executada',
    intro:
      'Capturamos os sinais do seu negócio, antecipamos o movimento, priorizamos a ação e devolvemos a decisão onde a operação já trabalha.',
    sourcesLabel: 'Capturamos de qualquer ecossistema',
    activationLabel: 'Ativamos em qualquer ecossistema',
    steps: [
      { title: 'Captura de sinais', desc: 'Demanda, preço, estoque, comportamento e contexto de mercado.' },
      { title: 'Predição', desc: 'Motores proprietários antecipam demanda, risco, intenção, elasticidade e propensão.' },
      { title: 'Recomendação priorizada', desc: 'A melhor ação por objetivo, canal, cliente, SKU ou região.' },
      { title: 'Ativação', desc: 'A decisão chega à operação dentro do ecossistema do cliente.' },
    ],
  },
  en: {
    eyebrow: 'How we work',
    title: 'From raw signal to executed decision',
    intro:
      'We capture your business signals, anticipate the movement, prioritize the action and deliver the decision where operations already work.',
    sourcesLabel: 'We capture from any ecosystem',
    activationLabel: 'We activate in any ecosystem',
    steps: [
      { title: 'Signal capture', desc: 'Demand, price, inventory, behavior and market context.' },
      { title: 'Prediction', desc: 'Proprietary engines anticipate demand, risk, intent, elasticity and propensity.' },
      { title: 'Prioritized recommendation', desc: 'The best action by objective, channel, customer, SKU or region.' },
      { title: 'Activation', desc: 'The decision reaches operations inside the client ecosystem.' },
    ],
  },
  es: {
    eyebrow: 'Cómo trabajamos',
    title: 'De la señal bruta a la decisión ejecutada',
    intro:
      'Captamos las señales de su negocio, anticipamos el movimiento, priorizamos la acción y devolvemos la decisión donde la operación ya trabaja.',
    sourcesLabel: 'Capturamos de cualquier ecosistema',
    activationLabel: 'Activamos en cualquier ecosistema',
    steps: [
      { title: 'Captura de señales', desc: 'Demanda, precio, inventario, comportamiento y contexto de mercado.' },
      { title: 'Predicción', desc: 'Motores propietarios anticipan demanda, riesgo, intención, elasticidad y propensión.' },
      { title: 'Recomendación priorizada', desc: 'La mejor acción por objetivo, canal, cliente, SKU o región.' },
      { title: 'Activación', desc: 'La decisión llega a la operación dentro del ecosistema del cliente.' },
    ],
  },
};

const Chip = ({ item }: { item: LogoItem }) => (
  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium text-foreground/80 shadow-[var(--sand-shadow-soft)]">
    <img src={item.src} alt="" loading="lazy" className="w-4 h-4 object-contain" />
    {item.name}
  </span>
);

const HowItWorks = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, copyByLang);

  return (
    <section className="container mx-auto px-6 py-20 md:py-28">
      <div className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-4">{copy.eyebrow}</p>
        <h2 className="text-3xl md:text-[2.6rem] leading-[1.12] font-bold text-foreground">{copy.title}</h2>
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">{copy.intro}</p>
      </div>

      <div className="mt-12">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
          {copy.sourcesLabel}
        </p>
        <div className="flex flex-wrap gap-2">
          {sources.map((s) => (
            <Chip key={`src-${s.name}`} item={s} />
          ))}
        </div>
      </div>

      <div className="mt-10 relative rounded-[var(--radius)] border border-primary/25 bg-card/70 px-4 pt-9 pb-5">
        <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-[hsl(var(--background))] border border-primary/35 text-primary text-[10px] font-bold tracking-[0.22em] uppercase">
          i6 DECISION PLATFORM
        </span>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {copy.steps.map((step, i) => (
            <div key={step.title} className="sand-card sand-card-hover p-5 flex flex-col">
              <span className="text-3xl font-bold text-primary leading-none mb-4">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
          {copy.activationLabel}
        </p>
        <div className="flex flex-wrap gap-2">
          {activations.map((a) => (
            <Chip key={`act-${a.name}`} item={a} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
