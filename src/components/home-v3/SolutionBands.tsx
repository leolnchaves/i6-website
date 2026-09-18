import { ArrowDown, Blocks, Gauge } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';

const copyByLang = {
  pt: {
    suite: {
      label: 'i6 Decision Suite',
      title: 'Inteligência pronta para decidir',
      body: 'Produto pronto para uso: capta sinal do seu negócio, decide e entrega a ação direto no seu ecossistema.',
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
      body: 'Ready-to-use product: it captures the signal from your business, decides, and delivers the action straight into your ecosystem.',
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
      body: 'Producto listo para usar: capta la señal de tu negocio, decide y entrega la acción directo en tu ecosistema.',
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
    { ...copy.suite, icon: Gauge, href: '#decision-suite', index: '01' },
    { ...copy.builder, icon: Blocks, href: '#builder-platform', index: '02' },
  ];

  return (
    <section className="border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 md:divide-x md:divide-border">
          {bands.map((band, i) => (
            <div
              key={band.label}
              className={`py-6 md:py-8 ${i === 0 ? 'border-b border-border md:border-b-0 md:pr-10' : 'md:pl-10'}`}
            >
              <div className="flex items-start gap-5">
                <span className="text-3xl font-bold leading-none text-primary/25 md:text-4xl">{band.index}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <band.icon size={14} className="text-primary" aria-hidden />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em]">{band.label}</p>
                  </div>
                  <h2 className="mt-1.5 text-xl font-bold leading-snug text-foreground md:text-2xl">
                    {band.title}
                  </h2>
                  <p className="mt-1.5 max-w-xl text-xs leading-normal text-muted-foreground md:text-sm">
                    {band.body}
                  </p>
                  <a
                    href={band.href}
                    className="group mt-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-foreground transition-colors hover:text-primary"
                  >
                    {band.cta}
                    <ArrowDown size={13} className="transition-transform group-hover:translate-y-0.5" aria-hidden />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionBands;

