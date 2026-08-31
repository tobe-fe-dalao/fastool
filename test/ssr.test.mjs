/**
 * SSR（服务端渲染）安全性测试
 *
 * 这是一个重点契约：fastool 必须能在 Node / SSR 环境下被安全导入和调用，
 * 所有依赖 window / document / navigator 的函数都应返回兜底值而不是抛错。
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  isBrowser,
  isServer,
  getOS,
  isWeiXin,
  isMobile,
  isIOS,
  isAndroid,
  isTablet,
  getDeviceType,
  getFingerprint,
  getDeviceId,
  isSupportCamera,
  getBrowserInfo,
  getClientHeight,
  getClientWidth,
  getScrollPosition,
  isSupportWebP,
  scrollToTop,
  scrollToBottom,
  smoothScroll,
  openNewTag,
  toFullScreen,
  exitFullScreen,
  windowResize,
  watchResize,
  copyToClipboard,
  isInViewport,
  getUrlParams,
  getBaseUrl,
  getImageBase64Url,
} from '../dist/index.mjs';

test('确认当前确实处于无 DOM 的环境', () => {
  assert.equal(typeof window, 'undefined');
  assert.equal(typeof document, 'undefined');
});

test('环境判断', () => {
  assert.equal(isBrowser, false);
  assert.equal(isServer(), true);
});

test('设备相关函数返回安全兜底值', () => {
  assert.equal(getOS(), 'unknown');
  assert.equal(isWeiXin(), false);
  assert.equal(isMobile(), false);
  assert.equal(isIOS(), false);
  assert.equal(isAndroid(), false);
  assert.equal(isTablet(), false);
  assert.equal(getDeviceType(), 'desktop');
  assert.equal(getFingerprint(), '');
});

test('设备相关的异步函数不抛错', async () => {
  assert.equal(await getDeviceId(), '');
  assert.equal(await isSupportCamera(), false);
});

test('浏览器信息返回 unknown', () => {
  const info = getBrowserInfo();
  assert.equal(info.type, 'unknown');
  assert.equal(info.version, -1);
});

test('尺寸与滚动相关函数不抛错', () => {
  assert.equal(getClientHeight(), 0);
  assert.equal(getClientWidth(), 0);
  assert.deepEqual(getScrollPosition(), { x: 0, y: 0 });
  assert.equal(isSupportWebP(), false);

  assert.doesNotThrow(() => scrollToTop());
  assert.doesNotThrow(() => scrollToBottom());
  assert.doesNotThrow(() => smoothScroll(0));
  assert.doesNotThrow(() => toFullScreen());
  assert.doesNotThrow(() => exitFullScreen());
  assert.doesNotThrow(() => openNewTag('https://example.com'));
});

test('DOM 相关函数返回安全值', () => {
  assert.equal(isInViewport(null), false);
  assert.equal(getImageBase64Url('https://example.com/a.png'), '');
});

test('监听函数返回可用的取消函数', () => {
  const off1 = windowResize();
  const off2 = watchResize(() => {});
  assert.equal(typeof off1, 'function');
  assert.equal(typeof off2, 'function');
  assert.doesNotThrow(() => off1());
  assert.doesNotThrow(() => off2());
});

test('URL 相关函数不依赖 location', () => {
  assert.deepEqual(getUrlParams(), {});
  assert.equal(getBaseUrl(), '');
});

test('剪贴板复制在没有 DOM 时返回 false 而不是崩溃', async () => {
  assert.equal(await copyToClipboard('text'), false);
});
