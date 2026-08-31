# 型判定 (Is)

> TypeScript type guards that narrow types inside `if`.

Total 23 functions.

## Functions

### isArray

Check whether the value is an array

**Signature**

```ts
function isArray(value: unknown): value is any[]
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `unknown` | value to check |

**Returns** `boolean`

**Example**

```ts
isArray([1, 2]) // true
```

### isString

Check whether the value is a string

**Signature**

```ts
function isString(value: unknown): value is string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `unknown` | value to check |

**Returns** `boolean`

**Example**

```ts
isString('abc') // true
```

### isNumber

Check whether the value is of type number (excludes numeric strings, but includes NaN itself)

**Signature**

```ts
function isNumber(value: unknown): value is number
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `unknown` | value to check |

**Returns** `boolean`

**Example**

```ts
isNumber(1) // true
```

### isBoolean

Check whether the value is a boolean

**Signature**

```ts
function isBoolean(value: unknown): value is boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `unknown` | value to check |

**Returns** `boolean`

**Example**

```ts
isBoolean(false) // true
```

### isFunction

Check whether the value is a function

**Signature**

```ts
function isFunction(value: unknown): value is Function
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `unknown` | value to check |

**Returns** `boolean`

**Example**

```ts
isFunction(() => {}) // true
```

### isSymbol

Check whether the value is a Symbol

**Signature**

```ts
function isSymbol(value: unknown): value is symbol
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `unknown` | value to check |

**Returns** `boolean`

**Example**

```ts
isSymbol(Symbol('a')) // true
```

### isDate

Check whether the value is a valid Date object

**Signature**

```ts
function isDate(value: unknown): value is Date
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `unknown` | value to check |

**Returns** `boolean`

**Example**

```ts
isDate(new Date()) // true
isDate(new Date('x')) // false (invalid date)
```

### isRegExp

Check whether the value is a RegExp

**Signature**

```ts
function isRegExp(value: unknown): value is RegExp
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `unknown` | value to check |

**Returns** `boolean`

**Example**

```ts
isRegExp(/a/) // true
```

### isError

Check whether the value is an Error object

**Signature**

```ts
function isError(value: unknown): value is Error
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `unknown` | value to check |

**Returns** `boolean`

**Example**

```ts
isError(new Error('x')) // true
```

### isMap

Check whether the value is a Map

**Signature**

```ts
function isMap(value: unknown): value is Map<any, any>
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `unknown` | value to check |

**Returns** `boolean`

**Example**

```ts
isMap(new Map()) // true
```

### isSet

Check whether the value is a Set

**Signature**

```ts
function isSet(value: unknown): value is Set<any>
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `unknown` | value to check |

**Returns** `boolean`

**Example**

```ts
isSet(new Set()) // true
```

### isPromise

Check whether the value is a Promise (includes thenable objects)

**Signature**

```ts
function isPromise<T = any>(value: unknown): value is Promise<T>
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `unknown` | value to check |

**Returns** `boolean`

**Example**

```ts
isPromise(Promise.resolve()) // true
```

### isObject

Check whether the value is an object (excludes null and arrays)

**Signature**

```ts
function isObject(value: unknown): value is Record<string, any>
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `unknown` | value to check |

**Returns** `boolean`

**Example**

```ts
isObject({}) // true
isObject([]) // false
```

### isPlainObject

Check whether the value is a plain object (created by {} or new Object())

**Signature**

```ts
function isPlainObject(value: unknown): value is Record<string, any>
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `unknown` | value to check |

**Returns** `boolean`

**Example**

```ts
isPlainObject({ a: 1 }) // true
isPlainObject(new Date()) // false
```

### isNil

Check whether the value is null or undefined

**Signature**

```ts
function isNil(value: unknown): value is null | undefined
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `unknown` | value to check |

**Returns** `boolean`

**Example**

```ts
isNil(null) // true
```

### isDef

Check whether the value is defined (not undefined)

**Signature**

```ts
function isDef<T>(value: T): value is NonNullable<T>
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `unknown` | value to check |

**Returns** `boolean`

**Example**

```ts
isDef(0) // true
```

### isEmpty

Check whether the value is empty: null/undefined/empty string/empty array/empty object/empty Map/empty Set are all considered empty

**Signature**

```ts
function isEmpty(value: unknown): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `unknown` | value to check |

**Returns** `boolean`

**Example**

```ts
isEmpty({}) // true
isEmpty([1]) // false
isEmpty('  ') // false (whitespace is not considered empty; trim first)
```

### isEmptyObject

Check whether the value is an empty object

**Signature**

```ts
function isEmptyObject(value: unknown): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `unknown` | value to check |

**Returns** `boolean`

**Example**

```ts
isEmptyObject({ a: 1 }) // false
```

### isInteger

Check whether the value is an integer

**Signature**

```ts
function isInteger(value: unknown): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `unknown` | value to check |

**Returns** `boolean`

**Example**

```ts
isInteger(1.5) // false
```

### isNumeric

Check whether the value is a usable number (a number type or a string convertible to a finite number)

**Signature**

```ts
function isNumeric(value: unknown): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `unknown` | value to check |

**Returns** `boolean`

**Example**

```ts
isNumeric('12.5') // true
isNumeric('12a') // false
```

### isJSON

Check whether a string is valid JSON

**Signature**

```ts
function isJSON(str: string): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `str` | `string` | string to check |

**Returns** `boolean`

**Example**

```ts
isJSON('{"a":1}') // true
isJSON('{a:1}') // false
```

### isElement

Check whether the value is a DOM element (SSR-safe)

**Signature**

```ts
function isElement(value: unknown): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `unknown` | value to check |

**Returns** `boolean`

**Example**

```ts
isElement(document.body) // true
```

### isPrimitive

Check whether the value is a primitive type (string / number / boolean / symbol / bigint / null / undefined)

**Signature**

```ts
function isPrimitive(value: unknown): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `unknown` | value to check |

**Returns** `boolean`

**Example**

```ts
isPrimitive(1) // true
```
