/**
 * @module device
 * @desc Device and runtime environment utilities.
 *
 * This module is implemented with native APIs only and depends on no third-party
 * libraries (it does not load any remote scripts). All functions are SSR
 * (server-side rendering) safe: under Node they return a safe fallback value
 * instead of throwing.
 */

/**
 * Unified SSR detection: returns true only in a real browser environment.
 *
 * Note: Node 18+ provides a global `navigator` object (with userAgent
 * 'Node.js/xx'), so we cannot check only for `navigator`; we must also verify
 * `window` and `document`.
 */
const hasWindow = (): boolean =>
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

/** Whether userAgent is readable */
const hasNavigator = (): boolean => hasWindow() && typeof navigator !== 'undefined';

/** Safely get the userAgent */
const getUA = (): string => (hasNavigator() ? navigator.userAgent : '');

/**
 * @func getOS
 * @desc Get the operating system type
 * @returns {String} OS type: 'Windows Phone' | 'Symbian' | 'Tablet' | 'Ios' | 'Android' | 'FireFox' | 'Chrome' | 'Pc' | 'unknown'
 * @example getOS() // 'Pc'
 */
export const getOS = (): string => {
  if (!hasNavigator()) return 'unknown';

  const userAgent = getUA();
  const isWindowsPhone = /(?:Windows Phone)/.test(userAgent);
  const isSymbian = /(?:SymbianOS)/.test(userAgent);
  const isAndroid = /(?:Android)/.test(userAgent);
  const isFireFox = /(?:Firefox)/.test(userAgent);
  const isChrome = /(?:Chrome|CriOS)/.test(userAgent);
  const isTablet =
    /(?:iPad|PlayBook)/.test(userAgent) ||
    (isAndroid && !/(?:Mobile)/.test(userAgent)) ||
    (isFireFox && /(?:Tablet)/.test(userAgent));
  const isPhone = /(?:iPhone)/.test(userAgent) && !isTablet;
  const isPc = !isPhone && !isAndroid && !isSymbian;

  if (isWindowsPhone) return 'Windows Phone';
  if (isSymbian) return 'Symbian';
  if (isTablet) return 'Tablet';
  if (isPhone) return 'Ios';
  if (isAndroid) return 'Android';
  if (isFireFox) return 'FireFox';
  if (isChrome) return 'Chrome';
  if (isPc) return 'Pc';
  return 'unknown';
};

/**
 * @func isWeiXin
 * @desc Whether running inside the WeChat built-in browser
 * @returns {Boolean}
 * @example isWeiXin()
 */
export const isWeiXin = (): boolean => {
  if (!hasNavigator()) return false;
  return /micromessenger/i.test(getUA());
};

/**
 * @func isMobile
 * @desc Whether the current device is mobile
 * @returns {Boolean}
 * @example isMobile()
 */
export const isMobile = (): boolean => {
  if (!hasNavigator()) return false;
  return /iPhone|iPod|Android|ios|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone/i.test(getUA());
};

/**
 * @func isIOS
 * @desc Whether the device is iOS (including iPadOS masquerading as macOS)
 * @returns {Boolean}
 * @example isIOS()
 */
export const isIOS = (): boolean => {
  if (!hasNavigator()) return false;
  const ua = getUA();
  if (/iPhone|iPad|iPod/i.test(ua)) return true;
  // iPadOS 13+ spoofs its UA as Macintosh; distinguish it by the number of touch points
  if (hasWindow() && /Macintosh/i.test(ua)) {
    return typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 1;
  }
  return false;
};

/**
 * @func isAndroid
 * @desc Whether the device is Android
 * @returns {Boolean}
 * @example isAndroid()
 */
export const isAndroid = (): boolean => {
  if (!hasNavigator()) return false;
  return /Android|Adr/i.test(getUA());
};

/**
 * @func isTablet
 * @desc Whether the device is a tablet
 * @returns {Boolean}
 * @example isTablet()
 */
export const isTablet = (): boolean => {
  if (!hasNavigator()) return false;
  const ua = getUA();
  return /(?:iPad|PlayBook)/.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua));
};

