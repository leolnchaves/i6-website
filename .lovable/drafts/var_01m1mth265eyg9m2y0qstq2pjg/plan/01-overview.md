Ajuste comercial do cartão "Decision Suite" na hero da home

Objetivo
--------
Deixar a descrição do primeiro card (i6 Decision Suite) mais comercial e auto-vendável, conforme a opção escolhida: substituir "Plataforma" por "Produto" e fechar com a promessa de operação dentro do ecossistema do cliente.

Escopo
------
- Apenas `src/components/home-v3/HeroSuite.tsx`.
- Apenas o campo `suiteDescription` do objeto `copyByLang` (PT, EN, ES).
- Nenhuma mudança estrutural, de layout, de título ou de animação.

Textos finais
-------------
- **PT**: `Produto pronto para uso que captura sinais, converte em decisões e entrega resultados acelerados direto no seu ecossistema.`
- **EN**: `Ready-to-use product that captures signals, converts them into decisions and delivers accelerated results directly into your ecosystem.`
- **ES**: `Producto listo para usar que captura señales, las convierte en decisiones y entrega resultados acelerados directamente en tu ecosistema.`

Validação
---------
- `bunx tsgo --noEmit` sem erros.
- `bun run build` sem erros.
- Screenshot no preview verificando os três idiomas (PT, EN, ES) e desktop/mobile.
- Sem release/deploy.
