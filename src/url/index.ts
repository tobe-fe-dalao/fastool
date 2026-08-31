/** Get the current URL in browser environments; returns an empty string in SSR environments */
function getCurrentUrl(): string {
  return typeof location !== 'undefined' ? location.href : '';
}

/** Extract the query string from a URL (excluding content after '?' and '#') */
function getQueryString(url: string): string {
  const withoutHash = url.split('#')[0];
  const idx = withoutHash.indexOf('?');
  return idx === -1 ? '' : withoutHash.slice(idx + 1);
}

/** Split a URL into its main part and its hash part */
function splitHash(url: string): [string, string] {
  const idx = url.indexOf('#');
  return idx === -1 ? [url, ''] : [url.slice(0, idx), url.slice(idx + 1)];
}

/**
 * @func getUrlParams
 * @desc Get all parameters from a URL; parameters with the same name are returned as an array; numeric-only values are converted to number
 * @param {string} url the URL, defaults to the current page URL
 * @returns {Record<string, any>} the parameter object
 * @example getUrlParams('https://a.com?x=1&x=2&y=hi') // { x: [1, 2], y: 'hi' }
 * @example getUrlParams('https://a.com') // {}
 */
export const getUrlParams = (url: string = getCurrentUrl()): Record<string, any> => {
  const params: Record<string, any> = {};
  const query = getQueryString(url);
  if (!query) return params;

  query.split('&').forEach((param) => {
    if (!param) return;
    const idx = param.indexOf('=');
    // handle parameters without a value, e.g. ?debug
    if (idx === -1) {
      params[decodeURIComponent(param)] = true;
      return;
    }
    const key = decodeURIComponent(param.slice(0, idx));
    let val: any = decodeURIComponent(param.slice(idx + 1));
    if (/^\d+$/.test(val)) val = parseFloat(val);
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      params[key] = ([] as any[]).concat(params[key], val);
    } else {
      params[key] = val;
    }
  });
  return params;
};

/**
 * @func getQueryParam
 * @desc Get the value of a specified parameter from a URL. Unlike getUrlParams, no numeric conversion is performed here; the value is always returned as a string
 * @param {string} key parameter name
 * @param {string} url the URL, defaults to the current page URL
 * @returns {string | null} the parameter value (string), or null if it does not exist
 * @example getQueryParam('id', 'https://a.com?id=3') // '3'
 */
export const getQueryParam = (key: string, url: string = getCurrentUrl()): string | null => {
  const query = getQueryString(url);
  if (!query) return null;
  for (const param of query.split('&')) {
    if (!param) continue;
    const idx = param.indexOf('=');
    const k = idx === -1 ? param : param.slice(0, idx);
    if (decodeURIComponent(k) === key) {
      return idx === -1 ? '' : decodeURIComponent(param.slice(idx + 1));
    }
  }
  return null;
};

/**
 * @func setUrlParams
 * @desc Add or modify a parameter in a URL (overwrites if it exists, appends if it does not)
 * @param {string} urlKey parameter name
 * @param {any} urlValue parameter value
 * @param {string} url the URL, defaults to the current page URL
 * @returns {string} the modified full URL
 * @example setUrlParams('id', 3, 'https://a.com?x=1') // 'https://a.com?x=1&id=3'
 */
export const setUrlParams = (urlKey: string, urlValue: any, url: string = getCurrentUrl()): string => {
  if (!url || !urlKey) return url;
  const [main, hash] = splitHash(url);
  const query = getQueryString(main);
  const baseUrl = query ? main.slice(0, main.indexOf('?')) : main;
  const encodedKey = encodeURIComponent(urlKey);
  const encodedValue = encodeURIComponent(String(urlValue));

  let replaced = false;
  const pairs = query
    ? query.split('&').filter(Boolean).map((param) => {
        const idx = param.indexOf('=');
        const k = idx === -1 ? param : param.slice(0, idx);
        if (k === encodedKey || decodeURIComponent(k) === urlKey) {
          replaced = true;
          return `${encodedKey}=${encodedValue}`;
        }
        return param;
      })
    : [];

  if (!replaced) pairs.push(`${encodedKey}=${encodedValue}`);
  return `${baseUrl}?${pairs.join('&')}${hash ? `#${hash}` : ''}`;
};

