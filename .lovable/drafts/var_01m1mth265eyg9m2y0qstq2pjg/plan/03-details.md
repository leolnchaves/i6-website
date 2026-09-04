# Detalhes técnicos

## `src/hooks/useTypewriter.ts` (reescrever a máquina de estados)

- Entrada continua `lines: string[]`; internamente junta com `'\n'` e conta **caracteres** (a quebra de linha conta como um passo).
- Retorna `{ typedCount, isDone, reducedMotion }`:
  - `typedCount` — quantos caracteres do texto completo já foram "digitados".
  - `isDone` — true ao final (o componente passa a usar para manter o cursor piscando).
  - `reducedMotion` — inalterado: quando ativo, `typedCount = total` imediato.
- Timing por passo, via `setTimeout` recursivo:
  - caractere comum: `40 + (Math.random() * 30 - 15)` ms
  - após um `'\n'`: os ~40ms base + `350` ms extras
  - `startDelay` inicial de 400ms mantido
- Sem loop: ao atingir o total, apenas `setIsDone(true)`.

## `src/components/i6-builders/BuilderHero.tsx` (render por linha com fantasma)

Para cada linha `i`, o componente calcula quantos caracteres dela já foram digitados a partir de `typedCount` e do offset acumulado das linhas anteriores:

```text
┌─ linha (relative, block, whitespace-pre) ─────────────┐
│  fantasma: linha completa, invisível (reserva largura) │
│  overlay:  absolute inset-0, fatia digitada + cursor   │
└────────────────────────────────────────────────────────┘
```

- Fantasma com `invisible` (mantém espaço, some visualmente). Linhas vazias usam `\u00A0` no fantasma para preservar a altura da linha.
- Overlay absoluto com a fatia `line.slice(0, typed)`; comentários (`#`) mantêm `text-white/35`.
- Cursor renderizado **dentro do overlay**, logo após o último caractere digitado da linha ativa — acompanha a digitação; após `isDone`, fica piscando no fim da última linha.
- `prefers-reduced-motion`: renderiza o código completo direto (sem fantasma/overlay, sem `sr-only` duplicado) — caminho atual preservado.
- `aria-hidden={!reducedMotion}` no bloco animado + `<pre className="sr-only">` com o código completo — inalterado.

## Conteúdo

`codeLines` em `src/data/i6Builders/content.ts` (PT/EN/ES) **não muda** — apenas a animação.

## Verificação

1. `bun run build` e `tsgo` sem erros.
2. Playwright: captura em PT/EN/ES, desktop e mobile, em três momentos — início da animação (parcial, cursor no meio de uma linha), meio e fim (cursor piscando ao final).
3. Checagem de DOM: `aria-hidden`, `sr-only` presente, e emulação de `prefers-reduced-motion` mostrando tudo de imediato.
