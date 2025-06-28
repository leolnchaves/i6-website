
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, Home, Sparkles } from 'lucide-react';

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
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-slate-800">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          Configurações
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="page-select" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Home className="h-4 w-4 text-slate-500" />
              Página
            </Label>
            <Select value={selectedPage} onValueChange={onPageChange}>
              <SelectTrigger className="border-slate-200 bg-white/50 hover:bg-white/80 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400">
                <SelectValue placeholder="Selecione uma página" />
              </SelectTrigger>
              <SelectContent className="border-slate-200 bg-white/95 backdrop-blur-sm">
                {pages.map(page => (
                  <SelectItem key={page.id} value={page.id} className="hover:bg-slate-50 focus:bg-blue-50 focus:text-blue-900">
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-slate-500" />
                      {page.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="language-select" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Globe className="h-4 w-4 text-slate-500" />
              Idioma
            </Label>
            <Select value={selectedLanguage} onValueChange={onLanguageChange}>
              <SelectTrigger className="border-slate-200 bg-white/50 hover:bg-white/80 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400">
                <SelectValue placeholder="Selecione um idioma" />
              </SelectTrigger>
              <SelectContent className="border-slate-200 bg-white/95 backdrop-blur-sm">
                <SelectItem value="en" className="hover:bg-slate-50 focus:bg-blue-50 focus:text-blue-900">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🇺🇸</span>
                    <span className="font-medium">English</span>
                  </div>
                </SelectItem>
                <SelectItem value="pt" className="hover:bg-slate-50 focus:bg-blue-50 focus:text-blue-900">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🇧🇷</span>
                    <span className="font-medium">Português</span>
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
