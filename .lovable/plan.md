# Corrigir falha do deploy disparado pelo i6Hub

## O que aconteceu

O run "Deploy to GitHub Pages" (evento `repository_dispatch`, 28/08 19:29 UTC) falhou no passo **Sync insights from i6Hub CMS**. O site continua na versão anterior (v2.4.4).

Erro real do log:

```text
Error: ENOENT: no such file or directory, open
'src/content/insights/pt-/blog/sinais-de-intencao-ia-preditiva.md'
```

Causa: o insight publicado no i6Hub tem o slug gravado como **`/blog/sinais-de-intencao-ia-preditiva`** (com barra inicial e caminho embutido) em vez de apenas `sinais-de-intencao-ia-preditiva`. O script monta o nome do arquivo como `${language}-${slug}.md`, o que virou um caminho com subpastas inexistentes e quebrou a escrita — abortando o job inteiro (build e deploy foram pulados).

## Correção proposta

1. **Normalizar o slug no script de sync** (`scripts/sync-content-from-i6hub.mjs`), aplicado a todos os tipos (insights, research, landings, stories):
   - remover barras no início/fim e prefixos de rota;
   - trocar barras internas por `-`;
   - manter apenas caracteres seguros para nome de arquivo;
   - usar o slug normalizado tanto no nome do `.md` quanto nas pastas de imagens e no frontmatter, para a URL do site continuar consistente.
2. **Não abortar o deploy por um item inválido**: registrar aviso e seguir com os demais itens, em vez de derrubar o job todo — assim um registro mal preenchido no CMS nunca mais impede a publicação do site.
3. **Ajuste no i6Hub (do seu lado)**: corrigir o slug do artigo para `sinais-de-intencao-ia-preditiva`, para que a URL final fique `/pt/insights/sinais-de-intencao-ia-preditiva` (ou a rota de blog correta) e não dependa do saneamento automático.

## Verificação

- Rodar o script de sync localmente contra o feed para confirmar que o artigo gera `.md` e imagens sem erro.
- Depois de aprovado e publicado, reexecutar o workflow (ou salvar novamente o artigo no i6Hub para disparar o `repository_dispatch`) e confirmar o run verde.

## Notas técnicas

- Nada muda nos gatilhos do workflow (`tags v*` + `repository_dispatch`).
- As imagens do body já foram baixadas para `public/content/insights/blog-sinais-de-intencao-ia-preditiva/pt/`; após a normalização o caminho passa a ser derivado do slug saneado, e o cleanup de órfãos remove o diretório antigo no próximo sync.
