interface Props {
  /** Cor da faixa que vem depois da quebra. */
  to: 'graphite' | 'sand';
}

/**
 * Quebra de seção não retangular. `clip-path` sobre um bloco de largura 100%
 * (nunca 100vw), portanto nunca gera rolagem horizontal.
 */
const BlogDivider = ({ to }: Props) => (
  <div
    aria-hidden="true"
    className={`h-[5vw] max-h-20 w-full ${to === 'graphite' ? 'bg-[#0B1224]' : 'bg-background'}`}
    style={{
      clipPath:
        to === 'graphite'
          ? 'polygon(0 100%, 100% 0, 100% 100%, 0 100%)'
          : 'polygon(0 0, 100% 0, 100% 100%, 0 0)',
    }}
  />
);

export default BlogDivider;
