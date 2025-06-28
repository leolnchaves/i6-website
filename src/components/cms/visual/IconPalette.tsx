
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  BarChart3, 
  Target, 
  Award, 
  Zap, 
  Building2, 
  Globe, 
  Rocket,
  Brain,
  ShoppingCart,
  LineChart,
  Lightbulb
} from 'lucide-react';

interface IconOption {
  value: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface IconPaletteProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const iconOptions: IconOption[] = [
  { value: 'trending-up', label: 'Trending Up', icon: TrendingUp },
  { value: 'users', label: 'Users', icon: Users },
  { value: 'dollar-sign', label: 'Dollar Sign', icon: DollarSign },
  { value: 'bar-chart-3', label: 'Bar Chart', icon: BarChart3 },
  { value: 'target', label: 'Target', icon: Target },
  { value: 'award', label: 'Award', icon: Award },
  { value: 'zap', label: 'Zap', icon: Zap },
  { value: 'building-2', label: 'Building', icon: Building2 },
  { value: 'globe', label: 'Globe', icon: Globe },
  { value: 'rocket', label: 'Rocket', icon: Rocket },
  { value: 'brain', label: 'Brain', icon: Brain },
  { value: 'shopping-cart', label: 'Shopping Cart', icon: ShoppingCart },
  { value: 'line-chart', label: 'Line Chart', icon: LineChart },
  { value: 'lightbulb', label: 'Lightbulb', icon: Lightbulb },
];

const IconPalette: React.FC<IconPaletteProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="grid grid-cols-4 gap-2">
        {iconOptions.map((option) => {
          const isSelected = value === option.value;
          const IconComponent = option.icon;
          
          return (
            <Button
              key={option.value}
              variant="outline"
              className={`h-12 p-2 border-2 transition-all hover:scale-105 relative ${
                isSelected 
                  ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50'
              }`}
              onClick={() => onChange(option.value)}
              title={option.label}
            >
              <div className="w-full h-full flex items-center justify-center relative">
                <IconComponent 
                  className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} 
                />
                {isSelected && (
                  <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-0.5">
                    <Check className="w-2 h-2 text-white" />
                  </div>
                )}
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default IconPalette;
