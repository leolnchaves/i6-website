
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

  // 7 diferentes faixas dinâmicas com formatos únicos e movimentos aleatórios
  const dynamicStripes = [
    {
      width: '150vw',
      height: '60px',
      top: '-100px',
      left: '-50px',
      rotation: '-18deg',
      opacity: '0.12',
      animation: 'animate-snake-slow',
      delay: '0s',
      clipPath: 'polygon(0% 10%, 85% 0%, 100% 30%, 95% 70%, 80% 100%, 0% 90%, 5% 60%, 15% 40%)',
      color: 'bg-gradient-to-r from-orange-200/20 to-blue-200/20'
    },
    {
      width: '140vw',
      height: '45px',
      top: '50px',
      left: '-30px',
      rotation: '-25deg',
      opacity: '0.08',
      animation: 'animate-wave-fast',
      delay: '1.5s',
      clipPath: 'polygon(0% 20%, 90% 0%, 100% 40%, 85% 80%, 70% 100%, 0% 80%, 10% 50%)',
      color: 'bg-gradient-to-r from-purple-200/15 to-pink-200/15'
    },
    {
      width: '160vw',
      height: '75px',
      top: '180px',
      left: '-60px',
      rotation: '-12deg',
      opacity: '0.10',
      animation: 'animate-float-curve',
      delay: '3s',
      clipPath: 'polygon(0% 0%, 95% 5%, 100% 35%, 90% 65%, 75% 95%, 0% 100%, 5% 70%, 20% 30%)',
      color: 'bg-gradient-to-r from-teal-200/20 to-cyan-200/20'
    },
    {
      width: '135vw',
      height: '55px',
      top: '320px',
      left: '-40px',
      rotation: '-30deg',
      opacity: '0.09',
      animation: 'animate-slide-curve',
      delay: '0.8s',
      clipPath: 'polygon(0% 15%, 80% 0%, 100% 25%, 95% 75%, 85% 100%, 0% 85%, 15% 50%)',
      color: 'bg-gradient-to-r from-green-200/18 to-emerald-200/18'
    },
    {
      width: '170vw',
      height: '65px',
      top: '480px',
      left: '-70px',
      rotation: '-8deg',
      opacity: '0.11',
      animation: 'animate-snake-fast',
      delay: '2.2s',
      clipPath: 'polygon(0% 5%, 92% 0%, 100% 45%, 88% 80%, 65% 100%, 0% 95%, 8% 60%, 25% 25%)',
      color: 'bg-gradient-to-r from-red-200/16 to-orange-200/16'
    },
    {
      width: '145vw',
      height: '50px',
      top: '620px',
      left: '-35px',
      rotation: '-22deg',
      opacity: '0.07',
      animation: 'animate-wave-slow',
      delay: '4.1s',
      clipPath: 'polygon(0% 25%, 88% 0%, 100% 50%, 90% 90%, 70% 100%, 0% 75%, 12% 40%)',
      color: 'bg-gradient-to-r from-indigo-200/14 to-violet-200/14'
    },
    {
      width: '155vw',
      height: '70px',
      top: '760px',
      left: '-55px',
      rotation: '-15deg',
      opacity: '0.06',
      animation: 'animate-drift-curve',
      delay: '1.2s',
      clipPath: 'polygon(0% 0%, 90% 10%, 100% 60%, 85% 90%, 60% 100%, 0% 90%, 10% 55%, 30% 15%)',
      color: 'bg-gradient-to-r from-yellow-200/12 to-amber-200/12'
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Faixas dinâmicas e curvas ocupando toda a tela */}
      <div className="absolute inset-0">
        {dynamicStripes.map((stripe, index) => (
          <div
            key={index}
            className={`absolute ${stripe.color} ${stripe.animation}`}
            style={{
              width: stripe.width,
              height: stripe.height,
              top: stripe.top,
              left: stripe.left,
              transform: `translateY(${scrollY * (0.03 + Math.random() * 0.08)}px) rotate(${stripe.rotation})`,
              opacity: stripe.opacity,
              animationDelay: stripe.delay,
              clipPath: stripe.clipPath,
              borderRadius: '20px 40px 30px 10px'
            }}
          />
        ))}
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
