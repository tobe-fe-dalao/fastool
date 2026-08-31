/**
 * canvas 颜色工具测试（hexToRgb / rgbToHex 为纯函数；changeColorToRGBA 用 fake canvas mock）
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hexToRgb, rgbToHex, changeColorToRGBA } from '../dist/index.mjs';

test('hexToRgb 支持 3 位与 6 位十六进制', () => {
  assert.deepEqual(hexToRgb('#fff'), { r: 255, g: 255, b: 255 });
  assert.deepEqual(hexToRgb('#ffffff'), { r: 255, g: 255, b: 255 });
  assert.deepEqual(hexToRgb('#ff0000'), { r: 255, g: 0, b: 0 });
});

test('hexToRgb toString 返回 rgb 字符串', () => {
  assert.equal(hexToRgb('#fff', true), 'rgb(255, 255, 255)');
});

test('hexToRgb 非法格式返回 null', () => {
  assert.equal(hexToRgb('#gggggg'), null);
  assert.equal(hexToRgb('zzz'), null);
});

test('rgbToHex 反向转换并补零', () => {
  assert.equal(rgbToHex(255, 255, 255), '#ffffff');
  assert.equal(rgbToHex(0, 0, 0), '#000000');
  assert.equal(rgbToHex(255, 0, 0), '#ff0000');
  assert.equal(rgbToHex(1, 2, 3), '#010203');
});

test('changeColorToRGBA 解析颜色（mock document）', () => {
  // 提供一个最小化的 canvas 实现用于解析
  globalThis.document = {
    createElement: () => ({
      width: 0,
      height: 0,
      getContext: () => ({
        fillStyle: '',
        fillRect() {},
        getImageData: () => ({ data: [10, 20, 30, 128] }),
      }),
    }),
  };
  const rgba = changeColorToRGBA('#ffffff');
  assert.deepEqual(rgba, { r: 10, g: 20, b: 30, a: 0.5 }); // 128/255 ≈ 0.5
  delete globalThis.document;
});

test('changeColorToRGBA 在 SSR（无 document）下安全回退', () => {
  delete globalThis.document;
  assert.deepEqual(changeColorToRGBA('#fff'), { r: 0, g: 0, b: 0, a: 0 });
});
