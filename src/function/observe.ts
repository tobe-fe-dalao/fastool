/**
 * Convert an object into an observable object
 * @param { Object } obj object
 * @param { String } key key of the object
 * @param { Any } val value of a certain key of the object
*/
const defineReactive = (obj: Object, key: string, val: any): void => {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
     // console.log(`${key} is being read`);
      return val
    },
    set(newVal) {
      //console.log(`${key} is being modified`);
      val = newVal
    }
  })
}
/**
 * Design an observer for an object
 * @param { Object } obj object
 * @return { Object } returns an observable object
 * @example  let obj = observerDef({name:'alex',age:18})
*/
export const observeDef = (obj: Object): Object | undefined => {
  if (!obj || typeof obj !== 'object') {
    return
  }
  const source = obj as Record<string, any>;
  Object.keys(source).forEach(key => {
    defineReactive(obj, key, source[key])
  })
  return obj
}

/**
 * Design an object observer - proxy approach
 * @param { Object } obj object
 * @return { cal } observer callback method
 * @example  let obj = observeProxy({name:'alex',age:18},callback)
*/
export const observeProxy = (obj: Object, cal: (val: any) => void) => {
  return new Proxy(obj, {
    get: function (target, prop) {
      //console.log('get called')
      return Reflect.get(target, prop)
    },
    set: function (target, prop, val) {
      cal(val)
      //console.log('set called')
      return Reflect.set(target, prop, val)
    },
    deleteProperty: function (target, prop) {
      //console.log('deleteProperty called')
      return Reflect.deleteProperty(target, prop)
    }
  })
}
