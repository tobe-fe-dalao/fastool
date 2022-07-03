/**
 * @func watchValue
 * @param { object } obj 传入监听对象
 * @param { string } key 传入监听键名
 * @param { function } callback 回调处理函数
 * @example watchValue({ a:1, b:2 }, "a", (val) => {console.log(val);});
 */
export const watchValue = (obj: object, key: string, callback: (newVal: any) => void): void => {
  let value = obj[key]
  Object.defineProperty(obj, key, {
    enumerable: false,
    set(newVal) {
      value = newVal
      callback(value)
    },
    get() {
      return value
    },
  })
}