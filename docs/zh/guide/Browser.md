# Browser 浏览器

> 环境探测、视口尺寸、滚动与全屏。全部做了 SSR 保护。

共 12 个函数。

## 函数

### exitFullScreen

退出全屏（兼容各浏览器前缀，SSR 环境下静默跳过）

**签名**

```ts
const exitFullScreen = (): void
```

**返回** `void`

**示例**

```ts
exitFullScreen();
```

### getBrowserInfo

获取浏览器类型与版本号（SSR 环境下返回 unknown）

**签名**

```ts
const getBrowserInfo = (): { type: string; version: number }
```

**返回** `{ type: string, version: number ` } 浏览器信息

**示例**

```ts
getBrowserInfo() // { type: 'Chrome', version: 120 }
```

### getClientHeight

获取可视窗口的高度（SSR 环境下返回 0）

**签名**

```ts
const getClientHeight = (): number
```

**返回** `number` 视口高度

**示例**

```ts
getClientHeight() // 900
```

### getClientWidth

获取可视窗口的宽度（SSR 环境下返回 0）

**签名**

```ts
const getClientWidth = (): number
```

**返回** `number` 视口宽度

**示例**

```ts
getClientWidth() // 1440
```

### isBrowser

检测代码是否运行在浏览器环境（布尔值常量，非函数）

**签名**

```ts
const isBrowser: boolean = typeof window === 'object' && typeof document === 'object' && typeof navigator === 'object';
```

**示例**

```ts
if (isBrowser) { document.title = 'x' }
```

### isServer

检测代码是否运行在服务端（Node / SSR）环境

**签名**

```ts
const isServer = (): boolean => !isBrowser;
```

**返回** `boolean`

**示例**

```ts
if (isServer()) { return null }
```

### isSupportWebP

判断浏览器是否支持 webP 格式图片（SSR 环境下返回 false）

**签名**

```ts
const isSupportWebP = (): boolean
```

**返回** `boolean`

**示例**

```ts
if (isSupportWebP()) { img.src = 'a.webp' }
```

### openNewTag

在新窗口/标签页中打开地址

**签名**

```ts
function openNewTag(url: string, tagType: number = 1): void
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `url` | `string` | 目标地址 |
| `tagType` | `number` | 打开方式：1 新标签页（默认），2 固定尺寸的弹窗 |

**返回** `void`

**示例**

```ts
openNewTag('https://example.com');
openNewTag('https://example.com', 2);
```

### scrollToBottom

平滑滚动到页面底部

**签名**

```ts
const scrollToBottom = (): void
```

**返回** `void`

**示例**

```ts
scrollToBottom();
```

### scrollToTop

平滑滚动到页面顶部

**签名**

```ts
const scrollToTop = (): void
```

**返回** `void`

**示例**

```ts
scrollToTop();
```

### smoothScroll

在指定时间内平滑滚动到页面的指定位置（带缓动）

**签名**

```ts
const smoothScroll = (to: number, duration: number = 300): void
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `to` | `number` | 目标滚动位置（px） |
| `duration` | `number` | 动画时长（毫秒），默认 300 |

**返回** `void`

**示例**

```ts
smoothScroll(0, 500); // 0.5 秒内滚回顶部
```

### toFullScreen

进入全屏（兼容各浏览器前缀，SSR 环境下静默跳过）

**签名**

```ts
const toFullScreen = (element?: HTMLElement): void
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `element` | `HTMLElement` | 需要全屏的元素，默认 document.body |

**返回** `void`

**示例**

```ts
toFullScreen();
toFullScreen(document.querySelector('.video'));
```
