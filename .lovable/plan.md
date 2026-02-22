

## Substituir logos EMS e Multi

### O que sera feito

1. Copiar a imagem enviada da **Multi** (`image-38.png`) para `public/content/logos/multi.png`, substituindo o arquivo atual
2. Copiar a imagem enviada da **EMS** (`image-39.png`) para `public/content/logos/ems-new.png`, substituindo o arquivo atual

### Por que funciona sem alterar codigo

O arquivo `public/content/partners-logos.md` ja referencia esses caminhos:
- EMS: `/content/logos/ems-new.png`
- Multi: `/content/logos/multi.png`

Os componentes `PartnersSection` e `ClientesSection` leem esse markdown e usam esses caminhos. Ao substituir os arquivos nos mesmos caminhos, as novas logos aparecerao automaticamente.

### Arquivos alterados
- `public/content/logos/multi.png` (substituido pelo upload)
- `public/content/logos/ems-new.png` (substituido pelo upload)

Nenhum arquivo de codigo precisa ser modificado.

