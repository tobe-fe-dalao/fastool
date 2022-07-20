// 整理常用的校验规则-扫地盲僧含泪整理转载署名-授权许可证
// TODO:干到这里了
/**
 * @func isChines
 * @param {string} str
 * @returns {boolean}
 * @desc 是否是中文
 */
export const isChines = (str: string): boolean => {
  const reg = /^[\u4E00-\u9FA5]+$/;
  return reg.test(str);
}

/**
 * @func isCard
 * @param {string} str 身份证号
 * @param {number} type 1:15位，2:18位，默认0 同时匹配15位和18位
 * @returns {boolean}
 * @desc 是否为身份证号: 支持（1/2）代，15位或18位
 */
export const isIdCard = (str: string, type: number = 0): boolean => {
  // 1代身份证
  const reg1 = /^[1-9]\d{7}(?:0\d|10|11|12)(?:0[1-9]|[1-2][\d]|30|31)\d{3}$/;
  // 2代身份证
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
 * @desc 校验是否是大陆邮政编码
 */
export const isPostCode = (value: number): boolean => {
  return /^[1-9][0-9]{5}$/.test(value.toString());
}

/**
 * @func isIPv6
 * @param {string} str
 * @returns {boolean}
 * @desc 校验是否是IPv6地址
 */
export const isIPv6 = (str: string): boolean => {
  return Boolean(str.match(/:/g) ? str.match(/:/g)!.length <= 7 : false && /::/.test(str) ? /^([\da-f]{1,4}(:|::)){1,6}[\da-f]{1,4}$/i.test(str) : /^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(str));
}
/**
 * @func isEmail
 * @param {string} value
 * @returns {boolean}
 * @desc 是否是邮箱
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
 * @description 是否是手机号
 */
export const isTelNumber = (str: string): boolean => {
  const reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
  return reg.test(str);
}

/**
 * @func isHasEmoji
 * @param {string} value
 * @returns {boolean}
 * @description 是否包含emoji表情
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
 * @desc 校验是否是URL
 */
export const isUrl = (str: string): boolean => {
  const reg = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;
  return reg.test(str);
}
