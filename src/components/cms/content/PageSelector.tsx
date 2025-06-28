
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, Home, Languages } from 'lucide-react';

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
  const languages = [
    { code: 'en', flag: '🇺🇸', name: 'English' },
    { code: 'pt', flag: '🇧🇷', name: 'Português' }
  ];

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg shadow-gray-200/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Globe className="h-5 w-5 text-white" />
          </div>
          Configurações de Página
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Page Selection */}
          <div className="space-y-3">
            <Label htmlFor="page-select" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Home className="h-4 w-4 text-blue-600" />
              Página
            </Label>
            <Select value={selectedPage} onValueChange={onPageChange}>
              <SelectTrigger className="h-12 bg-white/80 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-xl">
                <SelectValue placeholder="Selecione uma página" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 shadow-xl rounded-xl">
                {pages.map(page => (
                  <SelectItem 
                    key={page.id} 
                    value={page.id}
                    className="px-4 py-3 hover:bg-blue-50 focus:bg-blue-50 rounded-lg m-1"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Home className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="font-medium">{page.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Language Selection */}
          <div className="space-y-3">
            <Label htmlFor="language-select" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Languages className="h-4 w-4 text-orange-600" />
              Idioma
            </Label>
            <div className="flex items-center space-x-3 p-3 bg-white/80 border border-gray-200 rounded-xl">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className={`relative w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 border-2 ${
                    selectedLanguage === lang.code 
                      ? 'border-orange-500 shadow-lg scale-110' 
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  {lang.flag}
                  {selectedLanguage === lang.code && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-white"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PageSelector;
