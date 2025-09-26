
import React, { memo, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { successStoriesData } from '@/data/staticData/successStoriesData';
import { useTestimonialsMarkdown } from '@/hooks/useTestimonialsMarkdown';
import { Linkedin, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const TestimonialsSection = memo(() => {
  const { language } = useLanguage();
  const { testimonials, loading, error } = useTestimonialsMarkdown();
  
  const sectionContent = successStoriesData[language]?.testimonials || successStoriesData.en.testimonials;

  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-4">
            {sectionContent.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {sectionContent.subtitle}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="relative">
              <Quote className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3 animate-pulse" />
              <p className="text-muted-foreground">
                {language === 'en' ? 'Loading testimonials...' : 'Carregando depoimentos...'}
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="relative">
              <Quote className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">
                {language === 'en' ? 'Error loading testimonials.' : 'Erro ao carregar depoimentos.'}
              </p>
            </div>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-16">
            <div className="relative">
              <Quote className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">
                {language === 'en' ? 'No testimonials available at the moment.' : 'Nenhum depoimento disponível no momento.'}
              </p>
            </div>
          </div>
        ) : testimonials.length <= 3 ? (
          // Center testimonials when 3 or less
          <div className={`flex justify-center gap-6 max-w-6xl mx-auto ${testimonials.length === 1 ? 'max-w-md' : testimonials.length === 2 ? 'max-w-2xl' : 'max-w-5xl'}`}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="group flex-1 max-w-sm">
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 h-full transition-all duration-500 hover:bg-card/80 hover:border-border hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 relative flex flex-col">
                  
                  {/* Header with Quote only */}
                  <div className="flex items-center justify-between mb-4">
                    <Quote className="w-6 h-6 text-primary/60" />
                  </div>

                  {/* Quote text - takes up available space */}
                  <blockquote className="text-base leading-relaxed text-foreground/90 mb-6 font-light flex-grow">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author info with LinkedIn - always at bottom */}
                  <div className="mt-auto">
                    <div className="w-8 h-px bg-gradient-to-r from-primary/60 to-transparent mb-3"></div>
                    <cite className="not-italic">
                      <div className="flex items-center gap-2 mb-1">
                        {testimonial.linkedin_url && (
                          <a 
                            href={testimonial.linkedin_url} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
                            title="View LinkedIn Profile"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                        <span className="font-medium text-foreground">
                          {testimonial.author_name}
                        </span>
                      </div>
                      {testimonial.author_title && (
                        <div className={`text-sm text-muted-foreground ${testimonial.linkedin_url ? 'ml-6' : ''}`}>
                          {testimonial.author_title}
                          {testimonial.company_name && (
                            <span className="text-primary/70"> • {testimonial.company_name}</span>
                          )}
                        </div>
                      )}
                    </cite>
                  </div>

                  {/* Subtle decorative element */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Carousel for more than 3 testimonials
          <div className="max-w-7xl mx-auto relative px-16">
            <Carousel 
              className="w-full"
              opts={{
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 7000,
                })
              ]}
            >
              <CarouselContent className="-ml-6">
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="pl-6 md:basis-1/2 lg:basis-1/3">
                    <div className="group h-full">
                       <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 h-full transition-all duration-500 hover:bg-card/80 hover:border-border hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 relative flex flex-col min-h-[320px]">
                        
                        {/* Header with Quote only */}
                        <div className="flex items-center justify-between mb-4">
                          <Quote className="w-6 h-6 text-primary/60" />
                        </div>

                        {/* Quote text - takes up available space */}
                        <blockquote className="text-base leading-relaxed text-foreground/90 mb-6 font-light flex-grow">
                          "{testimonial.quote}"
                        </blockquote>

                        {/* Author info with LinkedIn - always at bottom */}
                        <div className="mt-auto">
                          <div className="w-8 h-px bg-gradient-to-r from-primary/60 to-transparent mb-3"></div>
                          <cite className="not-italic">
                            <div className="flex items-center gap-2 mb-1">
                              {testimonial.linkedin_url && (
                                <a 
                                  href={testimonial.linkedin_url} 
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
                                  title="View LinkedIn Profile"
                                >
                                  <Linkedin className="w-4 h-4" />
                                </a>
                              )}
                              <span className="font-medium text-foreground">
                                {testimonial.author_name}
                              </span>
                            </div>
                            {testimonial.author_title && (
                              <div className={`text-sm text-muted-foreground ${testimonial.linkedin_url ? 'ml-6' : ''}`}>
                                {testimonial.author_title}
                                {testimonial.company_name && (
                                  <span className="text-primary/70"> • {testimonial.company_name}</span>
                                )}
                              </div>
                            )}
                          </cite>
                        </div>

                        {/* Subtle decorative element */}
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* Custom navigation buttons - positioned outside the carousel content */}
              <CarouselPrevious className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors duration-200 group">
                <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
              </CarouselPrevious>
              <CarouselNext className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors duration-200 group">
                <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
              </CarouselNext>
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
});

TestimonialsSection.displayName = 'TestimonialsSection';

export default TestimonialsSection;
