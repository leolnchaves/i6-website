
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface DynamicSolutionCardProps {
  title: string;
  description: string;
  icon: string;
  engine: string;
  index: number;
}

const DynamicSolutionCard = ({ title, description, icon, engine, index }: DynamicSolutionCardProps) => {
  // Função para obter o ícone do Lucide
  const getIcon = (iconName: string) => {
    // Converte o nome do ícone para PascalCase se necessário
    const iconKey = iconName.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    const IconComponent = (LucideIcons as any)[iconKey] || (LucideIcons as any)[iconName] || LucideIcons.Circle;
    return IconComponent;
  };

  const IconComponent = getIcon(icon);

  return (
    <Card 
      className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-500 hover:scale-105 scroll-reveal rounded-xl bg-white" 
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardContent className="p-8 h-full flex flex-col justify-between relative">
        {/* Engine badge */}
        <div className="flex justify-end mb-4">
          <div className="bg-gradient-to-r from-blue-50 to-orange-50 px-3 py-1 rounded-full border border-blue-100">
            <span className="text-xs font-medium text-gray-700">
              {engine}
            </span>
          </div>
        </div>
        
        {/* Icon */}
        <div className="mb-6 flex items-center justify-center">
          <div className="p-4 bg-gradient-to-br from-blue-500 to-orange-500 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
            <IconComponent className="w-8 h-8 text-white" />
          </div>
        </div>
        
        {/* Title - Destacado */}
        <h3 className="font-bold text-xl mb-4 leading-tight text-gray-900 text-center group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed flex-grow text-center">
          {description}
        </p>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
      </CardContent>
    </Card>
  );
};

export default DynamicSolutionCard;
