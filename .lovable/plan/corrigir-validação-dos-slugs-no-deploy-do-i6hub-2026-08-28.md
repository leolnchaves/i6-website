# Corrigir validação dos slugs no deploy do i6Hub

## Diagnóstico confirmado

O run mais recente falha em **Sync insights from i6Hub CMS** porque a validação adicionada no site está mais restritiva que o formato aceito pelo i6Hub:

- `margin-prediction-AI-demand` é rejeitado por conter letras maiúsculas
- `margem-predição-ia-demanda` é rejeitado por conter caracteres acentuados
- Os textos após o travessão no log (`Where is your margin...` e `Onde sua margem...`) são os títulos usados apenas para identificar os registros; eles não foram recebidos como slug

Portanto, os slugs chegam corretamente no feed. O erro está somente no validador do sincronizador do site.

## Correção

1. Atualizar a validação em `scripts/sync-content-from-i6hub.mjs` para aceitar letras Unicode, incluindo acentos, letras maiúsculas, números e hífens internos
2. Continuar abortando o deploy para slugs realmente inválidos: ausentes, vazios, com espaços, barras, barras invertidas, pontos de caminho ou outros caracteres incompatíveis
3. Preservar o slug exatamente como enviado pelo i6Hub no frontmatter, nome do Markdown, rota e diretórios de imagens; não haverá normalização silenciosa
4. Melhorar a mensagem de erro para documentar corretamente o formato aceito e continuar identificando idioma e título do registro inválido

## Verificação

- Testar explicitamente que `margin-prediction-AI-demand` e `margem-predição-ia-demanda` são aceitos
- Testar que `/blog/exemplo`, `exemplo com espaço`, `../exemplo` e valores vazios continuam abortando antes de qualquer escrita
- Confirmar que o projeto compila sem erros
- Após a correção entrar no GitHub, salvar novamente o item no i6Hub ou reexecutar o workflow e confirmar que as quatro sincronizações, o build e o deploy concluem com sucesso

## Observação

Esta correção não publica uma nova versão automaticamente. O deploy só será disparado quando você solicitar uma release ou quando o i6Hub enviar um novo `repository_dispatch` após o código corrigido estar no GitHub.
