# はじめに

## インストール

```bash
# npm
npm install fastool

# pnpm
pnpm add fastool

# yarn
yarn add fastool
```

## インポート

```ts
// 全体 — ツリーシェイク可能、実行時依存ゼロ
import { chunk, debounce, formatTime } from 'fastool';

// プラグインエントリ — 実行時に CDN からサードパーティ製ライブラリを読み込む
import { dayjs } from 'fastool/plugins';

// 古いブラウザ向けポリフィル（ネイティブ実装がない場合のみ有効）
import 'fastool/polyfill';
```

## 簡単な例

```ts
import { chunk, uniq, debounce } from 'fastool';

chunk([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]
uniq([1, 1, 2, 3]);      // [1, 2, 3]

const onResize = debounce(() => console.log('resized'), 200);
```

## ブラウザ / CDN

```html
<script src="https://unpkg.com/fastool"></script>
<script>
  FasTool.chunk([1, 2, 3, 4], 2);
</script>
```

## 次に

[API リファレンス](/ja/guide/) で 18 カテゴリ・265 のエクスポートをご確認ください。
