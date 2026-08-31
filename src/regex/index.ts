// A collection of common validation rules – compiled and shared with attribution under license
// TODO: work in progress
/**
 * @func isChines
 * @param {string} str
 * @returns {boolean}
 * @desc Check whether the string is Chinese
 */
export const isChines = (str: string): boolean => {
  const reg = /^[\u4E00-\u9FA5]+$/;
  return reg.test(str);
}

/**
 * @func isCard
 * @param {string} str ID card number
 * @param {number} type 1: 15-digit, 2: 18-digit, default 0 matches both 15 and 18 digits
 * @returns {boolean}
 * @desc Check whether it is an ID card number: supports 1st/2nd generation, 15 or 18 digits
 */
export const isIdCard = (str: string, type: number = 0): boolean => {
  // 1st-generation ID card
  const reg1 = /^[1-9]\d{7}(?:0\d|10|11|12)(?:0[1-9]|[1-2][\d]|30|31)\d{3}$/;
  // 2nd-generation ID card
  const reg2 = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/;
  const reg =
    /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/;

  switch (type) {
    case 1:
      return reg1.test(str);
    case 2:
      return reg2.test(str);
    default:
      return reg.test(str);
  }
};

/**
 * @func isPostCode
 * @param {number} value
 * @returns {boolean}
 * @desc Validate whether it is a mainland China postal code
 */
export const isPostCode = (value: number): boolean => {
  return /^[1-9][0-9]{5}$/.test(value.toString());
}

/**
 * @func isIPv6
 * @param {string} str
 * @returns {boolean}
 * @desc Validate whether it is an IPv6 address
 */
export const isIPv6 = (str: string): boolean => {
  return Boolean(str.match(/:/g) ? str.match(/:/g)!.length <= 7 : false && /::/.test(str) ? /^([\da-f]{1,4}(:|::)){1,6}[\da-f]{1,4}$/i.test(str) : /^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(str));
}
/**
 * @func isEmail
 * @param {string} value
 * @returns {boolean}
 * @desc Check whether it is an email
 */
export const isEmail = (value: string): boolean => {
  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(value);
}

/**
 * @func isTelNumber
 * @param {string} str
 * @returns {boolean}
 * @description Check whether it is a mobile phone number
 */
export const isTelNumber = (str: string): boolean => {
  const reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
  return reg.test(str);
}

/**
 * @func isHasEmoji
 * @param {string} value
 * @returns {boolean}
 * @description Check whether it contains emoji
 */
export const isHasEmoji = (value: string): boolean => {
  value = String(value);
  for (let i = 0; i < value.length; i++) {
    const hs = value.charCodeAt(i);
    if (0xd800 <= hs && hs <= 0xdbff) {
      if (value.length > 1) {
        const ls = value.charCodeAt(i + 1);
        const uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
        if (0x1d000 <= uc && uc <= 0x1f77f) {
          return true;
        }
      }
    } else if (value.length > 1) {
      const ls = value.charCodeAt(i + 1);
      if (ls == 0x20e3) {
        return true;
      }
    } else {
      if (0x2100 <= hs && hs <= 0x27ff) {
        return true;
      } else if (0x2B05 <= hs && hs <= 0x2b07) {
        return true;
      } else if (0x2934 <= hs && hs <= 0x2935) {
        return true;
      } else if (0x3297 <= hs && hs <= 0x3299) {
        return true;
      } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
        || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
        || hs == 0x2b50) {
        return true;
      }
    }
  }
  return false;
}

/**
 * @func isUrl
 * @param {string} str
 * @returns {boolean}
 * @desc Validate whether it is a URL
 */
export const isUrl = (str: string): boolean => {
  const reg = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;
  return reg.test(str);
}

/**
 * @func isColor
 * @desc Check whether a string is a hex color value
 * @param {string} value value to check
 * @returns {boolean} whether it is a hex color value
 * @example if (isColor(str)) { doSomething }
 */
export const isColor = function (value: string): boolean {
  return /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(value);
};
