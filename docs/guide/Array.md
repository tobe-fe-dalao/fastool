# Array

> All functions are pure and never mutate the input array.

Total 29 functions.

## Functions

### chunk

Split an array into chunks of a given size

**Signature**

```ts
function chunk<T>(arr: T[], size = 1): T[][]
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arr` | `T[]` | source array |
| `size` | `number` | chunk size, default 1 |

**Returns** `T[][]` array of chunks

**Example**

```ts
chunk([1, 2, 3, 4], 2) // [[1, 2], [3, 4]]
```

### compact

Remove falsy values (false / null / 0 / '' / undefined / NaN) from the array

**Signature**

```ts
function compact<T>(arr: T[]): T[]
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arr` | `T[]` | source array |

**Returns** `T[]` new array with falsy values removed

**Example**

```ts
compact([0, 1, false, 2, '', 3]) // [1, 2, 3]
```

### uniq

Remove duplicate values from an array (uses SameValueZero comparison, correctly handles NaN)

**Signature**

```ts
function uniq<T>(arr: T[]): T[]
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arr` | `T[]` | source array |

**Returns** `T[]` array with duplicates removed

**Example**

```ts
uniq([1, 1, 2, NaN, NaN]) // [1, 2, NaN]
```

### uniqBy

Deduplicate by a given criterion, keeping the first occurrence

**Signature**

```ts
function uniqBy<T>(arr: T[], iteratee: KeyIteratee<T>): T[]
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arr` | `T[]` | source array |
| `iteratee` | `KeyIteratee` | object key or value function |

**Returns** `T[]` array with duplicates removed

**Example**

```ts
uniqBy([{ id: 1 }, { id: 1 }, { id: 2 }], 'id') // [{ id: 1 }, { id: 2 }]
```

### flatten

Flatten an array one level deep

**Signature**

```ts
function flatten(arr: any[]): any[]
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arr` | `any[]` | source array |

**Returns** `any[]` flattened array

**Example**

```ts
flatten([1, [2, [3, 4]]]) // [1, 2, [3, 4]]
```

### flattenDeep

Recursively flatten an array to a single level

**Signature**

```ts
function flattenDeep(arr: any[]): any[]
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arr` | `any[]` | source array |

**Returns** `any[]` flattened one-dimensional array

**Example**

```ts
flattenDeep([1, [2, [3, [4]]]]) // [1, 2, 3, 4]
```

### difference

Return elements present in the first array but not in the second (difference)

**Signature**

```ts
function difference<T>(arr: T[], values: T[]): T[]
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arr` | `T[]` | source array |
| `values` | `T[]` | values to exclude |

**Returns** `T[]` difference array

**Example**

```ts
difference([1, 2, 3], [2]) // [1, 3]
```

### intersection

Return the intersection of two arrays

**Signature**

```ts
function intersection<T>(arr: T[], values: T[]): T[]
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arr` | `T[]` | source array |
| `values` | `T[]` | array to compare against |

**Returns** `T[]` intersection array

**Example**

```ts
intersection([1, 2, 3], [2, 3, 4]) // [2, 3]
```

### union

Merge multiple arrays and remove duplicates (union)

**Signature**

```ts
function union<T>(...arrs: T[][]): T[]
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arrs` | `...T[][]` | any number of arrays |

**Returns** `T[]` union array

**Example**

```ts
union([1, 2], [2, 3]) // [1, 2, 3]
```

### groupBy

Group array elements by a given criterion

**Signature**

```ts
function groupBy<T>(arr: T[], iteratee: KeyIteratee<T>): Record<string, T[]>
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arr` | `T[]` | source array |
| `iteratee` | `KeyIteratee` | object key or value function |

**Returns** `Record<string, T[]>` grouped result

**Example**

```ts
groupBy([{ type: 'a' }, { type: 'b' }, { type: 'a' }], 'type')
// { a: [{ type: 'a' }, { type: 'a' }], b: [{ type: 'b' }] }
```

### keyBy

Convert an array into an object indexed by a given key

**Signature**

```ts
function keyBy<T>(arr: T[], iteratee: KeyIteratee<T>): Record<string, T>
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arr` | `T[]` | source array |
| `iteratee` | `KeyIteratee` | object key or value function |

**Returns** `Record<string, T>` indexed object

**Example**

```ts
keyBy([{ id: 'a', v: 1 }, { id: 'b', v: 2 }], 'id')
// { a: { id: 'a', v: 1 }, b: { id: 'b', v: 2 } }
```

### countBy

Count element occurrences by a given criterion

**Signature**

```ts
function countBy<T>(arr: T[], iteratee: KeyIteratee<T>): Record<string, number>
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arr` | `T[]` | source array |
| `iteratee` | `KeyIteratee` | object key or value function |

**Returns** `Record<string, number>` count result

**Example**

```ts
countBy(['a', 'b', 'a'], (v) => v) // { a: 2, b: 1 }
```

### partition

Split an array into two groups: those that match and those that don't

**Signature**

```ts
function partition<T>(arr: T[], predicate: (item: T, index: number) => boolean): [T[], T[]]
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arr` | `T[]` | source array |
| `predicate` | `(item: T, index: number) => boolean` | predicate function |

**Returns** `[T[], T[]]` [matched, unmatched]

**Example**

```ts
partition([1, 2, 3, 4], (n) => n % 2 === 0) // [[2, 4], [1, 3]]
```

### shuffle

Shuffle an array using the Fisher-Yates algorithm (returns a new array, does not mutate the original)

**Signature**

```ts
function shuffle<T>(arr: T[]): T[]
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arr` | `T[]` | source array |

