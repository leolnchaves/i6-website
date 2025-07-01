
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import IconSelector from './IconSelector';

interface ContentField {
  section: string;
  field: string;
  label: string;
  type: 'input' | 'textarea' | 'icon';
}

interface ContentFieldRendererProps {
  fields: ContentField[];
  formData: { [key: string]: string };
  onFieldChange: (key: string, value: string) => void;
}

const ContentFieldRenderer: React.FC<ContentFieldRendererProps> = ({
  fields,
  formData,
  onFieldChange,
}) => {
  const handleInputChange = (key: string, value: string) => {
    // Ensure we preserve all characters including spaces
    onFieldChange(key, value);
  };

  return (
    <div className="space-y-4">
      {fields.map(field => {
        const key = `${field.section}_${field.field}`;
        const value = formData[key] || '';

        if (field.type === 'icon') {
          return (
            <IconSelector
              key={key}
              id={key}
              label={field.label}
              value={value}
              onChange={(iconValue) => handleInputChange(key, iconValue)}
            />
          );
        }

        return (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>{field.label}</Label>
            {field.type === 'textarea' ? (
              <Textarea
                id={key}
                value={value}
                onChange={(e) => handleInputChange(key, e.target.value)}
                placeholder={`Digite o ${field.label.toLowerCase()}...`}
                rows={field.field === 'description' ? 5 : 3}
                className="resize-none"
              />
            ) : (
              <Input
                id={key}
                type="text"
                value={value}
                onChange={(e) => handleInputChange(key, e.target.value)}
                placeholder={
                  field.field === 'demoLink' 
                    ? 'https://www.youtube.com/embed/...' 
                    : `Digite o ${field.label.toLowerCase()}...`
                }
                autoComplete="off"
                spellCheck="false"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ContentFieldRenderer;
