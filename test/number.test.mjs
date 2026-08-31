import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  clamp,
  inRange,
  round,
  toThousands,
  bytesToSize,
  percentage,
  gcd,
  lcm,
  lerp,
  digitUppercase,
  intToChinese,
  sumAverage,
  getDistance,
} from '../dist/index.mjs';

test('clamp 区间限制', () => {
  assert.equal(clamp(15, 0, 10), 10);
  assert.equal(clamp(-5, 0, 10), 0);
  assert.equal(clamp(5, 0, 10), 5);
});

test('inRange 区间判断', () => {
  assert.ok(inRange(3, 2, 5));
  assert.ok(!inRange(5, 2, 5));
  assert.ok(inRange(3, 5));
});

test('round 规避浮点误差', () => {
  assert.equal(round(1.005, 2), 1.01);
  assert.equal(round(1.004, 2), 1);
  assert.equal(round(2.5), 3);
  assert.equal(round(1234.5678, -2), 1200);
});

test('toThousands 千分位', () => {
  assert.equal(toThousands(1234567.89), '1,234,567.89');
  assert.equal(toThousands('1234567'), '1,234,567');
  assert.equal(toThousands(1234, ' '), '1 234');
});

test('bytesToSize 字节格式化', () => {
  assert.equal(bytesToSize(0), '0 B');
  assert.equal(bytesToSize(1024), '1 KB');
  assert.equal(bytesToSize(1536), '1.5 KB');
  assert.equal(bytesToSize(1024 * 1024), '1 MB');
});

test('percentage 百分比', () => {
  assert.equal(percentage(1, 3), 33.33);
  assert.equal(percentage(1, 3, 1), 33.3);
  assert.equal(percentage(1, 0), 0);
});

test('gcd / lcm 最大公约数与最小公倍数', () => {
  assert.equal(gcd(12, 18), 6);
  assert.equal(lcm(4, 6), 12);
});

test('lerp 线性插值', () => {
  assert.equal(lerp(0, 100, 0.5), 50);
  assert.equal(lerp(0, 100, 0), 0);
  assert.equal(lerp(0, 100, 1), 100);
});

test('digitUppercase 金额转大写', () => {
  assert.equal(digitUppercase(123456789.123), '壹亿贰仟叁佰肆拾伍万陆仟柒佰捌拾玖元壹角贰分');
});

test('intToChinese 数字转中文', () => {
  assert.equal(intToChinese(123456789), '一亿二千三百四十五万六千七百八十九');
});

test('sumAverage 平均值', () => {
  assert.equal(sumAverage([1, 2, 3, 4, 5]), 3);
  assert.equal(sumAverage([]), 0);
});

test('getDistance 两点距离', () => {
  assert.equal(getDistance({ x: 1, y: 2 }, { x: 3, y: 4 }), 2.8284271247461903);
  assert.equal(getDistance({ x: 0, y: 0 }, { x: 0, y: 0 }), 0);
});
