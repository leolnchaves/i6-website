
import { Target, Users, Cog, TrendingUp, DollarSign, BarChart3, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import CompactSolutionsHeader from './compact-solutions/CompactSolutionsHeader';
import SolutionCard from './compact-solutions/SolutionCard';

const CompactSolutionsSection = () => {
  const { t } = useLanguage();

  const solutions = [
    {
      icon: <Target className="w-6 h-6 text-blue-700" />,
      title: t('solutions.smartDiscovery.title'),
      description: t('solutions.smartDiscovery.description'),
      backgroundImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop'
    },
    {
      icon: <Users className="w-6 h-6 text-orange-700" />,
      title: t('solutions.predictivePersonalization.title'),
      description: t('solutions.predictivePersonalization.description'),
      backgroundImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop'
    },
    {
      icon: <Cog className="w-6 h-6 text-blue-700" />,
      title: t('solutions.industrialRecommendation.title'),
      description: t('solutions.industrialRecommendation.description'),
      backgroundImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-gray-700" />,
      title: t('solutions.predictiveCampaign.title'),
      description: t('solutions.predictiveCampaign.description'),
      backgroundImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop'
    },
    {
      icon: <DollarSign className="w-6 h-6 text-orange-700" />,
      title: t('solutions.smartPricing.title'),
      description: t('solutions.smartPricing.description'),
      backgroundImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop'
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-blue-700" />,
      title: t('solutions.demandForecasting.title'),
      description: t('solutions.demandForecasting.description'),
      backgroundImage: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=200&fit=crop'
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
        <CompactSolutionsHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={index}
              icon={solution.icon}
              title={solution.title}
              description={solution.description}
              index={index}
              backgroundImage={solution.backgroundImage}
            />
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
