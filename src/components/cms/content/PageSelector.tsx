
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, Home } from 'lucide-react';

interface Page {
  id: string;
  name: string;
  slug: string;
}

interface PageSelectorProps {
  pages: Page[];
  selectedPage: string;
  selectedLanguage: string;
  onPageChange: (pageId: string) => void;
  onLanguageChange: (language: string) => void;
}

const PageSelector: React.FC<PageSelectorProps> = ({
  pages,
  selectedPage,
  selectedLanguage,
  onPageChange,
  onLanguageChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Configurações
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="page-select">Página</Label>
            <Select value={selectedPage} onValueChange={onPageChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma página" />
              </SelectTrigger>
              <SelectContent>
                {pages.map(page => (
                  <SelectItem key={page.id} value={page.id}>
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      {page.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="language-select">Idioma</Label>
            <Select value={selectedLanguage} onValueChange={onLanguageChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">
                  <div className="flex items-center gap-2">
                    🇺🇸 English
                  </div>
                </SelectItem>
                <SelectItem value="pt">
                  <div className="flex items-center gap-2">
                    🇧🇷 Português
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PageSelector;
