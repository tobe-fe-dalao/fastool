# Function 函数

> 节流防抖、组合柯里化、缓存与异步控制。

共 24 个函数、1 个类型。

## 函数

### retry

异步函数失败重试，全部失败后抛出最后一次的错误

**签名**

```ts
async function retry<T>( fn: () => Promise<T>,
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `fn` | `Function` | 返回 Promise 的函数 |
| `times` | `number` | 最大尝试次数（含首次），默认 3 |
| `delay` | `number` | 每次重试前的延迟毫秒数，默认 0 |

**返回** `Promise<T>` 首次成功的结果

**示例**

```ts

const data = await retry(() => fetch('/api').then((r) => r.json()), 3, 1000);
```

### withTimeout

为 Promise 设置超时时间，超时后以指定错误 reject

**签名**

```ts
function withTimeout<T>(promise: Promise<T>, ms: number, message = 'timeout'): Promise<T>
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `promise` | `Promise<T>` | 目标 Promise |
| `ms` | `number` | 超时毫秒数 |
| `message` | `string` | 超时错误信息，默认 'timeout' |

**返回** `Promise<T>` 带超时控制的 Promise

**示例**

```ts
await withTimeout(fetch('/api'), 5000, '请求超时');
```

### defer

将函数推迟到下一个微任务执行（类似 process.nextTick）

**签名**

```ts
function defer(fn: () => void): Promise<void>
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `fn` | `Function` | 需要延迟执行的函数 |

**返回** `Promise<void>` 在微任务中完成的 Promise

**示例**

```ts
defer(() => console.log('later'));
```

### rafThrottle

使用 requestAnimationFrame 节流，保证回调每帧最多执行一次（浏览器环境）

**签名**

```ts
function rafThrottle<F extends (...args: any[]) => any>(fn: F): (...args: Parameters<F>) => void
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `fn` | `Function` | 目标函数 |

**返回** `Function` 节流后的函数

**示例**

```ts
window.addEventListener('scroll', rafThrottle(onScroll));
```

### isAsyncFunction

判断函数是否为 async 函数

**签名**

```ts
function isAsyncFunction(fn: unknown): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `fn` | `unknown` | 待判断的值 |

**返回** `boolean`

**示例**

```ts
isAsyncFunction(async () => {}) // true
```

### pipe

从左到右组合函数，前一个函数的返回值作为后一个函数的入参

**签名**

```ts
function pipe(...fns: Function[]): Function
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `fns` | `...Function[]` | 函数序列 |

**返回** `Function` 组合后的函数

**示例**

```ts

const fn = pipe((x: number) => x + 1, (x: number) => x * 2);
fn(3) // 8
```

### compose

从右到左组合函数（pipe 的反向版本）

**签名**

```ts
function compose(...fns: Function[]): Function
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `fns` | `...Function[]` | 函数序列 |

**返回** `Function` 组合后的函数

**示例**

```ts

const fn = compose((x: number) => x * 2, (x: number) => x + 1);
fn(3) // 8
```

### curry

函数柯里化，参数够用才执行，否则返回接收剩余参数的新函数

**签名**

```ts
function curry(fn: Function, arity: number = fn.length): Function
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `fn` | `Function` | 目标函数 |
| `arity` | `number` | 参数个数，默认取 fn.length |

**返回** `Function` 柯里化后的函数

**示例**

```ts

const add = (a: number, b: number, c: number) => a + b + c;
curry(add)(1)(2)(3) // 6
curry(add)(1, 2)(3) // 6
```

### partial

固定函数的部分参数，返回一个参数更少的新函数

**签名**

```ts
function partial(fn: Function, ...presetArgs: any[]): Function
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `fn` | `Function` | 目标函数 |
| `presetArgs` | `...any[]` | 需要固定的前置参数 |

**返回** `Function` 新函数

**示例**

```ts

const add = (a: number, b: number) => a + b;
const add10 = partial(add, 10);
add10(5) // 15
```

### once

让函数只执行一次，后续调用直接返回首次的结果

**签名**

```ts
function once<F extends (...args: any[]) => any>(fn: F): F
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `fn` | `Function` | 目标函数 |

**返回** `Function` 包装后的函数

**示例**

```ts

const init = once(() => { console.log('init'); return 1; });
init(); // 打印 init，返回 1
init(); // 不再打印，直接返回 1
```

### memoize

缓存函数的计算结果，相同入参只计算一次；可通过 .cache 访问缓存

**签名**

```ts
function memoize<F extends (...args: any[]) => any>(
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `fn` | `Function` | 目标函数 |
| `resolver` | `Function` | 自定义缓存 key 生成函数，默认用 JSON.stringify 序列化参数 |

**返回** `Function` 带缓存的函数

**示例**

```ts

