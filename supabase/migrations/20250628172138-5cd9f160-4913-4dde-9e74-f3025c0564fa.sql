
-- Create table for success stories cards
CREATE TABLE public.cms_success_stories_cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID NOT NULL,
  card_order INTEGER NOT NULL,
  language VARCHAR(10) NOT NULL DEFAULT 'en',
  
  -- Basic card information
  industry VARCHAR(255) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  
  -- Metrics (3 metrics per card)
  metric1_value VARCHAR(50) NOT NULL,
  metric1_label VARCHAR(100) NOT NULL,
  metric2_value VARCHAR(50) NOT NULL,
  metric2_label VARCHAR(100) NOT NULL,
  metric3_value VARCHAR(50) NOT NULL,
  metric3_label VARCHAR(100) NOT NULL,
  
  -- Customer quote
  customer_quote TEXT NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_title VARCHAR(255) NOT NULL,
  
  -- Image
  image_url TEXT NOT NULL,
  
  -- Status and metadata
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Constraints
  UNIQUE(page_id, card_order, language)
);

-- Create indexes for better performance
CREATE INDEX idx_cms_success_stories_cards_page_language ON public.cms_success_stories_cards(page_id, language);
CREATE INDEX idx_cms_success_stories_cards_order ON public.cms_success_stories_cards(card_order);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_cms_success_stories_cards_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_cms_success_stories_cards_updated_at
  BEFORE UPDATE ON public.cms_success_stories_cards
  FOR EACH ROW
  EXECUTE FUNCTION public.update_cms_success_stories_cards_updated_at();

-- Insert sample data for success-stories page (both languages)
INSERT INTO public.cms_success_stories_cards (
  page_id, card_order, language, industry, company_name, challenge, solution,
  metric1_value, metric1_label, metric2_value, metric2_label, metric3_value, metric3_label,
  customer_quote, customer_name, customer_title, image_url
) 
SELECT 
  p.id as page_id,
  1 as card_order,
  'en' as language,
  'Manufacturing' as industry,
  'TechCorp Industries' as company_name,
  'Reducing production downtime and optimizing efficiency' as challenge,
  'AI-powered predictive maintenance and quality control' as solution,
  '75%' as metric1_value,
  'Downtime Reduction' as metric1_label,
  '$2.3M' as metric2_value,
  'Cost Savings' as metric2_label,
  '40%' as metric3_value,
  'Efficiency Increase' as metric3_label,
  'Infinity6''s AI solutions transformed our manufacturing process. We''ve seen unprecedented efficiency gains and cost reductions.' as customer_quote,
  'Sarah Johnson' as customer_name,
  'CTO' as customer_title,
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop' as image_url
FROM cms_pages p WHERE p.slug = 'success-stories'

UNION ALL

SELECT 
  p.id as page_id,
  2 as card_order,
  'en' as language,
  'Finance' as industry,
  'FinanceFlow Corp' as company_name,
  'Detecting fraudulent transactions while reducing false positives' as challenge,
  'Machine learning algorithms for real-time fraud detection' as solution,
  '99.2%' as metric1_value,
  'Fraud Detection' as metric1_label,
  '-85%' as metric2_value,
  'False Positives' as metric2_label,
  '10x' as metric3_value,
  'Processing Speed' as metric3_label,
  'The AI fraud detection system has revolutionized our security operations. We can now catch fraud attempts in real-time.' as customer_quote,
  'Michael Chen' as customer_name,
  'Head of Security' as customer_title,
  'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop' as image_url
FROM cms_pages p WHERE p.slug = 'success-stories'

UNION ALL

SELECT 
  p.id as page_id,
  3 as card_order,
  'en' as language,
  'Retail' as industry,
  'RetailMax Solutions' as company_name,
  'Optimizing inventory management and customer experience' as challenge,
  'AI-driven demand forecasting and personalized recommendations' as solution,
  '45%' as metric1_value,
  'Revenue Growth' as metric1_label,
  '+60%' as metric2_value,
  'Customer Retention' as metric2_label,
  '3x' as metric3_value,
  'Inventory Turnover' as metric3_label,
  'Our customer satisfaction and sales have skyrocketed since implementing the AI recommendation system.' as customer_quote,
  'Lisa Rodriguez' as customer_name,
  'VP of Operations' as customer_title,
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop' as image_url
FROM cms_pages p WHERE p.slug = 'success-stories';

-- Insert Portuguese versions
INSERT INTO public.cms_success_stories_cards (
  page_id, card_order, language, industry, company_name, challenge, solution,
  metric1_value, metric1_label, metric2_value, metric2_label, metric3_value, metric3_label,
  customer_quote, customer_name, customer_title, image_url
) 
SELECT 
  p.id as page_id,
  1 as card_order,
  'pt' as language,
  'Manufatura' as industry,
  'TechCorp Industries' as company_name,
  'Reduzir o tempo de inatividade da produção e otimizar a eficiência' as challenge,
  'Manutenção preditiva e controle de qualidade com IA' as solution,
  '75%' as metric1_value,
  'Redução de Inatividade' as metric1_label,
  'R$ 12M' as metric2_value,
  'Economia de Custos' as metric2_label,
  '40%' as metric3_value,
  'Aumento de Eficiência' as metric3_label,
  'As soluções de IA da Infinity6 transformaram nosso processo de manufatura. Vimos ganhos de eficiência e reduções de custos sem precedentes.' as customer_quote,
  'Sarah Johnson' as customer_name,
  'CTO' as customer_title,
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop' as image_url
FROM cms_pages p WHERE p.slug = 'success-stories'

UNION ALL

SELECT 
  p.id as page_id,
  2 as card_order,
  'pt' as language,
  'Finanças' as industry,
  'FinanceFlow Corp' as company_name,
  'Detectar transações fraudulentas reduzindo falsos positivos' as challenge,
  'Algoritmos de machine learning para detecção de fraude em tempo real' as solution,
  '99,2%' as metric1_value,
  'Detecção de Fraude' as metric1_label,
  '-85%' as metric2_value,
  'Falsos Positivos' as metric2_label,
  '10x' as metric3_value,
  'Velocidade de Processamento' as metric3_label,
  'O sistema de detecção de fraude com IA revolucionou nossas operações de segurança. Agora conseguimos detectar tentativas de fraude em tempo real.' as customer_quote,
  'Michael Chen' as customer_name,
  'Chefe de Segurança' as customer_title,
  'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop' as image_url
FROM cms_pages p WHERE p.slug = 'success-stories'

UNION ALL

SELECT 
  p.id as page_id,
  3 as card_order,
  'pt' as language,
  'Varejo' as industry,
  'RetailMax Solutions' as company_name,
  'Otimizar gestão de estoque e experiência do cliente' as challenge,
  'Previsão de demanda e recomendações personalizadas com IA' as solution,
  '45%' as metric1_value,
  'Crescimento da Receita' as metric1_label,
  '+60%' as metric2_value,
  'Retenção de Clientes' as metric2_label,
  '3x' as metric3_value,
  'Giro de Estoque' as metric3_label,
  'Nossa satisfação do cliente e vendas dispararam desde a implementação do sistema de recomendação com IA.' as customer_quote,
  'Lisa Rodriguez' as customer_name,
  'VP de Operações' as customer_title,
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop' as image_url
FROM cms_pages p WHERE p.slug = 'success-stories';
