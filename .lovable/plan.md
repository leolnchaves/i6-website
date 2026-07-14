
# Landing Kiosk — Quiz → Demo → eBook (retrato, 1080×1920)

Landing dedicada em URL próprio, **fora do site** (sem header/footer, sem multi-idioma no header), otimizada para totem vertical multitoque de 10 pontos rodando em modo kiosk. Fluxo em 3 telas dentro da mesma rota.

## Rota e visibilidade

- Nova rota: **`/kiosk`** (idioma via `?lang=pt|en`, default `pt`).
- Fora do `DarkLayout` — sem `HeaderNovo`/`FooterNovo`/CookieBanner.
- `Helmet` com `noindex, nofollow`. Não entra em `sitemap.xml`, `llms.txt` nem no header.

## Comportamento kiosk (envolve todas as telas)

- Botão inicial "Iniciar experiência" dispara `requestFullscreen()` (browser exige gesto).
- **Auto-reset por inatividade**: 90 s sem toque → volta ao attract screen e zera o estado do quiz/demo.
- `user-select: none`, `oncontextmenu` bloqueado, `touch-action: manipulation` (sem zoom por double-tap, sem delay de 300 ms).
- Botões e chips com **alvo mínimo 72×72 px**. Tipografia escalada via `clamp()` para funcionar em 1080×1920 nativo.
- Sem links externos que tirem o visitante da experiência (nem para o site infinity6, exceto CTA final).

## Tela 0 — Attract screen

- Loop visual (partículas + call-to-action pulsante) com texto "Toque para começar".
- Tap → entra na Tela 1 e dispara fullscreen.

## Tela 1 — Quiz de qualificação

Perguntas de múltipla escolha derivadas das alavancas de `src/data/solutionsV2/content.ts` (Growth / Planning / Pricing). Objetivo: mapear o visitante para 1–3 soluções relevantes.

Perguntas propostas (2 a 3, respondidas com 1 tap cada):

1. **Qual é o seu maior desafio hoje?**
   - Crescer receita / conversão / ticket → territory `growth`
   - Prever demanda e evitar ruptura ou excesso → territory `planning`
   - Precificar melhor e proteger margem → territory `pricing`
   - _(seleção múltipla permitida)_

2. **Qual é o seu segmento?**
   - Varejo / Indústria / Farma / Marketplace / Serviços
   - _(usado só para personalizar copy do demo e do eBook, não filtra soluções)_

3. **Qual horizonte importa mais?**
   - Ação imediata (hoje / esta semana)
   - Planejamento tático (mês)
   - Estratégia (trimestre / ano)
   - _(usado para escolher o script padrão do i6Signal)_

Regra de filtragem: cada opção da pergunta 1 mapeia para um `territoryId` do `content.ts`. As soluções (`LeanSolutionCard`) desses territórios ficam visíveis na Tela 2; o resto some.

Estado do quiz vive em `useState` no `Kiosk.tsx` — nada em localStorage (kiosk é anônimo por sessão).

## Tela 2 — Demo personalizado

Layout vertical, empilhado:

```text
┌────────────────────────────┐
│  Eyebrow "SUAS ALAVANCAS"  │
│  Cards das soluções        │  ← só as filtradas pelo quiz
│  (LeanSolutionCard         │
│   adaptado, targets ≥72px) │
├────────────────────────────┤
│  Demo da solução escolhida │  ← aparece ao tocar num card
│  (bloco expandido inline)  │
├────────────────────────────┤
│  i6Signal demo             │  ← perguntas pré-definidas
│  (chips grandes, filtrados │     ligadas à solução escolhida
│   pela solução ativa)      │     e à resposta da pergunta 3
├────────────────────────────┤
│  CTA eBook (Tela 3)        │
└────────────────────────────┘
```

**Cards de alavancas**: reaproveitam a estética do `LeanSolutionCard.tsx` mas em versão kiosk (padding maior, ícone maior, sem hover — só estado ativo por toque).

**Bloco de demo da solução**: conteúdo textual + visual (gráfico simples ou tabela) por solução. Fonte: campos já existentes em `content.ts` (`overview`, `keyFeatures`, `businessResults`) + um payload novo `kioskDemo` por solução (KPI + 1 mini-visual) que adiciono ao `content.ts`. Sem mexer nas soluções renderizadas em `/solutions` — só campo adicional opcional.

**i6Signal embed**: nova variante `KioskSignalDemo` derivada de `src/components/solutions/I6SignalDemo.tsx`. Mesma lógica de scripts e destaque imediato ao tocar; UI redesenhada em vertical, chips grandes, sem menu lateral. As perguntas exibidas são filtradas por `solutionId` ativa (mapa novo `solutionId → questionIds`).

