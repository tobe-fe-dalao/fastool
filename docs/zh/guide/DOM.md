# DOM 元素

> 事件绑定、样式读写、剪贴板与文件下载。

共 24 个函数。

## 函数

### addEvent

为元素绑定事件

**签名**

```ts
function addEvent( el: EventTarget | null, event: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions ): void
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `el` | `EventTarget` | 目标元素 |
| `event` | `string` | 事件名 |
| `handler` | `Function` | 事件处理函数 |
| `options` | `AddEventListenerOptions` | 监听配置（capture / passive / once 等） |

**返回** `void`

**示例**

```ts
addEvent(window, 'resize', onResize, { passive: true });
```

### removeEvent

移除元素上已绑定的事件

**签名**

```ts
function removeEvent( el: EventTarget | null, event: string, handler: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions ): void
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `el` | `EventTarget` | 目标元素 |
| `event` | `string` | 事件名 |
| `handler` | `Function` | 事件处理函数 |
| `options` | `EventlistenerOptions` | 监听配置，需与绑定时保持一致 |

**返回** `void`

**示例**

```ts
removeEvent(window, 'resize', onResize);
```

### addEventOnce

绑定只执行一次的事件，触发后自动解绑

**签名**

```ts
function addEventOnce( el: EventTarget | null, event: string, handler: EventListener ): void
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `el` | `EventTarget` | 目标元素 |
| `event` | `string` | 事件名 |
| `handler` | `Function` | 事件处理函数 |

**返回** `void`

**示例**

```ts
addEventOnce(document, 'DOMContentLoaded', init);
```

### toggleClass

切换元素的 class；传入 force 时按布尔值强制添加或移除

**签名**

```ts
function toggleClass(el: HTMLElement | null, className: string, force?: boolean): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `el` | `HTMLElement` | 目标元素 |
| `className` | `string` | class 名称 |
| `force` | `boolean` | 强制设置，true 添加、false 移除 |

**返回** `boolean` 操作后是否含有该 class

**示例**

```ts
toggleClass(el, 'active');
toggleClass(el, 'active', true); // 强制添加
```

### getStyle

获取元素的计算样式；不传属性名时返回完整的 CSSStyleDeclaration

**签名**

