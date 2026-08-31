/**
 * 运行环境探测测试（browser / device）
 *
 * 这些函数依赖 window / document / navigator。Node 下默认不存在，
 * 这里在导入前注入最小化的全局环境，验证探测逻辑正确。
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

// Node 18+ 自带只读 navigator，用 defineProperty 覆盖为可写对象
Object.defineProperty(globalThis, 'navigator', {
  value: {
    userAgent: '',
    language: 'en-US',
    languages: ['en-US'],
    hardwareConcurrency: 8,
    platform: 'Win32',
    maxTouchPoints: 0,
  },
  configurable: true,
  writable: true,
});
globalThis.window = { document: {}, innerWidth: 1280, innerHeight: 800 };
globalThis.document = {
  documentElement: { clientWidth: 1280, clientHeight: 800 },
  body: { clientWidth: 1280, clientHeight: 800 },
};

const {
  getOS,
  isMobile,
  isIOS,
  isAndroid,
  isTablet,
  isWeiXin,
  getDeviceType,
  getClientWidth,
  getClientHeight,
  getBrowserInfo,
} = await import('../dist/index.mjs');

/** 设置 userAgent（及可选额外 navigator 属性） */
function setUA(ua, extra = {}) {
  globalThis.navigator.userAgent = ua;
  Object.assign(globalThis.navigator, extra);
}

const CHROME =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const FIREFOX = 'Mozilla/5.0 (X11; Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0';
const SAFARI = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/16.0 Safari/605.1.15';
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1';
const IPAD = 'Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1';
const ANDROID_PHONE = 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 Mobile Safari/537.36';
const ANDROID_TABLET = 'Mozilla/5.0 (Linux; Android 12; SM-T870) AppleWebKit/537.36 Safari/537.36';
const WEIXIN = 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 MicroMessenger/8.0 Safari/604.1';

test('getOS 识别浏览器内核', () => {
  setUA(CHROME);
  assert.equal(getOS(), 'Chrome');
  setUA(FIREFOX);
  assert.equal(getOS(), 'FireFox');
  // 桌面版 Safari（Mac）落入 isPc 分支返回 'Pc'（库内 'Safari' 分支实际不可达）
  setUA(SAFARI);
  assert.equal(getOS(), 'Pc');
});

test('getBrowserInfo 解析类型与版本', () => {
  setUA(CHROME);
  assert.deepEqual(getBrowserInfo(), { type: 'Chrome', version: 120 });
});

test('isMobile / isIOS / isAndroid / isTablet 设备判断', () => {
  setUA(IPHONE);
  assert.equal(isMobile(), true);
  assert.equal(isIOS(), true);
  assert.equal(isAndroid(), false);

  // 库的 isMobile 正则包含 iPad / Android，因此平板同时被判定为 mobile
  setUA(IPAD);
  assert.equal(isIOS(), true);
  assert.equal(isTablet(), true);
  assert.equal(isMobile(), true);

  setUA(ANDROID_PHONE);
  assert.equal(isAndroid(), true);
  assert.equal(isMobile(), true);

  setUA(ANDROID_TABLET);
  assert.equal(isTablet(), true);
  assert.equal(isMobile(), true);
  assert.equal(isAndroid(), true);

  setUA(CHROME);
  assert.equal(isMobile(), false);
  assert.equal(isIOS(), false);
  assert.equal(isAndroid(), false);
  assert.equal(isTablet(), false);
});

test('isWeiXin 识别微信内置浏览器', () => {
  setUA(WEIXIN);
  assert.equal(isWeiXin(), true);
  setUA(CHROME);
  assert.equal(isWeiXin(), false);
});

test('getDeviceType 大类别', () => {
  setUA(IPHONE);
  assert.equal(getDeviceType(), 'mobile');
  setUA(IPAD);
  assert.equal(getDeviceType(), 'tablet');
  setUA(CHROME);
  assert.equal(getDeviceType(), 'desktop');
});

test('getClientWidth / getClientHeight 读取窗口尺寸', () => {
  assert.equal(getClientWidth(), 1280);
  assert.equal(getClientHeight(), 800);
});

test('getClientWidth SSR 无 window 时回退 0', () => {
  const saved = globalThis.window;
  delete globalThis.window;
  assert.equal(getClientWidth(), 0);
  globalThis.window = saved;
});

test('getOS 无 navigator 时回退 unknown', () => {
  const saved = globalThis.window;
  delete globalThis.window; // hasNavigator 依赖 hasWindow
  assert.equal(getOS(), 'unknown');
  globalThis.window = saved;
});
