
# Tornar a secao de clientes mais clara com logos coloridas

## Mudancas em `src/components/hometeste/ClientesSection.tsx`

### 1. Fundo claro
- Trocar `bg-[#0B1224]` por `bg-white` (ou `bg-slate-50` para um branco levemente acinzentado)
- Atualizar as faixas de fade nas bordas para usar a mesma cor clara: `from-white` em vez de `from-[#0B1224]`

### 2. Texto do titulo
- Trocar `text-white/40` por `text-slate-500` para contraste no fundo claro

### 3. Logos com cor original
- Remover os filtros `brightness-0 invert` que forçam as logos a ficarem brancas/cinzas
- Manter apenas `opacity-50 hover:opacity-100` para um efeito sutil de hover
- Isso vai mostrar as logos nas cores originais dos arquivos

### Resultado
Secao com fundo branco/claro, titulo em cinza escuro, e logos coloridas com hover que aumenta a opacidade.

## Arquivo alterado
- `src/components/hometeste/ClientesSection.tsx`
