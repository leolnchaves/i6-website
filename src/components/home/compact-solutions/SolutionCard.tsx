
import { Card, CardContent } from '@/components/ui/card';

interface SolutionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  engine: string;
  backgroundColor: string;
  backgroundOpacity?: number;
}

const SolutionCard = ({ 
  icon, 
  title, 
  description, 
  index, 
  engine, 
  backgroundColor,
  backgroundOpacity = 1 
}: SolutionCardProps) => {
  
  const hexToRgba = (hex: string, opacity: number) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return hex;
  };

  return (
    <Card 
      className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 scroll-reveal rounded-2xl" 
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Main content with rgba background color for opacity control */}
      <CardContent 
        className="p-6 h-full flex flex-col justify-between text-white relative"
        style={{ backgroundColor: hexToRgba(backgroundColor, backgroundOpacity) }}
      >
        {/* Engine badge */}
        <div className="flex justify-between items-start mb-4">
          <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-white">
              {engine}
            </span>
          </div>
        </div>
        
        {/* Icon */}
        <div className="mb-4 flex items-center justify-start">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            {icon}
          </div>
        </div>
        
        {/* Title */}
        <h3 className="font-bold text-lg mb-3 leading-tight text-white">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-white/90 text-sm leading-relaxed flex-grow">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default SolutionCard;
