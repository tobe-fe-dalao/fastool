---
layout: home

title: FasTool
titleTemplate: A zero-dependency modern JavaScript utility library

hero:
  name: FasTool
  text: A zero-dependency modern JavaScript utility library
  tagline: 265 exports · ESM / CJS / UMD · SSR-safe · zero runtime dependencies
  actions:
    - theme: brand
      text: Get Started
      link: /guide/start
    - theme: alt
      text: Documentation
      link: /guide/
    - theme: alt
      text: GitHub
      link: https://github.com/tobe-fe-dalao/fastool

features:
  - title: Zero runtime dependencies
    details: The main entry includes no third-party libraries and never pulls remote URLs at build time. Every function is implemented with native JS.
  - title: Multiple output formats
    details: Ships ESM / CJS / UMD simultaneously, auto-selected via exports conditions. sideEffects is declared to enable tree-shaking.
  - title: SSR-safe
    details: Functions touching window / document / navigator are guarded by environment checks; on the server they return safe values instead of throwing.
  - title: Full types
    details: Written in TypeScript strict mode. Type declarations are published with the package — no need to install @types separately.
  - title: Docs stay in sync with code
    details: Category docs are generated directly from source JSDoc via `pnpm docs:gen`. Edit a comment and regenerate.
  - title: Opt-in extras
    details: CDN plugins and legacy-browser polyfills are split into separate sub-entries; you only pay for what you import.
---
