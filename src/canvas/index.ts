/**
 * @func getImageBase64Url
 * @param {HTMLImageElement} image
 * @returns {string}
 * @desc 获取图片base64Url
 * @example getImageBase64Url(image)
 */
export function getImageBase64Url(image: HTMLImageElement): string {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(image, 0, 0, image.width, image.height);
  const suffix = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase();
  return canvas.toDataURL(`image/${suffix || 'png'}`, 1);
}

/**
 * @func changeColorToRGBA
 * @param {string} color
 * @returns {object}
 * @desc 将颜色色值转rgba
 * @example changeColorToRGBA('#fff') => {r: 255, g: 255, b: 255, a: 1}
 */
export function changeColorToRGBA(color: string) {
  let canvas = (window as any).canvas;
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    (window as any).canvas = canvas;
  }
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const colorData = ctx.getImageData(0, 0, 1, 1).data;
  return {
    r: colorData[0],
    g: colorData[1],
    b: colorData[2],
    a: colorData[3],
  };
}
