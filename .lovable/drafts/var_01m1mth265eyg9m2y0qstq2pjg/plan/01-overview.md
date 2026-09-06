# Correção da tipagem do conteúdo de research

Nesta rodada não há nenhuma mudança visual. O objetivo é fazer com que cada peça de research diga explicitamente o que ela é, em vez de o site adivinhar pela pasta onde o arquivo está.

Hoje as duas peças reais de research não têm o campo de tipo preenchido e só aparecem porque existe uma regra antiga que assume "sem tipo = research". Isso é frágil: qualquer conteúdo novo mal classificado entra na página sem aviso.

## O que muda

1. A rotina que traz o conteúdo do i6 HUB passa a gravar o tipo da peça: usa o tipo que vier do HUB e, quando não vier, grava "i6 Research". Nenhum outro dado gravado por ela muda.
2. As duas peças reais existentes (versão PT e EN da matéria sobre ruptura de gôndola) recebem o tipo "i6 Research" no cabeçalho do arquivo. Nada mais nesses arquivos é alterado.
3. A página de research passa a aceitar apenas peças com tipo "i6 Research" ou "i6 eBook". A regra antiga do "sem tipo" é removida. Uma peça sem tipo, ou com tipo diferente, é simplesmente ignorada — sem quebrar o site — e, durante o desenvolvimento, aparece um aviso no console citando o identificador da peça descartada, para achar rápido conteúdo mal classificado.
