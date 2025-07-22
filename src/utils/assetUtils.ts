/**
 * Utility functions for handling static assets in Vite builds
 * Compatible with GitHub Pages deployment
 */

/**
 * Get the correct base path for public assets
 * Automatically handles GitHub Pages base path
 */
export const getPublicAssetPath = (assetPath: string): string => {
  const basePath = import.meta.env.BASE_URL;
  return `${basePath}${assetPath.startsWith('/') ? assetPath.slice(1) : assetPath}`;
};

/**
 * Common asset paths for the application
 */
export const ASSET_PATHS = {
  // Solution GIFs in public folder
  SOLUTION_GIFS: {
    ANONYMOUS_VISITORS: 'solution-Anonymous-Visitors.gif',
    IDENTIFIED_USERS: 'solucao-Identified-Users.gif',
    INDUSTRIAL_INTELLIGENCE: 'solucao-Industrial-Intelligence.gif',
    PREDICTIVE_CAMPAIGN: 'solucao-Predictive-Campaign.gif',
    SMART_PRICE: 'solucao-Smart-Price.gif',
    ADAPTIVE_DEMAND: 'solucao-Adaptive-Demand.gif',
  },
  
  // Logos in public/content/logos/
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
 * Get solution GIF by index
 */
export const getSolutionGif = (index: number): string => {
  const gifs = Object.values(ASSET_PATHS.SOLUTION_GIFS);
  return getPublicAssetPath(gifs[index % gifs.length]);
};

/**
 * Get logo path by name
 */
export const getLogoPath = (logoName: keyof typeof ASSET_PATHS.LOGOS): string => {
  return getPublicAssetPath(ASSET_PATHS.LOGOS[logoName]);
};