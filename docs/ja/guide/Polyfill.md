# ポリフィル (Polyfill)

> Legacy-browser patches from the `fastool/polyfill` entry. Each patch only activates when the native method is missing.

Total 24 functions.

## Functions

### polyfillAll

Apply all polyfills at once

**Signature**

```ts
function polyfillAll(): void
```

**Returns** `void`

**Example**

```ts

import { polyfillAll } from 'fastool/polyfill';
polyfillAll();
```

### polyfillArrayEvery

Polyfill Array.prototype.every

**Signature**

```ts
function polyfillArrayEvery(): void
```

**Returns** `void`

**Example**

```ts
polyfillArrayEvery(); [1, 2, 3].every((n) => n > 0); // true
```

### polyfillArraySome

Polyfill Array.prototype.some

**Signature**

```ts
function polyfillArraySome(): void
```

**Returns** `void`

**Example**

```ts
polyfillArraySome(); [1, 2, 3].some((n) => n > 2); // true
```

### polyfillArrayForEach

Polyfill Array.prototype.forEach

**Signature**

```ts
function polyfillArrayForEach(): void
```

**Returns** `void`

**Example**

```ts
polyfillArrayForEach(); [1, 2].forEach((n) => console.log(n));
```

### polyfillArrayMap

Polyfill Array.prototype.map

**Signature**

```ts
function polyfillArrayMap(): void
```

**Returns** `void`

**Example**

```ts
polyfillArrayMap(); [1, 2].map((n) => n * 2); // [2, 4]
```

### polyfillArrayFilter

Polyfill Array.prototype.filter

**Signature**

```ts
function polyfillArrayFilter(): void
```

**Returns** `void`

**Example**

```ts
polyfillArrayFilter(); [1, 2, 3].filter((n) => n > 1); // [2, 3]
```

### polyfillArrayIndexOf

Polyfill Array.prototype.indexOf

**Signature**

```ts
function polyfillArrayIndexOf(): void
```

**Returns** `void`

**Example**

```ts
polyfillArrayIndexOf(); [1, 2].indexOf(2); // 1
```

### polyfillArrayFind

Polyfill Array.prototype.find

**Signature**

```ts
function polyfillArrayFind(): void
```

**Returns** `void`

**Example**

```ts
polyfillArrayFind(); [1, 2, 3].find((n) => n > 1); // 2
```

### polyfillArrayFindIndex

Polyfill Array.prototype.findIndex

**Signature**

```ts
function polyfillArrayFindIndex(): void
```

**Returns** `void`

**Example**

```ts
polyfillArrayFindIndex(); [1, 2, 3].findIndex((n) => n > 1); // 1
```

### polyfillArrayIncludes

Polyfill Array.prototype.includes

**Signature**

```ts
function polyfillArrayIncludes(): void
```

**Returns** `void`

**Example**

```ts
polyfillArrayIncludes(); [1, 2].includes(2); // true
```

### polyfillArrayReduce

Polyfill Array.prototype.reduce

**Signature**

```ts
function polyfillArrayReduce(): void
```

**Returns** `void`

**Example**

```ts
polyfillArrayReduce(); [1, 2, 3].reduce((a, b) => a + b, 0); // 6
```

### polyfillArrayFrom

Polyfill Array.from, converting array-like or iterable objects into real arrays

**Signature**

```ts
function polyfillArrayFrom(): void
```

**Returns** `void`

**Example**

```ts
polyfillArrayFrom(); Array.from({ length: 2 }, (_, i) => i); // [0, 1]
```

### polyfillObjectAssign

Polyfill Object.assign (shallow-merge, consistent with native behavior; only enumerable own properties are processed)

**Signature**

```ts
function polyfillObjectAssign(): void
```

**Returns** `void`

**Example**

```ts
polyfillObjectAssign(); Object.assign({}, { a: 1 }); // { a: 1 }
```

### polyfillObjectEntries

Polyfill Object.entries

**Signature**

```ts
function polyfillObjectEntries(): void
```

**Returns** `void`

**Example**

```ts
polyfillObjectEntries(); Object.entries({ a: 1 }); // [['a', 1]]
```

### polyfillObjectValues

Polyfill Object.values

**Signature**

```ts
function polyfillObjectValues(): void
```

**Returns** `void`

**Example**

```ts
polyfillObjectValues(); Object.values({ a: 1 }); // [1]
```

### polyfillObjectIs

Polyfill Object.is (distinguishes +0/-0, and NaN equals itself)

**Signature**

```ts
function polyfillObjectIs(): void
```

**Returns** `void`

**Example**

```ts
polyfillObjectIs(); Object.is(NaN, NaN); // true
```

### polyfillArrayIsArray

Polyfill Array.isArray (fails in some legacy iframe contexts)

**Signature**

```ts
function polyfillArrayIsArray(): void
```

**Returns** `void`

**Example**

```ts
polyfillArrayIsArray(); Array.isArray([]); // true
```

### polyfillStringIncludes

Polyfill String.prototype.includes

**Signature**

```ts
function polyfillStringIncludes(): void
```

**Returns** `void`

**Example**

```ts
polyfillStringIncludes(); 'abc'.includes('b'); // true
```

### polyfillStringStartsWith

Polyfill String.prototype.startsWith

**Signature**

```ts
function polyfillStringStartsWith(): void
```

**Returns** `void`

**Example**

```ts
polyfillStringStartsWith(); 'abc'.startsWith('ab'); // true
```

### polyfillStringEndsWith

Polyfill String.prototype.endsWith

**Signature**

```ts
function polyfillStringEndsWith(): void
```

**Returns** `void`

**Example**

```ts
polyfillStringEndsWith(); 'abc'.endsWith('bc'); // true
```

### polyfillStringTrim

Polyfill String.prototype.trim, also cleaning BOM and non-breaking spaces

**Signature**

```ts
function polyfillStringTrim(): void
```

**Returns** `void`

**Example**

```ts
polyfillStringTrim(); '  a  '.trim(); // 'a'
```

### polyfillStringRepeat

Polyfill String.prototype.repeat

**Signature**

```ts
function polyfillStringRepeat(): void
```

**Returns** `void`

**Example**

```ts
polyfillStringRepeat(); 'ab'.repeat(2); // 'abab'
```

### polyfillStringPadStart

Polyfill String.prototype.padStart

**Signature**

```ts
function polyfillStringPadStart(): void
```

**Returns** `void`

**Example**

```ts
polyfillStringPadStart(); '5'.padStart(2, '0'); // '05'
```

### polyfillStringPadEnd

Polyfill String.prototype.padEnd

**Signature**

```ts
function polyfillStringPadEnd(): void
```

**Returns** `void`

**Example**

```ts
polyfillStringPadEnd(); '5'.padEnd(2, '0'); // '50'
```
