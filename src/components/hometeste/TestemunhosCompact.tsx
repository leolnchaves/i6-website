import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Quote, ArrowRight } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { useTestimonialsMarkdown } from '@/hooks/useTestimonialsMarkdown';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from '@/components/ui/carousel';

const TestemunhosCompact = memo(() => {
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const { testimonials, loading, error } = useTestimonialsMarkdown();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  if (loading || error || testimonials.length === 0) return null;

  const copy = {
    pt: {
      title: 'O que dizem nossos clientes',
      subtitle: 'Resultados na voz de quem está na operação',
      cta: 'Ver histórias de sucesso',
    },
    en: {
      title: 'What our clients say',
      subtitle: 'Results in the voice of those running the operation',
      cta: 'See success stories',
    },
  }[language];

  return (
    <section className="pt-6 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
            {copy.title}
          </h2>
          <p className="text-base text-white/55 max-w-xl mx-auto leading-relaxed">
            {copy.subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative px-2">
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{ loop: testimonials.length > 1, align: 'center' }}
            plugins={[Autoplay({ delay: 7000 })]}
          >
            <CarouselContent className="-ml-2 md:-ml-3 items-stretch">
              {testimonials.map((t) => (
                <CarouselItem
                  key={t.id}
                  className="pl-2 md:pl-3 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="group h-full">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 h-full transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-[#F4845F]/5 hover:-translate-y-0.5 relative flex flex-col">
                      <Quote className="w-4 h-4 text-[#F4845F]/60 mb-2" />

                      <blockquote className="text-[13px] leading-relaxed text-white/80 mb-3 font-light flex-grow">
                        "{t.quote}"
                      </blockquote>

                      <div className="mt-auto">
                        <div className="w-6 h-px bg-gradient-to-r from-[#F4845F]/60 to-transparent mb-2" />
                        <cite className="not-italic">
                          <div className="flex items-center gap-2 mb-0.5">
                            {t.linkedin_url && (
                              <a
                                href={t.linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/40 hover:text-[#F4845F] transition-colors duration-300"
                                title="View LinkedIn Profile"
                              >
                                <Linkedin className="w-3 h-3" />
                              </a>
                            )}
                            <span className="font-medium text-white text-sm">
                              {t.author_name}
                            </span>
                          </div>
                          {t.author_title && (
                            <div
                              className={`text-xs text-white/50 leading-tight ${
                                t.linkedin_url ? 'ml-5' : ''
                              }`}
                            >
                              {t.author_title}
                              {t.company_name && (
                                <span className="text-[#F4845F]/70">
                                  {' '}
                                  • {t.company_name}
                                </span>
                              )}
                            </div>
                          )}
                        </cite>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex justify-center mt-6 gap-1.5">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Slide ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    index === current
                      ? 'bg-[#F4845F] w-5'
                      : 'bg-white/20 hover:bg-white/40 w-1.5'
                  }`}
                />
              ))}
            </div>
          </Carousel>
        </div>

        <div className="flex justify-center mt-10">
          <Link
            to={localized('/success-stories')}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-transparent text-white font-medium rounded-xl border border-white/40 animate-glow-white transition-all duration-500 ease-out hover:bg-white hover:text-[#0B1224] hover:border-white hover:shadow-[0_0_24px_rgba(255,255,255,0.35),0_0_48px_rgba(255,255,255,0.12)] text-sm md:text-base text-center"
          >
            {copy.cta}
            <ArrowRight
              size={16}
              className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
});

TestemunhosCompact.displayName = 'TestemunhosCompact';

export default TestemunhosCompact;
