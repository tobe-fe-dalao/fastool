# Array 数组

> 全部为纯函数，不会修改入参。

共 29 个函数。

## 函数

### chunk

将数组按指定长度分块

**签名**

```ts
function chunk<T>(arr: T[], size = 1): T[][]
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arr` | `T[]` | 源数组 |
| `size` | `number` | 每块长度，默认 1 |

**返回** `T[][]` 分块后的二维数组

**示例**

```ts
chunk([1, 2, 3, 4], 2) // [[1, 2], [3, 4]]
```

### compact

去除数组中的假值（false / null / 0 / '' / undefined / NaN）

**签名**

```ts
function compact<T>(arr: T[]): T[]
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arr` | `T[]` | 源数组 |

**返回** `T[]` 去除假值后的新数组

**示例**

```ts
compact([0, 1, false, 2, '', 3]) // [1, 2, 3]
```

### uniq

数组去重（基于 SameValueZero 比较，可正确处理 NaN）

**签名**

```ts
function uniq<T>(arr: T[]): T[]
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arr` | `T[]` | 源数组 |

**返回** `T[]` 去重后的新数组

**示例**

```ts
uniq([1, 1, 2, NaN, NaN]) // [1, 2, NaN]
```

### uniqBy

按指定条件去重，保留首次出现的元素

**签名**

```ts
function uniqBy<T>(arr: T[], iteratee: KeyIteratee<T>): T[]
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arr` | `T[]` | 源数组 |
| `iteratee` | `KeyIteratee` | 对象的 key 或取值函数 |

**返回** `T[]` 去重后的新数组

**示例**

```ts
uniqBy([{ id: 1 }, { id: 1 }, { id: 2 }], 'id') // [{ id: 1 }, { id: 2 }]
```

### flatten

扁平化数组一层

**签名**

```ts
function flatten(arr: any[]): any[]
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arr` | `any[]` | 源数组 |

**返回** `any[]` 扁平化后的新数组

**示例**

```ts
flatten([1, [2, [3, 4]]]) // [1, 2, [3, 4]]
```

### flattenDeep

递归扁平化数组至一维

**签名**

```ts
function flattenDeep(arr: any[]): any[]
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arr` | `any[]` | 源数组 |

**返回** `any[]` 一维数组

**示例**

```ts
flattenDeep([1, [2, [3, [4]]]]) // [1, 2, 3, 4]
```

### difference

返回存在于第一个数组、但不存在于第二个数组中的元素（差集）

**签名**

```ts
function difference<T>(arr: T[], values: T[]): T[]
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arr` | `T[]` | 源数组 |
| `values` | `T[]` | 需要排除的值 |

**返回** `T[]` 差集数组

**示例**

```ts
difference([1, 2, 3], [2]) // [1, 3]
```

### intersection

返回两个数组的交集

**签名**

```ts
function intersection<T>(arr: T[], values: T[]): T[]
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arr` | `T[]` | 源数组 |
| `values` | `T[]` | 比较数组 |

**返回** `T[]` 交集数组

**示例**

```ts
intersection([1, 2, 3], [2, 3, 4]) // [2, 3]
```

### union

合并多个数组并去重（并集）

**签名**

```ts
function union<T>(...arrs: T[][]): T[]
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arrs` | `...T[][]` | 任意个数组 |

**返回** `T[]` 并集数组

**示例**

```ts
union([1, 2], [2, 3]) // [1, 2, 3]
```

### groupBy

按条件将数组元素分组

**签名**

```ts
function groupBy<T>(arr: T[], iteratee: KeyIteratee<T>): Record<string, T[]>
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arr` | `T[]` | 源数组 |
| `iteratee` | `KeyIteratee` | 对象的 key 或取值函数 |

**返回** `Record<string, T[]>` 分组结果

**示例**

