## Ajuste em `src/components/hometeste/HeroDecisaoV4.tsx`

Manter a proporção da imagem (sem esticar), aumentar o cap de altura para que a largura cresça e chegue à borda horizontal disponível, e descer o wrapper para o espaço entre o título e o bloco descrição+CTA.

Uma única mudança na linha 14–15:

- Wrapper externo: `top-[8vh]` → `top-[26vh]`
- Wrapper interno: `h-[min(62vh,780px)]` → `h-[min(78vh,980px)]`

Nada mais muda: título continua em `pt-[16vh]`, bloco descrição+CTA em `bottom-[5vh]`, máscara, opacidade e classes de imagem (`h-full w-auto max-w-none`) permanecem. Se ainda faltar largura no MacBook 13", aumento o cap para 88vh em micro-ajuste.