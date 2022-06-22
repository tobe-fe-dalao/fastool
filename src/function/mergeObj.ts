/**
 * 判断是否为空对象
 * @param obj 参数
 * @returns {boolean}
 */

const isObj = (obj: any): boolean => {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj)
}
/**
 * @func mergeObject
 * @param {object} obj1 外部的参数对象
 * @param {object} obj2 默认参数对象
 * @desc 深拷贝合并对象
 * @returns {Object}
 * @example mergeObject(obj1, obj2)
 */
export const mergeObject = (obj1: any, obj2: Object): Object => {
  // 如果没有传参，返回默认值
  if (!isObj(obj1)) {
    return mergeObject({}, obj2);
  }
  // 如果没有默认，返回传参
  if (!isObj(obj2)) {
    return mergeObject({}, obj1);
  }
  // 定义一个以默认值为基础的新对象
  let newObj = Object.assign({}, obj2)
  // 遍历传参对象
  Object.keys(obj1).forEach(function (key) {
    let val = obj1[key]
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
