
import { TrendingUp, Shield, Award, Clock, Target, DollarSign, Eye, ShoppingCart, Search, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ResultsSection = () => {
  const { scrollY } = useScrollAnimation();

  const results = [
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
      title: "Conversion Rate Optimization",
      description: "Advanced AI algorithms boost conversion rates through intelligent customer behavior analysis and personalized recommendations"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "CRM Cost Reduction", 
      description: "Streamlined operations and automated processes significantly reduce operational expenses while maintaining service quality"
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-indigo-500" />,
      title: "Average Ticket Enhancement",
      description: "Substantial increase in average ticket value through AI-guided cross-selling with diversity balancing"
    },
    {
      icon: <Eye className="w-8 h-8 text-red-500" />,
      title: "Bounce Rate Optimization",
      description: "Significant reduction of bounce rate in digital funnels through AI-driven user experience optimization"
    },
    {
      icon: <Award className="w-8 h-8 text-orange-600" />,
      title: "Enhanced Proposal Engagement",
      description: "Data-driven insights and AI-powered personalization dramatically improve proposal success rates"
    },
    {
      icon: <Users className="w-8 h-8 text-pink-500" />,
      title: "Real-Time Recommendations",
      description: "Predictive behavior recommendations with equal precision for logged users (with history) and anonymous users (without history)"
    },
    {
      icon: <Search className="w-8 h-8 text-teal-500" />,
      title: "Relevant Product Discovery",
      description: "AI-powered product complementarity discovery based on navigation behavior patterns and user preferences"
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-500" />,
      title: "Dynamic Pricing Intelligence",
      description: "Self-reinforcing pricing model adjusting prices based on demand, where adjustments increase either demand or margin, feeding back into the system"
    },
    {
      icon: <Target className="w-8 h-8 text-purple-500" />,
      title: "Market Demand Forecasting",
      description: "AI-powered forecast precision directing production plans and commercial goals, optimizing stock breaks and turnover"
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "Rapid Implementation",
      description: "100% API-first and cloud-native AI solutions deliver measurable outcomes in weeks, not months"
    }
  ];

  // Random stripe configurations
  const stripes = [
    { 
      width: '140vw', 
      height: '48px', 
      top: '-80px', 
      rotation: '-15deg', 
      opacity: '0.08',
      animation: 'animate-snake-slow',
      delay: '0s'
    },
    { 
      width: '130vw', 
      height: '32px', 
      top: '20px', 
      rotation: '-8deg', 
      opacity: '0.12',
      animation: 'animate-wave-fast',
      delay: '1.2s'
    },
    { 
      width: '150vw', 
      height: '56px', 
      top: '140px', 
      rotation: '-20deg', 
      opacity: '0.06',
      animation: 'animate-float-curve',
      delay: '2.5s'
    },
    { 
      width: '120vw', 
      height: '40px', 
      top: '280px', 
      rotation: '-12deg', 
      opacity: '0.10',
      animation: 'animate-slide-curve',
      delay: '0.8s'
    },
    { 
      width: '160vw', 
      height: '44px', 
      top: '420px', 
      rotation: '-18deg', 
      opacity: '0.09',
      animation: 'animate-snake-fast',
      delay: '3.2s'
    },
    { 
      width: '135vw', 
      height: '36px', 
      top: '580px', 
      rotation: '-10deg', 
      opacity: '0.11',
      animation: 'animate-wave-slow',
      delay: '1.8s'
    },
    { 
      width: '145vw', 
      height: '52px', 
      top: '720px', 
      rotation: '-14deg', 
      opacity: '0.07',
      animation: 'animate-drift-curve',
      delay: '4.1s'
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Dynamic curved stripes with random movements */}
      <div className="absolute inset-0">
        {stripes.map((stripe, index) => (
          <div
            key={index}
            className={`absolute -left-20 bg-white/10 ${stripe.animation}`}
            style={{
              width: stripe.width,
              height: stripe.height,
              top: stripe.top,
              transform: `translateY(${scrollY * (0.05 + Math.random() * 0.1)}px) rotate(${stripe.rotation})`,
              opacity: stripe.opacity,
              animationDelay: stripe.delay,
              clipPath: `polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%, 5% 50%)`
            }}
          ></div>
        ))}
        
        {/* Additional flowing elements */}
        <div className="absolute top-0 right-0 w-72 h-72 gradient-accent opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 gradient-secondary opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Real AI Impact That Drives Business Growth
          </h2>
          <div className="text-xl text-gray-600 max-w-4xl mx-auto mb-6">
            <p className="mb-4">
              No more GenAI solutions and agents that don't deliver real results. 
              No more focus only on software productivity. 
              No more high technical complexity and long integration journeys.
            </p>
            <p>
              Our unique approach combines advanced artificial intelligence with business strategy, 
              delivering measurable impact and real transformation for your company.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {results.map((result, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover-lift scroll-reveal glass" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                  {result.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  {result.title}
                </h3>
                <p className="text-gray-600 text-sm">
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
