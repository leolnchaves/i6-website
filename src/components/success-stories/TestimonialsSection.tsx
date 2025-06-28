
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSTestimonials } from '@/hooks/useCMSTestimonials';
import { useSuccessStoriesContent } from '@/hooks/useSuccessStoriesContent';
import { useEffect } from 'react';

const TestimonialsSection = () => {
  const { language } = useLanguage();
  const { getContent } = useSuccessStoriesContent(language);
  const { testimonials, loading, fetchTestimonials } = useCMSTestimonials();

  // Fetch testimonials when component mounts
  useEffect(() => {
    fetchTestimonials('success-stories', language);
  }, [language, fetchTestimonials]);

  const sectionContent = {
    title: getContent('testimonialsSection', 'title'),
    subtitle: getContent('testimonialsSection', 'subtitle')
  };

  const renderStars = (rating: number) => {
    return [...Array(rating)].map((_, i) => (
      <div key={i} className="w-5 h-5 bg-yellow-400 rounded-full mr-1"></div>
    ));
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {sectionContent.title}
            </h2>
            <p className="text-xl text-gray-600">
              {sectionContent.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-0 shadow-lg bg-white animate-pulse">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="w-5 h-5 bg-gray-200 rounded-full mr-1"></div>
                    ))}
                  </div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {sectionContent.title}
          </h2>
          <p className="text-xl text-gray-600">
            {sectionContent.subtitle}
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum depoimento disponível no momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-gray-800 italic mb-4">"{testimonial.quote}"</p>
                  <div className="text-gray-600">
                    <p className="font-medium">— {testimonial.author_name}</p>
                    {testimonial.author_title && (
                      <p className="text-sm">
                        {testimonial.author_title}
                        {testimonial.company_name && ` • ${testimonial.company_name}`}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
