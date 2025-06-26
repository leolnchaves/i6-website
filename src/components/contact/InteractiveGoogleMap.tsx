
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { getMapLocations } from '@/data/mapLocations';
import { loadGoogleMapsScript } from '@/utils/googleMapsLoader';
import GoogleMapContainer from './GoogleMapContainer';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const InteractiveGoogleMap = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  const locations = getMapLocations(t);

  const handleMapLoaded = () => {
    setIsLoaded(true);
  };

  const initializeMap = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    loadGoogleMapsScript(initializeMap);
  }, []);

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
            {t('contact.map.title')}
          </h3>
        </div>
        <div className="h-96 rounded-lg overflow-hidden border border-gray-200">
          <GoogleMapContainer 
            locations={locations} 
            onMapLoaded={handleMapLoaded}
          />
        </div>
        {isLoaded && (
          <p className="text-sm text-gray-500 mt-4">
            Clique nos marcadores para ver detalhes de cada escritório.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default InteractiveGoogleMap;
