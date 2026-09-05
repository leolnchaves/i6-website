# Ajuste no CTA final de /i6-builders

Ajustar o bloco final da página `/i6-builders` para remover o botão primário e transformar os links secundários em chamadas com seta, replicando o comportamento visual da seção "Como funciona".

## O que muda

- **Remover** o botão "Fale com o time" (CTA primário) do `BuilderFinalCTA`.
- **Alterar** os links de texto "Comunidade" e "Documentação" para:
  - PT: `Entre na comunidade i6 Builders →` e `Ver documentação completa →`
  - EN: `Join the i6 Builders community →` e `View full documentation →`
  - ES: `Únete a la comunidad i6 Builders →` y `Ver documentación completa →`
- **Replicar** o estilo e o hover da setinha usado no link "Ver documentação completa" da seção `BuilderHowItWorks` (seta desloca para a direita no hover).
- **Preservar** a navegação localizada (`useLocalizedPath`) para `/community` e `/docs`.

## Fora de escopo

- Nenhuma mudança no formulário de contato, no endpoint de leads, no honeypot ou no `lead_uid`.
- Nenhuma alteração em outras páginas ou na pipeline de deploy.
- Nenhum release/publicação.