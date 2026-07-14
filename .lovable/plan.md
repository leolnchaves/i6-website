## Renomear menus pai no header

Alterar apenas os rótulos dos menus pai no `HeaderNovo` (desktop + mobile), mantendo estrutura, rotas e submenus inalterados.

### Mudanças

**PT (`src/data/translations/pt.ts`)**
- "Proprietary AI" → **IA Proprietária**
- "i6 Research" (menu pai/dropdown) → **Inteligência Aplicada**
- O submenu interno "i6 Research" (que aponta para `/i6-intelligence`) permanece como "i6 Research".

**EN (`src/data/translations/en.ts`)**
- "Proprietary AI" → **Proprietary AI** (mantém — tradução correta em inglês)
- "i6 Research" (menu pai/dropdown) → **Applied Intelligence**
- O submenu interno "i6 Research" permanece como "i6 Research".

### Escopo
- Apenas strings de tradução. Sem mudança de rotas, componentes ou lógica.