const calc = memoize((n: number) => n * n);
calc(4) // 16（首次计算）
calc(4) // 16（读缓存）
calc.cache.clear();
```

### times

执行 n 次函数并收集返回值

**签名**

```ts
function times(n: number, fn: (index: number) => any = (i) => i): any[]
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `n` | `number` | 执行次数 |
| `fn` | `Function` | 每次执行的函数，接收当前索引 |

**返回** `any[]` 返回值数组

**示例**

```ts
times(3, (i) => i * 2) // [0, 2, 4]
```

### noop

空函数，常用作默认回调

**签名**

```ts
function noop(): void
```

**示例**

```ts
const cb = options.callback ?? noop;
```

### identity

返回传入的值本身

**签名**

```ts
function identity<T>(value: T): T
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `T` | 任意值 |

**返回** `T` 原值

**示例**

```ts
identity(5) // 5
```

### negate

取反一个判断函数的结果

**签名**

```ts
function negate<F extends (...args: any[]) => boolean>(predicate: F): F
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `predicate` | `Function` | 判断函数 |

**返回** `Function` 取反后的函数

**示例**

```ts
const notEmpty = negate(isEmpty);
```

### mergeObject

深拷贝合并对象

**签名**

```ts
const mergeObject = <T extends Record<string, any> = Record<string, any>>( obj1: any, obj2: Record<string, any> ): T
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `obj1` | `object` | 外部的参数对象 |
| `obj2` | `object` | 默认参数对象 |

**返回** `Object`

**示例**

```ts
mergeObject(obj1, obj2)
```

### observeDef

设计一个对象的观测者

**签名**

```ts
const observeDef = (obj: Object): Object | undefined
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `obj` | ` Object ` | 对象 |

**返回** ` Object ` 返回一个可观测对象

**示例**

```ts
let obj = observerDef({name:'alex',age:18})
```

### observeProxy

设计一个对象的观测者-proxy方案

**签名**

```ts
const observeProxy = (obj: Object, cal: (val: any) => void)
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `obj` | ` Object ` | 对象 |

**返回** ` cal ` 观测对象回调方法

**示例**

```ts
let obj = observeProxy({name:'alex',age:18},callback)
```

### throttle

函数节流：在 wait 毫秒内最多执行一次，用于滚动、resize 等高频事件

**签名**

```ts
function throttle<F extends (...args: any[]) => any>(
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `fn` | `Function` | 需要节流的函数 |
| `wait` | `number` | 时间间隔（毫秒），默认 300 |
| `options` | `object` | leading 是否立即执行第一次调用（默认 true）； |

**返回** `ControlledFunction` 节流后的函数，带 cancel 方法

**示例**

```ts

const onScroll = throttle(() => console.log('scroll'), 200);
window.addEventListener('scroll', onScroll);
onScroll.cancel(); // 取消
```

### debounce

函数防抖：在最后一次触发后 wait 毫秒才执行，用于输入搜索、表单校验等

**签名**

```ts
function debounce<F extends (...args: any[]) => any>(
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `fn` | `Function` | 需要防抖的函数 |
| `wait` | `number` | 延迟时间（毫秒），默认 300 |
| `immediate` | `boolean` | 是否立即执行第一次调用，默认 false |

**返回** `ControlledFunction` 防抖后的函数，带 cancel 方法

**示例**

```ts

const search = debounce((kw) => request(kw), 500);
input.addEventListener('input', (e) => search(e.target.value));
```

### deepClone

深度克隆对象，支持循环引用、Date、RegExp、Map、Set、数组与 Symbol 键

**签名**

```ts
function deepClone<T>(obj: T, hash: WeakMap<object, any> = new WeakMap()): T
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `obj` | `T` | 需要克隆的值 |
| `hash` | `WeakMap` | 内部使用的缓存，无需手动传入 |

**返回** `T` 克隆后的新值

**示例**

```ts
const copy = deepClone({ a: { b: 1 } });
```

### getTypeOf

获取值的精确类型（小写）

**签名**

```ts
const getTypeOf = (param: unknown): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `param` | `unknown` | 待判断的值 |

**返回** `string` 如 'string' \| 'number' \| 'array' \| 'date' \| 'regexp' \| 'null' 等

**示例**

```ts
getTypeOf([]) // 'array'
getTypeOf(null) // 'null'
```

### sleep

睡眠指定毫秒（异步）

**签名**

```ts
const sleep = async (wait: number): Promise<void>
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `wait` | `number` | 毫秒数 |

**返回** `Promise<void>`

**示例**

```ts
await sleep(1000);
```

### fetchUtil

基于 fetch 的极简请求封装；params 为对象时自动序列化为 JSON

**签名**

```ts
const fetchUtil =
```

**示例**

```ts
fetchUtil.get('/api/list')
fetchUtil.post('/api/add', { name: 'Tom' })
```

## 类型定义

### ControlledFunction

带 cancel 方法的包装函数类型

```ts
interface ControlledFunction<F extends (...args: any[]) => any> {
  (...args: Parameters<F>): void;
  /** 取消尚未执行的调用 */
  cancel(): void;
}
```
