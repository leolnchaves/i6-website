## Diagnóstico
A altura da imagem hoje é **limitada pela largura**, não pelo `max-h`. A imagem tem aspecto ~2.8:1 (1400×500) e usa `object-contain`. Com `w-[90%]` em um container ~900px, a largura efetiva (~810px) força uma altura de ~290px — já **abaixo** do `max-h-[45vh]` (~335px em 745px de viewport). Ou seja: mudar `max-h` de 50vh→45vh não teve efeito visível porque o teto já não estava ativo.

## Solução
Reduzir a **largura** da imagem para efetivamente reduzir sua altura em ~10% (aspecto travado): `w-[90%]` → `w-[81%]`. Isso corta ~10% em ambas as dimensões, mantendo proporção e nitidez.

## Passos
1. Em `src/components/hometeste/HeroDecisaoV4.tsx`, alterar `heroImageWidth = 'w-[90%]'` para `'w-[81%]'`.
2. Manter `max-h` como está (não é o gargalo).
3. Mobile intocado.

## Detalhes técnicos
- Sem reprocessar assets.
- Se o usuário quiser mais/menos, ajustamos apenas esse valor.
