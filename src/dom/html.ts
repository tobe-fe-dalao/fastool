/**
 * @func getFromClipboard
 * @desc 📝 Get clipboard content
 * @returns {Promise<string>}
 * @example getFromClipboard().then(res => {...}
 */
export const getFromClipboard = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      reject(new Error('clipboard is not supported in current environment'));
      return;
    }
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
 * @desc 📝 Strip all tags from text, keeping only the text
 * @example removeHTMLTag('<p>hello</p>') // 'hello'
 */
export const removeHTMLTag = (str: string): string => str.replace(/<[^>]+>/g, '');


type objectKeyOnlyCss = {
  [k in keyof CSSStyleDeclaration]?: any
}
/**
 * @func setElementStyle
 * @desc 📝 Set an element's style
 * @param {HTMLElement} el 
 * @param {objectKeyOnlyCss} styleObj 
 * @returns {void}
 * @example setStyle(el, {border:'',position:''})
 */
export const setElementStyle = (el: HTMLElement | null,
  styleObj: objectKeyOnlyCss) => {
  if (!el) return;
  for (const key in styleObj) {
    (el.style as any)[key] = styleObj[key]
  }
}

/**
 * @func setProperties
 * @desc 📝 Set an element's properties
 * @param {(HTMLElement | null)} el 
 * @param {object} properties 
 * @returns {void}
 * @example setProperties(el, {--rotate:'360deg'})
 */
export const setProperties = (
  el: HTMLElement | null,
  properties: Record<string, string>
) => {
  if (!el) return;
  for (const key in properties) {
    el.style.setProperty(key, properties[key])
  }
}
// Check if an element has a class
export const hasClass = (ele: HTMLElement, className: string) => {
  return !!ele.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};

// Add class to element
export const addClass = (ele: HTMLElement, className: string) => {
  if (!hasClass(ele, className)) {
    ele.className += ' ' + className;
  }
};

// Remove class from element
export const removeClass = (ele: HTMLElement, className: string) => {
  if (hasClass(ele, className)) {
    const reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
};

