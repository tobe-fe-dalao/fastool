# Random

> Random numbers, random strings and UUID.

Total 7 functions.

## Functions

### randomColor

Generate a random hex color value

**Signature**

```ts
function randomColor(): string
```

**Returns** `string` color value

**Example**

```ts
randomColor() // '#a3f2c1'
```

### randomInt

Generate a random integer in [min, max] (inclusive). Passing one argument is equivalent to [0, max]

**Signature**

```ts
function randomInt(min: number, max?: number): number
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `min` | `number` | minimum; when only one argument is passed, this becomes the maximum |
| `[max]` | `number` | maximum; when omitted, 0 is the lower bound |

**Returns** `number` random integer

**Example**

```ts
randomInt(1, 10) // 7
randomInt(5) // integer between 0 and 5
```

### randomFloat

Generate a random float in [min, max]

**Signature**

```ts
function randomFloat(min: number, max: number, digits = 2): number
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `min` | `number` | minimum |
| `max` | `number` | maximum |
| `digits` | `number` | decimal places to keep, default 2 |

**Returns** `number` random float

**Example**

```ts
randomFloat(0, 1, 4) // 0.3721
```

### randomBoolean

Generate a boolean at random by probability

**Signature**

```ts
function randomBoolean(probability = 0.5): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `probability` | `number` | probability of returning true (0~1), default 0.5 |

**Returns** `boolean`

**Example**

```ts
randomBoolean(0.8) // returns true with 80% probability
```

### randomPick

Pick a random element from an array

**Signature**

```ts
function randomPick<T>(arr: T[]): T | undefined
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `arr` | `T[]` | source array |

**Returns** `T \| undefined` random element; returns undefined for an empty array

**Example**

```ts
randomPick([1, 2, 3]) // 2
```

### uuid

Generate a UUID v4; prefers the native crypto.randomUUID, falling back to a random implementation when unavailable

**Signature**

```ts
function uuid(): string
```

**Returns** `string` UUID string

**Example**

```ts
uuid() // 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
```

### randomIP

Generate a random IP address

**Signature**

```ts
const randomIP = (type: number = 0): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `type` | `number` | 0 for IPv4, 1 for IPv6, default 0 |

**Returns** `string` IP address

**Example**

```ts
randomIP() // '192.168.1.1'
```
