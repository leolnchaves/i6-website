Ajustar a seção "EXEMPLOS DE SINAIS" para ter a mesma largura horizontal do demo i6 Signal.

Detalhes técnicos:
- O componente `I6SignalDemo` é limitado por `max-w-6xl mx-auto` (com `px-4` na section).
- O componente `SignalLayerBlock` envolve os exemplos em um container `max-w-7xl` com paddings `px-4 sm:px-6 lg:px-8`, fazendo com que o box de exemplos fique mais largo que o demo acima.
- Mudança: trocar o container dos exemplos para `max-w-6xl mx-auto` com padding consistente (`px-4`), removendo o `max-w-7xl` e paddings responsivos extras, para alinhar exatamente as bordas esquerda e direita do box "EXEMPLOS DE SINAIS" com o quadro do demo.
- Após a alteração, verificar a preview para confirmar o alinhamento.

Escopo: apenas apresentação/layout, nenhuma mudança de conteúdo ou funcionalidade.