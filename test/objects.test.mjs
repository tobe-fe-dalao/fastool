import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  pick,
  omit,
  pickBy,
  omitBy,
  deepEqual,
  get,
  set,
  has,
  invert,
  mapKeys,
  mapValues,
  toPairs,
  fromPairs,
} from '../dist/index.mjs';

test('pick / omit 挑选与剔除', () => {
  const obj = { a: 1, b: 2, c: 3 };
  assert.deepEqual(pick(obj, ['a', 'c']), { a: 1, c: 3 });
  assert.deepEqual(omit(obj, ['a']), { b: 2, c: 3 });
});

test('pickBy / omitBy 按条件过滤', () => {
  const obj = { a: 1, b: 2, c: 3 };
  assert.deepEqual(pickBy(obj, (v) => v > 1), { b: 2, c: 3 });
  assert.deepEqual(omitBy(obj, (v) => v > 1), { a: 1 });
});

test('deepEqual 深度比较', () => {
  assert.ok(deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }));
  assert.ok(!deepEqual({ a: 1 }, { a: '1' }));
  assert.ok(deepEqual(NaN, NaN));
  assert.ok(deepEqual(new Date(1000), new Date(1000)));
  assert.ok(!deepEqual(new Date(1000), new Date(2000)));
  assert.ok(deepEqual(/a/g, /a/g));
  assert.ok(deepEqual(new Map([['a', 1]]), new Map([['a', 1]])));
  assert.ok(deepEqual(new Set([1, 2]), new Set([1, 2])));
  assert.ok(!deepEqual(null, undefined));
});

test('get / set / has 支持路径语法', () => {
  const obj = { a: { b: [{ c: 42 }] } };
  assert.equal(get(obj, 'a.b[0].c'), 42);
  assert.equal(get(obj, 'a.b[0].d', '默认值'), '默认值');
  assert.equal(get(undefined, 'a'), undefined);
  assert.ok(has(obj, 'a.b[0].c'));
  assert.ok(!has(obj, 'a.b[0].x'));

  const target = { a: { b: 1 } };
  const result = set(target, 'a.c[0].d', '新值');
  assert.equal(get(result, 'a.c[0].d'), '新值');
});

test('invert 键值反转', () => {
  assert.deepEqual(invert({ a: '1', b: '2' }), { 1: 'a', 2: 'b' });
});

test('mapKeys / mapValues 映射', () => {
  const obj = { a: 1, b: 2 };
  assert.deepEqual(mapKeys(obj, (v, k) => k.toUpperCase()), { A: 1, B: 2 });
  assert.deepEqual(mapValues(obj, (v) => v * 2), { a: 2, b: 4 });
});

test('toPairs / fromPairs 互逆', () => {
  const obj = { a: 1, b: 2 };
  const pairs = toPairs(obj);
  assert.deepEqual(pairs, [['a', 1], ['b', 2]]);
  assert.deepEqual(fromPairs(pairs), obj);
});
