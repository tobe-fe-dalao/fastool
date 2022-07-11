# URL
## getUrlParams
解析url 获取 url 中所有的参数，以对象的形式返回，如果参数名重复，则以数组的形式返回
```typescript
/**
 * @func getUrlParams
 * @desc 📝 解析url 获取 url 中所有的参数，以对象的形式返回，如果参数名重复，则以数组的形式返回
 * @param { string } url
 * @return { object } url参数 { id: 123, name: menwei }
 * @example const param = getUrlParams('www.baidu.com?id=123&name=menwei'); // { id: 123, name: menwei }
 */
```
## setUrlParams
修改URL参数
```typescript
/**
 * @func setUrlParams
 * @desc 📝 修改URL参数
 * @param { string } urlKey 参数名
 * @param { string } urlValue 参数值
 * @param { string } url 原始URL
 * @return { string } url 修改后的URL
 * @example const link = setUrlParams('id', '123', 'www.baidu.com') // 'www.baidu.com?id=123
 */
```
## delUrlParams
删除 url 中的参数
```typescript
/**
 * @func delUrlParams
 * @desc 📝 删除 url 中的参数
 * @param { string } 参数
 * @return { string } url 修改后的URL
 * @example delUrlParams('id')
 */
```
## paramsJoinUrl
将参数对象转为 url 字符串
```typescript
/**
 * @func paramsJoinUrl
 * @desc 📝 将参数对象转为 url 字符串
 * @param { object } 参数对象
 * @return { string } url 修改后的URL
 * @example const param = paramsJoinUrl({ id: 123, name: 'menwei'}) // '?id=123&name=menwei'
 */
```
## getBaseUrl
获取 url 中?之前的部分
```typescript
/**
 * @func getBaseUrl
 * @desc 📝 获取 url 中?之前的部分
 * @param { string } url 原始URL
 * @return { string } url 修改后的URL
 * @example const link = getBaseUrl('www.baidu.com?id=123&name=menwei') // 'www.baidu.com'
 */
```
## getUrlDomain
获取 url 中的域名
```typescript
/**
 * @func getUrlDomain
 * @desc 📝 获取 url 中的域名
 * @param { string } url 原始URL
 * @returns { string } url 修改后的URL
 * @example const link = getUrlDomain('http://www.baidu.com?id=123&name=menwei')
 */
```
