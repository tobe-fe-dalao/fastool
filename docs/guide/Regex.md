# Regex

> Common validation patterns and helpers.

Total 9 functions.

## Functions

### isChines

Check whether the string is Chinese

**Signature**

```ts
const isChines = (str: string): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `str` | `string` |  |

**Returns** `boolean`

### isIdCard

Check whether it is an ID card number: supports 1st/2nd generation, 15 or 18 digits

**Signature**

```ts
const isIdCard = (str: string, type: number = 0): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `str` | `string` | ID card number |
| `type` | `number` | 1: 15-digit, 2: 18-digit, default 0 matches both 15 and 18 digits |

**Returns** `boolean`

### isPostCode

Validate whether it is a mainland China postal code

**Signature**

```ts
const isPostCode = (value: number): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `number` |  |

**Returns** `boolean`

### isIPv6

Validate whether it is an IPv6 address

**Signature**

```ts
const isIPv6 = (str: string): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `str` | `string` |  |

**Returns** `boolean`

### isEmail

Check whether it is an email

**Signature**

```ts
const isEmail = (value: string): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `string` |  |

**Returns** `boolean`

### isTelNumber

Check whether it is a mobile phone number

**Signature**

```ts
const isTelNumber = (str: string): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `str` | `string` |  |

**Returns** `boolean`

### isHasEmoji

Check whether it contains emoji

**Signature**

```ts
const isHasEmoji = (value: string): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `string` |  |

**Returns** `boolean`

### isUrl

Validate whether it is a URL

**Signature**

```ts
const isUrl = (str: string): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `str` | `string` |  |

**Returns** `boolean`

### isColor

Check whether a string is a hex color value

**Signature**

```ts
const isColor = function (value: string): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `string` | value to check |

**Returns** `boolean` whether it is a hex color value

**Example**

```ts
if (isColor(str)) { doSomething }
```
