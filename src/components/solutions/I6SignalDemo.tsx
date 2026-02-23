import { memo, useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import avatarRicardo from '@/assets/images/avatar-ricardo.jpg';
import {
  Home, Database, Brain, LayoutGrid, Send, ChevronRight, ChevronDown, ChevronUp,
  Heart, BookOpen, RotateCcw, Settings, BarChart3, Upload, Target,
  Lightbulb, Sparkles, TrendingUp, Shuffle, Repeat, Layers, Zap
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Scenario = 'supply' | 'forecast' | 'pricing' | 'comercial' | 'mix' | 'pdv';
type Phase = 'idle' | 'typing' | 'responding';

const TYPING_SPEED = 30;
const RESPONSE_DELAY = 600;

// ─── Bilingual content ───────────────────────────────────────────

const content = {
  pt: {
    sectionTitle: 'i6Signal - Inteligência de Movimento em Ação',
    sectionSubtitle: 'Escolha um tema e explore como sinais se convertem em decisões que movem crescimento e protegem margem.',
    placeholder: 'Digite sua pergunta...',
    sidebar: ['Home', 'Ingestion Tokens', 'Recsys Tokens', 'Data Ingestion', 'i6 Signal', 'Widgets'],
    executiveAnalysis: 'Análise Executiva',
    recommendedActions: 'Ações Recomendadas',
    suggestedQuestions: 'Perguntas Sugeridas',
    emptyState: 'Qual insight preditivo vamos descobrir hoje?',
    scenarios: {
      supply: {
        label: 'Supply',
        question: 'Quais SKUs estão em risco de ruptura esta semana?',
        title: 'Análise de Risco de Ruptura — Semana 09/2026',
        analysis: 'Com base nos dados de sell-out, estoque em CD e lead time de reposição, identificamos 5 SKUs com probabilidade elevada de ruptura nos próximos 7 dias. O SKU 44210 (Dipirona 500mg) apresenta o maior risco (94%), com estoque atual cobrindo apenas 1,8 dias de venda média. Recomenda-se ação imediata para evitar perda estimada de R$ 127.000 em receita semanal.',
        table: {
          headers: ['SKU', 'Produto', 'Prob. Ruptura', 'Estoque (dias)', 'Ação Sugerida'],
          rows: [
            ['44210', 'Dipirona 500mg 20cp', '94%', '1.8', 'Pedido emergencial'],
            ['31087', 'Omeprazol 20mg 28cp', '87%', '2.1', 'Antecipar reposição'],
            ['28901', 'Losartana 50mg 30cp', '72%', '3.4', 'Monitorar diariamente'],
            ['55432', 'Amoxicilina 500mg 21cp', '61%', '4.2', 'Revisar previsão'],
            ['19876', 'Metformina 850mg 30cp', '48%', '5.7', 'Acompanhar'],
          ],
        },
        actions: [
          { bold: 'Pedido emergencial', text: 'para SKU 44210 — acionar fornecedor com entrega expressa em até 48h.' },
          { bold: 'Antecipação de reposição', text: 'do SKU 31087 — renegociar janela de entrega de 5 para 3 dias.' },
          { bold: 'Dashboard de monitoramento', text: '— ativar alertas automáticos para SKUs com cobertura < 3 dias.' },
        ],
        questions: [
          'Qual o impacto financeiro acumulado das rupturas dos últimos 30 dias?',
          'Quais fornecedores apresentam maior variabilidade no lead time?',
          'Como redistribuir estoque entre CDs para cobrir a demanda regional?',
        ],
      },
      forecast: {
        label: 'Forecast',
        question: 'Qual a sazonalidade e tendência do produto mais vendido para o último quarter?',
        title: 'Análise Mensal do Item Mais Vendido (ID: 28822)',
        analysis: 'O produto ID 28822 (Paracetamol 750mg) apresenta forte componente sazonal com pico em dezembro (+34% vs média). A tendência de longo prazo é de crescimento de 8,2% ao trimestre, impulsionada por expansão de cobertura em farmácias independentes. O modelo SARIMA(1,1,1)(1,1,1) apresentou MAPE de 4,3%, indicando alta acurácia preditiva.',
        chartData: [
          { month: 'Out', seasonality: 12400, trend: 11800 },
          { month: 'Nov', seasonality: 14200, trend: 12600 },
          { month: 'Dez', seasonality: 18900, trend: 13400 },
        ],
        chartNote: 'O padrão sazonal indica aumento de 52% entre outubro e dezembro, consistente com os últimos 3 anos. A linha de tendência sugere que a base de consumo está se expandindo independentemente da sazonalidade.',
        actions: [
          { bold: 'Aumentar estoque de segurança', text: 'em 25% para novembro e 40% para dezembro, alinhado à curva sazonal.' },
          { bold: 'Planejar campanhas promocionais', text: 'para outubro, aproveitando o início da curva ascendente.' },
          { bold: 'Renegociar contratos', text: 'com fornecedores para volumes maiores no Q4, garantindo condições competitivas.' },
        ],
        questions: [
          'Como a sazonalidade varia por região (Sul vs Nordeste)?',
          'Qual o efeito de promoções na aceleração da curva sazonal?',
          'Existe canibalização com outros SKUs da mesma categoria?',
        ],
      },
      pricing: {
        label: 'Pricing',
        question: 'Qual o preço ótimo para o Ibuprofeno 400mg nesta região?',
        title: 'Otimização de Preço — Ibuprofeno 400mg (Região Sudeste)',
        analysis: 'A análise de elasticidade-preço para o Ibuprofeno 400mg na Região Sudeste indica que o preço atual de R$ 18,90 está 7% acima do ponto ótimo. A redução para R$ 17,50 maximizaria a margem de contribuição total, com aumento estimado de 12% no volume e ganho líquido de R$ 43.000/mês na região.',
        metrics: [
          { label: 'Preço Atual', value: 'R$ 18,90', sub: 'Acima do ótimo' },
          { label: 'Preço Ótimo', value: 'R$ 17,50', sub: 'Maximiza margem total' },
          { label: 'Elasticidade', value: '-1.34', sub: 'Demanda elástica' },
          { label: 'Ganho Estimado', value: '+R$ 43k/mês', sub: '+12% volume' },
        ],
        actions: [
          { bold: 'Implementar preço sugerido', text: 'de R$ 17,50 em fase piloto em 50 PDVs da Grande SP.' },
          { bold: 'Monitorar elasticidade cruzada', text: '— avaliar impacto em genéricos concorrentes.' },
          { bold: 'Teste A/B regional', text: '— comparar performance do novo preço vs atual durante 4 semanas.' },
        ],
        questions: [
          'Como a elasticidade varia entre canais (farma vs varejo)?',
          'Qual o preço ótimo para a Região Sul considerando a concorrência local?',
          'Existe oportunidade de bundling com outros produtos da linha?',
        ],
      },
      comercial: {
        label: 'Comercial',
        question: 'Onde devo focar o esforço comercial este mês?',
        title: 'Priorização Comercial — Fevereiro 2026',
        analysis: 'A análise de potencial vs performance identificou 8 territórios com gap significativo de receita. Os 3 territórios prioritários concentram 62% do gap total (R$ 890k), com alta probabilidade de conversão baseada no histórico de resposta a ações comerciais similares.',
        ranking: [
          { rank: 1, territory: 'Grande BH', gap: 'R$ 234k', score: 94, potential: 'R$ 1.2M' },
          { rank: 2, territory: 'Campinas', gap: 'R$ 198k', score: 89, potential: 'R$ 890k' },
          { rank: 3, territory: 'Curitiba', gap: 'R$ 167k', score: 85, potential: 'R$ 760k' },
          { rank: 4, territory: 'Porto Alegre', gap: 'R$ 145k', score: 78, potential: 'R$ 680k' },
        ],
        actions: [
          { bold: 'Alocar 2 representantes adicionais', text: 'para Grande BH, focando nos 15 PDVs com maior gap individual.' },
          { bold: 'Campanha de incentivo', text: 'para Campinas com bonificação escalonada por faixa de crescimento.' },
          { bold: 'Visita executiva', text: 'aos 5 maiores clientes de Curitiba para renegociar mix e share of shelf.' },
        ],
        questions: [
          'Qual o ROI histórico de ações comerciais em cada território?',
          'Quais produtos apresentam maior oportunidade de cross-sell?',
          'Como está a performance dos representantes vs quota individual?',
        ],
      },
      mix: {
        label: 'Mix',
        question: 'Qual mix ideal para a região Sul?',
        title: 'Otimização de Mix — Região Sul',
        analysis: 'A análise do mix atual vs recomendado para a Região Sul revela desalinhamento em 3 categorias principais. O mix atual sobre-indexa analgésicos (38% vs recomendado 29%) e sub-indexa anti-hipertensivos (12% vs recomendado 19%). O ajuste projetado impactaria em +R$ 312k/mês na margem de contribuição regional.',
        comparison: [
          { category: 'Analgésicos', current: '38%', recommended: '29%', direction: 'down' as const },
          { category: 'Anti-inflamatórios', current: '22%', recommended: '24%', direction: 'up' as const },
          { category: 'Anti-hipertensivos', current: '12%', recommended: '19%', direction: 'up' as const },
          { category: 'Antibióticos', current: '15%', recommended: '16%', direction: 'stable' as const },
          { category: 'Outros', current: '13%', recommended: '12%', direction: 'stable' as const },
        ],
        actions: [
          { bold: 'Reduzir exposição de analgésicos', text: 'em 9pp, redistribuindo espaço para anti-hipertensivos.' },
          { bold: 'Aumentar push comercial', text: 'de anti-hipertensivos com campanha médica direcionada.' },
          { bold: 'Revisar sortimento', text: 'de 120 PDVs da região para alinhar ao mix recomendado em 60 dias.' },
        ],
        questions: [
          'Qual o impacto do mix recomendado na rentabilidade por PDV?',
          'Como o mix ideal varia entre capital e interior?',
          'Quais SKUs específicos devem ser priorizados em anti-hipertensivos?',
        ],
      },
      pdv: {
        label: 'Comportamento',
        question: 'Qual o comportamento de compra e recompra da Losartana Potássica 50mg na região do Vale do Paraíba?',
        title: 'Comportamento de Compra e Recompra — Losartana Potássica 50mg (Vale do Paraíba)',
        analysis: 'A análise de comportamento de PDV na região do Vale do Paraíba revela que a Losartana Potássica 50mg apresenta taxa de recompra crescente nos últimos 6 meses, passando de 62% em setembro para 78% em fevereiro. O ciclo médio de recompra é de 28 dias, alinhado à posologia padrão. Farmácias com programa de fidelidade apresentam taxa de recompra 15pp superior à média regional, indicando forte correlação entre ações de retenção e recorrência.',
        barChartData: [
          { month: 'Set', compra: 4200, recompra: 2600 },
          { month: 'Out', compra: 4500, recompra: 2950 },
          { month: 'Nov', compra: 4800, recompra: 3400 },
          { month: 'Dez', compra: 5100, recompra: 3750 },
          { month: 'Jan', compra: 5400, recompra: 4100 },
          { month: 'Fev', compra: 5700, recompra: 4450 },
        ],
        barChartNote: 'A taxa de recompra cresceu 18pp no período, sugerindo aumento da adesão ao tratamento e eficácia das ações de fidelização nos PDVs da região.',
        actions: [
          { bold: 'Expandir programa de fidelidade', text: 'para os 40 PDVs com menor taxa de recompra na região, replicando o modelo dos top performers.' },
          { bold: 'Criar alertas de reposição', text: 'automáticos para pacientes com ciclo de recompra > 35 dias, reduzindo abandono de tratamento.' },
          { bold: 'Campanha de adesão', text: 'junto a prescritores da região, reforçando a importância da continuidade terapêutica.' },
        ],
        questions: [
          'Qual a taxa de recompra por bandeira de farmácia na região?',
          'Como o preço impacta o ciclo de recompra da Losartana?',
          'Quais PDVs apresentam maior risco de perda de pacientes para genéricos concorrentes?',
        ],
      },
    },
  },
  en: {
    sectionTitle: 'i6Signal - Movement Intelligence in Action',
    sectionSubtitle: 'Choose a topic and explore how signals become decisions that drive growth and protect margin.',
    placeholder: 'Type your question...',
    sidebar: ['Home', 'Ingestion Tokens', 'Recsys Tokens', 'Data Ingestion', 'i6 Signal', 'Widgets'],
    executiveAnalysis: 'Executive Analysis',
    recommendedActions: 'Recommended Actions',
    suggestedQuestions: 'Suggested Questions',
    emptyState: 'What predictive insight shall we discover today?',
    scenarios: {
      supply: {
        label: 'Supply',
        question: 'Which SKUs are at risk of stockout this week?',
        title: 'Stockout Risk Analysis — Week 09/2026',
        analysis: 'Based on sell-out data, DC inventory, and replenishment lead time, we identified 5 SKUs with elevated stockout probability in the next 7 days. SKU 44210 (Dipyrone 500mg) presents the highest risk (94%), with current stock covering only 1.8 days of average sales. Immediate action is recommended to avoid an estimated $25,000 weekly revenue loss.',
        table: {
          headers: ['SKU', 'Product', 'Stockout Prob.', 'Stock (days)', 'Suggested Action'],
          rows: [
            ['44210', 'Dipyrone 500mg 20ct', '94%', '1.8', 'Emergency order'],
            ['31087', 'Omeprazole 20mg 28ct', '87%', '2.1', 'Accelerate replenishment'],
            ['28901', 'Losartan 50mg 30ct', '72%', '3.4', 'Monitor daily'],
            ['55432', 'Amoxicillin 500mg 21ct', '61%', '4.2', 'Review forecast'],
            ['19876', 'Metformin 850mg 30ct', '48%', '5.7', 'Track'],
          ],
        },
        actions: [
          { bold: 'Emergency order', text: 'for SKU 44210 — contact supplier for express delivery within 48h.' },
          { bold: 'Accelerate replenishment', text: 'for SKU 31087 — renegotiate delivery window from 5 to 3 days.' },
          { bold: 'Monitoring dashboard', text: '— activate automatic alerts for SKUs with coverage < 3 days.' },
        ],
        questions: [
          'What is the accumulated financial impact of stockouts in the last 30 days?',
          'Which suppliers show the highest lead time variability?',
          'How to redistribute inventory across DCs to cover regional demand?',
        ],
      },
      forecast: {
        label: 'Forecast',
        question: 'What is the seasonality and trend of the best-selling product for the last quarter?',
        title: 'Monthly Analysis of Best-Selling Item (ID: 28822)',
        analysis: 'Product ID 28822 (Paracetamol 750mg) shows a strong seasonal component with a peak in December (+34% vs average). The long-term trend shows 8.2% growth per quarter, driven by coverage expansion in independent pharmacies. The SARIMA(1,1,1)(1,1,1) model achieved a MAPE of 4.3%, indicating high predictive accuracy.',
        chartData: [
          { month: 'Oct', seasonality: 12400, trend: 11800 },
          { month: 'Nov', seasonality: 14200, trend: 12600 },
          { month: 'Dec', seasonality: 18900, trend: 13400 },
        ],
        chartNote: 'The seasonal pattern indicates a 52% increase between October and December, consistent with the last 3 years. The trend line suggests the consumption base is expanding independently of seasonality.',
        actions: [
          { bold: 'Increase safety stock', text: 'by 25% for November and 40% for December, aligned with the seasonal curve.' },
          { bold: 'Plan promotional campaigns', text: 'for October, leveraging the start of the ascending curve.' },
          { bold: 'Renegotiate contracts', text: 'with suppliers for larger Q4 volumes, securing competitive conditions.' },
        ],
        questions: [
          'How does seasonality vary by region (South vs Northeast)?',
          'What is the effect of promotions on seasonal curve acceleration?',
          'Is there cannibalization with other SKUs in the same category?',
        ],
      },
      pricing: {
        label: 'Pricing',
        question: 'What is the optimal price for Ibuprofen 400mg in this region?',
        title: 'Price Optimization — Ibuprofen 400mg (Southeast Region)',
        analysis: 'Price elasticity analysis for Ibuprofen 400mg in the Southeast Region indicates the current price of $3.80 is 7% above the optimal point. Reducing to $3.50 would maximize total contribution margin, with an estimated 12% volume increase and net gain of $8,600/month in the region.',
        metrics: [
          { label: 'Current Price', value: '$3.80', sub: 'Above optimal' },
          { label: 'Optimal Price', value: '$3.50', sub: 'Maximizes total margin' },
          { label: 'Elasticity', value: '-1.34', sub: 'Elastic demand' },
          { label: 'Est. Gain', value: '+$8.6k/mo', sub: '+12% volume' },
        ],
        actions: [
          { bold: 'Implement suggested price', text: 'of $3.50 in a pilot phase across 50 POS in the metro area.' },
          { bold: 'Monitor cross-elasticity', text: '— assess impact on competing generics.' },
          { bold: 'Regional A/B test', text: '— compare new price vs current performance over 4 weeks.' },
        ],
        questions: [
          'How does elasticity vary across channels (pharma vs retail)?',
          'What is the optimal price for the South Region considering local competition?',
          'Is there a bundling opportunity with other products in the line?',
        ],
      },
      comercial: {
        label: 'Commercial',
        question: 'Where should I focus commercial efforts this month?',
        title: 'Commercial Prioritization — February 2026',
        analysis: 'Potential vs performance analysis identified 8 territories with significant revenue gaps. The top 3 priority territories concentrate 62% of the total gap ($178k), with high conversion probability based on historical response to similar commercial actions.',
        ranking: [
          { rank: 1, territory: 'Metro BH', gap: '$47k', score: 94, potential: '$240k' },
          { rank: 2, territory: 'Campinas', gap: '$40k', score: 89, potential: '$178k' },
          { rank: 3, territory: 'Curitiba', gap: '$33k', score: 85, potential: '$152k' },
          { rank: 4, territory: 'Porto Alegre', gap: '$29k', score: 78, potential: '$136k' },
        ],
        actions: [
          { bold: 'Allocate 2 additional reps', text: 'to Metro BH, focusing on the 15 POS with the largest individual gap.' },
          { bold: 'Incentive campaign', text: 'for Campinas with scaled bonus by growth tier.' },
          { bold: 'Executive visit', text: 'to the top 5 clients in Curitiba to renegotiate mix and share of shelf.' },
        ],
        questions: [
          'What is the historical ROI of commercial actions in each territory?',
          'Which products present the best cross-sell opportunity?',
          'How is rep performance vs individual quota?',
        ],
      },
      mix: {
        label: 'Mix',
        question: 'What is the ideal mix for the South region?',
        title: 'Mix Optimization — South Region',
        analysis: 'Analysis of current vs recommended mix for the South Region reveals misalignment in 3 key categories. The current mix over-indexes analgesics (38% vs recommended 29%) and under-indexes antihypertensives (12% vs recommended 19%). The projected adjustment would impact +$62k/month in regional contribution margin.',
        comparison: [
          { category: 'Analgesics', current: '38%', recommended: '29%', direction: 'down' as const },
          { category: 'Anti-inflammatories', current: '22%', recommended: '24%', direction: 'up' as const },
          { category: 'Antihypertensives', current: '12%', recommended: '19%', direction: 'up' as const },
          { category: 'Antibiotics', current: '15%', recommended: '16%', direction: 'stable' as const },
          { category: 'Others', current: '13%', recommended: '12%', direction: 'stable' as const },
        ],
        actions: [
          { bold: 'Reduce analgesic exposure', text: 'by 9pp, redistributing shelf space to antihypertensives.' },
          { bold: 'Increase commercial push', text: 'for antihypertensives with a targeted medical campaign.' },
          { bold: 'Review assortment', text: 'across 120 POS in the region to align with the recommended mix within 60 days.' },
        ],
        questions: [
          'What is the recommended mix impact on per-POS profitability?',
          'How does the ideal mix vary between metro and rural areas?',
          'Which specific SKUs should be prioritized in antihypertensives?',
        ],
      },
      pdv: {
        label: 'Behavior',
        question: 'What is the purchase and repurchase behavior of Losartan Potassium 50mg in the Paraíba Valley region?',
        title: 'Purchase & Repurchase Behavior — Losartan Potassium 50mg (Paraíba Valley)',
        analysis: 'POS behavior analysis in the Paraíba Valley region reveals that Losartan Potassium 50mg shows an increasing repurchase rate over the past 6 months, rising from 62% in September to 78% in February. The average repurchase cycle is 28 days, aligned with standard dosing. Pharmacies with loyalty programs show a repurchase rate 15pp above the regional average, indicating a strong correlation between retention actions and recurrence.',
        barChartData: [
          { month: 'Sep', compra: 4200, recompra: 2600 },
          { month: 'Oct', compra: 4500, recompra: 2950 },
          { month: 'Nov', compra: 4800, recompra: 3400 },
          { month: 'Dec', compra: 5100, recompra: 3750 },
          { month: 'Jan', compra: 5400, recompra: 4100 },
          { month: 'Feb', compra: 5700, recompra: 4450 },
        ],
        barChartNote: 'The repurchase rate grew 18pp over the period, suggesting increased treatment adherence and effectiveness of loyalty actions at regional POS.',
        actions: [
          { bold: 'Expand loyalty program', text: 'to the 40 POS with the lowest repurchase rate in the region, replicating the top performers model.' },
          { bold: 'Create automatic replenishment alerts', text: 'for patients with repurchase cycles > 35 days, reducing treatment abandonment.' },
          { bold: 'Adherence campaign', text: 'with regional prescribers, reinforcing the importance of treatment continuity.' },
        ],
        questions: [
          'What is the repurchase rate by pharmacy chain in the region?',
          'How does pricing impact the Losartan repurchase cycle?',
          'Which POS show the highest risk of losing patients to competing generics?',
        ],
      },
    },
  },
};

// ─── Sub-components (light theme) ────────────────────────────────

const SupplyTable = ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
  <div className="overflow-x-auto my-4">
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="border-b border-gray-200">
          {data.headers.map((h, i) => (
            <th key={i} className="text-left py-2 px-3 text-gray-500 font-medium text-xs uppercase tracking-wider">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, ri) => {
          const prob = parseInt(row[2]);
          const probColor = prob >= 80 ? 'text-red-500' : prob >= 60 ? 'text-amber-500' : 'text-green-500';
          return (
            <tr key={ri} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="py-2.5 px-3 text-gray-600 font-mono text-xs">{row[0]}</td>
              <td className="py-2.5 px-3 text-gray-800">{row[1]}</td>
              <td className={`py-2.5 px-3 font-bold ${probColor}`}>{row[2]}</td>
              <td className="py-2.5 px-3 text-gray-500">{row[3]}</td>
              <td className="py-2.5 px-3 text-orange-500 font-medium">{row[4]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

const ForecastChart = ({ data, note, lang }: { data: { month: string; seasonality: number; trend: number }[]; note: string; lang: string }) => (
  <div className="my-4">
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
          <XAxis dataKey="month" stroke="rgba(0,0,0,0.4)" tick={{ fontSize: 12, fill: '#6b7280' }} />
          <YAxis stroke="rgba(0,0,0,0.4)" tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
            labelStyle={{ color: '#6b7280' }}
          />
          <Legend wrapperStyle={{ color: '#6b7280', fontSize: '12px' }} />
          <Line type="monotone" dataKey="seasonality" name={lang === 'pt' ? 'Sazonalidade' : 'Seasonality'} stroke="#f97316" strokeWidth={2.5} dot={{ r: 4, fill: '#f97316' }} />
          <Line type="monotone" dataKey="trend" name={lang === 'pt' ? 'Tendência' : 'Trend'} stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4, fill: '#3b82f6' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <p className="text-gray-400 text-xs mt-3 leading-relaxed">{note}</p>
  </div>
);

const PricingMetrics = ({ metrics }: { metrics: { label: string; value: string; sub: string }[] }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
    {metrics.map((m, i) => (
      <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
        <p className="text-gray-400 text-xs">{m.label}</p>
        <p className="text-gray-900 text-xl font-bold mt-1">{m.value}</p>
        <p className="text-orange-500 text-xs mt-0.5">{m.sub}</p>
      </div>
    ))}
  </div>
);

const ComercialRanking = ({ ranking }: { ranking: { rank: number; territory: string; gap: string; score: number; potential: string }[] }) => (
  <div className="space-y-2 my-4">
    {ranking.map((r) => (
      <div key={r.rank} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
        <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center font-bold text-sm flex-shrink-0">
          {r.rank}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-gray-800 font-medium text-sm">{r.territory}</p>
          <p className="text-gray-400 text-xs">Gap: {r.gap} · Potential: {r.potential}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 rounded-full" style={{ width: `${r.score}%` }} />
          </div>
          <p className="text-gray-400 text-[10px] mt-0.5">{r.score}/100</p>
        </div>
      </div>
    ))}
  </div>
);

const MixComparison = ({ comparison }: { comparison: { category: string; current: string; recommended: string; direction: 'up' | 'down' | 'stable' }[] }) => (
  <div className="overflow-x-auto my-4">
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="border-b border-gray-200">
          <th className="text-left py-2 px-3 text-gray-500 font-medium text-xs uppercase tracking-wider">Categoria</th>
          <th className="text-center py-2 px-3 text-gray-500 font-medium text-xs uppercase tracking-wider">Atual</th>
          <th className="text-center py-2 px-3 text-gray-500 font-medium text-xs uppercase tracking-wider">Recomendado</th>
          <th className="text-center py-2 px-3 text-gray-500 font-medium text-xs uppercase tracking-wider">Direção</th>
        </tr>
      </thead>
      <tbody>
        {comparison.map((c, i) => (
          <tr key={i} className="border-b border-gray-100">
            <td className="py-2.5 px-3 text-gray-800">{c.category}</td>
            <td className="py-2.5 px-3 text-center text-gray-500">{c.current}</td>
            <td className="py-2.5 px-3 text-center text-orange-500 font-medium">{c.recommended}</td>
            <td className="py-2.5 px-3 text-center">
              {c.direction === 'up' && <span className="text-green-500">▲</span>}
              {c.direction === 'down' && <span className="text-red-500">▼</span>}
              {c.direction === 'stable' && <span className="text-gray-300">●</span>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const PdvBarChart = ({ data, note, lang }: { data: { month: string; compra: number; recompra: number }[]; note: string; lang: string }) => (
  <div className="my-4">
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
          <XAxis dataKey="month" stroke="rgba(0,0,0,0.4)" tick={{ fontSize: 12, fill: '#6b7280' }} />
          <YAxis stroke="rgba(0,0,0,0.4)" tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
            labelStyle={{ color: '#6b7280' }}
          />
          <Legend wrapperStyle={{ color: '#6b7280', fontSize: '12px' }} />
          <Bar dataKey="compra" name={lang === 'pt' ? 'Compra' : 'Purchase'} fill="#f97316" radius={[4, 4, 0, 0]} />
          <Bar dataKey="recompra" name={lang === 'pt' ? 'Recompra' : 'Repurchase'} fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <p className="text-gray-400 text-xs mt-3 leading-relaxed">{note}</p>
  </div>
);

// ─── Sidebar menu items ──────────────────────────────────────────

const sidebarMenuItems = [
  { icon: Home, labelIndex: 0, active: false },
  { icon: Upload, labelIndex: 1, active: false },
  { icon: Target, labelIndex: 2, active: false },
  { icon: Database, labelIndex: 3, active: false },
  { icon: Brain, labelIndex: 4, active: true },
  { icon: LayoutGrid, labelIndex: 5, active: false },
];

// Wizard icons for favorites bar
const wizardIcons = [Sparkles, TrendingUp, Shuffle, Repeat, Layers, Zap, Target];

// ─── Main component ──────────────────────────────────────────────

const I6SignalDemo = memo(() => {
  const { language } = useLanguage();
  const lang = language as 'pt' | 'en';
  const t = content[lang];

  const [activeScenario, setActiveScenario] = useState<Scenario>('supply');
  const [phase, setPhase] = useState<Phase>('idle');
  const [typedText, setTypedText] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isFillingInput, setIsFillingInput] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState('');
  const [pendingScenario, setPendingScenario] = useState<Scenario | null>(null);
  const [isSendAnimating, setIsSendAnimating] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const scenario = t.scenarios[activeScenario];

  const startAnimation = useCallback((sc: Scenario) => {
    setActiveScenario(sc);
    setPhase('typing');
    setTypedText(t.scenarios[sc].question);
    setShowResponse(false);
    setInputText('');
  }, [t.scenarios]);

  // Typing phase - wait then show response
  useEffect(() => {
    if (phase !== 'typing') return;
    const timer = setTimeout(() => {
      setPhase('responding');
      setShowResponse(true);
    }, RESPONSE_DELAY);
    return () => clearTimeout(timer);
  }, [phase]);

  // Auto-scroll to bottom and show scroll hint
  useEffect(() => {
    if (showResponse && chatRef.current) {
      setTimeout(() => {
        chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
        // Show scroll hint after auto-scroll completes
        setTimeout(() => {
          if (chatRef.current && chatRef.current.scrollTop > 50) {
            setShowScrollHint(true);
          }
        }, 500);
      }, 100);
    } else {
      setShowScrollHint(false);
    }
  }, [showResponse]);

  // Hide scroll hint when user scrolls up
  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    const handleScroll = () => {
      const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 30;
      if (!isAtBottom) setShowScrollHint(false);
    };
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  // Input filling effect (typing into input field)
  useEffect(() => {
    if (!isFillingInput || !pendingQuestion) return;
    if (inputText.length < pendingQuestion.length) {
      const timer = setTimeout(() => {
        setInputText(pendingQuestion.slice(0, inputText.length + 1));
      }, TYPING_SPEED);
      return () => clearTimeout(timer);
    } else {
      // Typing complete — animate Send button, then trigger chat
      const timer = setTimeout(() => {
        setIsSendAnimating(true);
        setTimeout(() => {
          setIsSendAnimating(false);
          setIsFillingInput(false);
          setPendingQuestion('');
          if (pendingScenario) {
            startAnimation(pendingScenario);
            setPendingScenario(null);
          }
        }, 400);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isFillingInput, inputText, pendingQuestion, pendingScenario, startAnimation]);

  // Auto-start on mount
  useEffect(() => {
    const timer = setTimeout(() => startAnimation('supply'), 800);
    return () => clearTimeout(timer);
  }, [startAnimation]);

  const handleScenarioClick = (sc: Scenario) => {
    if (sc === activeScenario && phase === 'responding') return;
    // Clear current chat
    setPhase('idle');
    setShowResponse(false);
    setTypedText('');
    // Start filling input with scenario question
    setInputText('');
    setPendingQuestion(t.scenarios[sc].question);
    setPendingScenario(sc);
    setIsFillingInput(true);
  };

  const handleSuggestedQuestionClick = (questionText: string) => {
    // Find which scenario this question belongs to
    const scenarios = Object.keys(t.scenarios) as Scenario[];
    let targetScenario: Scenario = activeScenario;
    for (const sc of scenarios) {
      if (t.scenarios[sc].questions.includes(questionText)) {
        // Use current scenario's question text for the chat, but we need to find matching scenario
        // Actually the suggested questions are follow-ups, so we keep current scenario context
        // We'll just type the question into input and replay current scenario
        targetScenario = sc;
        break;
      }
    }
    // Clear current chat
    setPhase('idle');
    setShowResponse(false);
    setTypedText('');
    // Start filling input
    setInputText('');
    setPendingQuestion(questionText);
    setPendingScenario(targetScenario);
    setIsFillingInput(true);
  };

  return (
    <section className="py-6 md:py-10 px-4 relative z-[10]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{t.sectionTitle}</h2>
        </div>

        {/* Subtitle + Scenario selector inline */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <p className="text-white/40 text-sm whitespace-nowrap hidden md:block">{t.sectionSubtitle}</p>
          <div className="hidden md:block w-px h-5 bg-white/15 flex-shrink-0"></div>
          <div className="flex flex-wrap justify-center md:justify-end gap-2">
            {(Object.keys(t.scenarios) as Scenario[]).map((sc) => (
              <button
                key={sc}
                onClick={() => handleScenarioClick(sc)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeScenario === sc
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/10'
                }`}
              >
                {t.scenarios[sc].label}
              </button>
            ))}
          </div>
        </div>

        {/* Demo Container */}
        <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
          {/* ── Intelliboard Header ── */}
          <div className="flex items-center justify-between px-4 md:px-6 py-3" style={{ background: 'linear-gradient(135deg, #0F1F36, #1E4A94, #0F1F36)' }}>
            <div className="flex items-center gap-2">
              <span className="text-orange-400 font-bold text-xl">i6</span>
              <span className="text-white font-bold text-lg tracking-tight">Intelliboard</span>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <p className="text-orange-400 text-[10px] font-semibold uppercase tracking-wide">GRUPO ALPHATEK S.A.</p>
                <p className="text-white text-xs font-medium">Leonardo Chaves</p>
                <p className="text-white/50 text-[10px]">leonardo.chaves@infinity6.ai</p>
              </div>
              <img src={avatarRicardo} alt="Leonardo Chaves" className="h-9 w-9 rounded-full ring-2 ring-white/40 object-cover" />
            </div>
          </div>

          {/* ── Main body ── */}
          <div className="flex h-[450px] md:h-[500px]">
            {/* Sidebar — light theme, hidden on mobile */}
            <div className="hidden md:flex flex-col w-52 bg-white border-r border-gray-200 flex-shrink-0">
              {/* Angle dropdown */}
              <div className="px-3 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-orange-50/60 border-l-2 border-orange-500">
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 text-xs font-semibold uppercase tracking-wide">ÂNGULO</p>
                    <p className="text-gray-500 text-[10px]">Forecast</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </div>
              </div>

              {/* Menu items */}
              <nav className="flex-1 py-2 px-2 space-y-0.5 overflow-y-auto">
                {sidebarMenuItems.map((item) => {
                  const label = t.sidebar[item.labelIndex];
                  return (
                    <div
                      key={label}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors cursor-default ${
                        item.active
                          ? 'bg-gradient-to-r from-orange-50 to-blue-50 text-orange-600 font-semibold border-l-2 border-orange-500'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{label}</span>
                    </div>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="border-t border-gray-100 px-2 py-2 space-y-0.5">
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-gray-500 hover:bg-gray-50 cursor-default">
                  <BarChart3 className="w-4 h-4" />
                  <span className="truncate">Billing Analytics</span>
                </div>
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-gray-500 hover:bg-gray-50 cursor-default">
                  <BarChart3 className="w-4 h-4" />
                  <span>Analytics</span>
                </div>
                <div className="flex items-center justify-between px-3 py-2">
                  <Settings className="w-4 h-4 text-gray-400" />
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <ChevronRight className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              </div>
            </div>

            {/* Favorites bar — hidden on mobile */}
            <div className="hidden md:flex flex-col w-10 bg-white/95 backdrop-blur-sm border-r border-gray-200/50 flex-shrink-0 items-center py-3 gap-1.5">
              {/* Wizard icons */}
              {wizardIcons.map((WizIcon, i) => (
                <button
                  key={i}
                  className="h-7 w-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                >
                  <WizIcon className="h-3.5 w-3.5" />
                </button>
              ))}
              {/* Separator */}
              <div className="w-5 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-1" />
              {/* Heart favorites */}
              {[0, 1, 2, 3, 4].map((i) => (
                <button key={`heart-${i}`} className="h-6 w-6 rounded-full flex items-center justify-center text-orange-300 hover:text-orange-500 transition-colors">
                  <Heart className="h-3.5 w-3.5 fill-current" />
                </button>
              ))}
            </div>

            {/* Main Chat Area — white background */}
            <div className="flex-1 flex flex-col min-w-0 bg-white relative">
              {/* Scroll up indicator */}
              {showScrollHint && (
                <div 
                  className="absolute top-3 right-4 z-20 cursor-pointer animate-scroll-hint-pulse"
                  onClick={() => chatRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <div className="flex items-center gap-2 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-400 rounded-xl px-4 py-2.5 shadow-lg shadow-orange-200/50">
                    <ChevronUp className="w-5 h-5 text-orange-500 animate-bounce" style={{ animationDuration: '0.8s' }} />
                    <span className="text-orange-600 text-sm font-bold tracking-wide">
                      {lang === 'pt' ? 'Navegue pelo conteúdo' : 'Scroll through content'}
                    </span>
                  </div>
                </div>
              )}
              {/* Chat content */}
              <div ref={chatRef} className="flex-1 overflow-y-auto px-4 md:px-8 lg:px-16 pt-6 pb-6">
                <div className="max-w-4xl mx-auto space-y-4">
                  {/* Empty state or user message */}
                  {phase === 'idle' && (
                    <div className="flex items-center justify-center pt-20 pb-10">
                      <p className="text-xl text-gray-300 font-light tracking-wide">{t.emptyState}</p>
                    </div>
                  )}

                  {/* User message */}
                  {(phase === 'typing' || phase === 'responding') && (
                    <div className="flex justify-end animate-fade-in">
                      <div className="bg-gradient-to-br from-orange-50/80 to-blue-50/60 border border-gray-200/50 rounded-2xl px-4 py-2.5 max-w-[85%] shadow-sm">
                        <p className="text-gray-800 text-sm">{typedText}</p>
                      </div>
                    </div>
                  )}

                  {/* Loading dots */}
                  {phase === 'typing' && typedText === t.scenarios[activeScenario].question && (
                    <div className="flex gap-1.5 px-2 py-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  )}

                  {/* AI Response */}
                  {showResponse && (
                    <div className="animate-fade-in">
                      <div className="max-w-full">
                        {/* Title */}
                        <h3 className="text-gray-900 font-bold text-base md:text-lg mb-3">{scenario.title}</h3>

                        {/* Executive Analysis */}
                        <h4 className="text-orange-500 font-semibold text-sm mb-1.5">{t.executiveAnalysis}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">{scenario.analysis}</p>

                        {/* Visualization */}
                        {activeScenario === 'supply' && 'table' in scenario && (
                          <SupplyTable data={(scenario as typeof t.scenarios.supply).table} />
                        )}
                        {activeScenario === 'forecast' && 'chartData' in scenario && (
                          <ForecastChart
                            data={(scenario as typeof t.scenarios.forecast).chartData}
                            note={(scenario as typeof t.scenarios.forecast).chartNote}
                            lang={lang}
                          />
                        )}
                        {activeScenario === 'pricing' && 'metrics' in scenario && (
                          <PricingMetrics metrics={(scenario as typeof t.scenarios.pricing).metrics} />
                        )}
                        {activeScenario === 'comercial' && 'ranking' in scenario && (
                          <ComercialRanking ranking={(scenario as typeof t.scenarios.comercial).ranking} />
                        )}
                        {activeScenario === 'mix' && 'comparison' in scenario && (
                          <MixComparison comparison={(scenario as typeof t.scenarios.mix).comparison} />
                        )}
                        {activeScenario === 'pdv' && 'barChartData' in scenario && (
                          <PdvBarChart
                            data={(scenario as typeof t.scenarios.pdv).barChartData}
                            note={(scenario as typeof t.scenarios.pdv).barChartNote}
                            lang={lang}
                          />
                        )}

                        {/* Recommended Actions */}
                        <h4 className="text-orange-500 font-semibold text-sm mt-4 mb-2">{t.recommendedActions}</h4>
                        <ol className="space-y-1.5 text-sm">
                          {scenario.actions.map((a, i) => (
                            <li key={i} className="text-gray-600 flex gap-2">
                              <span className="text-orange-500 font-bold flex-shrink-0">{i + 1}.</span>
                              <span><strong className="text-gray-800">{a.bold}</strong> {a.text}</span>
                            </li>
                          ))}
                        </ol>

                        {/* Suggested Questions — inline */}
                        <div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-orange-50/80 to-amber-50/80 border border-orange-200/30">
                          <div className="flex items-center gap-2 mb-1.5">
                            <Lightbulb className="w-3.5 h-3.5 text-orange-500" />
                            <span className="text-xs font-medium text-orange-800">{t.suggestedQuestions}</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {scenario.questions.slice(0, 3).map((q, i) => (
                              <span
                                key={i}
                                className="text-[11px] text-gray-500 px-2.5 py-1 rounded-lg text-left"
                              >
                                {q}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Scenario tabs + Input bar */}
              <div className="border-t border-gray-200/50 bg-white/95 backdrop-blur-sm p-3 md:p-4 md:pl-14">
                {/* Input row */}
                <div className="flex items-center gap-2">
                  <button className="h-10 w-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors flex-shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </button>
                  <button className="h-10 w-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors flex-shrink-0">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <input
                    type="text"
                    readOnly
                    value={inputText}
                    placeholder={t.placeholder}
                    className="flex-1 h-12 rounded-full border border-gray-200 bg-white px-5 text-sm text-gray-700 placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
                  />
                  <button className={`h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-md hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center flex-shrink-0 ${isSendAnimating ? 'scale-125 ring-4 ring-orange-400/40 shadow-orange-500/50 shadow-xl' : ''}`}>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

I6SignalDemo.displayName = 'I6SignalDemo';

export default I6SignalDemo;
