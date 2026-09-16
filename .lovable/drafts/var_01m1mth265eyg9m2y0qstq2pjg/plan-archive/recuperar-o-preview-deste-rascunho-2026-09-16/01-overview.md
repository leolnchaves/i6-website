# Recuperar o preview deste rascunho

## Diagnóstico confirmado

- O site responde localmente com **HTTP 200** em `/pt/`
- O processo do preview está ativo
- Não há erro de compilação ou execução registrado
- O erro ocupa o preview inteiro, portanto não está ligado a uma página específica

Isso aponta para uma falha entre o painel da Lovable e o servidor deste rascunho, não para uma falha no código do site

## Ação proposta

1. Reiniciar uma única vez o servidor de preview supervisionado
2. Aguardar o endereço local responder novamente
3. Abrir `/pt/` pelo painel e confirmar visualmente o carregamento
4. Se o painel ainda mostrar 503, preservar o código e tratar como falha da infraestrutura do preview

Nenhum conteúdo, configuração do site, release ou deploy será alterado
