import importPlugin from './importPlugin';

/**
 * @func dayJs
 * @desc Load dayjs for date formatting
 *
 * If you only need regular date formatting and calculations, the main-bundle functions
 * `formatDate`, `formatPassTime`, `diffDays`, etc. are zero-dependency native
 * implementations that work without network access.
 *
 * @param {string} cdnUrl optional; custom CDN URL for dayjs
 * @returns {Promise<any>} dayjs function
 * @github https://github.com/iamkun/dayjs/blob/dev/docs/zh-cn/README.zh-CN.md
 * @size 2kb
 * @example
 * const dayjs = await dayJs();
 * dayjs().format('YYYY-MM-DD');
 */

const DEFAULT_CDN = 'https://unpkg.com/dayjs@1.11.3/dayjs.min.js';

const dayJs = async (cdnUrl: string = DEFAULT_CDN): Promise<any> => {
  return await importPlugin('dayjs', cdnUrl);
};

export default dayJs;
