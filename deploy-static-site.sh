#!/bin/bash

TARGET_BRANCH="static-site"
TEMP_DIR="../static-site-temp"

echo "🔧 Gerando build do Vite..."
npm run build || { echo "❌ Erro no build. Abortando."; exit 1; }

echo "🔎 Verificando se a branch '$TARGET_BRANCH' existe no remoto..."
if ! git show-ref --quiet refs/remotes/origin/$TARGET_BRANCH; then
  echo "🌱 Branch '$TARGET_BRANCH' não existe. Criando agora..."
  git branch $TARGET_BRANCH
  git push -u origin $TARGET_BRANCH
fi

echo "📁 Criando worktree temporária..."
rm -rf $TEMP_DIR
git worktree add $TEMP_DIR $TARGET_BRANCH || { echo "❌ Falha ao criar worktree."; exit 1; }

echo "📦 Copiando arquivos da dist/ para a nova branch..."
rm -rf $TEMP_DIR/*
cp -r dist/* $TEMP_DIR/

echo "✅ Commitando e enviando para a branch '$TARGET_BRANCH'..."
cd $TEMP_DIR
git add .
git commit -m "Deploy do site estático via dist" || echo "ℹ️ Nada novo para commit."
git push origin $TARGET_BRANCH

echo "🧼 Limpando worktree temporária..."
cd -
git worktree remove $TEMP_DIR

echo "🎉 Deploy finalizado! Vá em Settings > Pages e aponte para '$TARGET_BRANCH'."
