
import { Card, CardContent } from '@/components/ui/card';

interface ResultCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const ResultCard = ({ icon, title, description, index }: ResultCardProps) => {
  return (
    <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover-lift scroll-reveal glass" style={{ animationDelay: `${index * 0.1}s` }}>
      <CardContent className="p-6 text-center">
        <div className="mb-4 flex justify-center animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-3 text-gray-900">
          {title}
        </h3>
        <p className="text-gray-600 text-sm">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
