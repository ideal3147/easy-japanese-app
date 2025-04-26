# Dockerfile

# ベースイメージ
FROM node:22

# 作業ディレクトリ作成
WORKDIR /app

# package.jsonとlockファイルだけ先にコピー
COPY package*.json ./

# 依存インストール
RUN npm install

# 全ファイルをコピー
COPY . .

# ポート開放
EXPOSE 3000

# 開発用コマンド
CMD ["npm", "run", "dev"]
