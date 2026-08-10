# Ajuste da camada sobre o vídeo do hero (PT)

## Problema
A camada neutra usa `backdrop-filter: blur(...)`, que desfoca a arte inteira. O resultado parece "fora de foco" em vez de apenas menos vibrante, e ainda compete visualmente com o texto do hero.

## Solução
Trocar o efeito de desfoque por atenuação de cor:

1. Remover completamente o `backdrop-filter` / `WebkitBackdropFilter` da camada neutra — nada de blur.
2. Atenuar o vídeo pelo próprio filtro de imagem: menos saturação e menos brilho, mantendo o traço nítido (`saturate(0.5) brightness(0.6) contrast(0.95)`).
3. Manter apenas um véu navy plano bem leve (`rgba(11,18,36,0.18)`) para uniformizar o tom com o fundo.
4. Manter as vinhetas navy nas bordas e o glow coral como estão (garantem que não apareça moldura).

Resultado esperado: arte nítida, cores discretas e sem disputa de leitura com o título/parágrafo.

## Detalhes técnicos
Arquivo: `src/components/hometeste/HeroDecisaoV4.tsx`, camada de fundo em vídeo (bloco `isPt`). Ajuste no `style.filter` do `<video>` e do `<img>` de fallback, e no div "quadro neutro".
