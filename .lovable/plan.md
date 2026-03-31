

# Ajustar TeseSection: cards menores, texto maior, destaque laranja nos titulos

## Mudancas em `src/components/hometeste/TeseSection.tsx`

### 1. Layout do grid
Alterar proporcoes de `lg:grid-cols-[1fr_auto_1fr]` para `lg:grid-cols-[280px_auto_1fr]` para que os cards ocupem menos espaco e o texto a direita tenha mais area.

### 2. Cards de indicadores menores
Reduzir padding de `p-6` para `p-4`, diminuir fonte do contador de `text-4xl sm:text-5xl` para `text-3xl sm:text-4xl`.

### 3. Destaque laranja nos nomes dos problemas
Remover o bullet (dot laranja) e substituir por um efeito visual nos titulos: fundo laranja semi-transparente (`bg-[#F4845F]/10`) com borda esquerda laranja (`border-l-3 border-[#F4845F]`) e padding, criando um destaque tipo "tag". O titulo fica em `text-[#F4845F] font-bold`.

### 4. Texto narrativo atualizado
- PT: "Dados parados não são neutros. São caros. A incapacidade de antecipar movimentos transforma informação em custo e gera ineficiências que drenam sua margem."
- EN: equivalente traduzido ("Idle data isn't neutral. It's expensive. The inability to anticipate movements turns information into cost and creates inefficiencies that drain your margin.")

### 5. Estrutura dos bullets
```tsx
<li className="pl-4 border-l-[3px] border-[#F4845F] bg-[#F4845F]/5 rounded-r-lg py-3 pr-4">
  <span className="font-bold text-[#F4845F]">{b.title}:</span>
  <span className="text-[#0F172A]/70"> {b.desc}</span>
</li>
```

