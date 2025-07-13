
import { Mail, Phone, MapPin, Building } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';

const WorldMap = () => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  // Static content - migrated from translations
  const content = {
    pt: {
      title: "Nossa Presença Global",
      description: "Clique em cada localização para ver informações detalhadas de contato.",
      headquarters: "Sede",
      brazil: "Brasil",
      hoverTip: "Passe o mouse sobre as localizações para mais informações"
    },
    en: {
      title: "Our Global Presence", 
      description: "Click on each location to see detailed contact information.",
      headquarters: "Headquarters",
      brazil: "Brazil",
      hoverTip: "Hover over locations for more information"
    }
  };

  const text = content[language];

  // Posição ajustada para apenas Campinas
  const getResponsivePositions = () => {
    if (isMobile) {
      return {
        campinas: { top: '68%', left: '35%' }
      };
    }
    return {
      campinas: { top: '68%', left: '32%' }
    };
  };

  const positions = getResponsivePositions();

  const locations = [
    {
      id: 'campinas',
      city: 'Campinas',
      state: 'São Paulo', 
      country: text.brazil,
      flag: '🇧🇷',
      type: text.headquarters,
      unitName: 'infinity6 LATAM',
      position: positions.campinas,
      address: 'Av. Antônio Artioli, 570 - Sala 134 / Prédio A\nCEP 13049-900\nCampinas, SP - Brasil',
      email: 'lets.talk@infinity6.ai'
    }
  ];

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-4 sm:p-6 lg:p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          {text.title}
        </h3>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          {text.description}
        </p>
        
        <TooltipProvider>
          <div className="relative w-full h-64 sm:h-80 lg:h-96 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
            <img 
              src="/lovable-uploads/d2eae5cc-45c5-4614-b7f8-264dd032a619.png"
              alt="World Map"
              className="w-full h-full object-cover"
            />
            
            {locations.map((location) => (
              <Tooltip key={location.id}>
                <TooltipTrigger asChild>
                  <button
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-all duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 rounded-lg"
                    style={{
                      top: location.position.top,
                      left: location.position.left,
                    }}
                  >
                    <div className="bg-white rounded-lg shadow-lg border p-2 min-w-[90px] sm:min-w-[110px]">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-sm">{location.flag}</span>
                        <div className="text-left">
                          <div className="font-semibold text-gray-900 text-xs leading-tight">
                            {location.city}
                          </div>
                          <div className="text-xs text-gray-600 leading-tight">
                            {location.state}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Building className="w-2.5 h-2.5 text-blue-600" />
                        <span className="text-xs font-medium text-blue-600">
                          {location.type}
                        </span>
                      </div>
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent 
                  side="top" 
                  className="max-w-xs p-3 sm:p-4 bg-white border shadow-xl"
                >
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{location.flag}</span>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                            {location.city}, {location.state}
                          </h4>
                          <p className="text-xs text-gray-600">{location.country}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Building className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-600">{location.type}</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-800 mb-3">{location.unitName}</p>
                    </div>
                    
                     <div className="text-xs sm:text-sm text-gray-600 space-y-2 pt-2 border-t border-gray-100">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5 text-gray-400" />
                        <div className="whitespace-pre-line">{location.address}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3 flex-shrink-0 text-gray-400" />
                        <span className="break-all">{location.email}</span>
                      </div>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
        
        <p className="text-sm text-gray-500 mt-4 text-center">
          {text.hoverTip}
        </p>
      </CardContent>
    </Card>
  );
};

export default WorldMap;
