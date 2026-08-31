# 関数 (Function)

> Throttle / debounce, composition, currying and async control.

Total 24 functions, 1 types.

## Functions

### retry

Retry an async function on failure, throwing the last error after all attempts fail

**Signature**

```ts
async function retry<T>( fn: () => Promise<T>,
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `fn` | `Function` | function returning a Promise |
| `times` | `number` | maximum number of attempts (including the first), default 3 |
| `delay` | `number` | delay in ms before each retry, default 0 |

**Returns** `Promise<T>` result of the first success

**Example**

```ts

const data = await retry(() => fetch('/api').then((r) => r.json()), 3, 1000);
```

### withTimeout

Set a timeout for a Promise, rejecting with the given error on timeout

**Signature**

```ts
function withTimeout<T>(promise: Promise<T>, ms: number, message = 'timeout'): Promise<T>
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `promise` | `Promise<T>` | target Promise |
| `ms` | `number` | timeout in milliseconds |
| `message` | `string` | timeout error message, default 'timeout' |

**Returns** `Promise<T>` Promise with timeout control

**Example**

```ts
await withTimeout(fetch('/api'), 5000, '请求超时');
```

### defer

Defer a function to the next microtask (similar to process.nextTick)

**Signature**

```ts
function defer(fn: () => void): Promise<void>
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `fn` | `Function` | function to defer |

**Returns** `Promise<void>` Promise resolved in the microtask

**Example**

```ts
defer(() => console.log('later'));
```

### rafThrottle

Throttle with requestAnimationFrame, ensuring the callback runs at most once per frame (browser only)

**Signature**

```ts
function rafThrottle<F extends (...args: any[]) => any>(fn: F): (...args: Parameters<F>) => void
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `fn` | `Function` | target function |

**Returns** `Function` throttled function

**Example**

```ts
window.addEventListener('scroll', rafThrottle(onScroll));
```

### isAsyncFunction

Check whether a function is an async function

**Signature**

```ts
function isAsyncFunction(fn: unknown): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `fn` | `unknown` | value to check |

**Returns** `boolean`

**Example**

```ts
isAsyncFunction(async () => {}) // true
```

### pipe

Compose functions left to right; the return value of each becomes the input of the next

**Signature**

```ts
function pipe(...fns: Function[]): Function
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `fns` | `...Function[]` | function sequence |

**Returns** `Function` composed function

**Example**

```ts

const fn = pipe((x: number) => x + 1, (x: number) => x * 2);
fn(3) // 8
```

### compose

Compose functions right to left (the reverse of pipe)

**Signature**

```ts
function compose(...fns: Function[]): Function
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `fns` | `...Function[]` | function sequence |

**Returns** `Function` composed function

**Example**

```ts

const fn = compose((x: number) => x * 2, (x: number) => x + 1);
fn(3) // 8
```

### curry

Curry a function: only execute when enough args are given, otherwise return a function for the rest

**Signature**

```ts
function curry(fn: Function, arity: number = fn.length): Function
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `fn` | `Function` | target function |
| `arity` | `number` | arity; defaults to fn.length |

**Returns** `Function` curried function

**Example**

```ts

const add = (a: number, b: number, c: number) => a + b + c;
curry(add)(1)(2)(3) // 6
curry(add)(1, 2)(3) // 6
```

### partial

Fix some arguments of a function, returning a new function with fewer parameters

**Signature**

```ts
function partial(fn: Function, ...presetArgs: any[]): Function
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `fn` | `Function` | target function |
| `presetArgs` | `...any[]` | preset leading arguments |

**Returns** `Function` new function

**Example**

```ts

const add = (a: number, b: number) => a + b;
const add10 = partial(add, 10);
add10(5) // 15
```

### once

Make a function run only once; later calls return the first result

**Signature**

```ts
function once<F extends (...args: any[]) => any>(fn: F): F
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `fn` | `Function` | target function |

**Returns** `Function` wrapped function

**Example**

```ts

const init = once(() => { console.log('init'); return 1; });
init(); // prints init, returns 1
init(); // no longer prints, returns 1
```

### memoize

Cache a function's results; identical inputs are computed once; accessible via .cache

**Signature**

```ts
function memoize<F extends (...args: any[]) => any>(
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `fn` | `Function` | target function |
| `resolver` | `Function` | custom cache-key generator; defaults to JSON.stringify of the arguments |

**Returns** `Function` function with cache

**Example**

```ts

const calc = memoize((n: number) => n * n);
calc(4) // 16 (first calculation)
calc(4) // 16 (from cache)
calc.cache.clear();
```

### times

Run a function n times and collect the return values

**Signature**

```ts
function times(n: number, fn: (index: number) => any = (i) => i): any[]
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `n` | `number` | number of runs |
| `fn` | `Function` | function run each time, receiving the current index |

