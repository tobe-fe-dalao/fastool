# String
## randomString
生成随机字符串
```typescript
/**
 * @func randomString
 * @desc 生成随机字符串
 * @param { number } len 长度
 * @return { string } 随机字符串
 * @example const str = randomString(15)
 */
```
## firstUpperCase
首字母大写
```typescript
/**
 * @func firstUpperCase
 * @desc 首字母大写
 * @param { string } str 需要处理的字符
 * @return { string } 处理后的字符
 * @example const str = firstUpperCase('abc')
 */
```
## telEncrypt
手机号中间加密
```typescript
/**
 * @func telEncrypt
 * @desc 手机号中间加密
 * @param { number } tel 需要处理的手机号
 * @return { string } 处理后的手机号
 * @example const str = telEncrypt(12345678912)
 */
```
## getKebabCase
转换成短横线命名
```typescript
/**
 * @func getKebabCase
 * @desc 转换成短横线命名
 * @param { string } str 需要处理的字符
 * @return { string } 处理后的字符
 * @example const str = getKebabCase('aBc')
 */
```
## getCamelCase
转换成驼峰命名
```typescript
/**
 * @func getCamelCase
 * @desc 转换成驼峰命名
 * @param { string } str 需要处理的字符
 * @return { string } 处理后的字符
 * @example const str = getCamelCase('a-bc')
 */
```
## getEscapeString
字符串的转义,将`&`, `<`, `>`, `"`, `'`分别转义为`&amp;`, `&lt;`,  `&gt;`, `&quot;`, `&#x27;`
```typescript
/**
 * @func getEscapeString
 * @desc 字符串的转义,将`&`, `<`, `>`, `"`, `'`分别转义为`&amp;`, `&lt;`,  `&gt;`, `&quot;`, `&#x27;`
 * @param { string } str 需要处理的字符
 * @return { string } 处理后的字符
 * @example const str = getEscapeString('<')
 */
```
## getUnEscapeString
字符串的反转义,将`&amp;`, `&lt;`,  `&gt;`, `&quot;`, `&#x27;`替换为转义前的符号
```typescript
/**
 * @func getUnEscapeString
 * @desc 字符串的反转义,将`&amp;`, `&lt;`,  `&gt;`, `&quot;`, `&#x27;`替换为转义前的符号
 * @param { string } str 需要处理的字符
 * @return { string } 处理后的字符
 * @example const str = getUnEscapeString('&amp;')
 */
```
