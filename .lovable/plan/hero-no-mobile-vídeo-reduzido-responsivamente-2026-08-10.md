# Hero no mobile: vídeo reduzido responsivamente

Hoje o vídeo usa `object-cover` em todas as larguras. Em telas estreitas o quadro é ampliado e cortado, então só aparece um pedaço da arte (o núcleo "Decisão Antecipada" e metade dos ramos), o que dá a impressão de layout quebrado.

## Abordagem (tentar reduzir antes de remover)

1. **Mobile (< 768px): trocar `object-cover` por `object-contain`**, com o vídeo alinhado ao centro da faixa entre o título e a descrição. Assim a arte inteira aparece em escala reduzida, sem corte.
2. **Confinar o vídeo à faixa central no mobile** em vez de `inset-0`: o container do vídeo passa a ocupar a área do meio (aprox. 30–38svh), deixando topo (título) e base (descrição + CTA) sobre fundo navy limpo e legível.
3. **Ajustar os gradientes de integração por breakpoint**: no mobile as bordas laterais escuras ficam mais suaves (a arte já não toca as laterais) e mantém-se o fade vertical topo/base para fundir com o navy.
4. **Desktop permanece exatamente como está** (`object-cover`, tela cheia, gradientes atuais).

## Fallback, se ainda ficar ruim

Se em `object-contain` a arte ficar pequena/ilegível no celular, o passo seguinte é não renderizar o vídeo abaixo de 768px e mostrar apenas o fundo navy com o glow coral (o poster estático também vira opção). Isso fica como segunda etapa, só se você não gostar do resultado reduzido.

## Detalhes técnicos

- Arquivo: `src/components/hometeste/HeroDecisaoV4.tsx`.
- Vídeo renderizado uma vez, com classes responsivas (`object-contain md:object-cover`) e container `absolute` posicionado na faixa central no mobile / `inset-0` em `md+`.
- `playsInline`, `muted`, `loop` e o poster de fallback mantidos; nenhuma mudança de peso de asset.
