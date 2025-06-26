
import { Mail, Phone, MapPin, Building } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';

const WorldMap = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  // Posições responsivas baseadas no tamanho da tela
  const getResponsivePositions = () => {
    if (isMobile) {
      return {
        campinas: { top: '75%', left: '28%' },
        dover: { top: '42%', left: '25%' },
        milan: { top: '30%', left: '53%' }
      };
    }
    return {
      campinas: { top: '72%', left: '30%' },
      dover: { top: '35%', left: '22%' },
      milan: { top: '32%', left: '51%' }
    };
  };

  const positions = getResponsivePositions();

  const locations = [
    {
      id: 'campinas',
      city: 'Campinas',
      state: 'São Paulo',
      country: 'Brasil',
      flag: '🇧🇷',
      type: 'Sede',
      unitName: 'infinity6 LATAM',
      position: positions.campinas,
      address: 'Rua Exemplo, 123\nCampinas, SP 13010-111\nBrasil',
      phone: '+55 19 998197775',
      email: 'infinity6@infinity6.ai'
    },
    {
      id: 'dover',
      city: 'Dover',
      state: 'Delaware',
      country: 'Estados Unidos',
      flag: '🇺🇸',
      type: 'Filial',
      unitName: 'infinity6 NA',
      position: positions.dover,
      address: '123 Corporate Blvd\nDover, DE 19901\nEstados Unidos',
      phone: '+1 (302) 555-0123',
      email: 'usa@infinity6.ai'
    },
    {
      id: 'milan',
      city: 'Milão',
      state: 'Lombardia',
      country: 'Itália',
      flag: '🇮🇹',
      type: 'Filial',
      unitName: 'infinity6 EMEA',
      position: positions.milan,
      address: 'Via Giuseppe Verdi, 45\n20121 Milano MI\nItália',
      phone: '+39 02 1234 5678',
      email: 'italia@infinity6.ai'
    }
  ];

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-4 sm:p-6 lg:p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          {t('contact.map.title')}
        </h3>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          {t('contact.map.description')}
        </p>
        
        <TooltipProvider>
          <div className="relative w-full h-64 sm:h-80 lg:h-96 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
            <img 
              src="/lovable-uploads/d9d6ba9c-61ec-4d42-8e89-f0451e01621f.png"
              alt="World Map"
              className="w-full h-full object-contain"
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
                        <Phone className="w-3 h-3 flex-shrink-0 text-gray-400" />
                        <span className="break-all">{location.phone}</span>
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
          Passe o mouse sobre os cards para ver detalhes de contato
        </p>
      </CardContent>
    </Card>
  );
};

export default WorldMap;
