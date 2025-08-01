
import { Card, CardContent } from '@/components/ui/card';

interface CardData {
  id: string;
  industry: string;
  company_name: string;
  solution: string;
  metric1_value: string;
  metric1_label: string;
  metric2_value: string;
  metric2_label: string;
  metric3_value: string;
  metric3_label: string;
  image_url: string;
}

interface HomeFeaturedStoryCardProps {
  card: CardData;
  index: number;
}

const HomeFeaturedStoryCard = ({ card, index }: HomeFeaturedStoryCardProps) => {
  return (
    <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden relative transform hover:scale-105 h-full flex flex-col" style={{ backgroundColor: '#f9fafb' }}>
      <CardContent className="p-0 flex flex-col h-full" style={{ backgroundColor: '#f9fafb' }}>
        {/* Image Container with Industry Badge */}
        <div className="relative overflow-hidden h-48 flex-shrink-0">
          <img 
            src={card.image_url}
            alt={card.company_name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop';
            }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
          
          {/* Industry Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              {card.industry}
            </span>
          </div>
        </div>

        {/* Content Container - Uses flex-1 to fill remaining space */}
        <div className="p-6 flex flex-col flex-1" style={{ backgroundColor: '#f9fafb' }}>
          {/* Company Name - Fixed height */}
          <div className="h-14 flex items-center mb-3">
            <h3 className="text-xl font-bold text-gray-900 leading-tight line-clamp-2">{card.company_name}</h3>
          </div>
          
          {/* Solution - Fixed height with text clamping */}
          <div className="h-24 mb-6 flex items-start">
            <p className="text-gray-600 leading-relaxed line-clamp-4">{card.solution}</p>
          </div>
          
          {/* Metrics Grid - Always at bottom with consistent spacing */}
          <div className="grid grid-cols-3 gap-3 mt-auto">
            <div className="text-center p-3 rounded-lg border border-gray-200 min-h-[80px] flex flex-col justify-center" style={{ backgroundColor: '#f3f4f6' }}>
              <div className="text-lg font-bold mb-1 leading-tight line-clamp-1" style={{ color: '#2563eb' }}>{card.metric1_value}</div>
              <div className="text-xs text-gray-600 leading-tight line-clamp-2">{card.metric1_label}</div>
            </div>
            <div className="text-center p-3 rounded-lg border border-gray-200 min-h-[80px] flex flex-col justify-center" style={{ backgroundColor: '#f3f4f6' }}>
              <div className="text-lg font-bold mb-1 leading-tight line-clamp-1" style={{ color: '#2563eb' }}>{card.metric2_value}</div>
              <div className="text-xs text-gray-600 leading-tight line-clamp-2">{card.metric2_label}</div>
            </div>
            <div className="text-center p-3 rounded-lg border border-gray-200 min-h-[80px] flex flex-col justify-center" style={{ backgroundColor: '#f3f4f6' }}>
              <div className="text-lg font-bold mb-1 leading-tight line-clamp-1" style={{ color: '#2563eb' }}>{card.metric3_value}</div>
              <div className="text-xs text-gray-600 leading-tight line-clamp-2">{card.metric3_label}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeFeaturedStoryCard;
