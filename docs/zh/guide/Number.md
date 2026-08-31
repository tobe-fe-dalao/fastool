# Number 数字

> 精度安全取整、格式化、进制与统计。

共 13 个函数、1 个类型。

## 函数

### digitUppercase

现金额转中文大写

**签名**

```ts
const digitUppercase = (n: number): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `n` | `number` | 金额 |

**返回** `string` 中文大写金额

**示例**

```ts
digitUppercase(123456789.123) // '壹亿贰仟叁佰肆拾伍万陆仟柒佰捌拾玖元壹角贰分'
```

### intToChinese

数字转中文数字（简体）

**签名**

```ts
const intToChinese = (value: number | string): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `number \| string` | 数字 |

**返回** `string` 中文数字

**示例**

```ts
intToChinese(123456789) // '一亿二千三百四十五万六千七百八十九'
```

### sumAverage

计算数字数组的平均值

**签名**

```ts
const sumAverage = (numberArr: number[]): number
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `numberArr` | `number[]` | 数字数组 |

**返回** `number` 平均值

**示例**

```ts
sumAverage([1, 2, 3, 4, 5]) // 3
```

### getDistance

**签名**

```ts
const getDistance = (point1: Point, point2: Point): number
```

### clamp

将数值限制在 [min, max] 区间内

**签名**

```ts
const clamp = (value: number, min: number, max: number): number
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `number` | 待处理的数值 |
| `min` | `number` | 下界 |
| `max` | `number` | 上界 |

**返回** `number` 限制后的数值

**示例**

```ts
clamp(15, 0, 10) // 10
```

### inRange

判断数值是否在区间内（不包含 end）

**签名**

```ts
const inRange = (value: number, start: number, end?: number): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `number` | 待判断的数值 |
| `start` | `number` | 区间起点 |
| `end` | `number` | 区间终点（不包含）；不传时视为 [0, start) |

**返回** `boolean`

**示例**

```ts
inRange(3, 2, 5) // true
inRange(3, 5) // true
```

### round

按指定精度四舍五入，规避浮点数精度误差

**签名**

```ts
const round = (value: number, precision = 0): number
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `number` | 待处理的数值 |
| `precision` | `number` | 保留的小数位数，默认 0 |

**返回** `number` 处理后的数值

**示例**

```ts
round(1.005, 2) // 1.01（原生 toFixed 会得到 1.00）
```

### toThousands

数字千分位格式化

**签名**

```ts
const toThousands = (value: number | string, separator = ','): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `number \| string` | 数字 |
| `separator` | `string` | 分隔符，默认 ',' |

**返回** `string` 格式化后的字符串

**示例**

```ts
toThousands(1234567.89) // '1,234,567.89'
```

### bytesToSize

将字节数转换为可读的文件体积（以 1024 为进制）

**签名**

```ts
const bytesToSize = (bytes: number, decimals = 2): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `bytes` | `number` | 字节数 |
| `decimals` | `number` | 小数位数，默认 2 |

**返回** `string` 格式化后的体积

**示例**

```ts
bytesToSize(1024) // '1 KB'
bytesToSize(1536) // '1.5 KB'
```

### percentage

计算百分比（total 为 0 时返回 0）

**签名**

```ts
const percentage = (value: number, total: number, digits = 2): number
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `number` | 部分值 |
| `total` | `number` | 总值 |
| `digits` | `number` | 小数位数，默认 2 |

**返回** `number` 百分比数值，如 33.33 表示 33.33%

**示例**

```ts
percentage(1, 3) // 33.33
```

### gcd

求两个整数的最大公约数（辗转相除法）

**签名**

```ts
const gcd = (a: number, b: number): number
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `a` | `number` | 整数 A |
| `b` | `number` | 整数 B |

**返回** `number` 最大公约数

**示例**

```ts
gcd(12, 18) // 6
```

### lcm

求两个整数的最小公倍数

**签名**

```ts
const lcm = (a: number, b: number): number
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `a` | `number` | 整数 A |
| `b` | `number` | 整数 B |

**返回** `number` 最小公倍数

**示例**

```ts
lcm(4, 6) // 12
```

### lerp

线性插值，按 t（0~1）在 start 与 end 之间取值，常用于动画

**签名**

```ts
const lerp = (start: number, end: number, t: number): number
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `start` | `number` | 起始值 |
| `end` | `number` | 结束值 |
| `t` | `number` | 插值比例，0 返回 start，1 返回 end |

**返回** `number` 插值结果

**示例**

```ts
lerp(0, 100, 0.5) // 50
```

## 类型定义

### Point

计算平面中两个坐标点之间的距离

```ts
interface Point {
  x: number;
  y: number;
}
```
