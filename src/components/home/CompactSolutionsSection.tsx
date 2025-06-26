
import { Target, Users, Cog, TrendingUp, DollarSign, BarChart3, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const CompactSolutionsSection = () => {
  const { t } = useLanguage();

  const solutions = [
    {
      icon: <Target className="w-6 h-6 text-blue-700" />,
      title: 'Smart Discovery for Anonymous Visitors',
      description: 'Turn anonymous traffic into engaged buyers. Our engine uses real-time signals and context to drive high-value recommendations without needing prior user history.'
    },
    {
      icon: <Users className="w-6 h-6 text-orange-700" />,
      title: 'Predictive Personalization for Identified Users',
      description: 'Deliver truly personalized experiences by predicting customer needs based on individual behavior and preferences. Increase retention and drive higher purchase frequency.'
    },
    {
      icon: <Cog className="w-6 h-6 text-blue-700" />,
      title: 'Industrial Recommendation Intelligence',
      description: 'Align commercial targets with intelligent recommendations that optimize assortment, pricing, and POS behavior — all in real time.'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-gray-700" />,
      title: 'Predictive Campaign Targeting',
      description: 'Identify and activate only the users most likely to convert before your campaign even begins. Reduce CAC and increase effectiveness with precision targeting.'
    },
    {
      icon: <DollarSign className="w-6 h-6 text-orange-700" />,
      title: 'Smart Price Optimization',
      description: 'A dynamic pricing solution that adapts in real time to demand, behavior, and product lifecycle. Maximize profitability without losing competitiveness.'
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-blue-700" />,
      title: 'Adaptive Demand Forecasting',
      description: 'Forecast demand with precision and adaptability. Our self-adjusting models project future sales based on trends, seasonality, and behaviors — empowering supply chain and commercial planning.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            <span className="block mb-2">{t('solutions.hero.title')}</span>
            <span className="block bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent pb-2">
              {t('solutions.hero.subtitle')}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {solutions.map((solution, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover-lift scroll-reveal glass bg-white/80 backdrop-blur-sm" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="mr-3 mt-1 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                    {solution.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 leading-tight">
                      {solution.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {solution.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Button to Solutions page */}
        <div className="text-center">
          <Link to="/solutions">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold hover:scale-105">
              {t('solutions.learnMore')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CompactSolutionsSection;
