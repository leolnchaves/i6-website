# Corrigir falha do deploy v2.3.0

## O que aconteceu

O deploy da v2.3.0 não falhou por causa do código do site. Ele parou no passo "Sync insights from i6Hub CMS": o feed do i6Hub respondeu **502 Bad Gateway** (indisponibilidade momentânea do CMS). Como o script aborta com erro, o job inteiro caiu e os passos de build/deploy foram todos ignorados — ou seja, o site em infinity6.ai continua na v2.2.24.

## Como resolver

**Republicar a v2.3.0**: reexecutar o workflow "Deploy to GitHub Pages" da run que falhou (mesma tag v2.3.0), já que o feed do i6Hub provavelmente voltou. Nenhuma alteração de código ou de workflow será feita.

Depois de disparar, acompanhar o resultado do run e reportar: se passar, o site publica normalmente; se cair de novo no mesmo 502, avisar que o i6Hub segue indisponível e aguardar sua decisão.
