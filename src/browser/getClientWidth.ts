
/**
 * @func getClientWidth
 * @returns {number}
 * @desc π θ·εε―θ§ηͺε£ηι«εΊ¦
 * @example const clientW = getClientWidth();
 */
export const getClientWidth = (): number => {
  return (document.compatMode == "BackCompat" ? document.body : document.documentElement).clientWidth;
}