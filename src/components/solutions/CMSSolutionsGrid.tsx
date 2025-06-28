
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSSolutionsCards } from '@/hooks/useCMSSolutionsCards';
import { useCMSPage } from '@/hooks/useCMSPage';
import SolutionCard from './SolutionCard';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  BarChart3, 
  Target, 
  Award, 
  Zap, 
  Building2, 
  Globe, 
  Rocket,
  Brain,
  ShoppingCart,
  LineChart,
  Lightbulb
} from 'lucide-react';

const iconMap: { [key: string]: React.ComponentType<any> } = {
  'trending-up': TrendingUp,
  'users': Users,
  'dollar-sign': DollarSign,
  'bar-chart-3': BarChart3,
  'target': Target,
  'award': Award,
  'zap': Zap,
  'building-2': Building2,
  'globe': Globe,
  'rocket': Rocket,
  'brain': Brain,
  'shopping-cart': ShoppingCart,
  'line-chart': LineChart,
  'lightbulb': Lightbulb,
};

const CMSSolutionsGrid = () => {
  const { language } = useLanguage();
  const { pageId, loading: pageLoading } = useCMSPage('solutions');
  const { cards, loading: cardsLoading } = useCMSSolutionsCards(pageId || '', language);

  const loading = pageLoading || cardsLoading;

  console.log('CMSSolutionsGrid - Page ID:', pageId);
  console.log('CMSSolutionsGrid - Cards loaded:', cards.length);
  console.log('CMSSolutionsGrid - Loading:', loading);
  console.log('CMSSolutionsGrid - Language:', language);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">Carregando solutions...</div>
          </div>
        </div>
      </section>
    );
  }

  if (!pageId) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="space-y-2">
              <p>Página Solutions não encontrada no CMS</p>
              <p className="text-sm">Configure a página no painel administrativo primeiro</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (cards.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="space-y-2">
              <p>Nenhuma solution encontrada no CMS</p>
              <p className="text-sm">Configure as solutions no painel administrativo</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {cards.map((card, index) => {
            const IconComponent = iconMap[card.icon] || Building2;
            
            return (
              <SolutionCard
                key={card.id}
                icon={IconComponent}
                title={card.title}
                focus={card.focus}
                description={card.description}
                features={card.features}
                outcome={card.outcome}
                gradient={card.gradient}
                bgColor={card.bg_color}
                borderColor={card.border_color}
                engine={card.engine}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CMSSolutionsGrid;
