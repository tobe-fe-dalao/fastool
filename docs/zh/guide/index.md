# 介绍

fastool 是一个**零运行时依赖**的 JavaScript / TypeScript 工具库，全部函数基于原生 JS 实现。

## 特性

- **零依赖** —— 主入口不含任何第三方库，也不会在构建期引入远程 URL
- **多格式** —— 同时产出 ESM / CJS / UMD，通过 `exports` 条件导出自动匹配
- **Tree-shaking** —— 已声明 `"sideEffects": false`，按需引入不会带入冗余代码
- **SSR 安全** —— 所有涉及 `window` / `document` / `navigator` 的函数都做了环境判断
- **类型完整** —— 类型声明随包发布，无需 `@types/*`
- **文档同步** —— `docs/guide/` 下的分类文档由 `pnpm docs:gen` 从源码 JSDoc 生成

## 模块一览

| 模块 | 函数数 | 说明 |
| --- | --- | --- |
| [Array 数组](./Array.md) | 29 | 分块、去重、分组、排序、采样 |
| [Is 类型判断](./Is.md) | 23 | 全量类型守卫，可在 `if` 中收窄类型 |
| [Objects 对象](./Objects.md) | 13 | 路径取值、深比较、深拷贝 |
| [String 字符串](./String.md) | 22 | 命名风格转换、脱敏、转义、随机串 |
| [Number 数字](./Number.md) | 13 | 精度安全取整、格式化 |
| [Time 时间](./Time.md) | 21 | 格式化、相对时间、日期计算 |
| [URL 地址](./URL.md) | 10 | 查询参数解析、拼接、增删改 |
| [Fn 函数](./Fn.md) | 24 | 节流防抖、组合柯里化、异步控制 |
| [Random 随机](./Random.md) | 7 | 随机数、随机串、UUID |
| [Storage 存储](./Storage.md) | 14 | localStorage / sessionStorage / cookie |
| [Browser 浏览器](./Browser.md) | 12 | 环境探测、视口、滚动、全屏 |
| [DOM 元素](./DOM.md) | 24 | 事件、样式、剪贴板、下载 |
| [Device 设备](./Device.md) | 10 | 设备类型与操作系统识别 |
| [Canvas 画布](./Canvas.md) | 4 | 图片转 Base64、颜色转换 |
| [Event 事件](./Event.md) | 1 | 零依赖 mitt 实现 |
| [Regex 正则](./Regex.md) | 9 | 常用校验规则 |
| [Tools 杂项](./Tools.md) | 1 | 打印 |
| [Log 日志](./Log.md) | 1 | 带样式的控制台输出 |
| [Polyfill 补丁](./Polyfill.md) | 24 | 老旧浏览器 API 补丁（独立入口） |
| [Plugins 插件](./Plugins.md) | 5 | CDN 动态加载（独立入口，含外部依赖） |

合计 **267 个函数与类型**（运行时导出 265 个：主入口 236 + plugins 5 + polyfill 24）。

## 与 lodash 的差异

lodash 功能更全、生态更大。fastool 的定位不同：

- **体积** —— 按需引入时单函数通常在几百字节量级
- **依赖** —— 零运行时依赖，不会有间接依赖带来的安全审计负担
- **环境** —— 面向现代浏览器与 Node 18+，不背 IE8 的历史包袱
- **SSR** —— 浏览器相关 API 全部做了环境判断，服务端调用返回安全值而非抛错

如果你需要 `_.chain`、惰性求值这类高级能力，lodash 仍是更好的选择。

## 下一步

- [快速开始](./start.md) —— 安装与引入
- [Array 数组](./Array.md) —— 从最常用的工具开始看
