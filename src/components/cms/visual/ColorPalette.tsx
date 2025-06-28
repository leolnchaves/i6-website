
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

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
        {options.map((option) => (
          <Button
            key={option.value}
            variant={value === option.value ? "default" : "outline"}
            className={`h-12 p-1 ${option.preview} border-2 transition-all hover:scale-105`}
            onClick={() => onChange(option.value)}
            title={option.label}
          >
            <div className="w-full h-full rounded flex items-center justify-center">
              <span className="text-xs font-medium text-white drop-shadow-md">
                {option.label}
              </span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
