# Random
## randomColor
随机生成颜色
```typescript
/**
 * @func randomColor
 * @desc 随机生成颜色
 * @return { string } 随机色
 * @example const color = randomColor()
 */
```
## randomInt
生成指定范围[min, max]的随机数
```typescript
/**
 * @func randomInt
 * @desc 生成指定范围[min, max]的随机数
 * @param { number } min 最小值
 * @param { number } max 最大值
 * @return { number } 随机数
 * @example const num = randomInt(0, 10)
 */
```
## randomIP
生成一个随机的IP地址，可以是IPv4或者IPv6
```typescript
/**
 * @func randomIP
 * @desc 生成一个随机的IP地址，可以是IPv4或者IPv6
 * @param { number } type 0: ipv4; 1: ipv6
 * @return { string } ip地址
 * @example const ip = randomIP(1)
 */
```