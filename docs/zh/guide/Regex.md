# Regex 正则

> 常用校验正则与校验函数。

共 9 个函数。

## 函数

### isChines

是否是中文

**签名**

```ts
const isChines = (str: string): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `str` | `string` |  |

**返回** `boolean`

### isIdCard

是否为身份证号: 支持（1/2）代，15位或18位

**签名**

```ts
const isIdCard = (str: string, type: number = 0): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `str` | `string` | 身份证号 |
| `type` | `number` | 1:15位，2:18位，默认0 同时匹配15位和18位 |

**返回** `boolean`

### isPostCode

校验是否是大陆邮政编码

**签名**

```ts
const isPostCode = (value: number): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `number` |  |

**返回** `boolean`

### isIPv6

校验是否是IPv6地址

**签名**

```ts
const isIPv6 = (str: string): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `str` | `string` |  |

**返回** `boolean`

### isEmail

是否是邮箱

**签名**

```ts
const isEmail = (value: string): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `string` |  |

**返回** `boolean`

### isTelNumber

是否是手机号

**签名**

```ts
const isTelNumber = (str: string): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `str` | `string` |  |

**返回** `boolean`

### isHasEmoji

是否包含emoji表情

**签名**

```ts
const isHasEmoji = (value: string): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `string` |  |

**返回** `boolean`

### isUrl

校验是否是URL

**签名**

```ts
const isUrl = (str: string): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `str` | `string` |  |

**返回** `boolean`

### isColor

判断字符串是否是十六进制的颜色值

**签名**

```ts
const isColor = function (value: string): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `string` | 需要判断的数据 |

**返回** `boolean` 校验是否是十六进制的颜色值

**示例**

```ts
if (isColor(str)) { doSomething }
```
