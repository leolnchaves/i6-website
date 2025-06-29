
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Layers,
  Globe,
  Navigation,
  MessageSquare,
  FileText,
  Settings,
  Building,
  Users,
  MapPin,
  Calendar,
  Search,
  ChevronRight
} from 'lucide-react';

const ComponentsManagement = () => {
  const crossSiteComponents = [
    {
      name: 'Header/Navigation',
      description: 'Cabeçalho global do site com navegação principal',
      icon: Navigation,
      status: 'Ativo',
      pages: ['Home', 'Solutions', 'Success Stories', 'Contact'],
      features: [
        'Logo Infinity6.ai',
        'Menu principal responsivo',
        'Seletor de idioma (EN/PT)',
        'Botão "Get Started"',
        'Menu hambúrguer para mobile'
      ]
    },
    {
      name: 'Footer',
      description: 'Rodapé global com informações da empresa',
      icon: FileText,
      status: 'Ativo',
      pages: ['Home', 'Solutions', 'Success Stories', 'Contact'],
      features: [
        'Descrição da empresa',
        'Links rápidos organizados',
        'Informações de contato',
        'Links para políticas',
        'Copyright dinâmico'
      ]
    },
    {
      name: 'Language Context',
      description: 'Sistema de internacionalização global',
      icon: Globe,
      status: 'Ativo',
      pages: ['Todas as páginas'],
      features: [
        'Context API para idioma',
        'Suporte a Português e Inglês',
        'Persistência da escolha',
        'Tradução automática',
        'Carregamento dinâmico'
      ]
    },
    {
      name: 'Toast System',
      description: 'Sistema de notificações globais',
      icon: MessageSquare,
      status: 'Ativo',
      pages: ['CMS', 'Formulários'],
      features: [
        'Toasts de sucesso',
        'Toasts de erro',
        'Toasts informativos',
        'Auto-dismiss configurável',
        'Posicionamento customizável'
      ]
    },
    {
      name: 'Loading Spinner',
      description: 'Componente de carregamento reutilizável',
      icon: Settings,
      status: 'Ativo',
      pages: ['CMS', 'Formulários', 'Dados dinâmicos'],
      features: [
        'Spinner animado',
        'Tamanhos configuráveis',
        'Cores personalizáveis',
        'Estados de loading',
        'Acessibilidade'
      ]
    },
    {
      name: 'Error Boundary',
      description: 'Tratamento global de erros React',
      icon: Building,
      status: 'Ativo',
      pages: ['Todas as páginas'],
      features: [
        'Captura de erros React',
        'Fallback UI personalizado',
        'Logging de erros',
        'Recovery automático',
        'Modo desenvolvimento'
      ]
    }
  ];

  const upcomingComponents = [
    {
      name: 'SEO Meta Manager',
      description: 'Gerenciamento automático de meta tags',
      icon: Search,
      status: 'Planejado',
      features: [
        'Meta tags dinâmicas',
        'Open Graph automático',
        'Twitter Cards',
        'Structured Data',
        'Canonical URLs'
      ]
    },
    {
      name: 'Analytics Tracker',
      description: 'Sistema de tracking e analytics',
      icon: Users,
      status: 'Planejado',
      features: [
        'Google Analytics',
        'Event tracking',
        'Performance monitoring',
        'User behavior',
        'Conversion tracking'
      ]
    },
    {
      name: 'Cookie Consent',
      description: 'Banner de consentimento de cookies',
      icon: MapPin,
      status: 'Planejado',
      features: [
        'LGPD compliance',
        'GDPR compliance',
        'Configuração granular',
        'Persistência de escolhas',
        'Analytics integration'
      ]
    },
    {
      name: 'Chat Widget',
      description: 'Widget de chat integrado',
      icon: MessageSquare,
      status: 'Em Análise',
      features: [
        'Chat em tempo real',
        'Integração com CRM',
        'Respostas automáticas',
        'Multi-idioma',
        'Mobile friendly'
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Ativo':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Ativo</Badge>;
      case 'Planejado':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Planejado</Badge>;
      case 'Em Análise':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Em Análise</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestão de Componentes</h1>
        <p className="text-gray-600">
          Gerenciamento de componentes cross-site utilizados globalmente no site Infinity6.ai.
          Esta seção permite visualizar e futuramente gerenciar todos os componentes compartilhados.
        </p>
      </div>

      <Separator />

      {/* Componentes Ativos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Componentes Cross-Site Ativos
          </CardTitle>
          <CardDescription>
            Componentes globais implementados e em uso no site
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {crossSiteComponents.map((component, index) => (
            <div key={index} className="border rounded-lg p-6 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <component.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{component.name}</h4>
                    <p className="text-sm text-gray-600">{component.description}</p>
                  </div>
                </div>
                {getStatusBadge(component.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Páginas que utilizam:</h5>
                  <div className="flex flex-wrap gap-1">
                    {component.pages.map((page, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {page}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Funcionalidades:</h5>
                  <div className="space-y-1">
                    {component.features.slice(0, 3).map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                    {component.features.length > 3 && (
                      <div className="text-xs text-gray-500 pl-3.5">
                        +{component.features.length - 3} funcionalidades adicionais
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                  Implementado • Em produção
                </span>
                <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  Ver detalhes <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Componentes Futuros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Componentes Planejados
          </CardTitle>
          <CardDescription>
            Componentes em desenvolvimento ou planejamento futuro
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingComponents.map((component, index) => (
            <div key={index} className="border rounded-lg p-6 hover:shadow-sm transition-shadow opacity-75">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                    <component.icon className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{component.name}</h4>
                    <p className="text-sm text-gray-600">{component.description}</p>
                  </div>
                </div>
                {getStatusBadge(component.status)}
              </div>

              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Funcionalidades planejadas:</h5>
                <div className="space-y-1">
                  {component.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                  {component.status === 'Planejado' ? 'Roadmap 2025' : 'Em avaliação'}
                </span>
                <button className="text-sm text-gray-400 hover:text-gray-500 flex items-center gap-1" disabled>
                  Em desenvolvimento <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Resumo Estatístico */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Resumo dos Componentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{crossSiteComponents.length}</div>
              <div className="text-sm text-gray-600">Componentes Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{upcomingComponents.filter(c => c.status === 'Planejado').length}</div>
              <div className="text-sm text-gray-600">Planejados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{upcomingComponents.filter(c => c.status === 'Em Análise').length}</div>
              <div className="text-sm text-gray-600">Em Análise</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">6</div>
              <div className="text-sm text-gray-600">Páginas Cobertas</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Nota sobre funcionalidade futura */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Settings className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Funcionalidade em Desenvolvimento</h4>
              <p className="text-sm text-blue-700">
                Esta seção atualmente serve para documentação e visualização dos componentes cross-site. 
                Em futuras atualizações, será possível editar e configurar estes componentes diretamente 
                através do CMS, incluindo personalizações de estilo, conteúdo e comportamento.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComponentsManagement;
