
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import IconSelector from './IconSelector';
import { ContentField } from './ContentFieldsConfig';

interface ContentFieldRendererProps {
  field: ContentField;
  value: string;
  onChange: (key: string, value: string) => void;
}

const ContentFieldRenderer: React.FC<ContentFieldRendererProps> = ({
  field,
  value,
  onChange,
}) => {
  if (field.type === 'icon') {
    return (
      <IconSelector
        id={field.key}
        label={field.label}
        value={value}
        onChange={(iconValue) => onChange(field.key, iconValue)}
      />
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={field.key}>{field.label}</Label>
      {field.type === 'textarea' ? (
        <Textarea
          id={field.key}
          value={value}
          onChange={(e) => onChange(field.key, e.target.value)}
          placeholder={field.placeholder}
          rows={field.label.toLowerCase().includes('descrição') ? 5 : 3}
        />
      ) : (
        <Input
          id={field.key}
          value={value}
          onChange={(e) => onChange(field.key, e.target.value)}
          placeholder={field.placeholder}
        />
      )}
    </div>
  );
};

export default ContentFieldRenderer;
