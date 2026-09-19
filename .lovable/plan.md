# Ficha do fundador nos dados estruturados

## O que existe hoje (confirmado)

1. **Bloco fixo no HTML do site** (`index.html`, lido por qualquer robô, sem depender de JavaScript): empresa **infinity6** + site. Já traz `founder` com três pessoas, cada uma só com **nome + LinkedIn**:
   - Leonardo Luiz Novaes Chaves
   - Everton Luiz de Almeida Gago Junior
   - Henrique dos Reis Meirelles
   Nada de cargo, vínculo, Scholar ou ORCID. Nenhuma pessoa tem identificador próprio, então nada pode apontar para ela.

2. **Bloco da página Nossa IA** montado em dois lugares:
   - no navegador (`src/pages/OurAI.tsx`): artigo técnico, os três motores, glossário e os números de resultado — **não é visto por robôs que não executam JavaScript**;
   - no build (`scripts/prerender-seo-stubs.mjs`): versão estática equivalente para `/pt/our-ai` e `/en/our-ai` (espanhol ainda não é gerado).
   Nenhum dos dois cita pessoa ou publicação.

Ou seja: a base existe, mas a ficha da pessoa e as publicações faltam, e o que a página Nossa IA gera hoje só no navegador não serve para robôs de IA.

## O que fazer

1. **Ficha da pessoa no HTML fixo** (`index.html`), dentro do mesmo grafo, com identificador próprio (`#everton-gago`): nome, cargo **co-Founder & COO**, vínculo com a infinity6, e a lista de perfis (LinkedIn já existente + **placeholders** para Google Scholar e ORCID, marcados no código para troca em um lugar só).
2. **Empresa aponta para a ficha**: o item `founder` do Everton passa a referenciar esse identificador, em vez de repetir nome e link.
3. **Publicações**: entram como itens de publicação acadêmica ligados a ele como autor, na lista que você vai enviar no JSON. Ficam no HTML fixo e também na versão estática de `/pt/our-ai` e `/en/our-ai` gerada no build.
4. **Espanhol**: incluir `/es/our-ai` na geração estática, para o bloco valer nos três idiomas.
5. Nenhum texto visível, layout ou link da página muda.

## Aguardando

O JSON preenchido que você vai enviar (Scholar, ORCID e lista completa de publicações). Até ele chegar, eu implemento a estrutura com os placeholders e depois só substituo os valores.

## Detalhes técnicos

- Entidades: `Person` com `@id`, `jobTitle`, `worksFor`/`affiliation` apontando para a `Organization`, `sameAs` com LinkedIn/Scholar/ORCID; `ScholarlyArticle` (artigos) e `Event`/`CreativeWork` (palestra) com `author` referenciando o `@id` da pessoa.
- Tudo dentro do `@graph` já existente em `index.html`, mais a injeção no `buildStub` de `scripts/prerender-seo-stubs.mjs`, que roda no build e escreve o JSON-LD direto no HTML entregue.
