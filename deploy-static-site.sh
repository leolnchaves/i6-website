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
NODE_ENV=production npm run build || { echo "❌ Erro no build. Abortando."; exit 1; }

echo "🔍 Verificando se o build gerou os arquivos corretamente..."
if [ ! -f "dist/index.html" ]; then
  echo "❌ Erro: dist/index.html não foi gerado"
  exit 1
fi

# Verifica se o index.html aponta para arquivos corretos (não /src/)
if grep -q '/src/' dist/index.html; then
  echo "❌ ERRO CRÍTICO: index.html ainda aponta para /src/ em vez dos bundles"
  echo "Conteúdo do index.html:"
  cat dist/index.html
  exit 1
fi

# 🛠️ Cria fallback 404.html para SPAs (GitHub Pages redirect)
cat <<EOF > dist/404.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <script>
      // GitHub Pages SPA redirect - captures the current path and redirects to index.html with the path as a query parameter
      var pathSegmentsToKeep = 0;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
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

# 🛠️ Cria arquivo _headers para configurar MIME types no Netlify/GitHub Pages
cat <<EOF > $TEMP_DIR/_headers
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff

/assets/*.js
  Content-Type: text/javascript

/assets/*.mjs
  Content-Type: text/javascript

/assets/*.css
  Content-Type: text/css

/assets/*.wasm
  Content-Type: application/wasm
EOF

# 🛠️ Verifica se o index.html foi gerado corretamente
if [ ! -f "$TEMP_DIR/index.html" ]; then
  echo "❌ Erro: index.html não encontrado no build"
  exit 1
fi

echo "🔍 Verificando referências de assets no index.html..."
echo "Conteúdo das tags script:"
grep -o '<script[^>]*>' $TEMP_DIR/index.html || echo "⚠️ Nenhuma tag script encontrada"
echo "Assets JS encontrados:"
find $TEMP_DIR -name "*.js" | head -10

echo "✅ Commitando e publicando para '$TARGET_BRANCH'..."
cd $TEMP_DIR
git add .
git commit -m "Deploy do site estático via dist" || echo "ℹ️ Nada novo para commit."
git push --force origin $TARGET_BRANCH

echo "🧼 Limpando worktree temporária..."
cd -
git worktree remove $TEMP_DIR

echo "🎉 Deploy finalizado! Configure o GitHub Pages para usar a branch '$TARGET_BRANCH'."
