# 数値 (Number)

> Float-safe rounding, formatting, radix and statistics.

Total 13 functions, 1 types.

## Functions

### digitUppercase

Convert a monetary amount to Chinese capital numerals

**Signature**

```ts
const digitUppercase = (n: number): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `n` | `number` | amount |

**Returns** `string` amount in Chinese capital numerals

**Example**

```ts
digitUppercase(123456789.123) // '壹亿贰仟叁佰肆拾伍万陆仟柒佰捌拾玖元壹角贰分'
```

### intToChinese

Convert a number to Chinese numerals (simplified)

**Signature**

```ts
const intToChinese = (value: number | string): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `number \| string` | number |

**Returns** `string` Chinese numeral

**Example**

```ts
intToChinese(123456789) // '一亿二千三百四十五万六千七百八十九'
```

### sumAverage

Calculate the average of a numeric array

**Signature**

```ts
const sumAverage = (numberArr: number[]): number
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `numberArr` | `number[]` | numeric array |

**Returns** `number` average

**Example**

```ts
sumAverage([1, 2, 3, 4, 5]) // 3
```

### getDistance

**Signature**

```ts
const getDistance = (point1: Point, point2: Point): number
```

### clamp

Clamp a value within the [min, max] range

**Signature**

```ts
const clamp = (value: number, min: number, max: number): number
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `number` | value to clamp |
| `min` | `number` | lower bound |
| `max` | `number` | upper bound |

**Returns** `number` clamped value

**Example**

```ts
clamp(15, 0, 10) // 10
```

### inRange

Check whether a value falls within a range (exclusive of end)

**Signature**

```ts
const inRange = (value: number, start: number, end?: number): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `number` | value to check |
| `start` | `number` | range start |
| `end` | `number` | range end (exclusive); if omitted, treated as [0, start) |

**Returns** `boolean`

**Example**

```ts
inRange(3, 2, 5) // true
inRange(3, 5) // true
```

### round

Round to a given precision, avoiding floating-point errors

**Signature**

```ts
const round = (value: number, precision = 0): number
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `number` | value to process |
| `precision` | `number` | number of decimal places to keep, default 0 |

**Returns** `number` rounded value

**Example**

```ts
round(1.005, 2) // 1.01 (native toFixed would give 1.00)
```

### toThousands

Format a number with thousands separators

**Signature**

```ts
const toThousands = (value: number | string, separator = ','): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `number \| string` | number |
| `separator` | `string` | separator, default ',' |

**Returns** `string` formatted string

**Example**

```ts
toThousands(1234567.89) // '1,234,567.89'
```

### bytesToSize

Convert a byte count to a human-readable file size (base 1024)

**Signature**

```ts
const bytesToSize = (bytes: number, decimals = 2): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `bytes` | `number` | byte count |
| `decimals` | `number` | number of decimal places, default 2 |

**Returns** `string` formatted size

**Example**

```ts
bytesToSize(1024) // '1 KB'
bytesToSize(1536) // '1.5 KB'
```

### percentage

Calculate a percentage (returns 0 when total is 0)

**Signature**

```ts
const percentage = (value: number, total: number, digits = 2): number
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `number` | partial value |
| `total` | `number` | total value |
| `digits` | `number` | number of decimal places, default 2 |

**Returns** `number` percentage value, e.g. 33.33 means 33.33%

**Example**

```ts
percentage(1, 3) // 33.33
```

### gcd

Compute the greatest common divisor of two integers (Euclidean algorithm)

**Signature**

```ts
const gcd = (a: number, b: number): number
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `a` | `number` | integer A |
| `b` | `number` | integer B |

**Returns** `number` greatest common divisor

**Example**

```ts
gcd(12, 18) // 6
```

### lcm

Compute the least common multiple of two integers

**Signature**

```ts
const lcm = (a: number, b: number): number
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `a` | `number` | integer A |
| `b` | `number` | integer B |

**Returns** `number` least common multiple

**Example**

```ts
lcm(4, 6) // 12
```

### lerp

Linear interpolation: pick a value between start and end by t (0~1), commonly used in animations

**Signature**

```ts
const lerp = (start: number, end: number, t: number): number
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `start` | `number` | start value |
| `end` | `number` | end value |
| `t` | `number` | interpolation ratio; 0 returns start, 1 returns end |

**Returns** `number` interpolated value

**Example**

```ts
lerp(0, 100, 0.5) // 50
```

## Types

### Point

Calculate the distance between two coordinate points in a plane

```ts
interface Point {
  x: number;
  y: number;
}
```
