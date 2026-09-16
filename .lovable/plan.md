# Padronização dos links do i6 Decision Suite

## Objetivo
Garantir que todas as chamadas gerais para o i6 Decision Suite abram o endereço correto:

`https://i6decision.ai`

## Resultado da auditoria
Foram encontrados três formatos no site:
- `https://www.i6decision.ai` no menu, rodapé e CTAs compartilhados da home e de Cases de Sucesso
- `https://i6decision.ai` no CTA final de `/our-ai`
- Uma constante compartilhada ainda definida com `www`, usada por mais de um CTA

Os textos “Acesse”, “Conhecer”, “Explore” e equivalentes em espanhol estão coerentes com a função de cada chamada. A correção necessária é no destino, não na redação.

## Implementação
- Definir `https://i6decision.ai` como endereço único do i6 Decision Suite
- Fazer menu, menu mobile, rodapé e todos os CTAs gerais reutilizarem esse mesmo endereço
- Remover URLs duplicadas nesses pontos para evitar divergências futuras
- Preservar abertura em nova aba e proteção `noopener noreferrer`
- Não alterar links de pesquisas externas, páginas internas, contato ou i6 Builder Platform
- Não criar links para produtos individuais ainda marcados como não publicados

## Verificação
- Conferir a chamada “Acesse o i6 Decision Suite” no menu desktop e mobile
- Conferir os CTAs da home, de `/our-ai`, da listagem de Cases de Sucesso e de um case individual
- Conferir o link do rodapé
- Validar PT, EN e ES
- Confirmar que não resta nenhuma ocorrência de `www.i6decision.ai` ou `app.i6decision.ai`
- Validar compilação e ausência de erros no navegador

Sem publicação ou release nesta etapa
