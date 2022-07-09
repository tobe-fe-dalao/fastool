# Event

## getDeviceId
事件订阅发布及调度中心
```typescript
/**
 * @func mitt
 * @desc 事件订阅发布及调度中心
 * @return { Object } 事件订阅发布及调度中心
 * @github 三方库地址：https://github.com/developit/mitt
 * @example
 *    const emitter = mitt(); 
 *    emitter.on('foo', e => console.log('foo', e) )// 事件监听
 *    function onFoo() {}
 *    emitter.on('foo', onFoo)   // listen
 *    emitter.off('foo', onFoo)  // unlisten
 */
```