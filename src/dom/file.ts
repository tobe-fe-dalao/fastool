/**
 * @func dataURLtoFile
 * @param {string} dataUrl
 * @param {string} fileName
 * @desc  Convert a dataUrl to a file
 * IE cannot use the new File constructor; use dataURLtoBlob instead
 * @return {any} file object
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
 * @desc  Convert base64 to a file
 * @returns {any} file object
 * @example let file = base64toFile(base64, fileName)
 */
export const base64toFile = (base64: string, fileName: string = getFileName()): any => {
  return dataURLtoFile(base64, fileName)
}
/**
 * @func getFileName
 * @desc Set the file name
 * @return { string } fileName file name
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
 * @desc Convert a dataUrl/base64 to a blob
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
 * @desc Convert base64 to a blob
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
 * @desc Convert a blob to a file
 * @return { any } file object
 * @example let file = blobtoFile(blob, filename)
 */
export const blobtoFile = (blob: Blob, fileName: string = getFileName()): any => {
  return new File([blob], fileName, { type: blob.type })
};
/**
 * @func filetoBase64
 * @param file file object
 * @desc Convert a file object to base64
 * @return { Promise } Promise object, asynchronous
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