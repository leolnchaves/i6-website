# Como o formulário da /community envia hoje

Verifiquei o código do formulário (`src/components/contact/ContactForm.tsx`, usado em `src/pages/Comunidade.tsx` com `leadSource="i6-community"`) e a normalização do payload (`src/lib/leadFormConfig.ts`).

O envio da comunidade leva **três** rótulos, não um só:

| Campo enviado | Valor na comunidade |
| --- | --- |
| `reason` | `i6-community` |
| `source` | `i6-community` (definido em `normalizeLeadFields`) |
| `subscription` | `Interesse — Comunidade` (assunto fixo da variante) |

Ou seja: o site **já manda `i6-community`** em dois campos. O que chega na planilha é apenas o `Interesse — Comunidade`, o que indica que a perda acontece depois do site — na etapa que grava a planilha (Apps Script), que aparentemente não tem coluna para `source`/`reason` e só registra a assinatura. O Apps Script não está neste repositório, então isso é a hipótese a confirmar, não um fato verificado.

Importante: o campo que hoje o HUB inspeciona (`origem/assinatura`) recebe um texto de interface traduzível, não um identificador estável — em inglês e espanhol esse mesmo campo viria com outro texto.
