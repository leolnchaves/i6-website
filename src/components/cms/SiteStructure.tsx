
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
  Zap
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
          description: 'Seção principal com título "Infinite Possibilities Powered by AI" e botões de CTA',
          components: ['Título principal', 'Subtítulo', 'Botão "Start Your Journey"', 'Botão "Watch Demo"', 'Animação de scroll']
        },
        {
          name: 'Results Section',
          description: 'Showcase dos resultados reais de IA que impulsionam o crescimento dos negócios',
          components: [
            'Título: "Real AI Impact That Drives Business Growth"',
            'Cards de resultados: Conversion Rate (+127%), CRM Cost (-65%), Average Ticket (+89%)',
            'Cards adicionais: Bounce Rate (-45%), Proposal Engagement (+156%), Real-Time Rec (+98%)',
            'Mais cards: Product Discovery (+134%), Dynamic Pricing (+67%), Market Demand (+89%), Rapid Implementation (100%)'
          ]
        },
        {
          name: 'Compact Solutions Section',
          description: 'Apresentação compacta das principais soluções de IA',
          components: [
            'Grid de soluções',
            'Cards para cada solução principal',
            'Link para página de soluções completa'
          ]
        },
        {
          name: 'Stats Section',
          description: 'Estatísticas importantes da empresa',
          components: [
            'Companies Transformed: 500+',
            'Accuracy Rate: 99.2%',
            'Expert Support: 24/7',
            'Estatísticas adicionais de performance'
          ]
        },
        {
          name: 'Featured Stories Section',
          description: 'Cases de sucesso em destaque',
          components: [
            'TechCorp Industries - Manufacturing',
            'FinanceFlow - Financial Services', 
            'RetailMax - E-commerce',
            'Botão para ver todos os cases'
          ]
        },
        {
          name: 'CTA Section',
          description: 'Chamada final para ação',
          components: [
            'Título: "Ready to Transform Your Business?"',
            'Descrição motivacional',
            'Botão "Get Started Today"'
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
          description: 'Hero section específico para soluções',
          components: ['Título principal sobre soluções de IA', 'Descrição das capacidades', 'CTA para explorar soluções']
        },
        {
          name: 'Solutions Grid',
          description: 'Grid detalhado com todas as soluções disponíveis',
          components: [
            'Smart Discovery for Anonymous Visitors (B2B, B2C)',
            'Predictive Personalization for Identified Users (B2B, B2C, B2B2C, D2C)',
            'Industrial Recommendation Intelligence (B2B, B2B2C)',
            'Predictive Campaign Targeting (B2C)',
            'Smart Price Optimization (B2B, B2C, B2B2C, D2C)',
            'Adaptive Demand Forecasting (B2B, B2C)'
          ]
        },
        {
          name: 'Process Flow',
          description: 'Jornada de implementação da IA',
          components: [
            'Discovery & Business Angle Definition',
            'Data Sample & Anonymization',
            'Model Training & Fine-tuning',
            'Performance Evaluation',
            'Integration & Recommendations'
          ]
        },
        {
          name: 'Sandbox Environment',
          description: 'Ambiente de testes sem risco',
          components: [
            'Risk-Free Testing Environment',
            'Expert Consulting & Support',
            '30-Day Concrete Results'
          ]
        },
        {
          name: 'Solutions CTA',
          description: 'Chamada para ação específica de soluções',
          components: ['CTA personalizado para começar transformação']
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
          components: ['Título inspiracional', 'Descrição sobre transformação de empresas']
        },
        {
          name: 'Metrics Section',
          description: 'Métricas importantes dos resultados',
          components: [
            'Average ROI: 20x',
            'Companies Served: 500+',
            'Cost Savings Generated: $50M+'
          ]
        },
        {
          name: 'Stories Grid',
          description: 'Grid detalhado dos cases de sucesso',
          components: [
            'TechCorp Industries - Manufacturing (75% downtime reduction, 40% cost savings)',
            'FinanceFlow - Financial Services (99.2% fraud detection, 60% false positives reduction)',
            'RetailMax - E-commerce (45% revenue growth, 30% customer retention increase)'
          ]
        },
        {
          name: 'Testimonials Section',
          description: 'Depoimentos dos clientes',
          components: [
            'David Kim, CTO at DataTech',
            'Emma Watson, CEO at InnovateCorp',
            'Robert Taylor, VP at FutureTech'
          ]
        },
        {
          name: 'Success Stories CTA',
          description: 'Chamada para começar transformação',
          components: ['CTA para escrever sua própria história de sucesso']
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
          components: ['Título: "Let\'s Start a Conversation"', 'Descrição motivacional']
        },
        {
          name: 'Contact Info Cards',
          description: 'Informações de contato organizadas em cards',
          components: [
            'Email Us - Send us an email anytime',
            'Call Us - Mon-Fri from 8am to 6pm',
            'Visit Us - Come say hello at our headquarters'
          ]
        },
        {
          name: 'Contact Form',
          description: 'Formulário de contato completo',
          components: [
            'Full Name, Email Address, Company, Phone Number',
            'Subject (General Inquiry, Request Demo, Partnership, Technical Support)',
            'Message field',
            'Send Message button'
          ]
        },
        {
          name: 'FAQ Section',
          description: 'Perguntas frequentes com busca',
          components: [
            'Search functionality for FAQs',
            '10 perguntas frequentes detalhadas',
            'Respostas abrangentes sobre implementação, ROI, suporte, etc.'
          ]
        },
        {
          name: 'World Map',
          description: 'Mapa global com escritórios',
          components: [
            'Brazil (Headquarters)',
            'United States (Branch Office)',
            'Italy (Branch Office)',
            'Informações de contato para cada localização'
          ]
        },
        {
          name: 'Calendly Section',
          description: 'Agendamento direto com especialistas',
          components: ['Integração com Calendly', 'CTA para agendar sessão']
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
          components: ['Título da política', 'Data de última atualização', 'Descrição sobre prioridade da privacidade']
        },
        {
          name: 'Privacy Content',
          description: 'Conteúdo detalhado da política',
          components: ['Documento legal completo sobre tratamento de dados']
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
          components: ['Título da política', 'Data de última atualização', 'Compromisso com IA ética']
        },
        {
          name: 'Ethics Content',
          description: 'Conteúdo detalhado da política ética',
          components: ['Documento sobre práticas empresariais responsáveis']
        }
      ]
    }
  ];

  const globalComponents = [
    {
      name: 'Header/Navigation',
      description: 'Cabeçalho global presente em todas as páginas',
      components: [
        'Logo Infinity6.ai',
        'Menu: Home, Solutions, Success Stories, Contact Us',
        'Language Selector (EN/PT)',
        'Botão "Get Started"',
        'Design responsivo com menu mobile'
      ]
    },
    {
      name: 'Footer',
      description: 'Rodapé global presente em todas as páginas',
      components: [
        'Descrição da empresa',
        'Quick Links (Home, Solutions, Success Stories, Contact)',
        'Informações de contato',
        'Links para Privacy Policy e Ethics Policy',
        'Copyright © 2024 Infinity6.ai'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Estrutura do Site</h1>
        <p className="text-gray-600">
          Documentação completa da estrutura do site Infinity6.ai, organizada página por página com todas as seções e componentes.
        </p>
      </div>

      <Separator />

      {/* Global Components */}
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

      {/* Site Pages */}
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

      {/* Statistics Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Resumo da Estrutura
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
              <div className="text-2xl font-bold text-purple-600">2</div>
              <div className="text-sm text-gray-600">Idiomas (EN/PT)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">100%</div>
              <div className="text-sm text-gray-600">Responsivo</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteStructure;
