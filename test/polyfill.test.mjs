import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  polyfillAll,
  polyfillArrayFrom,
  polyfillArrayIncludes,
  polyfillArrayReduce,
  polyfillObjectIs,
  polyfillStringPadEnd,
  polyfillStringPadStart,
  polyfillStringRepeat,
  polyfillStringTrim,
} from '../dist/polyfill.mjs';

test('polyfillAll 调用不抛错且可重复调用', () => {
  assert.doesNotThrow(() => polyfillAll());
  assert.doesNotThrow(() => polyfillAll());
});

test('polyfill 不会覆盖已存在的原生实现', () => {
  const nativeMap = Array.prototype.map;
  polyfillAll();
  assert.equal(Array.prototype.map, nativeMap, '原生 map 不应被替换');
});

test('单个 polyfill 函数可独立调用', () => {
  assert.doesNotThrow(() => {
    polyfillArrayFrom();
    polyfillArrayIncludes();
    polyfillArrayReduce();
    polyfillObjectIs();
    polyfillStringPadEnd();
    polyfillStringPadStart();
    polyfillStringRepeat();
    polyfillStringTrim();
  });
});

test('polyfill 后原生行为仍然正确', () => {
  polyfillAll();
  assert.deepEqual([1, 2, 3, 4].filter((n) => n % 2 === 0), [2, 4]);
  assert.equal([1, 2, 3].reduce((a, b) => a + b, 0), 6);
  assert.equal([1, 2, 3].findIndex((n) => n > 1), 1);
  assert.equal('abc'.padStart(5, '0'), '00abc');
  assert.equal('abc'.padEnd(5, '0'), 'abc00');
  assert.equal('ab'.repeat(3), 'ababab');
});

test('polyfill 入口导出数量符合预期', async () => {
  const mod = await import('../dist/polyfill.mjs');
  // 11 个 Array + 7 个 String + 5 个 Object 补丁，外加 polyfillAll
  assert.equal(Object.keys(mod).length, 24, 'polyfill 导出数量变化：' + Object.keys(mod).length);
  assert.equal(typeof mod.polyfillAll, 'function');
});