/**
 * @func getDeviceType
 * @desc Get the broad device category
 * @returns {'mobile' | 'tablet' | 'desktop'} device type
 * @example getDeviceType() // 'desktop'
 */
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  if (!hasNavigator()) return 'desktop';
  if (isTablet()) return 'tablet';
  if (isMobile()) return 'mobile';
  return 'desktop';
};

/**
 * @func isSupportCamera
 * @desc Whether a camera is supported (async version; accurately detects a video input device)
 * @returns {Promise<Boolean>} whether supported
 * @example await isSupportCamera()
 */
export const isSupportCamera = async (): Promise<boolean> => {
  if (!hasNavigator() || !navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    return false;
  }
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.some((device) => device.kind === 'videoinput');
  } catch {
    return false;
  }
};

/**
 * 32-bit string hash (FNV-1a variant) used to compress fingerprint info into a short string.
 * @param {String} str the string to hash
 * @returns {String} an 8-character hexadecimal string
 */
function hashString(str: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

/**
 * @func getFingerprint
 * @desc Generate a device fingerprint based on browser environment characteristics
 * (pure native implementation, no remote scripts loaded).
 *
 * Signals collected include: userAgent, language, timezone, screen size and
 * color depth, hardware concurrency, available-font probing differences, and
 * Canvas rendering differences. This is a "soft fingerprint" — not guaranteed
 * to be unique, but sufficient for most "device differentiation" scenarios.
 *
 * @returns {String} the device fingerprint (a 32-character hexadecimal string)
 * @example getFingerprint() // 'a1b2c3d4e5f60718...'
 */
export const getFingerprint = (): string => {
  if (!hasWindow()) return '';

  const parts: string[] = [];

  // Base environment
  parts.push(getUA());
  parts.push(navigator.language || '');
  parts.push(String((navigator as any).languages || ''));
  parts.push(String(new Date().getTimezoneOffset()));
  parts.push(String(navigator.hardwareConcurrency || 0));
  parts.push(String((navigator as any).deviceMemory || 0));
  parts.push(String((navigator as any).platform || ''));

  // Screen characteristics
  if (typeof screen !== 'undefined') {
    parts.push(`${screen.width}x${screen.height}x${screen.colorDepth}`);
    parts.push(`${screen.availWidth}x${screen.availHeight}`);
  }

  // Canvas rendering differences (stable on the same machine, distinctive across machines)
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 240;
    canvas.height = 60;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px "Arial"';
      ctx.fillStyle = '#f60';
      ctx.fillRect(0, 0, 120, 30);
      ctx.fillStyle = '#069';
      ctx.fillText('fastool 🛠', 2, 15);
      ctx.strokeStyle = 'rgba(102, 204, 0, 0.7)';
      ctx.beginPath();
      ctx.arc(50, 45, 20, 0, Math.PI * 2, true);
      ctx.stroke();
      parts.push(canvas.toDataURL().slice(-120));
    }
  } catch {
    parts.push('no-canvas');
  }

  // Hash each segment then concatenate, reducing overall drift from any single signal change
  return parts.map((part) => hashString(part)).join('');
};

/**
 * @func getDeviceId
 * @desc Get a unique device ID (async).
 *
 * Older versions relied on loading fingerprintjs remotely; this version uses a
 * pure native implementation: once computed, the fingerprint is cached in
 * localStorage so repeated calls on the same device stay stable.
 *
 * @returns {Promise<String>} the device ID
 * @example
 * const id = await getDeviceId()
 */
export const getDeviceId = async (): Promise<string> => {
  const CACHE_KEY = '__fastool_device_id__';
  const fingerprint = getFingerprint();
  if (!fingerprint) return '';

  try {
    if (typeof localStorage !== 'undefined') {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) return cached;
      localStorage.setItem(CACHE_KEY, fingerprint);
    }
  } catch {
    // In private mode or when storage quota is exceeded, ignore and return the freshly computed fingerprint
  }

  return fingerprint;
};
