/**
 * @func getImageBase64Url
 * @desc Convert an image element to a base64 (dataURL) address
 * @param {HTMLImageElement} image the image element
 * @param {number} quality image quality 0~1, defaults to 1
 * @returns {string} the dataURL, or an empty string if conversion fails
 * @example getImageBase64Url(imgEl)
 */
export function getImageBase64Url(image: HTMLImageElement, quality = 1): string {
  if (typeof document === 'undefined') return '';
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  ctx.drawImage(image, 0, 0, image.width, image.height);
  const suffix = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase();
  return canvas.toDataURL(`image/${suffix || 'png'}`, quality);
}

/**
 * @func changeColorToRGBA
 * @desc Convert any CSS color value to an rgba component object
 * @param {string} color the color value, e.g. '#fff', 'rgba(0,0,0,.5)', 'red'
 * @returns {{ r: number, g: number, b: number, a: number }} rgba components
 * @example changeColorToRGBA('#fff') // { r: 255, g: 255, b: 255, a: 1 }
 */
export function changeColorToRGBA(color: string): { r: number; g: number; b: number; a: number } {
  const empty = { r: 0, g: 0, b: 0, a: 0 };
  if (typeof document === 'undefined') return empty;

  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');
  if (!ctx) return empty;

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const data = ctx.getImageData(0, 0, 1, 1).data;
  return { r: data[0], g: data[1], b: data[2], a: Number((data[3] / 255).toFixed(2)) };
}

/**
 * @func hexToRgb
 * @desc Convert a hexadecimal color to an rgb string or component object
 * @param {string} hex the hex color, supports #fff and #ffffff
 * @param {boolean} toString whether to return an 'rgb(r, g, b)' string, defaults to false
 * @returns {object | string} component object or rgb string; returns null on invalid format
 * @example hexToRgb('#ffffff') // { r: 255, g: 255, b: 255 }
 * @example hexToRgb('#fff', true) // 'rgb(255, 255, 255)'
 */
export function hexToRgb(
  hex: string,
  toString = false
): { r: number; g: number; b: number } | string | null {
  const value = hex.replace(/^#/, '');
  if (!/^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)) return null;

  const full =
    value.length === 3
      ? value
          .split('')
          .map((c) => c + c)
          .join('')
      : value;

  const rgb = {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
  return toString ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : rgb;
}

/**
 * @func rgbToHex
 * @desc Convert rgb components to a hexadecimal color
 * @param {number} r the red component 0~255
 * @param {number} g the green component 0~255
 * @param {number} b the blue component 0~255
 * @returns {string} hex color
 * @example rgbToHex(255, 255, 255) // '#ffffff'
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number): string => {
    const clamped = Math.max(0, Math.min(255, Math.round(n)));
    return clamped.toString(16).padStart(2, '0');
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
