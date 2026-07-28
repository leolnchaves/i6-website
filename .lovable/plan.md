## Objetivo

Deixar o `/kiosk` resiliente a internet ruim **sem service worker**: depender da rede só na primeira carga, e depois rodar tudo a partir do que já está na memória / cache do navegador.

## O que já está a favor (verificado)

- `Kiosk` é importado **eagerly** em `src/App.tsx` — não há chunk lazy para baixar no meio da demo.
- Todos os dados do quiz, demos, i6 Signal e textos estão em arquivos TS **dentro do bundle** — nenhum `fetch` de Markdown ou API durante a experiência.
- Métricas já vão para `localStorage`.
- Os assets buildados têm hash no nome, então o cache HTTP do navegador os serve nas recargas seguintes.
- Assets de imagem do kiosk são poucos: `avatar-ricardo.jpg` e o logo horizontal.

Ou seja: uma vez carregada a página, a experiência inteira já roda sem rede. Os pontos frágeis são (a) recarregar/reabrir a aba, (b) imagens que só baixam no meio do fluxo, (c) o POST do CTA de eBook.

## O que será feito

**1. Warm-up de assets na tela de atração**
- Pré-carregar, ainda na `AttractScreen`, tudo que aparece depois: `avatar-ricardo.jpg`, logo e demais imagens usadas nas demos.
- Assim, se a rede cair durante o uso, nada aparece quebrado no meio do fluxo.

**2. CTA de eBook: envio online primeiro, fila só como fallback**
- O comportamento padrão continua **exatamente como é hoje**: monta o `FormData` (com `subscription`, `insight_id`, UTMs, contexto) e faz o `POST` para o Apps Script.
- Se o POST for bem-sucedido, nada muda — nada é gravado localmente.
- Somente se o envio falhar (erro de rede, timeout, ou `navigator.onLine === false`), o lead é gravado em `localStorage` via um novo `src/lib/leadQueue.ts`.
- Timeout curto no fetch (via `AbortSignal.timeout`) para que uma rede lenta não deixe o visitante esperando — passa para a fila e segue.
- **O usuário nunca vê erro:** a tela de sucesso aparece nos dois casos.
- Reenvio automático dos pendentes no load do kiosk, no evento `online` e periodicamente. Cada item tem `id` e só sai da fila após um POST sem exceção.

**3. Recuperação de sessão em caso de recarga**
- Persistir o estado do kiosk (idioma, rota do quiz, solução selecionada) em `sessionStorage`, para que um refresh acidental não jogue o visitante fora do fluxo.

**4. Visibilidade em `/kiosk-metrics/<token>`**
- Contagem de leads pendentes, botão "Reenviar pendentes" e "Exportar leads pendentes (CSV)" como rede de segurança se o evento acabar sem internet.

**Fora do escopo:** a fonte local (Rubik continua vindo do Google Fonts como hoje).

## Impacto e risco

- **Lógica do kiosk (quiz, demos, Signal):** intocada.
- **`EbookCTA.tsx`:** o caminho feliz (com internet) permanece idêntico ao atual; a fila só entra no caminho de erro, que hoje mostra mensagem de falha.
- **Sem service worker**, então nenhum risco de HTML/chunk velho preso em cache após deploy.
- Sem a fonte local, se a rede cair a tipografia pode cair no fallback do sistema em uma recarga — cosmético, sem quebra funcional.

## Nota técnica

O POST é `mode: 'no-cors'`, então a resposta é opaca: só é possível detectar falha de rede (exceção do `fetch`), não erro de aplicação no Apps Script. Isso já é verdade hoje; a fila apenas aproveita esse mesmo sinal.

## Limite conhecido

Sem service worker, **abrir a aba do zero com a internet totalmente fora não funciona** — o navegador precisa da rede (ou do cache HTTP ainda válido) para o HTML inicial. Recomendação operacional: carregar `/kiosk` com internet no início do dia e **não fechar a aba**.
