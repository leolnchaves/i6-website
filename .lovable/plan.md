

## Mostrar popups no tablet, esconder no mobile

### Problema
Atualmente os popups usam `hidden lg:block`, o que os esconde em telas menores que 1024px (tanto tablet quanto mobile).

### Solucao
Trocar `hidden lg:block` para `hidden md:block` na linha 161. Isso faz com que:
- **Desktop (>=1024px)**: popups visiveis (como ja esta)
- **Tablet (768px-1023px)**: popups visiveis (novo comportamento)
- **Mobile (<768px)**: popups escondidos (mantido)

### Detalhes tecnicos

**Arquivo: `src/components/hometeste/SinaisSection.tsx`**

- Linha 161: trocar `hidden lg:block` para `hidden md:block`

Apenas uma linha precisa ser alterada.

