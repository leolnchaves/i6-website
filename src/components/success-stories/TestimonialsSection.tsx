import React, { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { successStoriesData } from '@/data/staticData/successStoriesData';
import { useTestimonialsMarkdown } from '@/hooks/useTestimonialsMarkdown';
import { Linkedin, Quote } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

/**
 * Faixa de depoimentos — mesma fonte (public/content/testimonials-*.md) e o
 * mesmo carrossel/autoplay; apenas o tratamento visual passa para areia.
 */
const TestimonialsSection = memo(() => {
  const { language } = useLanguage();
  const { testimonials, loading, error } = useTestimonialsMarkdown();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const content = successStoriesData[language] || successStoriesData.en;
  const sectionContent = content.testimonials;

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  if (loading || error || testimonials.length === 0) return null;

  return (
    <section className="border-t border-border py-20 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-[2.6rem] font-bold leading-[1.12] text-foreground">
            {sectionContent.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {sectionContent.subtitle}
          </p>
        </div>

        <div className="relative mt-12">
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{ loop: testimonials.length > 1, align: 'start' }}
            plugins={[Autoplay({ delay: 7000 })]}
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <figure className="sand-card sand-card-hover flex h-full min-h-[260px] flex-col p-6">
                    <Quote className="mb-4 h-5 w-5 text-primary" />
                    <blockquote className="flex-grow text-sm leading-relaxed text-foreground/80">
                      {testimonial.quote}
                    </blockquote>
                    <figcaption className="mt-6 border-t border-border pt-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">
                          {testimonial.author_name}
                        </span>
                        {testimonial.linkedin_url && (
                          <a
                            href={testimonial.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground transition-colors hover:text-primary"
                            aria-label={`LinkedIn — ${testimonial.author_name}`}
                          >
                            <Linkedin className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                      {testimonial.author_title && (
                        <div className="mt-1 text-xs leading-snug text-muted-foreground">
                          {testimonial.author_title}
                          {testimonial.company_name && (
                            <span className="text-primary"> · {testimonial.company_name}</span>
                          )}
                        </div>
                      )}
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="mt-8 flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === current ? 'w-6 bg-primary' : 'w-1.5 bg-border hover:bg-primary/40'
                  }`}
                />
              ))}
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
});

TestimonialsSection.displayName = 'TestimonialsSection';

export default TestimonialsSection;
