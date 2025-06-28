
import { Card, CardContent } from '@/components/ui/card';

interface ResultCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  backgroundColor?: string;
  backgroundOpacity?: number;
}

const ResultCard = ({ icon, title, description, index, backgroundColor, backgroundOpacity }: ResultCardProps) => {
  // Apply opacity only to background color, not to the entire card
  const backgroundStyle = backgroundColor ? {
    backgroundColor: backgroundColor,
    opacity: backgroundOpacity || 1.0,
  } : {};

  return (
    <Card 
      className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover-lift scroll-reveal glass relative overflow-hidden" 
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Background layer with opacity - positioned absolutely behind content */}
      {backgroundColor && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={backgroundStyle}
        />
      )}
      
      {/* Content layer - always full opacity */}
      <CardContent className="p-6 text-center relative z-10">
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
