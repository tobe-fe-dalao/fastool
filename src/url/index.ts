/**
 * @func getUrlParams
 * @param {string} url
 * @returns {object}
 * @desc 📝 获取 url 中所有的参数，以对象的形式返回，如果参数名重复，则以数组的形式返回
 */
export const getUrlParams = (url: string = location.href.toString()): object => {
  const params: { [key: string]: any } = {};
  const paramsStr = /.+\?(.+)$/.exec(url)![1]; // 将 ? 后面的字符串取出来
  const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中
  // 将 params 存到对象中
  paramsArr.forEach(param => {
    if (/=/.test(param)) { // 处理有 value 的参数
      let [key, val] = param.split('='); // 分割 key 和 value
      val = decodeURIComponent(val); // 解码
      (val as any) = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字
      if (params.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
        params[key] = [].concat(params[key], val as any);
      } else { // 如果对象没有这个 key，创建 key 并设置值
        params[key] = val;
      }
    } else { // 处理没有 value 的参数
      params[param] = true;
    }
  })
  return params;
}
/**
 * @func setUrlParams
 * @param {string} url 原始URL
 * @param {string} urlKey 参数名 
 * @param {string} urlValue 参数值
 * @returns {string} url 修改后的URL
 * @desc 📝 修改URL参数
 */
export const setUrlParams = (urlKey: any, urlValue: any, url?: string): string => {
  // 兼容eval污染全局问题  https://rollupjs.org/guide/en/#avoiding-eval
  let eval2 = eval;
  url ?? (url = location.href.toString());
  const re = eval2('/(' + urlKey + '=)([^&]*)/gi');
  url = url.replace(re, urlKey + '=' + urlValue);
  return url;
}
//解决eval污染全局方案二
export function eval2(fn: Function) {
  var Fn = Function;
  return new Fn('return ' + fn)();
}
/**
 * @func delUrlParams
 * @param {string} 参数
 * @returns {string} url 修改后的URL
 * @desc 📝 删除 url 中的参数
 */
export const delUrlParams = (name: string) => {
  const baseUrl = location.origin + location.pathname + "?";
  const query = location.search.substr(1);
  if (query.indexOf(name) > -1) {
    let obj = {};
    let arr: any = query.split("&");
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split("=");
      obj[arr[i][0]] = arr[i][1];
    }
    delete obj[name];
    return baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
  }
}
/**
 * @func paramsJoinUrl
 * @param {object} 参数对象
 * @returns {string} url 修改后的URL
 * @desc 📝 将参数对象转为 url 字符串
 */
export const paramsJoinUrl = (params: object): string => {
  let param = []
  for (let key in params) {
    param.push(`${key}=${params[key]}`);
  }
  return encodeURIComponent(param.join('&'))
}
/**
 * @func getBaseUrl 
 * @param {string} url 原始URL
 * @returns {string} url 修改后的URL
 * @desc 📝 获取 url 中?之前的部分
 */
export const getBaseUrl = (url: string = location.href.toString()): string => {
  return url.includes('?') ? url.split('?')[0] : url;
}
/**
 * @func getUrlDomain 
 * @param {string} url 原始URL
 * @returns {string} url 修改后的URL
 * @desc 📝 获取 url 中的域名
 */
export const getUrlDomain = (url: string = location.href.toString()): string => {
  const baseUrl = /^(http|https):\/\/[^\/]+/.exec(url)![0];
  return baseUrl
}


