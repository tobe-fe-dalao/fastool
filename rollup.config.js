import path from 'path';
import ts from 'rollup-plugin-typescript2';
// 将json 文件转换为ES6 模块
import json from '@rollup/plugin-json';
// 在node_模块中查找并绑定第三方依赖项
import resolve from '@rollup/plugin-node-resolve';
// 将CommonJS模块转换为ES6
import commonjs from '@rollup/plugin-commonjs';
// rollup babel插件
import babel from 'rollup-plugin-babel';
// 优化代码
import { terser } from 'rollup-plugin-terser';
// 加载样式文件
import styles from 'rollup-plugin-styles';
import dts from 'rollup-plugin-dts';
// 替换环境变量
// import replace from '@rollup/plugin-replace';
// 热更新服务
import livereload from 'rollup-plugin-livereload';
// 开发服务器
import serve from 'rollup-plugin-serve';
// 删除工具
import del from 'rollup-plugin-delete';
// import eslint from '@rollup/plugin-eslint'
import pkg from './package.json';
// 判断是是否为生产环境
// 开发环境or生产环境
const NODE_ENV = process.env.NODE_ENV;
const isPro = function () {
  return NODE_ENV === 'production';
};
// console.log(process.env, '环境判断');
const extensions = ['.js', '.jsx', '.ts', '.tsx', '.less'];
export default [
  {
    input: path.resolve('./index.ts'),
    output: [
      {
        file: pkg.unpkg,
        format: 'umd',
        name: pkg.jsname,
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(), //快速查找外部模块
      commonjs(), //将CommonJS转换为ES6模块
      json(), //将json转换为ES6模块
      styles(),
      //ts编译插件
      ts({
        tsconfig: path.resolve(__dirname, './tsconfig.json'),
        extensions: extensions,
      }),
      babel({
        runtimeHelpers: true,
        exclude: 'node_modules/**',
      }),
      !isPro() &&
        livereload({
          watch: ['dist', 'examples', 'src/**/*'],
          verbose: false,
        }),
      !isPro() && terser(),
      !isPro() &&
        serve({
          open: false,
          port: 9529,
          contentBase: './',
          openPage: '/examples/index.html',
        }),
    ],
  },
  {
    // 生成 .d.ts 类型声明文件
    input: path.resolve('./index.ts'),
    output: {
      file: pkg.types,
      format: 'es',
    },
    plugins: [
      dts(),
      del({
        targets: ['./dist/src'],
        hook: 'buildEnd',
      }),
    ],
  },
];
