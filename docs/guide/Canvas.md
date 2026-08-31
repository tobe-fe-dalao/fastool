# Canvas

> Image to Base64 and color format conversion.

Total 4 functions.

## Functions

### getImageBase64Url

Convert an image element to a base64 (dataURL) address

**Signature**

```ts
function getImageBase64Url(image: HTMLImageElement, quality = 1): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `image` | `HTMLImageElement` | the image element |
| `quality` | `number` | image quality 0~1, defaults to 1 |

**Returns** `string` the dataURL, or an empty string if conversion fails

**Example**

```ts
getImageBase64Url(imgEl)
```

### changeColorToRGBA

Convert any CSS color value to an rgba component object

**Signature**

```ts
function changeColorToRGBA(color: string): { r: number; g: number; b: number; a: number }
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `color` | `string` | the color value, e.g. '#fff', 'rgba(0,0,0,.5)', 'red' |

**Returns** `{ r: number, g: number, b: number, a: number ` } rgba components

**Example**

```ts
changeColorToRGBA('#fff') // { r: 255, g: 255, b: 255, a: 1 }
```

### hexToRgb

Convert a hexadecimal color to an rgb string or component object

**Signature**

```ts
function hexToRgb( hex: string, toString = false ): { r: number; g: number; b: number } | string | null
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `hex` | `string` | the hex color, supports #fff and #ffffff |
| `toString` | `boolean` | whether to return an 'rgb(r, g, b)' string, defaults to false |

**Returns** `object \| string` component object or rgb string; returns null on invalid format

**Example**

```ts
hexToRgb('#ffffff') // { r: 255, g: 255, b: 255 }
hexToRgb('#fff', true) // 'rgb(255, 255, 255)'
```

### rgbToHex

Convert rgb components to a hexadecimal color

**Signature**

```ts
function rgbToHex(r: number, g: number, b: number): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `r` | `number` | the red component 0~255 |
| `g` | `number` | the green component 0~255 |
| `b` | `number` | the blue component 0~255 |

**Returns** `string` hex color

**Example**

```ts
rgbToHex(255, 255, 255) // '#ffffff'
```
