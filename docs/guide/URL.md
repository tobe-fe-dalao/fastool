# URL

> Parse, build and mutate query strings safely.

Total 10 functions.

## Functions

### getUrlParams

Get all parameters from a URL; parameters with the same name are returned as an array; numeric-only values are converted to number

**Signature**

```ts
const getUrlParams = (url: string = getCurrentUrl()): Record<string, any>
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `url` | `string` | the URL, defaults to the current page URL |

**Returns** `Record<string, any>` the parameter object

**Example**

```ts
getUrlParams('https://a.com?x=1&x=2&y=hi') // { x: [1, 2], y: 'hi' }
getUrlParams('https://a.com') // {}
```

### getQueryParam

Get the value of a specified parameter from a URL. Unlike getUrlParams, no numeric conversion is performed here; the value is always returned as a string

**Signature**

```ts
const getQueryParam = (key: string, url: string = getCurrentUrl()): string | null
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `key` | `string` | parameter name |
| `url` | `string` | the URL, defaults to the current page URL |

**Returns** `string \| null` the parameter value (string), or null if it does not exist

**Example**

```ts
getQueryParam('id', 'https://a.com?id=3') // '3'
```

### setUrlParams

Add or modify a parameter in a URL (overwrites if it exists, appends if it does not)

**Signature**

```ts
const setUrlParams = (urlKey: string, urlValue: any, url: string = getCurrentUrl()): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `urlKey` | `string` | parameter name |
| `urlValue` | `any` | parameter value |
| `url` | `string` | the URL, defaults to the current page URL |

**Returns** `string` the modified full URL

**Example**

```ts
setUrlParams('id', 3, 'https://a.com?x=1') // 'https://a.com?x=1&id=3'
```

### delUrlParams

Remove a specified parameter from a URL

**Signature**

```ts
const delUrlParams = (name: string, url: string = getCurrentUrl()): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `name` | `string` | parameter name |
| `url` | `string` | the URL, defaults to the current page URL |

**Returns** `string` the modified full URL

**Example**

```ts
delUrlParams('x', 'https://a.com?x=1&y=2') // 'https://a.com?y=2'
```

### paramsJoinUrl

Serialize a parameter object into a query string (both key and value are URL-encoded)

**Signature**

```ts
const paramsJoinUrl = (params: Record<string, any>): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `params` | `Record<string, any>` | the parameter object |

**Returns** `string` the query string, without the leading '?'

**Example**

```ts
paramsJoinUrl({ a: 1, b: 'x y' }) // 'a=1&b=x%20y'
```

### stringifyQuery

A semantic alias for paramsJoinUrl that serializes an object into a query string

**Signature**

```ts
const stringifyQuery = (params: Record<string, any>): string => paramsJoinUrl(params);
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `params` | `Record<string, any>` | the parameter object |

**Returns** `string` the query string, without the leading '?'

**Example**

```ts
stringifyQuery({ a: 1, b: 2 }) // 'a=1&b=2'
```

### getBaseUrl

Get the part of a URL before the '?'

**Signature**

```ts
const getBaseUrl = (url: string = getCurrentUrl()): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `url` | `string` | the URL, defaults to the current page URL |

**Returns** `string` the main URL

**Example**

```ts
getBaseUrl('https://a.com/x?y=1') // 'https://a.com/x'
```

### getUrlDomain

Get the domain from a URL (protocol + host + port)

**Signature**

```ts
const getUrlDomain = (url: string = getCurrentUrl()): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `url` | `string` | the URL, defaults to the current page URL |

**Returns** `string` the domain, or an empty string if parsing fails

**Example**

```ts
getUrlDomain('https://a.com:8080/x?y=1') // 'https://a.com:8080'
```

### isAbsoluteUrl

Check whether a URL is absolute (includes a protocol or is a protocol-relative URL starting with '//')

**Signature**

```ts
const isAbsoluteUrl = (url: string): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `url` | `string` | the URL |

**Returns** `boolean`

**Example**

```ts
isAbsoluteUrl('https://a.com') // true
isAbsoluteUrl('/api/list') // false
```

### joinUrl

Join multiple path segments, automatically handling redundant slashes

**Signature**

```ts
const joinUrl = (...parts: string[]): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `parts` | `...string[]` | path segments |

**Returns** `string` the joined path

**Example**

```ts
joinUrl('https://a.com/', '/api/', '/list') // 'https://a.com/api/list'
```
