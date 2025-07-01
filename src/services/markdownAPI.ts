export interface MarkdownFile {
  fileName: string;
  content: string;
  path: string;
}

export interface MarkdownAPIResponse {
  success: boolean;
  message: string;
  file?: MarkdownFile;
}

export class MarkdownAPI {
  private static baseURL = '/api/markdown';
  
  // Simulação de arquivos existentes para testes - incluindo dados de cards
  private static mockFiles = new Map<string, string>([
    ['home.en.md', `---
language: en
page: home
sections:
  homeHero:
    title: "Infinite"
    subtitle: "Possibilities"
    poweredByAI: "Powered by AI"
    description: "Transform your business with cutting-edge AI solutions"
    startJourney: "Start Your Journey"
    watchDemo: "Watch Demo"
    demoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ"
---

# Home Page Content

This is mock content for testing the Markdown system.
`],
    ['home.pt.md', `---
language: pt
page: home
sections:
  homeHero:
    title: "Infinitas"
    subtitle: "Possibilidades"
    poweredByAI: "Powered by AI"
    description: "Transforme seu negócio com soluções de IA de ponta"
    startJourney: "Comece Sua Jornada"
    watchDemo: "Assista Demo"
    demoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ"
---

# Conteúdo da Página Home

Este é conteúdo simulado para testar o sistema Markdown.
`],
    // Arquivos de exemplo para cards de resultados
    ['results-cards.en.md', `---
language: en
type: results-cards
---

# Results Cards - English

This file contains the results cards configuration for the English version.
Currently using placeholder content for testing the Markdown system.
`],
    ['results-cards.pt.md', `---
language: pt
type: results-cards
---

# Cards de Resultados - Português

Este arquivo contém a configuração dos cards de resultados para a versão em português.
Atualmente usando conteúdo de placeholder para testar o sistema Markdown.
`],
    // Arquivos de exemplo para cards de soluções
    ['solutions-cards.en.md', `---
language: en
type: solutions-cards
---

# Solutions Cards - English

This file contains the solutions cards configuration for the English version.
Currently using placeholder content for testing the Markdown system.
`],
    ['solutions-cards.pt.md', `---
language: pt
type: solutions-cards
---

# Cards de Soluções - Português

Este arquivo contém a configuração dos cards de soluções para a versão em português.
Atualmente usando conteúdo de placeholder para testar o sistema Markdown.
`],
    // Arquivos de exemplo para cards de cases de sucesso
    ['success-stories-cards.en.md', `---
language: en
type: success-stories-cards
---

# Success Stories Cards - English

This file contains the success stories cards configuration for the English version.
Currently using placeholder content for testing the Markdown system.
`],
    ['success-stories-cards.pt.md', `---
language: pt
type: success-stories-cards
---

# Cards de Cases de Sucesso - Português

Este arquivo contém a configuração dos cards de cases de sucesso para a versão em português.
Atualmente usando conteúdo de placeholder para testar o sistema Markdown.
`]
  ]);

  static async saveFile(fileName: string, content: string, path: string = ''): Promise<MarkdownAPIResponse> {
    console.log('MarkdownAPI - Saving file:', fileName);
    
    try {
      await this.simulateAPICall();
      
      // Salvar no mock storage para testes
      const fullPath = path ? `${path}/${fileName}` : fileName;
      this.mockFiles.set(fileName, content);
      
      console.log('MarkdownAPI - File saved to mock storage:', fileName);
      
      return {
        success: true,
        message: `Arquivo ${fileName} salvo com sucesso`,
        file: {
          fileName,
          content,
          path: fullPath
        }
      };
    } catch (error) {
      console.error('MarkdownAPI - Error saving file:', error);
      return {
        success: false,
        message: `Erro ao salvar arquivo ${fileName}: ${error}`
      };
    }
  }

  static async getFile(fileName: string, path: string = ''): Promise<MarkdownAPIResponse> {
    console.log('MarkdownAPI - Getting file:', fileName);
    
    try {
      await this.simulateAPICall();
      
      // Verificar se o arquivo existe no mock storage
      const content = this.mockFiles.get(fileName);
      
      if (content) {
        console.log('MarkdownAPI - File found in mock storage:', fileName);
        return {
          success: true,
          message: `Arquivo ${fileName} encontrado`,
          file: {
            fileName,
            content,
            path: path ? `${path}/${fileName}` : fileName
          }
        };
      }
      
      // Se não existe, retornar como não encontrado (comportamento normal)
      console.log('MarkdownAPI - File not found:', fileName, '- This is expected during testing');
      return {
        success: false,
        message: `Arquivo ${fileName} não encontrado - usando fallback do Supabase`
      };
    } catch (error) {
      console.error('MarkdownAPI - Error getting file:', error);
      return {
        success: false,
        message: `Erro ao buscar arquivo ${fileName}: ${error}`
      };
    }
  }

  static async listFiles(path: string = ''): Promise<MarkdownAPIResponse & { files?: string[] }> {
    console.log('MarkdownAPI - Listing files in path:', path);
    
    try {
      await this.simulateAPICall();
      
      // Retornar arquivos do mock storage
      const files = Array.from(this.mockFiles.keys()).filter(fileName => {
        if (!path) return true;
        return fileName.startsWith(path);
      });
      
      return {
        success: true,
        message: 'Lista de arquivos obtida com sucesso',
        files
      };
    } catch (error) {
      console.error('MarkdownAPI - Error listing files:', error);
      return {
        success: false,
        message: `Erro ao listar arquivos: ${error}`
      };
    }
  }

  static async deleteFile(fileName: string, path: string = ''): Promise<MarkdownAPIResponse> {
    console.log('MarkdownAPI - Deleting file:', fileName);
    
    try {
      await this.simulateAPICall();
      
      // Remover do mock storage
      this.mockFiles.delete(fileName);
      
      return {
        success: true,
        message: `Arquivo ${fileName} deletado com sucesso`
      };
    } catch (error) {
      console.error('MarkdownAPI - Error deleting file:', error);
      return {
        success: false,
        message: `Erro ao deletar arquivo ${fileName}: ${error}`
      };
    }
  }

  private static async simulateAPICall(): Promise<void> {
    // Simular latência de rede menor para melhor experiência nos testes
    await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 50));
    
    // Reduzir chance de falha para testes mais estáveis (1% das vezes)
    if (Math.random() < 0.01) {
      throw new Error('Falha simulada de conexão com API');
    }
  }

  static async healthCheck(): Promise<boolean> {
    try {
      console.log('MarkdownAPI - Health check');
      await this.simulateAPICall();
      return true;
    } catch (error) {
      console.error('MarkdownAPI - Health check failed:', error);
      return false;
    }
  }

  // Método para adicionar arquivos mock durante desenvolvimento
  static addMockFile(fileName: string, content: string): void {
    this.mockFiles.set(fileName, content);
    console.log('MarkdownAPI - Mock file added:', fileName);
  }

  // Método para limpar arquivos mock
  static clearMockFiles(): void {
    this.mockFiles.clear();
    console.log('MarkdownAPI - Mock files cleared');
  }

  // Método para obter estatísticas dos arquivos mock
  static getMockStats() {
    return {
      totalFiles: this.mockFiles.size,
      files: Array.from(this.mockFiles.keys())
    };
  }
}
