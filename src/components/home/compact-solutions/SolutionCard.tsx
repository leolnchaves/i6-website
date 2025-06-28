
import { Card, CardContent } from '@/components/ui/card';

interface SolutionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  engine: string;
  backgroundColor: string;
}

const SolutionCard = ({ icon, title, description, index, engine, backgroundColor }: SolutionCardProps) => {
  return (
    <Card 
      className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 scroll-reveal rounded-2xl" 
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Main content with solid background color */}
      <CardContent 
        className="p-6 h-full flex flex-col justify-between text-white relative"
        style={{ backgroundColor }}
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
