# Polyfill 补丁

> 老旧浏览器 API 补丁，来自独立入口 `fastool/polyfill`。每个补丁只会在原生方法缺失时生效，现代浏览器调用无副作用。

共 24 个函数。

## 函数

### polyfillAll

一次性应用全部补丁

**签名**

```ts
function polyfillAll(): void
```

**返回** `void`

**示例**

```ts

import { polyfillAll } from 'fastool/polyfill';
polyfillAll();
```

### polyfillArrayEvery

补齐 Array.prototype.every

**签名**

```ts
function polyfillArrayEvery(): void
```

**返回** `void`

**示例**

```ts
polyfillArrayEvery(); [1, 2, 3].every((n) => n > 0); // true
```

### polyfillArraySome

补齐 Array.prototype.some

**签名**

```ts
function polyfillArraySome(): void
```

**返回** `void`

**示例**

```ts
polyfillArraySome(); [1, 2, 3].some((n) => n > 2); // true
```

### polyfillArrayForEach

补齐 Array.prototype.forEach

**签名**

```ts
function polyfillArrayForEach(): void
```

**返回** `void`

**示例**

```ts
polyfillArrayForEach(); [1, 2].forEach((n) => console.log(n));
```

### polyfillArrayMap

补齐 Array.prototype.map

**签名**

```ts
function polyfillArrayMap(): void
```

**返回** `void`

**示例**

```ts
polyfillArrayMap(); [1, 2].map((n) => n * 2); // [2, 4]
```

### polyfillArrayFilter

补齐 Array.prototype.filter

**签名**

```ts
function polyfillArrayFilter(): void
```

**返回** `void`

**示例**

```ts
polyfillArrayFilter(); [1, 2, 3].filter((n) => n > 1); // [2, 3]
```

### polyfillArrayIndexOf

补齐 Array.prototype.indexOf

**签名**

```ts
function polyfillArrayIndexOf(): void
```

**返回** `void`

**示例**

```ts
polyfillArrayIndexOf(); [1, 2].indexOf(2); // 1
```

### polyfillArrayFind

补齐 Array.prototype.find

**签名**

```ts
function polyfillArrayFind(): void
```

**返回** `void`

**示例**

```ts
polyfillArrayFind(); [1, 2, 3].find((n) => n > 1); // 2
```

### polyfillArrayFindIndex

补齐 Array.prototype.findIndex

**签名**

```ts
function polyfillArrayFindIndex(): void
```

**返回** `void`

**示例**

```ts
polyfillArrayFindIndex(); [1, 2, 3].findIndex((n) => n > 1); // 1
```

### polyfillArrayIncludes

补齐 Array.prototype.includes

**签名**

```ts
function polyfillArrayIncludes(): void
```

**返回** `void`

**示例**

```ts
polyfillArrayIncludes(); [1, 2].includes(2); // true
```

### polyfillArrayReduce

补齐 Array.prototype.reduce

**签名**

```ts
function polyfillArrayReduce(): void
```

**返回** `void`

**示例**

```ts
polyfillArrayReduce(); [1, 2, 3].reduce((a, b) => a + b, 0); // 6
```

### polyfillArrayFrom

补齐 Array.from，可把类数组对象或可迭代对象转为真数组

**签名**

```ts
function polyfillArrayFrom(): void
```

**返回** `void`

**示例**

```ts
polyfillArrayFrom(); Array.from({ length: 2 }, (_, i) => i); // [0, 1]
```

### polyfillObjectAssign

补齐 Object.assign（浅拷贝合并，与原生行为一致，只处理可枚举自有属性）

**签名**

```ts
function polyfillObjectAssign(): void
```

**返回** `void`

**示例**

```ts
polyfillObjectAssign(); Object.assign({}, { a: 1 }); // { a: 1 }
```

### polyfillObjectEntries

补齐 Object.entries

**签名**

```ts
function polyfillObjectEntries(): void
```

**返回** `void`

**示例**

```ts
polyfillObjectEntries(); Object.entries({ a: 1 }); // [['a', 1]]
```

### polyfillObjectValues

补齐 Object.values

**签名**

```ts
function polyfillObjectValues(): void
```

**返回** `void`

**示例**

```ts
polyfillObjectValues(); Object.values({ a: 1 }); // [1]
```

### polyfillObjectIs

补齐 Object.is（区分 +0/-0，且 NaN 等于自身）

**签名**

```ts
function polyfillObjectIs(): void
```

**返回** `void`

**示例**

```ts
polyfillObjectIs(); Object.is(NaN, NaN); // true
```

### polyfillArrayIsArray

补齐 Array.isArray（部分老旧 iframe 环境下会失效）

**签名**

```ts
function polyfillArrayIsArray(): void
```

**返回** `void`

**示例**

```ts
polyfillArrayIsArray(); Array.isArray([]); // true
```

### polyfillStringIncludes

补齐 String.prototype.includes

**签名**

```ts
function polyfillStringIncludes(): void
```

**返回** `void`

**示例**

```ts
polyfillStringIncludes(); 'abc'.includes('b'); // true
```

### polyfillStringStartsWith

补齐 String.prototype.startsWith

**签名**

```ts
function polyfillStringStartsWith(): void
```

**返回** `void`

**示例**

```ts
polyfillStringStartsWith(); 'abc'.startsWith('ab'); // true
```

### polyfillStringEndsWith

补齐 String.prototype.endsWith

**签名**

```ts
function polyfillStringEndsWith(): void
```

**返回** `void`

**示例**

```ts
polyfillStringEndsWith(); 'abc'.endsWith('bc'); // true
```

### polyfillStringTrim

补齐 String.prototype.trim，同时清理 BOM 与不换行空格

**签名**

```ts
function polyfillStringTrim(): void
```

**返回** `void`

**示例**

```ts
polyfillStringTrim(); '  a  '.trim(); // 'a'
```

### polyfillStringRepeat

补齐 String.prototype.repeat

**签名**

```ts
function polyfillStringRepeat(): void
```

**返回** `void`

**示例**

```ts
polyfillStringRepeat(); 'ab'.repeat(2); // 'abab'
```

### polyfillStringPadStart

补齐 String.prototype.padStart

**签名**

```ts
function polyfillStringPadStart(): void
```

**返回** `void`

**示例**

```ts
polyfillStringPadStart(); '5'.padStart(2, '0'); // '05'
```

### polyfillStringPadEnd

补齐 String.prototype.padEnd

**签名**

```ts
function polyfillStringPadEnd(): void
```

**返回** `void`

**示例**

```ts
polyfillStringPadEnd(); '5'.padEnd(2, '0'); // '50'
```
