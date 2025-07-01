
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

  static async saveFile(fileName: string, content: string, path: string = ''): Promise<MarkdownAPIResponse> {
    console.log('MarkdownAPI - Saving file:', fileName);
    
    try {
      // Simular API externa - em produção seria uma chamada real
      await this.simulateAPICall();
      
      // Por enquanto, apenas logamos o conteúdo
      console.log('MarkdownAPI - File content:', content);
      console.log('MarkdownAPI - File path:', path);
      
      // Simular sucesso
      return {
        success: true,
        message: `Arquivo ${fileName} salvo com sucesso`,
        file: {
          fileName,
          content,
          path: path || `content/${fileName}`
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
      
      // Simular que o arquivo não existe ainda (será implementado quando conectarmos API real)
      return {
        success: false,
        message: `Arquivo ${fileName} não encontrado - usando Supabase como fallback`
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
      
      // Simular lista vazia por enquanto
      return {
        success: true,
        message: 'Lista de arquivos obtida com sucesso',
        files: []
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
    // Simular latência de rede
    await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 100));
    
    // Simular falha ocasional (5% das vezes)
    if (Math.random() < 0.05) {
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
}
