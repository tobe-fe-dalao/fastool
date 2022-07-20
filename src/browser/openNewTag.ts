/**
 * @func openNewTag
 * @param {String} url
 * @param {Number} tagType?
 * @returns {void}
 * @desc 打开新标签页
 */
export function openNewTag(url: string, tagType: number = 1) {
  // 新建标签页打开
  if (tagType == 1) {
    window.open(url, '_blank');
  } else if (tagType == 2) {  //新建无状态小窗口打开
    window.open(url, "_blank", "width=800,height=600,top=150,left=300,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,modal=false,alwaysRaised=yes");
  } else { // UUOA内嵌页面打开
    // todo
  }
}
