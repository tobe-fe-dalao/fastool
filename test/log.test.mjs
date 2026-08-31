/**
 * log 日志工具测试（mock console.log）
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { log } from '../dist/index.mjs';

test('log 各方法均调用 console.log 并带上颜色样式', () => {
  const calls = [];
  const original = console.log;
  console.log = (...args) => calls.push(args);

  log.info('hello');
  log.error('oops');
  log.warn('careful');
  log.debug('trace');
  log.success('done');

  console.log = original;

  assert.equal(calls.length, 5);
  // 每个调用第一个参数都是 %c%s 样式占位
  for (const c of calls) {
    assert.equal(c[0], '%c%s');
    assert.match(c[1], /^color: /);
  }
  // info / error / warn / debug / success 使用不同颜色
  assert.match(calls[0][1], /#9E9E9E/);
  assert.match(calls[1][1], /#d81e06/);
  assert.match(calls[2][1], /#ffc107/);
  assert.match(calls[3][1], /#2196f3/);
  assert.match(calls[4][1], /#4caf50/);
  // 实际消息作为最后一个参数传入
  assert.equal(calls[0][2], 'hello');
});

test('log.color 返回可调用函数并应用自定义颜色', () => {
  const calls = [];
  const original = console.log;
  console.log = (...args) => calls.push(args);

  const red = log.color('#ff0000');
  red('alert');

  console.log = original;

  assert.equal(typeof red, 'function');
  assert.equal(calls.length, 1);
  assert.match(calls[0][1], /color: #ff0000/);
  assert.equal(calls[0][2], 'alert');
});
