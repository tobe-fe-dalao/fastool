/**
 * @func dataURLtoFile
 * @param {string} dataUrl 
 * @param {string} fileName 
 * @desc  将base64转换为文件
 * @returns {any}
 * @example dataURLtoFile(dataUrl, fileName)
 */
export const dataURLtoFile = (dataUrl: string, fileName: string = getFileName()): any => {
  let arr: Array<any> = dataUrl.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
}

function getFileName() {
  let date = new Date();
  let fileName = '' + date.getFullYear() + (date.getMonth() < 9 ? +'0' : '')
    + (date.getMonth() + 1) + (date.getDate() < 10 ? +'0' : '') + date.getDate()
    + date.getHours() + date.getMinutes() + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
  return fileName;
}
export const dataURLtoBlob = (dataurl: string): Blob | null => {
  let mime;
  let u8arr;
  if (dataurl) {
    const arr = dataurl.split(',');
    if (arr && arr.length) {
      const mimem = arr[0].match(/:(.*?);/);
      if (mimem) {
        mime = mimem[1] || 'image/png';
      }
      const bstr = atob(arr[1]);
      let n = bstr.length;
      u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([ u8arr ], { type: mime });
    }
  }
  return null;
};

