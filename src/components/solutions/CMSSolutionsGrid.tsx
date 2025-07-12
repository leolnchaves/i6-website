
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSSolutionsCards } from '@/hooks/useCMSSolutionsCards';
import { useCMSPage } from '@/hooks/useCMSPage';
import ModernSolutionCard from './ModernSolutionCard';
import SolutionDetailModal from './SolutionDetailModal';
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
  Lightbulb,
  LucideIcon
} from 'lucide-react';

const iconMap: { [key: string]: LucideIcon } = {
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
  const [selectedSolution, setSelectedSolution] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loading = pageLoading || cardsLoading;

  const handleViewDetails = (card: any, iconComponent: LucideIcon) => {
    setSelectedSolution({
      ...card,
      icon: iconComponent
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSolution(null);
  };

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
    <>
      <section className="py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 gap-8 max-w-6xl mx-auto">
            {cards.map((card, index) => {
              const IconComponent = iconMap[card.icon] || Building2;
              
              return (
                <ModernSolutionCard
                  key={card.id}
                  icon={IconComponent}
                  title={card.title}
                  focus={card.focus}
                  description={card.description}
                  features={card.features}
                  outcome={card.outcome}
                  engine={card.engine}
                  bgColor={card.bg_color}
                  index={index}
                  onViewDetails={() => handleViewDetails(card, IconComponent)}
                />
              );
            })}
          </div>
        </div>
      </section>

      <SolutionDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        solution={selectedSolution}
      />
    </>
  );
};

export default CMSSolutionsGrid;