/**
 * @func delUrlParams
 * @desc Remove a specified parameter from a URL
 * @param {string} name parameter name
 * @param {string} url the URL, defaults to the current page URL
 * @returns {string} the modified full URL
 * @example delUrlParams('x', 'https://a.com?x=1&y=2') // 'https://a.com?y=2'
 */
export const delUrlParams = (name: string, url: string = getCurrentUrl()): string => {
  if (!url || !name) return url;
  const [main, hash] = splitHash(url);
  const query = getQueryString(main);
  if (!query) return url;
  const baseUrl = main.slice(0, main.indexOf('?'));
  const pairs = query.split('&').filter(Boolean).filter((param) => {
    const idx = param.indexOf('=');
    const k = idx === -1 ? param : param.slice(0, idx);
    return k !== encodeURIComponent(name) && decodeURIComponent(k) !== name;
  });
  return `${baseUrl}${pairs.length ? `?${pairs.join('&')}` : ''}${hash ? `#${hash}` : ''}`;
};

/**
 * @func paramsJoinUrl
 * @desc Serialize a parameter object into a query string (both key and value are URL-encoded)
 * @param {Record<string, any>} params the parameter object
 * @returns {string} the query string, without the leading '?'
 * @example paramsJoinUrl({ a: 1, b: 'x y' }) // 'a=1&b=x%20y'
 */
export const paramsJoinUrl = (params: Record<string, any>): string => {
  return Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== null)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(String(params[key]))}`)
    .join('&');
};

/**
 * @func stringifyQuery
 * @desc A semantic alias for paramsJoinUrl that serializes an object into a query string
 * @param {Record<string, any>} params the parameter object
 * @returns {string} the query string, without the leading '?'
 * @example stringifyQuery({ a: 1, b: 2 }) // 'a=1&b=2'
 */
export const stringifyQuery = (params: Record<string, any>): string => paramsJoinUrl(params);

/**
 * @func getBaseUrl
 * @desc Get the part of a URL before the '?'
 * @param {string} url the URL, defaults to the current page URL
 * @returns {string} the main URL
 * @example getBaseUrl('https://a.com/x?y=1') // 'https://a.com/x'
 */
export const getBaseUrl = (url: string = getCurrentUrl()): string => {
  return url.split('#')[0].split('?')[0];
};

/**
 * @func getUrlDomain
 * @desc Get the domain from a URL (protocol + host + port)
 * @param {string} url the URL, defaults to the current page URL
 * @returns {string} the domain, or an empty string if parsing fails
 * @example getUrlDomain('https://a.com:8080/x?y=1') // 'https://a.com:8080'
 */
export const getUrlDomain = (url: string = getCurrentUrl()): string => {
  const match = /^[a-z][a-z\d+\-.]*:\/\/[^/?#]+/i.exec(url);
  return match ? match[0] : '';
};

/**
 * @func isAbsoluteUrl
 * @desc Check whether a URL is absolute (includes a protocol or is a protocol-relative URL starting with '//')
 * @param {string} url the URL
 * @returns {boolean}
 * @example isAbsoluteUrl('https://a.com') // true
 * @example isAbsoluteUrl('/api/list') // false
 */
export const isAbsoluteUrl = (url: string): boolean => {
  return /^[a-z][a-z\d+\-.]*:\/\//i.test(url) || url.startsWith('//');
};

/**
 * @func joinUrl
 * @desc Join multiple path segments, automatically handling redundant slashes
 * @param {...string[]} parts path segments
 * @returns {string} the joined path
 * @example joinUrl('https://a.com/', '/api/', '/list') // 'https://a.com/api/list'
 */
export const joinUrl = (...parts: string[]): string => {
  const filtered = parts.filter((part) => part !== '' && part !== null && part !== undefined);
  if (!filtered.length) return '';
  const [first, ...rest] = filtered;
  // preserve the protocol double-slash at the end of the first segment
  const head = first.replace(/\/+$/, '');
  const tail = rest
    .map((part) => String(part).replace(/^\/+/, '').replace(/\/+$/, ''))
    .filter((part) => part !== '')
    .join('/');
  const protocolPrefix = /^[a-z][a-z\d+\-.]*:\/\//i.test(first) ? first.match(/^[a-z][a-z\d+\-.]*:\/\//i)![0] : '';
  if (protocolPrefix) {
    return protocolPrefix + head.slice(protocolPrefix.length) + (tail ? `/${tail}` : '');
  }
  return tail ? `${head}/${tail}` : head;
};
