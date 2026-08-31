# String 字符串

> 命名风格转换、脱敏、转义与模板渲染。

共 22 个函数。

## 函数

### nanoid

### randomString

生成指定长度的随机字符串（已剔除易混淆字符 0/o/O/l/I 等）

**签名**

```ts
const randomString = (len: number): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `len` | `number` | 长度 |

**返回** `string` 随机字符串

**示例**

```ts
randomString(6) // 'aB3dEf'
```

### firstUpperCase

首字母大写（其余字符保持不变）

**签名**

```ts
const firstUpperCase = (str: string): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `str` | `string` | 源字符串 |

**返回** `string`

**示例**

```ts
firstUpperCase('hello') // 'Hello'
```

### capitalize

首字母大写，其余字母转为小写

**签名**

```ts
const capitalize = (str: string): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `str` | `string` | 源字符串 |

**返回** `string`

**示例**

```ts
capitalize('hELLO') // 'Hello'
```

### camelCase

转换为小驼峰命名，支持处理 - _ 空格 及已存在的驼峰

**签名**

```ts
const camelCase = (str: string): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `str` | `string` | 源字符串 |

**返回** `string`

**示例**

```ts
camelCase('get-user-info') // 'getUserInfo'
camelCase('GetUserInfo') // 'getUserInfo'
```

### kebabCase

转换为短横线（kebab-case）命名

**签名**

```ts
const kebabCase = (str: string): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `str` | `string` | 源字符串 |

**返回** `string`

**示例**

```ts
kebabCase('getUserInfo') // 'get-user-info'
kebabCase('get_user_info') // 'get-user-info'
```

### snakeCase

转换为下划线（snake_case）命名

**签名**

```ts
const snakeCase = (str: string): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `str` | `string` | 源字符串 |

**返回** `string`

**示例**

```ts
snakeCase('getUserInfo') // 'get_user_info'
```

### pascalCase

转换为大驼峰（PascalCase）命名

**签名**

```ts
const pascalCase = (str: string): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `str` | `string` | 源字符串 |

**返回** `string`

**示例**

```ts
pascalCase('get-user-info') // 'GetUserInfo'
```

### getCamelCase

转换成驼峰命名（camelCase 的别名，保留向后兼容）

**签名**

```ts
const getCamelCase = (str: string): string => camelCase(str);
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `str` | `string` | 源字符串 |

**返回** `string`

### getKebabCase

转换成短横线命名（kebabCase 的别名，保留向后兼容）

**签名**

```ts
const getKebabCase = (str: string): string => kebabCase(str);
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `str` | `string` | 源字符串 |

**返回** `string`

### telEncrypt

手机号中间四位脱敏

**签名**

```ts
const telEncrypt = (tel: string | number): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `tel` | `string \| number` | 手机号 |

**返回** `string` 脱敏后的手机号

**示例**

```ts
telEncrypt(13812345678) // '138****5678'
```

### mask

通用字符串脱敏，保留头尾、中间用指定字符填充

**签名**

```ts
const mask = (str: string, start = 0, end = 0, char = '*'): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `str` | `string` | 源字符串 |
| `start` | `number` | 头部保留长度，默认 0 |
| `end` | `number` | 尾部保留长度，默认 0 |
| `char` | `string` | 填充字符，默认 '*' |

**返回** `string` 脱敏后的字符串

**示例**

```ts
mask('13812345678', 3, 4) // '138****5678'
mask('张三丰', 1, 0) // '张**'
```

### truncate

按长度截断字符串，超出部分用省略符代替

**签名**

```ts
const truncate = (str: string, length: number, omission = '...'): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `str` | `string` | 源字符串 |
| `length` | `number` | 最大长度（含省略符） |
| `omission` | `string` | 省略符，默认 '...' |

**返回** `string`

**示例**

```ts
truncate('hello world', 8) // 'hello...'
```

### reverse

反转字符串（可正确处理 emoji 等代理对字符）

**签名**

```ts
const reverse = (str: string): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `str` | `string` | 源字符串 |

**返回** `string`

**示例**

```ts
reverse('hello') // 'olleh'
```

### trim

去除字符串首尾指定字符，默认去除空白

**签名**

```ts
const trim = (str: string, chars = '\\s'): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `str` | `string` | 源字符串 |
| `chars` | `string` | 需要去除的字符集合，默认 '\\s' |

**返回** `string`

**示例**

```ts
trim('  hi  ') // 'hi'
trim('--hi--', '-') // 'hi'
```

### byteLength

计算字符串的 UTF-8 字节长度（中文按 3 字节、emoji 按 4 字节计算）

**签名**

```ts
const byteLength = (str: string): number
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `str` | `string` | 源字符串 |

**返回** `number` 字节数

**示例**

```ts
byteLength('你好') // 6
```

### template

简易字符串模板替换，默认解析 `{{key}}` 占位符

**签名**

```ts
const template = ( str: string, data: Record<string, unknown>, pattern: RegExp = /\{\{(\w+)\}\}/g ): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `str` | `string` | 模板字符串 |
| `data` | `Record<string, unknown>` | 数据对象 |
| `pattern` | `RegExp` | 占位符正则，默认 `/\{\{(\w+)\}\}/g` |

**返回** `string` 替换后的字符串

**示例**

```ts
template('hi {{name}}', { name: 'Tom' }) // 'hi Tom'
```

### escapeRegExp

转义字符串中的正则特殊字符，使其可以安全地用于 new RegExp()

**签名**

```ts
const escapeRegExp = (str: string): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `str` | `string` | 源字符串 |

**返回** `string` 转义后的字符串

**示例**

```ts
escapeRegExp('a.b') // 'a\\.b'
```

### count

统计子字符串出现的次数（不重叠）

**签名**

```ts
const count = (str: string, sub: string): number
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `str` | `string` | 源字符串 |
| `sub` | `string` | 子字符串 |

**返回** `number` 出现次数

**示例**

```ts
count('abcabc', 'a') // 2
```

### getEscapeString

字符串转义，将 `&` `<` `>` `"` `'` 分别转义为 HTML 实体

**签名**

```ts
const getEscapeString = (str: string): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `str` | `string` | 源字符串 |

**返回** `string` 转义后的字符串

**示例**

```ts
getEscapeString('<p>') // '&lt;p&gt;'
```

### getUnEscapeString

字符串反转义，将 HTML 实体还原为原始字符

**签名**

```ts
const getUnEscapeString = (str: string): string
```

**参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `str` | `string` | 源字符串 |

**返回** `string` 还原后的字符串

**示例**

```ts
getUnEscapeString('&lt;p&gt;') // '<p>'
```

### nanoid

**签名**

```ts
const nanoid = (size = 21): string
```
