# Time

> Formatting, relative time and date math, iOS Safari compatible.

Total 21 functions.

## Functions

### parseDate

Parse a date, compatible with the '2024-01-01 12:00:00' format that iOS Safari does not support

**Signature**

```ts
const parseDate = (value: Date | string | number): Date
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `Date \| string \| number` | date, date string, or timestamp |

**Returns** `Date` Date object

**Example**

```ts
parseDate('2024-01-01 12:00:00') // Mon Jan 01 2024 12:00:00
```

### diffDays

Compute the absolute number of days between two dates

**Signature**

```ts
function diffDays(date1: Date | string | number, date2: Date | string | number): number
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `date1` | `Date \| string \| number` | first date |
| `date2` | `Date \| string \| number` | second date |

**Returns** `number` difference in days

**Example**

```ts
diffDays('2024/01/01', '2024/01/11') // 10
```

### getNowTime

Get the current time, returned in the 'YYYY年M月D日 HH:mm:ss' format

**Signature**

```ts
const getNowTime = (): string
```

**Returns** `string` current time string

**Example**

```ts
getNowTime() // '2024年5月1日 09:08:07'
```

### formatDate

Format a date by a template

**Signature**

```ts
const formatDate = (format: string, time?: Date | string | number): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `format` | `string` | template supporting YYYY YY MM M DD D HH H hh h mm m ss s SSS Q W WW |
| `time` | `Date \| string \| number` | time, default now |

**Returns** `string` formatted date string

**Example**

```ts
formatDate('YYYY-MM-DD HH:mm:ss') // '2024-05-01 09:08:07'
formatDate('YYYY年第Q季度 WW') // '2024年第2季度 星期三'
```

### formatPassTime

Format how long ago a given time was from now

**Signature**

```ts
const formatPassTime = (startTime?: Date | string | number): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `startTime` | `Date \| string \| number` | start time, default now |

**Returns** `string` e.g. '3 days ago', 'just now'

**Example**

```ts
formatPassTime('2024/01/01') // '5个月前'
```

### formatRemainTime

Format the remaining time from now until a given time

**Signature**

```ts
const formatRemainTime = (endTime: Date | string | number): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `endTime` | `Date \| string \| number` | end time |

**Returns** `string` e.g. '1 day 2 hours 3 minutes 4 seconds'

**Example**

```ts
formatRemainTime('2025/01/01')
```

### formatDuration

Format a millisecond count into a human-readable duration

**Signature**

```ts
const formatDuration = (ms: number): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `ms` | `number` | milliseconds; negative values are treated as 0 |

**Returns** `string` e.g. '1 day 2 hours 3 minutes 4 seconds'

**Example**

```ts
formatDuration(93784000) // '1天 2小时 3分钟 4秒'
```

### isLeapYear

Check whether a year is a leap year

**Signature**

```ts
const isLeapYear = (year: number): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `year` | `number` | year |

**Returns** `boolean`

**Example**

```ts
isLeapYear(2024) // true
```

### getDaysByMonth

Get the total number of days in the month of a given date

**Signature**

```ts
const getDaysByMonth = (time: Date | string | number): number
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `time` | `Date \| string \| number` | date |

**Returns** `number` number of days

**Example**

```ts
getDaysByMonth('2024/02/01') // 29
```

### timeLeft

Compute the remaining time from startTime to endTime; returns 0 for both when startTime is greater than endTime

**Signature**

```ts
const timeLeft = ( startTime: Date | string, endTime: Date | string ): { d: number; h: number; m: number; s: number }
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `startTime` | `Date \| string` | start time |
| `endTime` | `Date \| string` | end time |

**Returns** `{ d: number, h: number, m: number, s: number ` } days, hours, minutes, seconds

**Example**

```ts
timeLeft('2024/01/01', '2024/01/02') // { d: 1, h: 0, m: 0, s: 0 }
```

### isSameDay

Check whether two times fall on the same day

**Signature**

```ts
const isSameDay = (a: Date | string | number, b: Date | string | number): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `a` | `Date \| string \| number` | time A |
| `b` | `Date \| string \| number` | time B |

**Returns** `boolean`

**Example**

```ts
isSameDay('2024/01/01 08:00', '2024/01/01 23:00') // true
```

### isToday

Check whether a date is today

**Signature**

```ts
const isToday = (date: Date | string | number): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `date` | `Date \| string \| number` | date |

**Returns** `boolean`

**Example**

```ts
isToday(new Date()) // true
```

### isYesterday

Check whether a date is yesterday

**Signature**

```ts
const isYesterday = (date: Date | string | number): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `date` | `Date \| string \| number` | date |

**Returns** `boolean`

**Example**

```ts
isYesterday('2024/05/01')
```

### isTomorrow

Check whether a date is tomorrow

**Signature**

```ts
const isTomorrow = (date: Date | string | number): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `date` | `Date \| string \| number` | date |

**Returns** `boolean`

**Example**

```ts
isTomorrow('2024/05/01')
```

### isWeekend

Check whether a date is a weekend (Saturday or Sunday)

**Signature**

```ts
const isWeekend = (date: Date | string | number = Date.now()): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `date` | `Date \| string \| number` | date, default today |

**Returns** `boolean`

**Example**

```ts
isWeekend('2024/05/01')
```

### addDays

Add/subtract days from a given date

**Signature**

```ts
const addDays = (date: Date | string | number, days: number): Date
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `date` | `Date \| string \| number` | date |
| `days` | `number` | number of days to add, may be negative |

**Returns** `Date` new Date object

**Example**

```ts
addDays('2024/01/01', 1) // 2024/01/02
```

### startOfDay

Get 00:00:00.000 of a given date

**Signature**

```ts
const startOfDay = (date: Date | string | number): Date
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `date` | `Date \| string \| number` | date |

**Returns** `Date` start of the day

**Example**

```ts
startOfDay('2024/01/01 12:30') // 2024/01/01 00:00:00
```

### endOfDay

Get 23:59:59.999 of a given date

**Signature**

```ts
const endOfDay = (date: Date | string | number): Date
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `date` | `Date \| string \| number` | date |

**Returns** `Date` end of the day

**Example**

```ts
endOfDay('2024/01/01 12:30') // 2024/01/01 23:59:59
```

### getTimestamp

Get a millisecond timestamp

**Signature**

```ts
const getTimestamp = (date: Date | string | number = Date.now()): number
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `date` | `Date \| string \| number` | date, default now |

**Returns** `number` millisecond timestamp

**Example**

```ts
getTimestamp() // 1714540800000
```

### getWeekday

Get the day of the week

**Signature**

```ts
const getWeekday = ( date: Date | string | number = Date.now(), type: 'cn' | 'num' = 'cn' ): string | number
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `date` | `Date \| string \| number` | date, default today |
| `type` | `'cn' \| 'num'` | return type; 'cn' returns the Chinese weekday name, 'num' returns 1~7 (Monday = 1) |

**Returns** `string \| number` weekday

**Example**

```ts
getWeekday('2024/05/01', 'cn') // '星期三'
```

### getAge

Calculate age in full years from a birth date

**Signature**

```ts
const getAge = (birthday: Date | string | number): number
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `birthday` | `Date \| string \| number` | birth date |

**Returns** `number` age; returns 0 when the date is invalid

**Example**

```ts
getAge('1995/06/15') // 31
```
