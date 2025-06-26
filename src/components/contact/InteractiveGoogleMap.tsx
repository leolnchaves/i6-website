
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const InteractiveGoogleMap = () => {
  const { t } = useLanguage();
  const mapContainer = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Chave de API do Google Maps - substituir pela chave real
  const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY_HERE';

  const locations = [
    {
      id: 'campinas',
      name: 'Campinas, Brazil',
      type: t('contact.map.headquarters'),
      coordinates: { lat: -22.9056, lng: -47.0608 },
      flag: '🇧🇷',
      address: 'Rua Exemplo, 123\nCampinas, SP 13010-111\nBrazil',
      phone: '+55 19 998197775',
      email: 'infinity6@infinity6.ai'
    },
    {
      id: 'dover',
      name: 'Dover, United States',
      type: t('contact.map.branchOffice'),
      coordinates: { lat: 39.1612, lng: -75.5277 },
      flag: '🇺🇸',
      address: '123 Corporate Blvd\nDover, DE 19901\nUnited States',
      phone: '+1 (302) 555-0123',
      email: 'usa@infinity6.ai'
    },
    {
      id: 'milan',
      name: 'Milan, Italy',
      type: t('contact.map.branchOffice'),
      coordinates: { lat: 45.4642, lng: 9.1900 },
      flag: '🇮🇹',
      address: 'Via Giuseppe Verdi, 45\n20121 Milano MI\nItaly',
      phone: '+39 02 1234 5678',
      email: 'italia@infinity6.ai'
    }
  ];

  const loadGoogleMapsScript = () => {
    if (window.google) {
      initializeMap();
      return;
    }

    window.initMap = initializeMap;

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      console.error('Erro ao carregar Google Maps API');
    };
    document.head.appendChild(script);
  };

  const initializeMap = () => {
    if (!mapContainer.current || !window.google) return;

    const map = new window.google.maps.Map(mapContainer.current, {
      zoom: 2,
      center: { lat: 20, lng: 0 },
      mapTypeId: 'roadmap',
      styles: [
        {
          featureType: 'all',
          elementType: 'geometry.fill',
          stylers: [{ weight: '2.00' }]
        },
        {
          featureType: 'all',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#9c9c9c' }]
        },
        {
          featureType: 'all',
          elementType: 'labels.text',
          stylers: [{ visibility: 'on' }]
        }
      ]
    });

    const infoWindow = new window.google.maps.InfoWindow();

    locations.forEach((location) => {
      const marker = new window.google.maps.Marker({
        position: location.coordinates,
        map: map,
        title: location.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#2563eb" stroke="#ffffff" stroke-width="2"/>
              <circle cx="12" cy="10" r="3" fill="#ffffff"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 32),
          anchor: new window.google.maps.Point(16, 32)
        }
      });

      const contentString = `
        <div style="padding: 12px; min-width: 250px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span style="font-size: 18px;">${location.flag}</span>
            <h3 style="font-weight: bold; color: #111827; margin: 0;">${location.name}</h3>
          </div>
          <p style="color: #2563eb; font-weight: 600; margin: 0 0 8px 0; font-size: 14px;">${location.type}</p>
          <div style="color: #6b7280; font-size: 14px; line-height: 1.4;">
            <div style="white-space: pre-line; margin-bottom: 4px;">${location.address}</div>
            <div><strong>Phone:</strong> ${location.phone}</div>
            <div><strong>Email:</strong> ${location.email}</div>
          </div>
        </div>
      `;

      marker.addListener('click', () => {
        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
      });
    });

    setIsLoaded(true);
  };

  useEffect(() => {
    loadGoogleMapsScript();
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
          <div ref={mapContainer} className="w-full h-full" />
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
