import { importPluginByUrl } from '../function/tool'
/**
 * @func dayJs
 * @desc dayjs日期格式化
 * @github https://github.com/iamkun/dayjs/blob/dev/docs/zh-cn/README.zh-CN.md
 * @example dayJs().format('YYYY-MM-DD')
 */
const dayJs = async () => {
  return await importPluginByUrl<any>(
    'https://unpkg.com/dayjs@1.11.3/dayjs.min.js',
    'dayjs',
    'dayJs',
    false
  )
}
export default dayJs


