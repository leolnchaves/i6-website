import { useLanguage } from '@/contexts/LanguageContext';
import companyLogo from '@/assets/company-logo.png';

interface StoryCard {
  id: string;
  industry: string;
  company_name: string;
  challenge: string;
  solution: string;
  metric1_value: string;
  metric1_label: string;
  metric2_value: string;
  metric2_label: string;
  metric3_value: string;
  metric3_label: string;
  customer_quote: string;
  customer_name: string;
  customer_title: string;
  image_url: string;
}

interface CompanyDetails {
  about: string;
  logo: string;
}

export const useCompanyDetails = () => {
  const { language } = useLanguage();

  const getCompanyDetails = (story: StoryCard): CompanyDetails => {
    const companyProfiles = {
      'TechRetail Inc.': {
        about: language === 'en' 
          ? 'Leading e-commerce platform with over 10 million users worldwide. Winner of Best Digital Innovation Award 2023.'
          : 'Plataforma de e-commerce líder com mais de 10 milhões de usuários mundialmente. Vencedor do Prêmio de Melhor Inovação Digital 2023.',
        logo: companyLogo
      },
      'Industrial Solutions Co.': {
        about: language === 'en'
          ? 'Fortune 500 manufacturing company with 25+ years of industry leadership. ISO 9001 certified with global operations.'
          : 'Empresa de manufatura Fortune 500 com mais de 25 anos de liderança na indústria. Certificada ISO 9001 com operações globais.',
        logo: companyLogo
      },
      'MedTech Innovations': {
        about: language === 'en'
          ? 'Premier healthcare technology provider serving 500+ hospitals across North America. FDA approved solutions.'
          : 'Principal provedor de tecnologia em saúde atendendo mais de 500 hospitais na América do Norte. Soluções aprovadas pela FDA.',
        logo: companyLogo
      },
      'Capital Banking Group': {
        about: language === 'en'
          ? 'Top-tier financial institution with $50B+ in assets. Recognized for digital transformation excellence and security innovation.'
          : 'Instituição financeira de primeira linha com mais de $50B em ativos. Reconhecida pela excelência em transformação digital e inovação em segurança.',
        logo: companyLogo
      },
      'Global Shipping Solutions': {
        about: language === 'en'
          ? 'International logistics leader handling 1M+ shipments annually. Green Supply Chain Award recipient.'
          : 'Líder em logística internacional processando mais de 1M de remessas anualmente. Recipiente do Prêmio Green Supply Chain.',
        logo: companyLogo
      },
      'NextGen Motors': {
        about: language === 'en'
          ? 'Innovative automotive manufacturer with focus on electric vehicles. Named Sustainability Leader 2023.'
          : 'Fabricante automotivo inovador com foco em veículos elétricos. Nomeado Líder em Sustentabilidade 2023.',
        logo: companyLogo
      }
    };

    return companyProfiles[story.company_name as keyof typeof companyProfiles] || {
      about: language === 'en' 
        ? 'Industry-leading company recognized for innovation and excellence in their sector.'
        : 'Empresa líder da indústria reconhecida pela inovação e excelência em seu setor.',
      logo: companyLogo
    };
  };

  return { getCompanyDetails };
};