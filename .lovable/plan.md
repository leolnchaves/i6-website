## Objetivo
No `/kiosk`, os campos **Nome** e **E-mail** devem abrir um **teclado on-screen** (o totem é touchscreen, sem teclado físico) e o campo de e-mail deve exibir **sugestões dinâmicas de domínio** (`@gmail.com`, `@hotmail.com`, `@outlook.com`, `@yahoo.com`, `@icloud.com`).

## Onde
- `src/components/kiosk/EbookCTA.tsx` — inputs de Nome / E-mail do form final.

## Escopo

### 1. Teclado virtual (novo componente `KioskOnScreenKeyboard.tsx`)
- Renderizado como **overlay fixo** na base da tela (posição `fixed`, ergonômico para totem retrato de 27").
- Duas variantes de layout, controladas por prop `layout`:
  - `text` (para Nome): QWERTY completo com maiúsculas/minúsculas via Shift, espaço, backspace, "Concluir".
  - `email` (para E-mail): QWERTY + linha superior com `@ . _ -` + tecla `.com` + backspace + "Concluir". Sem Shift (mantém minúsculas por padrão, mais rápido para e-mails).
- Aparece quando o input recebe foco (ou ao toque) e desaparece ao clicar em "Concluir" ou fora dos campos.
- Cada tecla usa unidades `vmin` (consistente com o kiosk) e altura mínima confortável para dedo (~7vmin), com feedback visual `active:scale-[0.95]`.
- Suprime o teclado nativo do SO (`readOnly` no input + gerenciamento manual do valor) para não competir com o teclado virtual.

### 2. Sugestões de domínio de e-mail
- Chips de sugestão renderizadas **acima do teclado** (ou logo abaixo do campo de e-mail) apenas quando:
  - o input de e-mail está em foco, **e**
  - o valor contém `@` **ou** tem pelo menos 2 caracteres sem `@`.
- Lista fixa (mais usados no Brasil/global): `gmail.com`, `hotmail.com`, `outlook.com`, `yahoo.com`, `icloud.com`, `uol.com.br`, `bol.com.br`.
- Comportamento:
  - Se **ainda não tem `@`**: sugere `{typed}@gmail.com`, `{typed}@hotmail.com`, etc. (até 4 chips).
  - Se **já tem `@`**: filtra domínios que começam com o texto após `@` e sugere `{local}@{domain}`.
- Ao tocar em uma sugestão: preenche o input completo e mantém o teclado aberto para eventual ajuste.

### 3. Integração com `react-hook-form`
- Manter validação `zod` existente.
- Como os inputs viram `readOnly` (para bloquear teclado nativo), o valor será controlado via `setValue()` do hook-form quando o teclado virtual insere/apaga caracteres.
- Preservar honeypot e fluxo de envio como está.

### 4. i18n
- Legendas das teclas de ação ("Concluir", "Espaço") em PT e EN, adicionadas em `src/data/kiosk/config.ts` sob `ebook`:
  - `keyboardDone: 'Concluir' | 'Done'`
  - `keyboardSpace: 'Espaço' | 'Space'`
  - `emailSuggestionsLabel: 'Sugestões' | 'Suggestions'`

## Fora de escopo
- Não altera o form de nenhuma outra página; só o CTA do totem.
- Não implementa acentuação/caracteres especiais além do necessário para e-mail.
- Não muda a estética/copy dos cards existentes — apenas adiciona o overlay e as chips.

## Arquivos afetados
- **Novo**: `src/components/kiosk/KioskOnScreenKeyboard.tsx`
- **Editado**: `src/components/kiosk/EbookCTA.tsx` (foco/onChange/readOnly + integração)
- **Editado**: `src/data/kiosk/config.ts` (labels PT/EN)
