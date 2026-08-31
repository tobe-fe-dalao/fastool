# ストレージ (Storage)

> localStorage / sessionStorage / cookie with expiry, SSR-safe.

Total 14 functions, 1 types.

## Functions

### createStorage

Create a set of storage methods (for internal use; unifies local / session implementations)

**Signature**

```ts
function createStorage(getter: () => Storage)
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `getter` | `Function` | a function that returns the native Storage object |

**Returns** `object` four methods: set / get / remove / clear

### setCookie

Set a cookie; when the third argument is a number it means expiration in ms, when an object it means full options

**Signature**

```ts
const setCookie = ( key: string, value: string, options: number | CookieOptions = {} ): void
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `key` | `string` | cookie name |
| `value` | `string` | cookie value |
| `options` | `number \| CookieOptions` | expiration in ms or options object |

**Returns** `void`

**Example**

```ts
setCookie('token', 'abc');
setCookie('token', 'abc', 86400000); // 1 day
setCookie('token', 'abc', { expire: 86400000, path: '/', secure: true });
```

### getCookie

Get the value of the cookie with the given name; returns an empty string when missing

**Signature**

```ts
const getCookie = (key: string): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `key` | `string` | cookie name |

**Returns** `string` cookie value

**Example**

```ts
getCookie('token') // 'abc'
```

### getAllCookies

Get all cookies, returned as an object

**Signature**

```ts
const getAllCookies = (): Record<string, string>
```

**Returns** `Record<string, string>` cookie key-value pairs

**Example**

```ts
getAllCookies() // { token: 'abc', theme: 'dark' }
```

### hasCookie

Check whether a cookie with the given name exists

**Signature**

```ts
const hasCookie = (key: string): boolean
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `key` | `string` | cookie name |

**Returns** `boolean`

**Example**

```ts
hasCookie('token') // true
```

### deleteCookie

Delete the specified cookie (by setting its expiration to the past)

**Signature**

```ts
const deleteCookie = (key: string, path = '/'): void
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `key` | `string` | cookie name |
| `path` | `string` | cookie path, must match the one used when writing, defaults to / |

**Returns** `void`

**Example**

```ts
deleteCookie('token');
```

### setLocalStorage

Write a value into localStorage; supports any JSON-serializable data and an expiration time

**Signature**

```ts
const setLocalStorage = (key: string, value: any, expire?: number): void
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `key` | `string` | key name |
| `value` | `any` | value |
| `expire` | `number` | expiration time in milliseconds; omit to never expire |

**Returns** `void`

**Example**

```ts
setLocalStorage('user', { name: 'Tom' });
setLocalStorage('token', 'abc', 7 * 24 * 60 * 60 * 1000); // expires after 7 days
```

### getLocalStorage

Read from localStorage; returns the default value when the key is missing or expired

**Signature**

```ts
const getLocalStorage = <T = any>(key: string, defaultValue: T | null = null): T | null
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `key` | `string` | key name |
| `defaultValue` | `any` | default value, defaults to null |

**Returns** `any` the stored value

**Example**

```ts
getLocalStorage('user'); // { name: 'Tom' }
getLocalStorage('missing', 'none'); // 'none'
```

### delLocalStorage

Remove the specified key from localStorage

**Signature**

```ts
const delLocalStorage = (key: string): void => driver.remove(key);
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `key` | `string` | key name |

**Returns** `void`

**Example**

```ts
delLocalStorage('user');
```

### clearLocalStorage

Clear all localStorage entries under the current domain

**Signature**

```ts
const clearLocalStorage = (): void => driver.clear();
```

**Returns** `void`

**Example**

```ts
clearLocalStorage();
```

### setSessionStorage

Write a value into sessionStorage; supports any JSON-serializable data and an expiration time

**Signature**

```ts
const setSessionStorage = (key: string, value: any, expire?: number): void
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `key` | `string` | key name |
| `value` | `any` | value |
| `expire` | `number` | expiration time in milliseconds; omit to never expire |

**Returns** `void`

**Example**

```ts
setSessionStorage('step', 2);
```

### getSessionStorage

Read from sessionStorage; returns the default value when the key is missing or expired

**Signature**

```ts
const getSessionStorage = <T = any>(key: string, defaultValue: T | null = null): T | null
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `key` | `string` | key name |
| `defaultValue` | `any` | default value, defaults to null |

**Returns** `any` the stored value

**Example**

```ts
getSessionStorage('step', 1); // 2
```

### delSessionStorage

Remove the specified key from sessionStorage

**Signature**

```ts
const delSessionStorage = (key: string): void => driver.remove(key);
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `key` | `string` | key name |

**Returns** `void`

**Example**

```ts
delSessionStorage('step');
```

### clearSessionStorage

Clear all sessionStorage entries under the current domain

**Signature**

```ts
const clearSessionStorage = (): void => driver.clear();
```

**Returns** `void`

**Example**

```ts
clearSessionStorage();
```

## Types

### CookieOptions

Cookie options

```ts
interface CookieOptions {
  /** Validity period in milliseconds; omit for a session-level cookie */
  expire?: number;
  /** Path, defaults to / */
  path?: string;
  /** Domain */
  domain?: string;
  /** Only transmitted over HTTPS */
  secure?: boolean;
  /** SameSite policy */
  sameSite?: 'Lax' | 'Strict' | 'None';
}
```
