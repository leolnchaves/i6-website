
import { Card, CardContent } from '@/components/ui/card';

interface ResultCardProps {
  image: string;
  title: string;
  description: string;
  index: number;
}

const ResultCard = ({ image, title, description, index }: ResultCardProps) => {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover-lift scroll-reveal bg-white/90 backdrop-blur-sm overflow-hidden h-full" style={{ animationDelay: `${index * 0.1}s` }}>
      <CardContent className="p-0">
        {/* Image Section */}
        <div className="relative h-32 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        
        {/* Content Section */}
        <div className="p-4">
          <h3 className="text-sm font-bold text-gray-900 mb-2 leading-tight">
            {title}
          </h3>
          <p className="text-gray-600 text-xs leading-relaxed">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
