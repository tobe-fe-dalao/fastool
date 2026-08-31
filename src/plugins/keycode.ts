import importPlugin from './importPlugin';

/**
 * @func keyCode
 * @desc Load tinykeys for listening to key combinations
 * @param {string} cdnUrl optional; custom CDN URL for tinykeys
 * @returns {Promise<ITinyKey>} tinykeys module
 * @github https://github.com/jamiebuilds/tinykeys
 * @size 1kb
 * @example
 * const tinykeys = await keyCode();
 * tinykeys.createKeybindingsHandler({ 'Shift+D': () => alert('shift + d') });
 */

// Declaration definitions for the injected module; you may need to define/modify them yourself
export interface ITinyKey {
  default: any;
  createKeybindingsHandler: (options: any) => Function;
  parseKeybinding: (keyName: string) => Array<any>;
}

const DEFAULT_CDN = 'https://unpkg.com/tinykeys@latest/dist/tinykeys.module.js';

const keyCode = async (cdnUrl: string = DEFAULT_CDN): Promise<ITinyKey> => {
  return (await importPlugin('tinykeys', cdnUrl)) as ITinyKey;
};

export default keyCode;
