
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const LocationsList = () => {
  const { t } = useLanguage();

  const locations = [
    {
      id: 'campinas',
      name: 'Campinas, Brazil',
      type: t('contact.map.headquarters'),
      address: 'Rua Exemplo, 123\nCampinas, SP 13010-111\nBrazil',
      phone: '+55 19 998197775',
      email: 'infinity6@infinity6.ai',
      flag: '🇧🇷',
      timezone: 'GMT-3'
    },
    {
      id: 'dover',
      name: 'Dover, United States',
      type: t('contact.map.branchOffice'),
      address: '123 Corporate Blvd\nDover, DE 19901\nUnited States',
      phone: '+1 (302) 555-0123',
      email: 'usa@infinity6.ai',
      flag: '🇺🇸',
      timezone: 'GMT-5'
    },
    {
      id: 'milan',
      name: 'Milan, Italy',
      type: t('contact.map.branchOffice'),
      address: 'Via Giuseppe Verdi, 45\n20121 Milano MI\nItaly',
      phone: '+39 02 1234 5678',
      email: 'italia@infinity6.ai',
      flag: '🇮🇹',
      timezone: 'GMT+1'
    }
  ];

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
            {t('contact.map.title')}
          </h3>
        </div>
        <p className="text-gray-600 mb-8 text-sm sm:text-base">
          {t('contact.map.description')}
        </p>
        
        <div className="space-y-6">
          {locations.map((location, index) => (
            <div key={location.id} className={`relative ${index !== locations.length - 1 ? 'pb-6 border-b border-gray-100' : ''}`}>
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0 mt-1">
                  {location.flag}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{location.name}</h4>
                      <p className="text-sm text-blue-600 font-medium">{location.type}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {location.timezone}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-gray-600 whitespace-pre-line">
                          {location.address}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <a href={`tel:${location.phone}`} className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                          {location.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <a href={`mailto:${location.email}`} className="text-sm text-gray-600 hover:text-blue-600 transition-colors break-all">
                          {location.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationsList;
