
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
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg font-medium text-gray-900">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <Globe className="h-4 w-4 text-blue-600" />
          </div>
          Configurações
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="page-select" className="text-sm font-medium text-gray-700">Página</Label>
            <Select value={selectedPage} onValueChange={onPageChange}>
              <SelectTrigger className="h-12 border-gray-200 rounded-lg">
                <SelectValue placeholder="Selecione uma página" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 shadow-lg">
                {pages.map(page => (
                  <SelectItem key={page.id} value={page.id} className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                        <Home className="h-3 w-3 text-gray-600" />
                      </div>
                      {page.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="language-select" className="text-sm font-medium text-gray-700">Idioma</Label>
            <Select value={selectedLanguage} onValueChange={onLanguageChange}>
              <SelectTrigger className="h-12 border-gray-200 rounded-lg">
                <SelectValue placeholder="Selecione um idioma" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 shadow-lg">
                <SelectItem value="en" className="py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🇺🇸</span>
                    <span>English</span>
                  </div>
                </SelectItem>
                <SelectItem value="pt" className="py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🇧🇷</span>
                    <span>Português</span>
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
