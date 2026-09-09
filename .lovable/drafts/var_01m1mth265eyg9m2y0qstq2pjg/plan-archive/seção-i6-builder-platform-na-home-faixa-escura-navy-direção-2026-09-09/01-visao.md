# Seção i6 Builder Platform na home: faixa escura navy (direção validada)

Direção visual validada: **Navy com pilares em destaque** — a seção vira uma faixa escura
arredondada (#0B1224) com brilho coral sutil de fundo, modos de uso numerados em cartões à
esquerda, os quatro pilares em grade 2×2 com ícones à direita e os dois CTAs na base.

## Composição (uma tela, sem rolagem interna)

- Faixa escura em cartão grande arredondado (`rounded-[2.5rem]`) com preenchimento interno
  generoso, gradiente coral suave no canto direito e brilho difuso coral no canto inferior
  esquerdo.
- Abertura no topo à esquerda: rótulo "i6 Builder Platform" em coral, título e descrição
  atuais (textos preservados).
- Corpo em duas colunas:
  - **Esquerda — dois modos de uso empilhados**: 01 Embedded (OEM) e 02 Novo Produto, cada um
    em cartão escuro com número coral, nome, e três marcadores com bolinha coral. Textos
    reaproveitados da página do Builder (PT/EN/ES).
  - **Direita — quatro pilares em grade 2×2**: cada cartão com ícone em quadrado arredondado,
    título e uma linha descritiva. Ícones: raio (engines), terminal (SDK/API), nós de rede
    (toolkits), escudo (governança). O primeiro ícone com preenchimento coral; os demais com
    contorno claro e ícone coral.
- Base: os dois botões atuais — "Construir com o i6 Builder" (sólido coral, texto navy) e
  "Falar com especialista" (contorno claro) — lado a lado.

## Restrições mantidas

- Somente `src/components/home-v3/BuilderSection.tsx` muda; hero, Decision Suite e demais
  seções intactas.
- Textos PT/EN/ES preservados; modos vêm de `src/data/i6Builders/content.ts` (sem duplicar).
- Âncora `id="builder-platform"` e rotas dos CTAs inalteradas.
- Altura alvo abaixo de ~800 px no desktop; mobile empilha com rolagem da página.
