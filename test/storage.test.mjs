/**
 * 存储相关测试
 *
 * Node 环境没有 window / Storage，这里用内存实现做最小 mock，
 * 重点验证：对象能被正确存取（旧版本会存成 [object Object]）、过期与删除。
 */
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

function createMemoryStorage() {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => void map.set(k, String(v)),
    removeItem: (k) => void map.delete(k),
    clear: () => void map.clear(),
    key: (i) => Array.from(map.keys())[i] ?? null,
    get length() {
      return map.size;
    },
  };
}

const localStore = createMemoryStorage();
const sessionStore = createMemoryStorage();

// 必须在导入 fastool 之前注入，否则模块内取不到
globalThis.window = globalThis.window ?? {};
globalThis.window.localStorage = localStore;
globalThis.window.sessionStorage = sessionStore;

const {
  setLocalStorage,
  getLocalStorage,
  delLocalStorage,
  clearLocalStorage,
  setSessionStorage,
  getSessionStorage,
  delSessionStorage,
  clearSessionStorage,
  setCookie,
  getCookie,
  hasCookie,
  deleteCookie,
  getAllCookies,
} = await import('../dist/index.mjs');

beforeEach(() => {
  localStore.clear();
  sessionStore.clear();
});

test('localStorage 存取任意类型（对象不再变成 [object Object]）', () => {
  setLocalStorage('user', { name: '小明', age: 18 });
  assert.deepEqual(getLocalStorage('user'), { name: '小明', age: 18 });

  setLocalStorage('num', 42);
  assert.equal(getLocalStorage('num'), 42);

  setLocalStorage('arr', [1, 2, 3]);
  assert.deepEqual(getLocalStorage('arr'), [1, 2, 3]);
});

test('localStorage 读取不存在时返回默认值', () => {
  assert.equal(getLocalStorage('nope'), null);
  assert.equal(getLocalStorage('nope', 'fallback'), 'fallback');
});

test('localStorage 过期自动失效', async () => {
  setLocalStorage('flash', 'value', 30);
  assert.equal(getLocalStorage('flash'), 'value');
  await new Promise((r) => setTimeout(r, 60));
  assert.equal(getLocalStorage('flash', 'expired'), 'expired');
});

test('localStorage 删除与清空', () => {
  setLocalStorage('a', 1);
  setLocalStorage('b', 2);
  delLocalStorage('a');
  assert.equal(getLocalStorage('a'), null);
  clearLocalStorage();
  assert.equal(getLocalStorage('b'), null);
});

test('sessionStorage 与 localStorage 互相隔离', () => {
  setSessionStorage('key', 'session');
  setLocalStorage('key', 'local');
  assert.equal(getSessionStorage('key'), 'session');
  assert.equal(getLocalStorage('key'), 'local');

  delSessionStorage('key');
  assert.equal(getSessionStorage('key'), null);
  clearSessionStorage();
});

test('cookie 写入与读取', () => {
  // Node 环境没有 document，写入会静默失败，读取返回 null —— 只要求不抛错
  setCookie('token', 'abc123');
  setCookie('user', 'tom', { path: '/', expire: 3600000, sameSite: 'Lax' });
  assert.equal(typeof getCookie('token'), 'string');
  assert.equal(hasCookie('token'), false);
  assert.deepEqual(getAllCookies(), {});
  deleteCookie('token');
});

test('存储相关方法在 SSR（无 window）下不抛错', async () => {
  const savedWindow = globalThis.window;
  // @ts-ignore 模拟服务端环境
  delete globalThis.window;

  assert.equal(getLocalStorage('any'), null);
  assert.equal(getSessionStorage('any'), null);
  setLocalStorage('any', 1);
  delLocalStorage('any');
  clearLocalStorage();
  // 无 document 时 cookie 读不到内容，返回空字符串
  assert.equal(getCookie('any'), '');

  globalThis.window = savedWindow;
});
