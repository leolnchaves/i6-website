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
      { icon: 'from-blue-500 to-blue-600', hover: 'from-blue-50 to-blue-100' },
      { icon: 'from-purple-500 to-purple-600', hover: 'from-purple-50 to-purple-100' },
      { icon: 'from-green-500 to-green-600', hover: 'from-green-50 to-green-100' },
      { icon: 'from-orange-500 to-orange-600', hover: 'from-orange-50 to-orange-100' },
      { icon: 'from-teal-500 to-teal-600', hover: 'from-teal-50 to-teal-100' },
      { icon: 'from-indigo-500 to-indigo-600', hover: 'from-indigo-50 to-indigo-100' }
    ];
    return schemes[cardIndex % schemes.length];
  };

  const colorScheme = getColorScheme(index);
  const imageUrl = placeholderImages[index % placeholderImages.length];

  return (
    <Card className="group relative overflow-hidden border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.02] rounded-2xl bg-white">
      {/* Gradiente de hover sutil no fundo */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colorScheme.hover} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}></div>
      
      <CardContent className="relative p-6 z-10">
        {/* Header com ícone e categoria */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-3 bg-gradient-to-br ${colorScheme.icon} rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
              {getIcon(icon)}
            </div>
            <div className="bg-gray-100 group-hover:bg-white/80 px-3 py-1.5 rounded-full transition-colors duration-300">
              <span className="text-xs font-medium text-gray-700 group-hover:text-primary">
                {category}
              </span>
            </div>
          </div>
          
          {/* GIF animado pequeno e elegante */}
          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 group-hover:shadow-lg transition-shadow duration-300">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Título principal */}
        <h3 className="font-bold text-xl text-gray-900 group-hover:text-primary mb-3 leading-tight transition-colors duration-300">
          {title}
        </h3>
        
        {/* Descrição */}
        <p className="text-gray-600 group-hover:text-gray-700 text-sm leading-relaxed mb-5 transition-colors duration-300">
          {description}
        </p>

        {/* Features como lista elegante */}
        {features && features.length > 0 && (
          <div className="space-y-2 mb-5">
            {features.slice(0, 3).map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 bg-gradient-to-r ${colorScheme.icon} rounded-full`}></div>
                <span className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {feature}
                </span>
              </div>
            ))}
            {features.length > 3 && (
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                <span className="text-xs text-gray-500">
                  +{features.length - 3} funcionalidades
                </span>
              </div>
            )}
          </div>
        )}

        {/* Outcome como destaque final */}
        {outcome && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent h-px top-0"></div>
            <div className="pt-4">
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">✓</span>
                </div>
                <p className="text-xs text-primary font-medium leading-relaxed">
                  {outcome}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default memo(CompactVerticalCard);