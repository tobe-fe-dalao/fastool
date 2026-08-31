/**
 * function 模块补充测试：mergeObject / observeDef / observeProxy / rafThrottle
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mergeObject, observeDef, observeProxy, rafThrottle } from '../dist/index.mjs';

test('mergeObject 深合并，传入对象优先于默认值', () => {
  const passed = { a: 1, nested: { x: 1 } };
  const defaults = { a: 9, nested: { x: 2, y: 3 }, b: 5 };
  const merged = mergeObject(passed, defaults);
  assert.deepEqual(merged, { a: 1, nested: { x: 1, y: 3 }, b: 5 });
});

test('mergeObject 仅传一个对象时以空对象为基底', () => {
  const merged = mergeObject({ a: 1 }, null);
  assert.deepEqual(merged, { a: 1 });
});

test('observeDef 通过 getter/setter 读写', () => {
  const o = observeDef({ name: 'alex', age: 18 });
  assert.equal(o.name, 'alex');
  o.name = 'bob';
  assert.equal(o.name, 'bob');
  assert.equal(o.age, 18);
});

test('observeDef 非对象入参返回 undefined', () => {
  assert.equal(observeDef(null), undefined);
  assert.equal(observeDef(42), undefined);
});

test('observeProxy 在赋值时触发回调', () => {
  let captured;
  const o = observeProxy({ name: 'a' }, (val) => (captured = val));
  o.name = 'b';
  assert.equal(captured, 'b');
  assert.equal(o.name, 'b');
});

test('rafThrottle 调用底层函数', () => {
  // 模拟 requestAnimationFrame 同步执行
  globalThis.requestAnimationFrame = (cb) => {
    cb(0);
    return 1;
  };
  let count = 0;
  const fn = rafThrottle(() => count++);
  fn();
  assert.equal(count, 1);
  fn();
  assert.equal(count, 2);
  delete globalThis.requestAnimationFrame;
});
