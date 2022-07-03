/**
 * @func 事件绑定
 * @param { any } el 被绑定事件的元素
 * @param { string } eventName 绑定事件的名称
 * @param { Function } callback 回调函数
 * @example addEvent(document.createElement("div"), "click", ()=> { console.log("我被点击了") })
 */
export const addEvent = (el: any, eventName: string, callback: Function) => {
  if (el.addEventListener) {
    el.addEventListener(eventName, callback, false)
  } else if (el.attachEvent) { // 兼容ie事件绑定
      el.attachEvent('on' + eventName, callback)
  } else { // 其它浏览器事件绑定
      el['on' + eventName] = callback
  }
}