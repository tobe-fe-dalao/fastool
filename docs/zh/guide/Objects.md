# Objects 对象

> 对象取值、筛选、深比较与深拷贝。

共 13 个函数。

## 函数

### pick

从对象中挑选指定的属性，组成新对象

**签名**

```ts
function pick<T extends Record<string, any>, K extends keyof T>( obj: T, keys: K[] ): Pick<T, K>
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `obj` | `T` | 源对象 |
| `keys` | `K[]` | 需要保留的属性名 |

**返回** `Pick<T, K>` 新对象

**示例**

```ts
pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) // { a: 1, c: 3 }
```

### omit

从对象中剔除指定的属性，组成新对象

**签名**

```ts
function omit<T extends Record<string, any>, K extends keyof T>( obj: T, keys: K[] ): Omit<T, K>
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `obj` | `T` | 源对象 |
| `keys` | `K[]` | 需要剔除的属性名 |

**返回** `Omit<T, K>` 新对象

**示例**

```ts
omit({ a: 1, b: 2 }, ['b']) // { a: 1 }
```

### pickBy

按条件挑选对象属性

**签名**

```ts
function pickBy<T extends Record<string, any>>( obj: T, predicate: (value: T[keyof T], key: keyof T) => boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `obj` | `T` | 源对象 |
| `predicate` | `Function` | 判断函数 (value, key) => boolean |

**返回** `Partial<T>` 新对象

**示例**

```ts
pickBy({ a: 1, b: 2 }, (v) => v > 1) // { b: 2 }
```

### omitBy

按条件剔除对象属性

**签名**

```ts
function omitBy<T extends Record<string, any>>( obj: T, predicate: (value: T[keyof T], key: keyof T) => boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `obj` | `T` | 源对象 |
| `predicate` | `Function` | 判断函数 (value, key) => boolean |

**返回** `Partial<T>` 新对象

**示例**

```ts
omitBy({ a: 1, b: 2 }, (v) => v > 1) // { a: 1 }
```

### deepEqual

深度比较两个值是否相等（支持数组、对象、Date、RegExp、Map、Set，NaN 视为相等）

**签名**

```ts
function deepEqual(a: unknown, b: unknown): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `a` | `unknown` | 比较值 A |
| `b` | `unknown` | 比较值 B |

**返回** `boolean` 是否深度相等

**示例**

```ts
deepEqual({ a: [1, 2] }, { a: [1, 2] }) // true
```

### get

安全地按路径获取对象中的值，路径不存在时返回默认值

**签名**

```ts
function get(obj: unknown, path: string, defaultValue?: any): any
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `obj` | `unknown` | 源对象 |
| `path` | `string` | 属性路径，支持 'a.b[0].c' 形式 |
| `defaultValue` | `any` | 取不到时返回的默认值 |

**返回** `any` 取到的值或默认值

**示例**

```ts
get({ a: { b: [1, 2] } }, 'a.b[1]') // 2
get({ a: 1 }, 'x.y', 'none') // 'none'
```

### set

按路径设置对象的值，路径上的中间对象会自动创建

**签名**

```ts
function set<T extends Record<string, any>>(obj: T, path: string, value: unknown): T
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `obj` | `T` | 源对象 |
| `path` | `string` | 属性路径，支持 'a.b[0].c' 形式 |
| `value` | `unknown` | 需要设置的值 |

**返回** `T` 原对象（原地修改）

**示例**

```ts
set({}, 'a.b', 1) // { a: { b: 1 } }
set({}, 'a.list[0]', 'x') // { a: { list: ['x'] } }
```

### has

判断对象中是否存在指定路径的属性（包含值为 undefined 的属性）

**签名**

```ts
function has(obj: unknown, path: string): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `obj` | `unknown` | 源对象 |
| `path` | `string` | 属性路径 |

**返回** `boolean`

**示例**

```ts
has({ a: { b: 1 } }, 'a.b') // true
```

### invert

反转对象的键与值（新值作为键，原键作为值）

**签名**

```ts
function invert(obj: Record<string, any>): Record<string, string>
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `obj` | `Record<string, any>` | 源对象 |

**返回** `Record<string, string>` 反转后的对象

**示例**

```ts
invert({ a: '1', b: '2' }) // { '1': 'a', '2': 'b' }
```

### mapKeys

遍历对象并转换其键名

**签名**

```ts
function mapKeys<V>( obj: Record<string, V>, iteratee: (value: V, key: string) => string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `obj` | `Record<string, V>` | 源对象 |
| `iteratee` | `Function` | 键名转换函数 (value, key) => string |

**返回** `Record<string, V>` 新对象

**示例**

```ts
mapKeys({ a: 1 }, (v, k) => k.toUpperCase()) // { A: 1 }
```

### mapValues

遍历对象并转换其值

**签名**

```ts
function mapValues<V, R>( obj: Record<string, V>, iteratee: (value: V, key: string) => R
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `obj` | `Record<string, V>` | 源对象 |
| `iteratee` | `Function` | 值转换函数 (value, key) => R |

**返回** `Record<string, R>` 新对象

**示例**

```ts
mapValues({ a: 1, b: 2 }, (v) => v * 2) // { a: 2, b: 4 }
```

### toPairs

将对象转换为 [key, value] 键值对数组

**签名**

```ts
function toPairs<V>(obj: Record<string, V>): [string, V][]
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `obj` | `Record<string, V>` | 源对象 |

**返回** `Array` 键值对数组

**示例**

```ts
toPairs({ a: 1, b: 2 }) // [['a', 1], ['b', 2]]
```

### fromPairs

将 [key, value] 键值对数组转换为对象

**签名**

```ts
function fromPairs<V>(pairs: [string, V][]): Record<string, V>
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pairs` | `Array` | 键值对数组 |

**返回** `Record<string, V>` 对象

**示例**

```ts
fromPairs([['a', 1], ['b', 2]]) // { a: 1, b: 2 }
```
