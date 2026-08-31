# 文字列 (String)

> Naming-style conversion, masking, escaping and templating.

Total 22 functions.

## Functions

### nanoid

### randomString

Generate a random string of a given length (confusing characters like 0/o/O/l/I are excluded)

**Signature**

```ts
const randomString = (len: number): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `len` | `number` | length |

**Returns** `string` random string

**Example**

```ts
randomString(6) // 'aB3dEf'
```

### firstUpperCase

Capitalize the first letter (other characters unchanged)

**Signature**

```ts
const firstUpperCase = (str: string): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `str` | `string` | source string |

**Returns** `string`

**Example**

```ts
firstUpperCase('hello') // 'Hello'
```

### capitalize

Capitalize the first letter, lowercase the rest

**Signature**

```ts
const capitalize = (str: string): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `str` | `string` | source string |

**Returns** `string`

**Example**

```ts
capitalize('hELLO') // 'Hello'
```

### camelCase

Convert to camelCase, handling -, _, spaces, and existing camelCase

**Signature**

```ts
const camelCase = (str: string): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `str` | `string` | source string |

**Returns** `string`

**Example**

```ts
camelCase('get-user-info') // 'getUserInfo'
camelCase('GetUserInfo') // 'getUserInfo'
```

### kebabCase

Convert to kebab-case naming

**Signature**

```ts
const kebabCase = (str: string): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `str` | `string` | source string |

**Returns** `string`

**Example**

```ts
kebabCase('getUserInfo') // 'get-user-info'
kebabCase('get_user_info') // 'get-user-info'
```

### snakeCase

Convert to snake_case naming

**Signature**

```ts
const snakeCase = (str: string): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `str` | `string` | source string |

**Returns** `string`

**Example**

```ts
snakeCase('getUserInfo') // 'get_user_info'
```

### pascalCase

Convert to PascalCase naming

**Signature**

```ts
const pascalCase = (str: string): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `str` | `string` | source string |

**Returns** `string`

**Example**

```ts
pascalCase('get-user-info') // 'GetUserInfo'
```

### getCamelCase

Convert to camelCase (alias of camelCase, kept for backward compatibility)

**Signature**

```ts
const getCamelCase = (str: string): string => camelCase(str);
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `str` | `string` | source string |

**Returns** `string`

### getKebabCase

Convert to kebab-case (alias of kebabCase, kept for backward compatibility)

**Signature**

```ts
const getKebabCase = (str: string): string => kebabCase(str);
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `str` | `string` | source string |

**Returns** `string`

### telEncrypt

Mask the middle four digits of a phone number

**Signature**

```ts
const telEncrypt = (tel: string | number): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `tel` | `string \| number` | phone number |

**Returns** `string` masked phone number

**Example**

```ts
telEncrypt(13812345678) // '138****5678'
```

### mask

Generic string masking: keep the head and tail, fill the middle with a given character

**Signature**

```ts
const mask = (str: string, start = 0, end = 0, char = '*'): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `str` | `string` | source string |
| `start` | `number` | leading characters to keep, default 0 |
| `end` | `number` | trailing characters to keep, default 0 |
| `char` | `string` | padding char, default '*' |

**Returns** `string` masked string

**Example**

```ts
mask('13812345678', 3, 4) // '138****5678'
mask('张三丰', 1, 0) // '张**'
```

### truncate

Truncate a string by length, replacing overflow with an omission symbol

**Signature**

```ts
const truncate = (str: string, length: number, omission = '...'): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `str` | `string` | source string |
| `length` | `number` | max length (including omission) |
| `omission` | `string` | omission string, default '...' |

**Returns** `string`

**Example**

```ts
truncate('hello world', 8) // 'hello...'
```

### reverse

Reverse a string (correctly handles surrogate-pair characters like emoji)

**Signature**

```ts
const reverse = (str: string): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `str` | `string` | source string |

**Returns** `string`

**Example**

```ts
reverse('hello') // 'olleh'
```

### trim

Remove specified characters from both ends of a string, default to whitespace

**Signature**

```ts
const trim = (str: string, chars = '\\s'): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `str` | `string` | source string |
| `chars` | `string` | chars to strip, default '\\s' |

**Returns** `string`

**Example**

```ts
trim('  hi  ') // 'hi'
trim('--hi--', '-') // 'hi'
```

### byteLength

Calculate the UTF-8 byte length of a string (Chinese chars count as 3 bytes, emoji as 4 bytes)

**Signature**

```ts
const byteLength = (str: string): number
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `str` | `string` | source string |

**Returns** `number` byte count

**Example**

```ts
byteLength('你好') // 6
```

### template

Simple string template replacement, parsing &#123;&#123;key&#125;&#125; placeholders by default

**Signature**

```ts
const template = ( str: string, data: Record<string, unknown>, pattern: RegExp = /\{\{(\w+)\}\}/g ): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `str` | `string` | template string |
| `data` | `Record<string, unknown>` | data object |
| `pattern` | `RegExp` | placeholder regex, default /&#123;&#123;(\w+)\}\}/g |

**Returns** `string` interpolated string

**Example**

```ts
template('hi {{name}}', { name: 'Tom' }) // 'hi Tom'
```

### escapeRegExp

Escape regex special characters in a string so it can be safely used in new RegExp()

**Signature**

```ts
const escapeRegExp = (str: string): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `str` | `string` | source string |

**Returns** `string` escaped string

**Example**

```ts
escapeRegExp('a.b') // 'a\\.b'
```

### count

Count occurrences of a substring (non-overlapping)

**Signature**

```ts
const count = (str: string, sub: string): number
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `str` | `string` | source string |
| `sub` | `string` | substring |

**Returns** `number` occurrence count

**Example**

```ts
count('abcabc', 'a') // 2
```

### getEscapeString

Escape a string, converting `&` `<` `>` `"` `'` into HTML entities

**Signature**

```ts
const getEscapeString = (str: string): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `str` | `string` | source string |

**Returns** `string` escaped string

**Example**

```ts
getEscapeString('<p>') // '&lt;p&gt;'
```

### getUnEscapeString

Unescape a string, converting HTML entities back to original characters

**Signature**

```ts
const getUnEscapeString = (str: string): string
```

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| `str` | `string` | source string |

**Returns** `string` unescaped string

**Example**

```ts
getUnEscapeString('&lt;p&gt;') // '<p>'
```

### nanoid

**Signature**

```ts
const nanoid = (size = 21): string
```
