
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Home, 
  Lightbulb, 
  Trophy, 
  Phone, 
  Shield, 
  Heart,
  Globe,
  Navigation,
  BarChart3,
  Users,
  Target,
  Zap,
  Database,
  Settings,
  FileText
} from 'lucide-react';

const SiteStructure = () => {
  const sitePages = [
    {
      name: 'Home (Página Principal)',
      route: '/',
      icon: Home,
      sections: [
        {
          name: 'Hero Section',
          description: 'Seção principal com chamada para ação e animação de scroll',
          components: [
            'Título principal editável via CMS',
            'Subtítulo editável via CMS', 
            'Botão "Start Your Journey" editável via CMS',
            'Botão "Watch Demo" editável via CMS',
            'Animação de scroll suave',
            'Background gradiente dinâmico'
          ]
        },
        {
          name: 'Results Section',
          description: 'Cards de resultados reais com dados gerenciados pelo CMS',
          components: [
            'Título da seção editável via CMS',
            'Subtítulo editável via CMS',
            'Cards dinâmicos carregados do banco de dados',
            'Cada card tem: ícone, título, descrição, cor de fundo',
            'Sistema de ordenação de cards',
            'Suporte a múltiplos idiomas (EN/PT)',
            'Animações de hover e entrada'
          ]
        },
        {
          name: 'Compact Solutions Section',
          description: 'Grid de soluções compactas carregadas dinamicamente',
          components: [
            'Título da seção editável via CMS',
            'Subtítulo editável via CMS',
            'Cards de soluções carregados da tabela cms_solutions_cards',
            'Cada card exibe: ícone dinâmico, título, descrição',
            'Ícones carregados dinamicamente do Lucide React',
            'Layout responsivo em grid',
            'Animações modernas com gradientes',
            'Estados de loading e error'
          ]
        },
        {
          name: 'Stats Section',
          description: 'Estatísticas da empresa com contadores animados',
          components: [
            'Título da seção editável via CMS',
            'Cards de estatísticas editáveis',
            'Animações de contagem automática',
            'Layout responsivo',
            'Background com gradientes'
          ]
        },
        {
          name: 'Featured Stories Section',
          description: 'Cases de sucesso em destaque com dados estáticos',
          components: [
            'Título da seção editável via CMS',
            'Subtítulo editável via CMS',
            'Cards de cases pré-definidos',
            'Botão "View All Stories" editável',
            'Layout em carousel responsivo'
          ]
        },
        {
          name: 'CTA Section',
          description: 'Chamada final para ação',
          components: [
            'Título editável via CMS',
            'Descrição editável via CMS',
            'Botão principal editável via CMS',
            'Background com gradiente'
          ]
        }
      ]
    },
    {
      name: 'Solutions (Soluções)',
      route: '/solutions',
      icon: Lightbulb,
      sections: [
        {
          name: 'Solutions Hero',
          description: 'Hero section da página de soluções',
          components: [
            'Título principal editável via CMS',
            'Subtítulo editável via CMS',
            'Descrição detalhada editável via CMS',
            'Botão CTA editável via CMS'
          ]
        },
        {
          name: 'CMS Solutions Grid',
          description: 'Grid de soluções gerenciado pelo CMS',
          components: [
            'Cards carregados da tabela cms_solutions_cards',
            'Cada card inclui: título, descrição, features, foco, resultado',
            'Ícones dinâmicos carregados do Lucide React',
            'Cores e gradientes personalizáveis',
            'Sistema de ordenação',
            'Suporte a múltiplos idiomas'
          ]
        },
        {
          name: 'Process Flow',
          description: 'Fluxo do processo de implementação',
          components: [
            'Dados estáticos do arquivo processData.ts',
            'Visualização em linha temporal',
            'Animações de entrada sequencial'
          ]
        },
        {
          name: 'Sandbox Environment',
          description: 'Informações sobre ambiente de testes',
          components: [
            'Seção estática com informações sobre o sandbox',
            'Cards informativos sobre benefícios',
            'CTA para começar teste'
          ]
        }
      ]
    },
    {
      name: 'Success Stories (Cases de Sucesso)',
      route: '/success-stories',
      icon: Trophy,
      sections: [
        {
          name: 'Success Stories Hero',
          description: 'Hero section dos cases de sucesso',
          components: [
            'Título principal editável via CMS',
            'Subtítulo editável via CMS',
            'Descrição editável via CMS'
          ]
        },
        {
          name: 'Metrics Section',
          description: 'Métricas de performance da empresa',
          components: [
            'Título da seção editável via CMS',
            'Cards de métricas editáveis via CMS',
            'Animações de contagem',
            'Layout responsivo'
          ]
        },
        {
          name: 'Stories Grid',
          description: 'Grid de cases de sucesso gerenciado pelo CMS',
          components: [
            'Cards carregados da tabela cms_success_stories_cards',
            'Cada card inclui: empresa, indústria, desafio, solução, métricas',
            'Imagens personalizáveis',
            'Filtros por segmento',
            'Sistema de ordenação',
            'Suporte a múltiplos idiomas'
          ]
        },
        {
          name: 'Testimonials Section',
          description: 'Depoimentos de clientes gerenciados pelo CMS',
          components: [
            'Título da seção editável via CMS',
            'Subtítulo editável via CMS',
            'Depoimentos carregados da tabela cms_testimonials',
            'Cada depoimento inclui: citação, autor, título, empresa, rating',
            'Layout em carousel',
            'Sistema de ordenação'
          ]
        },
        {
          name: 'Success Stories CTA',
          description: 'Chamada para ação da página',
          components: [
            'Título editável via CMS',
            'Descrição editável via CMS',
            'Botão CTA editável via CMS'
          ]
        }
      ]
    },
    {
      name: 'Contact (Contato)',
      route: '/contact',
      icon: Phone,
      sections: [
        {
          name: 'Contact Hero',
          description: 'Hero section da página de contato',
          components: [
            'Título principal editável via CMS',
            'Subtítulo editável via CMS'
          ]
        },
        {
          name: 'Contact Info Cards',
          description: 'Cards com informações de contato',
          components: [
            'Dados estáticos: Email, Telefone, Endereço',
            'Ícones e layout responsivo',
            'Links funcionais para email e telefone'
          ]
        },
        {
          name: 'Contact Form',
          description: 'Formulário de contato funcional',
          components: [
            'Campos: Nome, Email, Empresa, Telefone, Assunto, Mensagem',
            'Validação de formulário com React Hook Form',
            'Seletor de assunto com opções predefinidas',
            'Feedback visual de envio'
          ]
        },
        {
          name: 'FAQ Section',
          description: 'Seção de perguntas frequentes gerenciada pelo CMS',
          components: [
            'Título da seção editável via CMS',
            'Barra de busca funcional',
            'FAQs carregadas da tabela cms_faq_cards',
            'Cada FAQ inclui: pergunta, resposta, ordenação',
            'Sistema de busca em tempo real',
            'Acordeão expansível'
          ]
        },
        {
          name: 'World Map',
          description: 'Mapa global com escritórios',
          components: [
            'Visualização de mapa mundial',
            'Marcadores para: Brasil (HQ), EUA, Itália',
            'Informações detalhadas de cada escritório',
            'Layout responsivo'
          ]
        },
        {
          name: 'Calendly Section',
          description: 'Integração com Calendly para agendamentos',
          components: [
            'Título editável via CMS',
            'Descrição editável via CMS',
            'Botão para abrir modal do Calendly',
            'Integração com widget do Calendly'
          ]
        }
      ]
    },
    {
      name: 'Privacy Policy (Política de Privacidade)',
      route: '/privacy-policy',
      icon: Shield,
      sections: [
        {
          name: 'Privacy Header',
          description: 'Cabeçalho da política de privacidade',
          components: [
            'Título da página',
            'Data de última atualização',
            'Introdução sobre privacidade'
          ]
        },
        {
          name: 'Privacy Content',
          description: 'Conteúdo legal da política',
          components: [
            'Documento completo sobre tratamento de dados',
            'Seções organizadas por tópicos',
            'Linguagem técnica e legal'
          ]
        }
      ]
    },
    {
      name: 'Ethics Policy (Política de Ética)',
      route: '/ethics-policy',
      icon: Heart,
      sections: [
        {
          name: 'Ethics Header',
          description: 'Cabeçalho da política de ética',
          components: [
            'Título da página',
            'Data de última atualização',
            'Compromisso com IA ética'
          ]
        },
        {
          name: 'Ethics Content',
          description: 'Conteúdo da política ética',
          components: [
            'Princípios de IA responsável',
            'Diretrizes éticas da empresa',
            'Compromissos com stakeholders'
          ]
        }
      ]
    }
  ];

  const globalComponents = [
    {
      name: 'Header/Navigation',
      description: 'Cabeçalho global responsivo presente em todas as páginas',
      components: [
        'Logo Infinity6.ai com link para home',
        'Menu principal: Home, Solutions, Success Stories, Contact',
        'Seletor de idioma (EN/PT) com Context API',
        'Botão "Get Started" destacado',
        'Menu hambúrguer para dispositivos móveis',
        'Navegação responsiva com animações',
        'Estados ativos para página atual'
      ]
    },
    {
      name: 'Footer',
      description: 'Rodapé global com informações da empresa',
      components: [
        'Descrição da empresa',
        'Links rápidos organizados por categoria',
        'Informações de contato com links funcionais',
        'Links para políticas (Privacy, Ethics)',
        'Copyright dinâmico com ano atual',
        'Layout responsivo em colunas'
      ]
    },
    {
      name: 'Language Context',
      description: 'Sistema de internacionalização global',
      components: [
        'Context API para gerenciamento de idioma',
        'Suporte a Português e Inglês',
        'Persistência da escolha do usuário',
        'Tradução automática de interfaces',
        'Carregamento dinâmico de conteúdo por idioma'
      ]
    }
  ];

  const cmsFeatures = [
    {
      name: 'Gestão de Conteúdo',
      description: 'Sistema completo de gerenciamento de conteúdo',
      features: [
        'Editor de conteúdo por página e idioma',
        'Campos organizados por seções',
        'Suporte a texto, textarea e seleção de ícones',
        'Preview em tempo real das mudanças',
        'Sistema de salvamento automático'
      ]
    },
    {
      name: 'Gestão de Cards Dinâmicos',
      description: 'Gerenciamento de cards em várias seções',
      features: [
        'Results Cards: ícone, título, descrição, cores',
        'Solutions Cards: título, descrição, features, ícone',
        'Success Stories Cards: empresa, métricas, imagens',
        'FAQ Cards: pergunta, resposta, ordenação',
        'Testimonials: citação, autor, empresa, rating'
      ]
    },
    {
      name: 'SEO Management',
      description: 'Otimização para motores de busca',
      features: [
        'Meta título e descrição por página',
        'URLs canônicas personalizáveis',
        'Configuração de indexação (index/noindex)',
        'Configuração de follow/nofollow',
        'Slugs personalizados para URLs'
      ]
    },
    {
      name: 'Sistema de Autenticação',
      description: 'Controle de acesso ao CMS',
      features: [
        'Login seguro com credenciais',
        'Diferentes níveis de permissão (admin, editor, viewer)',
        'Sessões persistentes',
        'Rotas protegidas',
        'Logout automático por inatividade'
      ]
    }
  ];

  const technicalFeatures = [
    {
      name: 'Arquitetura Frontend',
      description: 'Stack tecnológico moderno',
      components: [
        'React 18 com TypeScript',
        'Vite para build e desenvolvimento',
        'Tailwind CSS para estilização',
        'Shadcn/UI para componentes',
        'React Router para navegação',
        'Context API para estado global'
      ]
    },
    {
      name: 'Backend e Banco de Dados',
      description: 'Infraestrutura robusta com Supabase',
      components: [
        'Supabase como backend-as-a-service',
        'PostgreSQL como banco de dados',
        'Row Level Security (RLS) para segurança',
        'Triggers automáticos para updated_at',
        'Relacionamentos entre tabelas otimizados'
      ]
    },
    {
      name: 'Performance e Monitoramento',
      description: 'Otimizações e acompanhamento',
      components: [
        'Hook usePerformanceMonitor para métricas',
        'Sistema de logging estruturado',
        'Lazy loading de componentes',
        'Otimização de imagens',
        'Cache de dados quando apropriado'
      ]
    },
    {
      name: 'Experiência do Usuário',
      description: 'Interface moderna e responsiva',
      components: [
        'Design responsivo para todos os dispositivos',
        'Animações suaves com Tailwind',
        'Estados de loading e error',
        'Toasts para feedback do usuário',
        'Acessibilidade com ARIA labels'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Estrutura Atual do Site</h1>
        <p className="text-gray-600">
          Documentação completa e atualizada da estrutura do site Infinity6.ai, incluindo todas as páginas, 
          seções, componentes e funcionalidades do CMS implementadas.
        </p>
      </div>

      <Separator />

      {/* Componentes Globais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Componentes Globais
          </CardTitle>
          <CardDescription>
            Componentes que aparecem em todas as páginas do site
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {globalComponents.map((component, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">{component.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{component.description}</p>
              <div className="flex flex-wrap gap-2">
                {component.components.map((item, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Páginas do Site */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Páginas do Site</h2>
        
        {sitePages.map((page, pageIndex) => (
          <Card key={pageIndex}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <page.icon className="h-5 w-5" />
                {page.name}
                <Badge variant="outline">{page.route}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {page.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{section.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{section.description}</p>
                  <div className="space-y-2">
                    {section.components.map((component, compIndex) => (
                      <div key={compIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{component}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Funcionalidades do CMS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Funcionalidades do CMS
          </CardTitle>
          <CardDescription>
            Sistema de gerenciamento de conteúdo implementado
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {cmsFeatures.map((feature, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">{feature.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
              <div className="space-y-2">
                {feature.features.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Aspectos Técnicos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Aspectos Técnicos
          </CardTitle>
          <CardDescription>
            Arquitetura e tecnologias implementadas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {technicalFeatures.map((feature, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">{feature.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
              <div className="flex flex-wrap gap-2">
                {feature.components.map((item, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Resumo Estatístico */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Resumo da Estrutura Atual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{sitePages.length}</div>
              <div className="text-sm text-gray-600">Páginas Principais</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {sitePages.reduce((acc, page) => acc + page.sections.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Seções Totais</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">8</div>
              <div className="text-sm text-gray-600">Tabelas CMS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">2</div>
              <div className="text-sm text-gray-600">Idiomas (EN/PT)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabelas do Banco de Dados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Estrutura do Banco de Dados
          </CardTitle>
          <CardDescription>
            Tabelas implementadas no Supabase para o CMS
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Badge variant="outline" className="text-xs">cms_pages - Páginas do site</Badge>
              <Badge variant="outline" className="text-xs">cms_page_content - Conteúdo editável</Badge>
              <Badge variant="outline" className="text-xs">cms_seo - Dados de SEO</Badge>
              <Badge variant="outline" className="text-xs">cms_users - Usuários do CMS</Badge>
            </div>
            <div className="space-y-2">
              <Badge variant="outline" className="text-xs">cms_results_cards - Cards de resultados</Badge>
              <Badge variant="outline" className="text-xs">cms_solutions_cards - Cards de soluções</Badge>
              <Badge variant="outline" className="text-xs">cms_success_stories_cards - Cases de sucesso</Badge>
              <Badge variant="outline" className="text-xs">cms_testimonials - Depoimentos</Badge>
              <Badge variant="outline" className="text-xs">cms_faq_cards - Perguntas frequentes</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteStructure;
