
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ResultCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  engine?: string;
}

const ResultCard = ({ icon, title, description, index, engine }: ResultCardProps) => {
  return (
    <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden scroll-reveal" style={{ animationDelay: `${index * 0.1}s` }}>
      <CardContent className="p-6 text-center">
        <div className="mb-4 flex justify-center">
          {icon}
        </div>
        
        {engine && (
          <Badge variant="secondary" className="mb-3 bg-green-100 text-green-800 hover:bg-green-200 text-xs">
            {engine}
          </Badge>
        )}
        
        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
