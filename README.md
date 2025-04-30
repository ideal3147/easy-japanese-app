# Easy Japanese App

日本語学習をサポートするWebアプリケーションです。

## 環境構築

### 前提条件
- Node.js (v18以上)
- npm
- Docker (オプション)

### セットアップ手順

1. リポジトリのクローン
```bash
git clone [リポジトリURL]
cd easy-japanese-app
```

2. 依存パッケージのインストール
```bash
npm install
```

3. 環境変数の設定
`.env.local`ファイルを作成し、必要な環境変数を設定してください。

### Dockerを使用する場合
```bash
docker-compose up -d
```

## 動作確認

1. 開発サーバーの起動
```bash
npm run dev
```

2. ブラウザで以下のURLにアクセス
```
http://localhost:3000
```

## アプリの機能

- わかりやすい日本語への変換機能（日本語→日本語）
- 画像から日本語文章の認識機能
- ユーザー認証機能

## 技術スタック

- Next.js
- TypeScript
- Tailwind CSS
- Docker (オプション)

## 開発者向け情報

### プロジェクト構造
```
src/
├── app/          # アプリケーションのルーティングとページコンポーネント
├── components/   # 再利用可能なUIコンポーネント
├── contexts/     # React Context関連のファイル
└── libs/         # ユーティリティ関数やライブラリ
```

### スクリプト
- `npm run dev`: 開発サーバーの起動
- `npm run build`: プロダクションビルド
- `npm run start`: プロダクションサーバーの起動
- `npm run lint`: コードの静的解析

## 詳細情報

Next.jsについて詳しく知りたい方は、以下のリソースをご覧ください：

- [Next.js ドキュメント](https://nextjs.org/docs) - Next.jsの機能とAPIについて
- [Next.js チュートリアル](https://nextjs.org/learn) - インタラクティブなNext.jsチュートリアル

[Next.js GitHubリポジトリ](https://github.com/vercel/next.js)もご覧いただけます。フィードバックやコントリビューションは大歓迎です！

## Vercelへのデプロイ

Next.jsアプリを最も簡単にデプロイする方法は、Next.jsの開発元である[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)を使用することです。

デプロイの詳細については、[Next.jsデプロイメントドキュメント](https://nextjs.org/docs/app/building-your-application/deploying)をご覧ください。
