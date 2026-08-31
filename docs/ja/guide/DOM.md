# DOM

> Event binding, style read/write, clipboard and file download.

Total 24 functions.

## Functions

### addEvent

Bind an event to an element

**Signature**

```ts
function addEvent( el: EventTarget | null, event: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions ): void
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `el` | `EventTarget` | target element |
| `event` | `string` | event name |
| `handler` | `Function` | event handler |
| `options` | `AddEventListenerOptions` | listener options (capture / passive / once, etc.) |

**Returns** `void`

**Example**

```ts
addEvent(window, 'resize', onResize, { passive: true });
```

### removeEvent

Remove a bound event from an element

**Signature**

```ts
function removeEvent( el: EventTarget | null, event: string, handler: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions ): void
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `el` | `EventTarget` | target element |
| `event` | `string` | event name |
| `handler` | `Function` | event handler |
| `options` | `EventlistenerOptions` | listener options; must match those used when binding |

**Returns** `void`

**Example**

```ts
removeEvent(window, 'resize', onResize);
```

### addEventOnce

Bind an event that runs only once, auto-unbinding after firing

**Signature**

```ts
function addEventOnce( el: EventTarget | null, event: string, handler: EventListener ): void
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `el` | `EventTarget` | target element |
| `event` | `string` | event name |
| `handler` | `Function` | event handler |

**Returns** `void`

**Example**

```ts
addEventOnce(document, 'DOMContentLoaded', init);
```

### toggleClass

Toggle an element's class; when force is passed, add or remove by boolean

**Signature**

```ts
function toggleClass(el: HTMLElement | null, className: string, force?: boolean): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `el` | `HTMLElement` | target element |
| `className` | `string` | class name |
| `force` | `boolean` | force flag; true adds, false removes |

**Returns** `boolean` whether the class is present after the operation

**Example**

```ts
toggleClass(el, 'active');
toggleClass(el, 'active', true); // force add
```

### getStyle

Get an element's computed style; returns the full CSSStyleDeclaration when no property is given

**Signature**

