/**
 * 使一个对象转化成可观测对象
 * @param { Object } obj 对象
 * @param { String } key 对象的key
 * @param { Any } val 对象的某个key的值
*/
const defineReactive = (obj: Object, key: string, val: any): void => {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log(`${key}属性被读取了`);
      return val
    },
    set(newVal) {
      console.log(`${key}属性被修改了`);
      val = newVal
    }
  })
}
/**
 * 设计一个对象的观测者
 * @param { Object } obj 对象
 * @return { Object } 返回一个可观测对象
 * @example  let obj = observerDef({name:'alex',age:18})
*/
export const observeDef = (obj: Object): Object | undefined => {
  if (!obj || typeof obj !== 'object') {
    return
  }
  let keys = Object.keys(obj)
  keys.forEach(key => {
    defineReactive(obj, key, obj[key])
  })
  return obj
}

/**
 * 设计一个对象的观测者-proxy方案
 * @param { Object } obj 对象
 * @return { cal } 观测对象回调方法
 * @example  let obj = observeProxy({name:'alex',age:18},callback)
*/
export const observeProxy = (obj: Object, cal: (val: any) => void) => {
  return new Proxy(obj, {
    get: function (target, prop) {
      console.log('get调用了')
      return Reflect.get(target, prop)
    },
    set: function (target, prop, val) {
      cal(val)
      console.log('set调用了')
      return Reflect.set(target, prop, val)
    },
    deleteProperty: function (target, prop) {
      console.log('deleteProperty调用了')
      return Reflect.deleteProperty(target, prop)
    }
  })
}
