

# Ajustes na Secao Sinais - Bullet i6Signal em destaque e GIF maior

## Mudancas em `src/components/hometeste/SinaisSection.tsx`

### 1. Bullet do i6Signal em destaque, full-width

- Separar o terceiro capability ("i6Signal, interface conversacional preditiva.") dos demais bullets
- Colocar esse bullet **acima** do bloco de duas colunas (capabilities + GIF), ocupando toda a largura da tela
- Atualizar o texto para:
  - PT: "i6Signal - Interface conversacional preditiva que transforma, em tempo real, sinais de IA aplicada em decisoes acionaveis."
  - EN: "i6Signal - Predictive conversational interface that transforms, in real time, applied AI signals into actionable decisions."
- Estilizar com o icone BarChart3 (mesmo atual), texto maior (`text-base md:text-lg`), com uma linha/borda inferior que "desce" visualmente em direcao ao GIF, criando conexao visual
- Adicionar uma linha vertical decorativa (`border-l-2 border-[#F4845F]/30`) saindo desse bullet em direcao ao GIF abaixo

### 2. Demais bullets permanecem iguais

- Os 3 bullets restantes (Motores de IA, Base fundacional, APIs de ativacao) ficam na coluna esquerda como estao hoje, sem esticar
- Remover o bullet do i6Signal da lista de capabilities para nao duplicar

### 3. GIF maior no desktop

- Alterar o grid de `lg:grid-cols-2` para `lg:grid-cols-[1fr_1.4fr]` para dar mais espaco ao GIF no desktop
- Reduzir o `gap` de `lg:gap-16` para `lg:gap-10` para o GIF ficar mais proximo dos bullets
- Remover o texto descritivo abaixo do GIF (ja que agora o bullet acima cumpre esse papel)

### 4. Layout final

```text
[Badge]
[Titulo + Subtitulo]
[6 cards em grid]

[===== i6Signal bullet full-width com linha conectora =====]
         |
         v
[3 bullets restantes]  [GIF grande com popups]
```

## Arquivos alterados
- `src/components/hometeste/SinaisSection.tsx`

