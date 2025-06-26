
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Map, Grid2X2, List } from 'lucide-react';
import InteractiveWorldMap from './InteractiveWorldMap';
import LocationsGrid from './LocationsGrid';
import LocationsList from './LocationsList';

const MapOptionsDemo = () => {
  const [selectedOption, setSelectedOption] = useState<'list' | 'interactive' | 'grid'>('list');

  const options = [
    {
      id: 'list' as const,
      label: 'Lista Atual',
      icon: List,
      description: 'Lista organizada (atual)'
    },
    {
      id: 'interactive' as const,
      label: 'Mapa Interativo',
      icon: Map,
      description: 'Mapbox com marcadores clicáveis'
    },
    {
      id: 'grid' as const,
      label: 'Grid de Localizações',
      icon: Grid2X2,
      description: 'Cards organizados em grid'
    }
  ];

  const renderSelectedComponent = () => {
    switch (selectedOption) {
      case 'interactive':
        return <InteractiveWorldMap />;
      case 'grid':
        return <LocationsGrid />;
      case 'list':
      default:
        return <LocationsList />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-dashed border-blue-300 bg-blue-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-4">
            🎨 Demonstração de Opções de Mapa
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {options.map((option) => {
              const Icon = option.icon;
              return (
                <Button
                  key={option.id}
                  variant={selectedOption === option.id ? 'default' : 'outline'}
                  onClick={() => setSelectedOption(option.id)}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                >
                  <Icon className="w-5 h-5" />
                  <div className="text-center">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs opacity-75">{option.description}</div>
                  </div>
                </Button>
              );
            })}
          </div>
          <p className="text-sm text-blue-700">
            Selecione uma opção acima para visualizar como ficaria na página de contato.
          </p>
        </CardContent>
      </Card>

      {renderSelectedComponent()}
    </div>
  );
};

export default MapOptionsDemo;
