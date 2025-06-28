
import { Target, Users, Cog, TrendingUp, DollarSign, BarChart3, ArrowRight, Zap, Star, Heart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSCompactSolutionsCardsFrontend } from '@/hooks/useCMSCompactSolutionsCardsFrontend';
import CompactSolutionsHeader from './compact-solutions/CompactSolutionsHeader';
import SolutionCard from './compact-solutions/SolutionCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const CompactSolutionsSection = () => {
  const { t } = useLanguage();
  const { cards, loading } = useCMSCompactSolutionsCardsFrontend('home');

  // Icon mapping
  const iconMap = {
    Target: <Target className="w-6 h-6 text-white" />,
    Users: <Users className="w-6 h-6 text-white" />,
    Cog: <Cog className="w-6 h-6 text-white" />,
    TrendingUp: <TrendingUp className="w-6 h-6 text-white" />,
    DollarSign: <DollarSign className="w-6 h-6 text-white" />,
    BarChart3: <BarChart3 className="w-6 h-6 text-white" />,
    Zap: <Zap className="w-6 h-6 text-white" />,
    Star: <Star className="w-6 h-6 text-white" />,
    Heart: <Heart className="w-6 h-6 text-white" />,
    Shield: <Shield className="w-6 h-6 text-white" />,
  };

  const handleSolutionsClick = () => {
    // Navigate to solutions page and scroll to top
    window.location.href = '/solutions';
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <CompactSolutionsHeader />
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <CompactSolutionsHeader />

        {cards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {cards.map((card, index) => (
              <SolutionCard
                key={card.id}
                icon={iconMap[card.icon_name as keyof typeof iconMap] || iconMap.Target}
                title={card.title}
                description={card.description}
                index={index}
                engine={card.engine_name}
                backgroundColor={card.background_color}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No solutions available at the moment.</p>
          </div>
        )}

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
