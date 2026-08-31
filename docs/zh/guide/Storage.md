# Storage 存储

> localStorage / sessionStorage / cookie，支持过期时间，SSR 安全。

共 14 个函数、1 个类型。

## 函数

### createStorage

创建一组存储方法（内部使用，统一 local / session 的实现）

**签名**

```ts
function createStorage(getter: () => Storage)
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `getter` | `Function` | 获取原生 Storage 对象的方法 |

**返回** `object` set / get / remove / clear 四个方法

### setCookie

设置 cookie；第三个参数传数字时表示有效期（毫秒），传对象时表示完整配置

**签名**

```ts
const setCookie = ( key: string, value: string, options: number | CookieOptions = {} ): void
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `key` | `string` | cookie 名称 |
| `value` | `string` | cookie 值 |
| `options` | `number \| CookieOptions` | 有效期（毫秒）或配置项 |

**返回** `void`

**示例**

```ts
setCookie('token', 'abc');
setCookie('token', 'abc', 86400000); // 1 天
setCookie('token', 'abc', { expire: 86400000, path: '/', secure: true });
```

### getCookie

获取指定名称的 cookie 值，不存在时返回空字符串

**签名**

```ts
const getCookie = (key: string): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `key` | `string` | cookie 名称 |

**返回** `string` cookie 值

**示例**

```ts
getCookie('token') // 'abc'
```

### getAllCookies

获取全部 cookie，以对象形式返回

**签名**

```ts
const getAllCookies = (): Record<string, string>
```

**返回** `Record<string, string>` cookie 键值对

**示例**

```ts
getAllCookies() // { token: 'abc', theme: 'dark' }
```

### hasCookie

判断指定名称的 cookie 是否存在

**签名**

```ts
const hasCookie = (key: string): boolean
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `key` | `string` | cookie 名称 |

**返回** `boolean`

**示例**

```ts
hasCookie('token') // true
```

### deleteCookie

删除指定 cookie（通过将其过期时间设为过去实现）

**签名**

```ts
const deleteCookie = (key: string, path = '/'): void
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `key` | `string` | cookie 名称 |
| `path` | `string` | cookie 路径，需与写入时一致，默认 / |

**返回** `void`

**示例**

```ts
deleteCookie('token');
```

### setLocalStorage

写入 localStorage，支持任意可 JSON 序列化的数据与过期时间

**签名**

```ts
const setLocalStorage = (key: string, value: any, expire?: number): void
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `key` | `string` | 键名 |
| `value` | `any` | 值 |
| `expire` | `number` | 过期时间（毫秒），不传则不过期 |

**返回** `void`

**示例**

```ts
setLocalStorage('user', { name: 'Tom' });
setLocalStorage('token', 'abc', 7 * 24 * 60 * 60 * 1000); // 7 天后过期
```

### getLocalStorage

读取 localStorage；不存在或已过期时返回默认值

**签名**

```ts
const getLocalStorage = <T = any>(key: string, defaultValue: T | null = null): T | null
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `key` | `string` | 键名 |
| `defaultValue` | `any` | 默认值，默认 null |

**返回** `any` 存储的值

**示例**

```ts
getLocalStorage('user'); // { name: 'Tom' }
getLocalStorage('missing', 'none'); // 'none'
```

### delLocalStorage

删除 localStorage 中的指定键

**签名**

```ts
const delLocalStorage = (key: string): void => driver.remove(key);
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `key` | `string` | 键名 |

**返回** `void`

**示例**

```ts
delLocalStorage('user');
```

### clearLocalStorage

清空当前域名下的所有 localStorage

**签名**

```ts
const clearLocalStorage = (): void => driver.clear();
```

**返回** `void`

**示例**

```ts
clearLocalStorage();
```

### setSessionStorage

写入 sessionStorage，支持任意可 JSON 序列化的数据与过期时间

**签名**

```ts
const setSessionStorage = (key: string, value: any, expire?: number): void
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `key` | `string` | 键名 |
| `value` | `any` | 值 |
| `expire` | `number` | 过期时间（毫秒），不传则不过期 |

**返回** `void`

**示例**

```ts
setSessionStorage('step', 2);
```

### getSessionStorage

读取 sessionStorage；不存在或已过期时返回默认值

**签名**

```ts
const getSessionStorage = <T = any>(key: string, defaultValue: T | null = null): T | null
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `key` | `string` | 键名 |
| `defaultValue` | `any` | 默认值，默认 null |

**返回** `any` 存储的值

**示例**

```ts
getSessionStorage('step', 1); // 2
```

### delSessionStorage

删除 sessionStorage 中的指定键

**签名**

```ts
const delSessionStorage = (key: string): void => driver.remove(key);
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `key` | `string` | 键名 |

**返回** `void`

**示例**

```ts
delSessionStorage('step');
```

### clearSessionStorage

清空当前域名下的所有 sessionStorage

**签名**

```ts
const clearSessionStorage = (): void => driver.clear();
```

**返回** `void`

**示例**

```ts
clearSessionStorage();
```

## 类型定义

### CookieOptions

cookie 配置项

```ts
interface CookieOptions {
  /** 有效期（毫秒）；不传则为会话级 cookie */
  expire?: number;
  /** 路径，默认 / */
  path?: string;
  /** 域名 */
  domain?: string;
  /** 仅 HTTPS 传输 */
  secure?: boolean;
  /** SameSite 策略 */
  sameSite?: 'Lax' | 'Strict' | 'None';
}
```
