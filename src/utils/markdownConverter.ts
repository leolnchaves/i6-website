
interface CMSContent {
  section_name: string;
  field_name: string;
  content: string;
  language: string;
}

interface MarkdownFrontmatter {
  title?: string;
  description?: string;
  language: string;
  page: string;
  sections: Record<string, Record<string, string>>;
}

export class MarkdownConverter {
  static contentToMarkdown(pageSlug: string, language: string, content: CMSContent[]): string {
    // Organizar conteúdo por seções
    const sections: Record<string, Record<string, string>> = {};
    
    content.forEach(item => {
      if (!sections[item.section_name]) {
        sections[item.section_name] = {};
      }
      sections[item.section_name][item.field_name] = item.content;
    });

    const frontmatter: MarkdownFrontmatter = {
      language,
      page: pageSlug,
      sections
    };

    // Criar o frontmatter YAML
    const yamlContent = `---
language: ${language}
page: ${pageSlug}
sections:${this.objectToYaml(sections, 2)}
---

# Conteúdo da Página ${pageSlug}

Este arquivo contém o conteúdo CMS para a página **${pageSlug}** no idioma **${language}**.

## Seções Disponíveis

${Object.keys(sections).map(section => `- **${section}**: ${Object.keys(sections[section]).length} campos`).join('\n')}

---
*Arquivo gerado automaticamente pelo CMS Infinity6*
`;

    return yamlContent;
  }

  static markdownToContent(markdown: string): { pageSlug: string; language: string; content: CMSContent[] } {
    // Extrair frontmatter
    const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) {
      throw new Error('Frontmatter não encontrado no arquivo Markdown');
    }

    const frontmatterText = frontmatterMatch[1];
    const frontmatter = this.parseYaml(frontmatterText);

    const content: CMSContent[] = [];
    
    // Converter seções de volta para formato CMS
    if (frontmatter.sections) {
      Object.entries(frontmatter.sections).forEach(([sectionName, fields]) => {
        Object.entries(fields as Record<string, string>).forEach(([fieldName, fieldContent]) => {
          content.push({
            section_name: sectionName,
            field_name: fieldName,
            content: fieldContent,
            language: frontmatter.language
          });
        });
      });
    }

    return {
      pageSlug: frontmatter.page,
      language: frontmatter.language,
      content
    };
  }

  private static objectToYaml(obj: any, indent: number = 0): string {
    const spaces = ' '.repeat(indent);
    let yaml = '';

    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        yaml += `\n${spaces}${key}:${this.objectToYaml(value, indent + 2)}`;
      } else {
        yaml += `\n${spaces}${key}: "${String(value).replace(/"/g, '\\"')}"`;
      }
    });

    return yaml;
  }

  private static parseYaml(yamlText: string): any {
    // Parser YAML simples para nosso caso específico
    const lines = yamlText.split('\n');
    const result: any = {};
    const stack: any[] = [result];
    let currentIndent = 0;

    lines.forEach(line => {
      if (line.trim() === '') return;

      const indent = line.length - line.trimStart().length;
      const content = line.trim();

      if (content.includes(':')) {
        const [key, ...valueParts] = content.split(':');
        const value = valueParts.join(':').trim();

        // Ajustar stack baseado no indent
        while (stack.length > 1 && indent <= currentIndent) {
          stack.pop();
          currentIndent -= 2;
        }

        const current = stack[stack.length - 1];

        if (value === '' || value === '{}') {
          // É um objeto
          current[key.trim()] = {};
          stack.push(current[key.trim()]);
          currentIndent = indent;
        } else {
          // É um valor
          current[key.trim()] = value.replace(/^"(.*)"$/, '$1');
        }
      }
    });

    return result;
  }

  static getMarkdownFileName(pageSlug: string, language: string): string {
    return `${pageSlug}.${language}.md`;
  }
}
