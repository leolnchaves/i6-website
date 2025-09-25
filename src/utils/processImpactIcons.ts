import { removeBackground, loadImageFromPath } from './backgroundRemoval';

// Import the original icons
import growthAccelerationIcon from '@/assets/icons/growth-acceleration.png';
import hyperpersonalizationIcon from '@/assets/icons/hyperpersonalization.png';
import supplyOptimizationIcon from '@/assets/icons/supply-optimization.png';
import commercialEfficiencyIcon from '@/assets/icons/commercial-efficiency.png';

const iconPaths = [
  { original: growthAccelerationIcon, name: 'growth-acceleration' },
  { original: hyperpersonalizationIcon, name: 'hyperpersonalization' },
  { original: supplyOptimizationIcon, name: 'supply-optimization' },
  { original: commercialEfficiencyIcon, name: 'commercial-efficiency' }
];

export const processAllIcons = async () => {
  console.log('Starting to process all impact icons...');
  
  for (const iconInfo of iconPaths) {
    try {
      console.log(`Processing ${iconInfo.name}...`);
      
      // Load the original image
      const imageElement = await loadImageFromPath(iconInfo.original);
      
      // Remove background
      const processedBlob = await removeBackground(imageElement);
      
      // Create download link and trigger download
      const url = URL.createObjectURL(processedBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${iconInfo.name}-transparent.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log(`Successfully processed ${iconInfo.name}`);
    } catch (error) {
      console.error(`Error processing ${iconInfo.name}:`, error);
    }
  }
  
  console.log('Finished processing all icons');
};