
import { TrendingUp, Shield, Award, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ResultsSection = () => {
  const results = [
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
      title: "12x Increase in Conversion",
      description: "Advanced AI algorithms boost conversion rates through intelligent customer behavior analysis and personalized recommendations"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "57% Reduction in CRM Costs",
      description: "Streamlined operations and automated processes significantly reduce operational expenses while maintaining service quality"
    },
    {
      icon: <Award className="w-8 h-8 text-orange-600" />,
      title: "1.7x Proposal Engagement",
      description: "Data-driven insights and AI-powered personalization dramatically improve proposal success rates"
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "Concrete Results in Weeks",
      description: "100% API-first and cloud-native solutions deliver measurable outcomes in weeks, not months"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-72 h-72 gradient-accent opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 gradient-secondary opacity-10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Proven Results That Matter
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered solutions deliver measurable impact across industries, 
            transforming businesses with data-driven intelligence and precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {results.map((result, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover-lift scroll-reveal glass" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-8 text-center">
                <div className="mb-4 flex justify-center animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                  {result.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {result.title}
                </h3>
                <p className="text-gray-600">
                  {result.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
