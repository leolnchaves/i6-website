
import React, { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { successStoriesData } from '@/data/staticData/successStoriesData';
import { useTestimonialsMarkdown } from '@/hooks/useTestimonialsMarkdown';
import { Linkedin, Quote } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const TestimonialsSection = memo(() => {
  const { language } = useLanguage();
  const { testimonials, loading, error } = useTestimonialsMarkdown();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const sectionContent = successStoriesData[language]?.testimonials || successStoriesData.en.testimonials;

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-4">
            {sectionContent.title}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            {sectionContent.subtitle}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <Quote className="w-12 h-12 text-white/20 mx-auto mb-3 animate-pulse" />
            <p className="text-white/50">
              {language === 'en' ? 'Loading testimonials...' : 'Carregando depoimentos...'}
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <Quote className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <p className="text-white/50">
              {language === 'en' ? 'Error loading testimonials.' : 'Erro ao carregar depoimentos.'}
            </p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-16">
            <Quote className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <p className="text-white/50">
              {language === 'en' ? 'No testimonials available at the moment.' : 'Nenhum depoimento disponível no momento.'}
            </p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto relative px-4">
            <Carousel
              setApi={setApi}
              className="w-full"
              opts={{ loop: testimonials.length > 1, align: 'center' }}
              plugins={[Autoplay({ delay: 7000 })]}
            >
              <CarouselContent className="-ml-2 md:-ml-3">
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="pl-2 md:pl-3 basis-full sm:basis-1/2 lg:basis-1/3">
                    <div className="group h-full">
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-4 h-full transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-xl hover:shadow-[#F4845F]/5 hover:-translate-y-1 relative flex flex-col min-h-[280px]">
                        <div className="flex items-center justify-between mb-3">
                          <Quote className="w-4 h-4 md:w-5 md:h-5 text-[#F4845F]/60" />
                        </div>

                        <blockquote className="text-sm leading-relaxed text-white/80 mb-4 font-light flex-grow">
                          "{testimonial.quote}"
                        </blockquote>

                        <div className="mt-auto">
                          <div className="w-6 h-px bg-gradient-to-r from-[#F4845F]/60 to-transparent mb-2"></div>
                          <cite className="not-italic">
                            <div className="flex items-center gap-2 mb-1">
                              {testimonial.linkedin_url && (
                                <a
                                  href={testimonial.linkedin_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-white/40 hover:text-[#F4845F] transition-colors duration-300"
                                  title="View LinkedIn Profile"
                                >
                                  <Linkedin className="w-3 h-3" />
                                </a>
                              )}
                              <span className="font-medium text-white text-sm">
                                {testimonial.author_name}
                              </span>
                            </div>
                            {testimonial.author_title && (
                              <div className={`text-xs text-white/50 leading-tight ${testimonial.linkedin_url ? 'ml-5' : ''}`}>
                                {testimonial.author_title}
                                {testimonial.company_name && (
                                  <span className="text-[#F4845F]/70"> • {testimonial.company_name}</span>
                                )}
                              </div>
                            )}
                          </cite>
                        </div>

                        <div className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-br from-[#F4845F]/10 to-[#F4845F]/5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="flex justify-center mt-8 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === current ? 'bg-[#F4845F] w-6' : 'bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
});

TestimonialsSection.displayName = 'TestimonialsSection';

export default TestimonialsSection;
