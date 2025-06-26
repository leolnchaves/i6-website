
import React from 'react';
import { Mail, Phone, MapPin, Building2, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const LocationsGrid = () => {
  const { t } = useLanguage();

  const locations = [
    {
      id: 'campinas',
      name: 'Campinas',
      country: 'Brazil',
      type: t('contact.map.headquarters'),
      address: 'Rua Exemplo, 123\nCampinas, SP 13010-111\nBrazil',
      phone: '+55 19 998197775',
      email: 'infinity6@infinity6.ai',
      flag: '🇧🇷',
      timezone: 'GMT-3',
      workingHours: '09:00 - 18:00',
      isHeadquarters: true
    },
    {
      id: 'dover',
      name: 'Dover',
      country: 'United States',
      type: t('contact.map.branchOffice'),
      address: '123 Corporate Blvd\nDover, DE 19901\nUnited States',
      phone: '+1 (302) 555-0123',
      email: 'usa@infinity6.ai',
      flag: '🇺🇸',
      timezone: 'GMT-5',
      workingHours: '09:00 - 17:00',
      isHeadquarters: false
    },
    {
      id: 'milan',
      name: 'Milan',
      country: 'Italy',
      type: t('contact.map.branchOffice'),
      address: 'Via Giuseppe Verdi, 45\n20121 Milano MI\nItaly',
      phone: '+39 02 1234 5678',
      email: 'italia@infinity6.ai',
      flag: '🇮🇹',
      timezone: 'GMT+1',
      workingHours: '09:00 - 18:00',
      isHeadquarters: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          {t('contact.map.title')}
        </h3>
        <p className="text-gray-600 text-sm sm:text-base">
          {t('contact.map.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <Card 
            key={location.id} 
            className={`border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 ${
              location.isHeadquarters ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
            }`}
          >
            <CardContent className="p-6">
              {location.isHeadquarters && (
                <div className="flex items-center gap-2 mb-4 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium w-fit">
                  <Building2 className="w-4 h-4" />
                  Sede Principal
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">{location.flag}</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{location.name}</h4>
                  <p className="text-gray-600 text-sm">{location.country}</p>
                  <p className="text-blue-600 text-sm font-medium">{location.type}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                    {location.address}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <a 
                    href={`tel:${location.phone}`} 
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {location.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <a 
                    href={`mailto:${location.email}`} 
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors break-all"
                  >
                    {location.email}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <div className="text-sm text-gray-600">
                    <div>{location.workingHours}</div>
                    <div className="text-xs text-gray-500">{location.timezone}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-gray-600">
            Horários de funcionamento em horário local
          </span>
        </div>
      </div>
    </div>
  );
};

export default LocationsGrid;
