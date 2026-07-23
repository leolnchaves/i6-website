## Diagnóstico

`DarkLayout` envolve header e footer em wrappers `relative z-[20]` irmãos. Isso cria stacking contexts isolados: o `z-50` do menu mobile só vale dentro do wrapper do header, então o footer (irmão com o mesmo `z-[20]`, pintado depois) fica por cima do menu. Como o footer não é sobreposto, o "scroll" que o usuário faz dentro do menu na verdade rola o footer visível atrás, dando a sensação de menu travado.

## Plano

1. **Elevar o stacking context do header acima do footer** em `src/components/DarkLayout.tsx`:
   - Wrapper do header: `z-[60]` (fica acima do footer).
   - Wrapper do footer: mantém `z-[20]`.
   - Main: mantém `z-[10]`.

2. **Ajustar o menu mobile** em `src/components/hometeste/HeaderNovo.tsx` para consistência:
   - Manter overlay `fixed inset-x-0 top-[80px] bottom-0` com `z-[55]` (dentro do novo contexto do header, portanto acima do footer).
   - Nenhuma mudança de conteúdo/layout do menu.

3. **Escopo**
   - Só `DarkLayout.tsx` e `HeaderNovo.tsx`.
   - Desktop e demais páginas não são afetados; a correção passa a valer para todas as rotas que usam `DarkLayout` (Blog, Research, Insights, Solutions, etc.).