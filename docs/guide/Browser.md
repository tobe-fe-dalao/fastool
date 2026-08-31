# Browser

> Environment detection, viewport, scroll and fullscreen. SSR-guarded.

Total 12 functions.

## Functions

### exitFullScreen

Exit fullscreen (compatible with vendor prefixes; silently skipped under SSR)

**Signature**

```ts
const exitFullScreen = (): void
```

**Returns** `void`

**Example**

```ts
exitFullScreen();
```

### getBrowserInfo

Get the browser type and version (returns unknown under SSR)

**Signature**

```ts
const getBrowserInfo = (): { type: string; version: number }
```

**Returns** `{ type: string, version: number ` } browser info

**Example**

```ts
getBrowserInfo() // { type: 'Chrome', version: 120 }
```

### getClientHeight

Get the viewport height (returns 0 under SSR)

**Signature**

```ts
const getClientHeight = (): number
```

**Returns** `number` viewport height

**Example**

```ts
getClientHeight() // 900
```

### getClientWidth

Get the viewport width (returns 0 under SSR)

**Signature**

```ts
const getClientWidth = (): number
```

**Returns** `number` viewport width

**Example**

```ts
getClientWidth() // 1440
```

### isBrowser

Detect whether code runs in a browser environment (a boolean constant, not a function)

**Signature**

```ts
const isBrowser: boolean = typeof window === 'object' && typeof document === 'object' && typeof navigator === 'object';
```

**Example**

```ts
if (isBrowser) { document.title = 'x' }
```

### isServer

Detect whether code runs in a server (Node / SSR) environment

**Signature**

```ts
const isServer = (): boolean => !isBrowser;
```

**Returns** `boolean`

**Example**

```ts
if (isServer()) { return null }
```

### isSupportWebP

Check whether the browser supports WebP image format (returns false under SSR)

**Signature**

```ts
const isSupportWebP = (): boolean
```

**Returns** `boolean`

**Example**

```ts
if (isSupportWebP()) { img.src = 'a.webp' }
```

### openNewTag

Open a URL in a new window / tab

**Signature**

```ts
function openNewTag(url: string, tagType: number = 1): void
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `url` | `string` | target URL |
| `tagType` | `number` | how to open: 1 new tab (default), 2 fixed-size popup window |

**Returns** `void`

**Example**

```ts
openNewTag('https://example.com');
openNewTag('https://example.com', 2);
```

### scrollToBottom

Smoothly scroll to the bottom of the page

**Signature**

```ts
const scrollToBottom = (): void
```

**Returns** `void`

**Example**

```ts
scrollToBottom();
```

### scrollToTop

Smoothly scroll to the top of the page

**Signature**

```ts
const scrollToTop = (): void
```

**Returns** `void`

**Example**

```ts
scrollToTop();
```

### smoothScroll

Smoothly scroll to a given page position within a duration (with easing)

**Signature**

```ts
const smoothScroll = (to: number, duration: number = 300): void
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `to` | `number` | target scroll position (px) |
| `duration` | `number` | animation duration in ms, default 300 |

**Returns** `void`

**Example**

```ts
smoothScroll(0, 500); // scroll back to top within 0.5s
```

### toFullScreen

Enter fullscreen (compatible with vendor prefixes; silently skipped under SSR)

**Signature**

```ts
const toFullScreen = (element?: HTMLElement): void
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `element` | `HTMLElement` | the element to display fullscreen, defaults to document.body |

**Returns** `void`

**Example**

```ts
toFullScreen();
toFullScreen(document.querySelector('.video'));
```
