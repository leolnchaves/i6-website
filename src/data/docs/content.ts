import type { Language } from '@/types/language';

export interface DocsUiCopy {
  eyebrow: string;
  title: string;
  searchLabel: string;
  searchPlaceholder: string;
  noResults: string;
  resultsCount: string;
  sampleTag: string;
  menuButton: string;
  tocTitle: string;
  prev: string;
  next: string;
  updatedAt: string;
  sampleNotice: string;
  empty: string;
  copyCode: string;
  copiedCode: string;
  playVideo: string;
  downloadLabel: string;
  downloadAction: string;
  relatedTitle: string;
  support: DocsSupportCopy;
}

export interface DocsSupportChannelCopy {
  label: string;
  description: string;
  availability?: string;
}

export interface DocsSupportCopy {
  title: string;
  body: string;
  comingSoon: string;
  emailAction: string;
  channels: {
    email: DocsSupportChannelCopy;
    whatsapp: DocsSupportChannelCopy;
    assistant: DocsSupportChannelCopy;
  };
}


/** UI chrome for the documentation area. Page content itself comes from the i6 HUB. */
export const docsUi: Record<Language, DocsUiCopy> = {
  pt: {
    eyebrow: 'DOCUMENTAÇÃO I6 BUILDER',
    title: 'Documentação',
    searchLabel: 'Buscar no conteúdo da documentação',
    searchPlaceholder: 'Buscar no conteúdo…',
    noResults: 'Nenhum resultado',
    resultsCount: '{count} resultado(s) encontrado(s)',
    sampleTag: '(exemplo)',
    menuButton: 'Sumário',
    tocTitle: 'Nesta página',
    prev: 'Anterior',
    next: 'Próxima',
    updatedAt: 'Atualizado em',
    sampleNotice: 'Conteúdo de exemplo — estrutura final, referência técnica real em preparação',
    empty: 'A documentação será publicada aqui em breve',
    copyCode: 'Copiar código',
    copiedCode: 'Copiado',
    playVideo: 'Reproduzir o vídeo',
    downloadLabel: 'Material para download',
    downloadAction: 'Baixar',
    relatedTitle: 'Leitura relacionada',
    support: {
      title: 'Suporte à implementação',
      body: 'Canais oficiais para tirar dúvidas durante a integração.',
      comingSoon: 'Em breve',
      emailAction: 'Enviar e-mail',
      channels: {
        email: {
          label: 'E-mail de suporte técnico',
          description: 'Envie dúvidas de implementação com o contexto do passo atual.',
          availability: 'Resposta em até 1 dia útil',
        },
        whatsapp: {
          label: 'WhatsApp',
          description: 'Atendimento direto para dúvidas rápidas de integração.',
          availability: 'Em breve',
        },
        assistant: {
          label: 'Assistente de suporte',
          description: 'Assistente de documentação e implementação da i6.',
          availability: 'Em breve',
        },
      },
    },
  },
  en: {
    eyebrow: 'I6 DOCUMENTATION',
    title: 'Documentation',
    searchLabel: 'Search the documentation content',
    searchPlaceholder: 'Search the content…',
    noResults: 'No results',
    resultsCount: '{count} result(s) found',
    sampleTag: '(sample)',
    menuButton: 'Contents',
    tocTitle: 'On this page',
    prev: 'Previous',
    next: 'Next',
    updatedAt: 'Updated on',
    sampleNotice: 'Sample content — final structure, real technical reference in preparation',
    empty: 'Documentation will be published here soon',
    copyCode: 'Copy code',
    copiedCode: 'Copied',
    playVideo: 'Play the video',
    downloadLabel: 'Downloadable material',
    downloadAction: 'Download',
    relatedTitle: 'Related reading',
    support: {
      title: 'Implementation support',
      body: 'Official channels to clear up questions during the integration.',
      comingSoon: 'Coming soon',
      emailAction: 'Send e-mail',
      channels: {
        email: {
          label: 'Technical support e-mail',
          description: 'Send implementation questions with the context of the current step.',
          availability: 'Reply within 1 business day',
        },
        whatsapp: {
          label: 'WhatsApp',
          description: 'Direct channel for quick integration questions.',
          availability: 'Coming soon',
        },
        assistant: {
          label: 'Support assistant',
          description: 'i6 documentation and implementation assistant.',
          availability: 'Coming soon',
        },
      },
    },
  },
  es: {
    eyebrow: 'DOCUMENTACIÓN I6',
    title: 'Documentación',
    searchLabel: 'Buscar en el contenido de la documentación',
    searchPlaceholder: 'Buscar en el contenido…',
    noResults: 'Ningún resultado',
    resultsCount: '{count} resultado(s) encontrado(s)',
    sampleTag: '(ejemplo)',
    menuButton: 'Contenido',
    tocTitle: 'En esta página',
    prev: 'Anterior',
    next: 'Siguiente',
    updatedAt: 'Actualizado el',
    sampleNotice: 'Contenido de ejemplo — estructura final, referencia técnica real en preparación',
    empty: 'La documentación se publicará aquí pronto',
    copyCode: 'Copiar código',
    copiedCode: 'Copiado',
    playVideo: 'Reproducir el video',
    downloadLabel: 'Material para descargar',
    downloadAction: 'Descargar',
    relatedTitle: 'Lectura relacionada',
    support: {
      title: 'Soporte a la implementación',
      body: 'Canales oficiales para resolver dudas durante la integración.',
      comingSoon: 'Muy pronto',
      emailAction: 'Enviar correo',
      channels: {
        email: {
          label: 'Correo de soporte técnico',
          description: 'Envía dudas de implementación con el contexto del paso actual.',
          availability: 'Respuesta en hasta 1 día hábil',
        },
        whatsapp: {
          label: 'WhatsApp',
          description: 'Atención directa para dudas rápidas de integración.',
          availability: 'Muy pronto',
        },
        assistant: {
          label: 'Asistente de soporte',
          description: 'Asistente de documentación e implementación de i6.',
          availability: 'Muy pronto',
        },
      },
    },
  },
};
