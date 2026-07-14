import type { KioskLang } from './config';

export type SignalScenarioId = 'supply' | 'forecast' | 'pricing' | 'comercial' | 'mix' | 'pdv';

export interface SignalScenario {
  id: SignalScenarioId;
  label: string;
  question: string;
  analysis: string;
  actions: { bold: string; text: string }[];
}

export const kioskSignals: Record<KioskLang, Record<SignalScenarioId, SignalScenario>> = {
  pt: {
    supply: {
      id: 'supply',
      label: 'Ruptura',
      question: 'Quais SKUs estão em risco de ruptura nos próximos 3 meses?',
      analysis:
        '5 SKUs com alta probabilidade de ruptura nos próximos 90 dias. O item líder de risco tem 94% de probabilidade devido à sazonalidade e lead time de 22 dias. Impacto potencial: R$ 510.000 no trimestre se nada for feito.',
      actions: [
        { bold: 'Renegociar contratos', text: 'com o fornecedor crítico — reduzir lead time e liberar lote mínimo flexível.' },
        { bold: 'Ajustar forecast', text: 'incorporando curva sazonal ao modelo de reposição.' },
        { bold: 'Elevar estoque de segurança', text: 'para 30 dias nos 5 SKUs mais críticos.' },
      ],
    },
    forecast: {
      id: 'forecast',
      label: 'Sazonalidade',
      question: 'Qual a sazonalidade e tendência do produto mais vendido para o próximo trimestre?',
      analysis:
        'O produto mais vendido apresenta forte sazonalidade com pico em dezembro (+34% vs média). Tendência de longo prazo de +8,2% por trimestre. Predição de alta confiabilidade para o planejamento comercial.',
      actions: [
        { bold: 'Aumentar estoque de segurança', text: '+25% em novembro e +40% em dezembro.' },
        { bold: 'Planejar campanhas', text: 'em outubro, aproveitando o início da curva ascendente.' },
        { bold: 'Renegociar contratos', text: 'com fornecedores para volumes maiores no Q4.' },
      ],
    },
    pricing: {
      id: 'pricing',
      label: 'Preço Ótimo',
      question: 'Qual o preço ótimo para o Ibuprofeno 400mg na região Sudeste?',
      analysis:
        'Preço atual está 7% acima do ponto ótimo. Reduzir para R$ 17,50 maximiza a margem total: +12% em volume e ganho líquido estimado de R$ 43.000/mês na região.',
      actions: [
        { bold: 'Implementar preço', text: 'de R$ 17,50 em piloto com 50 PDVs.' },
        { bold: 'Monitorar elasticidade cruzada', text: 'avaliando impacto em genéricos concorrentes.' },
        { bold: 'Teste A/B regional', text: 'comparando novo preço vs atual por 4 semanas.' },
      ],
    },
    comercial: {
      id: 'comercial',
      label: 'Foco Comercial',
      question: 'Onde devo focar o esforço comercial este mês?',
      analysis:
        '8 territórios com gap significativo de receita. Os 3 prioritários concentram 62% do gap total (R$ 890k) e têm alta probabilidade de conversão baseada no histórico.',
      actions: [
        { bold: 'Alocar representantes adicionais', text: 'para o território líder de gap.' },
        { bold: 'Campanha de incentivo', text: 'com bonificação escalonada por faixa de crescimento.' },
        { bold: 'Visita executiva', text: 'aos maiores clientes para renegociar mix e share of shelf.' },
      ],
    },
    mix: {
      id: 'mix',
      label: 'Mix / Sortimento',
      question: 'Qual o mix ideal para a região Sul?',
      analysis:
        'Mix atual desalinhado em 3 categorias. Sobre-indexa analgésicos (38% vs 29% ideal) e sub-indexa anti-hipertensivos (12% vs 19%). Ajuste projeta +R$ 312k/mês na margem regional.',
      actions: [
        { bold: 'Reduzir exposição de analgésicos', text: 'em 9pp, redistribuindo para anti-hipertensivos.' },
        { bold: 'Push comercial', text: 'de anti-hipertensivos com campanha médica direcionada.' },
        { bold: 'Revisar sortimento', text: 'de 120 PDVs em 60 dias.' },
      ],
    },
    pdv: {
      id: 'pdv',
      label: 'Compra / Recompra',
      question: 'Qual o comportamento de compra e recompra do produto X na região?',
      analysis:
        'Taxa de recompra crescente nos últimos 6 meses: de 62% para 78%. Ciclo médio de 28 dias, alinhado à posologia. Farmácias com fidelidade têm recompra 15pp acima da média.',
      actions: [
        { bold: 'Expandir fidelidade', text: 'para os 40 PDVs com menor recompra.' },
        { bold: 'Alertas automáticos', text: 'para pacientes com ciclo > 35 dias.' },
        { bold: 'Campanha de adesão', text: 'junto a prescritores da região.' },
      ],
    },
  },
  en: {
    supply: {
      id: 'supply',
      label: 'Stockout',
      question: 'Which SKUs are at risk of stockout in the next 3 months?',
      analysis:
        '5 SKUs with high stockout probability in the next 90 days. Leading item at 94% risk due to seasonality and a 22-day supplier lead time. Potential impact: $102,000 in the quarter if no action is taken.',
      actions: [
        { bold: 'Renegotiate contracts', text: 'with the critical supplier — cut lead time and enable a flexible minimum lot.' },
        { bold: 'Adjust forecast', text: 'incorporating the seasonal curve into the replenishment model.' },
        { bold: 'Raise safety stock', text: 'to 30 days for the 5 most critical SKUs.' },
      ],
    },
    forecast: {
      id: 'forecast',
      label: 'Seasonality',
      question: 'What is the seasonality and trend of the best-selling product for the next quarter?',
      analysis:
        'The best-selling product shows a strong seasonal component peaking in December (+34% vs average). Long-term trend: +8.2% per quarter. Highly reliable prediction for commercial planning.',
      actions: [
        { bold: 'Increase safety stock', text: '+25% in November and +40% in December.' },
        { bold: 'Plan campaigns', text: 'in October, riding the start of the ascending curve.' },
        { bold: 'Renegotiate contracts', text: 'with suppliers for larger Q4 volumes.' },
      ],
    },
    pricing: {
      id: 'pricing',
      label: 'Optimal Price',
      question: 'What is the optimal price for Ibuprofen 400mg in the Northeast region?',
      analysis:
        'Current price is 7% above optimal. Reducing to $3.50 maximizes total margin: +12% volume and estimated net gain of $8,600/month in the region.',
      actions: [
        { bold: 'Implement price', text: 'of $3.50 as a pilot with 50 POS.' },
        { bold: 'Monitor cross-elasticity', text: 'assessing impact on competing generics.' },
        { bold: 'Regional A/B test', text: 'comparing new price vs current over 4 weeks.' },
      ],
    },
    comercial: {
      id: 'comercial',
      label: 'Commercial Focus',
      question: 'Where should I focus commercial efforts this month?',
      analysis:
        '8 territories with significant revenue gaps. The top 3 concentrate 62% of the total gap ($178k) with high conversion probability based on history.',
      actions: [
        { bold: 'Allocate additional reps', text: 'to the territory leading the gap.' },
        { bold: 'Incentive campaign', text: 'with scaled bonus by growth tier.' },
        { bold: 'Executive visit', text: 'to top clients to renegotiate mix and share of shelf.' },
      ],
    },
    mix: {
      id: 'mix',
      label: 'Mix / Assortment',
      question: 'What is the ideal mix for the West region?',
      analysis:
        'Current mix misaligned in 3 categories. Over-indexes analgesics (38% vs 29% ideal) and under-indexes anti-hypertensives (12% vs 19%). Adjustment projects +$62k/month in regional margin.',
      actions: [
        { bold: 'Reduce analgesics exposure', text: 'by 9pp, redistributing to anti-hypertensives.' },
        { bold: 'Commercial push', text: 'of anti-hypertensives with a targeted medical campaign.' },
        { bold: 'Review assortment', text: 'of 120 POS within 60 days.' },
      ],
    },
    pdv: {
      id: 'pdv',
      label: 'Purchase / Repurchase',
      question: 'What is the purchase and repurchase behavior of product X in the region?',
      analysis:
        'Growing repurchase rate over the last 6 months: from 62% to 78%. Average cycle of 28 days, aligned with posology. Loyalty-program pharmacies show repurchase 15pp above average.',
      actions: [
        { bold: 'Expand loyalty', text: 'to the 40 POS with the lowest repurchase.' },
        { bold: 'Automatic alerts', text: 'for patients with a cycle > 35 days.' },
        { bold: 'Adherence campaign', text: 'with prescribers in the region.' },
      ],
    },
  },
};
