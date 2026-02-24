
# Substituir "Infinity6" por "infinity6" em todas as paginas de politicas

## Objetivo
Padronizar o nome da marca para sempre usar "infinity6" (tudo minusculo) em todos os textos das paginas de Politica de Privacidade e Politica de Etica.

## Mudancas

### 1. `src/components/privacy/PrivacyPolicyPT.tsx`
Substituir todas as ocorrencias de "Infinity6" por "infinity6" nos seguintes trechos:
- Secao 1: "A infinity6 e uma plataforma..."
- Secao 2: "A infinity6 adota os seguintes principios..."
- Secao 3: "...ativos da infinity6 sao categorizados..."
- Tabela: "...uso dentro da infinity6"
- Secao 4: titulo "Dados Tratados pela infinity6", subtitulo "Dados Internos da infinity6"
- Secao 9: "...propriedade exclusiva da infinity6"
- Secao 10: "A infinity6 podera atualizar..."
- Secao 11: "A infinity6 reafirma seu compromisso..."

Total: ~10 ocorrencias

### 2. `src/pages/PrivacyPolicy.tsx`
Substituir nas secoes EN:
- Secao 1: "At infinity6 (\"we,\"..."
- Secao 9 contato: "infinity6 AI Solutions"

Total: ~2 ocorrencias

### 3. `src/pages/EthicsPolicy.tsx`
Substituir em ambos os idiomas (EN e PT):
- EN secao 1: "At infinity6, we believe..."
- EN contato: "infinity6 AI Solutions, Ethics Department"
- PT secao 1: "Na infinity6, acreditamos..."
- PT contato: "infinity6 AI Solutions, Departamento de Etica"

Total: ~4 ocorrencias

**Nota:** Os enderecos de email (security@infinity6.com, privacy@infinity6.ai, ethics@infinity6.ai) permanecem inalterados, pois emails sao tecnicamente case-insensitive e ja estao em minusculo.
