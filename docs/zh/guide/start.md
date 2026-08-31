# 快速开始

## 安装

```bash
pnpm add fastool
# 或
npm i fastool
```

## 引入

fastool 同时提供 ESM、CJS 与 UMD 三种产物，通过 `exports` 条件导出自动匹配：

```ts
// ESM / 打包器（推荐，支持 tree-shaking）
import { chunk, camelCase } from 'fastool';

// 按需引入子路径
import { importPlugin } from 'fastool/plugins';
import { polyfillAll } from 'fastool/polyfill';

// CommonJS
const { chunk, camelCase } = require('fastool');
```

浏览器直接引入（UMD，全局变量 `fastool`）：

```html
<script src="https://unpkg.com/fastool/dist/index.umd.min.js"></script>
<script>
  fastool.camelCase('hello world'); // 'helloWorld'
</script>
```

## 三个入口的区别

| 入口 | 内容 | 是否含外部依赖 |
| --- | --- | --- |
| `fastool` | 全部 235 个工具函数 | 无，纯原生实现 |
| `fastool/plugins` | CDN 动态加载插件（dayjs / clipboard / keycode） | **有**，运行时联网 |
| `fastool/polyfill` | 旧浏览器 API 补丁（按需调用） | 无 |

> 主入口 **不含任何第三方依赖**，也不会在构建期引入远程 URL。
> 只有你显式 `import ... from 'fastool/plugins'` 时，相关代码才会进入你的包。
> 如果你对依赖纯净度有要求（例如内网环境、离线打包），不要引用 `fastool/plugins`。

## 按需引入（tree-shaking）

包已声明 `"sideEffects": false`，配合 ESM 使用未用到的函数会被自动剔除：

```ts
import { chunk } from 'fastool';
// 打包产物里只会有 chunk 及其依赖，其他 234 个函数不会进去
```

## TypeScript

类型声明随包一起发布（`dist/index.d.ts`），无需额外安装 `@types/*`：

```ts
import { get } from 'fastool';

const name = get(user, 'profile.name', '匿名'); // 类型自动推断为 string
```

## 服务端渲染（SSR）

所有涉及 `window` / `document` / `navigator` 的函数都做了环境判断，在 Node 里调用会返回安全值而不是抛错：

```ts
import { getClientHeight, getBrowserInfo, getLocalStorage } from 'fastool';

getClientHeight(); // Node 中返回 0
getBrowserInfo();  // Node 中返回 { type: 'unknown', version: -1 }
getLocalStorage('key'); // Node 中返回 null
```

> 注意：Node 18+ 自带全局 `navigator`（UA 为 `Node.js/xx`）。
> fastool 判断浏览器时会同时校验 `window` 与 `document`，不会被它误导。

## 下一步

- [Array 数组](./Array.md) — 分块、去重、分组、排序
- [Objects 对象](./Objects.md) — 路径取值、深比较、深拷贝
- [Fn 函数](./Fn.md) — 节流防抖、组合柯里化
- [Time 时间](./Time.md) — 格式化与日期计算
