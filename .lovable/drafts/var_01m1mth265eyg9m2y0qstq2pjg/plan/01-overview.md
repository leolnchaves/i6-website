# Efeito de digitação no painel de código do /i6-builders

Adicionar uma animação typewriter no painel de código da hero de `/i6-builders`, para que o snippet pareça estar sendo digitado em tempo real. A proposta preserva o conteúdo trilíngue existente, mantém acessibilidade e oferece fallback para quem prefere motion reduzida.

## O que vai mudar

- O painel de código da hero passa de estático para animado.
- Um cursor pisca ao final de cada linha (ou do bloco inteiro, conforme a escolha).
- A animação respeita `prefers-reduced-motion`: usuários com essa preferência veem o código completo imediatamente.
- O conteúdo continua vindo de `src/data/i6Builders/content.ts` (PT/EN/ES).

## Decisões pendentes

1. **Granularidade da digitação**: caractere por caractere (mais realista) ou linha por linha (mais legível e leve).
2. **Comportamento ao terminar**: pausa com cursor piscando, reinício automático após X segundos, ou para definitivamente.
3. **Escopo do efeito**: aplicar só no `/i6-builders` ou transformar em componente reutilizável para outros painéis de código do site (ex: `/community`).
