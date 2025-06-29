
import { Card, CardContent } from '@/components/ui/card';
import * as LucideIcons from 'lucide-react';

interface ModernSolutionCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
}

const ModernSolutionCard = ({ title, description, icon, index }: ModernSolutionCardProps) => {
  // Função para obter o ícone do Lucide
  const getIcon = (iconName: string) => {
    const iconKey = iconName.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    const IconComponent = (LucideIcons as any)[iconKey] || (LucideIcons as any)[iconName] || LucideIcons.Building2;
    return IconComponent;
  };

  const IconComponent = getIcon(icon);

  return (
    <Card 
      className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-700 hover:scale-[1.02] bg-white/80 backdrop-blur-sm" 
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <CardContent className="p-8 h-full flex flex-col items-center text-center relative">
        {/* Gradient background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg" />
        
        {/* Icon Container */}
        <div className="relative mb-6 transform group-hover:scale-110 transition-transform duration-500">
          <div className="relative">
            {/* Icon background with gradient */}
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-500">
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            {/* Floating accent */}
            <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/20 to-orange-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
          </div>
        </div>
        
        {/* Title - Destacado */}
        <h3 className="relative font-bold text-xl mb-4 leading-tight text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-orange-600 group-hover:bg-clip-text transition-all duration-500">
          {title}
        </h3>
        
        {/* Description */}
        <p className="relative text-gray-600 text-sm leading-relaxed flex-grow group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>

        {/* Subtle animation accent */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-orange-500 group-hover:w-16 transition-all duration-500" />
      </CardContent>
    </Card>
  );
};

export default ModernSolutionCard;
