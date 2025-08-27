#!/bin/bash

set -e

TARGET_BRANCH="static-site"
TEMP_DIR="../static-site-temp"

# 🔄 Garante que o main local esteja atualizado
git checkout main
git pull origin main

# 🧼 Limpa build anterior
rm -rf dist

echo "🔧 Gerando build do Vite..."
npm run build || { echo "❌ Erro no build. Abortando."; exit 1; }

# 🛠️ Cria fallback 404.html para SPAs (GitHub Pages redirect)
cat <<EOF > dist/404.html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="refresh" content="0; url=/i6-website/" />
    <script>
      const redirectTo = sessionStorage.redirect || "/i6-website/";
      sessionStorage.redirect = null;
      window.location.href = redirectTo;
    </script>
  </head>
  <body>
    <p>Redirecionando...</p>
  </body>
</html>
EOF

echo "✅ Fallback 404.html criado em dist/"

# 🧼 Limpa worktree travada se necessário
git worktree prune

echo "🔎 Verificando se a branch '$TARGET_BRANCH' existe..."
if ! git show-ref --quiet refs/heads/$TARGET_BRANCH; then
  echo "🌱 Criando a branch '$TARGET_BRANCH' a partir da main..."
  git fetch origin main
  git checkout -b $TARGET_BRANCH origin/main
  git push -u origin $TARGET_BRANCH
  git checkout main
fi

echo "📁 Criando worktree temporária..."
rm -rf $TEMP_DIR
git worktree add $TEMP_DIR $TARGET_BRANCH

echo "📦 Copiando arquivos da dist/ para a branch '$TARGET_BRANCH'..."
rm -rf $TEMP_DIR/*
cp -r dist/* $TEMP_DIR/

# 🛠️ Cria arquivo .nojekyll para GitHub Pages servir módulos JS corretamente
touch $TEMP_DIR/.nojekyll

echo "✅ Commitando e publicando para '$TARGET_BRANCH'..."
cd $TEMP_DIR
git add .
git commit -m "Deploy do site estático via dist" || echo "ℹ️ Nada novo para commit."
git push --force origin $TARGET_BRANCH

echo "🧼 Limpando worktree temporária..."
cd -
git worktree remove $TEMP_DIR

echo "🎉 Deploy finalizado! Configure o GitHub Pages para usar a branch '$TARGET_BRANCH'."
