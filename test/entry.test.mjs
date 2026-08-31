import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

test('plugins 入口导出四个 CDN 加载器', async () => {
  const mod = await import('../dist/plugins.mjs');
  assert.deepEqual(Object.keys(mod).sort(), [
    'copyJs',
    'dayJs',
    'importPlugin',
    'importPluginByUrl',
    'keyCode',
  ]);
  for (const key of Object.keys(mod)) {
    assert.equal(typeof mod[key], 'function', `${key} 应为函数`);
  }
});

test('plugins 入口的 CJS 与 ESM 导出一致', () => {
  const esmKeys = ['copyJs', 'dayJs', 'importPlugin', 'importPluginByUrl', 'keyCode'];
  const cjs = require('../dist/plugins.cjs');
  for (const key of esmKeys) {
    assert.equal(typeof cjs[key], 'function', `CJS 缺少 ${key}`);
  }
});

test('importPlugin 在服务端返回 rejected 而不是抛 ReferenceError', async () => {
  const { importPlugin } = await import('../dist/plugins.mjs');
  await assert.rejects(
    () => importPlugin('dayjs', 'https://unpkg.com/dayjs@1.11.3/dayjs.min.js'),
    /浏览器环境/
  );
});

test('主入口不加载任何远程资源（零外部依赖保证）', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
  const src = fs.readFileSync(path.join(root, 'index.mjs'), 'utf8');

  // 注释里出现示例 URL 是正常的，真正要防的是「运行时去网络上取东西」
  const offenders = [
    [/import\(\s*["'`]https?:/, '动态 import 远程模块'],
    [/\bfetch\(\s*["'`]https?:/, 'fetch 远程地址'],
    [/\.src\s*=\s*["'`]https?:/, '注入远程 script'],
    [/\bunpkg\.com\b/, '引用 unpkg'],
    [/\bcdnjs\.cloudflare\.com\b/, '引用 cdnjs'],
    [/\bjsdelivr\b/, '引用 jsdelivr'],
    [/\bbootcdn\b/, '引用 bootcdn'],
  ];

  for (const [re, label] of offenders) {
    assert.ok(!re.test(src), `主入口不应${label}`);
  }
});

test('三个入口的类型声明文件互不覆盖', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');

  for (const name of ['index', 'plugins', 'polyfill']) {
    const file = path.join(root, `${name}.d.ts`);
    assert.ok(fs.existsSync(file), `缺少 ${name}.d.ts`);
    const content = fs.readFileSync(file, 'utf8');
    assert.ok(content.length > 200, `${name}.d.ts 内容异常`);
  }

  // polyfill 的声明曾被算成 index 而覆盖主入口，这里守住这个回归
  const polyfill = fs.readFileSync(path.join(root, 'polyfill.d.ts'), 'utf8');
  assert.ok(polyfill.includes('polyfillAll'), 'polyfill.d.ts 应包含 polyfillAll');
});
