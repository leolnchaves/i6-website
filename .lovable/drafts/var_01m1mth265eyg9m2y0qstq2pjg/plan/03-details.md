## Ajuste a aplicar

Renomear a etiqueta de origem da página de comunidade de `i6-comunidade` para `i6-community`, alinhando com a URL.

- `src/lib/leadFormConfig.ts`: trocar o valor na lista de origens aceitas (`LeadSource`).
- `src/pages/Comunidade.tsx`: passar `leadSource="i6-community"` no formulário.
- Nenhuma outra rota, texto ou layout muda; o campo continua com menos de 50 caracteres, dentro do limite do HUB.

Efeito na planilha: leads antigos permanecem marcados como `i6-comunidade` e os novos entram como `i6-community`. Se você usa filtro ou regra por essa coluna, vale considerar as duas grafias.

## Verificação

Checagem de tipos e compilação. Sem envio de lead de teste, conforme você pediu.

## Publicação

Só publico release/deploy quando você pedir o incremento de versão.