```ts
groupBy([{ type: 'a' }, { type: 'b' }, { type: 'a' }], 'type')
// { a: [{ type: 'a' }, { type: 'a' }], b: [{ type: 'b' }] }
```

### keyBy

将数组转换为以指定 key 为索引的对象

**签名**

```ts
function keyBy<T>(arr: T[], iteratee: KeyIteratee<T>): Record<string, T>
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arr` | `T[]` | 源数组 |
| `iteratee` | `KeyIteratee` | 对象的 key 或取值函数 |

**返回** `Record<string, T>` 索引对象

**示例**

```ts
keyBy([{ id: 'a', v: 1 }, { id: 'b', v: 2 }], 'id')
// { a: { id: 'a', v: 1 }, b: { id: 'b', v: 2 } }
```

### countBy

按条件统计元素出现次数

**签名**

```ts
function countBy<T>(arr: T[], iteratee: KeyIteratee<T>): Record<string, number>
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arr` | `T[]` | 源数组 |
| `iteratee` | `KeyIteratee` | 对象的 key 或取值函数 |

**返回** `Record<string, number>` 统计结果

**示例**

```ts
countBy(['a', 'b', 'a'], (v) => v) // { a: 2, b: 1 }
```

### partition

按条件把数组拆分为「满足」与「不满足」两组

**签名**

```ts
function partition<T>(arr: T[], predicate: (item: T, index: number) => boolean): [T[], T[]]
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arr` | `T[]` | 源数组 |
| `predicate` | `(item: T, index: number) => boolean` | 判断函数 |

**返回** `[T[], T[]]` [满足条件, 不满足条件]

**示例**

```ts
partition([1, 2, 3, 4], (n) => n % 2 === 0) // [[2, 4], [1, 3]]
```

### shuffle

使用 Fisher-Yates 算法打乱数组（返回新数组，不修改原数组）

**签名**

```ts
function shuffle<T>(arr: T[]): T[]
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arr` | `T[]` | 源数组 |

**返回** `T[]` 打乱后的新数组

**示例**

```ts
shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4]
```

### sample

从数组中随机取一个元素

**签名**

```ts
function sample<T>(arr: T[]): T | undefined
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arr` | `T[]` | 源数组 |

**返回** `T \| undefined` 随机元素

**示例**

```ts
sample([1, 2, 3]) // 2
```

### sampleSize

从数组中随机取 n 个不重复元素

**签名**

```ts
function sampleSize<T>(arr: T[], n = 1): T[]
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arr` | `T[]` | 源数组 |
| `n` | `number` | 取样数量 |

**返回** `T[]` 随机元素数组

**示例**

```ts
sampleSize([1, 2, 3, 4], 2) // [4, 1]
```

### range

生成一个整数序列数组（不包含 end）

**签名**

