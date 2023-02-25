import importPlugin from './importPlugin'
/**
 * @func keyCode
 * @desc 监听键盘按键类库
 * @github https://github.com/jamiebuilds/tinykeys
 * @example keyCode(window, {
 * "Shift+D": () => {
 * alert("The 'Shift' and 'd' keys were pressed at the same time")
 * },
 */
// 注入模块的声明定义 需要自己定义修改
interface ITinyKey {
  default: any
  createKeybindingsHandler: (options: any) => Function
  parseKeybinding: (keyName: string) => Array<any>
}
const keyCode = async () => {
  return await importPlugin(
    'https://unpkg.com/tinykeys@latest/dist/tinykeys.module.js',
    'tinykeys',
  )
}
export default keyCode


