import { ArrowDown, Blocks, Gauge } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';

const copyByLang = {
  pt: {
    suite: {
      label: 'i6 Decision Suite',
      title: 'Inteligência pronta para decidir',
      body: 'Produto pronto para uso que captura sinais, converte em decisões e entrega resultados acelerados direto no seu ecossistema',
      cta: 'Saiba mais',
    },
    builder: {
      label: 'i6 Builder Platform',
      title: 'Inteligência para diferenciar e escalar',
      body: 'Capacidade de modelagens proprietárias para criar experiências únicas e ampliar o valor do seu produto',
      cta: 'Saiba mais',
    },
  },
  en: {
    suite: {
      label: 'i6 Decision Suite',
      title: 'Intelligence ready to decide',
      body: 'Ready-to-use product that captures signals, turns them into decisions and delivers accelerated results directly in your ecosystem',
      cta: 'Learn more',
    },
    builder: {
      label: 'i6 Builder Platform',
      title: 'Intelligence to differentiate and scale',
      body: 'Proprietary modeling capabilities to create unique experiences and expand your product value',
      cta: 'Learn more',
    },
  },
  es: {
    suite: {
      label: 'i6 Decision Suite',
      title: 'Inteligencia lista para decidir',
      body: 'Producto listo para usar que captura señales, las convierte en decisiones y entrega resultados acelerados directamente en tu ecosistema',
      cta: 'Saber más',
    },
    builder: {
      label: 'i6 Builder Platform',
      title: 'Inteligencia para diferenciar y escalar',
      body: 'Capacidad de modelados propietarios para crear experiencias únicas y ampliar el valor de tu producto',
      cta: 'Saber más',
    },
  },
};

const SolutionBands = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, copyByLang);

  const bands = [
    { ...copy.suite, icon: Gauge, href: '#decision-suite', tone: 'bg-secondary/80' },
    { ...copy.builder, icon: Blocks, href: '#builder-platform', tone: 'bg-muted/70 md:border-l md:border-border' },
  ];

  return (
    <section className="border-y border-border">
      <div className="grid md:grid-cols-2">
        {bands.map((band) => (
          <div key={band.label} className={`${band.tone} px-6 py-0 md:px-10 md:py-0 xl:py-3 border-b border-border md:border-b-0`}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <band.icon size={15} className="text-primary" aria-hidden />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]">{band.label}</p>
            </div>
            <h2 className="mt-1.5 text-lg md:text-xl font-semibold leading-snug text-foreground">
              {band.title}
            </h2>
            <p className="mt-1 max-w-xl text-xs md:text-sm leading-normal text-muted-foreground">
              {band.body}
            </p>
            <a
              href={band.href}
              className="group mt-2 inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-primary"
            >
              {band.cta}
              <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" aria-hidden />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SolutionBands;
