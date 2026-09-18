# Faixa de retroalimentação sem a seta animada

## O que muda

Na seção "Como funcionamos" (home), dentro do painel "i6 DECISION PLATFORM", a faixa de retroalimentação deixa de ter o conduíte/seta animada em SVG e passa a ser uma linha simples em três colunas:

```text
┌──────────────────────────────────────────────────────────────────┐
│  • RETREINAMENTO CONTÍNUO   Retroalimentação      RESULTADOS     │
│     (centralizado)          Cada decisão          COMPOSTOS      │
│                             executada volta...   (centralizado)  │
└──────────────────────────────────────────────────────────────────┘
```

- **Esquerda**: badge "• RETREINAMENTO CONTÍNUO" (ponto coral pulsante + texto maiúsculo coral), centralizado na coluna.
- **Centro**: título "Retroalimentação" + a frase explicativa, centralizados.
- **Direita**: badge "RESULTADOS COMPOSTOS" (texto maiúsculo), centralizado na coluna.
- No celular, as três partes empilham na vertical, tudo centralizado.
- Textos já existentes em PT/EN/ES são mantidos (sem alteração de copy).

## Detalhes técnicos

- `src/components/home-v3/HowItWorks.tsx`:
  - Remover o componente `LoopConduit` e a constante `LOOP_PATH`.
  - Reescrever a faixa (`mt-6 pt-5 border-t border-border`) como grid `md:grid-cols-[auto_minmax(0,1fr)_auto]`, com os dois badges centralizados (`flex items-center justify-center`) e o bloco de título+texto no centro (`text-center`).
  - Mobile: `flex flex-col items-center text-center gap-3`.
- `src/index.css`: remover os keyframes `signal-travel` e a utility `.animate-signal-travel` (ficam sem uso).
- Nada mais na seção é tocado: selo, cards 01–04, logos e rótulos (API) permanecem iguais.

## Validação

- `tsgo --noEmit` e build limpo.
- Playwright em PT/EN/ES, desktop (1280) e mobile (390): faixa em três colunas centralizada no desktop, empilhada no mobile, sem rolagem lateral.
