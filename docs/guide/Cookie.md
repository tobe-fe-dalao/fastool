# Cookie
## setCookie
设置cookie
```typescript
/**
 * @func setCookie
 * @desc  设置cookie
 * @param { string } key 键名
 * @param { string } value 键值
 * @param { number } expire 过期时间记录(expires)
 * @example setCookie('a', 'b', 500)
 */
```
## getCookie
获取cookie
```typescript
/**
 * @func getCookie
 * @desc  获取cookie
 * @param { string } key 键名
 * @return { Array | string | undefined } cookie值
 * @example const val = getCookie('a')
 */
```
## clearCookie
清除cookie
```typescript
/**
 * @func clearCookie
 * @desc  清除cookie
 * @param { string } key 需要清除的键名
 * @example clearCookie('a')
 */
```