**Returns** `T[]` shuffled array

**Example**

```ts
shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4]
```

### sample

Get a random element from an array

**Signature**

```ts
function sample<T>(arr: T[]): T | undefined
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arr` | `T[]` | source array |

**Returns** `T \| undefined` random element

**Example**

```ts
sample([1, 2, 3]) // 2
```

### sampleSize

Get n unique random elements from an array

**Signature**

```ts
function sampleSize<T>(arr: T[], n = 1): T[]
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arr` | `T[]` | source array |
| `n` | `number` | sample size |

**Returns** `T[]` array of random elements

**Example**

```ts
sampleSize([1, 2, 3, 4], 2) // [4, 1]
```

### range

Generate an array of integers in a sequence (end is exclusive)

**Signature**

```ts
function range(start: number, end?: number, step = 1): number[]
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `start` | `number` | start value; when only one argument is passed it is treated as end and start defaults to 0 |
| `end` | `number` | end value (exclusive) |
| `step` | `number` | step size, default 1, may be negative |

**Returns** `number[]` array of integers

**Example**

```ts
range(4) // [0, 1, 2, 3]
range(1, 5) // [1, 2, 3, 4]
range(0, 10, 2) // [0, 2, 4, 6, 8]
```

### zip

Merge multiple arrays into a 2D array by index

**Signature**

```ts
function zip(...arrs: any[][]): any[][]
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arrs` | `...any[][]` | any number of arrays |

**Returns** `any[][]` merged 2D array

**Example**

```ts
zip(['a', 'b'], [1, 2]) // [['a', 1], ['b', 2]]
```

### unzip

Inverse of zip: split a 2D array back into multiple arrays

**Signature**

```ts
function unzip(arr: any[][]): any[][]
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arr` | `any[][]` | 2D array |

**Returns** `any[][]` split array collection

**Example**

```ts
unzip([['a', 1], ['b', 2]]) // [['a', 'b'], [1, 2]]
```

### sum

Calculate the sum of a numeric array

**Signature**

```ts
function sum(arr: number[]): number
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arr` | `number[]` | numeric array |

**Returns** `number` total sum

**Example**

```ts
sum([1, 2, 3]) // 6
```

### sumBy

Sum values extracted by a given criterion

**Signature**

```ts
function sumBy<T>(arr: T[], iteratee: KeyIteratee<T, number>): number
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arr` | `T[]` | source array |
| `iteratee` | `KeyIteratee` | object key or value function |

**Returns** `number` total sum

**Example**

```ts
sumBy([{ n: 1 }, { n: 2 }], 'n') // 3
```

### maxBy

Return the element with the maximum value by a given criterion

**Signature**

```ts
function maxBy<T>(arr: T[], iteratee: KeyIteratee<T, number>): T | undefined
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arr` | `T[]` | source array |
| `iteratee` | `KeyIteratee` | object key or value function |

**Returns** `T \| undefined` element with the maximum value

**Example**

```ts
maxBy([{ n: 1 }, { n: 3 }, { n: 2 }], 'n') // { n: 3 }
```

### minBy

Return the element with the minimum value by a given criterion

**Signature**

```ts
function minBy<T>(arr: T[], iteratee: KeyIteratee<T, number>): T | undefined
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arr` | `T[]` | source array |
| `iteratee` | `KeyIteratee` | object key or value function |

**Returns** `T \| undefined` element with the minimum value

**Example**

```ts
minBy([{ n: 1 }, { n: 3 }, { n: 2 }], 'n') // { n: 1 }
```

### sortBy

Sort by a given criterion; stable sort that does not mutate the original array

**Signature**

```ts
function sortBy<T>( arr: T[], iteratee: KeyIteratee<T>, order: 'asc' | 'desc' = 'asc' ): T[]
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arr` | `T[]` | source array |
| `iteratee` | `KeyIteratee` | object key or value function |
| `order` | `'asc' \| 'desc'` | sort order, default asc |

**Returns** `T[]` sorted array

**Example**

```ts
sortBy([{ n: 3 }, { n: 1 }], 'n', 'desc') // [{ n: 3 }, { n: 1 }]
```

### head

Get the first element of an array

**Signature**

```ts
function head<T>(arr: T[]): T | undefined
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arr` | `T[]` | source array |

**Returns** `T \| undefined` first element

**Example**

```ts
head([1, 2, 3]) // 1
```

### last

Get the last element of an array

**Signature**

```ts
function last<T>(arr: T[]): T | undefined
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arr` | `T[]` | source array |

**Returns** `T \| undefined` last element

**Example**

```ts
last([1, 2, 3]) // 3
```

### take

Take the first n elements of an array

**Signature**

```ts
function take<T>(arr: T[], n = 1): T[]
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arr` | `T[]` | source array |
| `n` | `number` | count, default 1 |

**Returns** `T[]` new array

**Example**

```ts
take([1, 2, 3], 2) // [1, 2]
```

### drop

Drop the first n elements and return the rest

**Signature**

```ts
function drop<T>(arr: T[], n = 1): T[]
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arr` | `T[]` | source array |
| `n` | `number` | count, default 1 |

**Returns** `T[]` new array

**Example**

```ts
drop([1, 2, 3], 2) // [3]
```

### move

Move the element at a given index to a target position (useful for drag-and-drop sorting)

**Signature**

```ts
function move<T>(arr: T[], from: number, to: number): T[]
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arr` | `T[]` | source array |
| `from` | `number` | source index |
| `to` | `number` | target index |

**Returns** `T[]` array after moving

**Example**

```ts
move([1, 2, 3], 0, 2) // [2, 3, 1]
```
