
import { ArrowRight, Zap, Shield, Target, TrendingUp, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import ClientCarousel from '@/components/ClientCarousel';

const Home = () => {
  const { scrollY } = useScrollAnimation();

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
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center gradient-primary overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          ></div>
          <div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"
            style={{ 
              transform: `translateY(${scrollY * -0.15}px)`,
              animationDelay: '2s'
            }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse"
            style={{ transform: `translate(-50%, -50%) translateY(${scrollY * 0.05}px)` }}
          ></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-bounce-in">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                <span className="block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Infinite Possibilities
                </span>
                <span className="block text-white text-4xl md:text-5xl mt-4">
                  Powered by AI
                </span>
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 mb-8 animate-slide-in-left">
              Transform your business with cutting-edge artificial intelligence solutions 
              that unlock unlimited potential and drive extraordinary results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-right">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:scale-105 transition-all duration-300 text-lg px-8 py-4 shadow-xl hover:shadow-2xl border-0 rounded-full">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-500 transition-all duration-300 hover:scale-105 text-lg px-8 py-4 rounded-full backdrop-blur-sm">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Results Section */}
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

      {/* Stats Section */}
      <section className="py-20 gradient-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute top-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
            <div className="scroll-reveal">
              <div className="text-5xl font-bold mb-2 animate-bounce-in">500+</div>
              <div className="text-xl opacity-90">Companies Transformed</div>
            </div>
            <div className="scroll-reveal" style={{ animationDelay: '0.2s' }}>
              <div className="text-5xl font-bold mb-2 animate-bounce-in">99.9%</div>
              <div className="text-xl opacity-90">Accuracy Rate</div>
            </div>
            <div className="scroll-reveal" style={{ animationDelay: '0.4s' }}>
              <div className="text-5xl font-bold mb-2 animate-bounce-in">24/7</div>
              <div className="text-xl opacity-90">Expert Support</div>
            </div>
          </div>
          
          {/* Client Carousel */}
          <div className="mt-12">
            <ClientCarousel />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 gradient-accent opacity-5"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join hundreds of companies that have already unlocked their infinite potential.
            </p>
            <Button size="lg" className="gradient-accent hover:scale-105 transition-all duration-300 text-lg px-8 py-4 shadow-xl hover:shadow-2xl">
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <section className="py-8 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8">
            <Link 
              to="/privacy-policy" 
              className="text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm font-medium"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/ethics-policy" 
              className="text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm font-medium"
            >
              Ethics Policy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
