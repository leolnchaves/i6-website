## Implementação proposta

### 1. Hook de typewriter

Criar um hook leve em `src/hooks/useTypewriter.ts` que receba um array de strings (linhas de código) e devolva:

- `displayedLines`: array com o texto já "digitado".
- `currentLineIndex`: índice da linha em digitação.
- `currentCharIndex`: quantos caracteres da linha atual já apareceram.
- `isDone`: booleano para controlar cursor e reinício.

O hook usará `useEffect` com `setTimeout` (ou `requestAnimationFrame`) para avançar caractere por caractere, com velocidade configurável. Respeitará `prefers-reduced-motion` devolvendo tudo pronto imediatamente.

### 2. Ajuste no `BuilderHero.tsx`

Substituir o bloco estático `<pre><code>` por uma versão que consuma o hook:

- Renderizar cada linha já digitada por completo.
- Na linha ativa, renderizar apenas os caracteres correspondentes a `currentCharIndex`.
- Adicionar um cursor (`|`) ao final da linha ativa (ou de todo o bloco quando `isDone`).
- Manter o destaque de comentários (`text-white/35`) e o restante do estilo visual.

### 3. Conteúdo trilíngue

As linhas continuam vindo de `src/data/i6Builders/content.ts`. Não é necessário alterar os textos, apenas a forma de renderização. O hook recebe `copy.codeLines` como entrada.

### 4. Acessibilidade e motion

- Verificar `window.matchMedia('(prefers-reduced-motion: reduce)')` no hook.
- Se ativo, exibir todo o código de uma vez, sem animação.
- Adicionar `aria-label` descritivo no painel, informando que se trata de um exemplo de código.
- Opcionalmente, esconder o cursor de leitores de tela com `aria-hidden`.

### 5. Comportamento ao finalizar

Opções a escolher:

- **A. Pausa com cursor piscando**: a animação para no final e o cursor continua piscando.
- **B. Loop com pausa**: após 3-4 segundos, apaga tudo e recomeça.
- **C. Pausa definitiva**: para e mantém o código completo visível.

Recomendação padrão: **A**, menos distrativa para quem fica na página lendo.

### 6. Testes e validação

- Build (`bun run build`).
- Checagem de tipos (`tsgo`).
- Screenshots em PT/EN/ES, desktop e mobile, verificando que o painel não quebra o layout durante a animação.
- Verificação de `prefers-reduced-motion` via emulação no DevTools.

## Arquivos envolvidos

- `src/hooks/useTypewriter.ts` (novo)
- `src/components/i6-builders/BuilderHero.tsx` (ajuste no painel de código)
- `src/data/i6Builders/content.ts` (sem alteração de conteúdo, apenas consumo)
