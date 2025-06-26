
import React, { useRef, useEffect, useState } from 'react';
import { MapLocation } from '@/types/mapTypes';

interface GoogleMapContainerProps {
  locations: MapLocation[];
  onMapLoaded: () => void;
}

const GoogleMapContainer: React.FC<GoogleMapContainerProps> = ({ locations, onMapLoaded }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  const initializeMap = () => {
    if (!mapContainer.current) {
      console.error('Container do mapa não encontrado');
      return;
    }

    if (!window.google || !window.google.maps) {
      console.error('Google Maps API não carregada');
      setError('Google Maps API não disponível');
      return;
    }

    try {
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

      onMapLoaded();
      setError(null);
      console.log('Mapa inicializado com sucesso');
    } catch (err) {
      console.error('Erro ao inicializar o mapa:', err);
      setError('Erro ao carregar o mapa');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      initializeMap();
    }, 100);

    return () => clearTimeout(timer);
  }, [locations]);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center p-4">
          <p className="text-red-600 font-medium mb-2">Erro ao carregar o mapa</p>
          <p className="text-sm text-gray-600">
            Verifique se a chave da API do Google Maps está configurada corretamente.
          </p>
        </div>
      </div>
    );
  }

  return <div ref={mapContainer} className="w-full h-full" />;
};

export default GoogleMapContainer;
