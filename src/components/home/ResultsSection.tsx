
import { TrendingUp, Shield, Award, Clock, Target, DollarSign, Eye, ShoppingCart, Search, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';

const ResultsSection = () => {
  const { scrollY } = useScrollAnimation();
  const { t } = useLanguage();

  const results = [
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
      title: t('results.conversionRate.title'),
      description: t('results.conversionRate.description')
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: t('results.crmCost.title'), 
      description: t('results.crmCost.description')
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-indigo-500" />,
      title: t('results.avgTicket.title'),
      description: t('results.avgTicket.description')
    },
    {
      icon: <Eye className="w-8 h-8 text-red-500" />,
      title: t('results.bounceRate.title'),
      description: t('results.bounceRate.description')
    },
    {
      icon: <Award className="w-8 h-8 text-orange-600" />,
      title: t('results.proposalEngagement.title'),
      description: t('results.proposalEngagement.description')
    },
    {
      icon: <Users className="w-8 h-8 text-pink-500" />,
      title: t('results.realTimeRec.title'),
      description: t('results.realTimeRec.description')
    },
    {
      icon: <Search className="w-8 h-8 text-teal-500" />,
      title: t('results.productDiscovery.title'),
      description: t('results.productDiscovery.description')
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-500" />,
      title: t('results.dynamicPricing.title'),
      description: t('results.dynamicPricing.description')
    },
    {
      icon: <Target className="w-8 h-8 text-purple-500" />,
      title: t('results.marketDemand.title'),
      description: t('results.marketDemand.description')
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: t('results.rapidImplementation.title'),
      description: t('results.rapidImplementation.description')
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-orange-50/30"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-blue-50/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            <span className="block mb-2">Real AI Impact</span>
            <span className="block bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent pb-2">
              Driving Business Growth
            </span>
          </h2>
          <div className="text-xl text-gray-600 max-w-4xl mx-auto mb-6">
            <p className="mb-4">
              {t('results.subtitle1')}
            </p>
            <p>
              {t('results.subtitle2')}
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
