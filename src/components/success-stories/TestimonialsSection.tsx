
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSTestimonials } from '@/hooks/useCMSTestimonials';
import { useSuccessStoriesContent } from '@/hooks/useSuccessStoriesContent';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const { language } = useLanguage();
  const { getContent } = useSuccessStoriesContent(language);
  const { testimonials, loading, fetchTestimonials } = useCMSTestimonials();
  const [pageId, setPageId] = useState<string | null>(null);

  // First, get the page ID for success-stories
  useEffect(() => {
    const getPageId = async () => {
      try {
        const { data, error } = await supabase
          .from('cms_pages')
          .select('id')
          .eq('slug', 'success-stories')
          .eq('is_active', true)
          .single();

        if (error) {
          console.error('Error fetching page ID:', error);
          return;
        }

        if (data) {
          setPageId(data.id);
        }
      } catch (error) {
        console.error('Error getting page ID:', error);
      }
    };

    getPageId();
  }, []);

  // Then fetch testimonials when we have the page ID
  useEffect(() => {
    if (pageId) {
      fetchTestimonials(pageId, language);
    }
  }, [pageId, language, fetchTestimonials]);

  const sectionContent = {
    title: getContent('testimonialsSection', 'title'),
    subtitle: getContent('testimonialsSection', 'subtitle')
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-primary fill-primary' : 'text-muted-foreground/30'} transition-colors`}
      />
    ));
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-6">
              {sectionContent.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {sectionContent.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group animate-pulse">
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 h-full transition-all duration-500">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="w-4 h-4 bg-muted rounded"></div>
                    ))}
                  </div>
                  <div className="space-y-3 mb-8">
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </div>
                  <div className="h-5 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-6">
            {sectionContent.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {sectionContent.subtitle}
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center py-20">
            <div className="relative">
              <Quote className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">Nenhum depoimento disponível no momento.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="group">
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 h-full transition-all duration-500 hover:bg-card/80 hover:border-border hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2">
                  
                  {/* Quote icon */}
                  <div className="relative mb-6">
                    <Quote className="w-8 h-8 text-primary/60 mb-4" />
                  </div>

                  {/* Rating stars */}
                  <div className="flex gap-1 mb-6">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Quote text */}
                  <blockquote className="text-lg leading-relaxed text-foreground/90 mb-8 font-light">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author info */}
                  <div className="mt-auto">
                    <div className="w-12 h-px bg-gradient-to-r from-primary/60 to-transparent mb-4"></div>
                    <cite className="not-italic">
                      <div className="font-medium text-foreground text-lg mb-1">
                        {testimonial.author_name}
                      </div>
                      {testimonial.author_title && (
                        <div className="text-sm text-muted-foreground">
                          {testimonial.author_title}
                          {testimonial.company_name && (
                            <span className="text-primary/70"> • {testimonial.company_name}</span>
                          )}
                        </div>
                      )}
                    </cite>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
