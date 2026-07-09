Ajustar a seção "Como implementamos" na página `/solutions-v2` (PT) conforme a solicitação.

Alterações propostas:
1. Inserir um destaque visual informando que até o passo 3 (Backtest) não há custo. Sugestão: banner/pill discreto abaixo do título da seção, com borda coral e texto "Custo zero até o passo 3 — você só avança com validação de resultado.".
2. Renomear passo 02 de "Fine-tuning dos modelos" para "Modelagem IA".
3. Renomear passo 04 de "Ativação" para "Piloto / Ativação".
4. Remover o texto de footer "IA aplicada para capturar valor onde a operação ainda decide tarde demais.".

Arquivos envolvidos:
- `src/data/solutionsV2/content.ts` — atualizar títulos dos passos, adicionar campo para o destaque de custo zero e remover/remover uso do footer.
- `src/components/solutions-v2/HowWeImplement.tsx` — renderizar o destaque de custo zero e remover o footer.

Observação: a versão em inglês de `/solutions-v2` ainda não existe; as alterações serão aplicadas apenas no conteúdo em português.