```ts
function range(start: number, end?: number, step = 1): number[]
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `start` | `number` | 起始值；只传一个参数时作为 end，起始为 0 |
| `end` | `number` | 结束值（不包含） |
| `step` | `number` | 步长，默认 1，可为负数 |

**返回** `number[]` 整数数组

**示例**

```ts
range(4) // [0, 1, 2, 3]
range(1, 5) // [1, 2, 3, 4]
range(0, 10, 2) // [0, 2, 4, 6, 8]
```

### zip

将多个数组按下标合并为二维数组

**签名**

```ts
function zip(...arrs: any[][]): any[][]
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arrs` | `...any[][]` | 任意个数组 |

**返回** `any[][]` 合并后的二维数组

**示例**

```ts
zip(['a', 'b'], [1, 2]) // [['a', 1], ['b', 2]]
```

### unzip

zip 的逆运算，将二维数组拆回多个数组

**签名**

```ts
function unzip(arr: any[][]): any[][]
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arr` | `any[][]` | 二维数组 |

**返回** `any[][]` 拆分后的数组集合

**示例**

```ts
unzip([['a', 1], ['b', 2]]) // [['a', 'b'], [1, 2]]
```

### sum

计算数字数组的总和

**签名**

```ts
function sum(arr: number[]): number
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arr` | `number[]` | 数字数组 |

**返回** `number` 总和

**示例**

```ts
sum([1, 2, 3]) // 6
```

### sumBy

按条件取值后求和

**签名**

```ts
function sumBy<T>(arr: T[], iteratee: KeyIteratee<T, number>): number
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arr` | `T[]` | 源数组 |
| `iteratee` | `KeyIteratee` | 对象的 key 或取值函数 |

**返回** `number` 总和

**示例**

```ts
sumBy([{ n: 1 }, { n: 2 }], 'n') // 3
```

### maxBy

返回按条件取值最大的元素

**签名**

```ts
function maxBy<T>(arr: T[], iteratee: KeyIteratee<T, number>): T | undefined
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arr` | `T[]` | 源数组 |
| `iteratee` | `KeyIteratee` | 对象的 key 或取值函数 |

**返回** `T \| undefined` 最大元素

**示例**

```ts
maxBy([{ n: 1 }, { n: 3 }, { n: 2 }], 'n') // { n: 3 }
```

### minBy

返回按条件取值最小的元素

**签名**

```ts
function minBy<T>(arr: T[], iteratee: KeyIteratee<T, number>): T | undefined
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arr` | `T[]` | 源数组 |
| `iteratee` | `KeyIteratee` | 对象的 key 或取值函数 |

**返回** `T \| undefined` 最小元素

**示例**

```ts
minBy([{ n: 1 }, { n: 3 }, { n: 2 }], 'n') // { n: 1 }
```

### sortBy

按条件排序，稳定排序且不修改原数组

**签名**

```ts
function sortBy<T>( arr: T[], iteratee: KeyIteratee<T>, order: 'asc' | 'desc' = 'asc' ): T[]
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arr` | `T[]` | 源数组 |
| `iteratee` | `KeyIteratee` | 对象的 key 或取值函数 |
| `order` | `'asc' \| 'desc'` | 排序方向，默认 asc |

**返回** `T[]` 排序后的新数组

**示例**

```ts
sortBy([{ n: 3 }, { n: 1 }], 'n', 'desc') // [{ n: 3 }, { n: 1 }]
```

### head

取数组第一个元素

**签名**

```ts
function head<T>(arr: T[]): T | undefined
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arr` | `T[]` | 源数组 |

**返回** `T \| undefined` 第一个元素

**示例**

```ts
head([1, 2, 3]) // 1
```

### last

取数组最后一个元素

**签名**

```ts
function last<T>(arr: T[]): T | undefined
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arr` | `T[]` | 源数组 |

**返回** `T \| undefined` 最后一个元素

**示例**

```ts
last([1, 2, 3]) // 3
```

### take

取数组前 n 个元素

**签名**

```ts
function take<T>(arr: T[], n = 1): T[]
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arr` | `T[]` | 源数组 |
| `n` | `number` | 数量，默认 1 |

**返回** `T[]` 新数组

**示例**

```ts
take([1, 2, 3], 2) // [1, 2]
```

### drop

去掉数组前 n 个元素后返回剩余部分

**签名**

```ts
function drop<T>(arr: T[], n = 1): T[]
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arr` | `T[]` | 源数组 |
| `n` | `number` | 数量，默认 1 |

**返回** `T[]` 新数组

**示例**

```ts
drop([1, 2, 3], 2) // [3]
```

### move

将数组中指定下标的元素移动到目标位置（常用于拖拽排序）

**签名**

```ts
function move<T>(arr: T[], from: number, to: number): T[]
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arr` | `T[]` | 源数组 |
| `from` | `number` | 源下标 |
| `to` | `number` | 目标下标 |

**返回** `T[]` 移动后的新数组

**示例**

```ts
move([1, 2, 3], 0, 2) // [2, 3, 1]
```
