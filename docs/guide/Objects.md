# Objects

> Path access, filtering, deep equality and deep clone.

Total 13 functions.

## Functions

### pick

Pick the specified properties from an object into a new object

**Signature**

```ts
function pick<T extends Record<string, any>, K extends keyof T>( obj: T, keys: K[] ): Pick<T, K>
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `obj` | `T` | source object |
| `keys` | `K[]` | property names to keep |

**Returns** `Pick<T, K>` new object

**Example**

```ts
pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) // { a: 1, c: 3 }
```

### omit

Omit the specified properties from an object into a new object

**Signature**

```ts
function omit<T extends Record<string, any>, K extends keyof T>( obj: T, keys: K[] ): Omit<T, K>
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `obj` | `T` | source object |
| `keys` | `K[]` | property names to omit |

**Returns** `Omit<T, K>` new object

**Example**

```ts
omit({ a: 1, b: 2 }, ['b']) // { a: 1 }
```

### pickBy

Pick object properties by a given criterion

**Signature**

```ts
function pickBy<T extends Record<string, any>>( obj: T, predicate: (value: T[keyof T], key: keyof T) => boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `obj` | `T` | source object |
| `predicate` | `Function` | predicate function (value, key) => boolean |

**Returns** `Partial<T>` new object

**Example**

```ts
pickBy({ a: 1, b: 2 }, (v) => v > 1) // { b: 2 }
```

### omitBy

Omit object properties by a given criterion

**Signature**

```ts
function omitBy<T extends Record<string, any>>( obj: T, predicate: (value: T[keyof T], key: keyof T) => boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `obj` | `T` | source object |
| `predicate` | `Function` | predicate function (value, key) => boolean |

**Returns** `Partial<T>` new object

**Example**

```ts
omitBy({ a: 1, b: 2 }, (v) => v > 1) // { a: 1 }
```

### deepEqual

Deeply compare two values for equality (supports arrays, objects, Date, RegExp, Map, Set; NaN is treated as equal)

**Signature**

```ts
function deepEqual(a: unknown, b: unknown): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `a` | `unknown` | value A |
| `b` | `unknown` | value B |

**Returns** `boolean` whether the values are deeply equal

**Example**

```ts
deepEqual({ a: [1, 2] }, { a: [1, 2] }) // true
```

### get

Safely get a value from an object by path, returning a default value when the path does not exist

**Signature**

```ts
function get(obj: unknown, path: string, defaultValue?: any): any
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `obj` | `unknown` | source object |
| `path` | `string` | property path, supports the 'a.b[0].c' form |
| `defaultValue` | `any` | default value returned when not found |

**Returns** `any` the value found or the default

**Example**

```ts
get({ a: { b: [1, 2] } }, 'a.b[1]') // 2
get({ a: 1 }, 'x.y', 'none') // 'none'
```

### set

Set a value on an object by path; intermediate objects along the path are created automatically

**Signature**

```ts
function set<T extends Record<string, any>>(obj: T, path: string, value: unknown): T
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `obj` | `T` | source object |
| `path` | `string` | property path, supports the 'a.b[0].c' form |
| `value` | `unknown` | value to set |

**Returns** `T` the original object (mutated in place)

**Example**

```ts
set({}, 'a.b', 1) // { a: { b: 1 } }
set({}, 'a.list[0]', 'x') // { a: { list: ['x'] } }
```

### has

Check whether an object has a property at the given path (including properties whose value is undefined)

**Signature**

```ts
function has(obj: unknown, path: string): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `obj` | `unknown` | source object |
| `path` | `string` | property path |

**Returns** `boolean`

**Example**

```ts
has({ a: { b: 1 } }, 'a.b') // true
```

### invert

Invert an object's keys and values (values become keys, keys become values)

**Signature**

```ts
function invert(obj: Record<string, any>): Record<string, string>
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `obj` | `Record<string, any>` | source object |

**Returns** `Record<string, string>` inverted object

**Example**

```ts
invert({ a: '1', b: '2' }) // { '1': 'a', '2': 'b' }
```

### mapKeys

Iterate over an object and transform its keys

**Signature**

```ts
function mapKeys<V>( obj: Record<string, V>, iteratee: (value: V, key: string) => string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `obj` | `Record<string, V>` | source object |
| `iteratee` | `Function` | key transform function (value, key) => string |

**Returns** `Record<string, V>` new object

**Example**

```ts
mapKeys({ a: 1 }, (v, k) => k.toUpperCase()) // { A: 1 }
```

### mapValues

Iterate over an object and transform its values

**Signature**

```ts
function mapValues<V, R>( obj: Record<string, V>, iteratee: (value: V, key: string) => R
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `obj` | `Record<string, V>` | source object |
| `iteratee` | `Function` | value transform function (value, key) => R |

**Returns** `Record<string, R>` new object

**Example**

```ts
mapValues({ a: 1, b: 2 }, (v) => v * 2) // { a: 2, b: 4 }
```

### toPairs

Convert an object into an array of [key, value] pairs

**Signature**

```ts
function toPairs<V>(obj: Record<string, V>): [string, V][]
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `obj` | `Record<string, V>` | source object |

**Returns** `Array` array of key-value pairs

**Example**

```ts
toPairs({ a: 1, b: 2 }) // [['a', 1], ['b', 2]]
```

### fromPairs

Convert an array of [key, value] pairs into an object

**Signature**

```ts
function fromPairs<V>(pairs: [string, V][]): Record<string, V>
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `pairs` | `Array` | array of key-value pairs |

**Returns** `Record<string, V>` object

**Example**

```ts
fromPairs([['a', 1], ['b', 2]]) // { a: 1, b: 2 }
```
