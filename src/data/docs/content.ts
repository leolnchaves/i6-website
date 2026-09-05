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
}


/** UI chrome for the documentation area. Page content itself comes from the i6 HUB. */
export const docsUi: Record<Language, DocsUiCopy> = {
  pt: {
    eyebrow: 'DOCUMENTAÇÃO I6',
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
  },
};
