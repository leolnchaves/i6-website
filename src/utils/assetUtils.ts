/**
 * Utility functions for handling static assets in Vite builds
 * Compatible with GitHub Pages deployment
 */

// ES6 imports for assets processed by Vite (src/assets/)
import companyLogo from '@/assets/images/company-logo.png';
import logoHeader from '@/assets/images/logo-header.png';
import logoFooter from '@/assets/images/logo-footer.png';
import heroBg from '@/assets/images/hero-bg.jpg';
import worldMap from '@/assets/images/world-map.png';
import solutionIcon from '@/assets/images/solution-icon.png';

// Client images
import clientAche from '@/assets/images/client-ache.png';
import clientBanco from '@/assets/images/client-banco.png';
import clientCogna from '@/assets/images/client-cogna.png';
import clientEmbraer from '@/assets/images/client-embraer.png';
import clientEms from '@/assets/images/client-ems.png';
import clientFinancorp from '@/assets/images/client-financorp.png';
import clientHering from '@/assets/images/client-hering.png';
import clientJequiti from '@/assets/images/client-jequiti.png';
import clientLegrand from '@/assets/images/client-legrand.png';
import clientNatura from '@/assets/images/client-natura.png';

// Success story images
import successStory1 from '@/assets/images/success-story-1.png';
import successStory2 from '@/assets/images/success-story-2.png';
import successStory3 from '@/assets/images/success-story-3.png';

// Solution GIFs (small ones from src/assets/gifs/)
import gifAnonymousVisitors from '@/assets/gifs/solution-Anonymous-Visitors.gif';
import gifIdentifiedUsers from '@/assets/gifs/solucao-Identified-Users.gif';
import gifIndustrialIntelligence from '@/assets/gifs/solucao-Industrial-Intelligence.gif';
import gifPredictiveCampaign from '@/assets/gifs/solucao-Predictive-Campaign.gif';
import gifSmartPrice from '@/assets/gifs/solucao-Smart-Price.gif';
import gifAdaptiveDemand from '@/assets/gifs/solucao-Adaptive-Demand.gif';

/**
 * Get the correct base path for public assets
 * Automatically handles GitHub Pages base path
 */
export const getPublicAssetPath = (assetPath: string): string => {
  const basePath = import.meta.env.BASE_URL;
  return `${basePath}${assetPath.startsWith('/') ? assetPath.slice(1) : assetPath}`;
};

/**
 * Assets processed by Vite (ES6 imports)
 */
export const PROCESSED_ASSETS = {
  // Main logos and branding
  COMPANY_LOGO: companyLogo,
  LOGO_HEADER: logoHeader,
  LOGO_FOOTER: logoFooter,
  HERO_BG: heroBg,
  WORLD_MAP: worldMap,
  SOLUTION_ICON: solutionIcon,
  
  // Client images
  CLIENTS: {
    ACHE: clientAche,
    BANCO: clientBanco,
    COGNA: clientCogna,
    EMBRAER: clientEmbraer,
    EMS: clientEms,
    FINANCORP: clientFinancorp,
    HERING: clientHering,
    JEQUITI: clientJequiti,
    LEGRAND: clientLegrand,
    NATURA: clientNatura,
  },
  
  // Success stories
  SUCCESS_STORIES: {
    STORY_1: successStory1,
    STORY_2: successStory2,
    STORY_3: successStory3,
  },
  
  // Solution GIFs (small, processed by Vite)
  SOLUTION_GIFS: [
    gifAnonymousVisitors,
    gifIdentifiedUsers,
    gifIndustrialIntelligence,
    gifPredictiveCampaign,
    gifSmartPrice,
    gifAdaptiveDemand,
  ]
} as const;

/**
 * Public assets paths (served directly from public/)
 */
export const PUBLIC_ASSET_PATHS = {
  // Large GIFs served directly from public/
  LARGE_SOLUTION_GIFS: {
    ANONYMOUS_VISITORS: 'solution-Anonymous-Visitors.gif',
    IDENTIFIED_USERS: 'solucao-Identified-Users.gif',
    INDUSTRIAL_INTELLIGENCE: 'solucao-Industrial-Intelligence.gif',
    PREDICTIVE_CAMPAIGN: 'solucao-Predictive-Campaign.gif',
    SMART_PRICE: 'solucao-Smart-Price.gif',
    ADAPTIVE_DEMAND: 'solucao-Adaptive-Demand.gif',
  },
  
  // Client logos in public/content/logos/
  LOGOS: {
    ACHE: 'content/logos/ACHE.png',
    ANIMA: 'content/logos/ANIMA.png',
    BMG: 'content/logos/BMG.png',
    CONDOR: 'content/logos/CONDOR.png',
    EMBRAER: 'content/logos/EMBRAER.png',
    EMS_COR: 'content/logos/EMS-COR.png',
    EMS: 'content/logos/EMS.png',
    FORD: 'content/logos/FORD.png',
    GERMED: 'content/logos/GERMED.png',
    HERING: 'content/logos/HERING.png',
    JEQUITI: 'content/logos/JEQUITI.png',
    LEGRAND: 'content/logos/LEGRAND.png',
    PELANDO: 'content/logos/PELANDO.png',
    RABOBANK: 'content/logos/RABOBANK.png',
    TICKETMASTER: 'content/logos/TICKETMASTER.png',
    DIRECIONAL: 'content/logos/direcional.png',
  }
} as const;

/**
 * Get solution GIF by index (using processed assets from src/)
 */
export const getSolutionGif = (index: number): string => {
  return PROCESSED_ASSETS.SOLUTION_GIFS[index % PROCESSED_ASSETS.SOLUTION_GIFS.length];
};

/**
 * Get large solution GIF by index (using public assets)
 */
export const getLargeSolutionGif = (index: number): string => {
  const gifs = Object.values(PUBLIC_ASSET_PATHS.LARGE_SOLUTION_GIFS);
  return getPublicAssetPath(gifs[index % gifs.length]);
};

/**
 * Get logo path by name (from public/content/logos/)
 */
export const getLogoPath = (logoName: keyof typeof PUBLIC_ASSET_PATHS.LOGOS): string => {
  return getPublicAssetPath(PUBLIC_ASSET_PATHS.LOGOS[logoName]);
};