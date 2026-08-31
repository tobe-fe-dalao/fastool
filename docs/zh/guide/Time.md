# Time 时间

> 格式化、相对时间、日期计算，兼容 iOS Safari 的日期解析。

共 21 个函数。

## 函数

### parseDate

解析日期，兼容 iOS Safari 不支持的 '2024-01-01 12:00:00' 格式

**签名**

```ts
const parseDate = (value: Date | string | number): Date
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `Date \| string \| number` | 日期、日期字符串或时间戳 |

**返回** `Date` Date 对象

**示例**

```ts
parseDate('2024-01-01 12:00:00') // Mon Jan 01 2024 12:00:00
```

### diffDays

比较两个日期相差的天数（取绝对值）

**签名**

```ts
function diffDays(date1: Date | string | number, date2: Date | string | number): number
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `date1` | `Date \| string \| number` | 日期一 |
| `date2` | `Date \| string \| number` | 日期二 |

**返回** `number` 相差天数

**示例**

```ts
diffDays('2024/01/01', '2024/01/11') // 10
```

### getNowTime

获取当前时间，返回 'YYYY年M月D日 HH:mm:ss' 格式

**签名**

```ts
const getNowTime = (): string
```

**返回** `string` 当前时间字符串

**示例**

```ts
getNowTime() // '2024年5月1日 09:08:07'
```

### formatDate

按模板格式化日期

**签名**

```ts
const formatDate = (format: string, time?: Date | string | number): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `format` | `string` | 模板，支持 YYYY YY MM M DD D HH H hh h mm m ss s SSS Q W WW |
| `time` | `Date \| string \| number` | 时间，默认当前时间 |

**返回** `string` 格式化后的日期字符串

**示例**

```ts
formatDate('YYYY-MM-DD HH:mm:ss') // '2024-05-01 09:08:07'
formatDate('YYYY年第Q季度 WW') // '2024年第2季度 星期三'
```

### formatPassTime

格式化指定时间距现在已过去多久

**签名**

```ts
const formatPassTime = (startTime?: Date | string | number): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `startTime` | `Date \| string \| number` | 起始时间，默认当前时间 |

**返回** `string` 如 '3天前'、'刚刚'

**示例**

```ts
formatPassTime('2024/01/01') // '5个月前'
```

### formatRemainTime

格式化现在距指定时间的剩余时间

**签名**

```ts
const formatRemainTime = (endTime: Date | string | number): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `endTime` | `Date \| string \| number` | 结束时间 |

**返回** `string` 如 '1天 2小时 3分钟 4秒'

**示例**

```ts
formatRemainTime('2025/01/01')
```

### formatDuration

将毫秒数格式化为可读时长

**签名**

```ts
const formatDuration = (ms: number): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `ms` | `number` | 毫秒数，负数按 0 处理 |

**返回** `string` 如 '1天 2小时 3分钟 4秒'

**示例**

```ts
formatDuration(93784000) // '1天 2小时 3分钟 4秒'
```

### isLeapYear

判断是否为闰年

**签名**

```ts
const isLeapYear = (year: number): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `year` | `number` | 年份 |

**返回** `boolean`

**示例**

```ts
isLeapYear(2024) // true
```

### getDaysByMonth

获取指定日期所在月份的总天数

**签名**

```ts
const getDaysByMonth = (time: Date | string | number): number
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `time` | `Date \| string \| number` | 日期 |

**返回** `number` 天数

**示例**

```ts
getDaysByMonth('2024/02/01') // 29
```

### timeLeft

计算 startTime 到 endTime 的剩余时间；startTime 大于 endTime 时均返回 0

**签名**

```ts
const timeLeft = ( startTime: Date | string, endTime: Date | string ): { d: number; h: number; m: number; s: number }
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `startTime` | `Date \| string` | 开始时间 |
| `endTime` | `Date \| string` | 结束时间 |

**返回** `{ d: number, h: number, m: number, s: number ` } 天 时 分 秒

**示例**

```ts
timeLeft('2024/01/01', '2024/01/02') // { d: 1, h: 0, m: 0, s: 0 }
```

### isSameDay

判断两个时间是否为同一天

**签名**

```ts
const isSameDay = (a: Date | string | number, b: Date | string | number): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `a` | `Date \| string \| number` | 时间 A |
| `b` | `Date \| string \| number` | 时间 B |

**返回** `boolean`

**示例**

```ts
isSameDay('2024/01/01 08:00', '2024/01/01 23:00') // true
```

### isToday

判断是否为今天

**签名**

```ts
const isToday = (date: Date | string | number): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `date` | `Date \| string \| number` | 日期 |

**返回** `boolean`

**示例**

```ts
isToday(new Date()) // true
```

### isYesterday

判断是否为昨天

**签名**

```ts
const isYesterday = (date: Date | string | number): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `date` | `Date \| string \| number` | 日期 |

**返回** `boolean`

**示例**

```ts
isYesterday('2024/05/01')
```

### isTomorrow

判断是否为明天

**签名**

```ts
const isTomorrow = (date: Date | string | number): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `date` | `Date \| string \| number` | 日期 |

**返回** `boolean`

**示例**

```ts
isTomorrow('2024/05/01')
```

### isWeekend

判断是否为周末（周六或周日）

**签名**

```ts
const isWeekend = (date: Date | string | number = Date.now()): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `date` | `Date \| string \| number` | 日期，默认今天 |

**返回** `boolean`

**示例**

```ts
isWeekend('2024/05/01')
```

### addDays

在指定日期上加减天数

**签名**

```ts
const addDays = (date: Date | string | number, days: number): Date
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `date` | `Date \| string \| number` | 日期 |
| `days` | `number` | 增加的天数，可为负数 |

**返回** `Date` 新的 Date 对象

**示例**

```ts
addDays('2024/01/01', 1) // 2024/01/02
```

### startOfDay

获取指定日期的 00:00:00.000

**签名**

```ts
const startOfDay = (date: Date | string | number): Date
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `date` | `Date \| string \| number` | 日期 |

**返回** `Date` 当天零点

**示例**

```ts
startOfDay('2024/01/01 12:30') // 2024/01/01 00:00:00
```

### endOfDay

获取指定日期的 23:59:59.999

**签名**

```ts
const endOfDay = (date: Date | string | number): Date
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `date` | `Date \| string \| number` | 日期 |

**返回** `Date` 当天最后一刻

**示例**

```ts
endOfDay('2024/01/01 12:30') // 2024/01/01 23:59:59
```

### getTimestamp

获取毫秒级时间戳

**签名**

```ts
const getTimestamp = (date: Date | string | number = Date.now()): number
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `date` | `Date \| string \| number` | 日期，默认当前时间 |

**返回** `number` 毫秒时间戳

**示例**

```ts
getTimestamp() // 1714540800000
```

### getWeekday

获取星期几

**签名**

```ts
const getWeekday = ( date: Date | string | number = Date.now(), type: 'cn' | 'num' = 'cn' ): string | number
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `date` | `Date \| string \| number` | 日期，默认今天 |
| `type` | `'cn' \| 'num'` | 返回类型，cn 返回中文，num 返回 1~7（周一为 1） |

**返回** `string \| number` 星期

**示例**

```ts
getWeekday('2024/05/01', 'cn') // '星期三'
```

### getAge

根据出生日期计算周岁年龄

**签名**

```ts
const getAge = (birthday: Date | string | number): number
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `birthday` | `Date \| string \| number` | 出生日期 |

**返回** `number` 年龄，日期不合法时返回 0

**示例**

```ts
getAge('1995/06/15') // 31
```
