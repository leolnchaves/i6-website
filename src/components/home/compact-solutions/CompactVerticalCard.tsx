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
      return <IconComponent size={24} className="text-white" />;
    }
    
    return <LucideIcons.Brain size={24} className="text-white" />;
  };

  const placeholderImages = [
    '/solution-Anonymous-Visitors.gif',
    '/solucao-Identified-Users.gif',
    '/solucao-Predictive-Campaign.gif',
    '/solucao-Smart-Price.gif',
    '/solucao-Adaptive-Demand.gif',
    '/solucao-Industrial-Intelligence.gif'
  ];

  const getColorScheme = (cardIndex: number) => {
    const schemes = [
      { bg: 'from-blue-600 to-blue-700', accent: 'bg-blue-500/20' },
      { bg: 'from-purple-600 to-purple-700', accent: 'bg-purple-500/20' },
      { bg: 'from-green-600 to-green-700', accent: 'bg-green-500/20' },
      { bg: 'from-orange-600 to-orange-700', accent: 'bg-orange-500/20' },
      { bg: 'from-teal-600 to-teal-700', accent: 'bg-teal-500/20' },
      { bg: 'from-indigo-600 to-indigo-700', accent: 'bg-indigo-500/20' }
    ];
    return schemes[cardIndex % schemes.length];
  };

  const colorScheme = getColorScheme(index);
  const imageUrl = placeholderImages[index % placeholderImages.length];

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] rounded-xl bg-white">
      <CardContent className="p-0">
        {/* Header com gif pequeno */}
        <div className={`relative h-32 bg-gradient-to-br ${colorScheme.bg} overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <img
            src={imageUrl}
            alt={title}
            className="absolute top-2 right-2 w-16 h-16 object-cover rounded-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          
          {/* Categoria e ícone */}
          <div className="absolute top-4 left-4 flex items-center gap-3">
            <div className={`p-2 ${colorScheme.accent} rounded-lg backdrop-blur-sm`}>
              {getIcon(icon)}
            </div>
            <div className="text-white/90 text-xs font-medium bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
              {category}
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="p-5">
          <h3 className="font-bold text-lg text-gray-900 mb-3 leading-tight group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {description}
          </p>

          {/* Features como badges */}
          {features && features.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {features.slice(0, 2).map((feature, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                >
                  {feature}
                </span>
              ))}
              {features.length > 2 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{features.length - 2} mais
                </span>
              )}
            </div>
          )}

          {/* Outcome como footer */}
          {outcome && (
            <div className="border-t border-gray-100 pt-3 mt-3">
              <p className="text-xs text-primary font-medium">
                💡 {outcome}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(CompactVerticalCard);