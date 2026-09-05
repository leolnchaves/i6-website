# Formulários de /i6-builders e /community

## Conferência (já feita, sem alterar nada)

Os dois formulários são o mesmo componente de contato usado no resto do site, com o mesmo caminho de envio:

- Enviam para o mesmo endereço do Google Apps Script, que grava a linha na planilha e repassa o lead ao i6 HUB.
- Passam pela mesma normalização de campos (todos os campos obrigatórios como texto, chave única por envio para evitar linha duplicada, origem limitada a 50 caracteres).
- Têm honeypot anti-robô e o mesmo aviso de sucesso.

Diferença única entre eles: a etiqueta de origem do lead — `i6-builders` e `i6-comunidade`.
