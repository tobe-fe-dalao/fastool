import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  capitalize,
  camelCase,
  kebabCase,
  snakeCase,
  pascalCase,
  mask,
  truncate,
  reverse,
  trim,
  byteLength,
  template,
  escapeRegExp,
  count,
  randomString,
  nanoid,
  telEncrypt,
  getEscapeString,
  getUnEscapeString,
  firstUpperCase,
} from '../dist/index.mjs';

test('命名风格互转', () => {
  assert.equal(camelCase('get user info'), 'getUserInfo');
  assert.equal(camelCase('get-user-info'), 'getUserInfo');
  assert.equal(camelCase('get_user_info'), 'getUserInfo');
  assert.equal(camelCase('GetUserInfo'), 'getUserInfo');

  assert.equal(kebabCase('getUserInfo'), 'get-user-info');
  assert.equal(kebabCase('get_user_info'), 'get-user-info');
  assert.equal(kebabCase('get user info'), 'get-user-info');

  assert.equal(snakeCase('getUserInfo'), 'get_user_info');
  assert.equal(snakeCase('get-user-info'), 'get_user_info');

  assert.equal(pascalCase('get-user-info'), 'GetUserInfo');
  assert.equal(pascalCase('getUserInfo'), 'GetUserInfo');
});

test('capitalize / firstUpperCase 首字母大写', () => {
  assert.equal(capitalize('hello'), 'Hello');
  assert.equal(capitalize(''), '');
  assert.equal(firstUpperCase('hello'), 'Hello');
});

test('mask 脱敏', () => {
  assert.equal(mask('13812345678', 3, 4), '138****5678');
  assert.equal(mask('abcdef', 1, 1, '#'), 'a####f');
});

test('truncate 截断', () => {
  assert.equal(truncate('hello world', 8), 'hello...');
  assert.equal(truncate('hello', 10), 'hello');
});

test('reverse 反转且代理对安全', () => {
  assert.equal(reverse('hello'), 'olleh');
  assert.equal(reverse('a😀b'), 'b😀a');
});

test('trim 去空白与指定字符', () => {
  assert.equal(trim('  hello  '), 'hello');
  assert.equal(trim('--hello--', '\\-'), 'hello');
});

test('byteLength 计算 UTF-8 字节数', () => {
  assert.equal(byteLength('abc'), 3);
  assert.equal(byteLength('你好'), 6);
  assert.equal(byteLength('😀'), 4);
});

test('template 模板替换', () => {
  assert.equal(template('{{name}}今年{{age}}岁', { name: '小明', age: 18 }), '小明今年18岁');
  // 缺失的 key 保持原样
  assert.equal(template('{{name}}', {}), '{{name}}');
});

test('escapeRegExp 转义正则字符', () => {
  assert.equal(escapeRegExp('a.b*c'), 'a\\.b\\*c');
  assert.equal(new RegExp(escapeRegExp('a+b')).test('a+b'), true);
});

test('count 统计子串出现次数', () => {
  assert.equal(count('a-b-c', '-'), 2);
  assert.equal(count('aaa', 'aa'), 1);
  assert.equal(count('abc', ''), 0);
});

test('randomString / nanoid 生成随机串', () => {
  assert.equal(randomString(10).length, 10);
  assert.notEqual(randomString(10), randomString(10));
  assert.equal(nanoid(12).length, 12);
});

test('telEncrypt 手机号脱敏', () => {
  assert.equal(telEncrypt('13812345678'), '138****5678');
  assert.equal(telEncrypt(13812345678), '138****5678');
});

test('HTML 转义与反转义', () => {
  assert.equal(getEscapeString('<p class="a">'), '&lt;p class=&quot;a&quot;&gt;');
  assert.equal(getUnEscapeString('&lt;p&gt;'), '<p>');
});
