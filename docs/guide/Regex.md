# Regex


## isChines
是否是中文
```typescript
/**
 * @func isChines
 * @desc 是否是中文
 * @param { string } str 需要判断的数据
 * @return { boolean } 是否是中文
 * @example if (isChines(str)) { doSomething }
 */
```
## isCard
是否为身份证号: 支持（1/2）代，15位或18位
```typescript
/**
 * @func isCard
 * @desc 是否为身份证号: 支持（1/2）代，15位或18位
 * @param { string } str 需要判断的数据
 * @param { number } type 1: 15位；2: 18位；默认0：同事匹配15位和18位
 * @return { boolean } 是否为身份证号
 * @example if (isCard(str)) { doSomething }
 */
```
## isPostCode
校验是否是大陆邮政编码
```typescript
/**
 * @func isPostCode
 * @desc 校验是否是大陆邮政编码
 * @param { number } value 需要判断的数据
 * @return { boolean } 是否是大陆邮政编码
 * @example if (isPostCode(str)) { doSomething }
 */
```
## isIPv6
校验是否是IPv6地址
```typescript
/**
 * @func isIPv6
 * @desc 校验是否是IPv6地址
 * @param { string } str 需要判断的数据
 * @return { boolean } 是否是IPv6地址
 * @example if (isIPv6(str)) { doSomething }
 */
```
## isEmail
是否是邮箱
```typescript
/**
 * @func isEmail
 * @desc 是否是邮箱
 * @param { string } value 需要判断的数据
 * @return { boolean } 是否是邮箱
 * @example if (isEmail(str)) { doSomething }
 */
```
## isTelNumber
是否是手机号
```typescript
/**
 * @func isTelNumber
 * @desc 是否是手机号
 * @param { string } str 需要判断的数据
 * @return { boolean } 是否是手机号
 * @example if (isTelNumber(str)) { doSomething }
 */
```
## isHasEmoji
是否包含emoji表情
```typescript
/**
 * @func isHasEmoji
 * @desc 是否包含emoji表情
 * @param { string } value 需要判断的数据
 * @return { boolean } 是否包含emoji表情
 * @example if (isHasEmoji(str)) { doSomething }
 */
```
## isUrl
校验是否是URL
```typescript
/**
 * @func isUrl
 * @desc 校验是否是URL
 * @param { string } value 需要判断的数据
 * @return { boolean } 校验是否是URL
 * @example if (isUrl(str)) { doSomething }
 */
```
