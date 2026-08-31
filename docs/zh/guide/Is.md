# Is 类型判断

> 均为 TypeScript 类型守卫，可在 `if` 中直接收窄类型。

共 23 个函数。

## 函数

### isArray

判断是否为数组

**签名**

```ts
function isArray(value: unknown): value is any[]
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `unknown` | 待判断的值 |

**返回** `boolean`

**示例**

```ts
isArray([1, 2]) // true
```

### isString

判断是否为字符串

**签名**

```ts
function isString(value: unknown): value is string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `unknown` | 待判断的值 |

**返回** `boolean`

**示例**

```ts
isString('abc') // true
```

### isNumber

判断是否为 number 类型（不包含 NaN 的字符串，但包含 NaN 本身）

**签名**

```ts
function isNumber(value: unknown): value is number
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `unknown` | 待判断的值 |

**返回** `boolean`

**示例**

```ts
isNumber(1) // true
```

### isBoolean

判断是否为布尔值

**签名**

```ts
function isBoolean(value: unknown): value is boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `unknown` | 待判断的值 |

**返回** `boolean`

**示例**

```ts
isBoolean(false) // true
```

### isFunction

判断是否为函数

**签名**

```ts
function isFunction(value: unknown): value is Function
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `unknown` | 待判断的值 |

**返回** `boolean`

**示例**

```ts
isFunction(() => {}) // true
```

### isSymbol

判断是否为 Symbol

**签名**

```ts
function isSymbol(value: unknown): value is symbol
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `unknown` | 待判断的值 |

**返回** `boolean`

**示例**

```ts
isSymbol(Symbol('a')) // true
```

### isDate

判断是否为有效的 Date 对象

**签名**

```ts
function isDate(value: unknown): value is Date
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `unknown` | 待判断的值 |

**返回** `boolean`

**示例**

```ts
isDate(new Date()) // true
isDate(new Date('x')) // false（无效日期）
```

### isRegExp

判断是否为正则表达式

**签名**

```ts
function isRegExp(value: unknown): value is RegExp
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `unknown` | 待判断的值 |

**返回** `boolean`

**示例**

```ts
isRegExp(/a/) // true
```

### isError

判断是否为 Error 对象

**签名**

```ts
function isError(value: unknown): value is Error
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `unknown` | 待判断的值 |

**返回** `boolean`

**示例**

```ts
isError(new Error('x')) // true
```

### isMap

判断是否为 Map

**签名**

```ts
function isMap(value: unknown): value is Map<any, any>
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `unknown` | 待判断的值 |

**返回** `boolean`

**示例**

```ts
isMap(new Map()) // true
```

### isSet

判断是否为 Set

**签名**

```ts
function isSet(value: unknown): value is Set<any>
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `unknown` | 待判断的值 |

**返回** `boolean`

**示例**

```ts
isSet(new Set()) // true
```

### isPromise

判断是否为 Promise（含 thenable 对象）

**签名**

```ts
function isPromise<T = any>(value: unknown): value is Promise<T>
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `unknown` | 待判断的值 |

**返回** `boolean`

**示例**

```ts
isPromise(Promise.resolve()) // true
```

### isObject

判断是否为对象（不含 null 与数组）

**签名**

```ts
function isObject(value: unknown): value is Record<string, any>
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `unknown` | 待判断的值 |

**返回** `boolean`

**示例**

```ts
isObject({}) // true
isObject([]) // false
```

### isPlainObject

判断是否为「纯对象」（由 {} 或 new Object() 创建的对象）

**签名**

```ts
function isPlainObject(value: unknown): value is Record<string, any>
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `unknown` | 待判断的值 |

**返回** `boolean`

**示例**

```ts
isPlainObject({ a: 1 }) // true
isPlainObject(new Date()) // false
```

### isNil

判断是否为 null 或 undefined

**签名**

```ts
function isNil(value: unknown): value is null | undefined
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `unknown` | 待判断的值 |

**返回** `boolean`

**示例**

```ts
isNil(null) // true
```

### isDef

判断是否已定义（非 undefined）

**签名**

```ts
function isDef<T>(value: T): value is NonNullable<T>
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `unknown` | 待判断的值 |

**返回** `boolean`

**示例**

```ts
isDef(0) // true
```

### isEmpty

判断是否为空：null/undefined/空字符串/空数组/空对象/空 Map/空 Set 均为空

**签名**

```ts
function isEmpty(value: unknown): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `unknown` | 待判断的值 |

**返回** `boolean`

**示例**

```ts
isEmpty({}) // true
isEmpty([1]) // false
isEmpty('  ') // false（空白字符串不算空，可先 trim）
```

### isEmptyObject

判断是否为空对象

**签名**

```ts
function isEmptyObject(value: unknown): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `unknown` | 待判断的值 |

**返回** `boolean`

**示例**

```ts
isEmptyObject({ a: 1 }) // false
```

### isInteger

判断是否为整数

**签名**

```ts
function isInteger(value: unknown): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `unknown` | 待判断的值 |

**返回** `boolean`

**示例**

```ts
isInteger(1.5) // false
```

### isNumeric

判断是否为可用数字（数字类型或可转换为有限数字的字符串）

**签名**

```ts
function isNumeric(value: unknown): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `unknown` | 待判断的值 |

**返回** `boolean`

**示例**

```ts
isNumeric('12.5') // true
isNumeric('12a') // false
```

### isJSON

判断字符串是否为合法的 JSON

**签名**

```ts
function isJSON(str: string): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `str` | `string` | 待判断的字符串 |

**返回** `boolean`

**示例**

```ts
isJSON('{"a":1}') // true
isJSON('{a:1}') // false
```

### isElement

判断是否为 DOM 元素（SSR 环境安全）

**签名**

```ts
function isElement(value: unknown): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `unknown` | 待判断的值 |

**返回** `boolean`

**示例**

```ts
isElement(document.body) // true
```

### isPrimitive

判断是否为基本类型（string / number / boolean / symbol / bigint / null / undefined）

**签名**

```ts
function isPrimitive(value: unknown): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `unknown` | 待判断的值 |

**返回** `boolean`

**示例**

```ts
isPrimitive(1) // true
```
