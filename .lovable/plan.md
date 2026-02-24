

# Substituir logo EMS nos casos de sucesso

## Problema
O logo atual da EMS (`/content/logos/EMS-COR.png`) esta com qualidade ruim nos cards e modais dos casos de sucesso.

## Solucao
Substituir o arquivo `public/content/logos/EMS-COR.png` pelo novo logo enviado. Como ambos os markdowns (PT e EN) referenciam o mesmo arquivo, a troca sera automatica em todos os lugares:
- Card "Excelencia em Marketplace" (EMS Farma)
- Card "Previsao de Vendas Precisa" (EMS Farma)
- Modais de detalhes de ambos os cases

## Mudanca
1. Copiar `user-uploads://image-76.png` para `public/content/logos/EMS-COR.png`, sobrescrevendo o arquivo atual

Nenhuma alteracao de codigo necessaria — os markdowns ja apontam para esse caminho.

