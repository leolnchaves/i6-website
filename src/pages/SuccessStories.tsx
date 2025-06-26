
import { Quote, ArrowRight, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const SuccessStories = () => {
  const stories = [
    {
      company: "TechCorp Industries",
      industry: "Manufacturing",
      challenge: "Reducing production downtime and optimizing efficiency",
      solution: "AI-powered predictive maintenance and quality control",
      results: [
        { metric: "Downtime Reduction", value: "75%" },
        { metric: "Cost Savings", value: "$2.3M" },
        { metric: "Efficiency Increase", value: "40%" }
      ],
      quote: "Infinity6's AI solutions transformed our manufacturing process. We've seen unprecedented efficiency gains and cost reductions.",
      author: "Sarah Johnson, CTO",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop"
    },
    {
      company: "FinanceFlow",
      industry: "Financial Services",
      challenge: "Fraud detection and risk assessment automation",
      solution: "Machine learning algorithms for real-time transaction analysis",
      results: [
        { metric: "Fraud Detection", value: "99.2%" },
        { metric: "False Positives", value: "-85%" },
        { metric: "Processing Speed", value: "10x" }
      ],
      quote: "The AI-driven fraud detection system has revolutionized our security operations while improving customer experience.",
      author: "Michael Chen, VP of Operations",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop"
    },
    {
      company: "RetailMax",
      industry: "E-commerce",
      challenge: "Personalizing customer experience and inventory management",
      solution: "AI recommendation engine and demand forecasting",
      results: [
        { metric: "Revenue Growth", value: "45%" },
        { metric: "Customer Retention", value: "+60%" },
        { metric: "Inventory Turnover", value: "3x" }
      ],
      quote: "Our customers love the personalized experience, and our inventory management has never been more efficient.",
      author: "Lisa Rodriguez, CEO",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop"
    }
  ];

  const metrics = [
    { icon: <TrendingUp className="w-8 h-8" />, value: "150%", label: "Average ROI" },
    { icon: <Users className="w-8 h-8" />, value: "500+", label: "Companies Served" },
    { icon: <DollarSign className="w-8 h-8" />, value: "$50M+", label: "Cost Savings Generated" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Success Stories That
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Inspire Innovation
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover how leading companies across industries have transformed their operations 
              and achieved remarkable results with our AI solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center text-blue-600 mb-4">
                  {metric.icon}
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{metric.value}</div>
                <div className="text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {stories.map((story, index) => (
              <Card key={index} className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
                <CardContent className="p-0">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                    {/* Content */}
                    <div className={`p-12 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <div className="flex items-center mb-4">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mr-3"></div>
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                          {story.industry}
                        </span>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">{story.company}</h2>
                      
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Challenge</h3>
                        <p className="text-gray-600">{story.challenge}</p>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Solution</h3>
                        <p className="text-gray-600">{story.solution}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-8">
                        {story.results.map((result, resultIndex) => (
                          <div key={resultIndex} className="text-center p-4 bg-white rounded-lg shadow-sm">
                            <div className="text-2xl font-bold text-blue-600 mb-1">{result.value}</div>
                            <div className="text-sm text-gray-600">{result.metric}</div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
                        <Quote className="w-8 h-8 text-blue-600 mb-4" />
                        <p className="text-gray-800 italic mb-4">"{story.quote}"</p>
                        <p className="text-gray-600 font-medium">— {story.author}</p>
                      </div>
                    </div>

                    {/* Image */}
                    <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                      <div className="h-full min-h-[400px] bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                        <img 
                          src={story.image} 
                          alt={story.company}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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
            {[
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
            ].map((testimonial, index) => (
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join the ranks of successful companies that have transformed their operations with our AI solutions.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
            Start Your Transformation
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;
