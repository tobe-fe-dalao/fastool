# Plugins

> From the `fastool/plugins` entry. These load third-party libraries from a CDN at runtime; the main bundle does NOT include them.

Total 5 functions.

## Functions

### importPlugin

Dynamically load a third-party module from a CDN

**Signature**

```ts
function importPlugin(moduleName: string, cdnUrl: string): Promise<any>
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `moduleName` | `string` | global name the module is mounted as on window; used by the non-ESM fallback path |
| `cdnUrl` | `string` | CDN URL of the module |

**Returns** `Promise<any>` the loaded module

**Example**

```ts

const dayjs = await importPlugin('dayjs', 'https://unpkg.com/dayjs@1.11.3/dayjs.min.js');
dayjs().format('YYYY-MM-DD');
```

### importPluginByUrl

### dayJs

**Signature**

```ts
const dayJs = async (cdnUrl: string = DEFAULT_CDN): Promise<any>
```

### copyJs

**Signature**

```ts
const copyJs = async (cdnUrl: string = DEFAULT_CDN): Promise<any>
```

### keyCode

**Signature**

```ts
const keyCode = async (cdnUrl: string = DEFAULT_CDN): Promise<ITinyKey>
```
