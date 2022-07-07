import { importPluginByUrl } from '../function/tool'
/** 
 * @func copyJs
 * @desc 复制文本到剪贴板
 * @example const copy = new copyJs()
 * @returns {promise}
 * @github https://github.com/zenorocha/clipboard.js
 * @size 3kb
 * 
*/

const copyJs = async (): Promise<any> => {
  return await importPluginByUrl<any>(
    'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.10/clipboard.min.js',
    'ClipboardJS',
    'copyJs',
    false
  )
}
export default copyJs
