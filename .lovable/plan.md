

## Ajuste de tamanho do título para tablet

**Problema:** O breakpoint `md` (768px) ainda é tablet, mas está usando o tamanho do desktop (`text-8xl` = 96px). Isso faz com que tablet e desktop fiquem com o mesmo tamanho grande.

**Solução:** Redistribuir os breakpoints para separar corretamente tablet de desktop:

| Dispositivo | Breakpoint | Tamanho atual | Tamanho novo |
|---|---|---|---|
| Mobile | base | text-5xl (48px) | text-5xl (48px) |
| Tablet pequeno | sm (640px) | text-4xl (36px) | text-4xl (36px) |
| Tablet grande | md (768px) | text-8xl (96px) | text-6xl (60px) |
| Desktop | lg (1024px) | -- | text-8xl (96px) |

### Detalhes tecnicos

**Arquivo:** `src/components/hometeste/HeroMovimento.tsx` (linha 28)

Alterar a classe do `h1` de:
```
text-5xl sm:text-4xl md:text-8xl
```
Para:
```
text-5xl sm:text-4xl md:text-6xl lg:text-8xl
```

Assim o desktop (`lg:text-8xl`) mantém o tamanho atual e o tablet (`md:text-6xl`) fica com 60px, um meio-termo adequado.
