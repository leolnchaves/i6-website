
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, FileText, Settings } from 'lucide-react';
import CMSContentEditor from './CMSContentEditor';

const SiteStructure = () => {
  // Configuração dos campos da seção Hero
  const heroFields = [
    { key: 'infinite', label: 'Título - Primeira Parte', type: 'text' as const },
    { key: 'possibilities', label: 'Título - Segunda Parte', type: 'text' as const },
    { key: 'poweredByAI', label: 'Subtítulo', type: 'text' as const },
    { key: 'description', label: 'Descrição', type: 'textarea' as const },
    { key: 'startJourney', label: 'Botão - Iniciar Jornada', type: 'text' as const },
    { key: 'watchDemo', label: 'Botão - Ver Demo', type: 'text' as const }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Estrutura do Site</h1>
        <p className="text-gray-600">
          Gerencie o conteúdo e a estrutura das páginas do seu site.
        </p>
      </div>

      <Tabs defaultValue="home" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="home" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Página Inicial
          </TabsTrigger>
          <TabsTrigger value="pages" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Outras Páginas
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configurações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Página Inicial</CardTitle>
              <CardDescription>
                Gerencie o conteúdo da página inicial do site.
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Seção Hero</h2>
              <CMSContentEditor
                pageSlug="home"
                section="hero"
                fields={heroFields}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pages" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Outras Páginas</CardTitle>
              <CardDescription>
                Gerenciamento de outras páginas do site será implementado em breve.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Esta funcionalidade estará disponível em futuras atualizações.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Site</CardTitle>
              <CardDescription>
                Configurações gerais e SEO serão implementadas em breve.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Esta funcionalidade estará disponível em futuras atualizações.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteStructure;
