## Objetivo
Adicionar um CTA "Conheça nossas soluções" / "Explore our solutions" logo abaixo da demo do i6Signal na home (seção `SinaisSection`, que contém o GIF do i6Signal), reutilizando o mesmo estilo do CTA de `TestemunhosCompact` (borda glow branca, ArrowRight animado no hover) e apontando para `/solutions`.

## Mudanças

**`src/components/hometeste/SinaisSection.tsx`**
1. Importar `Link` de `react-router-dom`, `ArrowRight` de `lucide-react` e o helper `localized` de i18n (mesmo padrão do `TestemunhosCompact`).
2. Adicionar duas chaves em `copy` (PT/EN):
   - PT: `ctaSolutions: 'Conheça nossas soluções'`
   - EN: `ctaSolutions: 'Explore our solutions'`
3. Ao final do JSX da seção, adicionar um bloco:
   ```
   <div className="flex justify-center mt-10">
     <Link to={localized('/solutions')} className="group inline-flex items-center gap-2 px-6 py-3 bg-transparent text-white font-medium rounded-xl border border-white/40 animate-glow-white transition-all duration-500 ease-out hover:bg-white hover:text-[#0B1224] hover:border-white hover:shadow-[0_0_24px_rgba(255,255,255,0.35),0_0_48px_rgba(255,255,255,0.12)] text-sm md:text-base text-center">
       {copy.ctaSolutions}
       <ArrowRight size={16} className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
     </Link>
   </div>
   ```

Sem outras mudanças; o CTA existente de `TestemunhosCompact` (Ver histórias de sucesso) fica intacto.
