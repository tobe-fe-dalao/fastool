import importPlugin from './importPlugin';

/**
 * @func copyJs
 * @desc Load clipboard.js for copying text to the clipboard
 *
 * If you just want to copy text, the main-bundle `copyToClipboard` is a zero-dependency
 * native implementation that works without network access; prefer it.
 *
 * @param {string} cdnUrl optional; custom CDN URL for clipboard.js
 * @returns {Promise<any>} ClipboardJS constructor
 * @github https://github.com/zenorocha/clipboard.js
 * @size 3kb
 * @example
 * const ClipboardJS = await copyJs();
 * const clipboard = new ClipboardJS('.btn');
 */

const DEFAULT_CDN =
  'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.10/clipboard.min.js';

const copyJs = async (cdnUrl: string = DEFAULT_CDN): Promise<any> => {
  return await importPlugin('ClipboardJS', cdnUrl);
};

export default copyJs;
