// Conteúdo espelhado de src/data/signalDemo/content.ts (PT) — cenários usados no vídeo.

export type TableViz = {
  kind: 'table';
  headers: string[];
  rows: string[][];
};

export type BarViz = {
  kind: 'bars';
  legend: string;
  data: { label: string; gap: number; potential: number; score: number }[];
};

export type Scene = {
  chipLabel: string;
  question: string;
  title: string;
  analysis: string;
  viz: TableViz | BarViz;
  actions: { bold: string; text: string }[];
  questions: string[];
};

export const CHIPS = ['Ruptura', 'Sazonalidade', 'Preço Ótimo', 'Foco Comercial', 'Mix / Sortimento'];

export const SIDEBAR = ['Home', 'Ingestion Tokens', 'Recsys Tokens', 'Data Ingestion', 'i6 Signal', 'Widgets'];

export const LABELS = {
  executiveAnalysis: 'Análise Executiva',
  recommendedActions: 'Ações Recomendadas',
  suggestedQuestions: 'Perguntas Sugeridas',
  placeholder: 'Digite sua pergunta...',
  sectionSubtitle:
    'Clique em um tema abaixo e veja como sinais preditivos viram decisões que movem crescimento, margem e eficiência.',
};

export const SCENES: Scene[] = [
  {
    chipLabel: 'Ruptura',
    question: 'Quais SKUs estão em risco de ruptura nos próximos 3 meses?',
    title: 'Análise de Risco de Ruptura — Próximo Trimestre',
    analysis:
      'A projeção de demanda vs capacidade de reposição para os próximos 90 dias indica 5 SKUs com probabilidade elevada de ruptura. O SKU 44210 (Fone Bluetooth Over-ear) lidera o risco (94%) devido à sazonalidade de fim de ano e lead time de importação de 22 dias. O impacto acumulado estimado é de R$ 510.000 em receita no trimestre caso nenhuma ação preventiva seja tomada.',
    viz: {
      kind: 'table',
      headers: ['SKU', 'Produto', 'Prob. Ruptura', 'Estoque (dias)'],
      rows: [
        ['44210', 'Fone Bluetooth Over-ear', '94%', '18'],
        ['31087', 'Air Fryer 5L Digital', '87%', '24'],
        ['28901', 'Smartwatch Fitness GPS', '72%', '38'],
        ['55432', 'Cafeteira Espresso Automática', '61%', '45'],
        ['19876', 'Câmera de Segurança Wi-Fi', '48%', '62'],
      ],
    },
    actions: [
      {
        bold: 'Renegociar contratos',
        text: 'com fornecedor do SKU 44210 — garantir lead time máximo de 15 dias e lote mínimo flexível.',
      },
      {
        bold: 'Ajustar forecast',
        text: 'dos SKUs 31087 e 28901 — incorporar curva sazonal de Black Friday + Natal ao modelo de reposição.',
      },
      {
        bold: 'Revisar estoque de segurança',
        text: '— elevar cobertura mínima para 30 dias nos 5 SKUs críticos durante o próximo trimestre.',
      },
    ],
    questions: [
      'Qual o impacto financeiro acumulado das rupturas dos últimos 30 dias?',
      'Quais fornecedores apresentam maior variabilidade no lead time?',
      'Como redistribuir estoque entre CDs para cobrir a demanda regional?',
    ],
  },
  {
    chipLabel: 'Foco Comercial',
    question: 'Onde devo focar o esforço comercial este mês?',
    title: 'Priorização Comercial — Fevereiro 2026',
    analysis:
      'A análise de potencial vs performance identificou 8 territórios com gap significativo de receita. Os 3 territórios prioritários concentram 62% do gap total (R$ 890k), com alta probabilidade de conversão baseada no histórico de resposta a ações comerciais similares.',
    viz: {
      kind: 'bars',
      legend: 'Gap de receita (R$ mil) · Score de conversão',
      data: [
        { label: 'Grande BH', gap: 234, potential: 1200, score: 94 },
        { label: 'Campinas', gap: 198, potential: 890, score: 89 },
        { label: 'Curitiba', gap: 167, potential: 760, score: 85 },
        { label: 'P. Alegre', gap: 145, potential: 680, score: 78 },
      ],
    },
    actions: [
      {
        bold: 'Alocar representantes adicionais',
        text: 'para Grande BH, focando nos PDVs com maior gap individual.',
      },
      {
        bold: 'Campanha de incentivo',
        text: 'para Campinas com bonificação escalonada por faixa de crescimento.',
      },
      {
        bold: 'Visita executiva',
        text: 'aos maiores clientes de Curitiba para renegociar mix e share of shelf.',
      },
    ],
    questions: [
      'Qual o ROI histórico de ações comerciais em cada território?',
      'Quais produtos apresentam maior oportunidade de cross-sell?',
      'Como está a performance dos representantes vs quota individual?',
    ],
  },
];
