# Random 随机

> 随机数、随机串与 UUID。

共 7 个函数。

## 函数

### randomColor

随机生成一个十六进制颜色值

**签名**

```ts
function randomColor(): string
```

**返回** `string` 颜色值

**示例**

```ts
randomColor() // '#a3f2c1'
```

### randomInt

生成 [min, max] 区间内的随机整数（含两端）。只传一个参数时等价于 [0, max]

**签名**

```ts
function randomInt(min: number, max?: number): number
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `min` | `number` | 最小值；只传一个参数时该值作为最大值 |
| `[max]` | `number` | 最大值，省略时以 0 作为下界 |

**返回** `number` 随机整数

**示例**

```ts
randomInt(1, 10) // 7
randomInt(5) // 0 ~ 5 之间的整数
```

### randomFloat

生成 [min, max] 区间内的随机浮点数

**签名**

```ts
function randomFloat(min: number, max: number, digits = 2): number
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `min` | `number` | 最小值 |
| `max` | `number` | 最大值 |
| `digits` | `number` | 保留的小数位数，默认 2 |

**返回** `number` 随机浮点数

**示例**

```ts
randomFloat(0, 1, 4) // 0.3721
```

### randomBoolean

按概率随机生成布尔值

**签名**

```ts
function randomBoolean(probability = 0.5): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `probability` | `number` | 返回 true 的概率（0~1），默认 0.5 |

**返回** `boolean`

**示例**

```ts
randomBoolean(0.8) // 80% 概率返回 true
```

### randomPick

从数组中随机取一个元素

**签名**

```ts
function randomPick<T>(arr: T[]): T | undefined
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `arr` | `T[]` | 源数组 |

**返回** `T \| undefined` 随机元素，空数组返回 undefined

**示例**

```ts
randomPick([1, 2, 3]) // 2
```

### uuid

生成 UUID v4；优先使用原生 crypto.randomUUID，不可用时回退到随机数实现

**签名**

```ts
function uuid(): string
```

**返回** `string` UUID 字符串

**示例**

```ts
uuid() // 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
```

### randomIP

生成一个随机的 IP 地址

**签名**

```ts
const randomIP = (type: number = 0): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `type` | `number` | 0 生成 IPv4，1 生成 IPv6，默认 0 |

**返回** `string` IP 地址

**示例**

```ts
randomIP() // '192.168.1.1'
```
