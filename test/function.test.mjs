import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  throttle,
  debounce,
  deepClone,
  getTypeOf,
  sleep,
  pipe,
  compose,
  curry,
  partial,
  once,
  memoize,
  times,
  noop,
  identity,
  negate,
  retry,
  withTimeout,
  defer,
  isAsyncFunction,
} from '../dist/index.mjs';

test('getTypeOf 类型字符串', () => {
  assert.equal(getTypeOf([]), 'array');
  assert.equal(getTypeOf({}), 'object');
  assert.equal(getTypeOf(null), 'null');
  assert.equal(getTypeOf(new Date()), 'date');
  assert.equal(getTypeOf(1), 'number');
});

test('sleep 延时', async () => {
  const start = Date.now();
  await sleep(30);
  assert.ok(Date.now() - start >= 25);
});

test('throttle 节流：首次立即执行，之后按间隔', async () => {
  let count = 0;
  const fn = throttle(() => count++, 30);
  fn();
  fn();
  fn();
  assert.equal(count, 1);
  await sleep(50);
  fn();
  assert.equal(count, 2);
  fn.cancel();
});

test('debounce 防抖：只在停止后执行', async () => {
  let count = 0;
  const fn = debounce(() => count++, 20);
  fn();
  fn();
  fn();
  assert.equal(count, 0);
  await sleep(50);
  assert.equal(count, 1);
});

test('debounce 可以取消', async () => {
  let count = 0;
  const fn = debounce(() => count++, 20);
  fn();
  fn.cancel();
  await sleep(40);
  assert.equal(count, 0);
});

test('deepClone 深拷贝并处理循环引用', () => {
  const src = {
    a: 1,
    b: { c: [1, 2, { d: 3 }] },
    date: new Date('2024/01/01'),
    reg: /abc/gi,
    map: new Map([['k', 'v']]),
    set: new Set([1, 2]),
  };
  const cloned = deepClone(src);
  assert.deepEqual(cloned.b, src.b);
  assert.notEqual(cloned.b, src.b);
  assert.equal(cloned.date.getTime(), src.date.getTime());
  assert.equal(cloned.reg.source, 'abc');
  assert.equal(cloned.reg.flags, 'gi');
  assert.equal(cloned.map.get('k'), 'v');
  assert.ok(cloned.set.has(2));

  // 循环引用不栈溢出
  const cyclic = { name: 'a' };
  cyclic.self = cyclic;
  const cc = deepClone(cyclic);
  assert.equal(cc.self, cc);
  assert.equal(cc.name, 'a');
});

test('pipe / compose 函数组合', () => {
  const add1 = (n) => n + 1;
  const double = (n) => n * 2;
  assert.equal(pipe(add1, double)(3), 8);
  assert.equal(compose(add1, double)(3), 7);
});

test('curry 柯里化', () => {
  const add = (a, b, c) => a + b + c;
  const curried = curry(add);
  assert.equal(curried(1)(2)(3), 6);
  assert.equal(curried(1, 2)(3), 6);
  assert.equal(curried(1)(2, 3), 6);
});

test('partial 预设参数', () => {
  const add = (a, b) => a + b;
  const add10 = partial(add, 10);
  assert.equal(add10(5), 15);
});

test('once 只执行一次', () => {
  let count = 0;
  const fn = once(() => ++count);
  fn();
  fn();
  assert.equal(count, 1);
});

test('memoize 缓存计算结果', () => {
  let calls = 0;
  const fn = memoize((a, b) => {
    calls++;
    return a + b;
  });
  assert.equal(fn(1, 2), 3);
  assert.equal(fn(1, 2), 3);
  assert.equal(calls, 1);
  assert.equal(fn(2, 3), 5);
  assert.equal(calls, 2);
});

test('times / noop / identity / negate', () => {
  assert.deepEqual(times(3, (i) => i * 2), [0, 2, 4]);
  assert.equal(noop(), undefined);
  assert.equal(identity(5), 5);
  const isEven = (n) => n % 2 === 0;
  assert.equal(negate(isEven)(2), false);
  assert.equal(negate(isEven)(3), true);
});

test('retry 失败重试', async () => {
  let attempts = 0;
  const task = async () => {
    attempts++;
    if (attempts < 3) throw new Error('fail');
    return 'ok';
  };
  const result = await retry(task, 3, 1);
  assert.equal(result, 'ok');
  assert.equal(attempts, 3);

  // 始终失败时抛错
  await assert.rejects(() => retry(async () => { throw new Error('nope'); }, 2, 1));
});

test('withTimeout 超时控制', async () => {
  const slow = new Promise((resolve) => setTimeout(() => resolve('late'), 100));
  await assert.rejects(() => withTimeout(slow, 20), /timeout|超时/i);

  const fast = Promise.resolve('ok');
  assert.equal(await withTimeout(fast, 50), 'ok');
});

test('defer 延迟到下一个微任务', async () => {
  const order = [];
  defer(() => order.push('later'));
  order.push('now');
  await Promise.resolve();
  assert.deepEqual(order, ['now', 'later']);
});

test('isAsyncFunction 判断异步函数', () => {
  assert.ok(isAsyncFunction(async () => {}));
  assert.ok(!isAsyncFunction(() => {}));
  assert.ok(!isAsyncFunction({}));
});
