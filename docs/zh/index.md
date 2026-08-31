---
layout: home

title: FasTool
titleTemplate: 一个零依赖的现代 JavaScript 工具库

hero:
  name: FasTool
  text: 一个零依赖的现代 JavaScript 工具库
  tagline: 265 个导出 · ESM / CJS / UMD · SSR 安全 · 零运行时依赖
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/guide/start
    - theme: alt
      text: 查看文档
      link: /zh/guide/
    - theme: alt
      text: GitHub
      link: https://github.com/tobe-fe-dalao/fastool

features:
  - title: 零运行时依赖
    details: 主入口不含任何第三方库，也不会在构建期引入远程 URL。所有函数基于原生 JS 实现。
  - title: 多格式产物
    details: 同时产出 ESM / CJS / UMD，通过 exports 条件导出自动匹配，声明了 sideEffects 支持 tree-shaking。
  - title: SSR 安全
    details: 涉及 window / document / navigator 的函数全部做了环境判断，服务端调用返回安全值而非抛错。
  - title: 完整类型
    details: 基于 TypeScript 严格模式编写，类型声明随包发布，无需额外安装 @types。
  - title: 文档与实现同步
    details: 分类文档由 pnpm docs:gen 从源码 JSDoc 直接生成，改了注释重新生成即可。
  - title: 按需可选
    details: CDN 插件与旧浏览器补丁拆到独立子入口，不用就不会进入你的产物。
---
