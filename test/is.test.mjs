import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  isArray,
  isString,
  isNumber,
  isBoolean,
  isFunction,
  isSymbol,
  isDate,
  isRegExp,
  isError,
  isMap,
  isSet,
  isPromise,
  isObject,
  isPlainObject,
  isNil,
  isDef,
  isEmpty,
  isEmptyObject,
  isInteger,
  isNumeric,
  isJSON,
  isElement,
  isPrimitive,
} from '../dist/index.mjs';

test('基础类型判断', () => {
  assert.ok(isArray([]));
  assert.ok(!isArray({}));
  assert.ok(isString('a'));
  assert.ok(isNumber(1));
  // NaN 的 typeof 仍然是 number，与 lodash 行为保持一致
  assert.ok(isNumber(NaN));
  assert.ok(isInteger(1));
  assert.ok(isBoolean(false));
  assert.ok(isFunction(() => {}));
  assert.ok(isSymbol(Symbol('x')));
  assert.ok(isRegExp(/a/));
  assert.ok(isError(new Error('x')));
  assert.ok(isMap(new Map()));
  assert.ok(isSet(new Set()));
  assert.ok(isPromise(Promise.resolve()));
  assert.ok(isPromise({ then() {} }));
});

test('isDate 排除 Invalid Date', () => {
  assert.ok(isDate(new Date()));
  assert.ok(!isDate(new Date('明显不是日期')));
  assert.ok(!isDate('2024-01-01'));
});

test('isObject / isPlainObject 区分对象来源', () => {
  assert.ok(isObject({}));
  // isObject 特指非 null 的「非数组」对象，数组请用 isArray
  assert.ok(!isObject([]));
  assert.ok(!isObject(null));

  assert.ok(isPlainObject({ a: 1 }));
  assert.ok(isPlainObject(Object.create(null)));
  assert.ok(!isPlainObject([]));
  assert.ok(!isPlainObject(new Date()));
  assert.ok(!isPlainObject(null));
});

test('isNil / isDef / isEmpty 空值判断', () => {
  assert.ok(isNil(null));
  assert.ok(isNil(undefined));
  assert.ok(!isNil(0));
  assert.ok(!isNil(''));

  assert.ok(isDef(0));
  assert.ok(!isDef(undefined));

  assert.ok(isEmpty(null));
  assert.ok(isEmpty(undefined));
  assert.ok(isEmpty(''));
  assert.ok(isEmpty([]));
  assert.ok(isEmpty({}));
  assert.ok(isEmpty(new Map()));
  assert.ok(!isEmpty({ a: 1 }));
  assert.ok(!isEmpty(0));
});

test('isEmptyObject 只认空对象', () => {
  assert.ok(isEmptyObject({}));
  assert.ok(!isEmptyObject({ a: 1 }));
  assert.ok(!isEmptyObject([]));
});

test('isInteger / isNumeric 数字判断', () => {
  assert.ok(isInteger(1));
  assert.ok(!isInteger(1.5));
  assert.ok(isNumeric('12'));
  assert.ok(isNumeric(12));
  assert.ok(!isNumeric('12a'));
  assert.ok(!isNumeric(''));
});

test('isJSON 判断合法 JSON 字符串', () => {
  assert.ok(isJSON('{"a":1}'));
  assert.ok(isJSON('[1,2,3]'));
  assert.ok(!isJSON('{a:1}'));
  assert.ok(!isJSON('普通文本'));
});

test('isElement 判断 DOM 元素', () => {
  // Node 环境没有 DOM，恒为 false 且不能抛错
  assert.equal(isElement({}), false);
  assert.equal(isElement(null), false);
});

test('isPrimitive 判断原始类型', () => {
  assert.ok(isPrimitive(1));
  assert.ok(isPrimitive('a'));
  assert.ok(isPrimitive(true));
  assert.ok(isPrimitive(null));
  assert.ok(isPrimitive(undefined));
  assert.ok(isPrimitive(Symbol()));
  assert.ok(!isPrimitive({}));
  assert.ok(!isPrimitive([]));
});