**Returns** `any[]` array of return values

**Example**

```ts
times(3, (i) => i * 2) // [0, 2, 4]
```

### noop

no-op function, often used as a default callback

**Signature**

```ts
function noop(): void
```

**Example**

```ts
const cb = options.callback ?? noop;
```

### identity

Return the value passed in

**Signature**

```ts
function identity<T>(value: T): T
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `value` | `T` | any value |

**Returns** `T` the same value

**Example**

```ts
identity(5) // 5
```

### negate

Negate the result of a predicate function

**Signature**

```ts
function negate<F extends (...args: any[]) => boolean>(predicate: F): F
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `predicate` | `Function` | predicate function |

**Returns** `Function` negated function

**Example**

```ts
const notEmpty = negate(isEmpty);
```

### mergeObject

Deep-merge objects

**Signature**

```ts
const mergeObject = <T extends Record<string, any> = Record<string, any>>( obj1: any, obj2: Record<string, any> ): T
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `obj1` | `object` | outer parameter object |
| `obj2` | `object` | default parameter object |

**Returns** `Object`

**Example**

```ts
mergeObject(obj1, obj2)
```

### observeDef

Design an observer for an object

**Signature**

```ts
const observeDef = (obj: Object): Object | undefined
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `obj` | ` Object ` | object |

**Returns** ` Object ` returns an observable object

**Example**

```ts
let obj = observerDef({name:'alex',age:18})
```

### observeProxy

Design an object observer - proxy approach

**Signature**

```ts
const observeProxy = (obj: Object, cal: (val: any) => void)
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `obj` | ` Object ` | object |

**Returns** ` cal ` observer callback method

**Example**

```ts
let obj = observeProxy({name:'alex',age:18},callback)
```

### throttle

Throttle a function: execute at most once within wait ms, for high-frequency events like scroll and resize

**Signature**

```ts
function throttle<F extends (...args: any[]) => any>(
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `fn` | `Function` | function to throttle |
| `wait` | `number` | time interval in ms, default 300 |
| `options` | `object` | leading: whether to invoke the first call immediately (default true); trailing: whether to fire once more after the end (default true) |

**Returns** `ControlledFunction` throttled function, with a cancel method

**Example**

```ts

const onScroll = throttle(() => console.log('scroll'), 200);
window.addEventListener('scroll', onScroll);
onScroll.cancel(); // cancel
```

### debounce

Debounce a function: execute wait ms after the last trigger, for input search, form validation, etc.

**Signature**

```ts
function debounce<F extends (...args: any[]) => any>(
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `fn` | `Function` | function to debounce |
| `wait` | `number` | delay in ms, default 300 |
| `immediate` | `boolean` | whether to invoke the first call immediately, default false |

**Returns** `ControlledFunction` debounced function, with a cancel method

**Example**

```ts

const search = debounce((kw) => request(kw), 500);
input.addEventListener('input', (e) => search(e.target.value));
```

### deepClone

Deep-clone an object, supporting circular references, Date, RegExp, Map, Set, arrays, and Symbol keys

**Signature**

```ts
function deepClone<T>(obj: T, hash: WeakMap<object, any> = new WeakMap()): T
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `obj` | `T` | value to clone |
| `hash` | `WeakMap` | internal cache; no need to pass manually |

**Returns** `T` cloned value

**Example**

```ts
const copy = deepClone({ a: { b: 1 } });
```

### getTypeOf

Get the precise type of a value (lowercase)

**Signature**

```ts
const getTypeOf = (param: unknown): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `param` | `unknown` | value to check |

**Returns** `string` e.g. 'string' \| 'number' \| 'array' \| 'date' \| 'regexp' \| 'null', etc.

**Example**

```ts
getTypeOf([]) // 'array'
getTypeOf(null) // 'null'
```

### sleep

Sleep for a given number of milliseconds (async)

**Signature**

```ts
const sleep = async (wait: number): Promise<void>
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `wait` | `number` | milliseconds |

**Returns** `Promise<void>`

**Example**

```ts
await sleep(1000);
```

### fetchUtil

A minimal fetch-based request wrapper; serializes params to JSON automatically when it is an object

**Signature**

```ts
const fetchUtil =
```

**Example**

```ts
fetchUtil.get('/api/list')
fetchUtil.post('/api/add', { name: 'Tom' })
```

## Types

### ControlledFunction

Type of a wrapped function with a cancel method

```ts
interface ControlledFunction<F extends (...args: any[]) => any> {
  (...args: Parameters<F>): void;
  /** Cancel a pending invocation */
  cancel(): void;
}
```
