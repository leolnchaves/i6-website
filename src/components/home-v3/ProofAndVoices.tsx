import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Linkedin, Quote } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { useTestimonialsMarkdown } from '@/hooks/useTestimonialsMarkdown';
import { realResults } from '@/data/staticData/realResults';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui/carousel';

const copyByLang = {
  pt: {
    eyebrow: 'Antecipação em números',
    title: 'Resultados reais, medidos em produção',
    caption:
      'Dados anonimizados de clientes infinity6. Métricas medidas em produção após o deploy dos motores proprietários.',
    voicesTitle: 'Com a palavra: quem já está decidindo antes',
    cta: 'Veja histórias de sucesso',
  },
  en: {
    eyebrow: 'Anticipation in numbers',
    title: 'Real results, measured in production',
    caption:
      'Anonymized data from infinity6 clients. Metrics measured in production after deploying the proprietary engines.',
    voicesTitle: 'In their words: those already deciding first',
    cta: 'View success stories',
  },
};

const ProofAndVoices = memo(() => {
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const copy = copyByLang[language === 'pt' ? 'pt' : 'en'];
  const { testimonials, loading, error } = useTestimonialsMarkdown();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const hasVoices = !loading && !error && testimonials.length > 0;

  return (
    <section className="border-y border-border bg-secondary/40 py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-4">{copy.eyebrow}</p>
            <h2 className="text-3xl md:text-[2.4rem] leading-[1.14] font-bold text-foreground">{copy.title}</h2>
          </div>
          <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">{copy.caption}</p>
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {realResults.map((kpi) => (
            <li key={kpi.slug} className="sand-card sand-card-hover p-4 flex flex-col">
              <span className="text-2xl md:text-[1.75rem] font-bold text-primary leading-none mb-2">{kpi.value}</span>
              <span className="text-[11px] md:text-xs text-foreground/75 leading-snug">{kpi.label[language]}</span>
              <span className="text-[10px] text-muted-foreground mt-2 uppercase tracking-wider">
                {kpi.source[language]}
              </span>
            </li>
          ))}
        </ul>

        {hasVoices && (
          <div className="mt-20">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">{copy.voicesTitle}</h3>
            </div>

            <Carousel
              setApi={setApi}
              className="w-full"
              opts={{ loop: testimonials.length > 1, align: 'center' }}
              plugins={[Autoplay({ delay: 7000 })]}
            >
              <CarouselContent className="-ml-3 items-stretch">
                {testimonials.map((t) => (
                  <CarouselItem key={t.id} className="pl-3 basis-full sm:basis-1/2 lg:basis-1/3">
                    <div className="sand-card sand-card-hover h-full p-5 flex flex-col">
                      <Quote className="w-4 h-4 text-primary/70 mb-3" />
                      <blockquote className="text-sm leading-relaxed text-foreground/85 mb-4 flex-grow">
                        "{t.quote}"
                      </blockquote>
                      <div className="mt-auto">
                        <div className="w-6 h-px bg-primary/50 mb-3" />
                        <cite className="not-italic">
                          <div className="flex items-center gap-2 mb-0.5">
                            {t.linkedin_url && (
                              <a
                                href={t.linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                title="View LinkedIn Profile"
                              >
                                <Linkedin className="w-3 h-3" />
                              </a>
                            )}
                            <span className="font-semibold text-foreground text-sm">{t.author_name}</span>
                          </div>
                          {t.author_title && (
                            <div className={`text-xs text-muted-foreground leading-tight ${t.linkedin_url ? 'ml-5' : ''}`}>
                              {t.author_title}
                              {t.company_name && <span className="text-primary"> • {t.company_name}</span>}
                            </div>
                          )}
                        </cite>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="flex justify-center mt-7 gap-1.5">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    aria-label={`Slide ${index + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      index === current ? 'bg-primary w-5' : 'bg-border hover:bg-primary/40 w-1.5'
                    }`}
                  />
                ))}
              </div>
            </Carousel>

            <div className="flex justify-center mt-10">
              <Link
                to={localized('/success-stories')}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-[var(--radius)] border border-border bg-card text-sm font-semibold text-foreground hover:border-primary/40 hover:shadow-[var(--sand-shadow-soft)] transition-all"
              >
                {copy.cta}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

ProofAndVoices.displayName = 'ProofAndVoices';
export default ProofAndVoices;
