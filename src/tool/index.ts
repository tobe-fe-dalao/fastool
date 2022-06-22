/**
 * 节流函数
 * @param fn 将要处理的函数
 * @param wait 时间, 单位为毫秒
 * @returns 包装好的节流函数
 */
export const throttle = (fn: Function, wait = 300) => {
  let timeId = null as any
  return function (this: any, ...args: any[]) {
    if (timeId) return
    timeId = setTimeout(() => {
      fn.apply(this, args)
      clearTimeout(timeId)
      timeId = null
    }, wait)
  }
}
