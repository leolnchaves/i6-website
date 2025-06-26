
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "The AI implementation exceeded our expectations. ROI was achieved within 6 months.",
      author: "David Kim, CTO at DataTech",
      rating: 5
    },
    {
      quote: "Incredible support team and cutting-edge technology. Highly recommended.",
      author: "Emma Watson, CEO at InnovateCorp",
      rating: 5
    },
    {
      quote: "Game-changing AI solutions that transformed our entire operation.",
      author: "Robert Taylor, VP at FutureTech",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600">
            Hear directly from the leaders who've transformed their businesses with Infinity6.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-yellow-400 rounded-full mr-1"></div>
                  ))}
                </div>
                <p className="text-gray-800 italic mb-4">"{testimonial.quote}"</p>
                <p className="text-gray-600 font-medium">— {testimonial.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
