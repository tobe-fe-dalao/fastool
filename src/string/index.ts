/**
 * @func randomString
 * @param {number} len
 * @returns {string}
 * @desc  生成随机字符串
 */
export const randomString = (len: number) => {
  let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
  let strLen = chars.length;
  let randomStr = '';
  for (let i = 0; i < len; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * strLen));
  }
  return randomStr;
};
/**
 * @func firstUpperCase
 * @param {string} str
 * @returns {string}
 * @desc  首字母大写
 */
export const firstUpperCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * @func telEncrypt
 * @param {number} tel
 * @returns {string}
 * @desc  手机号中间加密
 */
export const telEncrypt = (tel: number) => {
  return tel.toString().replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

/**
 * @func getKebabCase
 * @param {string} str
 * @returns {string}
 * @desc  转换成短横线命名
 */
export const getKebabCase = (str: string) => {
  return str.replace(/[A-Z]/g, (item) => '-' + item.toLowerCase())
}
/**
 * @func getCamelCase
 * @param {string} str
 * @returns {string}
 * @desc  转换成驼峰命名
 */
export const getCamelCase = (str: string) => {
  return str.replace(/-([a-z])/g, (i, item) => item.toUpperCase())
}




