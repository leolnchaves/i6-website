
import { supabase } from '@/integrations/supabase/client';

interface CMSContentData {
  key: string;
  content_en: string;
  content_pt: string;
  content_type?: string;
  category?: string;
}

const defaultContent: CMSContentData[] = [
  // Hero Section
  {
    key: 'hero.infinite',
    content_en: 'Infinite',
    content_pt: 'Infinitas',
    category: 'hero'
  },
  {
    key: 'hero.possibilities',
    content_en: 'Possibilities',
    content_pt: 'Possibilidades',
    category: 'hero'
  },
  {
    key: 'hero.poweredByAI',
    content_en: 'Powered by AI',
    content_pt: 'Potencializadas por IA',
    category: 'hero'
  },
  {
    key: 'hero.description',
    content_en: 'Transform your business with cutting-edge AI solutions that deliver measurable results and drive growth.',
    content_pt: 'Transforme seu negócio com soluções de IA de ponta que entregam resultados mensuráveis e impulsionam o crescimento.',
    category: 'hero'
  },
  {
    key: 'hero.startJourney',
    content_en: 'Start Your Journey',
    content_pt: 'Comece Sua Jornada',
    category: 'hero'
  },
  {
    key: 'hero.watchDemo',
    content_en: 'Watch Demo',
    content_pt: 'Ver Demo',
    category: 'hero'
  },
  // Stats Section
  {
    key: 'stats.topEngine',
    content_en: 'Top Recommendation Engine',
    content_pt: 'Motor de Recomendação Líder',
    category: 'stats'
  },
  {
    key: 'stats.securityIssue',
    content_en: 'Security Issues',
    content_pt: 'Problemas de Segurança',
    category: 'stats'
  },
  {
    key: 'stats.leadtime',
    content_en: 'sec Lead Time',
    content_pt: 'seg Tempo de Resposta',
    category: 'stats'
  },
  {
    key: 'stats.explainability',
    content_en: 'Explainability',
    content_pt: 'Explicabilidade',
    category: 'stats'
  },
  // CTA Section
  {
    key: 'cta.title',
    content_en: 'Ready to Transform Your Business?',
    content_pt: 'Pronto para Transformar Seu Negócio?',
    category: 'cta'
  },
  {
    key: 'cta.description',
    content_en: 'Join thousands of companies already using our AI solutions to drive growth and innovation.',
    content_pt: 'Junte-se a milhares de empresas que já usam nossas soluções de IA para impulsionar crescimento e inovação.',
    category: 'cta'
  },
  {
    key: 'cta.button',
    content_en: 'Get Started Today',
    content_pt: 'Comece Hoje',
    category: 'cta'
  }
];

export const initializeCMS = async () => {
  try {
    console.log('Initializing CMS with default content...');
    
    // Check if content already exists
    const { data: existingContent } = await supabase
      .from('cms_content')
      .select('key')
      .limit(1);
    
    if (existingContent && existingContent.length > 0) {
      console.log('CMS already initialized');
      return;
    }
    
    // Insert default content
    const { error } = await supabase
      .from('cms_content')
      .insert(defaultContent);
    
    if (error) {
      console.error('Error initializing CMS:', error);
      return;
    }
    
    console.log('CMS initialized successfully with', defaultContent.length, 'items');
  } catch (error) {
    console.error('Error initializing CMS:', error);
  }
};
