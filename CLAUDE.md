# CLAUDE.md

このファイルは、このプロジェクトで Claude Code (claude.ai/code) が作業する際のガイダンスです。

## プロジェクト概要

React製のタスクボードアプリ。テキスト入力でのタスク追加、チェックボックスによる完了・未完了の切り替え、削除、完了済みタスクのグレー表示を提供する。タスクは `localStorage` に保存され、リロードしても保持される。

## デプロイ先

https://lifesizespeak-hub.github.io/project/

`main` ブランチへの push をトリガーに `.github/workflows/deploy.yml` が自動でビルド・デプロイする(GitHub Pages の Source は Settings > Pages で GitHub Actions を選択済み)。

## 技術スタック

- React 19 + TypeScript
- Vite 8 (ビルド・開発サーバー)
- oxlint (Lint)
- 状態管理: React の `useState` / `useEffect` のみ(外部ライブラリ不使用)
- 永続化: `localStorage`
- ホスティング: GitHub Pages (GitHub Actions によるデプロイ)

## コンポーネントの命名規約

- コンポーネントファイルは `PascalCase.tsx`、`src/components/` 配下に配置する(例: `TaskForm.tsx`, `TaskItem.tsx`, `TaskList.tsx`)。
- 1ファイル1コンポーネントとし、ファイル名とコンポーネント名(デフォルトエクスポート)を一致させる。
- props の型は `<コンポーネント名>Props` という名前のインターフェースで定義する(例: `TaskFormProps`)。
- 型定義は `src/types.ts` に集約する(例: `Task`)。
- CSS クラス名はコンポーネント単位のプレフィックスを付けた kebab-case とする(例: `task-item`, `task-item--completed` のように BEM 風の modifier を用いる)。

## Git 運用ルール

- **コードを変更するたびに、変更内容をコミットして GitHub にプッシュすること。**
  - 作業を溜め込まず、変更単位ごとに小さくコミットする。
  - コミットメッセージは変更内容が分かるように簡潔に記述する。
  - プッシュ前に `git status` / `git diff` で変更内容を確認する。
  - 機密情報 (.env、認証情報など) を誤ってコミットしないよう注意する。
- force push や履歴の書き換え (`git reset --hard`、`git push --force` など) は行わない。ユーザーから明示的に指示された場合のみ実施する。
- pre-commit などの検証をスキップ (`--no-verify` 等) しない。

## セットアップ

```
npm install
```

## 開発コマンド

- `npm run dev` — 開発サーバー起動
- `npm run build` — 型チェック + 本番ビルド
- `npm run lint` — oxlint によるリント
- `npm run preview` — ビルド成果物のプレビュー
