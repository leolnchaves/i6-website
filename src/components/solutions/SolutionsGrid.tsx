
import { Target, Users, Cog, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import SolutionCard from './SolutionCard';

const SolutionsGrid = () => {
  const { t } = useLanguage();

  const solutions = [
    {
      icon: <Target className="w-8 h-8 text-blue-700" />,
      titleKey: 'solutions.aiAnalytics.title',
      focus: 'Focus: B2B, B2C',
      descriptionKey: 'solutions.aiAnalytics.description',
      features: [
        t('solutions.aiAnalytics.feature1'),
        t('solutions.aiAnalytics.feature2'),
        t('solutions.aiAnalytics.feature3'),
        t('solutions.aiAnalytics.feature4')
      ],
      outcome: 'Unlocks product discovery and boosts engagement with zero historical data.',
      gradient: "from-gray-600/80 to-blue-700/80",
      bgColor: "bg-gray-100/60",
      borderColor: "border-gray-300/60"
    },
    {
      icon: <Users className="w-8 h-8 text-orange-700" />,
      titleKey: 'solutions.processAutomation.title',
      focus: 'Focus: B2B, B2C, B2B2C, D2C',
      descriptionKey: 'solutions.processAutomation.description',
      features: [
        t('solutions.processAutomation.feature1'),
        t('solutions.processAutomation.feature2'),
        t('solutions.processAutomation.feature3'),
        t('solutions.processAutomation.feature4')
      ],
      outcome: 'Increases customer lifetime value with intelligent, behavior-based personalization.',
      gradient: "from-orange-600/80 to-red-600/80",
      bgColor: "bg-orange-100/60",
      borderColor: "border-orange-300/60"
    },
    {
      icon: <Cog className="w-8 h-8 text-blue-700" />,
      titleKey: 'solutions.dataIntelligence.title',
      focus: 'Focus: B2B, B2B2C',
      descriptionKey: 'solutions.dataIntelligence.description',
      features: [
        t('solutions.dataIntelligence.feature1'),
        t('solutions.dataIntelligence.feature2'),
        t('solutions.dataIntelligence.feature3'),
        t('solutions.dataIntelligence.feature4')
      ],
      outcome: 'Drives product relevance and sell-out, aligned with revenue and margin goals.',
      gradient: "from-blue-600/80 to-gray-700/80",
      bgColor: "bg-blue-100/60",
      borderColor: "border-blue-300/60"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-gray-700" />,
      titleKey: 'solutions.cloudIntegration.title',
      focus: 'Focus: B2C',
      descriptionKey: 'solutions.cloudIntegration.description',
      features: [
        t('solutions.cloudIntegration.feature1'),
        t('solutions.cloudIntegration.feature2'),
        t('solutions.cloudIntegration.feature3'),
        t('solutions.cloudIntegration.feature4')
      ],
      outcome: 'Maximizes ROI by targeting the right customer at the right time.',
      gradient: "from-gray-600/80 to-blue-600/80",
      bgColor: "bg-gray-100/60",
      borderColor: "border-gray-300/60"
    },
    {
      icon: <DollarSign className="w-8 h-8 text-orange-700" />,
      titleKey: 'solutions.cloudIntegration.title',
      focus: 'Focus: B2B, B2C, B2B2C, D2C',
      descriptionKey: 'solutions.cloudIntegration.description',
      features: [
        t('solutions.cloudIntegration.feature1'),
        t('solutions.cloudIntegration.feature2'),
        t('solutions.cloudIntegration.feature3'),
        t('solutions.cloudIntegration.feature4')
      ],
      outcome: 'Improves margin, sales velocity, and competitiveness through intelligent pricing.',
      gradient: "from-orange-600/80 to-gray-600/80",
      bgColor: "bg-orange-100/60",
      borderColor: "border-orange-300/60"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-700" />,
      titleKey: 'solutions.cloudIntegration.title',
      focus: 'Focus: B2B, B2C',
      descriptionKey: 'solutions.cloudIntegration.description',
      features: [
        t('solutions.cloudIntegration.feature1'),
        t('solutions.cloudIntegration.feature2'),
        t('solutions.cloudIntegration.feature3'),
        t('solutions.cloudIntegration.feature4')
      ],
      outcome: 'Enhances demand planning accuracy and agility in fast-changing markets.',
      gradient: "from-blue-600/80 to-gray-700/80",
      bgColor: "bg-blue-100/60",
      borderColor: "border-blue-300/60"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <SolutionCard key={index} {...solution} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsGrid;
