
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const InteractiveWorldMap = () => {
  const { t } = useLanguage();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const locations = [
    {
      id: 'campinas',
      name: 'Campinas, Brazil',
      type: t('contact.map.headquarters'),
      coordinates: [-47.0608, -22.9056],
      flag: '🇧🇷',
      address: 'Rua Exemplo, 123\nCampinas, SP 13010-111\nBrazil',
      phone: '+55 19 998197775',
      email: 'infinity6@infinity6.ai'
    },
    {
      id: 'dover',
      name: 'Dover, United States',
      type: t('contact.map.branchOffice'),
      coordinates: [-75.5277, 39.1612],
      flag: '🇺🇸',
      address: '123 Corporate Blvd\nDover, DE 19901\nUnited States',
      phone: '+1 (302) 555-0123',
      email: 'usa@infinity6.ai'
    },
    {
      id: 'milan',
      name: 'Milan, Italy',
      type: t('contact.map.branchOffice'),
      coordinates: [9.1900, 45.4642],
      flag: '🇮🇹',
      address: 'Via Giuseppe Verdi, 45\n20121 Milano MI\nItaly',
      phone: '+39 02 1234 5678',
      email: 'italia@infinity6.ai'
    }
  ];

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      zoom: 2,
      center: [0, 20],
      projection: 'globe'
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      locations.forEach((location) => {
        // Create popup content
        const popupContent = `
          <div class="p-3">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-lg">${location.flag}</span>
              <h3 class="font-bold text-gray-900">${location.name}</h3>
            </div>
            <p class="text-sm text-blue-600 font-medium mb-2">${location.type}</p>
            <div class="text-sm text-gray-600 space-y-1">
              <div class="whitespace-pre-line">${location.address}</div>
              <div><strong>Phone:</strong> ${location.phone}</div>
              <div><strong>Email:</strong> ${location.email}</div>
            </div>
          </div>
        `;

        // Create popup
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: true,
          closeOnClick: false
        }).setHTML(popupContent);

        // Create marker
        const marker = new mapboxgl.Marker({
          color: '#2563eb'
        })
          .setLngLat(location.coordinates as [number, number])
          .setPopup(popup)
          .addTo(map.current!);
      });
    });

    setShowTokenInput(false);
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      initializeMap();
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="p-4 sm:p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              {t('contact.map.title')} - Mapa Interativo
            </h3>
          </div>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Para visualizar o mapa interativo, você precisa inserir seu token público do Mapbox.
          </p>
          <div className="space-y-4">
            <div>
              <label htmlFor="mapbox-token" className="block text-sm font-medium text-gray-700 mb-2">
                Token Público do Mapbox
              </label>
              <input
                id="mapbox-token"
                type="text"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbGV..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button onClick={handleTokenSubmit} className="w-full">
              Carregar Mapa
            </Button>
            <p className="text-xs text-gray-500">
              Obtenha seu token em{' '}
              <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                mapbox.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
            {t('contact.map.title')} - Mapa Interativo
          </h3>
        </div>
        <div className="h-96 rounded-lg overflow-hidden border border-gray-200">
          <div ref={mapContainer} className="w-full h-full" />
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Clique nos marcadores para ver detalhes de cada escritório.
        </p>
      </CardContent>
    </Card>
  );
};

export default InteractiveWorldMap;
