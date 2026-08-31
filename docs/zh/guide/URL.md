# URL 地址

> 查询参数的解析、拼接与增删改。

共 10 个函数。

## 函数

### getUrlParams

获取 url 中的所有参数；同名参数会以数组形式返回；纯数字会转为 number

**签名**

```ts
const getUrlParams = (url: string = getCurrentUrl()): Record<string, any>
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `url` | `string` | 地址，默认当前页面地址 |

**返回** `Record<string, any>` 参数对象

**示例**

```ts
getUrlParams('https://a.com?x=1&x=2&y=hi') // { x: [1, 2], y: 'hi' }
getUrlParams('https://a.com') // {}
```

### getQueryParam

获取 url 中指定参数的值。与 getUrlParams 不同，这里不做数字转换，始终返回字符串

**签名**

```ts
const getQueryParam = (key: string, url: string = getCurrentUrl()): string | null
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `key` | `string` | 参数名 |
| `url` | `string` | 地址，默认当前页面地址 |

**返回** `string \| null` 参数值（字符串），不存在时返回 null

**示例**

```ts
getQueryParam('id', 'https://a.com?id=3') // '3'
```

### setUrlParams

新增或修改 url 中的参数（已存在则覆盖，不存在则追加）

**签名**

```ts
const setUrlParams = (urlKey: string, urlValue: any, url: string = getCurrentUrl()): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `urlKey` | `string` | 参数名 |
| `urlValue` | `any` | 参数值 |
| `url` | `string` | 地址，默认当前页面地址 |

**返回** `string` 修改后的完整地址

**示例**

```ts
setUrlParams('id', 3, 'https://a.com?x=1') // 'https://a.com?x=1&id=3'
```

### delUrlParams

删除 url 中的指定参数

**签名**

```ts
const delUrlParams = (name: string, url: string = getCurrentUrl()): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `name` | `string` | 参数名 |
| `url` | `string` | 地址，默认当前页面地址 |

**返回** `string` 修改后的完整地址

**示例**

```ts
delUrlParams('x', 'https://a.com?x=1&y=2') // 'https://a.com?y=2'
```

### paramsJoinUrl

将参数对象序列化为查询串（key 与 value 均会做 URL 编码）

**签名**

```ts
const paramsJoinUrl = (params: Record<string, any>): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `params` | `Record<string, any>` | 参数对象 |

**返回** `string` 查询串，不含 '?'

**示例**

```ts
paramsJoinUrl({ a: 1, b: 'x y' }) // 'a=1&b=x%20y'
```

### stringifyQuery

paramsJoinUrl 的语义化别名，将对象序列化为查询串

**签名**

```ts
const stringifyQuery = (params: Record<string, any>): string => paramsJoinUrl(params);
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `params` | `Record<string, any>` | 参数对象 |

**返回** `string` 查询串，不含 '?'

**示例**

```ts
stringifyQuery({ a: 1, b: 2 }) // 'a=1&b=2'
```

### getBaseUrl

获取 url 中 ? 之前的部分

**签名**

```ts
const getBaseUrl = (url: string = getCurrentUrl()): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `url` | `string` | 地址，默认当前页面地址 |

**返回** `string` 主体地址

**示例**

```ts
getBaseUrl('https://a.com/x?y=1') // 'https://a.com/x'
```

### getUrlDomain

获取 url 中的域名（协议 + 主机 + 端口）

**签名**

```ts
const getUrlDomain = (url: string = getCurrentUrl()): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `url` | `string` | 地址，默认当前页面地址 |

**返回** `string` 域名，解析失败返回空串

**示例**

```ts
getUrlDomain('https://a.com:8080/x?y=1') // 'https://a.com:8080'
```

### isAbsoluteUrl

判断是否为绝对地址（含协议或以 // 开头的协议相对地址）

**签名**

```ts
const isAbsoluteUrl = (url: string): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `url` | `string` | 地址 |

**返回** `boolean`

**示例**

```ts
isAbsoluteUrl('https://a.com') // true
isAbsoluteUrl('/api/list') // false
```

### joinUrl

拼接多个路径片段，自动处理多余的斜杠

**签名**

```ts
const joinUrl = (...parts: string[]): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `parts` | `...string[]` | 路径片段 |

**返回** `string` 拼接后的路径

**示例**

```ts
joinUrl('https://a.com/', '/api/', '/list') // 'https://a.com/api/list'
```
