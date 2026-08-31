/**
 * mitt 事件发布订阅测试（纯逻辑，Node 可运行）
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mitt } from '../dist/index.mjs';

test('on / emit 基础订阅与触发', () => {
  const emitter = mitt();
  let received;
  emitter.on('foo', (e) => (received = e));
  emitter.emit('foo', 42);
  assert.equal(received, 42);
});

test('off 取消订阅后不再触发', () => {
  const emitter = mitt();
  let count = 0;
  const handler = () => count++;
  emitter.on('tick', handler);
  emitter.emit('tick');
  assert.equal(count, 1);
  emitter.off('tick', handler);
  emitter.emit('tick');
  assert.equal(count, 1);
});

test('off 不带 handler 时移除该类型全部监听', () => {
  const emitter = mitt();
  let a = 0;
  let b = 0;
  emitter.on('e', () => a++);
  emitter.on('e', () => b++);
  emitter.off('e');
  emitter.emit('e');
  assert.equal(a, 0);
  assert.equal(b, 0);
});

test('通配符 * 监听所有事件', () => {
  const emitter = mitt();
  const events = [];
  emitter.on('*', (type, e) => events.push([type, e]));
  emitter.emit('x', 1);
  emitter.emit('y', 2);
  assert.deepEqual(events, [
    ['x', 1],
    ['y', 2],
  ]);
});

test('emit 不存在的事件类型不抛错', () => {
  const emitter = mitt();
  assert.doesNotThrow(() => emitter.emit('never-registered', {}));
});

test('同一事件可注册多个 handler', () => {
  const emitter = mitt();
  let sum = 0;
  emitter.on('add', (n) => (sum += n));
  emitter.on('add', (n) => (sum += n));
  emitter.emit('add', 5);
  assert.equal(sum, 10);
});
