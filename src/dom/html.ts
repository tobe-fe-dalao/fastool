/**
 * @func getFromClipboard
 * @desc 📝 获取剪贴板内容
 * @returns {Promise<string>}
 * @example getFromClipboard().then(res => {...}
 */
export const getFromClipboard = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    navigator.clipboard.readText()
      .then(text => {
        resolve(text);
      })
      .catch(err => {
        reject(err);
      });
  });
};
/**
 * @func removeHTMLTag
 * @param {string} str
 * @return {string}
 * @desc 📝 去掉文本中所有标签，只保留文本
 * @example removeHTMLTag('<p>hello</p>') // 'hello'
 */
export const removeHTMLTag = (str: string): string => str.replace(/<[^>]+>/g, '');


type objectKeyOnlyCss = {
  [k in keyof CSSStyleDeclaration]?: any
}
/**
 * @func setElementStyle
 * @desc 📝 设置元素的样式
 * @param {HTMLElement} el 
 * @param {objectKeyOnlyCss} styleObj 
 * @returns {void}
 * @example setStyle(el, {border:'',position:''})
 */
export const setElementStyle = (el: HTMLElement | null,
  styleObj: objectKeyOnlyCss) => {
  for (const key in styleObj) {
    el!.style[key] = styleObj[key]
  }
}

/**
 * @func setProperties
 * @desc 📝 设置元素的属性
 * @param {(HTMLElement | null)} el 
 * @param {object} properties 
 * @returns {void}
 * @example setProperties(el, {--rotate:'360deg'})
 */
export const setProperties = (
  el: HTMLElement | null,
  properties: object
) => {
  for (const key in properties) {
    el!.style.setProperty(key, properties[key])
  }
}

