
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';

interface ColorOption {
  value: string;
  label: string;
  preview: string;
}

interface ColorPaletteProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: ColorOption[];
}

const ColorPalette: React.FC<ColorPaletteProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="grid grid-cols-3 gap-2">
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <Button
              key={option.value}
              variant="outline"
              className={`h-12 p-1 ${option.preview} border-2 transition-all hover:scale-105 relative ${
                isSelected 
                  ? 'border-blue-500 ring-2 ring-blue-200' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => onChange(option.value)}
              title={option.label}
            >
              <div className="w-full h-full rounded flex items-center justify-center relative">
                <span className="text-xs font-medium text-white drop-shadow-md">
                  {option.label}
                </span>
                {isSelected && (
                  <div className="absolute top-1 right-1 bg-blue-500 rounded-full p-0.5">
                    <Check className="w-3 h-3 text-white" />
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

export default ColorPalette;
