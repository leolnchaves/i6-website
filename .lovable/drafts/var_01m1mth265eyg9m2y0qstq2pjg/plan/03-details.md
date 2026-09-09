## O que muda

- Espaço entre o cabeçalho e o início da página fica menor, e a folga abaixo do
  título também encurta um pouco.
- A imagem do destaque fica um pouco menos alta em telas grandes.
- O cartão com data e tempo de leitura sobe alguns pixels dentro da imagem, para
  ficar inteiramente acima da dobra.
- Nada muda no celular nem em tablets: lá o cartão já aparece na sequência.

## Detalhes técnicos

- `src/components/blog/BlogIntro.tsx`: `pt-32 pb-10 md:pt-40 md:pb-14` →
  `pt-24 pb-6 md:pt-28 md:pb-8`.
- `src/components/blog/BlogHero.tsx`: altura da imagem `lg:h-[520px]` →
  `lg:h-[420px]`; cartão flutuante `lg:bottom-10` → `lg:bottom-6`;
  `pb-12 md:pb-16` → `pb-10 md:pb-12`.
- Sem alteração de textos, traduções, ordem de seções, dados ou rotas.

## Verificação

- Playwright em 1280×800 e 1440×900 (PT/EN/ES): confirmar que o cartão com
  tempo de leitura está inteiramente dentro da primeira tela, sem rolagem.
- 390×844: cartão continua empilhado logo abaixo da imagem, sem overflow.
- `bun run build`.
