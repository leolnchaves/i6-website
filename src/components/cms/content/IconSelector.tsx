
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  Rocket 
} from 'lucide-react';

interface IconSelectorProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const iconOptions = [
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
];

const IconSelector: React.FC<IconSelectorProps> = ({ id, label, value, onChange }) => {
  const selectedIcon = iconOptions.find(option => option.value === value);

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id}>
          <SelectValue>
            <div className="flex items-center gap-2">
              {selectedIcon && <selectedIcon.icon className="w-4 h-4" />}
              <span>{selectedIcon?.label || 'Selecione um ícone'}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {iconOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center gap-2">
                <option.icon className="w-4 h-4" />
                <span>{option.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default IconSelector;
