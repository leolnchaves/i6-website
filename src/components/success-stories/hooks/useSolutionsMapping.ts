import { useLanguage } from '@/contexts/LanguageContext';
import { Users, ShoppingCart, Building2, Target, DollarSign, BarChart3 } from 'lucide-react';

interface StoryCard {
  id: string;
  industry: string;
  company_name: string;
  challenge: string;
  solution: string;
  metric1_value: string;
  metric1_label: string;
  metric2_value: string;
  metric2_label: string;
  metric3_value: string;
  metric3_label: string;
  customer_quote: string;
  customer_name: string;
  customer_title: string;
  image_url: string;
}

interface Solution {
  icon: any;
  name: string;
  color: string;
}

export const useSolutionsMapping = () => {
  const { language } = useLanguage();

  const getImplementedSolutions = (story: StoryCard): Solution[] => {
    const iconMap = {
      'users': Users,
      'shopping-cart': ShoppingCart,
      'building-2': Building2,
      'target': Target,
      'dollar-sign': DollarSign,
      'bar-chart-3': BarChart3
    };

    const solutionsByIndustry = {
      'E-commerce': [
        { 
          icon: iconMap['users'], 
          name: language === 'en' ? 'Smart Discovery for Anonymous Visitors' : 'Descoberta Inteligente para Visitantes Anônimos', 
          color: 'bg-slate-100 text-slate-700' 
        },
        { 
          icon: iconMap['shopping-cart'], 
          name: language === 'en' ? 'Predictive Personalization' : 'Personalização Preditiva', 
          color: 'bg-gray-100 text-gray-700' 
        },
        { 
          icon: iconMap['target'], 
          name: language === 'en' ? 'Predictive Campaign Targeting' : 'Segmentação Preditiva de Campanha', 
          color: 'bg-stone-100 text-stone-700' 
        }
      ],
      'Manufacturing': [
        { 
          icon: iconMap['building-2'], 
          name: language === 'en' ? 'Industrial Recommendation Intelligence' : 'Inteligência de Recomendação Industrial', 
          color: 'bg-slate-100 text-slate-700' 
        },
        { 
          icon: iconMap['bar-chart-3'], 
          name: language === 'en' ? 'Adaptive Demand Forecasting' : 'Previsão Adaptativa de Demanda', 
          color: 'bg-gray-100 text-gray-700' 
        },
        { 
          icon: iconMap['dollar-sign'], 
          name: language === 'en' ? 'Smart Price Optimization' : 'Otimização Inteligente de Preços', 
          color: 'bg-stone-100 text-stone-700' 
        }
      ],
      'Healthcare': [
        { 
          icon: iconMap['bar-chart-3'], 
          name: language === 'en' ? 'Adaptive Demand Forecasting' : 'Previsão Adaptativa de Demanda', 
          color: 'bg-slate-100 text-slate-700' 
        },
        { 
          icon: iconMap['target'], 
          name: language === 'en' ? 'Predictive Campaign Targeting' : 'Segmentação Preditiva de Campanha', 
          color: 'bg-gray-100 text-gray-700' 
        },
        { 
          icon: iconMap['shopping-cart'], 
          name: language === 'en' ? 'Predictive Personalization' : 'Personalização Preditiva', 
          color: 'bg-stone-100 text-stone-700' 
        }
      ],
      'Finance': [
        { 
          icon: iconMap['target'], 
          name: language === 'en' ? 'Predictive Campaign Targeting' : 'Segmentação Preditiva de Campanha', 
          color: 'bg-slate-100 text-slate-700' 
        },
        { 
          icon: iconMap['shopping-cart'], 
          name: language === 'en' ? 'Predictive Personalization' : 'Personalização Preditiva', 
          color: 'bg-gray-100 text-gray-700' 
        },
        { 
          icon: iconMap['users'], 
          name: language === 'en' ? 'Smart Discovery for Anonymous Visitors' : 'Descoberta Inteligente para Visitantes Anônimos', 
          color: 'bg-stone-100 text-stone-700' 
        }
      ],
      'Logistics': [
        { 
          icon: iconMap['bar-chart-3'], 
          name: language === 'en' ? 'Adaptive Demand Forecasting' : 'Previsão Adaptativa de Demanda', 
          color: 'bg-slate-100 text-slate-700' 
        },
        { 
          icon: iconMap['building-2'], 
          name: language === 'en' ? 'Industrial Recommendation Intelligence' : 'Inteligência de Recomendação Industrial', 
          color: 'bg-gray-100 text-gray-700' 
        },
        { 
          icon: iconMap['dollar-sign'], 
          name: language === 'en' ? 'Smart Price Optimization' : 'Otimização Inteligente de Preços', 
          color: 'bg-stone-100 text-stone-700' 
        }
      ],
      'Automotive': [
        { 
          icon: iconMap['building-2'], 
          name: language === 'en' ? 'Industrial Recommendation Intelligence' : 'Inteligência de Recomendação Industrial', 
          color: 'bg-slate-100 text-slate-700' 
        },
        { 
          icon: iconMap['bar-chart-3'], 
          name: language === 'en' ? 'Adaptive Demand Forecasting' : 'Previsão Adaptativa de Demanda', 
          color: 'bg-gray-100 text-gray-700' 
        },
        { 
          icon: iconMap['dollar-sign'], 
          name: language === 'en' ? 'Smart Price Optimization' : 'Otimização Inteligente de Preços', 
          color: 'bg-stone-100 text-stone-700' 
        }
      ]
    };

    return solutionsByIndustry[story.industry as keyof typeof solutionsByIndustry] || [
      { icon: iconMap['users'], name: language === 'en' ? 'Smart Discovery for Anonymous Visitors' : 'Descoberta Inteligente para Visitantes Anônimos', color: 'bg-slate-100 text-slate-700' },
      { icon: iconMap['shopping-cart'], name: language === 'en' ? 'Predictive Personalization' : 'Personalização Preditiva', color: 'bg-gray-100 text-gray-700' },
      { icon: iconMap['target'], name: language === 'en' ? 'Predictive Campaign Targeting' : 'Segmentação Preditiva de Campanha', color: 'bg-stone-100 text-stone-700' }
    ];
  };

  return { getImplementedSolutions };
};