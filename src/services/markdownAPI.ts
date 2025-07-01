
// Mock implementation for testing markdown functionality
// This will be replaced with real API calls when GitHub integration is ready

export interface MarkdownFile {
  name: string;
  content: string;
  path: string;
  lastModified: Date;
}

export interface MarkdownAPIResponse {
  success: boolean;
  file?: MarkdownFile;
  message?: string;
}

// Mock data for testing different scenarios
const mockFiles: Record<string, string> = {
  'home.en.md': `# Home Page Content
## Hero Section
title: Advanced AI Solutions
subtitle: Real Business Impact
description: Transform your business with our cutting-edge AI technology.

## Results Section  
title: Proven Results
subtitle: Real Impact
description: Our solutions deliver measurable business outcomes.`,

  'home.pt.md': `# Conteúdo da Página Inicial
## Seção Hero
title: Soluções de IA Avançadas
subtitle: Impacto Real nos Negócios
description: Transforme seu negócio com nossa tecnologia de IA de ponta.`,
  
  'results-cards.en.md': `# Results Cards
## Card 1
title: 45% Conversion Increase
description: Average conversion rate improvement across our clients
icon: trending-up
color: #f97316

## Card 2
title: 60% Cost Reduction
description: Reduction in CRM and marketing automation costs
icon: shield
color: #3b82f6`,

  'solutions-cards.en.md': `# Solutions Cards
## Card 1
title: AI Recommendation Engine
description: Personalized product recommendations that drive sales
icon: target
engine: i6 RecSys

## Card 2
title: Dynamic Pricing
description: Optimize pricing strategies with real-time market analysis
icon: dollar-sign
engine: i6 PricingAI`,

  'success-stories-cards.en.md': `# Success Stories
## Story 1
company: TechCorp
industry: E-commerce
challenge: Low conversion rates
solution: Implemented AI recommendation system
metric1: 45% | Conversion Increase
metric2: $2M | Revenue Growth
metric3: 30% | Customer Retention
quote: The AI recommendations transformed our business
customer: John Smith | CEO`
};

export class MarkdownAPI {
  static async getFile(fileName: string, folder: string = ''): Promise<MarkdownAPIResponse> {
    console.log('🔍 MarkdownAPI.getFile DEBUG:', {
      fileName,
      folder,
      availableFiles: Object.keys(mockFiles),
      timestamp: new Date().toISOString()
    });

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));

    const fullPath = folder ? `${folder}/${fileName}` : fileName;
    console.log('📁 MarkdownAPI - Looking for file at path:', fullPath);

    // Check if file exists in mock data
    if (mockFiles[fileName]) {
      console.log('✅ MarkdownAPI - File found in mock data');
      const file: MarkdownFile = {
        name: fileName,
        content: mockFiles[fileName],
        path: fullPath,
        lastModified: new Date()
      };
      
      console.log('📄 MarkdownAPI - Returning file:', {
        name: file.name,
        contentLength: file.content.length,
        contentPreview: file.content.substring(0, 100) + '...'
      });

      return {
        success: true,
        file
      };
    }

    console.log('❌ MarkdownAPI - File not found, returning error');
    return {
      success: false,
      message: `File ${fileName} not found`
    };
  }

  static async saveFile(fileName: string, content: string, folder: string = ''): Promise<MarkdownAPIResponse> {
    console.log('💾 MarkdownAPI.saveFile DEBUG:', {
      fileName,
      contentLength: content.length,
      folder,
      timestamp: new Date().toISOString()
    });

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));

    // Save to mock storage
    mockFiles[fileName] = content;
    console.log('✅ MarkdownAPI - File saved to mock storage');

    const file: MarkdownFile = {
      name: fileName,
      content,
      path: folder ? `${folder}/${fileName}` : fileName,
      lastModified: new Date()
    };

    return {
      success: true,
      file
    };
  }

  static async listFiles(folder: string = ''): Promise<string[]> {
    console.log('📂 MarkdownAPI.listFiles DEBUG:', {
      folder,
      availableFiles: Object.keys(mockFiles),
      timestamp: new Date().toISOString()
    });

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 50));

    const files = Object.keys(mockFiles).filter(fileName => {
      if (!folder) return true;
      return fileName.includes(folder);
    });

    console.log('📋 MarkdownAPI - Files found:', files);
    return files;
  }

  static async deleteFile(fileName: string, folder: string = ''): Promise<MarkdownAPIResponse> {
    console.log('🗑️ MarkdownAPI.deleteFile DEBUG:', {
      fileName,
      folder,
      timestamp: new Date().toISOString()
    });

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));

    if (mockFiles[fileName]) {
      delete mockFiles[fileName];
      console.log('✅ MarkdownAPI - File deleted from mock storage');
      return {
        success: true,
        message: `File ${fileName} deleted successfully`
      };
    }

    console.log('❌ MarkdownAPI - File not found for deletion');
    return {
      success: false,
      message: `File ${fileName} not found`
    };
  }

  // Debug method to check current state
  static debug() {
    console.log('🔍 MarkdownAPI Debug State:', {
      availableFiles: Object.keys(mockFiles),
      fileContents: Object.entries(mockFiles).map(([name, content]) => ({
        name,
        contentLength: content.length,
        preview: content.substring(0, 50) + '...'
      }))
    });
  }
}
