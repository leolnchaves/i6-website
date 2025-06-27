
import { Target, Users, Cog, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

export const getSolutionsData = (t: (key: string) => string) => [
  {
    icon: Target,
    title: t('solutions.smartDiscovery.title'),
    focus: t('solutions.smartDiscovery.focus'),
    description: t('solutions.smartDiscovery.description'),
    features: [
      t('solutions.smartDiscovery.feature1'),
      t('solutions.smartDiscovery.feature2'),
      t('solutions.smartDiscovery.feature3'),
      t('solutions.smartDiscovery.feature4')
    ],
    outcome: t('solutions.smartDiscovery.outcome'),
    gradient: "from-gray-600/80 to-blue-700/80",
    bgColor: "bg-gray-100/60",
    borderColor: "border-gray-300/60"
  },
  {
    icon: Users,
    title: t('solutions.predictivePersonalization.title'),
    focus: t('solutions.predictivePersonalization.focus'),
    description: t('solutions.predictivePersonalization.description'),
    features: [
      t('solutions.predictivePersonalization.feature1'),
      t('solutions.predictivePersonalization.feature2'),
      t('solutions.predictivePersonalization.feature3'),
      t('solutions.predictivePersonalization.feature4')
    ],
    outcome: t('solutions.predictivePersonalization.outcome'),
    gradient: "from-orange-600/80 to-red-600/80",
    bgColor: "bg-orange-100/60",
    borderColor: "border-orange-300/60"
  },
  {
    icon: Cog,
    title: t('solutions.industrialRecommendation.title'),
    focus: t('solutions.industrialRecommendation.focus'),
    description: t('solutions.industrialRecommendation.description'),
    features: [
      t('solutions.industrialRecommendation.feature1'),
      t('solutions.industrialRecommendation.feature2'),
      t('solutions.industrialRecommendation.feature3'),
      t('solutions.industrialRecommendation.feature4')
    ],
    outcome: t('solutions.industrialRecommendation.outcome'),
    gradient: "from-blue-600/80 to-gray-700/80",
    bgColor: "bg-blue-100/60",
    borderColor: "border-blue-300/60"
  },
  {
    icon: TrendingUp,
    title: t('solutions.predictiveCampaign.title'),
    focus: t('solutions.predictiveCampaign.focus'),
    description: t('solutions.predictiveCampaign.description'),
    features: [
      t('solutions.predictiveCampaign.feature1'),
      t('solutions.predictiveCampaign.feature2'),
      t('solutions.predictiveCampaign.feature3'),
      t('solutions.predictiveCampaign.feature4')
    ],
    outcome: t('solutions.predictiveCampaign.outcome'),
    gradient: "from-gray-600/80 to-blue-600/80",
    bgColor: "bg-gray-100/60",
    borderColor: "border-gray-300/60"
  },
  {
    icon: DollarSign,
    title: t('solutions.smartPricing.title'),
    focus: t('solutions.smartPricing.focus'),
    description: t('solutions.smartPricing.description'),
    features: [
      t('solutions.smartPricing.feature1'),
      t('solutions.smartPricing.feature2'),
      t('solutions.smartPricing.feature3'),
      t('solutions.smartPricing.feature4')
    ],
    outcome: t('solutions.smartPricing.outcome'),
    gradient: "from-orange-600/80 to-gray-600/80",
    bgColor: "bg-orange-100/60",
    borderColor: "border-orange-300/60"
  },
  {
    icon: BarChart3,
    title: t('solutions.demandForecasting.title'),
    focus: t('solutions.demandForecasting.focus'),
    description: t('solutions.demandForecasting.description'),
    features: [
      t('solutions.demandForecasting.feature1'),
      t('solutions.demandForecasting.feature2'),
      t('solutions.demandForecasting.feature3'),
      t('solutions.demandForecasting.feature4')
    ],
    outcome: t('solutions.demandForecasting.outcome'),
    gradient: "from-blue-600/80 to-gray-700/80",
    bgColor: "bg-blue-100/60",
    borderColor: "border-blue-300/60"
  }
];
