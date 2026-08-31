# デバイス (Device)

> Device type and OS detection from UA, zero dependencies.

Total 10 functions.

## Functions

### getOS

Get the operating system type

**Signature**

```ts
const getOS = (): string
```

**Returns** `String` OS type: 'Windows Phone' \| 'Symbian' \| 'Tablet' \| 'Ios' \| 'Android' \| 'FireFox' \| 'Chrome' \| 'Pc' \| 'unknown'

**Example**

```ts
getOS() // 'Pc'
```

### isWeiXin

Whether running inside the WeChat built-in browser

**Signature**

```ts
const isWeiXin = (): boolean
```

**Returns** `Boolean`

**Example**

```ts
isWeiXin()
```

### isMobile

Whether the current device is mobile

**Signature**

```ts
const isMobile = (): boolean
```

**Returns** `Boolean`

**Example**

```ts
isMobile()
```

### isIOS

Whether the device is iOS (including iPadOS masquerading as macOS)

**Signature**

```ts
const isIOS = (): boolean
```

**Returns** `Boolean`

**Example**

```ts
isIOS()
```

### isAndroid

Whether the device is Android

**Signature**

```ts
const isAndroid = (): boolean
```

**Returns** `Boolean`

**Example**

```ts
isAndroid()
```

### isTablet

Whether the device is a tablet

**Signature**

```ts
const isTablet = (): boolean
```

**Returns** `Boolean`

**Example**

```ts
isTablet()
```

### getDeviceType

Get the broad device category

**Signature**

```ts
const getDeviceType = (): 'mobile' | 'tablet' | 'desktop'
```

**Returns** `'mobile' \| 'tablet' \| 'desktop'` device type

**Example**

```ts
getDeviceType() // 'desktop'
```

### isSupportCamera

Whether a camera is supported (async version; accurately detects a video input device)

**Signature**

```ts
const isSupportCamera = async (): Promise<boolean>
```

**Returns** `Promise<Boolean>` whether supported

**Example**

```ts
await isSupportCamera()
```

### getFingerprint

Generate a device fingerprint based on browser environment characteristics

**Signature**

```ts
const getFingerprint = (): string
```

**Returns** `String` the device fingerprint (a 32-character hexadecimal string)

**Example**

```ts
getFingerprint() // 'a1b2c3d4e5f60718...'
```

### getDeviceId

Get a unique device ID (async).

**Signature**

```ts
const getDeviceId = async (): Promise<string>
```

**Returns** `Promise<String>` the device ID

**Example**

```ts

const id = await getDeviceId()
```
