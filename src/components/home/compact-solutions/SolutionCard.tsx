
import { Card, CardContent } from '@/components/ui/card';

interface SolutionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const SolutionCard = ({ icon, title, description, index }: SolutionCardProps) => {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover-lift scroll-reveal glass bg-white/80 backdrop-blur-sm" style={{ animationDelay: `${index * 0.1}s` }}>
      <CardContent className="p-6">
        <div className="flex items-start mb-4">
          <div className="mr-3 mt-1 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 leading-tight">
              {title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SolutionCard;
