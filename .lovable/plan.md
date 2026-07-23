## Problema
O carrossel usa uma única `<div>` flex com `gap-20` e conteúdo duplicado (`[...partners, ...partners]`), animando `translateX(0 → -50%)`.

Como o `gap` também é aplicado entre o último item da primeira cópia e o primeiro da segunda, o ponto -50% da largura total **não coincide** com o início da segunda cópia — ele fica no meio desse gap. Resultado: ao chegar no fim (logo depois da SkyFit, hoje o último logo do MD), a animação salta/reseta visualmente em vez de continuar contínua.

## Correção
Editar apenas `src/components/hometeste/ClientesSection.tsx`:

1. Trocar o array `doubled` por **dois grupos irmãos idênticos**, cada um com `flex items-center gap-20 shrink-0`.
2. O container externo (o que anima) também usa `flex gap-20` e recebe `animate-marquee`. Assim o espaçamento entre o último item do grupo A e o primeiro do grupo B é o mesmo que entre quaisquer dois logos internos, e `translateX(-50%)` alinha perfeitamente no início do grupo B.
3. Manter tudo o resto (fade nas bordas, `overflow-hidden`, `animationDuration: '35s'`, tamanhos e opacidade dos logos, `usePartnersContent`, título PT/EN).

## Verificação
- Nenhuma alteração em CSS/keyframes (o `@keyframes marquee` de 0 → -50% já está correto para o padrão de duplicação com dois grupos).
- Sem mudanças em outros componentes, dados ou rotas.
