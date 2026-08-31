# Device 设备

> 设备类型与操作系统识别，纯 UA 解析，无第三方依赖。

共 10 个函数。

## 函数

### getOS

获取操作系统类型

**签名**

```ts
const getOS = (): string
```

**返回** `String` 操作系统类型：'Windows Phone' \| 'Symbian' \| 'Tablet' \| 'Ios' \| 'Android' \| 'FireFox' \| 'Chrome' \| 'Pc' \| 'unknown'

**示例**

```ts
getOS() // 'Pc'
```

### isWeiXin

是否是微信内置浏览器

**签名**

```ts
const isWeiXin = (): boolean
```

**返回** `Boolean`

**示例**

```ts
isWeiXin()
```

### isMobile

是否是移动端

**签名**

```ts
const isMobile = (): boolean
```

**返回** `Boolean`

**示例**

```ts
isMobile()
```

### isIOS

是否是 iOS 设备（含 iPadOS 冒充 macOS 的情况）

**签名**

```ts
const isIOS = (): boolean
```

**返回** `Boolean`

**示例**

```ts
isIOS()
```

### isAndroid

是否是 Android 设备

**签名**

```ts
const isAndroid = (): boolean
```

**返回** `Boolean`

**示例**

```ts
isAndroid()
```

### isTablet

是否是平板设备

**签名**

```ts
const isTablet = (): boolean
```

**返回** `Boolean`

**示例**

```ts
isTablet()
```

### getDeviceType

获取设备大类

**签名**

```ts
const getDeviceType = (): 'mobile' | 'tablet' | 'desktop'
```

**返回** `'mobile' \| 'tablet' \| 'desktop'` 设备类型

**示例**

```ts
getDeviceType() // 'desktop'
```

### isSupportCamera

是否支持摄像头（异步版本，能准确判断是否存在视频输入设备）

**签名**

```ts
const isSupportCamera = async (): Promise<boolean>
```

**返回** `Promise<Boolean>` 是否支持

**示例**

```ts
await isSupportCamera()
```

### getFingerprint

基于浏览器环境特征生成一个设备指纹（纯原生实现，不加载任何远程脚本）

**签名**

```ts
const getFingerprint = (): string
```

**返回** `String` 设备指纹（32 位十六进制字符串）

**示例**

```ts
getFingerprint() // 'a1b2c3d4e5f60718...'
```

### getDeviceId

获取设备唯一 ID（异步）。

**签名**

```ts
const getDeviceId = async (): Promise<string>
```

**返回** `Promise<String>` 设备 ID

**示例**

```ts

const id = await getDeviceId()
```
