

# Ajustes no i6Signal highlight e layout dos bullets

## Mudancas em `src/components/hometeste/SinaisSection.tsx`

### 1. Remover borda do destaque i6Signal

- Remover `border border-[#F4845F]/20` e `rounded-2xl` do container do i6Signal
- Manter apenas o fundo sutil `bg-white/[0.03]` com padding
- Adicionar uma linha horizontal fina embaixo do bloco: `border-b border-[#F4845F]/20` como separador sutil e moderno

### 2. Linha vertical conectora alinhada ao GIF

- Mover a linha vertical conectora para ficar colada ao topo do GIF (remover `mb-2` e ajustar posicionamento)
- A linha sai do `border-b` do i6Signal e desce ate o GIF, sem espaco entre eles

### 3. Reordenar no mobile/tablet

- No mobile e tablet (`lg:` breakpoint), a ordem sera:
  1. i6Signal destaque + linha conectora
  2. GIF
  3. Bullets (capabilities)
- Usar `order` classes do Tailwind: no grid de duas colunas, no mobile o GIF vem primeiro (`order-1`) e os bullets depois (`order-2`); no desktop, bullets ficam a esquerda (`lg:order-1`) e GIF a direita (`lg:order-2`)

### 4. Alinhar bullets ao final do GIF (desktop)

- No grid de duas colunas, trocar `items-start` por `items-end` para que os bullets fiquem alinhados ao fundo do GIF
- Isso faz com que a coluna esquerda (bullets) se alinhe pela base com a coluna direita (GIF)

### 5. GIF colado na linha conectora

- Remover espacos extras entre a linha conectora e o bloco de duas colunas
- Usar `mb-0` e `mt-0` para eliminar gaps

## Resumo visual

```text
Desktop:
[===== i6Signal texto sem borda, com border-bottom sutil =====]
                              |  (linha vertical fina)
[3 bullets alinhados embaixo] [GIF grande com popups]

Mobile/Tablet:
[===== i6Signal texto =====]
            |
[GIF grande]
[3 bullets]
```

## Arquivo alterado
- `src/components/hometeste/SinaisSection.tsx`

