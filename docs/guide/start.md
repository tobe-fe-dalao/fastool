# Getting Started

## Install

```bash
# npm
npm install fastool

# pnpm
pnpm add fastool

# yarn
yarn add fastool
```

## Import

```ts
// Whole package — tree-shakable, zero runtime dependencies
import { chunk, debounce, formatTime } from 'fastool';

// Plugins entry — loads third-party libs from a CDN at runtime
import { dayjs } from 'fastool/plugins';

// Legacy-browser polyfills (activates only when native is missing)
import 'fastool/polyfill';
```

## Quick example

```ts
import { chunk, uniq, debounce } from 'fastool';

chunk([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]
uniq([1, 1, 2, 3]);      // [1, 2, 3]

const onResize = debounce(() => console.log('resized'), 200);
```

## Browser / CDN

```html
<script src="https://unpkg.com/fastool"></script>
<script>
  FasTool.chunk([1, 2, 3, 4], 2);
</script>
```

## Next

Browse the [API reference](/guide/) for the full list of 265 exports across 18 categories.