```ts
function getStyle( el: HTMLElement | null, property?: string ): string | CSSStyleDeclaration
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `el` | `HTMLElement` | target element |
| `property` | `string` | CSS property name (camelCase, e.g. backgroundColor) |

**Returns** `string \| CSSStyleDeclaration` style value

**Example**

```ts
getStyle(el, 'fontSize') // '16px'
```

### getScrollPosition

Get the current page scroll position

**Signature**

```ts
function getScrollPosition(): { x: number; y: number }
```

**Returns** `{ x: number, y: number ` } horizontal and vertical scroll distances

**Example**

```ts
getScrollPosition() // { x: 0, y: 320 }
```

### copyToClipboard

Copy text to the clipboard; prefers the Clipboard API, falling back to textarea + execCommand when unsupported

**Signature**

```ts
async function copyToClipboard(text: string): Promise<boolean>
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `text` | `string` | text to copy |

**Returns** `Promise<boolean>` whether the copy succeeded

**Example**

```ts
await copyToClipboard('hello');
```

### downloadFile

Trigger a browser download, supporting a URL or Blob

**Signature**

```ts
function downloadFile(source: string | Blob, fileName: string): void
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `source` | `string \| Blob` | file URL or Blob object |
| `fileName` | `string` | file name to save as |

**Returns** `void`

**Example**

```ts
downloadFile('https://a.com/a.pdf', '报告.pdf');
downloadFile(blob, 'data.xlsx');
```

### isInViewport

Check whether an element is within the viewport (commonly used for image lazy-loading)

**Signature**

```ts
function isInViewport(el: HTMLElement | null, offset = 0): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `el` | `HTMLElement` | target element |
| `offset` | `number` | margin in px, default 0 |

**Returns** `boolean`

**Example**

```ts
if (isInViewport(img, 100)) { img.src = img.dataset.src }
```

### dataURLtoFile

Convert a dataUrl to a file

**Signature**

```ts
const dataURLtoFile = (dataUrl: string, fileName: string = getFileName()): any
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `dataUrl` | `string` |  |
| `fileName` | `string` |  |

**Returns** `any` file object

**Example**

```ts
let file = dataURLtoFile(dataUrl, fileName)
```

### base64toFile

Convert base64 to a file

**Signature**

```ts
const base64toFile = (base64: string, fileName: string = getFileName()): any
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `base64` | `string` |  |
| `fileName` | `string` |  |

**Returns** `any` file object

**Example**

```ts
let file = base64toFile(base64, fileName)
```

### dataURLtoBlob

Convert a dataUrl/base64 to a blob

**Signature**

```ts
const dataURLtoBlob = (dataurl: string): Blob | null
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `dataurl` | ` string ` |  |

**Returns** ` Blob ` Blob

**Example**

```ts
let blob = dataURLtoBlob(dataurl)
```

### base64toBlob

Convert base64 to a blob

**Signature**

```ts
const base64toBlob = (base64: string): Blob | null
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `base64` | ` string ` |  |

**Returns** ` Blob ` Blob

**Example**

```ts
let blob = base64toBlob(dataurl)
```

### blobtoFile

Convert a blob to a file

**Signature**

```ts
const blobtoFile = (blob: Blob, fileName: string = getFileName()): any
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `blob` | ` Blob ` |  |
| `fileName` | ` string ` |  |

**Returns** ` any ` file object

**Example**

```ts
let file = blobtoFile(blob, filename)
```

### filetoBase64

Convert a file object to base64

**Signature**

```ts
const filetoBase64 = (file: any): Promise<any>
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `file` | `` |  |

**Returns** ` Promise ` Promise object, asynchronous

### getFromClipboard

📝 Get clipboard content

**Signature**

```ts
const getFromClipboard = (): Promise<string>
```

**Returns** `Promise<string>`

**Example**

```ts
getFromClipboard().then(res => {...}
```

### removeHTMLTag

📝 Strip all tags from text, keeping only the text

**Signature**

```ts
const removeHTMLTag = (str: string): string => str.replace(/<[^>]+>/g, '');
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `str` | `string` |  |

**Returns** `string`

**Example**

```ts
removeHTMLTag('<p>hello</p>') // 'hello'
```

### setElementStyle

📝 Set an element's style

**Signature**

```ts
const setElementStyle = (el: HTMLElement | null, styleObj: objectKeyOnlyCss)
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `el` | `HTMLElement` |  |
| `styleObj` | `objectKeyOnlyCss` |  |

**Returns** `void`

**Example**

```ts
setStyle(el, {border:'',position:''})
```

### setProperties

📝 Set an element's properties

**Signature**

```ts
const setProperties = ( el: HTMLElement | null, properties: Record<string, string> )
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `el` | `(HTMLElement \| null)` |  |
| `properties` | `object` |  |

**Returns** `void`

**Example**

```ts
setProperties(el, {--rotate:'360deg'})
```

### hasClass

**Signature**

```ts
const hasClass = (ele: HTMLElement, className: string)
```

### addClass

**Signature**

```ts
const addClass = (ele: HTMLElement, className: string)
```

### removeClass

**Signature**

```ts
const removeClass = (ele: HTMLElement, className: string)
```

### windowResize

H5 soft-keyboard collapse / pop-up callback.

**Signature**

```ts
const windowResize = (downCb?: (height: number) => void, upCb?: (height: number) => void): (() => void)
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `downCb` | `Function` | callback fired when the soft keyboard collapses (after popping up) |
| `upCb` | `Function` | callback fired when the soft keyboard pops up |

**Returns** `Function` function to cancel the listener

**Example**

```ts

const off = windowResize(
() => console.log('键盘收起'),
() => console.log('键盘弹起')
)
// when no longer needed
off()
```

### watchResize

Watch window size changes, getting width/height in the callback (based on ResizeObserver, falling back to the resize event)

**Signature**

```ts
const watchResize = (callback: (size: { width: number; height: number }) => void): (() => void)
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `callback` | `Function` | size-change callback |

**Returns** `Function` function to cancel the listener

**Example**

```ts

const off = watchResize(({ width, height }) => console.log(width, height))
```
