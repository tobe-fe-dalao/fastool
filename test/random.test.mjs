import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  randomInt,
  randomFloat,
  randomBoolean,
  randomPick,
  randomColor,
  randomIP,
  uuid,
} from '../dist/index.mjs';

test('randomInt 生成区间内整数', () => {
  for (let i = 0; i < 200; i++) {
    const n = randomInt(1, 10);
    assert.ok(n >= 1 && n <= 10 && Number.isInteger(n));
  }
  // 单参数：0 ~ n
  const n = randomInt(5);
  assert.ok(n >= 0 && n <= 5);
  // min > max 时自动交换
  const swapped = randomInt(10, 1);
  assert.ok(swapped >= 1 && swapped <= 10);
});

test('randomFloat 生成区间内浮点数', () => {
  for (let i = 0; i < 100; i++) {
    const n = randomFloat(1, 2);
    assert.ok(n >= 1 && n <= 2);
  }
});

test('randomBoolean 生成布尔值', () => {
  const results = new Set();
  for (let i = 0; i < 100; i++) results.add(randomBoolean());
  assert.ok(results.size <= 2);
  assert.ok([...results].every((v) => typeof v === 'boolean'));
});

test('randomPick 从数组中随机取值', () => {
  const arr = ['a', 'b', 'c'];
  for (let i = 0; i < 50; i++) {
    assert.ok(arr.includes(randomPick(arr)));
  }
  assert.equal(randomPick([]), undefined);
  assert.equal(randomPick(undefined), undefined);
});

test('randomColor 生成合法颜色', () => {
  for (let i = 0; i < 50; i++) {
    assert.match(randomColor(), /^#[0-9a-fA-F]{6}$/);
  }
});

test('randomIP 生成合法 IPv4', () => {
  for (let i = 0; i < 50; i++) {
    const ip = randomIP();
    const parts = ip.split('.').map(Number);
    assert.equal(parts.length, 4);
    assert.ok(parts.every((p) => p >= 0 && p <= 255));
  }
});

test('uuid 生成唯一 ID', () => {
  const a = uuid();
  const b = uuid();
  assert.notEqual(a, b);
  assert.ok(a.length >= 32);
  // 符合 8-4-4-4-12 的 UUID 形态
  assert.match(a, /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/);
});
