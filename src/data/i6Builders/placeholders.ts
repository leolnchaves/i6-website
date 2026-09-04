/**
 * Dados de exemplo da página /i6-builders.
 *
 * Isolados aqui de propósito: o JSX das seções apenas consome estes arrays,
 * então trocar ou remover estes dados no futuro não exige tocar em markup.
 */
import type { Language } from '@/types/language';

type Localized = Record<Language, string>;

export interface DomainAccelerator {
  id: string;
  name: Localized;
  desc: Localized;
  engines: string[];
}

// PLACEHOLDER: vertical fictícia, substituir depois
export const DOMAIN_ACCELERATORS: DomainAccelerator[] = [
  {
    id: 'pharma',
    name: { pt: 'Pharma Accelerator', en: 'Pharma Accelerator', es: 'Pharma Accelerator' },
    desc: {
      pt: 'Pacote pré-configurado que combina modelagem de demanda e elasticidade para operações reguladas de alta complexidade de canal',
      en: 'Pre-configured package combining demand and elasticity modeling for regulated operations with complex channel structures',
      es: 'Paquete preconfigurado que combina modelado de demanda y elasticidad para operaciones reguladas con canales complejos',
    },
    engines: ['Forecasting', 'Pricing', 'Assortment'],
  },
  {
    id: 'retail',
    name: { pt: 'Varejo Accelerator', en: 'Retail Accelerator', es: 'Retail Accelerator' },
    desc: {
      pt: 'Combinação de recomendação, propensão e planejamento para operações com alto volume de transações e sazonalidade intensa',
      en: 'Recommendation, propensity and planning combined for operations with high transaction volume and strong seasonality',
      es: 'Recomendación, propensión y planificación combinadas para operaciones con alto volumen transaccional y fuerte estacionalidad',
    },
    engines: ['Recommendation', 'Propension', 'Sales Planning'],
  },
  {
    id: 'industry',
    name: { pt: 'Indústria Accelerator', en: 'Manufacturing Accelerator', es: 'Industria Accelerator' },
    desc: {
      pt: 'Modelagem de demanda e capacidade orientada a cadeias longas de suprimento e decisões de planejamento com horizonte estendido',
      en: 'Demand and capacity modeling for long supply chains and planning decisions with extended horizons',
      es: 'Modelado de demanda y capacidad para cadenas largas de suministro y decisiones de planificación de horizonte extendido',
    },
    engines: ['Forecasting', 'Demand Modeling'],
  },
];

export interface PartnerCase {
  id: string;
  company: string;
  context: Localized;
  quote: Localized;
  author: Localized;
  logo: string;
}

// PLACEHOLDER: case fictício para validação de layout, substituir por dados reais
export const PARTNER_CASES: PartnerCase[] = [
  {
    id: 'northbeam',
    company: 'Northbeam Systems',
    context: { pt: 'Embedded (OEM)', en: 'Embedded (OEM)', es: 'Embedded (OEM)' },
    quote: {
      pt: 'Incorporamos as capacidades de modelagem ao nosso produto em semanas, sem montar um time de ciência de dados',
      en: 'We embedded the modeling capabilities into our product in weeks, with no data science team to build',
      es: 'Incorporamos las capacidades de modelado a nuestro producto en semanas, sin armar un equipo de ciencia de datos',
    },
    author: { pt: 'Head de Produto', en: 'Head of Product', es: 'Head de Producto' },
    logo: 'placeholder.svg',
  },
  {
    id: 'lumenlabs',
    company: 'Lumen Labs',
    context: { pt: 'Novo Produto', en: 'New Product', es: 'Nuevo Producto' },
    quote: {
      pt: 'Construímos um produto de decisão do zero sobre os engines, e focamos toda a nossa engenharia na experiência',
      en: 'We built a decision product from scratch on top of the engines and focused all our engineering on experience',
      es: 'Construimos un producto de decisión desde cero sobre los engines y enfocamos toda nuestra ingeniería en la experiencia',
    },
    author: { pt: 'CTO', en: 'CTO', es: 'CTO' },
    logo: 'placeholder.svg',
  },
  {
    id: 'atlasforge',
    company: 'Atlas Forge',
    context: { pt: 'Embedded (OEM)', en: 'Embedded (OEM)', es: 'Embedded (OEM)' },
    quote: {
      pt: 'As APIs e o toolkit reduziram nosso ciclo de validação de modelos de meses para dias',
      en: 'The APIs and the toolkit cut our model validation cycle from months to days',
      es: 'Las APIs y el toolkit redujeron nuestro ciclo de validación de modelos de meses a días',
    },
    author: { pt: 'Diretor de Engenharia', en: 'Engineering Director', es: 'Director de Ingeniería' },
    logo: 'placeholder.svg',
  },
];
