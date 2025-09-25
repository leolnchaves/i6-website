import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import * as LucideIcons from 'lucide-react';

interface CompactVerticalCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
  category: string;
  features?: string[];
  outcome?: string;
}

const CompactVerticalCard = ({ 
  title, 
  description, 
  icon, 
  index, 
  category,
  features,
  outcome 
}: CompactVerticalCardProps) => {
  
  const getIcon = (iconName: string) => {
    const iconKey = iconName.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('') as keyof typeof LucideIcons;
    
    const IconComponent = LucideIcons[iconKey] as React.ComponentType<any>;
    
    if (IconComponent && typeof IconComponent === 'function') {
      return IconComponent;
    }
    
    return LucideIcons.Brain;
  };

  const getRelatedIcons = (mainIcon: string) => {
    const iconSets = {
      'trending-up': [LucideIcons.BarChart3, LucideIcons.Target, LucideIcons.TrendingUp],
      'users': [LucideIcons.Users, LucideIcons.UserCheck, LucideIcons.UserPlus],
      'brain': [LucideIcons.Brain, LucideIcons.Zap, LucideIcons.Lightbulb],
      'shopping-cart': [LucideIcons.ShoppingCart, LucideIcons.CreditCard, LucideIcons.Package],
      'settings': [LucideIcons.Settings, LucideIcons.Sliders, LucideIcons.Cog],
      'factory': [LucideIcons.Factory, LucideIcons.Cpu, LucideIcons.Bot]
    };
    
    return iconSets[mainIcon as keyof typeof iconSets] || [LucideIcons.Sparkles, LucideIcons.Star, LucideIcons.Zap];
  };

  const getColorScheme = (cardIndex: number) => {
    // Gradient transition from orange to blue (matching menu hover gradient)
    const schemes = [
      { 
        bg: 'from-orange-200/60 via-orange-100/40 to-orange-50/30', 
        iconBg: 'from-orange-500/90 to-orange-600/90',
        accent: 'text-orange-700',
        border: 'border-orange-200/50 hover:border-orange-300/70'
      },
      { 
        bg: 'from-amber-200/60 via-amber-100/40 to-yellow-50/30', 
        iconBg: 'from-amber-500/90 to-yellow-500/90',
        accent: 'text-amber-700',
        border: 'border-amber-200/50 hover:border-amber-300/70'
      },
      { 
        bg: 'from-cyan-200/60 via-cyan-100/40 to-sky-50/30', 
        iconBg: 'from-cyan-500/90 to-sky-500/90',
        accent: 'text-cyan-700',
        border: 'border-cyan-200/50 hover:border-cyan-300/70'
      },
      { 
        bg: 'from-sky-200/60 via-sky-100/40 to-blue-50/30', 
        iconBg: 'from-sky-500/90 to-blue-500/90',
        accent: 'text-sky-700',
        border: 'border-sky-200/50 hover:border-sky-300/70'
      },
      { 
        bg: 'from-blue-200/60 via-blue-100/40 to-indigo-50/30', 
        iconBg: 'from-blue-500/90 to-indigo-500/90',
        accent: 'text-blue-700',
        border: 'border-blue-200/50 hover:border-blue-300/70'
      },
      { 
        bg: 'from-indigo-200/60 via-indigo-100/40 to-blue-50/30', 
        iconBg: 'from-indigo-500/90 to-blue-600/90',
        accent: 'text-indigo-700',
        border: 'border-indigo-200/50 hover:border-indigo-300/70'
      }
    ];
    return schemes[cardIndex % schemes.length];
  };

  const MainIcon = getIcon(icon);
  const relatedIcons = getRelatedIcons(icon);
  const colorScheme = getColorScheme(index);

  // Formas curvas conectadas para criar continuidade visual perfeita
  const getCurvedBackground = (cardIndex: number) => {
    const shapes = [
      // Card 1: começa alto à esquerda (20%), termina baixo à direita (70%)
      {
        clipPath: 'polygon(0% 20%, 25% 25%, 50% 40%, 75% 55%, 100% 70%, 100% 0%, 0% 0%)',
        height: 'h-64'
      },
      // Card 2: começa baixo à esquerda (70%), termina alto à direita (25%)
      {
        clipPath: 'polygon(0% 70%, 25% 55%, 50% 35%, 75% 30%, 100% 25%, 100% 0%, 0% 0%)',
        height: 'h-68'
      },
      // Card 3: começa alto à esquerda (25%), termina baixo à direita (65%)
      {
        clipPath: 'polygon(0% 25%, 25% 30%, 50% 45%, 75% 55%, 100% 65%, 100% 0%, 0% 0%)',
        height: 'h-60'
      },
      // Card 4: começa baixo à esquerda (65%), termina alto à direita (30%)
      {
        clipPath: 'polygon(0% 65%, 25% 50%, 50% 35%, 75% 25%, 100% 30%, 100% 0%, 0% 0%)',
        height: 'h-66'
      },
      // Card 5: começa alto à esquerda (30%), termina baixo à direita (60%)
      {
        clipPath: 'polygon(0% 30%, 25% 35%, 50% 45%, 75% 55%, 100% 60%, 100% 0%, 0% 0%)',
        height: 'h-62'
      },
      // Card 6: começa baixo à esquerda (60%), termina alto à direita (35%)
      {
        clipPath: 'polygon(0% 60%, 25% 45%, 50% 30%, 75% 25%, 100% 35%, 100% 0%, 0% 0%)',
        height: 'h-64'
      }
    ];
    return shapes[cardIndex % shapes.length];
  };

  const curvedShape = getCurvedBackground(index);

  return (
    <Card className={`group relative overflow-hidden border-2 ${colorScheme.border} hover:shadow-xl transition-all duration-500 hover:scale-[1.02] rounded-3xl bg-white`}>
      {/* Fundo curvo apenas no topo */}
      <div 
        className={`absolute top-0 left-0 right-0 ${curvedShape.height} bg-gradient-to-br ${colorScheme.bg} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}
        style={{
          clipPath: curvedShape.clipPath
        }}
      ></div>

      {/* Faixa lateral hover com gradiente do menu */}
      <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-orange-500 to-blue-500 opacity-0 group-hover:opacity-100 group-hover:w-16 transition-all duration-300 flex items-center justify-center">
        <Link 
          to="/solutions"
          className="text-white text-xs font-medium writing-mode-vertical transform rotate-180 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150 hover:text-orange-200"
        >
          Saiba Mais
        </Link>
      </div>

      <CardContent className="relative p-8 text-center z-10">

        {/* Título */}
        <h3 className="font-bold text-xl text-gray-900 mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        
        {/* Descrição */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {description}
        </p>

      </CardContent>
    </Card>
  );
};

export default memo(CompactVerticalCard);