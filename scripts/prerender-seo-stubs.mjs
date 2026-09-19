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
import {
  buildResearchNodes,
  localizeGlobalGraph,
  serializeLd,
  researchData,
} from './lib/jsonld-people-research.mjs';


const BASE_URL = 'https://infinity6.ai';
const DIST = resolve('dist');
const PUBLIC_CONTENT = resolve('public/content');
const INTELLIGENCE_DIR = resolve('src/content/intelligence');
const INSIGHTS_DIR = resolve('src/content/insights');
const OG_IMAGE = `${BASE_URL}/lovable-uploads/0fce52e4-a161-4d37-b3e4-f23f093b9b75.png`;

// ---- Static page SEO (mirrors src/data/staticData/seoData.ts) ----
const seo = {
  home: {
    pt: { title: 'infinity6 – i6 Decision Platform', description: 'Decida antes do mercado. Plataforma de IA aplicada que transforma decisões antecipadas em crescimento de receita, proteção de margem e aceleração de resultados.' },
    en: { title: 'infinity6 – i6 Decision Platform', description: 'Decide before the market. Applied-AI platform that turns anticipated decisions into revenue growth, margin protection and faster results.' },
    es: { title: 'infinity6 – i6 Decision Platform', description: 'Decide antes que el mercado. Plataforma de IA aplicada que convierte decisiones anticipadas en crecimiento de ingresos, protección de margen y aceleración de resultados.' },
  },
  'success-stories': {
    pt: { title: 'Cases de Sucesso com IA | infinity6', description: 'Veja como empresas aumentaram receita, protegeram margem e reduziram rupturas com inteligência preditiva da infinity6.' },
    en: { title: 'AI Success Stories | infinity6', description: 'See how companies grew revenue, protected margins and reduced stockouts with infinity6 predictive intelligence.' },
    es: { title: 'Casos de éxito con IA | infinity6', description: 'Mira cómo las empresas aumentaron ingresos, protegieron margen y redujeron quiebres de stock con la inteligencia predictiva de infinity6.' },
  },
  contact: {
    pt: { title: 'Fale Conosco | infinity6', description: 'Agende uma conversa estratégica. Colocamos IA preditiva em produção em 4-12 semanas com impacto financeiro mensurável.' },
    en: { title: 'Contact Us | infinity6', description: 'Schedule a strategic conversation. We deploy predictive AI into production in 4-12 weeks with measurable financial impact.' },
    es: { title: 'Contáctanos | infinity6', description: 'Agenda una conversación estratégica. Ponemos IA predictiva en producción en 4-12 semanas con impacto financiero medible.' },
  },
  'privacy-policy': {
    pt: { title: 'Política de Privacidade | infinity6', description: 'Saiba como a infinity6 protege e gerencia seus dados pessoais com transparência e segurança.' },
    en: { title: 'Privacy Policy | infinity6', description: 'Learn how infinity6 protects and manages your personal data with transparency and security.' },
    es: { title: 'Política de Privacidad | infinity6', description: 'Conoce cómo infinity6 protege y gestiona tus datos personales con transparencia y seguridad.' },
  },
  'ethics-policy': {
    pt: { title: 'Política de Ética em IA | infinity6', description: 'Nosso compromisso com IA ética, transparente e responsável em todas as soluções.' },
    en: { title: 'AI Ethics Policy | infinity6', description: 'Our commitment to ethical, transparent and responsible AI across all solutions.' },
    es: { title: 'Política de Ética en IA | infinity6', description: 'Nuestro compromiso con una IA ética, transparente y responsable en todas las soluciones.' },
  },
  insights: {
    pt: { title: 'Insights de IA Preditiva | infinity6', description: 'Artigos e análises sobre previsão de demanda, forecast de vendas, pricing dinâmico e crescimento de receita com IA.' },
    en: { title: 'Predictive AI Insights | infinity6', description: 'Articles and analysis on demand forecasting, dynamic pricing, recommendation engines and revenue growth with AI.' },
    es: { title: 'Insights de IA Predictiva | infinity6', description: 'Artículos y análisis sobre previsión de demanda, pricing dinámico, motores de recomendación y crecimiento de ingresos con IA.' },
  },
  'i6-intelligence': {
    pt: { title: 'i6 Intelligence | infinity6', description: 'Inteligência aplicada para decisões de demanda, margem, estoque, mix e propensão para os setores de varejo, indústria, financeiro e farma.' },
    en: { title: 'i6 Intelligence | infinity6', description: 'Applied intelligence for decisions on demand, margin, inventory, mix and propensity across retail, industry, financial services and pharma.' },
    es: { title: 'i6 Intelligence | infinity6', description: 'Inteligencia aplicada para decisiones de demanda, margen, inventario, mix y propensión en retail, industria, servicios financieros y farma.' },
  },
  'our-ai': {
    pt: { title: 'Proprietary AI — Motores de IA da infinity6', description: 'Três motores proprietários (i6 Previsio, i6 RecSys, i6 ElasticPrice) sobre um modelo fundacional, com incerteza medida e explicação rastreável.' },
    en: { title: 'Proprietary AI — infinity6 AI Engines', description: 'Three proprietary engines (i6 Previsio, i6 RecSys, i6 ElasticPrice) on a shared foundation model, with measured uncertainty and traceable explanations.' },
    es: { title: 'Proprietary AI — Motores de IA de infinity6', description: 'Tres motores propietarios (i6 Previsio, i6 RecSys, i6 ElasticPrice) sobre un modelo fundacional compartido, con incertidumbre medida y explicación trazable.' },
  },
  // Documentação · Pesquisa: lista completa de palestras e artigos (visível em /{idioma}/docs/pesquisa).
  'docs/pesquisa': {
    pt: { title: 'Pesquisa — produção técnica | infinity6', description: 'Palestras técnicas e artigos publicados pelo time da infinity6 em conferências e repositórios abertos, complementando a produção formal revisada por pares.' },
    en: { title: 'Research — technical output | infinity6', description: 'Technical talks and papers published by the infinity6 team at conferences and in open repositories, complementing the formal peer-reviewed output.' },
    es: { title: 'Investigación — producción técnica | infinity6', description: 'Charlas técnicas y artículos publicados por el equipo de infinity6 en conferencias y repositorios abiertos, complementando la producción formal revisada por pares.' },
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



// ---- HTML transformation ----
const escapeHtml = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const HTML_LANG = { pt: 'pt-BR', en: 'en', es: 'es' };
const OG_LOCALE = { pt: 'pt_BR', en: 'en_US', es: 'es_ES' };
const HREFLANG = { pt: 'pt-BR', en: 'en', es: 'es' };

function buildStub(
  template,
  { lang, path, title, description, h1, body, image, jsonLd, extraJsonLd = [], altLangs = ['en', 'pt'] },
) {
  const canonical = `${BASE_URL}${path}`;
  const localized = (target) => `${BASE_URL}${path.replace(/^\/(pt|en|es)(?=\/|$)/, `/${target}`)}`;
  const ogImage = image
    ? (image.startsWith('http') ? image : `${BASE_URL}${image.split('?')[0]}`)
    : OG_IMAGE;

  let html = template;

  // Nós Person do grafo global vêm em português no index.html: localiza por rota.
  html = localizeGlobalGraph(html, lang);

  // <html lang>
  html = html.replace(/<html\s+lang="[^"]*"/i, `<html lang="${HTML_LANG[lang]}"`);

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
  // hreflang só para idiomas que têm stub real desta rota (nada de URL /es que caia em fallback).
  const headTags = [
    `<link rel="canonical" href="${canonical}" />`,
    ...altLangs.map((l) => `<link rel="alternate" hreflang="${HREFLANG[l]}" href="${localized(l)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${localized('en')}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:type" content="${jsonLd ? 'article' : 'website'}" />`,
    `<meta property="og:locale" content="${OG_LOCALE[lang]}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    jsonLd ? `<script type="application/ld+json">${serializeLd(jsonLd)}</script>` : '',
    ...extraJsonLd.map((block) => `<script type="application/ld+json">${serializeLd(block)}</script>`),
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
  if (clean === 'en' || clean === 'pt' || clean === 'es') {
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
const staticRoutes = ['', 'our-ai', 'success-stories', 'contact', 'privacy-policy', 'ethics-policy', 'insights', 'i6-intelligence', 'docs/pesquisa'];

const PRODUCTS = [
  { name: 'i6Previsio', anchor: 'i6previsio', description: { pt: 'Motor proprietário de previsão de demanda com modelos adaptativos e demand sensing em tempo real', en: 'Proprietary demand forecasting engine with adaptive models and real-time demand sensing' } },
  { name: 'i6RecSys', anchor: 'i6recsys', description: { pt: 'Motor proprietário de recomendação, otimização de mix e score de propensão de compra para anônimos', en: 'Proprietary engine for recommendation, mix optimization and anonymous purchase propensity scoring' } },
  { name: 'i6ElasticPrice', anchor: 'i6elasticprice', description: { pt: 'Motor proprietário de elasticidade e precificação dinâmica por SKU, canal e ciclo de vida', en: 'Proprietary elasticity and dynamic pricing engine by SKU, channel and lifecycle' } },
];

// Idiomas com rota real no router (src/App.tsx aceita en, pt e es em todas
// as rotas estáticas abaixo, incluindo docs/:slug).
const STATIC_LANGS = ['en', 'pt', 'es'];

for (const lang of STATIC_LANGS) {
  // Corpo auxiliar para crawlers: só existe em pt/en; es usa o texto em pt.
  const tl = lang === 'en' ? 'en' : 'pt';
  for (const route of staticRoutes) {
    const key = route === '' ? 'home' : route;
    const meta = seo[key]?.[lang];
    if (!meta) continue;
    const path = route === '' ? `/${lang}` : `/${lang}/${route}`;
    let body = '';
    let jsonLd;
    const extraJsonLd = [];
    if (route === 'our-ai') {
      // Só os 3 itens visíveis na Base científica desta página — mesmos @id de docs/pesquisa.
      extraJsonLd.push({
        '@context': 'https://schema.org',
        '@graph': buildResearchNodes(lang, ['palestra-ifood', 'artigo-lnbip-2013', 'artigo-webist-2012']),
      });
      const OUR_AI_LEAD = {
        pt: 'A infinity6 opera três motores proprietários de IA aplicada: i6 RecSys (recomendação contextual), i6 Previsio (previsão de demanda granular) e i6 ElasticPrice (precificação adaptativa). Os três partem do modelo fundacional i6-RecSys-Base.g1, que combina MAML, Active Learning, Topological Loss e External Memory, treinado em 20 bi de registros transacionais e 50 bases públicas ou adquiridas (45% e-commerce, 20% telecom, 20% atacado e varejo, 15% produtos financeiros).',
        en: 'infinity6 operates three proprietary applied AI engines: i6 RecSys (contextual recommendation), i6 Previsio (granular demand forecasting) and i6 ElasticPrice (adaptive pricing). All three run on the foundation model i6-RecSys-Base.g1, which combines MAML, Active Learning, Topological Loss and External Memory, trained on 20 billion transactional records and 50 public or acquired datasets (45% e-commerce, 20% telecom, 20% wholesale and retail, 15% financial products).',
        es: 'infinity6 opera tres motores propietarios de IA aplicada: i6 RecSys (recomendación contextual), i6 Previsio (previsión de demanda granular) e i6 ElasticPrice (precificación adaptativa). Los tres parten del modelo fundacional i6-RecSys-Base.g1, que combina MAML, Active Learning, Topological Loss y External Memory, entrenado con 20 mil millones de registros transaccionales y 50 bases públicas o adquiridas (45% e-commerce, 20% telecomunicaciones, 20% mayorista y minorista, 15% productos financieros).',
      };
      const ourAILead = OUR_AI_LEAD[lang] ?? OUR_AI_LEAD.pt;

      // Glossary terms (mirror src/data/staticData/ourAIContent.ts)
      const glossary = tl === 'pt' ? [
        { slug: 'predicao-comportamental', term: 'Predição comportamental', def: 'Modelagem que aprende o comportamento real do cliente, canal ou produto a partir de dados transacionais para antecipar a próxima ação relevante.' },
        { slug: 'propensao-conversao', term: 'Propensão de conversão', def: 'Score preditivo da probabilidade de conclusão de compra em um contexto específico.' },
        { slug: 'elasticidade-dinamica', term: 'Elasticidade dinâmica', def: 'Sensibilidade de demanda a preço calculada continuamente por SKU, canal e ciclo de vida.' },
        { slug: 'aderencia-contextual', term: 'Aderência contextual', def: 'Grau em que uma recomendação combina histórico comportamental com o contexto atual.' },
        { slug: 'ruptura-gondola', term: 'Ruptura de gôndola', def: 'Indisponibilidade de SKU no PDV com demanda real. Custa 4%–12% do faturamento líquido no varejo farma.' },
        { slug: 'maml', term: 'MAML', def: 'Model-Agnostic Meta-Learning. Algoritmo (Finn, Abbeel & Levine) base do i6-RecSys-Base.g1.' },
        { slug: 'topological-loss', term: 'Topological Loss', def: 'Função de perda que preserva as relações topológicas do espaço latente, o que estabiliza os embeddings e melhora a generalização com poucos exemplos.' },
        { slug: 'active-learning', term: 'Active Learning', def: 'Estratégia em que o próprio modelo escolhe quais amostras valem a pena rotular, acelerando o aprendizado e reduzindo o custo de rotulagem.' },
        { slug: 'i6-recsys-base-g1', term: 'i6-RecSys-Base.g1', def: 'Modelo fundacional proprietário da infinity6 (MAML + Active Learning + Topological Loss), 20 bi de registros.' },
      ] : [
        { slug: 'behavioral-prediction', term: 'Behavioral prediction', def: 'Modeling that learns real customer/channel/product behavior from transactional data to anticipate the next relevant action.' },
        { slug: 'conversion-propensity', term: 'Conversion propensity', def: 'Predictive score for the probability of completing a purchase in a specific context.' },
        { slug: 'dynamic-elasticity', term: 'Dynamic elasticity', def: 'Continuous price-sensitivity learning by SKU, channel and lifecycle.' },
        { slug: 'contextual-adherence', term: 'Contextual adherence', def: 'How well a recommendation combines behavioral history with current context.' },
        { slug: 'shelf-stockout', term: 'Shelf stockout', def: 'SKU unavailability at POS when real demand exists. Costs 4%–12% of net revenue in pharma retail.' },
        { slug: 'maml', term: 'MAML', def: 'Model-Agnostic Meta-Learning (Finn, Abbeel & Levine). Foundation of i6-RecSys-Base.g1.' },
        { slug: 'topological-loss', term: 'Topological Loss', def: 'Loss function that preserves topological relations in the latent space, which stabilizes the embeddings and improves generalization from few examples.' },
        { slug: 'active-learning', term: 'Active Learning', def: 'Strategy in which the model itself picks which samples are worth labeling, accelerating learning and reducing labeling cost.' },
        { slug: 'i6-recsys-base-g1', term: 'i6-RecSys-Base.g1', def: 'infinity6 proprietary foundation model (MAML + Active Learning + Topological Loss), 20B records.' },
      ];

      // Real-results KPIs (mirror src/data/staticData/realResults.ts)
      const kpis = tl === 'pt' ? [
        { value: 'R$ 100M', label: 'em perdas evitadas por incineração em um ano', source: 'Indústria farmacêutica' },
        { value: '+23%', label: 'ticket médio por PDV', source: 'Varejo' },
        { value: '+36%', label: 'positivação de produtos', source: 'Varejo' },
        { value: '−57%', label: 'custo de mensageria, com disparos direcionados', source: 'Financeiro' },
        { value: '12x', label: 'mais conversão em campanhas do que a segmentação tradicional', source: 'Financeiro' },
        { value: '+2,6%', label: 'mais vendas que a curadoria humana de looks', source: 'Fashion' },
      ] : [
        { value: 'R$ 100M', label: 'in losses avoided from incineration in one year', source: 'Pharmaceutical industry' },
        { value: '+23%', label: 'average ticket per POS', source: 'Retail' },
        { value: '+36%', label: 'product activation', source: 'Retail' },
        { value: '−57%', label: 'messaging cost, with targeted sends', source: 'Financial services' },
        { value: '12x', label: 'more conversion in campaigns than traditional segmentation', source: 'Financial services' },
        { value: '+2.6%', label: 'more sales than human look curation', source: 'Fashion' },
      ];

      const glossaryHtml = `<h2 id="glossario">${tl === 'pt' ? 'Glossário GEO' : 'GEO Glossary'}</h2><dl>${glossary.map(g => `<dt id="glossario-${g.slug}"><strong>${g.term}</strong></dt><dd>${g.def}</dd>`).join('')}</dl>`;
      const kpisHtml = `<h2>${tl === 'pt' ? 'Provas em números' : 'Proof in numbers'}</h2><ul>${kpis.map(k => `<li><strong>${k.value}</strong> ${k.label} — <em>${k.source}</em></li>`).join('')}</ul>`;

      body = `<p>${ourAILead}</p><h2>${tl === 'pt' ? 'Motores proprietários' : 'Proprietary engines'}</h2><ul>${PRODUCTS.map(p => `<li id="${p.anchor}"><strong>${p.name}</strong> — ${p.description[tl]}</li>`).join('')}</ul>${kpisHtml}${glossaryHtml}`;

      const definedTermSet = {
        '@type': 'DefinedTermSet',
        '@id': `${BASE_URL}/${lang}/our-ai#glossario`,
        name: tl === 'pt' ? 'Glossário GEO — termos da infinity6' : 'GEO Glossary — infinity6 terms',
        inLanguage: tl === 'pt' ? 'pt-BR' : 'en',
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
        variableMeasured: {
          '@type': 'PropertyValue',
          name: k.label,
        },
        measuredValue: k.value,
        description: `${tl === 'pt' ? 'Setor' : 'Sector'}: ${k.source}`,
      }));

      jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
          ...PRODUCTS.map(p => ({
            '@type': 'SoftwareApplication',
            name: p.name,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Cloud',
            description: p.description[tl],
            url: `${BASE_URL}/${lang}/our-ai#${p.anchor}`,
            creator: { '@type': 'Organization', name: 'infinity6', url: BASE_URL },
          })),
          definedTermSet,
          ...observations,
        ],
      };
    }

    if (route === 'docs/pesquisa') {
      // Lista completa e visível de palestras e artigos: o JSON-LD acompanha
      // exatamente src/data/research.json, mesma fonte da lista em markdown.
      const mdFile = resolve(`src/content/docs/pesquisa-${lang}.md`);
      if (existsSync(mdFile)) body = mdToHtml(readFileSync(mdFile, 'utf8'));
      extraJsonLd.push({
        '@context': 'https://schema.org',
        '@graph': buildResearchNodes(lang),
      });
    }

    const html = buildStub(template, {
      lang,
      path,
      title: meta.title,
      description: meta.description,
      h1: meta.title.split(' | ')[0].split(' – ')[0],
      body: body || undefined,
      jsonLd,
      extraJsonLd,
      altLangs: STATIC_LANGS,
    });
    writeStub(path, html);
    count++;
  }
}


