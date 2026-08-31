/**
 * fastool 构建配置（Rollup 4）
 *
 * 每个入口产出：
 *  - dist/<name>.mjs         ESM，供 Node ESM / 现代打包器使用（package.json 的 module 与 exports.import）
 *  - dist/<name>.cjs         CJS，供 require() 使用（package.json 的 main 与 exports.require）
 *  - dist/<name>.umd.js      UMD，未压缩，供 <script> 直接引入调试
 *  - dist/<name>.umd.min.js  UMD，压缩版，供 unpkg / jsdelivr 使用（仅主入口与 polyfill）
 *  - dist/<name>.d.ts        聚合后的类型声明
 *
 * 说明：本包未声明 "type": "module"，因此 ESM 产物必须使用 .mjs 扩展名，
 * 否则 Node 会按 CJS 解析 .js 文件导致 export 语法报错。
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';

const ROOT = process.cwd();
const DIST = path.resolve(ROOT, 'dist');
const TS_CONFIG = path.resolve(ROOT, 'tsconfig.json');
const pkg = JSON.parse(fs.readFileSync(path.resolve(ROOT, 'package.json'), 'utf8'));

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 * (c) ${pkg.author}
 * Released under the ${pkg.license} License.
 */`;

/**
 * 入口清单
 * - out：产物基名（必须显式指定，否则 src/polyfill/index.ts 会被算成 index 而覆盖主入口）
 * - umd：是否产出 UMD（内部有远程动态 import 的入口不支持 UMD）
 * - cdn：入口内是否包含对远程 CDN 的动态 import（需要标记为 external）
 */
const entries = [
  { input: 'src/index.ts', out: 'index', name: pkg.jsname, umd: true },
  { input: 'src/plugins.ts', out: 'plugins', name: 'fastoolPlugins', umd: false, cdn: true },
  { input: 'src/polyfill/index.ts', out: 'polyfill', name: 'fastoolPolyfill', umd: true },
];

/** 远程地址一律视为外部依赖，避免打包器尝试解析 */
const cdnExternal = (id) => /^(https?:)?\/\//.test(id) || /^https?:/.test(id);

const basePlugins = () => [
  nodeResolve({ browser: true, extensions: ['.ts', '.js', '.mjs', '.json'] }),
  commonjs(),
  json(),
  typescript({
    tsconfig: TS_CONFIG,
    // 类型声明统一由 rollup-plugin-dts 产出，JS 构建不生成
    declaration: false,
    declarationMap: false,
    sourceMap: true,
    outDir: DIST,
    noEmitOnError: false,
  }),
];

/** JS 产物配置 */
const jsConfigs = entries.map(({ input, out, name, umd, cdn }) => {
  const outputs = [
    {
      file: path.resolve(DIST, `${out}.mjs`),
      format: 'esm',
      sourcemap: true,
      banner,
    },
    {
      file: path.resolve(DIST, `${out}.cjs`),
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      banner,
    },
  ];

  if (umd) {
    outputs.push(
      {
        file: path.resolve(DIST, `${out}.umd.js`),
        format: 'umd',
        name,
        exports: 'named',
        sourcemap: true,
        banner,
      },
      {
        file: path.resolve(DIST, `${out}.umd.min.js`),
        format: 'umd',
        name,
        exports: 'named',
        sourcemap: true,
        banner,
        // 只对 min 版本压缩，保留 banner 注释
        plugins: [terser({ format: { comments: /^!/ } })],
      }
    );
  }

  return {
    input: path.resolve(ROOT, input),
    output: outputs,
    external: cdn ? cdnExternal : [],
    plugins: basePlugins(),
    onwarn(warning, warn) {
      // 远程 CDN 地址无法被解析属于预期行为
      if (cdn && warning.code === 'UNRESOLVED_IMPORT') return;
      // CJS 产物中的远程动态 import 会退化成 require，plugins 入口本身就是浏览器专用
      if (cdn && warning.code === 'INVALID_ANNOTATION') return;
      warn(warning);
    },
  };
});

/** 类型声明配置 */
const dtsConfigs = entries.map(({ input, out }) => ({
  input: path.resolve(ROOT, input),
  output: {
    file: path.resolve(DIST, `${out}.d.ts`),
    format: 'es',
    banner,
  },
  plugins: [dts({ tsconfig: TS_CONFIG })],
}));

export default [...jsConfigs, ...dtsConfigs];
