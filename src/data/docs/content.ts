import type { Language } from '@/types/language';

export interface DocsUiCopy {
  eyebrow: string;
  title: string;
  searchLabel: string;
  searchPlaceholder: string;
  noResults: string;
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
    searchLabel: 'Buscar na documentação',
    searchPlaceholder: 'Buscar página…',
    noResults: 'Nenhuma página encontrada',
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
    searchLabel: 'Search the documentation',
    searchPlaceholder: 'Search page…',
    noResults: 'No page found',
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
    searchLabel: 'Buscar en la documentación',
    searchPlaceholder: 'Buscar página…',
    noResults: 'Ninguna página encontrada',
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
