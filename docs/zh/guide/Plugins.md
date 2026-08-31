# Plugins 插件

> 来自独立入口 `fastool/plugins`。⚠️ 这些函数会在**运行时从 CDN 动态加载第三方库**，主包不含它们；追求零外部依赖时不要引用本入口。

共 5 个函数。

## 函数

### importPlugin

从 CDN 动态加载一个第三方模块

**签名**

```ts
function importPlugin(moduleName: string, cdnUrl: string): Promise<any>
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `moduleName` | `string` | 模块挂载到 window 上的全局名，非 ESM 回退路径使用 |
| `cdnUrl` | `string` | 模块的 CDN 地址 |

**返回** `Promise<any>` 加载完成的模块

**示例**

```ts

const dayjs = await importPlugin('dayjs', 'https://unpkg.com/dayjs@1.11.3/dayjs.min.js');
dayjs().format('YYYY-MM-DD');
```

### importPluginByUrl

### dayJs

**签名**

```ts
const dayJs = async (cdnUrl: string = DEFAULT_CDN): Promise<any>
```

### copyJs

**签名**

```ts
const copyJs = async (cdnUrl: string = DEFAULT_CDN): Promise<any>
```

### keyCode

**签名**

```ts
const keyCode = async (cdnUrl: string = DEFAULT_CDN): Promise<ITinyKey>
```