// ---- Insights (i6 Article / i6 eBook / i6 on Media / i6 Social) ----
// Driven by markdown in src/content/insights/ (synced from i6Hub in CI).
// Route mapping matches the React router:
//   i6 Article  -> /{lang}/i6-blog/{slug}
//   i6 eBook    -> /{lang}/i6-intelligence/{slug}
//   i6 on Media -> /{lang}/insights/{slug}
//   i6 Social   -> /{lang}/insights/{slug}
const INSIGHT_ROUTE = {
  'i6 Article': 'i6-blog',
  'i6 eBook': 'i6-intelligence',
  'i6 on Media': 'insights',
  'i6 Social': 'insights',
};

// Strip common markdown syntax from excerpts so they don't leak into <meta> tags.
function excerptToPlain(raw) {
  if (!raw) return '';
  return String(raw)
    .replace(/\\r\\n|\\n|\\r/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/~~(.*?)~~/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

if (existsSync(INSIGHTS_DIR)) {
  const files = readdirSync(INSIGHTS_DIR).filter((f) => f.endsWith('.md'));
  for (const file of files) {
    const raw = readFileSync(join(INSIGHTS_DIR, file), 'utf8');
    const { data: fm } = parseFrontmatter(raw);
    if (!fm.title || !fm.language || !fm.slug || !fm.type || !fm.date) continue;
    const segment = INSIGHT_ROUTE[fm.type];
    if (!segment) continue;
    const lang = fm.language;
    if (lang !== 'en' && lang !== 'pt') continue;

    const path = `/${lang}/${segment}/${fm.slug}`;
    const title = `${fm.title} | infinity6`;
    const description = excerptToPlain(fm.excerpt || '');
    const cover = fm.cover_image ? String(fm.cover_image) : undefined;

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
      ...(cover ? { image: cover.startsWith('http') ? cover : `${BASE_URL}${cover.startsWith('/') ? '' : '/'}${cover}` } : {}),
    };
    const html = buildStub(template, {
      lang, path, title, description, h1: fm.title,
      image: cover,
      jsonLd,
    });
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


console.log(`✅ Prerendered ${count} SEO stubs into dist/`);

// ---- Demo routes: real 200 files (Fully Kiosk shows an error page on HTTP 404) ----
const KIOSK_METRICS_TOKEN = 'i6k-x3f8n2vqp7wm4jt-metrics';
for (const p of ['demo', 'pt/demo', 'en/demo', `demo-metrics/${KIOSK_METRICS_TOKEN}`]) {
  const out = join(DIST, p, 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, template, 'utf8');
  console.log(`✅ Demo route file: ${p}/index.html`);
}