## Tela 3 — CTA eBook (gated)

Card fixo no final da Tela 2 (não é rota separada — abre modal fullscreen ao tocar).

- Título: "Receba o eBook `<nome do eBook mapeado à solução ativa>`".
- Formulário grande: **Nome + Email** (mesmo esquema Zod do `LeadGateForm`).
- Comportamento idêntico ao gated hoje:
  - POST para `APPS_SCRIPT_URL` com `subscription: "i6-kiosk:<solution-slug>"`, `token: SHARED_FORM_TOKEN`, campos de tracking do `getLeadContextFields()`.
  - i6Hub registra o lead e dispara o PDF do eBook por email.
- Tela de sucesso: "Enviamos o eBook para seu email — confira a caixa de entrada (ou SPAM)".
- Após 20 s na tela de sucesso, volta para a Tela 2 (ou attract, se ninguém interagir).

Mapa `solutionId → ebookAssetId` fica em `src/data/kiosk/ebooks.ts`. O PDF em si vive no i6Hub — o kiosk só passa o identificador via `subscription`, seguindo o padrão do `LeadGateForm`.

## Arquivos a criar

```text
src/pages/Kiosk.tsx                              ← rota + máquina de estados (attract/quiz/demo/success)
src/components/kiosk/KioskShell.tsx              ← fullscreen + inatividade + reset
src/components/kiosk/AttractScreen.tsx
src/components/kiosk/QuizStep.tsx                ← 1 pergunta por vez, chips grandes
src/components/kiosk/QuizProgress.tsx
src/components/kiosk/SolutionLeversStrip.tsx     ← cards das alavancas filtradas
src/components/kiosk/SolutionDemoBlock.tsx       ← demo expandido da solução ativa
src/components/kiosk/KioskSignalDemo.tsx         ← variante vertical do I6SignalDemo
src/components/kiosk/EbookCTACard.tsx            ← card fixo no fim da tela 2
src/components/kiosk/EbookLeadModal.tsx          ← modal fullscreen com form (nome+email)
src/hooks/useInactivityTimer.ts
src/hooks/useFullscreen.ts
src/data/kiosk/quiz.ts                           ← perguntas + mapeamento p/ territoryIds
src/data/kiosk/ebooks.ts                         ← solutionId → ebookAssetId + copy
```

## Arquivos a modificar

- `src/App.tsx`: registrar `<Route path="/kiosk" element={<Kiosk />} />` **fora** do `DarkLayout` e fora do `LocalizedRoutes`.
- `src/data/solutionsV2/content.ts`: adicionar campo opcional `kioskDemo?: { kpi: string; visual: 'bars' | 'line' | 'table'; data: ... }` em cada solução (não quebra nada existente).
- `public/sitemap.xml` e `public/llms.txt`: garantir que `/kiosk` **não** apareça (nenhuma mudança se já não estão listados — só validar).

## Reaproveitamento

- **Config de lead**: mesmo `APPS_SCRIPT_URL`, `SHARED_FORM_TOKEN`, `HONEYPOT_FIELD`, `getLeadContextFields()`, mesma estrutura de mensagem do `LeadGateForm.tsx`. Só muda o `subscription` para `i6-kiosk:<slug>`.
- **Design tokens**: mesmos do site (`#0B1224` bg, `#F4845F` accent). Nada de novo no `index.css`.
- **Tracker**: adicionar 3 eventos novos em `src/lib/tracker-events.ts` (`kiosk_session_started`, `kiosk_solution_selected`, `kiosk_ebook_requested`).

## Fora do escopo

- Publicação em domínio próprio (`totem.infinity6.ai`).
- Detecção de orientação (assume retrato).
- PWA / offline.
- Trocador de idioma dentro do kiosk (fixado via `?lang`).
- Multitoque com 2+ dedos (1 dedo resolve todo o fluxo).

## Validação antes de publicar

1. Testar `/kiosk?lang=pt` na preview forçando 1080×1920 via DevTools.
2. Confirmar fluxo completo: attract → quiz → demo filtrado por resposta → seleção de solução → i6Signal → CTA eBook → sucesso → auto-reset em 90 s.
3. Confirmar que `/kiosk` retorna `noindex` e não aparece em sitemap/llms/header.
4. Confirmar que o lead chega no i6Hub com `subscription: i6-kiosk:<slug>` e o email do PDF é disparado.
5. Release patch (v1.2.20) quando aprovado.
