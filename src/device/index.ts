/**
 * @func: getOS
 * @returns {String} 操作系统类型
 * @desc: 获取操作系统类型
 * @example:  getOS()
 */
export const getOS = (): string => {
  let userAgent = navigator.userAgent,
    isWindowsPhone = /(?:Windows Phone)/.test(userAgent),
    isSymbian = /(?:SymbianOS)/.test(userAgent),
    isAndroid = /(?:Android)/.test(userAgent),
    isFireFox = /(?:Firefox)/.test(userAgent),
    isChrome = /(?:Chrome|CriOS)/.test(userAgent),
    isTablet = /(?:iPad|PlayBook)/.test(userAgent) || (isAndroid && !/(?:Mobile)/.test(userAgent)) || (isFireFox && /(?:Tablet)/.test(userAgent)),
    isPhone = /(?:iPhone)/.test(userAgent) && !isTablet,
    isPc = !isPhone && !isAndroid && !isSymbian;
  if (isWindowsPhone) return 'Windows Phone'
  if (isSymbian) return 'Symbian'
  if (isTablet) return 'Tablet'
  if (isPhone) return 'Ios'
  if (isAndroid) return 'Android'
  if (isFireFox) return 'FireFox'
  if (isChrome) return 'Chrome'
  if (isPc) return 'Pc'
  return 'Unkonwn'
}
/**
 * @func isWeiXin
 * @returns {Boolean} 是否是微信
 * @desc 📝 是否是微信浏览器
 * @example:  isWeiXin()
 */
export const isWeiXin = (): boolean => {
  const ua = window.navigator.userAgent.toLowerCase();
  const match = ua.match(/MicroMessenger/i);
  if (match === null) {
    return false;
  }
  if (match.includes('micromessenger')) {
    return true;
  }
  return false;
}
/**
 * @func isMobile
 * @return {Boolean} 是否是移动端
 * @desc 📝 是否是移动端
 * @example:  isMobile()
 */
export const isMobile = (): boolean => {
  if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
    return true;
  }
  return false;
}

/**
 * @func isSupportCamera
 * @return {Boolean} 是否支持摄像头
 * @desc 📝 是否支持摄像头
 * @example:  isSupportCamera()
 */
export const isSupportCamera = (): boolean => {
  if (navigator.mediaDevices && (navigator as any).mediaDevices.getUserMedia) {
    let deviceList: any = [];
    navigator.mediaDevices
      .enumerateDevices()
      .then(devices => {
        devices.forEach(device => {
          deviceList.push(device.kind);
        });
        if (deviceList.indexOf("videoinput") == "-1") {
          return false;
        } else {
          return true;
        }
      })
      .catch(function (err) {
        console.log(err.name + ": " + err.message);
      });
  }
  return false;
}


/**
 * @func getDeviceId
 * @desc 通过三方库生成设备唯一ID 三方库地址：https://github.com/fingerprintjs/fingerprintjs
 * @returns {Promise} 设备唯一ID
 * @example:  getDeviceId()
 */
export const getDeviceId = () => {
  //远程加载方式 import(https://openfpcdn.io/fingerprintjs/v3)
  return new Promise((resolve, reject) => {
    const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3' as any)
      .then(FingerprintJS => FingerprintJS.load())
    // Get the visitor identifier when you need it.
    fpPromise
      .then(fp => fp.get())
      .then(result => {
        // This is the visitor identifier:
        resolve(result.visitorId)
      })
  })
}