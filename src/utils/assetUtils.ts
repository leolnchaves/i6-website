/**
 * Asset utilities for managing image paths with GitHub Pages compatibility
 * Handles both imported assets and public assets with proper base URL handling
 */

// Base URL for GitHub Pages deployment
const BASE_URL = import.meta.env.BASE_URL || '/';

/**
 * Get public asset URL with proper base URL handling for GitHub Pages
 * Use this for assets in public/ folder that are accessed via URL
 * 
 * @param path - Path relative to public folder (e.g., 'content/logos/client-a.png')
 * @returns Full URL with base path
 */
export const getPublicAssetUrl = (path: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE_URL}${cleanPath}`;
};

/**
 * Get solution GIF URL - these are stored in public root for direct access
 * 
 * @param gifName - Name of the GIF file
 * @returns Full URL with base path
 */
export const getSolutionGifUrl = (gifName: string): string => {
  return getPublicAssetUrl(gifName);
};

/**
 * Get client logo URL from public/content/logos
 * 
 * @param logoName - Name of the logo file
 * @returns Full URL with base path
 */
export const getClientLogoUrl = (logoName: string): string => {
  return getPublicAssetUrl(`content/logos/${logoName}`);
};

/**
 * Get uploaded asset URL from public/lovable-uploads
 * 
 * @param fileName - Name of the uploaded file
 * @returns Full URL with base path
 */
export const getUploadedAssetUrl = (fileName: string): string => {
  return getPublicAssetUrl(`lovable-uploads/${fileName}`);
};

// Export the base URL for direct use when needed
export { BASE_URL };