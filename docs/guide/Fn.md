# Fn
## mergeObject
深拷贝合并对象
```typescript
/**
 * @func mergeObject
 * @desc 深拷贝合并对象
 * @param { Object } obj1 外部的参数对象
 * @param { Object } obj2 默认参数对象
 * @return { Object } 合并后的对象
 * @example const obj = mergeObject(obj1, obj2)
 */
```
## observeDef
设计一个对象的观测者
```typescript
/**
 * @func observeDef
 * @desc 设计一个对象的观测者
 * @param { Object } obj obj对象
 * @return { Object } 返回一个可观测对象
 * @example const obj = observeDef({name:'alex',age:18})
 */
```
## observeProxy
设计一个对象的观测者-proxy方案
```typescript
/**
 * @func observeProxy
 * @desc 设计一个对象的观测者-proxy方案
 * @param { Object } obj obj对象
 * @param { Function } cal 观测对象回调方法
 * @return { Promise } 返回一个可观测对象
 * @example const obj = observeProxy({name:'alex',age:18}, callback)
 */
```
## throttle
函数节流，每隔一段时间执行一次，防止函数过于频繁调用，导致性能问题
```typescript
/**
 * @func throttle
 * @desc 函数节流，每隔一段时间执行一次，防止函数过于频繁调用，导致性能问题
 * @param { Function } fn 将要处理的函数
 * @param { number } wait 时间, 单位为毫秒
 * @return { Function } 节流函数
 * @example throttle(fn, wait)
 */
```
## debounce
防抖函数
与throttle不同的是，debounce保证一个函数在多少毫秒内不再被触发，只会执行一次，要么在第一次调用return的防抖函数时执行，要么在延迟指定毫秒后调用。
```typescript
/**
 * @func debounce
 * @desc 防抖函数
与throttle不同的是，debounce保证一个函数在多少毫秒内不再被触发，只会执行一次，要么在第一次调用return的防抖函数时执行，要么在延迟指定毫秒后调用。
 * @param { Function } fn 将要处理的函数
 * @param { number } wait 时间, 单位为毫秒
 * @param { boolean } immediate 是否在触发事件后 在时间段n开始，立即执行，否则是时间段n结束，才执行
 * @return { Function } 包装好的节流函数
 * @example debounce(fn, wait)
 */
```
## deepClone
深度复制对象
```typescript
/**
 * @func deepClone
 * @desc 深度复制对象
 * @param { Object } obj 将要复制的对象
 * @param { string } hash 哈希值
 * @return { Object } 包装好的节流函数
 * @example const objCopy = deepClone(obj)
 */
```
## fetchUtil
封装fetch函数，用Promise做回调
```typescript
/**
 * @func fetchUtil
 * @desc 封装fetch函数，用Promise做回调
 * @return { Promise }
 * @type {{get: (function(*=)), post: (function(*=, *=))}}
 * @example fetchUtil.post(apiUrl)
 */
```
## getTypeOf
获取参数类型
```typescript
/**
 * @func getTypeOf
 * @desc 获取参数类型
 * @param { unknown } param 参数
 * @return { string } 参数类型
 * @example getTypeOf(...)
 */
```
## sleep
睡眠函数
```typescript
/**
 * @func sleep
 * @desc 睡眠函数
 * @param { number } wait 睡眠时间 毫秒
 * @return { Promise }
 * @example sleep(300)
 */
```
## importPluginByUrl
根据url引入插件模块
```typescript
/**
 * @func importPluginByUrl
 * @desc 根据url引入插件模块
 * @param { string } cdnUrl 引入路径
 * @param { string } pluginName 该插件对应的名称
 * @param { string } newName 重新定义的名称
 * @param { boolean } isEsm 是否是esm模块
 * @return { Promise }
 * @example importPluginByUrl(cdnUrl, pluginName)
 */
```