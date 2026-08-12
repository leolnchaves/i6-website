# Corrigir falha do deploy v2.3.0

## O que aconteceu

O deploy da v2.3.0 não falhou por causa do código do site. Ele parou no passo "Sync insights from i6Hub CMS": o feed do i6Hub respondeu **502 Bad Gateway** (indisponibilidade momentânea do CMS). Como o script aborta com erro, o job inteiro caiu e os passos de build/deploy foram todos ignorados — ou seja, o site em infinity6.ai continua na v2.2.24.

## Como resolver

1. **Republicar agora**: reexecutar o workflow da tag v2.3.0 (o feed já pode ter voltado). Se o feed responder, o site publica normalmente.
2. **Tornar o deploy resiliente ao i6Hub** (para não perder mais releases por indisponibilidade do CMS):
   - Adicionar retentativa no fetch do feed (3 tentativas com espera crescente, ex. 3s/6s/12s) em `scripts/sync-content-from-i6hub.mjs`.
   - Se depois das retentativas o feed continuar fora, o passo registra um aviso e **não derruba o build** — o site é publicado com o conteúdo de Markdown que já está no repositório.
   - Regra importante: falha do feed nunca apaga nem sobrescreve conteúdo existente; sem resposta válida, mantém-se o que está versionado.

## Detalhes técnicos

- Arquivo `scripts/sync-content-from-i6hub.mjs`: envolver a chamada do feed numa função `fetchWithRetry` e, no caminho de erro final, sair com código 0 após `console.warn`, sem gravar arquivos.
- Workflow `.github/workflows/deploy-gh-pages.yml`: manter os 4 passos de sync como estão (o próprio script passa a não falhar); não alterar os triggers de `repository_dispatch` do i6Hub.
- Depois do ajuste, publicar um patch (v2.3.1) para validar o pipeline de ponta a ponta.
