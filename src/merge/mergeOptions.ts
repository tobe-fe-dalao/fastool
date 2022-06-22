/**
 * 判断是否为空对象
 * @param obj 参数
 * @returns {boolean}
 */

const isObj = (obj: any): boolean => {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj)
}
/**
 * 深拷贝合并对象
 * @param _props 外部的参数对象
 * @param _defaults 默认参数对象
 * @returns {Object}
 */
export const mergeObject = (_props: any, _defaults: Object): Object => {
  // 如果没有传参，返回默认值
  if (!isObj(_props)) {
    return mergeObject({}, _defaults);
  }
  // 如果没有默认，返回传参
  if (!isObj(_defaults)) {
    return mergeObject({}, _props);
  }
  // 定义一个以默认值为基础的新对象
  let newObj = Object.assign({}, _defaults)
  // 遍历传参对象
  Object.keys(_props).forEach(function (key) {
    let val = _props[key]
    if (key === '__proto__' || key === 'constructor') {
      return
    }
    if (val === null) {
      return
    }
    // 如果传参对象中的值为对象，则递归调用
    if (isObj(val) && isObj(newObj[key])) {
      newObj[key] = mergeObject(val, newObj[key])
    } else {
      newObj[key] = val
    }
  })
  return newObj
}
