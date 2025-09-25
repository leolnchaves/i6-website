import { memo } from 'react';
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
    const schemes = [
      { 
        bg: 'from-blue-100 via-blue-50 to-cyan-50', 
        iconBg: 'from-blue-500 to-cyan-500',
        accent: 'text-blue-600',
        border: 'border-blue-200 hover:border-blue-300'
      },
      { 
        bg: 'from-purple-100 via-purple-50 to-pink-50', 
        iconBg: 'from-purple-500 to-pink-500',
        accent: 'text-purple-600',
        border: 'border-purple-200 hover:border-purple-300'
      },
      { 
        bg: 'from-green-100 via-green-50 to-emerald-50', 
        iconBg: 'from-green-500 to-emerald-500',
        accent: 'text-green-600',
        border: 'border-green-200 hover:border-green-300'
      },
      { 
        bg: 'from-orange-100 via-orange-50 to-amber-50', 
        iconBg: 'from-orange-500 to-amber-500',
        accent: 'text-orange-600',
        border: 'border-orange-200 hover:border-orange-300'
      },
      { 
        bg: 'from-teal-100 via-teal-50 to-cyan-50', 
        iconBg: 'from-teal-500 to-cyan-500',
        accent: 'text-teal-600',
        border: 'border-teal-200 hover:border-teal-300'
      },
      { 
        bg: 'from-indigo-100 via-indigo-50 to-purple-50', 
        iconBg: 'from-indigo-500 to-purple-500',
        accent: 'text-indigo-600',
        border: 'border-indigo-200 hover:border-indigo-300'
      }
    ];
    return schemes[cardIndex % schemes.length];
  };

  const MainIcon = getIcon(icon);
  const relatedIcons = getRelatedIcons(icon);
  const colorScheme = getColorScheme(index);

  // Formas curvas conectadas para criar continuidade visual
  const getCurvedBackground = (cardIndex: number) => {
    const shapes = [
      // Card 1: começa alto à esquerda (20%), termina baixo à direita (70%)
      {
        clipPath: 'polygon(0% 20%, 100% 70%, 100% 0%, 0% 0%)',
        height: 'h-32'
      },
      // Card 2: começa baixo à esquerda (70%), termina alto à direita (25%)
      {
        clipPath: 'polygon(0% 70%, 100% 25%, 100% 0%, 0% 0%)',
        height: 'h-36'
      },
      // Card 3: começa alto à esquerda (25%), termina baixo à direita (65%)
      {
        clipPath: 'polygon(0% 25%, 100% 65%, 100% 0%, 0% 0%)',
        height: 'h-28'
      }
    ];
    return shapes[cardIndex % 3];
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

      <CardContent className="relative p-8 text-center z-10">
        {/* Área do ícone principal sem círculo de fundo */}
        <div className="relative mb-8 mx-auto w-40 h-40 flex items-center justify-center">
          {/* Ícone principal centralizado */}
          <div className={`relative z-10 p-4 bg-gradient-to-br ${colorScheme.iconBg} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <MainIcon size={32} className="text-white" />
          </div>
          
          {/* Ícones flutuantes em órbita */}
          {relatedIcons.map((IconComp, idx) => {
            const orbitAnimations = ['orbit1', 'orbit2', 'orbit3'];
            const durations = ['8s', '10s', '12s'];
            const delays = ['0s', '1s', '2s'];
            
            return (
              <div
                key={idx}
                className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  animation: `${orbitAnimations[idx]} ${durations[idx]} linear infinite`,
                  animationDelay: delays[idx]
                }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="p-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 group-hover:shadow-xl transition-shadow duration-300">
                    <IconComp size={18} className={colorScheme.accent} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>


        {/* Título */}
        <h3 className="font-bold text-xl text-gray-900 mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        
        {/* Descrição */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {description}
        </p>

        {/* Features como indicadores */}
        {features && features.length > 0 && (
          <div className="flex justify-center gap-1 mb-6">
            {features.slice(0, 3).map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 bg-gradient-to-r ${colorScheme.iconBg} rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              ></div>
            ))}
          </div>
        )}

        {/* Outcome como call-to-action */}
        {outcome && (
          <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${colorScheme.iconBg} text-white text-xs font-medium rounded-full group-hover:shadow-lg transition-shadow duration-300`}>
            <LucideIcons.ArrowRight size={14} />
            <span>Saiba mais</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default memo(CompactVerticalCard);