Plano para corrigir a imagem central da `/pt/home-v4`:

1. **Corrigir a causa do redimensionamento**
   - O container atual limita a imagem por altura (`top-[38vh] bottom-[22vh]`) e o `<img>` usa `object-contain` com `h-full`.
   - Como o asset é panorâmico, o navegador está preservando a proporção pela altura disponível, deixando a largura visual muito menor que o espaço horizontal.

2. **Trocar para dimensionamento guiado pela largura**
   - Remover o encaixe baseado em `top + bottom + h-full`.
   - Usar uma faixa central com largura responsiva maior (`w-screen`/`min()`/`clamp`) e altura automática pela proporção da imagem.
   - Manter `object-contain`, mas sem forçar `h-full`, para a imagem ocupar a largura sem distorcer.

3. **Reposicionar a faixa entre título e texto inferior**
   - Fixar o diagrama numa área central com `top` responsivo ou `translate-y` aplicado no wrapper correto.
   - Garantir distância do título e do bloco inferior em desktop e mobile.

4. **Ajustar responsividade**
   - Desktop: diagrama largo, ocupando praticamente todo o espaço horizontal disponível.
   - Telas menores: reduzir proporcionalmente sem cortar textos nem sobrepor CTA.
   - Manter o asset sem esticar artificialmente, preservando proporção.

5. **Validar visualmente**
   - Conferir `/pt/home-v4` em viewport desktop semelhante ao print enviado.
   - Confirmar que o diagrama fica centralizado, mais largo, legível e sem sobreposição com título, texto ou CTA.