#!/usr/bin/env node
/**
 * Prerender per-route SEO stubs into dist/.
 *
 * Why: GitHub Pages serves a single static index.html for every route.
 * Without per-route metadata, Googlebot sees identical <title>/description
 * across all URLs and classifies them as soft 404 (and duplicates).
 *
 * This script reads dist/index.html, then for each known route writes a
 * derived file with unique <title>, <meta description>, canonical, hreflang,
 * og:*, an <h1>+<p> baked into <body>, and JSON-LD when applicable.
 * The React app still hydrates normally on top of it.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const BASE_URL = 'https://infinity6.ai';
const DIST = resolve('dist');
const PUBLIC_CONTENT = resolve('public/content');
const INTELLIGENCE_DIR = resolve('src/content/intelligence');
const LANDINGS_DIR = resolve('src/content/landings');
const OG_IMAGE = `${BASE_URL}/lovable-uploads/0fce52e4-a161-4d37-b3e4-f23f093b9b75.png`;

// ---- Static page SEO (mirrors src/data/staticData/seoData.ts) ----
const seo = {
  home: {
    pt: { title: 'infinity6 – Inteligência Preditiva para Empresas', description: 'Transformamos dados em decisões que antecipam o mercado. IA preditiva para aumentar receita, proteger margem e acelerar crescimento.' },
    en: { title: 'infinity6 – Predictive Intelligence for Business', description: 'We turn data into decisions that anticipate the market. Predictive AI to grow revenue, protect margins and accelerate growth.' },
  },
  solutions: {
    pt: { title: 'Soluções de IA Preditiva | infinity6', description: 'Recomendação em tempo real, preço dinâmico, forecasting adaptativo. Soluções de IA que aumentam ticket médio, reduzem churn e otimizam margem.' },
    en: { title: 'Predictive AI Solutions | infinity6', description: 'Real-time recommendations, dynamic pricing, adaptive forecasting. AI solutions that increase average ticket, reduce churn and optimize margins.' },
  },
  'success-stories': {
    pt: { title: 'Cases de Sucesso com IA | infinity6', description: 'Veja como empresas aumentaram receita, protegeram margem e reduziram rupturas com inteligência preditiva da infinity6.' },
    en: { title: 'AI Success Stories | infinity6', description: 'See how companies grew revenue, protected margins and reduced stockouts with infinity6 predictive intelligence.' },
  },
  contact: {
    pt: { title: 'Fale Conosco | infinity6', description: 'Agende uma conversa estratégica. Colocamos IA preditiva em produção em 4-12 semanas com impacto financeiro mensurável.' },
    en: { title: 'Contact Us | infinity6', description: 'Schedule a strategic conversation. We deploy predictive AI into production in 4-12 weeks with measurable financial impact.' },
  },
  'privacy-policy': {
    pt: { title: 'Política de Privacidade | infinity6', description: 'Saiba como a infinity6 protege e gerencia seus dados pessoais com transparência e segurança.' },
    en: { title: 'Privacy Policy | infinity6', description: 'Learn how infinity6 protects and manages your personal data with transparency and security.' },
  },
  'ethics-policy': {
    pt: { title: 'Política de Ética em IA | infinity6', description: 'Nosso compromisso com IA ética, transparente e responsável em todas as soluções.' },
    en: { title: 'AI Ethics Policy | infinity6', description: 'Our commitment to ethical, transparent and responsible AI across all solutions.' },
  },
  insights: {
    pt: { title: 'Insights de IA Preditiva | infinity6', description: 'Artigos e análises sobre previsão de demanda, forecast de vendas, pricing dinâmico e crescimento de receita com IA.' },
    en: { title: 'Predictive AI Insights | infinity6', description: 'Articles and analysis on demand forecasting, dynamic pricing, recommendation engines and revenue growth with AI.' },
  },
  'i6-intelligence': {
    pt: { title: 'i6 Intelligence | infinity6', description: 'Inteligência aplicada para decisões de demanda, margem, estoque, mix e propensão para os setores de varejo, indústria, financeiro e farma.' },
    en: { title: 'i6 Intelligence | infinity6', description: 'Applied intelligence for decisions on demand, margin, inventory, mix and propensity across retail, industry, financial services and pharma.' },
  },
  'our-ai': {
    pt: { title: 'Proprietary AI — Motores de IA da infinity6', description: 'Conheça os motores proprietários da infinity6: i6 RecSys, i6 Previsio, i6 ElasticPrice e i6 Signal. IA aplicada que aprende comportamento, antecipa decisão e prescreve ação.' },
    en: { title: 'Proprietary AI — infinity6 AI Engines', description: 'Meet infinity6 proprietary engines: i6 RecSys, i6 Previsio, i6 ElasticPrice and i6 Signal. Applied AI that learns behavior, anticipates decisions and prescribes action.' },
  },
};

// ---- Parse success stories markdown (mirrors useSuccessStoriesMarkdown.ts) ----
function parseStories(content) {
  const stories = [];
  const sections = content.split('---').map((s) => s.trim()).filter(Boolean);
  for (const section of sections) {
    const lines = section.split('\n').map((l) => l.trim()).filter(Boolean);
    const story = {};
    for (const line of lines) {
      if (line.startsWith('## ')) story.title = line.substring(3).trim();
      else if (line.startsWith('**Slug:**')) story.slug = line.substring(9).trim();
      else if (line.startsWith('**Image:**')) story.image = line.substring(10).trim();
      else if (line.startsWith('**Segment:**')) story.segment = line.substring(12).trim();
      else if (line.startsWith('**Client:**')) story.client = line.substring(11).trim();
      else if (line.startsWith('**Description:**')) story.description = line.substring(16).trim();
      else if (line.startsWith('**Challenge:**')) story.challenge = line.substring(14).trim();
      else if (line.startsWith('**Quote:**')) story.quote = line.substring(10).trim();
    }
    if (story.title && story.slug) stories.push(story);
  }
  return stories;
}

function loadStories(lang) {
  const file = join(PUBLIC_CONTENT, `page-success-stories-${lang}.md`);
  if (!existsSync(file)) return [];
  return parseStories(readFileSync(file, 'utf8'));
}

// ---- Minimal markdown → HTML for SEO injection ----
// Handles: H2/H3, **bold**, bullet lists, paragraphs. Strips YAML frontmatter.
function mdToHtml(md) {
  let src = md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
  const lines = src.split(/\r?\n/);
  const out = [];
  let para = [];
  let list = [];
  const flushPara = () => { if (para.length) { out.push(`<p>${para.join(' ')}</p>`); para = []; } };
  const flushList = () => { if (list.length) { out.push(`<ul>${list.map(i => `<li>${i}</li>`).join('')}</ul>`); list = []; } };
  const inline = (s) => s
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { flushPara(); flushList(); continue; }
    if (line.startsWith('## ')) { flushPara(); flushList(); out.push(`<h2>${inline(line.slice(3).trim())}</h2>`); continue; }
    if (line.startsWith('### ')) { flushPara(); flushList(); out.push(`<h3>${inline(line.slice(4).trim())}</h3>`); continue; }
    if (line.startsWith('- ')) { flushPara(); list.push(inline(line.slice(2).trim())); continue; }
    flushList(); para.push(inline(line));
  }
  flushPara(); flushList();
  return out.join('\n');
}

function loadSolutionsSeo(lang) {
  const file = join(PUBLIC_CONTENT, `solutions-seo-${lang}.md`);
  if (!existsSync(file)) return '';
  return mdToHtml(readFileSync(file, 'utf8'));
}


// ---- HTML transformation ----
const escapeHtml = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

function buildStub(template, { lang, path, title, description, h1, body, image, jsonLd }) {
  const canonical = `${BASE_URL}${path}`;
  const enUrl = `${BASE_URL}${path.replace(/^\/pt/, '/en')}`;
  const ptUrl = `${BASE_URL}${path.replace(/^\/en/, '/pt')}`;
  const ogImage = image
    ? (image.startsWith('http') ? image : `${BASE_URL}${image.split('?')[0]}`)
    : OG_IMAGE;

  let html = template;

  // <html lang>
  html = html.replace(/<html\s+lang="[^"]*"/i, `<html lang="${lang === 'pt' ? 'pt-BR' : 'en'}"`);

  // <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);

  // description
  html = html.replace(
    /<meta\s+name="description"[^>]*>/i,
    `<meta name="description" content="${escapeHtml(description)}" />`
  );

  // og:image / twitter:image (override fallback)
  html = html.replace(
    /<meta\s+property="og:image"[^>]*>/i,
    `<meta property="og:image" content="${ogImage}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:image"[^>]*>/i,
    `<meta name="twitter:image" content="${ogImage}" />`
  );

  // Inject per-route head tags right before </head>
  const headTags = [
    `<link rel="canonical" href="${canonical}" />`,
    `<link rel="alternate" hreflang="en" href="${enUrl}" />`,
    `<link rel="alternate" hreflang="pt-BR" href="${ptUrl}" />`,
    `<link rel="alternate" hreflang="x-default" href="${enUrl}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:type" content="${jsonLd ? 'article' : 'website'}" />`,
    `<meta property="og:locale" content="${lang === 'pt' ? 'pt_BR' : 'en_US'}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : '',
  ].filter(Boolean).join('\n    ');

  html = html.replace('</head>', `    ${headTags}\n  </head>`);

  // Inject crawler-visible content right after <div id="root"> (React will replace it on hydration).
  const crawlerBlock = `
      <div id="seo-prerender" style="position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;">
        <h1>${escapeHtml(h1 || title)}</h1>
        <p>${escapeHtml(description)}</p>
        ${body ? `<div>${body}</div>` : ''}
      </div>`;
  html = html.replace(
    /<div\s+id="root"[^>]*>\s*<\/div>/i,
    (m) => `${m.replace('</div>', crawlerBlock + '</div>')}`
  );
  // Fallback if self-closing
  if (!html.includes('id="seo-prerender"')) {
    html = html.replace(/<div\s+id="root"[^>]*\/>/i, `<div id="root">${crawlerBlock}</div>`);
  }

  return html;
}

function writeStub(routePath, html) {
  // routePath like "/pt/success-stories" or "/pt"
  const clean = routePath.replace(/^\//, '');
  let outPath;
  if (clean === 'en' || clean === 'pt') {
    outPath = join(DIST, clean, 'index.html');
  } else {
    outPath = join(DIST, `${clean}.html`);
  }
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html, 'utf8');
}

// ---- Main ----
const template = readFileSync(join(DIST, 'index.html'), 'utf8');
let count = 0;

// Static pages
const staticRoutes = ['', 'solutions', 'our-ai', 'success-stories', 'contact', 'privacy-policy', 'ethics-policy', 'insights', 'i6-intelligence'];

const PRODUCTS = [
  { name: 'i6Signal', anchor: 'i6signal', description: { pt: 'Camada conversacional preditiva sobre os motores i6Previsio, i6RecSys e i6ElasticPrice', en: 'Predictive conversational layer over the i6Previsio, i6RecSys and i6ElasticPrice engines' } },
  { name: 'i6Previsio', anchor: 'i6previsio', description: { pt: 'Motor proprietário de previsão de demanda com modelos adaptativos e demand sensing em tempo real', en: 'Proprietary demand forecasting engine with adaptive models and real-time demand sensing' } },
  { name: 'i6RecSys', anchor: 'i6recsys', description: { pt: 'Motor proprietário de recomendação, otimização de mix e score de propensão de compra para anônimos', en: 'Proprietary engine for recommendation, mix optimization and anonymous purchase propensity scoring' } },
  { name: 'i6ElasticPrice', anchor: 'i6elasticprice', description: { pt: 'Motor proprietário de elasticidade e precificação dinâmica por SKU, canal e ciclo de vida', en: 'Proprietary elasticity and dynamic pricing engine by SKU, channel and lifecycle' } },
];

for (const lang of ['en', 'pt']) {
  for (const route of staticRoutes) {
    const key = route === '' ? 'home' : route;
    const meta = seo[key]?.[lang];
    if (!meta) continue;
    const path = route === '' ? `/${lang}` : `/${lang}/${route}`;
    let body = '';
    let jsonLd;
    if (route === 'solutions') {
      body = loadSolutionsSeo(lang);
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: lang === 'pt' ? 'Produtos de IA preditiva da infinity6' : 'infinity6 predictive AI products',
        itemListElement: PRODUCTS.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Product',
            name: p.name,
            description: p.description[lang],
            brand: { '@type': 'Brand', name: 'infinity6' },
            category: 'AI software',
            url: `${BASE_URL}/${lang}/solutions#${p.anchor}`,
          },
        })),
      };
    }
    if (route === 'our-ai') {
      const ourAILead = lang === 'pt'
        ? 'A infinity6 opera quatro motores proprietários de IA aplicada: i6 RecSys (recomendação), i6 Previsio (previsão de demanda), i6 ElasticPrice (precificação dinâmica) e i6 Signal (camada conversacional preditiva). O modelo fundacional i6-RecSys-Base.g1 combina MAML, Active Learning e Topological Loss, com pré-treino em 1,45 bilhão de registros de bases públicas/adquiridas (15% bancário, 45% e-commerce, 20% telecom, 20% atacado/varejo).'
        : 'infinity6 operates four proprietary applied AI engines: i6 RecSys (recommendation), i6 Previsio (demand forecasting), i6 ElasticPrice (dynamic pricing) and i6 Signal (predictive conversational layer). The foundation model i6-RecSys-Base.g1 combines MAML, Active Learning and Topological Loss, pre-trained on 1.45 billion records from public/acquired sources (15% banking, 45% e-commerce, 20% telecom, 20% wholesale/retail).';

      // Glossary terms (mirror src/data/staticData/ourAIContent.ts)
      const glossary = lang === 'pt' ? [
        { slug: 'predicao-comportamental', term: 'Predição comportamental', def: 'Modelagem que aprende o comportamento real do cliente, canal ou produto a partir de dados transacionais para antecipar a próxima ação relevante.' },
        { slug: 'propensao-conversao', term: 'Propensão de conversão', def: 'Score preditivo da probabilidade de conclusão de compra em um contexto específico.' },
        { slug: 'elasticidade-dinamica', term: 'Elasticidade dinâmica', def: 'Sensibilidade de demanda a preço calculada continuamente por SKU, canal e ciclo de vida.' },
        { slug: 'aderencia-contextual', term: 'Aderência contextual', def: 'Grau em que uma recomendação combina histórico comportamental com o contexto atual.' },
        { slug: 'ruptura-gondola', term: 'Ruptura de gôndola', def: 'Indisponibilidade de SKU no PDV com demanda real. Custa 4%–12% do faturamento líquido no varejo farma.' },
        { slug: 'maml', term: 'MAML', def: 'Model-Agnostic Meta-Learning. Algoritmo (Finn, Abbeel & Levine) base do i6-RecSys-Base.g1.' },
        { slug: 'topological-loss', term: 'Topological Loss', def: 'Função de perda que preserva relações topológicas no espaço latente para melhorar generalização few-shot.' },
        { slug: 'active-learning', term: 'Active Learning', def: 'Estratégia em que o modelo seleciona ativamente amostras para rotular, acelerando aprendizado.' },
        { slug: 'i6-recsys-base-g1', term: 'i6-RecSys-Base.g1', def: 'Modelo fundacional proprietário da infinity6 (MAML + Active Learning + Topological Loss), 1,45 bilhão de registros.' },
        { slug: 'i6signal', term: 'i6 Signal', def: 'Camada conversacional preditiva sobre os motores i6 Previsio, i6 RecSys e i6 ElasticPrice.' },
      ] : [
        { slug: 'behavioral-prediction', term: 'Behavioral prediction', def: 'Modeling that learns real customer/channel/product behavior from transactional data to anticipate the next relevant action.' },
        { slug: 'conversion-propensity', term: 'Conversion propensity', def: 'Predictive score for the probability of completing a purchase in a specific context.' },
        { slug: 'dynamic-elasticity', term: 'Dynamic elasticity', def: 'Continuous price-sensitivity learning by SKU, channel and lifecycle.' },
        { slug: 'contextual-adherence', term: 'Contextual adherence', def: 'How well a recommendation combines behavioral history with current context.' },
        { slug: 'shelf-stockout', term: 'Shelf stockout', def: 'SKU unavailability at POS when real demand exists. Costs 4%–12% of net revenue in pharma retail.' },
        { slug: 'maml', term: 'MAML', def: 'Model-Agnostic Meta-Learning (Finn, Abbeel & Levine). Foundation of i6-RecSys-Base.g1.' },
        { slug: 'topological-loss', term: 'Topological Loss', def: 'Loss preserving topological relationships in the latent space for better few-shot generalization.' },
        { slug: 'active-learning', term: 'Active Learning', def: 'Strategy where the model selects which samples to label, accelerating learning.' },
        { slug: 'i6-recsys-base-g1', term: 'i6-RecSys-Base.g1', def: 'infinity6 proprietary foundation model (MAML + Active Learning + Topological Loss), 1.45B records.' },
        { slug: 'i6signal', term: 'i6 Signal', def: 'Predictive conversational layer over i6 Previsio, i6 RecSys and i6 ElasticPrice engines.' },
      ];

      // Real-results KPIs (mirror src/data/staticData/realResults.ts)
      const kpis = lang === 'pt' ? [
        { value: 'R$ 100M', label: 'em savings ao antecipar ruptura, overstocking e incineração', source: 'Varejo farma' },
        { value: '+23%', label: 'ticket médio por PDV', source: 'Varejo' },
        { value: '+36%', label: 'positivação de produtos', source: 'Varejo' },
        { value: '−57%', label: 'custo de CRM', source: 'Financeiro' },
        { value: '12x', label: 'mais conversão em campanhas', source: 'Financeiro' },
        { value: '+2,6%', label: 'mais vendas que a curadoria humana de looks', source: 'Fashion' },
      ] : [
        { value: 'R$ 100M', label: 'in savings by anticipating stockouts, overstocking and incineration', source: 'Pharma retail' },
        { value: '+23%', label: 'average ticket per POS', source: 'Retail' },
        { value: '+36%', label: 'product activation', source: 'Retail' },
        { value: '−57%', label: 'CRM cost', source: 'Financial services' },
        { value: '12x', label: 'more conversion in campaigns', source: 'Financial services' },
        { value: '+2.6%', label: 'more sales than human look curation', source: 'Fashion' },
      ];

      const glossaryHtml = `<h2 id="glossario">${lang === 'pt' ? 'Glossário GEO' : 'GEO Glossary'}</h2><dl>${glossary.map(g => `<dt id="glossario-${g.slug}"><strong>${g.term}</strong></dt><dd>${g.def}</dd>`).join('')}</dl>`;
      const kpisHtml = `<h2>${lang === 'pt' ? 'Provas em números' : 'Proof in numbers'}</h2><ul>${kpis.map(k => `<li><strong>${k.value}</strong> ${k.label} — <em>${k.source}</em></li>`).join('')}</ul>`;

      body = `<p>${ourAILead}</p><h2>${lang === 'pt' ? 'Motores proprietários' : 'Proprietary engines'}</h2><ul>${PRODUCTS.map(p => `<li id="${p.anchor}"><strong>${p.name}</strong> — ${p.description[lang]}</li>`).join('')}</ul>${kpisHtml}${glossaryHtml}`;

      const definedTermSet = {
        '@type': 'DefinedTermSet',
        '@id': `${BASE_URL}/${lang}/our-ai#glossario`,
        name: lang === 'pt' ? 'Glossário GEO — termos da infinity6' : 'GEO Glossary — infinity6 terms',
        inLanguage: lang === 'pt' ? 'pt-BR' : 'en',
        hasDefinedTerm: glossary.map(g => ({
          '@type': 'DefinedTerm',
          '@id': `${BASE_URL}/${lang}/our-ai#glossario-${g.slug}`,
          name: g.term,
          description: g.def,
          inDefinedTermSet: `${BASE_URL}/${lang}/our-ai#glossario`,
          url: `${BASE_URL}/${lang}/our-ai#glossario-${g.slug}`,
        })),
      };
      const observations = kpis.map(k => ({
        '@type': 'Observation',
        name: k.label,
        observationAbout: { '@type': 'Organization', name: 'infinity6', url: BASE_URL },
        measuredProperty: {
          '@type': 'PropertyValue',
          name: k.label,
          value: k.value,
        },
        description: `${lang === 'pt' ? 'Setor' : 'Sector'}: ${k.source}`,
      }));

      jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
          ...PRODUCTS.map(p => ({
            '@type': 'SoftwareApplication',
            name: p.name,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Cloud',
            description: p.description[lang],
            url: `${BASE_URL}/${lang}/our-ai#${p.anchor}`,
            creator: { '@type': 'Organization', name: 'infinity6', url: BASE_URL },
          })),
          definedTermSet,
          ...observations,
        ],
      };
    }

    const html = buildStub(template, {
      lang,
      path,
      title: meta.title,
      description: meta.description,
      h1: meta.title.split(' | ')[0].split(' – ')[0],
      body: body || undefined,
      jsonLd,
    });
    writeStub(path, html);
    count++;
  }
}


// Insights articles (only the published one for now — extend if more land in content/)
const insightArticles = [
  { slug: 'previsao-demanda-ia', pt: { title: 'Previsão de Demanda com IA: do Forecast Estatístico ao Adaptativo', description: 'Como modelos preditivos de nova geração superam ARIMA e Prophet em ambientes voláteis de varejo e indústria.' }, en: { title: 'Demand Forecasting with AI: From Statistical to Adaptive Forecasts', description: 'How next-generation predictive models outperform ARIMA and Prophet in volatile retail and industry environments.' } },
];
for (const article of insightArticles) {
  for (const lang of ['en', 'pt']) {
    const meta = article[lang];
    const path = `/${lang}/insights/${article.slug}`;
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: meta.title,
      description: meta.description,
      author: { '@type': 'Organization', name: 'infinity6' },
      publisher: { '@type': 'Organization', name: 'infinity6', logo: { '@type': 'ImageObject', url: OG_IMAGE } },
      mainEntityOfPage: `${BASE_URL}${path}`,
    };
    const html = buildStub(template, { lang, path, title: `${meta.title} | infinity6`, description: meta.description, h1: meta.title, jsonLd });
    writeStub(path, html);
    count++;
  }
}

// Success story articles — driven by markdown
for (const lang of ['en', 'pt']) {
  const stories = loadStories(lang);
  for (const story of stories) {
    const path = `/${lang}/success-stories/${story.slug}`;
    const description = story.description || story.challenge || story.quote || '';
    const title = `${story.title} | infinity6`;
    const body = [
      story.client ? `<p><strong>${escapeHtml(story.client)}</strong> · ${escapeHtml(story.segment || '')}</p>` : '',
      story.challenge ? `<h2>${lang === 'pt' ? 'Desafio' : 'Challenge'}</h2><p>${escapeHtml(story.challenge)}</p>` : '',
      story.quote ? `<blockquote>${escapeHtml(story.quote)}</blockquote>` : '',
    ].filter(Boolean).join('');
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: story.title,
      description,
      author: { '@type': 'Organization', name: 'infinity6' },
      publisher: { '@type': 'Organization', name: 'infinity6', logo: { '@type': 'ImageObject', url: OG_IMAGE } },
      mainEntityOfPage: `${BASE_URL}${path}`,
      about: story.client,
      articleSection: story.segment,
      ...(story.image ? { image: story.image.startsWith('http') ? story.image : `${BASE_URL}${story.image}` } : {}),
    };
    const html = buildStub(template, {
      lang, path, title, description, h1: story.title, body, image: story.image, jsonLd,
    });
    writeStub(path, html);
    count++;
  }
}

// ---- i6 Intelligence articles — driven by markdown in src/content/intelligence/ ----
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const [, fmBlock, content] = match;
  const data = {};
  for (const line of fmBlock.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (value === '' || value === 'null') data[key] = null;
    else if (value === 'true') data[key] = true;
    else if (value === 'false') data[key] = false;
    else if (/^-?\d+(\.\d+)?$/.test(value)) data[key] = Number(value);
    else data[key] = value;
  }
  return { data, content: content.trim() };
}

function extractFAQ(content) {
  const re = /^##\s+(?:Perguntas frequentes|FAQ)\s*$/im;
  const m = content.match(re);
  if (!m) return [];
  const rest = content.slice(content.indexOf(m[0]) + m[0].length);
  const endIdx = rest.search(/\n##\s+/);
  const block = endIdx === -1 ? rest : rest.slice(0, endIdx);
  const pairs = [];
  const qa = /\*\*([^*]+\?)\*\*\s*\n+([^\n][^\n]*(?:\n[^\n*][^\n]*)*)/g;
  let mm;
  while ((mm = qa.exec(block)) !== null) {
    pairs.push({ q: mm[1].trim(), a: mm[2].trim() });
  }
  return pairs;
}

if (existsSync(INTELLIGENCE_DIR)) {
  const files = readdirSync(INTELLIGENCE_DIR).filter((f) => f.endsWith('.md'));
  for (const file of files) {
    const raw = readFileSync(join(INTELLIGENCE_DIR, file), 'utf8');
    const { data: fm, content } = parseFrontmatter(raw);
    if (!fm.title || !fm.language || !fm.slug || !fm.date) continue;
    const lang = fm.language;
    const path = `/${lang}/i6-intelligence/${fm.slug}`;
    const title = `${fm.title} | i6 Intelligence`;
    const description = fm.excerpt || '';
    const faq = extractFAQ(content);
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: fm.title,
      description,
      datePublished: fm.date,
      inLanguage: lang === 'pt' ? 'pt-BR' : 'en',
      author: { '@type': 'Organization', name: 'infinity6' },
      publisher: { '@type': 'Organization', name: 'infinity6', logo: { '@type': 'ImageObject', url: OG_IMAGE } },
      mainEntityOfPage: `${BASE_URL}${path}`,
      isPartOf: { '@type': 'CreativeWork', name: 'i6 Intelligence' },
      ...(fm.cover_image ? { image: String(fm.cover_image).startsWith('http') ? fm.cover_image : `${BASE_URL}${fm.cover_image}` } : {}),
    };
    const html = buildStub(template, {
      lang, path, title, description, h1: fm.title,
      image: fm.cover_image || undefined,
      jsonLd,
    });
    writeStub(path, html);
    count++;

    // FAQPage as a separate JSON-LD block (appended into <head>)
    if (faq.length > 0) {
      const faqLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      };
      // Re-read the just-written file and inject the FAQ script before </head>
      const outFile = join(DIST, `${path.replace(/^\//, '')}.html`);
      if (existsSync(outFile)) {
        let written = readFileSync(outFile, 'utf8');
        written = written.replace('</head>', `    <script type="application/ld+json">${JSON.stringify(faqLd)}</script>\n  </head>`);
        writeFileSync(outFile, written, 'utf8');
      }
    }
  }
}

// ---- Transformation landings (Phase 10) — driven by markdown in src/content/landings/ ----
if (existsSync(LANDINGS_DIR)) {
  const files = readdirSync(LANDINGS_DIR).filter((f) => f.endsWith('.md'));
  for (const file of files) {
    const raw = readFileSync(join(LANDINGS_DIR, file), 'utf8');
    const { data: fm, content } = parseFrontmatter(raw);
    if (!fm.title || !fm.language || !fm.slug) continue;
    const lang = fm.language;
    const path = `/${lang}/solutions/${fm.slug}`;
    const title = `${fm.title} | infinity6`;
    const description = fm.description || '';
    const faq = extractFAQ(content);

    // crawlable body: hero + sections (H2s) flattened
    const heroBlock = `<p><strong>${escapeHtml(fm.hero_kicker || '')}</strong></p><h2>${escapeHtml(fm.hero_headline || fm.title)}</h2><p>${escapeHtml(fm.hero_sub || description)}</p>`;
    const bodyHtml = `${heroBlock}${mdToHtml(content)}`;

    const stats = [];
    const resMatch = content.match(/##\s+(?:Results|Resultados)\s*\n([\s\S]*?)(?:\n##\s+|$)/i);
    if (resMatch) {
      for (const line of resMatch[1].split(/\r?\n/)) {
        const m = line.match(/^\s*-\s+\*\*([^*]+)\*\*\s*(.+)$/);
        if (m) {
          const parts = m[2].split('|').map((s) => s.trim());
          stats.push({ value: m[1].trim(), label: parts[0] || '', source: parts[1] });
        }
      }
    }

    const serviceLd = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: fm.title,
      description,
      url: `${BASE_URL}${path}`,
      serviceType: fm.hero_kicker || fm.title,
      provider: { '@type': 'Organization', name: 'infinity6', url: BASE_URL },
      areaServed: ['BR', 'LatAm'],
      ...(stats.length > 0 ? {
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: lang === 'pt' ? 'Resultados mensuráveis' : 'Measurable results',
          itemListElement: stats.map((s) => ({ '@type': 'QuantitativeValue', value: s.value, unitText: s.label })),
        },
      } : {}),
    };
    const breadcrumbLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/${lang}` },
        { '@type': 'ListItem', position: 2, name: lang === 'pt' ? 'Soluções' : 'Solutions', item: `${BASE_URL}/${lang}/solutions` },
        { '@type': 'ListItem', position: 3, name: fm.title, item: `${BASE_URL}${path}` },
      ],
    };

    const html = buildStub(template, {
      lang, path, title, description, h1: fm.hero_headline || fm.title,
      body: bodyHtml,
      jsonLd: { '@context': 'https://schema.org', '@graph': [serviceLd, breadcrumbLd] },
    });
    writeStub(path, html);
    count++;

    if (faq.length > 0) {
      const faqLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
          '@type': 'Question', name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      };
      const outFile = join(DIST, `${path.replace(/^\//, '')}.html`);
      if (existsSync(outFile)) {
        let written = readFileSync(outFile, 'utf8');
        written = written.replace('</head>', `    <script type="application/ld+json">${JSON.stringify(faqLd)}</script>\n  </head>`);
        writeFileSync(outFile, written, 'utf8');
      }
    }
  }
}

console.log(`✅ Prerendered ${count} SEO stubs into dist/`);
