import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  getUrlParams,
  getQueryParam,
  setUrlParams,
  delUrlParams,
  paramsJoinUrl,
  stringifyQuery,
  getBaseUrl,
  getUrlDomain,
  isAbsoluteUrl,
  joinUrl,
} from '../dist/index.mjs';

const url = 'https://a.com/list?x=1&x=2&y=hi#top';

test('getUrlParams 解析查询参数', () => {
  // 纯数字参数会被解析为 number，重复参数收集为数组
  assert.deepEqual(getUrlParams(url), { x: [1, 2], y: 'hi' });
  // 没有 ? 时不抛错
  assert.deepEqual(getUrlParams('https://a.com'), {});
  // 无 location 环境（Node）下也不抛错
  assert.deepEqual(getUrlParams(), {});
});

test('getQueryParam 获取单个参数', () => {
  assert.equal(getQueryParam('y', url), 'hi');
  // getQueryParam 不做类型转换，与 getUrlParams 不同
  assert.equal(getQueryParam('x', url), '1');
  assert.equal(getQueryParam('nope', url), null);
  assert.equal(getQueryParam('id', 'https://a.com?id=3'), '3');
});

test('setUrlParams 设置参数', () => {
  assert.equal(setUrlParams('id', 3, 'https://a.com?x=1'), 'https://a.com?x=1&id=3');
  // 已存在则覆盖
  assert.equal(setUrlParams('x', 9, 'https://a.com?x=1&y=2'), 'https://a.com?x=9&y=2');
  // 无 querystring 时自动追加
  assert.equal(setUrlParams('id', 3, 'https://a.com'), 'https://a.com?id=3');
});

test('delUrlParams 删除参数', () => {
  assert.equal(delUrlParams('x', 'https://a.com?x=1&y=2'), 'https://a.com?y=2');
  assert.equal(delUrlParams('x', 'https://a.com?x=1'), 'https://a.com');
});

test('paramsJoinUrl / stringifyQuery 拼接查询串', () => {
  assert.equal(paramsJoinUrl({ a: 1, b: 'x y' }), 'a=1&b=x%20y');
  assert.equal(stringifyQuery({ a: 1, b: 2 }), 'a=1&b=2');
  assert.equal(stringifyQuery({}), '');
});

test('getBaseUrl / getUrlDomain', () => {
  assert.equal(getBaseUrl('https://a.com/x?y=1'), 'https://a.com/x');
  assert.equal(getUrlDomain('https://a.com:8080/x?y=1'), 'https://a.com:8080');
});

test('isAbsoluteUrl 绝对地址判断', () => {
  assert.ok(isAbsoluteUrl('https://a.com'));
  assert.ok(isAbsoluteUrl('http://a.com'));
  assert.ok(isAbsoluteUrl('//a.com'));
  assert.ok(!isAbsoluteUrl('/api/list'));
});

test('joinUrl 拼接路径', () => {
  assert.equal(joinUrl('https://a.com/', '/api/', '/list'), 'https://a.com/api/list');
  assert.equal(joinUrl('https://a.com', 'api', 'list'), 'https://a.com/api/list');
});
