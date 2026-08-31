---
layout: home

title: FasTool
titleTemplate: 依存ゼロのモダンな JavaScript ユーティリティライブラリ

hero:
  name: FasTool
  text: 依存ゼロのモダンな JavaScript ユーティリティライブラリ
  tagline: 265 のエクスポート · ESM / CJS / UMD · SSR セーフ · 実行時依存ゼロ
  actions:
    - theme: brand
      text: はじめに
      link: /ja/guide/start
    - theme: alt
      text: ドキュメント
      link: /ja/guide/
    - theme: alt
      text: GitHub
      link: https://github.com/tobe-fe-dalao/fastool

features:
  - title: 実行時依存ゼロ
    details: メインエントリはサードパーティ製ライブラリを含まず、ビルド時にリモート URL も参照しません。すべてネイティブ JS で実装されています。
  - title: 複数の出力形式
    details: ESM / CJS / UMD を同時に提供し、exports 条件で自動選択されます。tree-shaking のため sideEffects を宣言済みです。
  - title: SSR セーフ
    details: window / document / navigator に触れる関数は環境判定でガードされ、サーバー側では安全な値を返します（例外を投げません）。
  - title: 完全な型定義
    details: TypeScript strict モードで記述され、型定義はパッケージとともに公開されるため @types は不要です。
  - title: コードと同期したドキュメント
    details: カテゴリ別ドキュメントはソースの JSDoc から `pnpm docs:gen` で直接生成されます。コメントを直して再生成するだけです。
  - title: オプトインの拡張
    details: CDN プラグインと古いブラウザ向けポリフィルは別エントリに分離されており、使わなければバンドルに含まれません。
---
