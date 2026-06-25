## 1. Salvar protocolo de release como memória permanente

Criar `mem://deployment/release-flow` com o passo-a-passo, e adicionar ao `mem://index.md` (seção Core) para aplicar em toda futura solicitação de `patch`/`minor`/`major`.

**Conteúdo da memória:**
- Quando o usuário pedir `patch`, `minor` ou `major` → publicar release no GitHub que dispara o GH Actions de deploy.
- Repo: `leolnchaves/i6-website`, branch `main`.
- Fluxo:
  1. `GET /repos/leolnchaves/i6-website/releases/latest` para pegar última tag.
  2. Bumpar versão conforme pedido (semver: patch = x.y.Z+1, minor = x.Y+1.0, major = X+1.0.0).
  3. `POST /repos/leolnchaves/i6-website/releases` com `tag_name`, `name`, `body` (descrição em PT-BR com bullets das mudanças do turno) e `target_commitish: main`.
  4. Auth via header `Authorization: Bearer $GITHUB_RELEASE_TOKEN`.
  5. Informar URL da release + lembrar que deploy fica live em ~2 min em infinity6.ai.
- Nunca pedir confirmação do bump quando o usuário já especificou; perguntar só se ele disser apenas "publica".

## 2. Publicar v1.2.5 (patch)

Criar release no GitHub via API com:
- `tag_name: v1.2.5`
- Body descrevendo:
  - Ajuste de copy no hero de `/success-stories` (PT + EN)
  - Footer: novo texto "Data moves. **You grow.**" + tagline atualizada (PT + EN)

Após criação, retornar a URL da release ao usuário.

## Detalhes técnicos
- 2 arquivos de memória (`mem://deployment/release-flow.md` + update no `mem://index.md`) — escritos em paralelo.
- 1 chamada `curl POST` para a API do GitHub.