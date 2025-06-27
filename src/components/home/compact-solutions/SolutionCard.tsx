
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SolutionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  engine: string;
  backgroundImage?: string;
}

const SolutionCard = ({ icon, title, description, index, engine, backgroundImage }: SolutionCardProps) => {
  return (
    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 scroll-reveal bg-white" style={{ animationDelay: `${index * 0.1}s` }}>
      {/* Image section with overlay */}
      <div 
        className="relative h-32 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Badge for engine */}
        <Badge className="absolute top-3 left-3 bg-green-600 hover:bg-green-700 text-white text-xs font-medium">
          {engine}
        </Badge>
        
        {/* Title overlay */}
        <div className="relative z-10 text-center px-4">
          <h3 className="text-white font-semibold text-sm leading-tight">
            {title}
          </h3>
        </div>
      </div>
      
      {/* Content section */}
      <CardContent className="p-4">
        <p className="text-gray-600 text-xs leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default SolutionCard;
