
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ResultCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  engine?: string;
  backgroundImage?: string;
}

const ResultCard = ({ icon, title, description, index, engine, backgroundImage }: ResultCardProps) => {
  return (
    <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden scroll-reveal" style={{ animationDelay: `${index * 0.1}s` }}>
      {/* Image section with title overlay */}
      <div 
        className="relative h-32 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Title over the image */}
        <h3 className="relative z-10 text-white font-semibold text-sm text-center px-4 leading-tight">
          {title}
        </h3>
      </div>

      <CardContent className="p-4">
        {/* Engine badge */}
        {engine && (
          <Badge variant="secondary" className="mb-3 bg-green-100 text-green-800 hover:bg-green-200 text-xs">
            {engine}
          </Badge>
        )}
        
        {/* Description */}
        <p className="text-gray-600 text-xs leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
