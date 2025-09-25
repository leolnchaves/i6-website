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
    // Todos os cards usam o mesmo esquema de cor laranja (primeiro card)
    return { 
      bg: 'from-orange-200/60 via-orange-100/40 to-orange-50/30', 
      iconBg: 'from-orange-500/90 to-orange-600/90',
      accent: 'text-orange-700',
      border: 'border-orange-200/50 hover:border-orange-300/70'
    };
  };

  const MainIcon = getIcon(icon);
  const relatedIcons = getRelatedIcons(icon);
  const colorScheme = getColorScheme(index);

  // Curva S normal para cards pares, invertida para cards ímpares (meio)
  const getCurvedBackground = (cardIndex: number) => {
    // Cards do meio (índices ímpares) têm curva invertida
    if (cardIndex % 2 === 1) {
      return {
        clipPath: 'polygon(0% 70%, 25% 55%, 50% 35%, 75% 25%, 100% 20%, 100% 0%, 0% 0%)',
        height: 'h-64'
      };
    }
    // Cards das laterais (índices pares) têm curva normal
    return {
      clipPath: 'polygon(0% 20%, 25% 25%, 50% 40%, 75% 55%, 100% 70%, 100% 0%, 0% 0%)',
      height: 'h-64'
    };
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

      {/* Faixa inferior hover com gradiente do menu */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-blue-500 opacity-0 group-hover:opacity-100 group-hover:h-12 transition-all duration-300 flex items-center justify-center rounded-b-3xl z-20">
        <Link 
          to={`/solutions#${title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}
          className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150 hover:text-orange-200 cursor-pointer hover:scale-105 transform transition-transform duration-200 px-6 py-2"
        >
          Saiba Mais
        </Link>
      </div>

      <CardContent className="relative p-8 text-center z-10 min-h-[280px] flex flex-col justify-between pb-16">

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