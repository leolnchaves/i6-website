
import { Target, Users, Cog, TrendingUp, DollarSign, BarChart3, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const CompactSolutionsSection = () => {
  const { t } = useLanguage();

  const solutions = [
    {
      icon: <Target className="w-6 h-6 text-blue-700" />,
      title: t('solutions.smartDiscovery.title'),
      description: t('solutions.smartDiscovery.description')
    },
    {
      icon: <Users className="w-6 h-6 text-orange-700" />,
      title: t('solutions.predictivePersonalization.title'),
      description: t('solutions.predictivePersonalization.description')
    },
    {
      icon: <Cog className="w-6 h-6 text-blue-700" />,
      title: t('solutions.industrialRecommendation.title'),
      description: t('solutions.industrialRecommendation.description')
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-gray-700" />,
      title: t('solutions.predictiveCampaign.title'),
      description: t('solutions.predictiveCampaign.description')
    },
    {
      icon: <DollarSign className="w-6 h-6 text-orange-700" />,
      title: t('solutions.smartPricing.title'),
      description: t('solutions.smartPricing.description')
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-blue-700" />,
      title: t('solutions.demandForecasting.title'),
      description: t('solutions.demandForecasting.description')
    }
  ];

  const handleSolutionsClick = () => {
    // Navigate to solutions page and scroll to top
    window.location.href = '/solutions';
  };

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
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold hover:scale-105"
            onClick={handleSolutionsClick}
          >
            {t('solutions.viewAllSolutions')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CompactSolutionsSection;