```ts
function getStyle( el: HTMLElement | null, property?: string ): string | CSSStyleDeclaration
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `el` | `HTMLElement` | 目标元素 |
| `property` | `string` | CSS 属性名（小驼峰，如 backgroundColor） |

**返回** `string \| CSSStyleDeclaration` 样式值

**示例**

```ts
getStyle(el, 'fontSize') // '16px'
```

### getScrollPosition

获取当前页面的滚动位置

**签名**

```ts
function getScrollPosition(): { x: number; y: number }
```

**返回** `{ x: number, y: number ` } 横向与纵向滚动距离

**示例**

```ts
getScrollPosition() // { x: 0, y: 320 }
```

### copyToClipboard

复制文本到剪贴板；优先使用 Clipboard API，不支持时回退到 textarea + execCommand

**签名**

```ts
async function copyToClipboard(text: string): Promise<boolean>
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `text` | `string` | 需要复制的文本 |

**返回** `Promise<boolean>` 是否复制成功

**示例**

```ts
await copyToClipboard('hello');
```

### downloadFile

触发浏览器下载，支持传入 URL 或 Blob

**签名**

```ts
function downloadFile(source: string | Blob, fileName: string): void
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `source` | `string \| Blob` | 文件地址或 Blob 对象 |
| `fileName` | `string` | 保存的文件名 |

**返回** `void`

**示例**

```ts
downloadFile('https://a.com/a.pdf', '报告.pdf');
downloadFile(blob, 'data.xlsx');
```

### isInViewport

判断元素是否在可视区域内（常用于图片懒加载）

**签名**

```ts
function isInViewport(el: HTMLElement | null, offset = 0): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `el` | `HTMLElement` | 目标元素 |
| `offset` | `number` | 提前量，单位为 px，默认 0 |

**返回** `boolean`

**示例**

```ts
if (isInViewport(img, 100)) { img.src = img.dataset.src }
```

### dataURLtoFile

将dataUrl转换为文件

**签名**

```ts
const dataURLtoFile = (dataUrl: string, fileName: string = getFileName()): any
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `dataUrl` | `string` |  |
| `fileName` | `string` |  |

**返回** `any` 文件对象

**示例**

```ts
let file = dataURLtoFile(dataUrl, fileName)
```

### base64toFile

将base64转换为文件

**签名**

```ts
const base64toFile = (base64: string, fileName: string = getFileName()): any
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `base64` | `string` |  |
| `fileName` | `string` |  |

**返回** `any` 文件对象

**示例**

```ts
let file = base64toFile(base64, fileName)
```

### dataURLtoBlob

将dataUrl/base64转换为blob

**签名**

```ts
const dataURLtoBlob = (dataurl: string): Blob | null
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `dataurl` | ` string ` |  |

**返回** ` Blob ` Blob

**示例**

```ts
let blob = dataURLtoBlob(dataurl)
```

### base64toBlob

将base64转换为blob

**签名**

```ts
const base64toBlob = (base64: string): Blob | null
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `base64` | ` string ` |  |

**返回** ` Blob ` Blob

**示例**

```ts
let blob = base64toBlob(dataurl)
```

### blobtoFile

将blob转换为文件

**签名**

```ts
const blobtoFile = (blob: Blob, fileName: string = getFileName()): any
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `blob` | ` Blob ` |  |
| `fileName` | ` string ` |  |

**返回** ` any ` 文件对象

**示例**

```ts
let file = blobtoFile(blob, filename)
```

### filetoBase64

文件对象转base64

**签名**

```ts
const filetoBase64 = (file: any): Promise<any>
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `file` | `` |  |

**返回** ` Promise ` Promise对象，异步处理

### getFromClipboard

📝 获取剪贴板内容

**签名**

```ts
const getFromClipboard = (): Promise<string>
```

**返回** `Promise<string>`

**示例**

```ts
getFromClipboard().then(res => {...}
```

### removeHTMLTag

📝 去掉文本中所有标签，只保留文本

**签名**

```ts
const removeHTMLTag = (str: string): string => str.replace(/<[^>]+>/g, '');
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `str` | `string` |  |

**返回** `string`

**示例**

```ts
removeHTMLTag('<p>hello</p>') // 'hello'
```

### setElementStyle

📝 设置元素的样式

**签名**

```ts
const setElementStyle = (el: HTMLElement | null, styleObj: objectKeyOnlyCss)
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `el` | `HTMLElement` |  |
| `styleObj` | `objectKeyOnlyCss` |  |

**返回** `void`

**示例**

```ts
setStyle(el, {border:'',position:''})
```

### setProperties

📝 设置元素的属性

**签名**

```ts
const setProperties = ( el: HTMLElement | null, properties: Record<string, string> )
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `el` | `(HTMLElement \| null)` |  |
| `properties` | `object` |  |

**返回** `void`

**示例**

```ts
setProperties(el, {--rotate:'360deg'})
```

### hasClass

**签名**

```ts
const hasClass = (ele: HTMLElement, className: string)
```

### addClass

**签名**

```ts
const addClass = (ele: HTMLElement, className: string)
```

### removeClass

**签名**

```ts
const removeClass = (ele: HTMLElement, className: string)
```

### windowResize

H5 软键盘缩回、弹起回调。

**签名**

```ts
const windowResize = (downCb?: (height: number) => void, upCb?: (height: number) => void): (() => void)
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `downCb` | `Function` | 当软键盘弹起后、缩回时触发的回调 |
| `upCb` | `Function` | 当软键盘弹起时触发的回调 |

**返回** `Function` 取消监听的函数

**示例**

```ts

const off = windowResize(
() => console.log('键盘收起'),
() => console.log('键盘弹起')
)
// 不需要时
off()
```

### watchResize

监听窗口尺寸变化，回调中拿到宽高（基于 ResizeObserver，降级到 resize 事件）

**签名**

```ts
const watchResize = (callback: (size: { width: number; height: number }) => void): (() => void)
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `callback` | `Function` | 尺寸变化回调 |

**返回** `Function` 取消监听的函数

**示例**

```ts

const off = watchResize(({ width, height }) => console.log(width, height))
```
