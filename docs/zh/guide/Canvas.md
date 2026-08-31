# Canvas 画布

> 图片转 Base64 与颜色格式转换。

共 4 个函数。

## 函数

### getImageBase64Url

将图片元素转换为 base64（dataURL）地址

**签名**

```ts
function getImageBase64Url(image: HTMLImageElement, quality = 1): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `image` | `HTMLImageElement` | 图片元素 |
| `quality` | `number` | 图片质量 0~1，默认 1 |

**返回** `string` dataURL，转换失败时返回空串

**示例**

```ts
getImageBase64Url(imgEl)
```

### changeColorToRGBA

将任意 CSS 颜色值转换为 rgba 分量对象

**签名**

```ts
function changeColorToRGBA(color: string): { r: number; g: number; b: number; a: number }
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `color` | `string` | 颜色值，如 '#fff'、'rgba(0,0,0,.5)'、'red' |

**返回** `{ r: number, g: number, b: number, a: number ` } rgba 分量

**示例**

```ts
changeColorToRGBA('#fff') // { r: 255, g: 255, b: 255, a: 1 }
```

### hexToRgb

将十六进制颜色转换为 rgb 字符串或分量对象

**签名**

```ts
function hexToRgb( hex: string, toString = false ): { r: number; g: number; b: number } | string | null
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `hex` | `string` | 十六进制颜色，支持 #fff 与 #ffffff |
| `toString` | `boolean` | 是否返回 'rgb(r, g, b)' 字符串，默认 false |

**返回** `object \| string` 分量对象或 rgb 字符串，格式错误时返回 null

**示例**

```ts
hexToRgb('#ffffff') // { r: 255, g: 255, b: 255 }
hexToRgb('#fff', true) // 'rgb(255, 255, 255)'
```

### rgbToHex

将 rgb 分量转换为十六进制颜色

**签名**

```ts
function rgbToHex(r: number, g: number, b: number): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `r` | `number` | 红色分量 0~255 |
| `g` | `number` | 绿色分量 0~255 |
| `b` | `number` | 蓝色分量 0~255 |

**返回** `string` 十六进制颜色

**示例**

```ts
rgbToHex(255, 255, 255) // '#ffffff'
```
