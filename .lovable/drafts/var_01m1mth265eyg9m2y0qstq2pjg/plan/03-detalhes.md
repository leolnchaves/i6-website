## Detalhes técnicos

Alteração restrita a `src/components/home-v3/BuilderSection.tsx` (mais um ajuste de largura no wrapper em `src/pages/HomeTeste.tsx`, se necessário para o full-bleed).

- `<section id="builder-platform">` recebe `bg-[#0B1224] text-white` diretamente, sem `rounded-[2.5rem]`, sem `max-w-7xl` no elemento de fundo e sem `px-6` externo. O conteúdo interno segue em um container `max-w-7xl mx-auto`.
- Pilares: grade `sm:grid-cols-2 lg:grid-cols-4`, cada item com `border-l border-white/20 pl-5`, título Sora e descrição em `text-white/60`. Mantidos os quatro títulos e descrições atuais de `copyByLang` (sem mudar texto); os ícones lucide atuais deixam de ser usados nesse layout.
- Faixa dividida: `grid lg:grid-cols-2 w-full` com `border-t border-b border-white/10`, sem `rounded`, encostando nas bordas da seção.
  - 01 Embedded (OEM): fundo areia `#F7F3F0`, texto navy.
  - 02 Novo Produto: fundo navy mais claro que a seção (`#131E38`) com filete `border-l border-white/10`, dando o contraste suave pedido.
  - Conteúdo vem de `builderCopy[lang].persona.modes` (título, descrição quando existir e `points`), com marca de verificação coral no lugar dos pontos redondos.
- CTAs: mesmos `Link` para `/i6-builders` e `/contact`, alinhados à esquerda (`justify-start`) no container, mantendo o estilo coral + contorno já usado na home.
- Altura alvo: caber em uma viewport de 1280×800 com paddings verticais compactos; validação em PT/EN/ES, 1280×800, 1440×900 e 390×844, mais typecheck e build.

Não muda: hero, Decision Suite, demais seções da home, rotas, âncora `#builder-platform` e textos de conteúdo.
