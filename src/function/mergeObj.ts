/**
 * Check whether the value is an empty object
 * @param obj parameter
 * @returns {boolean}
 */

const isObj = (obj: any): boolean => {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
};
/**
 * @func mergeObject
 * @param {object} obj1 outer parameter object
 * @param {object} obj2 default parameter object
 * @desc Deep-merge objects
 * @returns {Object}
 * @example mergeObject(obj1, obj2)
 */
export const mergeObject = <T extends Record<string, any> = Record<string, any>>(
  obj1: any,
  obj2: Record<string, any>
): T => {
  // If no argument is passed, return the default value
  if (!isObj(obj1)) {
    return mergeObject<T>({}, obj2);
  }
  // If no default, return the passed argument
  if (!isObj(obj2)) {
    return mergeObject<T>({}, obj1);
  }
  // Define a new object based on the defaults
  const newObj: Record<string, any> = Object.assign({}, obj2);
  // Iterate over the passed-in object
  Object.keys(obj1).forEach(function (key) {
    let val = obj1[key];
    if (key === '__proto__' || key === 'constructor') {
      return;
    }
    if (val === null) {
      return;
    }
    // If a value in the passed object is itself an object, recurse
    if (isObj(val) && isObj(newObj[key])) {
      newObj[key] = mergeObject(val, newObj[key]);
    } else {
      newObj[key] = val;
    }
  });
  return newObj as T;
};
