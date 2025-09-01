
import React, { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { successStoriesData } from '@/data/staticData/successStoriesData';
import { useTestimonialsMarkdown } from '@/hooks/useTestimonialsMarkdown';
import { Linkedin, Quote } from 'lucide-react';

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
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="group">
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 h-full transition-all duration-500 hover:bg-card/80 hover:border-border hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                  
                  {/* Header with Quote only */}
                  <div className="flex items-center justify-between mb-4">
                    <Quote className="w-6 h-6 text-primary/60" />
                  </div>

                  {/* Quote text */}
                  <blockquote className="text-base leading-relaxed text-foreground/90 mb-6 font-light">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author info with LinkedIn */}
                  <div className="mt-auto">
                    <div className="w-8 h-px bg-gradient-to-r from-primary/60 to-transparent mb-3"></div>
                    <cite className="not-italic">
                      <div className="flex items-center gap-2 mb-1">
                        <a 
                          href="https://www.linkedin.com/company/infinity6" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
                          title="View LinkedIn Profile"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                        <span className="font-medium text-foreground">
                          {testimonial.author_name}
                        </span>
                      </div>
                      {testimonial.author_title && (
                        <div className="text-sm text-muted-foreground ml-6">
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
        )}
      </div>
    </section>
  );
});

TestimonialsSection.displayName = 'TestimonialsSection';

export default TestimonialsSection;
