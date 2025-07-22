#!/bin/bash

# Nome da branch onde o site será publicado
TARGET_BRANCH="static-site"
TEMP_DIR="../static-site-temp"

echo "🔧 Gerando build do Vite..."
npm run build || { echo "❌ Erro no build. Abortando."; exit 1; }

echo "🧹 Limpando branch anterior (se existir)..."
git branch -D $TARGET_BRANCH 2>/dev/null

echo "📁 Criando worktree temporária..."
rm -rf $TEMP_DIR
git worktree add $TEMP_DIR $TARGET_BRANCH

echo "📦 Copiando arquivos da dist/ para a nova branch..."
rm -rf $TEMP_DIR/*
cp -r dist/* $TEMP_DIR/

echo "✅ Commitando e enviando para a branch '$TARGET_BRANCH'..."
cd $TEMP_DIR
git add .
git commit -m "Deploy do site estático via dist"
git push origin $TARGET_BRANCH

echo "🧼 Limpando worktree temporária..."
cd -
git worktree remove $TEMP_DIR

echo "🎉 Deploy finalizado! Agora vá em Settings > Pages no GitHub e aponte para a branch
