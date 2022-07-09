# Time
## diffDays
比较两个日期相差的天数
```typescript
/**
 * @func diffDays
 * @desc 比较两个日期相差的天数
 * @param { Date } date1 日期1
 * @param { Date } date2 日期2
 * @return { number } 差值(毫秒)
 * @example const leftTime = diffDays(date1, date2)
 */
```
## getNowTime
获取当前时间
```typescript
/**
 * @func getNowTime
 * @desc 获取当前时间
 * @return { string } 时间字符串(年 月 日 HH:mm:ss)
 * @example const time = getNowTime()
 */
```
## formatDate
格式化时间
```typescript
/**
 * @func formatDate
 * @desc 格式化时间
 * @param { string } format 格式化的参数
 * @param { Date } time 需要格式化的时间
 * @return { string } 格式化后的时间字符串
 * @example const time = formatDate(yyyy-MM-dd HH:mm:ss) //'2022-07-09 18:01:03'
 */
```
## formatPassTime
格式化${startTime}距现在的已过时间
```typescript
/**
 * @func formatPassTime
 * @desc 格式化${startTime}距现在的已过时间
 * @param { Date } startTime 参考时间
 * @return { string } 时间差
 * @example const formatPassTime = formatPassTime(1657361005773) // "刚刚"
 */
```
## formatRemainTime
格式化现在距${endTime}的剩余时间
```typescript
/**
 * @func formatRemainTime
 * @desc 格式化现在距${endTime}的剩余时间
 * @param { Date } endTime 参考时间
 * @return { string } 时间差
 * @example const formatRemainTime = formatRemainTime(1657361005773) // "1天3小时2分钟16秒"
 */
```
## isLeapYear
是否为闰年
```typescript
/**
 * @func isLeapYear
 * @desc 是否为闰年
 * @param { number } year 年份
 * @return { boolean } 是否为闰年
 * @example if (isLeapYear) { doSomething }
 */
```
## getDaysByMonth
获取指定日期月份的总天数
```typescript
/**
 * @func getDaysByMonth
 * @desc 获取指定日期月份的总天数
 * @param { Date } time 日期
 * @return { number } 天数
 * @example const days = getDaysByMonth(1657361005773)
 */
```
## timeLeft
倒计时 ${startTime - endTime}的剩余时间,startTime大于endTime时，均返回0
```typescript
/**
 * @func timeLeft
 * @desc  倒计时 ${startTime - endTime}的剩余时间,startTime大于endTime时，均返回0
 * @param { Date | String } startTime 开始时间
 * @param { Date | String } endTime 结束时间
 * @return { Object } { d, h, m, s } 天 时 分 秒
 * @example const leftTime = timeLeft(startTime, endTime) // { d, h, m, s } 天 时 分 秒
 */
```