/**
 * @func dataURLtoFile
 * @param {string} dataUrl
 * @param {string} fileName
 * @desc  将dataUrl转换为文件
 * ie无法使用new File构造函数，建议使用dataURLtoBlob
 * @return {any} 文件对象
 * @example let file = dataURLtoFile(dataUrl, fileName)
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
/**
 * @func base64toFile
 * @param {string} base64
 * @param {string} fileName
 * @desc  将base64转换为文件
 * @returns {any} 文件对象
 * @example let file = base64toFile(base64, fileName)
 */
export const base64toFile = (base64: string, fileName: string = getFileName()): any => {
  return dataURLtoFile(base64, fileName)
}
/**
 * @func getFileName
 * @desc 设置文件名字
 * @return { string } fileName 文件名
 * @example let fileName = getFileName();
 */
function getFileName() {
  let date = new Date();
  let fileName = '' + date.getFullYear() + (date.getMonth() < 9 ? +'0' : '')
    + (date.getMonth() + 1) + (date.getDate() < 10 ? +'0' : '') + date.getDate()
    + date.getHours() + date.getMinutes() + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
  return fileName;
}
/**
 * @func dataURLtoBlob
 * @param { string } dataurl
 * @desc 将dataUrl/base64转换为blob
 * @return { Blob } Blob
 * @example let blob = dataURLtoBlob(dataurl)
 */
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
      return new Blob([u8arr], { type: mime });
    }
  }
  return null;
};
/**
 * @func base64toBlob
 * @param { string } base64
 * @desc 将base64转换为blob
 * @return { Blob } Blob
 * @example let blob = base64toBlob(dataurl)
 */
export const base64toBlob = (base64: string): Blob | null => {
  return dataURLtoBlob(base64)
};
/**
 * @func blobtoFile
 * @param { Blob } blob
 * @param { string } fileName
 * @desc 将blob转换为文件
 * @return { any } 文件对象
 * @example let file = blobtoFile(blob, filename)
 */
export const blobtoFile = (blob: Blob, fileName: string = getFileName()): any => {
  return new File([blob], fileName, { type: blob.type })
};
/**
 * @func filetoBase64
 * @param file 文件对象
 * @desc 文件对象转base64
 * @return { Promise } Promise对象，异步处理
 */
export const filetoBase64 = (file: any): Promise<any> => {
  // return window.URL.createObjectURL(file)
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      if (event.target) {
        resolve(event.target.result)
      } else {
        reject(
          console.error(event)
        )
      }
    }
  })
}