
interface MarkdownFrontMatter {
  [key: string]: any;
}

interface ParsedMarkdown {
  frontMatter: MarkdownFrontMatter;
  content: string;
}

export const parseMarkdownFrontMatter = (markdownContent: string): ParsedMarkdown => {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = markdownContent.match(frontMatterRegex);

  if (!match) {
    return {
      frontMatter: {},
      content: markdownContent
    };
  }

  const frontMatterContent = match[1];
  const content = match[2];

  try {
    // Simple YAML-like parser for front matter
    const frontMatter: MarkdownFrontMatter = {};
    const lines = frontMatterContent.split('\n');
    
    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();
        
        // Remove quotes if present
        const cleanValue = value.replace(/^["']|["']$/g, '');
        
        // Try to parse as number or boolean
        if (cleanValue === 'true') {
          frontMatter[key] = true;
        } else if (cleanValue === 'false') {
          frontMatter[key] = false;
        } else if (!isNaN(Number(cleanValue)) && cleanValue !== '') {
          frontMatter[key] = Number(cleanValue);
        } else {
          frontMatter[key] = cleanValue;
        }
      }
    }

    return {
      frontMatter,
      content: content.trim()
    };
  } catch (error) {
    console.error('Error parsing front matter:', error);
    return {
      frontMatter: {},
      content: markdownContent
    };
  }
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

export const validateUUID = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};
